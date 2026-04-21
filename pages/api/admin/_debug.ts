import type { NextApiRequest, NextApiResponse } from 'next'

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  // Temp debug — reports presence of env vars only
  res.status(200).json({
    admin: !!process.env.ADMIN_DASH_TOKEN,
    adminLen: (process.env.ADMIN_DASH_TOKEN || '').length,
    clerk: !!process.env.CLERK_SECRET_KEY,
    posthog: !!process.env.POSTHOG_API_KEY,
  })
}
