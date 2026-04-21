import type { NextApiRequest, NextApiResponse } from 'next'

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  // Temp debug — reports presence of env vars only
  const env = (process.env.ADMIN_DASH_TOKEN || '')
  const q = (req.query.token as string) || ''
  res.status(200).json({
    adminLen: env.length,
    queryLen: q.length,
    match: env === q,
    envStart: env.slice(0, 4),
    envEnd: env.slice(-4),
    queryStart: q.slice(0, 4),
    queryEnd: q.slice(-4),
  })
}
