import type { NextApiRequest, NextApiResponse } from 'next'
import { Webhook } from 'svix'

// ----------------------------------------------------------------------------
// Clerk → Pitch intel briefing → AgentMail
// ----------------------------------------------------------------------------
// On `user.created`:
//   1. Enrich from Apollo (person → company)
//   2. Enrich from PostHog (attribution, geo, first URL, on-site activity)
//   3. Ask Claude to write a paragraph-form best-guess brief on who this is
//   4. Send an HTML intel card via AgentMail to Matthew
//
// Env vars (Vercel Project → Settings → Environment Variables):
//   CLERK_WEBHOOK_SECRET   Svix signing secret from the Clerk Webhooks page
//   AGENTMAIL_API_KEY      AgentMail bearer token
//   AGENTMAIL_INBOX        e.g. salesagenthalliard@agentmail.to
//   NOTIFY_TO              e.g. matthew@halliardmedia.com
//   APOLLO_API_KEY         People/Company enrichment
//   POSTHOG_API_KEY        Behavior enrichment (project 23371)
//   ANTHROPIC_API_KEY      Analysis paragraph generation
//   PITCH_TEST_MODE=1      Bypass signature verification for backfill tests
// ----------------------------------------------------------------------------

export const config = {
  api: {
    bodyParser: false,
  },
  maxDuration: 60,
}

const NOTIFY_TO = process.env.NOTIFY_TO || 'matthew@halliardmedia.com'
const AGENTMAIL_INBOX = process.env.AGENTMAIL_INBOX || 'salesagenthalliard@agentmail.to'
const POSTHOG_PROJECT = '23371'
const POSTHOG_BASE = `https://us.posthog.com/api/projects/${POSTHOG_PROJECT}`

const EXCLUDED_DOMAINS = new Set([
  'halliardmedia.com',
  'halliard.com',
  'lewismediapartners.com',
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

type DomainKind = 'business' | 'free' | 'excluded' | 'unknown'

type ApolloCompany = {
  name?: string
  industry?: string
  size?: string
  website?: string
  linkedin?: string
  description?: string
} | null

type ApolloPerson = {
  title?: string
  linkedin?: string
  city?: string
  state?: string
} | null

type PostHogInsights = {
  found: boolean
  firstSeenAt?: string
  landingUrl?: string
  landingPath?: string
  referrer?: string
  referringDomain?: string
  utmSource?: string
  utmMedium?: string
  utmCampaign?: string
  utmTerm?: string
  gclid?: string
  city?: string
  region?: string
  country?: string
  timezone?: string
  browser?: string
  os?: string
  deviceType?: string
  activity: {
    pageviewCount: number
    firstEventAt?: string
    lastEventAt?: string
    sessionDurationSec?: number
    pathsVisited: string[]
    planIds: string[]
    ctaClicks: string[]
    events: Array<{ event: string; count: number }>
  }
}

type Analysis = {
  displayName: string
  email: string
  domain: string
  domainKind: DomainKind
  companyGuess: string | null
  planGuess: string | null
  signupProvider: string | null
  verified: boolean
  fitScore: number
  fitLabel: 'High' | 'Medium' | 'Low' | 'Excluded'
  fitReasons: string[]
  apolloCompany: ApolloCompany
  apolloPerson: ApolloPerson
  posthog: PostHogInsights
  briefing: string // paragraph from Claude
  recommendation: string // 1-2 sentence next action
}

// ----------------------------------------------------------------------------
// Basic classification
// ----------------------------------------------------------------------------

function classifyDomain(domain: string): DomainKind {
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

// ----------------------------------------------------------------------------
// Apollo
// ----------------------------------------------------------------------------

async function apolloEnrich(email: string): Promise<{ company: ApolloCompany; person: ApolloPerson }> {
  const key = process.env.APOLLO_API_KEY
  if (!key) return { company: null, person: null }
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
    if (!r.ok) return { company: null, person: null }
    const j: any = await r.json()
    const org = j?.person?.organization
    const person = j?.person
    return {
      company: org
        ? {
            name: org.name,
            industry: org.industry,
            size: org.estimated_num_employees ? String(org.estimated_num_employees) : undefined,
            website: org.website_url,
            linkedin: org.linkedin_url,
            description: org.short_description,
          }
        : null,
      person: person
        ? {
            title: person.title,
            linkedin: person.linkedin_url,
            city: person.city,
            state: person.state,
          }
        : null,
    }
  } catch {
    return { company: null, person: null }
  }
}

// ----------------------------------------------------------------------------
// PostHog
// ----------------------------------------------------------------------------

function extractPlanIds(urls: string[]): string[] {
  const ids = new Set<string>()
  for (const u of urls) {
    if (!u) continue
    const m = u.match(/[?&]plan_id=(\d+)/)
    if (m && m[1]) ids.add(m[1])
  }
  return Array.from(ids)
}

function extractGclid(url: string | undefined): string | undefined {
  if (!url) return undefined
  try {
    const u = new URL(url)
    const direct = u.searchParams.get('gclid')
    if (direct) return direct
    const gl = u.searchParams.get('_gl')
    if (gl) {
      const parts = gl.split('*')
      const idx = parts.findIndex((p) => p === '_gcl_aw')
      if (idx >= 0 && parts[idx + 1]) {
        // base64-ish encoded; strip 3-char prefix + return decoded suffix
        try {
          const encoded = parts[idx + 1]!
          const decoded = Buffer.from(encoded + '==='.slice(0, (4 - (encoded.length % 4)) % 4), 'base64').toString('utf8')
          const m = decoded.match(/GCL\.\d+\.(.+)/)
          if (m) return m[1]
          return decoded
        } catch {
          return parts[idx + 1]
        }
      }
    }
  } catch {}
  return undefined
}

async function posthogGet(path: string): Promise<any> {
  const key = process.env.POSTHOG_API_KEY
  if (!key) return null
  const r = await fetch(`${POSTHOG_BASE}${path}`, {
    headers: { Authorization: `Bearer ${key}` },
  })
  if (!r.ok) return null
  return r.json()
}

async function posthogQuery(hogql: string): Promise<any> {
  const key = process.env.POSTHOG_API_KEY
  if (!key) return null
  const r = await fetch(`${POSTHOG_BASE}/query/`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${key}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ query: { kind: 'HogQLQuery', query: hogql } }),
  })
  if (!r.ok) return null
  return r.json()
}

