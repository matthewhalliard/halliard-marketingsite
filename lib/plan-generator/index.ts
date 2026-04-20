/**
 * Media plan generator — public surface.
 *
 * generateSamplePlan(url) pipeline:
 *   1. AI path (preferred): Firecrawl scrape → Claude Haiku analysis → structured plan
 *   2. Fallback path: simple fetch → keyword heuristic (kept for resiliency when
 *      Firecrawl/Anthropic are down or keys missing)
 *   3. Build flight timing around the chosen properties + channel mix
 *   4. Render as PNG via Satori + Resvg
 */
import satori from 'satori'
import { Resvg } from '@resvg/resvg-js'
import { readFileSync } from 'fs'
import { join } from 'path'
import { inferPlanWithAI, type AIPlanInference } from './ai-inference'

// ─── Fonts ─────────────────────────────────────────────────────────
const fontsDir = join(process.cwd(), 'node_modules', '@fontsource', 'inter', 'files')
const interRegular = readFileSync(join(fontsDir, 'inter-latin-400-normal.woff'))
const interSemiBold = readFileSync(join(fontsDir, 'inter-latin-600-normal.woff'))
const interBold = readFileSync(join(fontsDir, 'inter-latin-700-normal.woff'))

// ─── Types ─────────────────────────────────────────────────────────
export interface PlanSummary {
  hostname: string
  brandName: string
  industry: string
  targetAudience?: string
  rationale?: string
  budget: number
  reach: string
  frequency: string
  response: string
  channelMix: { audio: number; video: number; digital: number; ooh: number }
  inferenceMode: 'ai' | 'heuristic'
}

// ─── Fallback industry catalog (heuristic mode) ────────────────────
interface FallbackIndustry {
  label: string
  defaultBudget: number
  channelMix: { audio: number; video: number; digital: number; ooh: number }
  metaKeywords: string[]
  bodyKeywords: string[]
}

const FALLBACK_INDUSTRIES: Record<string, FallbackIndustry> = {
  retail_apparel: {
    label: 'Retail & Apparel', defaultBudget: 1200000,
    channelMix: { audio: 0.10, video: 0.45, digital: 0.45, ooh: 0 },
    metaKeywords: ['apparel', 'clothing', 'fashion', 'shoes', 'sneakers', 'athleisure', 'sportswear', 'denim', 'outerwear', 'retail', 'athletes', 'jersey', 'footwear'],
    bodyKeywords: ['add to cart', 'add to bag', "men's", "women's", 'size chart', 'free returns', 'free shipping'],
  },
  cpg: {
    label: 'CPG', defaultBudget: 1500000,
    channelMix: { audio: 0.15, video: 0.55, digital: 0.30, ooh: 0 },
    metaKeywords: ['snack', 'beverage', 'cereal', 'coffee', 'beer', 'spirits', 'consumer packaged', 'grocery', 'soda', 'candy'],
    bodyKeywords: ['nutrition facts', 'ingredients', 'flavor', 'available at'],
  },
  auto: {
    label: 'Automotive', defaultBudget: 2500000,
    channelMix: { audio: 0.15, video: 0.55, digital: 0.25, ooh: 0.05 },
    metaKeywords: ['vehicle', 'truck', 'suv', 'automotive', 'dealership', 'sedan', 'electric vehicle'],
    bodyKeywords: ['mpg', 'horsepower', 'build and price', 'find a dealer', 'test drive'],
  },
  financial: {
    label: 'Financial Services', defaultBudget: 1800000,
    channelMix: { audio: 0.20, video: 0.40, digital: 0.40, ooh: 0 },
    metaKeywords: ['banking', 'credit card', 'mortgage', 'investment', 'retirement', 'insurance', 'wealth', 'brokerage', 'financial services', 'bank'],
    bodyKeywords: ['apr', 'fdic', 'member fdic', 'apy', 'open an account'],
  },
  travel: {
    label: 'Travel & Hospitality', defaultBudget: 900000,
    channelMix: { audio: 0.15, video: 0.40, digital: 0.45, ooh: 0 },
    metaKeywords: ['hotel', 'hotels', 'resort', 'resorts', 'casino', 'travel', 'vacation', 'tourism', 'cruise', 'airline', 'stays'],
    bodyKeywords: ['book a room', 'book now', 'check in', 'check-in', 'rooms from', 'find a hotel', 'reservation', 'destinations'],
  },
  dtc_ecommerce: {
    label: 'DTC & E-commerce', defaultBudget: 600000,
    channelMix: { audio: 0.10, video: 0.30, digital: 0.60, ooh: 0 },
    metaKeywords: ['subscription', 'direct-to-consumer', 'd2c', 'mattress', 'skincare', 'supplements', 'wellness'],
    bodyKeywords: ['shop now', 'subscribe & save', 'try it risk-free'],
  },
  saas: {
    label: 'B2B SaaS', defaultBudget: 400000,
    channelMix: { audio: 0.05, video: 0.15, digital: 0.80, ooh: 0 },
    metaKeywords: ['saas', 'software platform', 'crm', 'erp', 'enterprise software', 'developer tools', 'api platform'],
    bodyKeywords: ['book a demo', 'start free trial', 'pricing per seat', 'per user/month', 'trusted by teams'],
  },
  healthcare: {
    label: 'Healthcare', defaultBudget: 1100000,
    channelMix: { audio: 0.15, video: 0.50, digital: 0.35, ooh: 0 },
    metaKeywords: ['healthcare', 'hospital', 'patient', 'medical', 'pharmacy', 'clinic', 'therapy', 'medicare'],
    bodyKeywords: ['find a doctor', 'schedule an appointment', 'talk to a doctor'],
  },
  legal: {
    label: 'Legal Services', defaultBudget: 600000,
    channelMix: { audio: 0.30, video: 0.35, digital: 0.30, ooh: 0.05 },
    metaKeywords: ['law firm', 'attorney', 'attorneys', 'lawyer', 'lawyers', 'personal injury', 'litigation', 'legal services'],
    bodyKeywords: ['free consultation', 'call for a consultation', 'injured in an accident', 'no fee unless we win', 'schedule a consultation'],
  },
  utility: {
    label: 'Utility & Energy', defaultBudget: 800000,
    channelMix: { audio: 0.25, video: 0.45, digital: 0.30, ooh: 0 },
    metaKeywords: ['utility', 'electric utility', 'solar', 'natural gas', 'power company'],
    bodyKeywords: ['report an outage', 'pay your bill', 'start service', 'outage map'],
  },
  default: {
    label: 'Consumer Brand', defaultBudget: 850000,
    channelMix: { audio: 0.15, video: 0.45, digital: 0.40, ooh: 0 },
    metaKeywords: [], bodyKeywords: [],
  },
}

