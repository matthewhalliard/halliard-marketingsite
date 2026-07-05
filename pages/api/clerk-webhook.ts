import type { NextApiRequest, NextApiResponse } from 'next'
import { Webhook } from 'svix'

// ----------------------------------------------------------------------------
// Clerk → AgentMail signup notifier
// ----------------------------------------------------------------------------
// Receives Clerk `user.created` events, verifies the Svix signature, enriches
// the signup (email domain classification + Apollo/Snitcher when available),
// and emails Matthew a formatted HTML lead card via AgentMail.
//
// Env vars required (Vercel Project → Settings → Environment Variables):
//   CLERK_WEBHOOK_SECRET   Svix signing secret from the Clerk Webhooks page
//   AGENTMAIL_API_KEY      AgentMail bearer token
//   AGENTMAIL_INBOX        e.g. salesagenthalliard@agentmail.to
//   NOTIFY_TO              e.g. matthew@halliardmedia.com
// Optional:
//   APOLLO_API_KEY         People/Company enrichment
//   PITCH_TEST_MODE=1      Bypass signature verification for local/manual tests
// ----------------------------------------------------------------------------

export const config = {
  api: {
    // Need the raw body to verify the Svix signature
    bodyParser: false,
  },
}

const NOTIFY_TO = process.env.NOTIFY_TO || 'matthew@halliardmedia.com'
const AGENTMAIL_INBOX = process.env.AGENTMAIL_INBOX || 'salesagenthalliard@agentmail.to'

// Exclude domains that shouldn't count as prospects
const EXCLUDED_DOMAINS = new Set([
  'halliardmedia.com',
  'halliard.com',
  'lewismediapartners.com', // existing customer
])

const FREE_EMAIL_DOMAINS = new Set([
  'gmail.com',
  'yahoo.com',
  'hotmail.com',
  'outlook.com',
  'icloud.com',
  'aol.com',
  'proton.me',
  'protonmail.com',
  'mail.com',
  'gmx.com',
  'live.com',
  'msn.com',
])

// ----------------------------------------------------------------------------

async function readRawBody(req: NextApiRequest): Promise<string> {
  return new Promise((resolve, reject) => {
    const chunks: Buffer[] = []
    req.on('data', (c: Buffer) => chunks.push(c))
    req.on('end', () => resolve(Buffer.concat(chunks).toString('utf8')))
    req.on('error', reject)
  })
}

type ClerkEvent = {
  type: string
  data: {
    id: string
    email_addresses?: Array<{ email_address: string; verification?: { status?: string } }>
    first_name?: string | null
    last_name?: string | null
    created_at?: number
    last_sign_in_at?: number | null
    image_url?: string
    public_metadata?: Record<string, unknown>
    private_metadata?: Record<string, unknown>
    unsafe_metadata?: Record<string, unknown>
    external_accounts?: Array<{ provider?: string; email_address?: string }>
  }
  timestamp?: number
  instance_id?: string
}

type Enrichment = {
  displayName: string
  email: string
  domain: string
  domainKind: 'business' | 'free' | 'excluded' | 'unknown'
  companyGuess: string | null
  planGuess: string | null
  signupProvider: string | null
  verified: boolean
  fitScore: number // 0-100
  fitLabel: 'High' | 'Medium' | 'Low' | 'Excluded'
  fitReasons: string[]
  apolloCompany?: {
    name?: string
    industry?: string
    size?: string
    website?: string
    linkedin?: string
    description?: string
  } | null
}

function classifyDomain(domain: string): Enrichment['domainKind'] {
  if (!domain) return 'unknown'
  if (EXCLUDED_DOMAINS.has(domain)) return 'excluded'
  if (FREE_EMAIL_DOMAINS.has(domain)) return 'free'
  return 'business'
}

function guessCompanyFromDomain(domain: string): string | null {
  if (!domain) return null
  const kind = classifyDomain(domain)
  if (kind === 'free' || kind === 'excluded') return null
  const first = domain.split('.')[0]
  if (!first) return null
  return first
    .replace(/[-_]/g, ' ')
    .split(' ')
    .map((s) => (s.length > 0 ? s[0]!.toUpperCase() + s.slice(1) : s))
    .join(' ')
}

function pickPlan(evt: ClerkEvent): string | null {
  const meta = {
    ...(evt.data.public_metadata || {}),
    ...(evt.data.unsafe_metadata || {}),
    ...(evt.data.private_metadata || {}),
  } as Record<string, unknown>
  for (const key of ['plan', 'plan_name', 'planName', 'tier', 'subscription', 'signup_plan']) {
    const v = meta[key]
    if (typeof v === 'string' && v.length > 0) return v
  }
  return null
}

