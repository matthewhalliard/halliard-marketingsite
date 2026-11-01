import type { NextApiRequest, NextApiResponse } from 'next'

// Forms post here rather than to Formspark directly, because ad and privacy
// blockers stop browsers posting to submit-form.com. `form` picks which
// Formspark form receives the submission. Only the forms listed here can be
// reached; a missing or unknown `form` goes to the enquiry form, as every
// submission did before `form` existed.
const FORMSPARK_FORMS: Record<string, string> = {
  enquiry: 'phcmKSgAi',
  // /buying-desk: a brief sent for a free costed plan, no account needed.
  'buying-desk-plan': 't9oJNhfDO',
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST')
    return res.status(405).end('Method Not Allowed')
  }

  const { form, ...fields } = (req.body ?? {}) as Record<string, unknown>
  const formId = (typeof form === 'string' && FORMSPARK_FORMS[form]) || FORMSPARK_FORMS.enquiry

  try {
    const fsRes = await fetch(`https://submit-form.com/${formId}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(fields),
    })

    return res.status(fsRes.status).end()
  } catch (err) {
    console.error('Formspark proxy error', err)
    return res.status(500).end('Proxy error')
  }
}
