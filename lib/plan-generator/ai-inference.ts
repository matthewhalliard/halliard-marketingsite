/**
 * AI-powered plan inference using Firecrawl + Claude Haiku.
 *
 * Replaces the hand-coded industry/keyword heuristics with a real reasoning
 * pipeline:
 *   1. Firecrawl scrapes the URL (handles JS-rendered sites, bot blocks, etc.)
 *   2. Claude Haiku analyzes the content and returns structured plan params
 *
 * Returns null on failure so the caller can fall back to the heuristic engine.
 */
import Anthropic from '@anthropic-ai/sdk'

const FIRECRAWL_KEY = process.env.FIRECRAWL_API_KEY
const ANTHROPIC_KEY = process.env.ANTHROPIC_API_KEY

// Properties Claude can choose from. Keep this aligned with PROPERTY_LOGOS
// in ./index.ts. Group order matters — Audio / Video / Digital / OOH.
export const AVAILABLE_PROPERTIES = {
  Audio: {
    'Streaming Audio': ['Spotify', 'Pandora', 'iHeartRadio', 'SiriusXM'],
    'Podcasts': ['Podcasts', 'Spotify Podcasts'],
    'Broadcast Radio': ['Local Radio'],
  },
  Video: {
    'Streaming TV': ['Netflix', 'Hulu', 'Paramount+', 'Peacock', 'Disney+', 'Max', 'Prime Video', 'Tubi', 'Pluto TV'],
    'Linear TV': ['Broadcast TV', 'Cable TV'],
    'Online Video': ['YouTube'],
  },
  Digital: {
    'Paid Social': ['Facebook', 'Instagram', 'TikTok', 'LinkedIn', 'X (Twitter)', 'Reddit', 'Snapchat'],
    'Search': ['Google Search', 'Bing'],
    'Display': ['Google Display', 'Programmatic Display'],
  },
  OOH: {
    'Out-of-Home': ['Billboards', 'Transit', 'Digital OOH'],
  },
} as const

export interface AIPlanInference {
  brandName: string
  industry: string
  targetAudience: string
  recommendedBudget: number
  rationale: string
  channelMix: { audio: number; video: number; digital: number; ooh: number }
  properties: {
    group: 'Audio' | 'Video' | 'Digital' | 'OOH'
    channel: string
    property: string
    pctOfGroup: number // 0..1, sums to 1 within group
  }[]
  // Reach/frequency are computed downstream from budget, but Claude can override
  reachPct?: number
  frequency?: number
}

// ─── Firecrawl ─────────────────────────────────────────────────────
export async function firecrawlScrape(url: string): Promise<{
  markdown: string
  metadata: Record<string, any>
} | null> {
  if (!FIRECRAWL_KEY) {
    console.warn('[ai-inference] FIRECRAWL_API_KEY not set')
    return null
  }
  try {
    const res = await fetch('https://api.firecrawl.dev/v1/scrape', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${FIRECRAWL_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        url,
        formats: ['markdown'],
        onlyMainContent: true,
        waitFor: 1000,
        timeout: 15000,
      }),
      signal: AbortSignal.timeout(20000),
    })
    if (!res.ok) {
      console.warn('[ai-inference] Firecrawl HTTP', res.status)
      return null
    }
    const json: any = await res.json()
    if (!json.success || !json.data) {
      console.warn('[ai-inference] Firecrawl non-success', json)
      return null
    }
    return {
      markdown: (json.data.markdown || '').slice(0, 8000),
      metadata: json.data.metadata || {},
    }
  } catch (err) {
    console.warn('[ai-inference] Firecrawl error', err)
    return null
  }
}

