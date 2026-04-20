import type { NextApiRequest, NextApiResponse } from 'next'
import { QUIZ_QUESTIONS } from '../../lib/mmm-quiz/questions'
import { scoreQuiz, scoreTier } from '../../lib/mmm-quiz/scoring'
import { generateNarrative } from '../../lib/mmm-quiz/narrative'
import { renderScoreCard } from '../../lib/mmm-quiz/render'

export const config = {
  api: { responseLimit: '3mb' },
  maxDuration: 30,
}

// Cheap in-memory rate limiter (per warm Lambda)
const hits = new Map<string, number[]>()
function rateLimit(ip: string, limit = 15, windowMs = 60_000): boolean {
  const now = Date.now()
  const arr = (hits.get(ip) || []).filter(t => now - t < windowMs)
  if (arr.length >= limit) { hits.set(ip, arr); return false }
  arr.push(now)
  hits.set(ip, arr)
  return true
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST')
    return res.status(405).json({ error: 'Method not allowed' })
  }
  const ip = (req.headers['x-forwarded-for'] as string)?.split(',')[0].trim() || req.socket.remoteAddress || 'anon'
  if (!rateLimit(ip)) return res.status(429).json({ error: 'Slow down — try again in a minute.' })

  const { answers } = (req.body || {}) as { answers?: Record<string, string> }
  if (!answers || typeof answers !== 'object') {
    return res.status(400).json({ error: 'Missing answers.' })
  }

  // Validate every question has a known answer
  for (const q of QUIZ_QUESTIONS) {
    const a = answers[q.id]
    if (!a) return res.status(400).json({ error: `Missing answer for ${q.id}` })
    if (!q.options.find(o => o.id === a)) return res.status(400).json({ error: `Invalid option for ${q.id}: ${a}` })
  }

  try {
    const result = scoreQuiz(answers)
    const narrative = await generateNarrative(result)
    const png = await renderScoreCard(result, narrative)
    const tier = scoreTier(result.total, result.hardBlockers)

    return res.status(200).json({
      summary: {
        total: result.total,
        subScores: result.subScores,
        hardBlockers: result.hardBlockers,
        tier,
        profile: result.profile,
      },
      narrative,
      pngBase64: png.toString('base64'),
      pngMime: 'image/png',
    })
  } catch (err: any) {
    console.error('[mmm-quiz-result] error:', err)
    return res.status(500).json({ error: 'Failed to score quiz.', detail: err?.message })
  }
}
