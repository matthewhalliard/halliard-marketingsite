/**
 * MMM quiz scoring engine.
 */
import { QUIZ_QUESTIONS, QuizOption, SubScoreKey } from './questions'

export interface QuizAnswers {
  [questionId: string]: string // option id
}

export interface SubScores {
  data: number        // 0-100
  mix: number         // 0-100
  scale: number       // 0-100
  measurement: number // 0-100
}

export interface ScoringResult {
  total: number       // 0-100
  subScores: SubScores
  profile: ProfileTags
  hardBlockers: SubScoreKey[]
  answerSummary: { questionId: string; question: string; answer: string; optionId: string }[]
}

export interface ProfileTags {
  budgetBand: 'under_500k' | '500k_2m' | '2m_10m' | '10m_50m' | '50m_plus' | 'unknown'
  channelBand: 'few' | 'multi' | 'diverse' | 'full_stack' | 'unknown'
  historyBand: 'short' | 'medium' | 'long' | 'very_long' | 'unknown'
  motivation: 'cfo' | 'scaling' | 'attribution' | 'competitor' | 'curious' | 'unknown'
  unmeasurableBand: 'low' | 'medium' | 'high' | 'very_high' | 'unknown'
  isUrgent: boolean      // CFO pressure or attribution breakdown
  isQualified: boolean   // worth a sales call
  estimatedBudget: string // human-readable budget bucket for copy
}

// Sub-score weights in the final total
const WEIGHTS: Record<SubScoreKey, number> = {
  data: 0.30,
  mix: 0.20,
  scale: 0.25,
  measurement: 0.25,
}

export function scoreQuiz(answers: QuizAnswers): ScoringResult {
  // Tally raw points per sub-score (max 10 each per question that contributes)
  const raw: Record<SubScoreKey, { sum: number; max: number }> = {
    data: { sum: 0, max: 0 },
    mix: { sum: 0, max: 0 },
    scale: { sum: 0, max: 0 },
    measurement: { sum: 0, max: 0 },
  }
  const hardBlockers = new Set<SubScoreKey>()
  const answerSummary: ScoringResult['answerSummary'] = []

  for (const q of QUIZ_QUESTIONS) {
    const optionId = answers[q.id]
    const option = q.options.find(o => o.id === optionId)
    if (!option) continue

    answerSummary.push({ questionId: q.id, question: q.prompt, answer: option.label, optionId: option.id })

    // For each sub-score this question touches, add both the sum and the max
    const touched = new Set<SubScoreKey>()
    for (const opt of q.options) {
      for (const key of Object.keys(opt.points) as SubScoreKey[]) touched.add(key)
    }
    for (const key of touched) {
      const pts = option.points[key] ?? 0
      raw[key].sum += pts
      raw[key].max += 10
    }

    if (option.hardBlocker) hardBlockers.add(option.hardBlocker)
  }

  // Convert each sub-score to 0-100
  const subScores: SubScores = {
    data:        raw.data.max        ? Math.round((raw.data.sum        / raw.data.max)        * 100) : 0,
    mix:         raw.mix.max         ? Math.round((raw.mix.sum         / raw.mix.max)         * 100) : 0,
    scale:       raw.scale.max       ? Math.round((raw.scale.sum       / raw.scale.max)       * 100) : 0,
    measurement: raw.measurement.max ? Math.round((raw.measurement.sum / raw.measurement.max) * 100) : 0,
  }

  // Weighted total
  let total = Math.round(
    subScores.data * WEIGHTS.data +
    subScores.mix * WEIGHTS.mix +
    subScores.scale * WEIGHTS.scale +
    subScores.measurement * WEIGHTS.measurement,
  )
  // Cap hard-blocked scenarios so a disqualified lead can't fluke above 70
  if (hardBlockers.size > 0) total = Math.min(total, 65)

  // Profile tags (for Claude narrative + CTA routing)
  const profile = buildProfile(answers, total, hardBlockers)

  return {
    total: Math.max(0, Math.min(100, total)),
    subScores,
    profile,
    hardBlockers: [...hardBlockers],
    answerSummary,
  }
}

function buildProfile(answers: QuizAnswers, total: number, hardBlockers: Set<SubScoreKey>): ProfileTags {
  const budget = answers['budget']
  const channels = answers['channels']
  const history = answers['history']
  const motivation = answers['motivation']
  const unmeasurable = answers['unmeasurable']

  const budgetBand = (budget || 'unknown') as ProfileTags['budgetBand']
  const channelBand =
    channels === '1_2' ? 'few' :
    channels === '3_5' ? 'multi' :
    channels === '6_10' ? 'diverse' :
    channels === '10_plus' ? 'full_stack' : 'unknown'
  const historyBand =
    history === 'lt_6mo' ? 'short' :
    history === '6_12mo' ? 'medium' :
    history === '1_2yr' ? 'long' :
    history === '2_plus' ? 'very_long' : 'unknown'
  const motivationBand = (motivation || 'unknown') as ProfileTags['motivation']
  const unmeasurableBand =
    unmeasurable === 'under_10' ? 'low' :
    unmeasurable === '10_30' ? 'medium' :
    unmeasurable === '30_60' ? 'high' :
    unmeasurable === '60_plus' ? 'very_high' : 'unknown'

  const isUrgent = motivationBand === 'cfo' || motivationBand === 'attribution'
  const isQualified = total >= 60 && hardBlockers.size === 0

  const estimatedBudget =
    budget === 'under_500k' ? 'Under $500K/yr' :
    budget === '500k_2m'    ? '$500K–$2M/yr' :
    budget === '2m_10m'     ? '$2M–$10M/yr' :
    budget === '10m_50m'    ? '$10M–$50M/yr' :
    budget === '50m_plus'   ? '$50M+/yr' :
    'unknown budget'

  return { budgetBand, channelBand, historyBand, motivation: motivationBand, unmeasurableBand, isUrgent, isQualified, estimatedBudget }
}

// Human-readable tier for the score card header
export function scoreTier(total: number, hardBlockers: SubScoreKey[]): { label: string; tone: 'strong' | 'emerging' | 'not_yet' } {
  if (hardBlockers.length > 0 && total < 60) return { label: 'Not Quite Ready', tone: 'not_yet' }
  if (total >= 80) return { label: 'MMM-Ready Today', tone: 'strong' }
  if (total >= 60) return { label: 'Strong Candidate', tone: 'strong' }
  if (total >= 40) return { label: 'Emerging Fit', tone: 'emerging' }
  return { label: 'Not Quite Ready', tone: 'not_yet' }
}