const DOMAIN_OVERRIDES: Record<string, string[]> = {
  travel: ['marriott', 'hilton', 'hyatt', 'ihg', 'choicehotels', 'bestwestern', 'airbnb', 'booking', 'expedia', 'kayak', 'delta', 'united', 'americanairlines', 'southwest', 'jetblue', 'carnival', 'royalcaribbean', 'mgmresorts', 'caesars', 'wynn'],
  auto: ['ford', 'chevrolet', 'gm', 'toyota', 'honda', 'nissan', 'bmw', 'mercedes-benz', 'audi', 'volkswagen', 'tesla', 'rivian', 'lucidmotors', 'hyundai', 'kia', 'subaru', 'mazda'],
  financial: ['chase', 'bankofamerica', 'wellsfargo', 'citi', 'capitalone', 'amex', 'americanexpress', 'discover', 'schwab', 'fidelity', 'vanguard', 'sofi', 'robinhood', 'coinbase'],
  retail_apparel: ['nike', 'adidas', 'underarmour', 'lululemon', 'gap', 'oldnavy', 'zara', 'hm', 'uniqlo', 'levi', 'allbirds', 'patagonia', 'thenorthface', 'rei'],
  cpg: ['coca-cola', 'cocacola', 'pepsi', 'pepsico', 'nestle', 'kraftheinz', 'generalmills', 'kelloggs', 'unilever', 'pg', 'anheuser-busch', 'constellationbrands'],
  healthcare: ['unitedhealthcare', 'cvs', 'walgreens', 'humana', 'kaiserpermanente', 'clevelandclinic', 'mayoclinic'],
  utility: ['nvenergy', 'pge', 'pgande', 'coned', 'duke-energy', 'conedison', 'dominion', 'xcelenergy', 'nationalgrid', 'firstenergy'],
  dtc_ecommerce: ['warbyparker', 'casper', 'harrys', 'dollarshaveclub', 'glossier', 'ritual', 'athleticgreens', 'drinkag1', 'brooklinen'],
}

interface PlanMeta { title: string; description: string; keywords: string; raw: string }