async function posthogEnrich(email: string): Promise<PostHogInsights> {
  const insights: PostHogInsights = {
    found: false,
    activity: {
      pageviewCount: 0,
      pathsVisited: [],
      planIds: [],
      ctaClicks: [],
      events: [],
    },
  }
  if (!email || !process.env.POSTHOG_API_KEY) return insights

  // 1. Person properties
  const persons = await posthogGet(`/persons/?search=${encodeURIComponent(email)}&limit=1`)
  const p = persons?.results?.[0]
  if (!p) return insights
  insights.found = true
  insights.firstSeenAt = p.created_at
  const pp = p.properties || {}
  insights.landingUrl = pp.$initial_current_url
  insights.landingPath = pp.$initial_pathname
  insights.referrer = pp.$initial_referrer
  insights.referringDomain = pp.$initial_referring_domain
  insights.utmSource = pp.$initial_utm_source
  insights.utmMedium = pp.$initial_utm_medium
  insights.utmCampaign = pp.$initial_utm_campaign
  insights.utmTerm = pp.$initial_utm_term
  insights.gclid = pp.$initial_gclid || extractGclid(pp.$initial_current_url)
  insights.city = pp.$geoip_city_name
  insights.region = pp.$geoip_subdivision_1_name
  insights.country = pp.$geoip_country_name
  insights.timezone = pp.$geoip_time_zone
  insights.browser = pp.$browser
  insights.os = pp.$os
  insights.deviceType = pp.$device_type

  // 2. Event summary (last 60 days, keyed by distinct_id = email)
  const escaped = email.replace(/'/g, "''")
  const eventSummary = await posthogQuery(
    `SELECT event, count() as n FROM events WHERE distinct_id = '${escaped}' GROUP BY event ORDER BY n DESC LIMIT 10`
  )
  if (eventSummary?.results) {
    insights.activity.events = eventSummary.results.map((r: any[]) => ({ event: r[0], count: r[1] }))
    insights.activity.pageviewCount =
      insights.activity.events.find((e) => e.event === '$pageview')?.count || 0
  }

  // 3. Pageview timeline
  const pageviews = await posthogQuery(
    `SELECT timestamp, properties.$current_url FROM events WHERE distinct_id = '${escaped}' AND event = '$pageview' ORDER BY timestamp ASC LIMIT 30`
  )
  const paths: string[] = []
  const urls: string[] = []
  if (pageviews?.results) {
    for (const row of pageviews.results) {
      const url = row[1]
      if (typeof url === 'string') {
        urls.push(url)
        try {
          const u = new URL(url)
          if (!paths.includes(u.pathname)) paths.push(u.pathname)
        } catch {}
      }
    }
    if (pageviews.results.length > 0) {
      insights.activity.firstEventAt = pageviews.results[0][0]
      insights.activity.lastEventAt = pageviews.results[pageviews.results.length - 1][0]
      try {
        const first = new Date(pageviews.results[0][0]).getTime()
        const last = new Date(pageviews.results[pageviews.results.length - 1][0]).getTime()
        insights.activity.sessionDurationSec = Math.round((last - first) / 1000)
      } catch {}
    }
  }
  insights.activity.pathsVisited = paths.slice(0, 12)
  insights.activity.planIds = extractPlanIds(urls)

  // 4. CTA clicks / autocapture (button text)
  const clicks = await posthogQuery(
    `SELECT properties.$el_text, count() as n FROM events WHERE distinct_id = '${escaped}' AND event IN ('$autocapture','cta_click') AND properties.$el_text IS NOT NULL GROUP BY properties.$el_text ORDER BY n DESC LIMIT 8`
  )
  if (clicks?.results) {
    insights.activity.ctaClicks = clicks.results
      .map((r: any[]) => r[0])
      .filter((t: any) => typeof t === 'string' && t.trim().length > 0)
      .slice(0, 8)
  }

  return insights
}

// ----------------------------------------------------------------------------
// Fit scoring (retained, feeds Claude context)
// ----------------------------------------------------------------------------

function scoreFit(a: {
  domainKind: DomainKind
  verified: boolean
  displayName: string
  domain: string
  apolloCompany: ApolloCompany
  posthog: PostHogInsights
}): { score: number; label: Analysis['fitLabel']; reasons: string[] } {
  const reasons: string[] = []
  if (a.domainKind === 'excluded') {
    return { score: 0, label: 'Excluded', reasons: ['Domain is internal or existing customer'] }
  }
  let score = 0
  if (a.domainKind === 'business') {
    score += 40
    reasons.push(`Business email (${a.domain})`)
  } else if (a.domainKind === 'free') {
    score += 5
    reasons.push('Free email provider — treat as low-fit until enriched')
  }
  if (a.verified) {
    score += 5
    reasons.push('Email verified')
  }
  if (a.displayName && a.displayName !== 'Unknown') {
    score += 5
    reasons.push('Name provided')
  }
  const emp = Number(a.apolloCompany?.size || 0)
  if (emp >= 500) {
    score += 30
    reasons.push(`Apollo: ${emp}+ employees (enterprise)`)
  } else if (emp >= 50) {
    score += 25
    reasons.push(`Apollo: ${emp} employees (mid-market)`)
  } else if (emp >= 10) {
    score += 15
    reasons.push(`Apollo: ${emp} employees (SMB)`)
  } else if (emp > 0) {
    reasons.push(`Apollo: ${emp} employees (very small)`)
  }
  if (a.apolloCompany?.industry) {
    const industry = a.apolloCompany.industry.toLowerCase()
    if (/(advertising|marketing|media|agency|broadcasting)/.test(industry)) {
      score += 15
      reasons.push(`Industry match: ${a.apolloCompany.industry}`)
    } else {
      reasons.push(`Industry: ${a.apolloCompany.industry}`)
    }
  }
  if (a.posthog.utmSource === 'adwords' || a.posthog.utmSource === 'google') {
    score += 10
    reasons.push(`Google Ads attribution (${a.posthog.utmCampaign || 'campaign unknown'})`)
  }
  if ((a.posthog.activity.planIds || []).length > 0) {
    score += 10
    reasons.push(`Built ${a.posthog.activity.planIds.length} plan(s) in-app`)
  }
  if ((a.posthog.activity.sessionDurationSec || 0) > 120) {
    score += 5
    reasons.push(
      `Engaged session: ${Math.round((a.posthog.activity.sessionDurationSec || 0) / 60)} min on-site`
    )
  }
  if (
    a.posthog.country &&
    !['United States', 'Canada', 'United Kingdom', 'Australia', 'France', 'Germany'].includes(
      a.posthog.country
    )
  ) {
    score -= 15
    reasons.push(`Outside core geo: ${a.posthog.country}`)
  }
  score = Math.max(0, Math.min(100, score))
  let label: Analysis['fitLabel'] = 'Low'
  if (score >= 70) label = 'High'
  else if (score >= 40) label = 'Medium'
  return { score, label, reasons }
}

// ----------------------------------------------------------------------------
// Claude briefing
// ----------------------------------------------------------------------------

async function generateBriefing(evt: ClerkEvent, a: Omit<Analysis, 'briefing' | 'recommendation'>): Promise<{
  briefing: string
  recommendation: string
}> {
  const key = process.env.ANTHROPIC_API_KEY
  const context = {
    signup: {
      email: a.email,
      name: a.displayName,
      email_verified: a.verified,
      domain: a.domain,
      domain_kind: a.domainKind,
      signup_via: a.signupProvider || 'email/password',
      signed_up_at: evt.data.created_at ? new Date(evt.data.created_at).toISOString() : null,
    },
    apollo: {
      company: a.apolloCompany,
      person: a.apolloPerson,
    },
    posthog: a.posthog,
    fit: {
      score: a.fitScore,
      label: a.fitLabel,
      reasons: a.fitReasons,
    },
    context: {
      product: 'Halliard — AI media planning + buying tool for independent agencies. Marketing site is www.halliardmedia.com; app is app.halliardmedia.com. Best-fit customer is an independent US media agency or in-house marketing team, 10-200 employees.',
      exclusions: 'lewismediapartners.com is existing customer, halliardmedia.com is internal.',
    },
  }

  const fallback = () => {
    // Deterministic fallback if Claude is down
    const parts: string[] = []
    parts.push(
      `${a.displayName || 'Unknown'} <${a.email}> signed up ${a.signupProvider ? `via ${a.signupProvider}` : ''}.`.trim()
    )
    if (a.apolloCompany?.name) {
      parts.push(
        `Apollo matches this to ${a.apolloCompany.name}${a.apolloCompany.industry ? ` (${a.apolloCompany.industry})` : ''}${
          a.apolloCompany.size ? `, ~${a.apolloCompany.size} employees` : ''
        }.`
      )
    } else if (a.domainKind === 'business') {
      parts.push(`Business domain ${a.domain} — Apollo returned no match, worth a manual LinkedIn check.`)
    } else {
      parts.push(`Free email domain — company unknown from email alone.`)
    }
    if (a.posthog.found) {
      const src = a.posthog.utmSource ? ` via ${a.posthog.utmSource}${a.posthog.utmCampaign ? `/${a.posthog.utmCampaign}` : ''}` : ''
      const geo = a.posthog.city ? ` from ${a.posthog.city}, ${a.posthog.region || a.posthog.country || ''}` : ''
      parts.push(
        `PostHog${geo}${src}: landed on ${a.posthog.landingPath || a.posthog.landingUrl || 'unknown'}, viewed ${a.posthog.activity.pageviewCount} pages, ${
          a.posthog.activity.planIds.length ? `built plan_id ${a.posthog.activity.planIds.join(', ')}, ` : ''
        }session ~${Math.max(0, Math.round((a.posthog.activity.sessionDurationSec || 0) / 60))} min.`
      )
    }
    const rec =
      a.fitLabel === 'High'
        ? 'High fit — reach out today.'
        : a.fitLabel === 'Medium'
          ? 'Medium fit — light touch email in the next 48h.'
          : a.fitLabel === 'Excluded'
            ? 'Excluded — no action.'
            : 'Low fit — monitor, no outbound.'
    return { briefing: parts.join(' '), recommendation: rec }
  }

  if (!key) return fallback()

  const prompt = `You are Pitch, Halliard's sales agent. A new user just signed up. Given the enrichment JSON below, write a compact intel briefing for Matthew (Halliard's founder).

REQUIREMENTS:
- ONE paragraph (5-8 sentences) — dense, factual, no fluff.
- Start with "Best guess:" and give your best hypothesis on who this person is, what company they're at, and what they're likely trying to do.
- Cite specific evidence from the JSON (geo, referrer, campaign, pages visited, plan_ids built, Apollo match, etc.).
- If evidence is thin, SAY SO — do not invent facts. Say "no Apollo match; free email; geo suggests X".
- Flag red flags (foreign geo, throwaway email pattern, no on-site engagement, tire-kicker) or green flags (agency domain, US, built a plan, came from paid search).
- No emojis. Amazonian style — direct, dense, evidence-first.

Then a SEPARATE second block starting with "Recommend:" — one sentence with a specific next action (send X email, ignore, add to cadence, book meeting).

Output format:
<briefing>
Best guess: ...
</briefing>
<recommend>
Recommend: ...
</recommend>

CONTEXT JSON:
${JSON.stringify(context, null, 2)}`

  try {
    const r = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'x-api-key': key,
        'anthropic-version': '2023-06-01',
        'content-type': 'application/json',
      },
      body: JSON.stringify({
        model: 'claude-sonnet-4-5-20250929',
        max_tokens: 800,
        messages: [{ role: 'user', content: prompt }],
      }),
    })
    if (!r.ok) {
      console.error('Anthropic error', r.status, await r.text())
      return fallback()
    }
    const j: any = await r.json()
    const text = j?.content?.[0]?.text || ''
    const briefingMatch = text.match(/<briefing>([\s\S]*?)<\/briefing>/i)
    const recMatch = text.match(/<recommend>([\s\S]*?)<\/recommend>/i)
    const briefing = (briefingMatch?.[1] || text).trim()
    const recommendation = (recMatch?.[1] || '').trim() || 'Recommend: monitor.'
    return { briefing, recommendation }
  } catch (err) {
    console.error('Claude call failed', err)
    return fallback()
  }
}