// ─── Claude Haiku analysis ─────────────────────────────────────────
const SYSTEM_PROMPT = `You are a senior media planner at Halliard, a media planning platform. Your job is to analyze a company's website and output a thoughtful, realistic media plan as structured JSON.

You will receive scraped website content (title, description, markdown body). Your output must be a SINGLE JSON object — no prose, no markdown fences — matching the schema below.

SCHEMA:
{
  "brandName": string,            // the company/brand name (not a tagline, not "Home")
  "industry": string,             // specific industry (e.g. "Personal Injury Law", not just "Consumer Brand")
  "targetAudience": string,       // one-sentence audience description
  "recommendedBudget": number,    // USD, realistic 6-month budget for this brand scale (range: 100000 to 25000000)
  "rationale": string,            // 1-2 sentences explaining WHY this mix works for this brand
  "channelMix": {
    "audio": number,   // 0..1
    "video": number,   // 0..1
    "digital": number, // 0..1
    "ooh": number      // 0..1 (often 0 for non-local or non-high-awareness brands)
  },                   // must sum to 1.0
  "properties": [      // 4-10 items total, distributed across the groups you allocated to
    {
      "group": "Audio" | "Video" | "Digital" | "OOH",
      "channel": string,  // sub-category (e.g. "Streaming Audio", "Streaming TV", "Paid Social", "Search", "Out-of-Home")
      "property": string, // must come from AVAILABLE_PROPERTIES below
      "pctOfGroup": number // 0..1, within-group share; entries within a group must sum to 1.0
    }
  ]
}

AVAILABLE_PROPERTIES (use ONLY these values, exact strings):
Audio:
  - Streaming Audio: Spotify, Pandora, iHeartRadio, SiriusXM
  - Podcasts: Podcasts, Spotify Podcasts
  - Broadcast Radio: Local Radio
Video:
  - Streaming TV: Netflix, Hulu, Paramount+, Peacock, Disney+, Max, Prime Video, Tubi, Pluto TV
  - Linear TV: Broadcast TV, Cable TV
  - Online Video: YouTube
Digital:
  - Paid Social: Facebook, Instagram, TikTok, LinkedIn, X (Twitter), Reddit, Snapchat
  - Search: Google Search, Bing
  - Display: Google Display, Programmatic Display
OOH:
  - Out-of-Home: Billboards, Transit, Digital OOH

PLANNING GUIDANCE:
- Regional/local businesses (law firms, dealerships, hospitals): heavy audio (local radio, podcasts), linear TV, OOH, Google Search.
- B2B SaaS: 70%+ digital, LinkedIn heavy, Google Search, minimal audio/video.
- DTC e-commerce: Meta (FB/IG), TikTok, YouTube, search — mostly digital.
- CPG / national brands: heavy CTV (Netflix, Hulu, Paramount+), streaming audio, social.
- Automotive: CTV heavy, audio, search, some OOH.
- Luxury / travel: CTV, IG, OOH in target metros.
- Law firms (personal injury especially): ENORMOUS on local broadcast TV, radio, digital OOH, and Google Search for injury keywords. Audio ~25-35%, Video 30-40%, Digital 30-40%, OOH 5-10%.

BUDGETS (6-month):
- Local single-location business: $100K-$400K
- Regional multi-location: $500K-$2M
- National mid-market: $1M-$5M
- National enterprise (Nike, Marriott): $5M-$25M
- Local law firm (mid-size): $400K-$1M

Output ONLY the JSON object, nothing else.`

export async function analyzeWithClaude(scrapedMarkdown: string, metadata: Record<string, any>, hostname: string): Promise<AIPlanInference | null> {
  if (!ANTHROPIC_KEY) {
    console.warn('[ai-inference] ANTHROPIC_API_KEY not set')
    return null
  }

  const client = new Anthropic({ apiKey: ANTHROPIC_KEY })

  const metaBlock = Object.entries(metadata)
    .filter(([k]) => ['title', 'description', 'og:title', 'og:description', 'keywords'].includes(k))
    .map(([k, v]) => `${k}: ${v}`)
    .join('\n')

  const userMsg = `HOSTNAME: ${hostname}

METADATA:
${metaBlock || '(none extracted)'}

SCRAPED CONTENT (truncated):
${scrapedMarkdown.slice(0, 6000)}

Analyze this brand and return the media plan JSON.`

  try {
    const resp = await client.messages.create({
      model: 'claude-haiku-4-5',
      max_tokens: 2000,
      system: SYSTEM_PROMPT,
      messages: [{ role: 'user', content: userMsg }],
    })
    const textBlock = resp.content.find(b => b.type === 'text')
    if (!textBlock || textBlock.type !== 'text') return null
    const raw = textBlock.text.trim()

    // Strip possible code fences (Claude is usually clean but be safe)
    const jsonMatch = raw.match(/\{[\s\S]*\}/)
    if (!jsonMatch) {
      console.warn('[ai-inference] No JSON found in Claude response:', raw.slice(0, 300))
      return null
    }
    const parsed = JSON.parse(jsonMatch[0]) as AIPlanInference

    // Sanity check the shape
    if (!parsed.brandName || !parsed.industry || !parsed.channelMix || !parsed.properties) {
      console.warn('[ai-inference] Claude JSON missing required fields')
      return null
    }

    // Normalize channel mix (force sum=1)
    const mixSum = parsed.channelMix.audio + parsed.channelMix.video + parsed.channelMix.digital + (parsed.channelMix.ooh || 0)
    if (mixSum > 0 && Math.abs(mixSum - 1) > 0.02) {
      parsed.channelMix.audio /= mixSum
      parsed.channelMix.video /= mixSum
      parsed.channelMix.digital /= mixSum
      parsed.channelMix.ooh = (parsed.channelMix.ooh || 0) / mixSum
    }
    parsed.channelMix.ooh = parsed.channelMix.ooh || 0

    // Normalize pctOfGroup within each group
    const groups = ['Audio', 'Video', 'Digital', 'OOH'] as const
    for (const g of groups) {
      const inGroup = parsed.properties.filter(p => p.group === g)
      const sum = inGroup.reduce((s, p) => s + (p.pctOfGroup || 0), 0)
      if (sum > 0 && Math.abs(sum - 1) > 0.02) {
        for (const p of inGroup) p.pctOfGroup /= sum
      }
    }

    return parsed
  } catch (err: any) {
    console.warn('[ai-inference] Claude error:', err?.message || err)
    return null
  }
}

// ─── Combined pipeline ─────────────────────────────────────────────
export async function inferPlanWithAI(url: string, hostname: string): Promise<AIPlanInference | null> {
  const scraped = await firecrawlScrape(url)
  if (!scraped) return null
  const inference = await analyzeWithClaude(scraped.markdown, scraped.metadata, hostname)
  return inference
}