async function apolloEnrich(email: string): Promise<Enrichment['apolloCompany']> {
  const key = process.env.APOLLO_API_KEY
  if (!key) return null
  try {
    const r = await fetch('https://api.apollo.io/v1/people/match', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'no-cache',
        'X-Api-Key': key,
      },
      body: JSON.stringify({ email }),
    })
    if (!r.ok) return null
    const j: any = await r.json()
    const org = j?.person?.organization
    if (!org) return null
    return {
      name: org.name,
      industry: org.industry,
      size: org.estimated_num_employees ? String(org.estimated_num_employees) : undefined,
      website: org.website_url,
      linkedin: org.linkedin_url,
      description: org.short_description,
    }
  } catch {
    return null
  }
}

function scoreFit(e: Omit<Enrichment, 'fitScore' | 'fitLabel' | 'fitReasons'>): {
  score: number
  label: Enrichment['fitLabel']
  reasons: string[]
} {
  const reasons: string[] = []
  if (e.domainKind === 'excluded') {
    return { score: 0, label: 'Excluded', reasons: ['Domain is internal or existing customer'] }
  }
  let score = 0
  if (e.domainKind === 'business') {
    score += 40
    reasons.push(`Business email (${e.domain})`)
  } else if (e.domainKind === 'free') {
    score += 10
    reasons.push('Free email provider — company unknown')
  }
  if (e.verified) {
    score += 10
    reasons.push('Email verified')
  }
  if (e.displayName && e.displayName !== 'Unknown') {
    score += 5
    reasons.push('Full name provided')
  }
  const emp = Number(e.apolloCompany?.size || 0)
  if (emp > 0) {
    if (emp >= 50) {
      score += 30
      reasons.push(`Apollo: ${emp} employees (mid+ market)`)
    } else if (emp >= 10) {
      score += 20
      reasons.push(`Apollo: ${emp} employees`)
    } else {
      score += 5
      reasons.push(`Apollo: ${emp} employees (small)`)
    }
  }
  if (e.apolloCompany?.industry) {
    const industry = e.apolloCompany.industry.toLowerCase()
    if (/(advertising|marketing|media|agency)/.test(industry)) {
      score += 15
      reasons.push(`Industry match: ${e.apolloCompany.industry}`)
    } else {
      reasons.push(`Industry: ${e.apolloCompany.industry}`)
    }
  }
  score = Math.min(100, score)
  let label: Enrichment['fitLabel'] = 'Low'
  if (score >= 70) label = 'High'
  else if (score >= 40) label = 'Medium'
  return { score, label, reasons }
}

async function enrich(evt: ClerkEvent): Promise<Enrichment> {
  const primary = evt.data.email_addresses?.[0]
  const email = primary?.email_address || ''
  const verified = primary?.verification?.status === 'verified'
  const domain = email.split('@')[1]?.toLowerCase() || ''
  const domainKind = classifyDomain(domain)
  const first = (evt.data.first_name || '').trim()
  const last = (evt.data.last_name || '').trim()
  const displayName = [first, last].filter(Boolean).join(' ') || 'Unknown'
  const provider = evt.data.external_accounts?.[0]?.provider || null
  const planGuess = pickPlan(evt)
  const apolloCompany = await apolloEnrich(email)
  const companyGuess = apolloCompany?.name || guessCompanyFromDomain(domain)
  const base = {
    displayName,
    email,
    domain,
    domainKind,
    companyGuess,
    planGuess,
    signupProvider: provider,
    verified,
    apolloCompany,
  }
  const { score, label, reasons } = scoreFit(base)
  return { ...base, fitScore: score, fitLabel: label, fitReasons: reasons }
}

// ----------------------------------------------------------------------------
// HTML email template
// ----------------------------------------------------------------------------