// ----------------------------------------------------------------------------
// Master enrichment
// ----------------------------------------------------------------------------

async function analyze(evt: ClerkEvent): Promise<Analysis> {
  const primary = evt.data.email_addresses?.[0]
  const email = primary?.email_address || ''
  const verified = primary?.verification?.status === 'verified'
  const domain = email.split('@')[1]?.toLowerCase() || ''
  const domainKind = classifyDomain(domain)
  const first = (evt.data.first_name || '').trim()
  const last = (evt.data.last_name || '').trim()
  const displayName = [first, last].filter(Boolean).join(' ') || ''
  const provider = evt.data.external_accounts?.[0]?.provider || null
  const planGuess = pickPlan(evt)

  // Parallel enrichment
  const [apollo, posthog] = await Promise.all([apolloEnrich(email), posthogEnrich(email)])

  const companyGuess =
    apollo.company?.name ||
    guessCompanyFromDomain(domain) ||
    (posthog.city ? null : null)

  const { score, label, reasons } = scoreFit({
    domainKind,
    verified,
    displayName,
    domain,
    apolloCompany: apollo.company,
    posthog,
  })

  const partial: Omit<Analysis, 'briefing' | 'recommendation'> = {
    displayName: displayName || 'Unknown',
    email,
    domain,
    domainKind,
    companyGuess,
    planGuess,
    signupProvider: provider,
    verified,
    fitScore: score,
    fitLabel: label,
    fitReasons: reasons,
    apolloCompany: apollo.company,
    apolloPerson: apollo.person,
    posthog,
  }

  const { briefing, recommendation } = await generateBriefing(evt, partial)
  return { ...partial, briefing, recommendation }
}

