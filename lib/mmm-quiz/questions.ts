/**
 * MMM Readiness Quiz — question set + scoring rubric.
 *
 * 10 questions, all clickable, no free text. Each answer maps to points across
 * four sub-scores (data, mix, scale, measurement). Total = weighted blend.
 */

export type SubScoreKey = 'data' | 'mix' | 'scale' | 'measurement'

export interface QuizOption {
  id: string
  label: string
  // Points awarded to each sub-score (0-10 scale per sub-score)
  points: Partial<Record<SubScoreKey, number>>
  // Optional flag when this answer is an MMM disqualifier signal
  hardBlocker?: SubScoreKey
}

export interface QuizQuestion {
  id: string
  prompt: string
  helper?: string
  options: QuizOption[]
}

export const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: 'budget',
    prompt: 'How big is your annual media budget?',
    helper: 'Paid advertising only — agencies, TV, digital, OOH, etc.',
    options: [
      { id: 'under_500k',  label: 'Under $500K',             points: { scale: 2 }, hardBlocker: 'scale' },
      { id: '500k_2m',     label: '$500K – $2M',             points: { scale: 5 } },
      { id: '2m_10m',      label: '$2M – $10M',              points: { scale: 8 } },
      { id: '10m_50m',     label: '$10M – $50M',             points: { scale: 10 } },
      { id: '50m_plus',    label: '$50M+',                   points: { scale: 10 } },
    ],
  },
  {
    id: 'channels',
    prompt: 'How many marketing channels do you run actively?',
    helper: 'Count TV, CTV, streaming audio, paid social, search, display, OOH, print, etc. each as one.',
    options: [
      { id: '1_2',   label: '1–2 — mostly one channel',        points: { mix: 2 }, hardBlocker: 'mix' },
      { id: '3_5',   label: '3–5 — multi-channel basics',      points: { mix: 5 } },
      { id: '6_10',  label: '6–10 — diversified mix',          points: { mix: 9 } },
      { id: '10_plus', label: '10+ — full stack',              points: { mix: 10 } },
    ],
  },
  {
    id: 'history',
    prompt: 'How long have you been running your current media mix?',
    helper: 'We need enough history to model seasonality + response decay.',
    options: [
      { id: 'lt_6mo',  label: 'Less than 6 months',       points: { data: 1 }, hardBlocker: 'data' },
      { id: '6_12mo',  label: '6–12 months',              points: { data: 4 } },
      { id: '1_2yr',   label: '1–2 years',                points: { data: 8 } },
      { id: '2_plus',  label: '2+ years',                 points: { data: 10 } },
    ],
  },
  {
    id: 'variance',
    prompt: 'Do your weekly or monthly spend levels vary much?',
    helper: 'Variance is how MMMs identify channel impact. Flat spend = no signal.',
    options: [
      { id: 'flat',       label: 'Very flat — about the same every month', points: { data: 2, measurement: 2 } },
      { id: 'seasonal',   label: 'Some seasonality (holidays, launches)',  points: { data: 6, measurement: 6 } },
      { id: 'lots',       label: 'Lots of variance — we test and shift a lot', points: { data: 10, measurement: 9 } },
      { id: 'dunno',      label: "I honestly don't know",                  points: { data: 3, measurement: 3 } },
    ],
  },
  {
    id: 'motivation',
    prompt: "What's your #1 reason for looking at MMM right now?",
    options: [
      { id: 'cfo',          label: 'CFO/finance is asking where the money goes',          points: { scale: 2, measurement: 2 } },
      { id: 'scaling',      label: "We're about to increase budget and want confidence",  points: { scale: 2, measurement: 2 } },
      { id: 'attribution',  label: 'Attribution in our analytics has stopped working (iOS, privacy)', points: { measurement: 3 } },
      { id: 'competitor',   label: 'A competitor just did one and we feel behind',        points: { measurement: 1 } },
      { id: 'curious',      label: 'Curious / research mode',                             points: {} },
    ],
  },
  {
    id: 'unmeasurable',
    prompt: 'How much of your spend is in "unmeasurable" channels?',
    helper: 'Linear TV, CTV, OOH, radio, podcasts, sponsorships, print.',
    options: [
      { id: 'under_10', label: 'Under 10%',        points: { mix: 3, measurement: 4 } },
      { id: '10_30',    label: '10–30%',           points: { mix: 6, measurement: 7 } },
      { id: '30_60',    label: '30–60%',           points: { mix: 9, measurement: 10 } },
      { id: '60_plus',  label: '60%+',             points: { mix: 10, measurement: 10 } },
      { id: 'dunno',    label: "I don't know",     points: { measurement: 2 } },
    ],
  },
  {
    id: 'sales_data',
    prompt: 'Do you have weekly sales or conversion data going back 12+ months?',
    options: [
      { id: 'warehouse',  label: 'Yes — in a warehouse (Snowflake/BigQuery/Redshift)', points: { data: 10 } },
      { id: 'platform',   label: 'Yes — in GA4, Shopify, our CRM, etc.',               points: { data: 7 } },
      { id: 'scattered',  label: "Kind of — it's scattered",                           points: { data: 3 }, hardBlocker: 'data' },
      { id: 'no',         label: 'No, not really',                                     points: { data: 1 }, hardBlocker: 'data' },
    ],
  },
  {
    id: 'geo_tests',
    prompt: 'Are you running any geo-level experiments or holdout tests?',
    helper: 'These are the gold standard for calibrating MMM outputs.',
    options: [
      { id: 'regular',    label: 'Yes, regularly',                                    points: { measurement: 10 } },
      { id: 'tried',      label: "We've tried once or twice",                         points: { measurement: 6 } },
      { id: 'no_interested', label: 'No, but interested',                             points: { measurement: 4 } },
      { id: 'no_impossible', label: 'No, and not really possible for our business',   points: { measurement: 2 } },
    ],
  },
  {
    id: 'attribution_today',
    prompt: 'How is your attribution set up today?',
    options: [
      { id: 'last_click',  label: 'Last-click in GA4 / ad platforms',            points: { measurement: 3 } },
      { id: 'mta',         label: 'Multi-touch attribution tool (Rockerbox, Dreamdata, etc.)', points: { measurement: 7 } },
      { id: 'none',        label: "We don't really have attribution",           points: { measurement: 2 } },
      { id: 'mmm_already', label: 'We have an MMM already and want to switch', points: { measurement: 9 } },
      { id: 'custom',      label: 'Custom / internal model',                   points: { measurement: 8 } },
    ],
  },
  {
    id: 'champion',
    prompt: 'Who would champion an MMM project internally?',
    helper: 'Projects need an owner to move fast.',
    options: [
      { id: 'me',        label: 'Me — I would drive it',           points: { scale: 2, measurement: 1 } },
      { id: 'cmo',       label: 'CMO / VP Marketing',              points: { scale: 2, measurement: 1 } },
      { id: 'cfo',       label: 'CFO / Finance',                   points: { scale: 3 } },
      { id: 'analytics', label: 'Data / Analytics team',           points: { scale: 2, measurement: 2 } },
      { id: 'unsure',    label: 'Not sure yet',                    points: {} },
    ],
  },
]

export function totalQuestions(): number {
  return QUIZ_QUESTIONS.length
}
