import type { NextApiRequest, NextApiResponse } from 'next'

const FORMSPARK_FORM_ID = 'phcmKSgAi'
const FORMSPARK_ENDPOINT = `https://submit-form.com/${FORMSPARK_FORM_ID}`

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST')
    return res.status(405).end('Method Not Allowed')
  }

  try {
    const fsRes = await fetch(FORMSPARK_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(req.body),
    })

    return res.status(fsRes.status).end()
  } catch (err) {
    console.error('Formspark proxy error', err)
    return res.status(500).end('Proxy error')
  }
} 