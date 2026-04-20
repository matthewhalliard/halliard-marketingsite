/**
 * Claude-generated narrative for the MMM quiz result card.
 */
import Anthropic from '@anthropic-ai/sdk'
import type { ScoringResult } from './scoring'

const ANTHROPIC_KEY = process.env.ANTHROPIC_API_KEY

export interface Narrative {
  profileSentence: string
  subScoreBlurbs: { data: string; mix: string; scale: string; measurement: string }
  topUnlocks: { title: string; body: string }[]
  ctaLine: string
}

const SYSTEM_PROMPT = `You are a senior analyst at Halliard, a marketing mix modeling company that delivers causal MMMs for independent agencies and mid-market advertisers at 1/10th the cost of legacy vendors ($25K, 3-4 weeks).

A prospect just took a 10-question MMM Readiness Quiz. You will be given their score profile and answers. Output a JSON object with:

{
  "profileSentence": string,      // ONE sentence summarizing their profile (e.g. "You're a $5M/year diversified advertiser with 2 years of data and heavy unmeasurable spend.")
  "subScoreBlurbs": {             // ONE short line per sub-score (max 90 chars each)
    "data": string,               // e.g. "Strong — history and warehouse both check out."
    "mix": string,
    "scale": string,
    "measurement": string
  },
  "topUnlocks": [                 // EXACTLY 3 actionable unlocks they should do next. Title max 50 chars, body max 140 chars.
    { "title": string, "body": string },
    { "title": string, "body": string },
    { "title": string, "body": string }
  ],
  "ctaLine": string               // ONE sentence recommending a next step with Halliard. Match urgency/qualification.
}

RULES:
- Be specific and factual about their answers. Don't be generic.
- Don't flatter; be honest. If they're not ready, say so clearly but constructively.
- If score ≥ 80 or they're an urgent buyer (CFO pressure / attribution breakdown) → the CTA should push for a 20-minute scoping call.
- If score 60–79 → CTA should push for a scoping call but frame it as exploratory.
- If score 40–59 → CTA should suggest a shorter "readiness review" call to close gaps.
- If score < 40 or data/budget hard-blockers → CTA should NOT push a sales call. Instead suggest concrete prerequisites they should solve first (e.g. "Get 12+ months of weekly sales data into one place, then come back.").
- Top unlocks should ALWAYS be specific and technical, not fluffy. Examples:
  - "Run a geo-lift test in Q3" / "This gives the MMM a ground-truth calibration on your biggest channel."
  - "Consolidate sales data into BigQuery" / "We need 78+ weeks minimum; scattered data is the #1 MMM blocker."
  - "Get CFO aligned on the $25K investment" / "Your score shows strong fundamentals. CFO buy-in is what's missing."
- NEVER invent facts. Only reference things from their answers.
- Output ONLY the JSON object, no markdown fences, no prose before or after.`

export async function generateNarrative(result: ScoringResult): Promise<Narrative> {
  if (!ANTHROPIC_KEY) return fallbackNarrative(result)

  const client = new Anthropic({ apiKey: ANTHROPIC_KEY })

  const userMsg = `RESULT:
  total: ${result.total}/100
  sub-scores: data=${result.subScores.data}, mix=${result.subScores.mix}, scale=${result.subScores.scale}, measurement=${result.subScores.measurement}
  hard blockers: ${result.hardBlockers.length ? result.hardBlockers.join(', ') : 'none'}
  profile: ${JSON.stringify(result.profile)}

ANSWERS (in order):
${result.answerSummary.map(a => `  Q: ${a.question}\n  A: ${a.answer}`).join('\n')}

Generate the narrative JSON.`

  try {
    const resp = await client.messages.create({
      model: 'claude-haiku-4-5',
      max_tokens: 1200,
      system: SYSTEM_PROMPT,
      messages: [{ role: 'user', content: userMsg }],
    })
    const textBlock = resp.content.find(b => b.type === 'text')
    if (!textBlock || textBlock.type !== 'text') return fallbackNarrative(result)
    const raw = textBlock.text.trim()
    const jsonMatch = raw.match(/\{[\s\S]*\}/)
    if (!jsonMatch) return fallbackNarrative(result)
    const parsed = JSON.parse(jsonMatch[0]) as Narrative
    // Sanity check shape
    if (
      !parsed.profileSentence ||
      !parsed.subScoreBlurbs ||
      !Array.isArray(parsed.topUnlocks) ||
      parsed.topUnlocks.length !== 3 ||
      !parsed.ctaLine
    ) {
      return fallbackNarrative(result)
    }
    return parsed
  } catch (err) {
    console.warn('[mmm-quiz narrative] Claude error:', err)
    return fallbackNarrative(result)
  }
}

function fallbackNarrative(result: ScoringResult): Narrative {
  const { total, subScores, profile, hardBlockers } = result
  return {
    profileSentence: `You're a ${profile.estimatedBudget} advertiser with a ${profile.channelBand === 'diverse' || profile.channelBand === 'full_stack' ? 'diversified' : 'limited'} channel mix.`,
    subScoreBlurbs: {
      data: subScores.data >= 70 ? 'Strong — you have the history and data infrastructure.' : 'Gaps here. MMM needs clean weekly history for 12+ months.',
      mix: subScores.mix >= 70 ? 'Good variance and channel count to model.' : 'Limited channel variance may cap what MMM can isolate.',
      scale: subScores.scale >= 70 ? 'Budget justifies the MMM investment.' : 'Budget may be below the ROI threshold for MMM.',
      measurement: subScores.measurement >= 70 ? 'Measurement maturity is good.' : 'Lift-testing would sharpen future MMM results.',
    },
    topUnlocks: [
      { title: 'Consolidate sales and media data', body: 'MMM needs 78+ weeks of clean weekly data in one place.' },
      { title: 'Run a geo-lift test for calibration', body: 'Ground-truths the model on your biggest channel.' },
      { title: 'Align CFO on the investment', body: 'A $25K, 4-week model is cheap — but a clear sponsor unblocks scoping.' },
    ],
    ctaLine: total >= 60 && hardBlockers.length === 0
      ? 'You\'re a strong MMM candidate. Book a 20-minute scoping call — we can start in 3 weeks.'
      : 'Close the gaps above, then come back. Happy to run a free 20-min readiness review if helpful.',
  }
}