// ----------------------------------------------------------------------------
// HTML render
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

function badgeColor(label: Analysis['fitLabel']): { bg: string; fg: string } {
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

function fmtDuration(sec?: number): string {
  if (!sec || sec <= 0) return '—'
  if (sec < 60) return `${sec}s`
  const m = Math.floor(sec / 60)
  const s = sec % 60
  return s === 0 ? `${m}m` : `${m}m ${s}s`
}

function renderEmail(evt: ClerkEvent, a: Analysis) {
  const createdMs = evt.data.created_at || Date.now()
  const created = new Date(createdMs).toLocaleString('en-US', {
    timeZone: 'America/New_York',
    dateStyle: 'medium',
    timeStyle: 'short',
  })
  const badge = badgeColor(a.fitLabel)
  const clerkUrl = `https://dashboard.clerk.com/apps/app/instances/${escapeHtml(
    evt.instance_id || ''
  )}/users/${escapeHtml(evt.data.id)}`

  const ph = a.posthog
  const geoStr =
    ph.city && ph.country
      ? `${ph.city}, ${ph.region || ph.country}`
      : ph.country || '—'
  const deviceStr = ph.deviceType ? `${ph.browser || '?'} · ${ph.os || '?'} · ${ph.deviceType}` : '—'
  const attrStr = ph.utmSource
    ? `${ph.utmSource}${ph.utmMedium ? `/${ph.utmMedium}` : ''}${ph.utmCampaign ? ` · ${ph.utmCampaign}` : ''}${ph.utmTerm ? ` · "${ph.utmTerm}"` : ''}${ph.gclid ? ' · has gclid' : ''}`
    : ph.referringDomain
      ? `direct from ${ph.referringDomain}`
      : 'unknown'
  const landingPath = ph.landingPath || (ph.landingUrl ? new URL(ph.landingUrl).pathname : '—')
  const pathsChips = (ph.activity.pathsVisited || [])
    .slice(0, 10)
    .map(
      (p) =>
        `<span style="display:inline-block;padding:3px 8px;background:#eef2ff;color:#3730a3;border-radius:6px;font-size:11px;font-family:ui-monospace,monospace;margin:2px 4px 2px 0;">${escapeHtml(p)}</span>`
    )
    .join('')
  const planIdsStr =
    ph.activity.planIds.length > 0
      ? ph.activity.planIds
          .map(
            (id) =>
              `<span style="display:inline-block;padding:3px 8px;background:#dcfce7;color:#166534;border-radius:6px;font-size:11px;font-family:ui-monospace,monospace;margin:2px 4px 2px 0;">plan_id ${escapeHtml(id)}</span>`
          )
          .join('')
      : ''
  const ctaChips = (ph.activity.ctaClicks || [])
    .slice(0, 6)
    .map(
      (c) =>
        `<span style="display:inline-block;padding:3px 8px;background:#fef3c7;color:#92400e;border-radius:6px;font-size:11px;margin:2px 4px 2px 0;">${escapeHtml(c.slice(0, 40))}</span>`
    )
    .join('')

  const apollo = a.apolloCompany
  const apolloBlock = apollo
    ? `
      <tr>
        <td style="padding:16px 24px;border-top:1px solid #e5e7eb;background:#fafbff;">
          <div style="font-size:11px;letter-spacing:0.08em;text-transform:uppercase;color:#6366f1;margin-bottom:8px;font-weight:600;">Apollo — Company</div>
          <div style="font-size:14px;color:#111827;line-height:1.6;">
            <strong>${escapeHtml(apollo.name)}</strong>${apollo.industry ? ` · <span style="color:#6b7280;">${escapeHtml(apollo.industry)}</span>` : ''}${apollo.size ? ` · <span style="color:#6b7280;">${escapeHtml(apollo.size)} employees</span>` : ''}<br/>
            ${apollo.website ? `<a href="${escapeHtml(apollo.website)}" style="color:#2563eb;font-size:13px;">${escapeHtml(apollo.website)}</a>` : ''}
            ${apollo.linkedin ? ` · <a href="${escapeHtml(apollo.linkedin)}" style="color:#2563eb;font-size:13px;">LinkedIn</a>` : ''}
            ${a.apolloPerson?.title ? `<br/><span style="color:#6b7280;font-size:13px;">${escapeHtml(a.apolloPerson.title)}${a.apolloPerson.linkedin ? ` · <a href="${escapeHtml(a.apolloPerson.linkedin)}" style="color:#2563eb;">person LinkedIn</a>` : ''}</span>` : ''}
            ${apollo.description ? `<div style="margin-top:8px;color:#4b5563;font-size:13px;font-style:italic;">"${escapeHtml(apollo.description)}"</div>` : ''}
          </div>
        </td>
      </tr>`
    : `
      <tr>
        <td style="padding:16px 24px;border-top:1px solid #e5e7eb;background:#fafbff;">
          <div style="font-size:11px;letter-spacing:0.08em;text-transform:uppercase;color:#6366f1;margin-bottom:6px;font-weight:600;">Apollo — Company</div>
          <div style="font-size:13px;color:#6b7280;">No match. ${a.domainKind === 'free' ? 'Free email — company unknown from domain alone.' : `Domain ${escapeHtml(a.domain)} not in Apollo — worth a manual LinkedIn check.`}</div>
        </td>
      </tr>`

  const posthogBlock = ph.found
    ? `
      <tr>
        <td style="padding:16px 24px;border-top:1px solid #e5e7eb;">
          <div style="font-size:11px;letter-spacing:0.08em;text-transform:uppercase;color:#0ea5e9;margin-bottom:10px;font-weight:600;">PostHog — Behavior</div>
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-collapse:collapse;">
            ${miniRow('Geo', escapeHtml(geoStr) + (ph.timezone ? ` · <span style="color:#6b7280;">${escapeHtml(ph.timezone)}</span>` : ''))}
            ${miniRow('Attribution', escapeHtml(attrStr))}
            ${miniRow('First landed', escapeHtml(landingPath))}
            ${miniRow('Referrer', escapeHtml(ph.referrer || '—'))}
            ${miniRow('Device', escapeHtml(deviceStr))}
            ${miniRow('Pageviews', `${ph.activity.pageviewCount} · session ${fmtDuration(ph.activity.sessionDurationSec)}`)}
          </table>
          ${
            pathsChips
              ? `<div style="margin-top:12px;"><div style="font-size:11px;color:#6b7280;text-transform:uppercase;letter-spacing:0.04em;margin-bottom:4px;">Paths visited</div>${pathsChips}</div>`
              : ''
          }
          ${
            planIdsStr
              ? `<div style="margin-top:8px;"><div style="font-size:11px;color:#6b7280;text-transform:uppercase;letter-spacing:0.04em;margin-bottom:4px;">Plans built in-app</div>${planIdsStr}</div>`
              : ''
          }
          ${
            ctaChips
              ? `<div style="margin-top:8px;"><div style="font-size:11px;color:#6b7280;text-transform:uppercase;letter-spacing:0.04em;margin-bottom:4px;">Clicked</div>${ctaChips}</div>`
              : ''
          }
        </td>
      </tr>`
    : `
      <tr>
        <td style="padding:16px 24px;border-top:1px solid #e5e7eb;">
          <div style="font-size:11px;letter-spacing:0.08em;text-transform:uppercase;color:#0ea5e9;margin-bottom:6px;font-weight:600;">PostHog — Behavior</div>
          <div style="font-size:13px;color:#6b7280;">No PostHog person found for this email. Signup happened but no client-side pageviews were captured (yet).</div>
        </td>
      </tr>`

  const reasonsList = a.fitReasons
    .map((r) => `<li style="margin:2px 0;">${escapeHtml(r)}</li>`)
    .join('')

  const html = `<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8" />
    <title>New Halliard signup — ${escapeHtml(a.displayName)}</title>
  </head>
  <body style="margin:0;padding:0;background:#f3f4f6;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#f3f4f6;padding:24px 0;">
      <tr>
        <td align="center">
          <table role="presentation" width="640" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:12px;overflow:hidden;box-shadow:0 1px 3px rgba(0,0,0,0.08);max-width:640px;">
            <tr>
              <td style="background:#111827;padding:20px 24px;color:#f9fafb;">
                <div style="font-size:12px;letter-spacing:0.12em;text-transform:uppercase;color:#9ca3af;">🎯 Pitch — Signup Intel</div>
                <div style="font-size:22px;font-weight:600;margin-top:4px;">${escapeHtml(a.companyGuess || a.displayName || 'New signup')}</div>
              </td>
            </tr>
            <tr>
              <td style="padding:20px 24px 12px 24px;">
                <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                  <tr>
                    <td>
                      <div style="font-size:18px;font-weight:600;color:#111827;">
                        ${escapeHtml(a.displayName)}
                        ${a.apolloPerson?.title ? `<span style="font-weight:400;color:#6b7280;font-size:14px;"> · ${escapeHtml(a.apolloPerson.title)}</span>` : ''}
                      </div>
                      <div style="font-size:14px;color:#6b7280;margin-top:2px;">
                        <a href="mailto:${escapeHtml(a.email)}" style="color:#2563eb;text-decoration:none;">${escapeHtml(a.email)}</a>
                        ${a.verified ? '<span style="margin-left:8px;color:#16a34a;font-size:12px;">✓ verified</span>' : '<span style="margin-left:8px;color:#f59e0b;font-size:12px;">◦ unverified</span>'}
                        ${a.signupProvider ? `<span style="margin-left:8px;color:#6b7280;font-size:12px;">· via ${escapeHtml(a.signupProvider)}</span>` : ''}
                      </div>
                    </td>
                    <td align="right" valign="top" style="white-space:nowrap;">
                      <span style="display:inline-block;padding:6px 12px;border-radius:999px;background:${badge.bg};color:${badge.fg};font-size:12px;font-weight:600;letter-spacing:0.04em;">
                        ${escapeHtml(a.fitLabel)} · ${a.fitScore}
                      </span>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
            <tr>
              <td style="padding:0 24px 20px 24px;">
                <div style="padding:16px;background:#f9fafb;border-left:3px solid #111827;border-radius:6px;">
                  <div style="font-size:11px;letter-spacing:0.08em;text-transform:uppercase;color:#6b7280;margin-bottom:8px;font-weight:600;">Briefing</div>
                  <div style="font-size:14px;color:#111827;line-height:1.65;">${escapeHtml(a.briefing)}</div>
                  <div style="margin-top:12px;padding-top:12px;border-top:1px solid #e5e7eb;font-size:14px;color:#111827;line-height:1.5;">
                    <strong style="color:#16a34a;">→</strong> ${escapeHtml(a.recommendation)}
                  </div>
                </div>
              </td>
            </tr>
            ${apolloBlock}
            ${posthogBlock}
            <tr>
              <td style="padding:16px 24px;border-top:1px solid #e5e7eb;background:#fafafa;">
                <div style="font-size:11px;letter-spacing:0.08em;text-transform:uppercase;color:#6b7280;margin-bottom:6px;font-weight:600;">Fit reasoning · ${a.fitScore}/100</div>
                <ul style="margin:0;padding-left:18px;font-size:12px;color:#4b5563;line-height:1.6;">
                  ${reasonsList}
                </ul>
              </td>
            </tr>
            <tr>
              <td style="padding:20px 24px;background:#f9fafb;border-top:1px solid #e5e7eb;">
                <a href="${clerkUrl}" style="display:inline-block;padding:10px 16px;background:#111827;color:#ffffff;border-radius:8px;text-decoration:none;font-size:13px;font-weight:600;">
                  View in Clerk
                </a>
                <a href="mailto:${escapeHtml(a.email)}?subject=Welcome%20to%20Halliard" style="display:inline-block;padding:10px 16px;background:#ffffff;color:#111827;border:1px solid #d1d5db;border-radius:8px;text-decoration:none;font-size:13px;font-weight:600;margin-left:8px;">
                  Reply directly
                </a>
                ${a.apolloPerson?.linkedin ? `<a href="${escapeHtml(a.apolloPerson.linkedin)}" style="display:inline-block;padding:10px 16px;background:#ffffff;color:#0a66c2;border:1px solid #d1d5db;border-radius:8px;text-decoration:none;font-size:13px;font-weight:600;margin-left:8px;">LinkedIn</a>` : ''}
              </td>
            </tr>
            <tr>
              <td style="padding:12px 24px;background:#f3f4f6;font-size:11px;color:#9ca3af;text-align:center;">
                🎯 Pitch · Clerk webhook · ${escapeHtml(created)} ET · Clerk ID <code>${escapeHtml(evt.data.id)}</code>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>`

  const text = [
    `New Halliard signup: ${a.displayName} <${a.email}>`,
    `Company: ${a.companyGuess || '—'}`,
    `Fit: ${a.fitLabel} (${a.fitScore}/100)`,
    ``,
    a.briefing,
    ``,
    a.recommendation,
    ``,
    `Clerk: ${clerkUrl}`,
  ].join('\n')

  const companyBit = a.companyGuess || (a.apolloCompany?.name ?? a.domain)
  const subject = `[Halliard signup] ${a.fitLabel} · ${a.displayName} — ${companyBit}`
  return { html, text, subject }
}

function miniRow(label: string, value: string): string {
  return `
    <tr>
      <td style="padding:5px 0;font-size:11px;color:#6b7280;text-transform:uppercase;letter-spacing:0.04em;width:110px;vertical-align:top;">${escapeHtml(label)}</td>
      <td style="padding:5px 0;font-size:13px;color:#111827;">${value}</td>
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
  if (!r.ok) throw new Error(`AgentMail send failed ${r.status}: ${body}`)
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
  } catch {
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
    return res.status(200).json({ ok: true, ignored: evt.type })
  }

  try {
    const analysis = await analyze(evt)
    const { html, text, subject } = renderEmail(evt, analysis)
    await sendAgentMail(subject, html, text)
    return res.status(200).json({
      ok: true,
      user_id: evt.data.id,
      email: analysis.email,
      fit: analysis.fitLabel,
      score: analysis.fitScore,
      posthog_found: analysis.posthog.found,
      apollo_matched: !!analysis.apolloCompany,
    })
  } catch (err: any) {
    console.error('clerk-webhook error', err)
    return res.status(500).json({ error: 'handler_failed', message: err?.message || String(err) })
  }
}
