import type { NextApiRequest, NextApiResponse } from 'next'
import fs from 'fs'
import path from 'path'

/**
 * Serves the signup flow state committed to public/admin/flow-state.json
 * Auth via ADMIN_DASH_TOKEN.
 */
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const token = ((req.query.token as string) || (req.headers['x-admin-token'] as string) || '').trim()
  const expected = (process.env.ADMIN_DASH_TOKEN || '').trim()
  if (!token || !expected || token !== expected) {
    return res.status(401).json({ error: 'unauthorized' })
  }

  try {
    const filePath = path.join(process.cwd(), 'public', 'admin', 'flow-state.json')
    if (!fs.existsSync(filePath)) {
      return res.status(200).json({ users: {}, last_poll: null })
    }
    const content = fs.readFileSync(filePath, 'utf-8')
    res.setHeader('Cache-Control', 'no-store')
    return res.status(200).send(content)
  } catch (err: any) {
    return res.status(500).json({ error: err?.message })
  }
}