function escapeHtml(s: string | null | undefined): string {
  if (s == null) return ''
  return String(s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
}

function badgeColor(label: Enrichment['fitLabel']): { bg: string; fg: string } {
  switch (label) {
    case 'High':
      return { bg: '#16a34a', fg: '#ffffff' }
    case 'Medium':
      return { bg: '#f59e0b', fg: '#1f2937' }
    case 'Low':
      return { bg: '#6b7280', fg: '#ffffff' }
    case 'Excluded':
      return { bg: '#dc2626', fg: '#ffffff' }
  }
}

function renderEmail(evt: ClerkEvent, e: Enrichment) {
  const createdMs = evt.data.created_at || Date.now()
  const created = new Date(createdMs).toLocaleString('en-US', {
    timeZone: 'America/New_York',
    dateStyle: 'medium',
    timeStyle: 'short',
  })
  const badge = badgeColor(e.fitLabel)
  const clerkUrl = `https://dashboard.clerk.com/apps/app/instances/${escapeHtml(
    evt.instance_id || ''
  )}/users/${escapeHtml(evt.data.id)}`

  const apolloBlock = e.apolloCompany
    ? `
      <tr>
        <td style="padding:16px 24px;border-top:1px solid #e5e7eb;">
          <div style="font-size:11px;letter-spacing:0.08em;text-transform:uppercase;color:#6b7280;margin-bottom:8px;">Apollo enrichment</div>
          <div style="font-size:14px;color:#111827;line-height:1.5;">
            <strong>${escapeHtml(e.apolloCompany.name)}</strong><br/>
            ${e.apolloCompany.industry ? `Industry: ${escapeHtml(e.apolloCompany.industry)}<br/>` : ''}
            ${e.apolloCompany.size ? `Employees: ${escapeHtml(e.apolloCompany.size)}<br/>` : ''}
            ${e.apolloCompany.website ? `Website: <a href="${escapeHtml(e.apolloCompany.website)}" style="color:#2563eb;">${escapeHtml(e.apolloCompany.website)}</a><br/>` : ''}
            ${e.apolloCompany.linkedin ? `LinkedIn: <a href="${escapeHtml(e.apolloCompany.linkedin)}" style="color:#2563eb;">${escapeHtml(e.apolloCompany.linkedin)}</a><br/>` : ''}
            ${e.apolloCompany.description ? `<div style="margin-top:6px;color:#4b5563;font-size:13px;">${escapeHtml(e.apolloCompany.description)}</div>` : ''}
          </div>
        </td>
      </tr>`
    : ''

  const reasonsList = e.fitReasons
    .map((r) => `<li style="margin:2px 0;">${escapeHtml(r)}</li>`)
    .join('')

  const html = `<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8" />
    <title>New Halliard signup</title>
  </head>
  <body style="margin:0;padding:0;background:#f3f4f6;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#f3f4f6;padding:24px 0;">
      <tr>
        <td align="center">
          <table role="presentation" width="600" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:12px;overflow:hidden;box-shadow:0 1px 3px rgba(0,0,0,0.08);max-width:600px;">
            <tr>
              <td style="background:#111827;padding:20px 24px;color:#f9fafb;">
                <div style="font-size:12px;letter-spacing:0.12em;text-transform:uppercase;color:#9ca3af;">🎯 Pitch — Signup Alert</div>
                <div style="font-size:22px;font-weight:600;margin-top:4px;">New Halliard signup</div>
              </td>
            </tr>
            <tr>
              <td style="padding:24px;">
                <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                  <tr>
                    <td>
                      <div style="font-size:20px;font-weight:600;color:#111827;">
                        ${escapeHtml(e.displayName)}
                      </div>
                      <div style="font-size:14px;color:#6b7280;margin-top:2px;">
                        <a href="mailto:${escapeHtml(e.email)}" style="color:#2563eb;text-decoration:none;">${escapeHtml(e.email)}</a>
                        ${e.verified ? '<span style="margin-left:8px;color:#16a34a;font-size:12px;">✓ verified</span>' : '<span style="margin-left:8px;color:#f59e0b;font-size:12px;">◦ unverified</span>'}
                      </div>
                    </td>
                    <td align="right" valign="top" style="white-space:nowrap;">
                      <span style="display:inline-block;padding:6px 12px;border-radius:999px;background:${badge.bg};color:${badge.fg};font-size:12px;font-weight:600;letter-spacing:0.04em;">
                        ${escapeHtml(e.fitLabel)} · ${e.fitScore}
                      </span>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
            <tr>
              <td style="padding:0 24px 8px 24px;">
                <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-collapse:collapse;">
                  ${row('Company', e.companyGuess || '—')}
                  ${row('Domain', `${escapeHtml(e.domain)} <span style="color:#6b7280;font-size:12px;">(${escapeHtml(e.domainKind)})</span>`)}
                  ${row('Plan', e.planGuess || '—')}
                  ${row('Signup via', e.signupProvider || 'Email/password')}
                  ${row('Signed up', escapeHtml(created) + ' ET')}
                  ${row('Clerk ID', `<code style="font-size:12px;color:#4b5563;">${escapeHtml(evt.data.id)}</code>`)}
                </table>
              </td>
            </tr>
            <tr>
              <td style="padding:8px 24px 16px 24px;">
                <div style="font-size:11px;letter-spacing:0.08em;text-transform:uppercase;color:#6b7280;margin-bottom:6px;">Fit reasoning</div>
                <ul style="margin:0;padding-left:18px;font-size:13px;color:#374151;line-height:1.6;">
                  ${reasonsList}
                </ul>
              </td>
            </tr>
            ${apolloBlock}
            <tr>
              <td style="padding:20px 24px;background:#f9fafb;border-top:1px solid #e5e7eb;">
                <a href="${clerkUrl}" style="display:inline-block;padding:10px 16px;background:#111827;color:#ffffff;border-radius:8px;text-decoration:none;font-size:13px;font-weight:600;">
                  View in Clerk
                </a>
                <a href="mailto:${escapeHtml(e.email)}?subject=Welcome%20to%20Halliard" style="display:inline-block;padding:10px 16px;background:#ffffff;color:#111827;border:1px solid #d1d5db;border-radius:8px;text-decoration:none;font-size:13px;font-weight:600;margin-left:8px;">
                  Reply directly
                </a>
              </td>
            </tr>
            <tr>
              <td style="padding:12px 24px;background:#f3f4f6;font-size:11px;color:#9ca3af;text-align:center;">
                🎯 Pitch — Halliard sales agent · Clerk webhook · ${escapeHtml(created)} ET
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>`

  const text = [
    `New Halliard signup: ${e.displayName} <${e.email}>`,
    `Fit: ${e.fitLabel} (${e.fitScore}/100)`,
    `Company: ${e.companyGuess || '—'}`,
    `Domain: ${e.domain} (${e.domainKind})`,
    `Plan: ${e.planGuess || '—'}`,
    `Signup via: ${e.signupProvider || 'Email/password'}`,
    `Signed up: ${created} ET`,
    ``,
    `Fit reasoning:`,
    ...e.fitReasons.map((r) => `  - ${r}`),
    ``,
    `Clerk ID: ${evt.data.id}`,
  ].join('\n')

  const subject = `[Halliard signup] ${e.fitLabel} · ${e.displayName} — ${e.companyGuess || e.domain}`
  return { html, text, subject }
}

function row(label: string, value: string): string {
  return `
    <tr>
      <td style="padding:8px 0;border-bottom:1px solid #f3f4f6;font-size:12px;color:#6b7280;letter-spacing:0.04em;text-transform:uppercase;width:120px;vertical-align:top;">${escapeHtml(label)}</td>
      <td style="padding:8px 0;border-bottom:1px solid #f3f4f6;font-size:14px;color:#111827;">${value}</td>
    </tr>`
}

// ----------------------------------------------------------------------------
// AgentMail send
// ----------------------------------------------------------------------------

async function sendAgentMail(subject: string, html: string, text: string) {
  const key = process.env.AGENTMAIL_API_KEY
  if (!key) throw new Error('AGENTMAIL_API_KEY not configured')
  const url = `https://api.agentmail.to/v0/inboxes/${encodeURIComponent(AGENTMAIL_INBOX)}/messages/send`
  const r = await fetch(url, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${key}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      to: NOTIFY_TO,
      subject,
      html,
      text,
      labels: ['pitch', 'signup-alert'],
    }),
  })
  const body = await r.text()
  if (!r.ok) {
    throw new Error(`AgentMail send failed ${r.status}: ${body}`)
  }
  return body
}

