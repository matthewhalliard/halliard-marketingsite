import type { NextApiRequest, NextApiResponse } from 'next'
import { generateSamplePlan } from '../../lib/plan-generator'

// Allow larger response (PNG ~250KB)
export const config = {
  api: {
    responseLimit: '2mb',
  },
  // Cap execution at 60s — AI inference path needs Firecrawl (~3s) + Claude (~2s) +
  // logo fetches + render. Plenty of headroom.
  maxDuration: 60,
}

const MAX_URL_LEN = 200
const URL_RE = /^(https?:\/\/)?([a-zA-Z0-9]([a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?\.)+[a-zA-Z]{2,}(\/.*)?$/

// Very small in-memory rate limiter (per warm Lambda). Not perfect, but
// keeps drive-by abuse down while we're small. Replace with Upstash if we scale.
const hits = new Map<string, number[]>()
const WINDOW_MS = 60_000
const LIMIT = 10

function rateLimit(ip: string): boolean {
  const now = Date.now()
  const arr = (hits.get(ip) || []).filter(t => now - t < WINDOW_MS)
  if (arr.length >= LIMIT) {
    hits.set(ip, arr)
    return false
  }
  arr.push(now)
  hits.set(ip, arr)
  return true
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET' && req.method !== 'POST') {
    res.setHeader('Allow', 'GET, POST')
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const ip = (req.headers['x-forwarded-for'] as string)?.split(',')[0].trim() || req.socket.remoteAddress || 'anon'
  if (!rateLimit(ip)) {
    return res.status(429).json({ error: 'Too many requests — try again in a minute.' })
  }

  const rawUrl = (req.method === 'GET' ? req.query.url : req.body?.url) as string | undefined
  const format = (req.method === 'GET' ? req.query.format : req.body?.format) as string | undefined
  const budgetRaw = (req.method === 'GET' ? req.query.budget : req.body?.budget) as string | undefined

  if (!rawUrl || typeof rawUrl !== 'string') {
    return res.status(400).json({ error: 'Missing `url` parameter.' })
  }
  if (rawUrl.length > MAX_URL_LEN) {
    return res.status(400).json({ error: 'URL too long.' })
  }
  if (!URL_RE.test(rawUrl)) {
    return res.status(400).json({ error: 'That doesn\'t look like a valid URL.' })
  }

  let overrideBudget: number | undefined
  if (budgetRaw && typeof budgetRaw === 'string') {
    const parsed = parseInt(budgetRaw, 10)
    if (!Number.isNaN(parsed) && parsed >= 50_000 && parsed <= 100_000_000) {
      overrideBudget = parsed
    }
  }

  try {
    const { png, summary } = await generateSamplePlan(rawUrl, overrideBudget)

    if (format === 'json') {
      // Return summary + PNG as base64 so the frontend can show both the stats
      // block and the image in one request.
      return res.status(200).json({
        summary,
        pngBase64: png.toString('base64'),
        pngMime: 'image/png',
      })
    }

    // Default: stream PNG directly (for <img src=/api/sample-plan?url=...>)
    res.setHeader('Content-Type', 'image/png')
    res.setHeader('Cache-Control', 'public, max-age=3600, s-maxage=86400, stale-while-revalidate=604800')
    res.setHeader('X-Halliard-Brand', summary.brandName)
    res.setHeader('X-Halliard-Industry', summary.industry)
    res.setHeader('X-Halliard-Budget', String(summary.budget))
    res.setHeader('X-Halliard-Mode', summary.inferenceMode)
    return res.status(200).send(png)
  } catch (err: any) {
    console.error('sample-plan generation error:', err)
    return res.status(500).json({ error: 'Failed to generate plan.', detail: err?.message })
  }
}