function extractMeta(html: string): PlanMeta {
  const pick = (re: RegExp) => { const m = html.match(re); return m ? m[1].trim() : '' }
  const title = pick(/<title[^>]*>([^<]+)<\/title>/i)
  const description = pick(/<meta[^>]*name=["']description["'][^>]*content=["']([^"']+)["']/i)
    || pick(/<meta[^>]*property=["']og:description["'][^>]*content=["']([^"']+)["']/i)
  const keywords = pick(/<meta[^>]*name=["']keywords["'][^>]*content=["']([^"']+)["']/i)
  return { title, description, keywords, raw: html.slice(0, 20000).toLowerCase() }
}

function heuristicIndustry(meta: PlanMeta, hostname: string): { key: string; industry: FallbackIndustry } {
  const hostBase = hostname.replace(/^www\./, '').replace(/\..*$/, '').toLowerCase()
  for (const [key, domains] of Object.entries(DOMAIN_OVERRIDES)) {
    if (domains.some(d => hostBase === d || hostBase.includes(d))) {
      return { key, industry: FALLBACK_INDUSTRIES[key] }
    }
  }
  const metaText = `${meta.title} ${meta.description} ${meta.keywords}`.toLowerCase()
  const bodyText = meta.raw.toLowerCase()
  let best = { key: 'default', score: 0 }
  for (const [key, ind] of Object.entries(FALLBACK_INDUSTRIES)) {
    if (key === 'default') continue
    let score = 0
    for (const kw of ind.metaKeywords) if (metaText.includes(kw)) score += 3
    for (const kw of ind.metaKeywords) if (bodyText.includes(kw)) score += 1
    for (const kw of ind.bodyKeywords) if (bodyText.includes(kw)) score += 1.5
    if (score > best.score) best = { key, score }
  }
  if (best.score < 3) best = { key: 'default', score: 0 }
  return { key: best.key, industry: FALLBACK_INDUSTRIES[best.key] }
}

function heuristicBrandName(host: string, meta: PlanMeta): string {
  const hostBase = host.replace(/^www\./, '').replace(/\.(com|co|io|net|org|shop|ai|app).*/i, '').split('.')[0]
  const hostPretty = hostBase.replace(/[-_]/g, ' ').replace(/\b\w/g, c => c.toUpperCase())
  const GENERIC = /^(home|welcome|menu|about|contact|services?)$/i
  if (meta.title) {
    const chunks = meta.title.split(/\s+[|—–·•]\s+|\s+-\s+/).map(s => s.trim()).filter(Boolean)
    for (const raw of chunks) {
      let clean = raw.replace(/\.\s+[A-Z][a-z].*$/, '').trim()
      clean = clean.replace(/^(Official\s+Site\s+of\s+|Welcome\s+to\s+|Home\s+[-—–]\s+)/i, '').trim()
      if (GENERIC.test(clean)) continue
      const hasCommas = clean.includes(',')
      const looksGeneric = /^(The|A|An|Best|Your|Our|Buy|Shop|Find|Get|Discover|Introducing|Welcome)\s+/i.test(clean)
      const hasHostSub = clean.toLowerCase().includes(hostBase.toLowerCase())
      if (!hasCommas && clean.length > 1 && clean.length < 40 && (!looksGeneric || hasHostSub)) return clean
    }
  }
  return hostPretty
}

// ─── Flight plan types (internal, post-inference) ──────────────────
interface Flight { start: string; end: string; spend: number }
interface PropertyRow { id: string; logo: string | null; spend: number; flights: Flight[] }
interface ChannelNode { id: string; type: 'channel'; children: PropertyRow[] }
interface GroupNode { id: 'Audio' | 'Video' | 'Digital' | 'OOH'; type: 'group'; children: ChannelNode[] }
interface Plan {
  brandName: string
  industry: string
  budget: number
  reach: string
  frequency: string
  response: string
  startDate: Date
  endDate: Date
  channels: GroupNode[]
}

function fmtCurrency(v: number) { return v >= 1e6 ? `$${(v / 1e6).toFixed(1)}M` : v >= 1000 ? `$${Math.round(v / 1000)}K` : `$${v}` }
const round1k = (v: number) => Math.max(0, Math.round(v / 1000) * 1000)

// ─── Flight pattern generators ─────────────────────────────────────
function generateFlights(totalSpend: number, start: Date, end: Date, pattern: 'continuous' | 'burst' | 'pulse' = 'burst'): Flight[] {
  const iso = (d: Date) => d.toISOString().slice(0, 10)
  const totalMs = end.getTime() - start.getTime()
  if (totalSpend <= 0) return []

  if (pattern === 'continuous') {
    return [{ start: iso(start), end: iso(end), spend: round1k(totalSpend) }]
  }
  if (pattern === 'burst') {
    // Two bursts with a mid-break
    const b1End = new Date(start.getTime() + totalMs * 0.45)
    const b2Start = new Date(start.getTime() + totalMs * 0.60)
    const b1Spend = round1k(totalSpend * 0.60)
    const b2Spend = round1k(totalSpend - b1Spend)
    return [
      { start: iso(start), end: iso(b1End), spend: b1Spend },
      { start: iso(b2Start), end: iso(end), spend: b2Spend },
    ].filter(f => f.spend > 0)
  }
  // pulse — three short flights
  const step = totalMs / 3
  const perFlight = round1k(totalSpend / 3)
  return [0, 1, 2].map(i => ({
    start: iso(new Date(start.getTime() + step * i + step * 0.1)),
    end: iso(new Date(start.getTime() + step * (i + 0.7))),
    spend: perFlight,
  }))
}

// Pick a flight pattern per group/channel type for variety
function pickPattern(group: string, channelName: string): 'continuous' | 'burst' | 'pulse' {
  if (channelName.includes('Streaming TV') || channelName.includes('Online Video') || channelName.includes('Search')) return 'continuous'
  if (group === 'OOH' || channelName.includes('Linear TV') || channelName.includes('Podcasts')) return 'continuous'
  if (channelName.includes('Paid Social')) return 'burst'
  return 'burst'
}

// Group a list of (group, channel, property, pct) into the nested plan shape
interface PropertyAlloc { group: GroupNode['id']; channel: string; property: string; pctOfGroup: number }

function buildPlanFromAllocations(
  brandName: string,
  industryLabel: string,
  budget: number,
  mix: { audio: number; video: number; digital: number; ooh: number },
  allocations: PropertyAlloc[],
  startDate: Date,
  endDate: Date,
): Plan {
  // Compute per-group spend
  const groupSpend: Record<GroupNode['id'], number> = {
    Audio: round1k(budget * mix.audio),
    Video: round1k(budget * mix.video),
    Digital: round1k(budget * mix.digital),
    OOH: round1k(budget * (mix.ooh || 0)),
  }

  // Reach/frequency heuristic
  const reach = Math.min(86, 50 + Math.log10(Math.max(budget, 1) / 100000) * 9).toFixed(1)
  const freq = (2.6 + Math.log10(Math.max(budget, 1) / 100000) * 0.4).toFixed(1)
  const response = `$${Math.round((budget * 0.17) / 1000)}K`

  const groupOrder: GroupNode['id'][] = ['Audio', 'Video', 'Digital', 'OOH']
  const channels: GroupNode[] = []

  for (const gid of groupOrder) {
    const inGroup = allocations.filter(a => a.group === gid)
    if (inGroup.length === 0 || groupSpend[gid] <= 0) continue

    // Group by channel sub-category
    const byChannel = new Map<string, PropertyAlloc[]>()
    for (const a of inGroup) {
      if (!byChannel.has(a.channel)) byChannel.set(a.channel, [])
      byChannel.get(a.channel)!.push(a)
    }

    const children: ChannelNode[] = []
    for (const [channelName, allocs] of byChannel.entries()) {
      const props: PropertyRow[] = allocs.map(a => {
        const spend = round1k(groupSpend[gid] * a.pctOfGroup)
        const pattern = pickPattern(gid, channelName)
        return {
          id: a.property,
          logo: a.property,
          spend,
          flights: generateFlights(spend, startDate, endDate, pattern),
        }
      }).filter(p => p.spend > 0)

      if (props.length > 0) children.push({ id: channelName, type: 'channel', children: props })
    }

    if (children.length > 0) channels.push({ id: gid, type: 'group', children })
  }

  return {
    brandName,
    industry: industryLabel,
    budget,
    reach: `${reach}%`,
    frequency: freq,
    response,
    startDate,
    endDate,
    channels,
  }
}

// ─── Heuristic allocation (fallback) ───────────────────────────────
function heuristicAllocations(industry: FallbackIndustry): PropertyAlloc[] {
  // Sensible defaults per group — mirrors the old hardcoded split
  const allocs: PropertyAlloc[] = []
  if (industry.channelMix.audio > 0) {
    allocs.push({ group: 'Audio', channel: 'Streaming Audio', property: 'Spotify', pctOfGroup: 0.55 })
    allocs.push({ group: 'Audio', channel: 'Streaming Audio', property: 'Pandora', pctOfGroup: 0.25 })
    allocs.push({ group: 'Audio', channel: 'Podcasts', property: 'Podcasts', pctOfGroup: 0.20 })
  }
  if (industry.channelMix.video > 0) {
    allocs.push({ group: 'Video', channel: 'Streaming TV', property: 'Netflix', pctOfGroup: 0.40 })
    allocs.push({ group: 'Video', channel: 'Streaming TV', property: 'Hulu', pctOfGroup: 0.30 })
    allocs.push({ group: 'Video', channel: 'Streaming TV', property: 'Paramount+', pctOfGroup: 0.30 })
  }
  if (industry.channelMix.digital > 0) {
    allocs.push({ group: 'Digital', channel: 'Paid Social', property: 'Facebook', pctOfGroup: 0.30 })
    allocs.push({ group: 'Digital', channel: 'Paid Social', property: 'Instagram', pctOfGroup: 0.22 })
    allocs.push({ group: 'Digital', channel: 'Paid Social', property: 'TikTok', pctOfGroup: 0.16 })
    allocs.push({ group: 'Digital', channel: 'Online Video', property: 'YouTube', pctOfGroup: 0.32 })
  }
  if ((industry.channelMix.ooh || 0) > 0) {
    allocs.push({ group: 'OOH', channel: 'Out-of-Home', property: 'Billboards', pctOfGroup: 1.0 })
  }
  return allocs
}

// ─── Logo fetching ─────────────────────────────────────────────────
const FB = 'https://firebasestorage.googleapis.com/v0/b/elegant-clarity-269013.appspot.com/o/Property%20logos%20-%20Halliard%202.0%2F'
const CURATED_LOGOS: Record<string, string> = {
  'Spotify': `${FB}Spotify%20logo.png?alt=media&token=c6fac1a2-7fb1-4c89-903b-5df83a673ec6`,
  'Netflix': `${FB}netflix_logo.jpeg?alt=media&token=9153512c-bdb8-4434-b719-64d3b98e8edd`,
  'Hulu': `${FB}hulu.jpg?alt=media&token=22cb3a0a-5508-4937-b47c-cdb0b8712c87`,
  'Facebook': `${FB}facebook.png?alt=media&token=c3fdce5c-c3cc-416a-8908-e4717b445620`,
  'Instagram': `${FB}instagram.jpeg?alt=media&token=25a91f14-5013-4a82-a8cf-ce3519efbfc4`,
  'TikTok': `${FB}tiktok.jpg?alt=media&token=a31f1e63-44cf-45ff-bf2c-960ca460e610`,
  'YouTube': `${FB}youtube.jpg?alt=media&token=7ce500a1-87c5-4b25-bcf9-9bb290963ff7`,
  'Paramount+': `${FB}P%2B.jpg?alt=media&token=02c60ca3-e895-48d6-bb0c-eddbb9bc8fb0`,
  'Pandora': `${FB}Pandora%20Logo.png?alt=media&token=4f3aa137-6a76-4f1a-9179-cca7b083a641`,
}

// Clearbit fallback domains for properties not in the curated set
const PROPERTY_DOMAINS: Record<string, string> = {
  'iHeartRadio': 'iheart.com',
  'SiriusXM': 'siriusxm.com',
  'Spotify Podcasts': 'spotify.com',
  'Peacock': 'peacocktv.com',
  'Disney+': 'disneyplus.com',
  'Max': 'max.com',
  'Prime Video': 'primevideo.com',
  'Tubi': 'tubitv.com',
  'Pluto TV': 'pluto.tv',
  'LinkedIn': 'linkedin.com',
  'X (Twitter)': 'x.com',
  'Reddit': 'reddit.com',
  'Snapchat': 'snapchat.com',
  'Google Search': 'google.com',
  'Bing': 'bing.com',
  'Google Display': 'google.com',
  'Programmatic Display': 'thetradedesk.com',
}

const logoDataCache = new Map<string, string>()

async function fetchImageAsDataUrl(url: string): Promise<string | null> {
  if (logoDataCache.has(url)) return logoDataCache.get(url)!
  try {
    const res = await fetch(url, { signal: AbortSignal.timeout(6000), headers: { 'User-Agent': 'Mozilla/5.0' } })
    if (!res.ok) return null
    const ct = res.headers.get('content-type') || 'image/png'
    if (ct.includes('svg')) return null
    const buf = Buffer.from(await res.arrayBuffer())
    const dataUrl = `data:${ct};base64,${buf.toString('base64')}`
    logoDataCache.set(url, dataUrl)
    return dataUrl
  } catch { return null }
}

async function resolvePropertyLogo(name: string): Promise<string | null> {
  if (CURATED_LOGOS[name]) {
    const r = await fetchImageAsDataUrl(CURATED_LOGOS[name])
    if (r) return r
  }
  const domain = PROPERTY_DOMAINS[name]
  if (domain) {
    const r = await fetchImageAsDataUrl(`https://logo.clearbit.com/${domain}?size=128`)
    if (r) return r
  }
  return null
}

// ─── Render ────────────────────────────────────────────────────────
const groupStyles: Record<string, { accent: string; barBg: string; barBorder: string; barText: string }> = {
  Audio: { accent: '#F59E0B', barBg: '#FEF9C3', barBorder: '#FCD34D', barText: '#92400E' },
  Video: { accent: '#8B5CF6', barBg: '#EDE9FE', barBorder: '#C4B5FD', barText: '#5B21B6' },
  Digital: { accent: '#3B82F6', barBg: '#DBEAFE', barBorder: '#93C5FD', barText: '#1E40AF' },
  OOH: { accent: '#10B981', barBg: '#D1FAE5', barBorder: '#6EE7B7', barText: '#065F46' },
}

const WIDTH = 1200
const OUTER_PAD = 40
const INNER_W = WIDTH - OUTER_PAD * 2
const ROW_H = 48
const GROUP_H = 36
const CHANNEL_H = 34
const TREE_COL_W = 240
const SPEND_COL_W = 90
const HEADER_H = 72
const WELL_H = 84
const MONTH_H = 32

async function renderPlanPng(plan: Plan, brandLogoDataUrl: string | null): Promise<Buffer> {
  const planStartMs = plan.startDate.getTime()
  const planEndMs = plan.endDate.getTime()
  const planDurationMs = planEndMs - planStartMs
  const dateToX = (s: string) => Math.max(0, Math.min(1, (new Date(s).getTime() - planStartMs) / planDurationMs))

  const months: { label: string; startPct: number; endPct: number }[] = []
  let md = new Date(plan.startDate)
  while (md <= plan.endDate) {
    const ms = new Date(md.getFullYear(), md.getMonth(), 1)
    const me = new Date(md.getFullYear(), md.getMonth() + 1, 0)
    months.push({
      label: ms.toLocaleDateString('en-US', { month: 'short' }).toUpperCase(),
      startPct: Math.max(0, dateToX(ms.toISOString())),
      endPct: Math.min(1, dateToX(me.toISOString())),
    })
    md = new Date(md.getFullYear(), md.getMonth() + 1, 1)
  }

  type Row = { type: 'group' | 'channel' | 'property'; id: string; group?: string; indent?: number; logo?: string | null; spend?: number; flights?: Flight[] }
  const flatRows: Row[] = []
  for (const g of plan.channels) {
    flatRows.push({ type: 'group', id: g.id })
    for (const ch of g.children) {
      flatRows.push({ type: 'channel', id: ch.id, group: g.id, indent: 1 })
      for (const p of ch.children) {
        flatRows.push({ type: 'property', id: p.id, logo: p.logo, spend: p.spend, flights: p.flights, indent: 2, group: g.id })
      }
    }
  }
  const rowH = (r: Row) => (r.type === 'group' ? GROUP_H : r.type === 'channel' ? CHANNEL_H : ROW_H)
  const contentH = flatRows.reduce((s, r) => s + rowH(r), 0)
  const CARD_H = HEADER_H + WELL_H + MONTH_H + contentH
  const TOTAL_H = CARD_H + OUTER_PAD * 2

  // Resolve logos in parallel
  const uniqueLogos = [...new Set(flatRows.filter(r => r.logo).map(r => r.logo as string))]
  const logoCache: Record<string, string | null> = {}
  await Promise.all(uniqueLogos.map(async k => { logoCache[k] = await resolvePropertyLogo(k) }))

  const rowEls = flatRows.map((row, idx) => {
    const h = rowH(row)
    const isGroup = row.type === 'group'
    const isChannel = row.type === 'channel'
    const isProp = row.type === 'property'
    const indent = (row.indent || 0) * 22
    const gid = row.group || row.id
    const gs = groupStyles[gid] || groupStyles.Digital
    const isLast = idx === flatRows.length - 1

    const nameChildren: any[] = []
    if (isGroup) {
      nameChildren.push({ type: 'div', props: { style: { width: 4, height: 16, borderRadius: 2, backgroundColor: gs.accent, flexShrink: 0 } } })
      nameChildren.push({ type: 'div', props: { style: { fontSize: 11, fontWeight: 700, color: '#374151', letterSpacing: '0.05em' }, children: row.id.toUpperCase() } })
    } else if (isChannel) {
      nameChildren.push({ type: 'div', props: { style: { fontSize: 12, fontWeight: 600, color: '#6B7280' }, children: row.id } })
    } else {
      if (row.logo && logoCache[row.logo]) {
        nameChildren.push({ type: 'img', props: { src: logoCache[row.logo], width: 24, height: 24, style: { borderRadius: 5, objectFit: 'cover', flexShrink: 0 } } })
      } else {
        nameChildren.push({ type: 'div', props: { style: { width: 24, height: 24, borderRadius: 5, backgroundColor: gs.barBg, border: `1px solid ${gs.barBorder}`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 10, fontWeight: 700, color: gs.barText, flexShrink: 0 }, children: row.id.charAt(0) } })
      }
      nameChildren.push({ type: 'div', props: { style: { fontSize: 13, fontWeight: 500, color: '#1F2937' }, children: row.id } })
    }

    const spendEl = isProp
      ? { type: 'div', props: { style: { width: SPEND_COL_W, textAlign: 'right', fontSize: 12, fontWeight: 600, color: '#374151', paddingRight: 14, flexShrink: 0 }, children: fmtCurrency(row.spend as number) } }
      : { type: 'div', props: { style: { width: SPEND_COL_W, flexShrink: 0 } } }

    const tlChildren: any[] = []
    for (const m of months) {
      tlChildren.push({ type: 'div', props: { style: { position: 'absolute', left: `${m.startPct * 100}%`, top: 0, bottom: 0, width: 1, backgroundColor: '#F3F4F6' } } })
    }
    if (isProp && row.flights) {
      for (const f of row.flights) {
        const sp = dateToX(f.start), ep = dateToX(f.end), wp = ep - sp
        if (wp <= 0) continue
        tlChildren.push({
          type: 'div',
          props: {
            style: { position: 'absolute', left: `${sp * 100}%`, width: `${wp * 100}%`, height: 28, backgroundColor: gs.barBg, border: `1px solid ${gs.barBorder}`, borderRadius: 6, display: 'flex', alignItems: 'center', justifyContent: 'center' },
            children: { type: 'div', props: { style: { fontSize: 11, fontWeight: 600, color: gs.barText }, children: fmtCurrency(f.spend) } },
          },
        })
      }
    }

    return {
      type: 'div',
      props: {
        style: { display: 'flex', height: h, alignItems: 'center', backgroundColor: isGroup ? '#FAFAFA' : '#FFFFFF', borderBottom: isLast ? 'none' : isGroup ? '1px solid #E5E7EB' : '1px solid #F5F5F5' },
        children: [
          { type: 'div', props: { style: { width: TREE_COL_W, display: 'flex', alignItems: 'center', gap: 8, paddingLeft: 16 + indent, flexShrink: 0 }, children: nameChildren } },
          spendEl,
          { type: 'div', props: { style: { flex: 1, position: 'relative', height: '100%', display: 'flex', alignItems: 'center' }, children: tlChildren } },
        ],
      },
    }
  })

  const well = (label: string, value: string) => ({
    type: 'div',
    props: {
      style: { flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '0 24px' },
      children: [
        { type: 'div', props: { style: { fontSize: 11, fontWeight: 600, color: '#9CA3AF', letterSpacing: '0.06em', marginBottom: 4 }, children: label } },
        { type: 'div', props: { style: { fontSize: 24, fontWeight: 700, color: '#111827' }, children: value } },
      ],
    },
  })
  const divider = () => ({ type: 'div', props: { style: { width: 1, backgroundColor: '#F3F4F6', margin: '14px 0' } } })

  const brandBadge = brandLogoDataUrl
    ? { type: 'img', props: { src: brandLogoDataUrl, width: 40, height: 40, style: { borderRadius: 8, objectFit: 'cover', flexShrink: 0 } } }
    : { type: 'div', props: { style: { width: 40, height: 40, borderRadius: 8, backgroundColor: '#E0E7FF', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 16, fontWeight: 700, color: '#3730A3', flexShrink: 0 }, children: plan.brandName.charAt(0) } }

  const headerEl = {
    type: 'div',
    props: {
      style: { display: 'flex', height: HEADER_H, backgroundColor: '#FFFFFF', borderBottom: '1px solid #E5E7EB', alignItems: 'center', paddingLeft: 20, paddingRight: 24, gap: 14 },
      children: [
        brandBadge,
        {
          type: 'div',
          props: {
            style: { display: 'flex', flexDirection: 'column', flex: 1 },
            children: [
              { type: 'div', props: { style: { fontSize: 10, fontWeight: 700, color: '#9CA3AF', letterSpacing: '0.12em', marginBottom: 2 }, children: 'MEDIA PLAN · H2 2026' } },
              { type: 'div', props: { style: { fontSize: 18, fontWeight: 700, color: '#111827' }, children: plan.brandName } },
            ],
          },
        },
        {
          type: 'div',
          props: {
            style: { display: 'flex', flexDirection: 'column', alignItems: 'flex-end' },
            children: [
              { type: 'div', props: { style: { fontSize: 10, fontWeight: 700, color: '#9CA3AF', letterSpacing: '0.08em', marginBottom: 2 }, children: 'CATEGORY' } },
              { type: 'div', props: { style: { fontSize: 13, fontWeight: 600, color: '#374151' }, children: plan.industry } },
            ],
          },
        },
      ],
    },
  }

  const element = {
    type: 'div',
    props: {
      style: { display: 'flex', flexDirection: 'column', width: WIDTH, height: TOTAL_H, backgroundColor: '#0F172A', padding: OUTER_PAD, fontFamily: 'Inter' },
      children: [{
        type: 'div',
        props: {
          style: { display: 'flex', flexDirection: 'column', width: INNER_W, height: CARD_H, backgroundColor: '#FFFFFF', borderRadius: 12, overflow: 'hidden', boxShadow: '0 20px 60px rgba(0,0,0,0.3), 0 4px 16px rgba(0,0,0,0.15)' },
          children: [
            headerEl,
            {
              type: 'div',
              props: {
                style: { display: 'flex', height: WELL_H, borderBottom: '1px solid #E5E7EB' },
                children: [well('BUDGET', fmtCurrency(plan.budget)), divider(), well('REACH', plan.reach), divider(), well('AVG. FREQUENCY', plan.frequency), divider(), well('RESPONSE EST.', plan.response)],
              },
            },
            {
              type: 'div',
              props: {
                style: { display: 'flex', height: MONTH_H, backgroundColor: '#F9FAFB', borderBottom: '1px solid #E5E7EB', alignItems: 'center' },
                children: [
                  { type: 'div', props: { style: { width: TREE_COL_W, fontSize: 10, fontWeight: 700, color: '#9CA3AF', paddingLeft: 16, letterSpacing: '0.08em', flexShrink: 0 }, children: 'MEDIA TYPE' } },
                  { type: 'div', props: { style: { width: SPEND_COL_W, fontSize: 10, fontWeight: 700, color: '#9CA3AF', textAlign: 'right', paddingRight: 14, letterSpacing: '0.08em', flexShrink: 0 }, children: 'SPEND' } },
                  {
                    type: 'div',
                    props: {
                      style: { flex: 1, position: 'relative', height: '100%', display: 'flex' },
                      children: months.map(m => ({
                        type: 'div',
                        props: {
                          style: { position: 'absolute', left: `${m.startPct * 100}%`, width: `${(m.endPct - m.startPct) * 100}%`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 10, fontWeight: 700, color: '#9CA3AF', letterSpacing: '0.08em', height: '100%' },
                          children: m.label,
                        },
                      })),
                    },
                  },
                ],
              },
            },
            ...rowEls,
          ],
        },
      }],
    },
  }

  const svg = await satori(element as any, {
    width: WIDTH, height: TOTAL_H,
    fonts: [
      { name: 'Inter', data: interRegular, weight: 400, style: 'normal' },
      { name: 'Inter', data: interSemiBold, weight: 600, style: 'normal' },
      { name: 'Inter', data: interBold, weight: 700, style: 'normal' },
    ],
  })
  const resvg = new Resvg(svg, { fitTo: { mode: 'width', value: WIDTH * 2 } })
  return resvg.render().asPng()
}

// ─── Public orchestration ──────────────────────────────────────────
export async function generateSamplePlan(rawUrl: string, overrideBudget?: number): Promise<{ png: Buffer; summary: PlanSummary }> {
  const urlStr = rawUrl.startsWith('http') ? rawUrl : `https://${rawUrl}`
  const hostname = new URL(urlStr).hostname

  // Start date = beginning of next calendar month, 6-month plan
  const now = new Date()
  const startDate = new Date(now.getFullYear(), now.getMonth() + 1, 1)
  const endDate = new Date(startDate.getFullYear(), startDate.getMonth() + 6, 0)

  // ── 1. Try AI inference (Firecrawl + Claude) ─────────────────────
  let ai: AIPlanInference | null = null
  try {
    ai = await inferPlanWithAI(urlStr, hostname)
  } catch (err) {
    console.warn('[generateSamplePlan] AI path threw:', err)
  }

  let summary: PlanSummary
  let plan: Plan

  if (ai) {
    const budget = overrideBudget || ai.recommendedBudget || 850000
    const allocs: PropertyAlloc[] = ai.properties.map(p => ({
      group: p.group as GroupNode['id'],
      channel: p.channel,
      property: p.property,
      pctOfGroup: p.pctOfGroup,
    }))
    plan = buildPlanFromAllocations(
      ai.brandName, ai.industry, budget,
      ai.channelMix, allocs, startDate, endDate,
    )
    summary = {
      hostname,
      brandName: ai.brandName,
      industry: ai.industry,
      targetAudience: ai.targetAudience,
      rationale: ai.rationale,
      budget,
      reach: plan.reach,
      frequency: plan.frequency,
      response: plan.response,
      channelMix: ai.channelMix,
      inferenceMode: 'ai',
    }
  } else {
    // ── 2. Fallback: heuristic ─────────────────────────────────────
    console.log('[generateSamplePlan] Falling back to heuristic inference')
    let body = ''
    try {
      const res = await fetch(urlStr, { headers: { 'User-Agent': 'Mozilla/5.0 (Halliard Plan Generator)' }, redirect: 'follow', signal: AbortSignal.timeout(8000) })
      body = await res.text()
    } catch {}
    const meta: PlanMeta = body ? extractMeta(body) : { title: '', description: '', keywords: '', raw: hostname }
    const { industry } = heuristicIndustry(meta, hostname)
    const brandName = heuristicBrandName(hostname, meta)
    const budget = overrideBudget || industry.defaultBudget
    const allocs = heuristicAllocations(industry)
    plan = buildPlanFromAllocations(
      brandName, industry.label, budget,
      industry.channelMix, allocs, startDate, endDate,
    )
    summary = {
      hostname, brandName, industry: industry.label,
      budget, reach: plan.reach, frequency: plan.frequency, response: plan.response,
      channelMix: industry.channelMix,
      inferenceMode: 'heuristic',
    }
  }

  // Brand logo (header badge)
  let brandLogo: string | null = null
  try { brandLogo = await fetchImageAsDataUrl(`https://logo.clearbit.com/${hostname.replace(/^www\./, '')}?size=128`) } catch {}
  if (!brandLogo) { try { brandLogo = await fetchImageAsDataUrl(`https://www.google.com/s2/favicons?domain=${hostname}&sz=128`) } catch {} }

  const png = await renderPlanPng(plan, brandLogo)
  return { png, summary }
}