// ----------------------------------------------------------------------------

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST')
    return res.status(405).json({ error: 'method_not_allowed' })
  }

  let rawBody: string
  try {
    rawBody = await readRawBody(req)
  } catch (e) {
    return res.status(400).json({ error: 'bad_body' })
  }

  const testMode = process.env.PITCH_TEST_MODE === '1' || req.headers['x-pitch-test'] === '1'

  if (!testMode) {
    const secret = process.env.CLERK_WEBHOOK_SECRET
    if (!secret) {
      console.error('CLERK_WEBHOOK_SECRET not configured')
      return res.status(500).json({ error: 'not_configured' })
    }
    try {
      const wh = new Webhook(secret)
      wh.verify(rawBody, {
        'svix-id': String(req.headers['svix-id'] || ''),
        'svix-timestamp': String(req.headers['svix-timestamp'] || ''),
        'svix-signature': String(req.headers['svix-signature'] || ''),
      })
    } catch (err) {
      console.error('Signature verification failed', err)
      return res.status(400).json({ error: 'bad_signature' })
    }
  }

  let evt: ClerkEvent
  try {
    evt = JSON.parse(rawBody) as ClerkEvent
  } catch {
    return res.status(400).json({ error: 'bad_json' })
  }

  if (evt.type !== 'user.created') {
    // Acknowledge non-signup events so Clerk stops retrying
    return res.status(200).json({ ok: true, ignored: evt.type })
  }

  try {
    const enrichment = await enrich(evt)
    const { html, text, subject } = renderEmail(evt, enrichment)
    await sendAgentMail(subject, html, text)
    return res.status(200).json({
      ok: true,
      user_id: evt.data.id,
      email: enrichment.email,
      fit: enrichment.fitLabel,
      score: enrichment.fitScore,
    })
  } catch (err: any) {
    console.error('clerk-webhook error', err)
    return res.status(500).json({ error: 'handler_failed', message: err?.message || String(err) })
  }
}
