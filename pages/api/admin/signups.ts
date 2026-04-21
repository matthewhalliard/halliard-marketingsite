import type { NextApiRequest, NextApiResponse } from 'next'

/**
 * Admin Signup Flow Dashboard data.
 *
 * Returns merged data from:
 *   - Clerk (auth/identity)
 *   - PostHog (attribution, activity events)
 *   - Signup flow state (stored in R2 via /api/admin/state.json, or fetched from GitHub gist)
 *
 * Auth: requires `?token=` matching ADMIN_DASH_TOKEN env var.
 */

type SignupRow = {
  email: string
  signedUpAt: string | null
  clerkId: string | null
  firstName: string | null
  lastName: string | null
  lastActiveAt: string | null
  lastSignInAt: string | null
  utmSource: string | null
  utmCampaign: string | null
  referrer: string | null
  geo: string | null
  flowStatus: string | null
  category: string | null
  companyName: string | null
  personalSentence: string | null
  dayInFlow: number | null
  nextEmailAt: string | null
  nextEmailSubject: string | null
  eventCount30d: number | null
  eventsByType?: Record<string, number>
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const token = (req.query.token as string) || req.headers['x-admin-token']
  if (!token || token !== process.env.ADMIN_DASH_TOKEN) {
    return res.status(401).json({ error: 'unauthorized' })
  }

  const clerkKey = process.env.CLERK_SECRET_KEY
  const posthogKey = process.env.POSTHOG_API_KEY
  if (!clerkKey || !posthogKey) {
    return res.status(500).json({ error: 'missing credentials' })
  }

  try {
    // 1. Fetch Clerk users (most recent 100)
    const clerkRes = await fetch(
      'https://api.clerk.com/v1/users?limit=100&order_by=-created_at',
      { headers: { Authorization: `Bearer ${clerkKey}` } }
    )
    const clerkUsers: any[] = await clerkRes.json()

    // 2. Fetch PostHog persons with email
    const phProps = encodeURIComponent(
      JSON.stringify([
        { key: 'email', value: 'is_set', operator: 'is_set', type: 'person' },
      ])
    )
    const phRes = await fetch(
      `https://us.posthog.com/api/projects/@current/persons/?order=-created_at&limit=200&properties=${phProps}`,
      { headers: { Authorization: `Bearer ${posthogKey}` } }
    )
    const phData = await phRes.json()
    const phByEmail = new Map<string, any>()
    for (const p of phData.results || []) {
      const email = (p.properties?.email || '').toLowerCase()
      if (email) phByEmail.set(email, p)
    }

    // 3. Fetch flow state from our own state endpoint (served from public/ or R2)
    let flowState: any = { users: {} }
    try {
      const proto = req.headers['x-forwarded-proto'] || 'https'
      const host = req.headers.host
      const stateRes = await fetch(
        `${proto}://${host}/api/admin/flow-state?token=${encodeURIComponent(token)}`
      )
      if (stateRes.ok) {
        flowState = await stateRes.json()
      }
    } catch (e) {
      console.error('flow-state fetch error', e)
    }

    // 4. Merge
    const rows: SignupRow[] = []
    for (const u of clerkUsers) {
      const email = (u.email_addresses?.[0]?.email_address || '').toLowerCase()
      if (!email) continue
      const ph = phByEmail.get(email)
      const props = ph?.properties || {}
      const flow = flowState.users?.[email] || null

      let dayInFlow: number | null = null
      let nextEmailAt: string | null = null
      let nextEmailSubject: string | null = null
      const createdAt = u.created_at ? new Date(u.created_at) : null
      if (createdAt) {
        dayInFlow = Math.floor(
          (Date.now() - createdAt.getTime()) / (1000 * 60 * 60 * 24)
        )
      }
      if (flow?.scheduled) {
        const now = Date.now()
        const upcoming = Object.entries(flow.scheduled)
          .filter(
            ([, v]: any) => v?.at && new Date(v.at).getTime() > now && !v.sent
          )
          .sort(
            (a: any, b: any) =>
              new Date(a[1].at).getTime() - new Date(b[1].at).getTime()
          )[0]
        if (upcoming) {
          nextEmailAt = (upcoming[1] as any).at
          nextEmailSubject = (upcoming[1] as any).subject
        }
      }

      rows.push({
        email,
        signedUpAt: createdAt ? createdAt.toISOString() : null,
        clerkId: u.id || null,
        firstName: u.first_name || null,
        lastName: u.last_name || null,
        lastActiveAt: u.last_active_at
          ? new Date(u.last_active_at).toISOString()
          : null,
        lastSignInAt: u.last_sign_in_at
          ? new Date(u.last_sign_in_at).toISOString()
          : null,
        utmSource: props.$initial_utm_source || null,
        utmCampaign: props.$initial_utm_campaign || null,
        referrer: props.$initial_referring_domain || null,
        geo:
          [props.$initial_geoip_city_name, props.$initial_geoip_country_name]
            .filter(Boolean)
            .join(', ') || null,
        flowStatus: flow?.status || null,
        category: flow?.enrichment?.category || null,
        companyName: flow?.enrichment?.company_name || null,
        personalSentence: flow?.enrichment?.personal_sentence || null,
        dayInFlow,
        nextEmailAt,
        nextEmailSubject,
        eventCount30d: null,
      })
    }

    // 5. For each row, pull event count from PostHog (best-effort, limit to top 50 most recent)
    const top = rows.slice(0, 50)
    await Promise.all(
      top.map(async (row) => {
        const ph = phByEmail.get(row.email)
        if (!ph?.distinct_ids?.[0]) return
        try {
          const evRes = await fetch(
            `https://us.posthog.com/api/projects/@current/persons/${ph.id}/activity/?limit=100`,
            { headers: { Authorization: `Bearer ${posthogKey}` } }
          )
          if (evRes.ok) {
            const evData = await evRes.json()
            row.eventCount30d = Array.isArray(evData.results)
              ? evData.results.length
              : null
          }
        } catch (e) {
          // ignore
        }
      })
    )

    return res.status(200).json({
      generatedAt: new Date().toISOString(),
      totalSignups: rows.length,
      inFlow: rows.filter((r) => r.flowStatus === 'in_flow').length,
      replied: rows.filter((r) => r.flowStatus === 'replied').length,
      skipped: rows.filter((r) => r.flowStatus?.startsWith('skipped')).length,
      rows,
    })
  } catch (err: any) {
    console.error('admin/signups error', err)
    return res.status(500).json({ error: err?.message || 'internal error' })
  }
}
