import React, { useState } from 'react'
import { ArrowRight, CalendarCheck, CheckCircle2, Loader2 } from 'lucide-react'
import { trackPixel } from '../../lib/meta-pixel'

/** The Google Calendar booking page /schedule-demo embeds. */
export const BOOKING_URL =
  'https://calendar.google.com/calendar/appointments/schedules/AcZssZ3FnvqgzK-aKgcTvNmT8Et-d6Xxi1a07hUF13ufKd6OtSjRf9tUJyuP73kyK7ysyI8jebXoLYMF?gv=true'

const CONTACT_EMAIL = 'matthew@halliardmedia.com'

// Google Ads account 8086399946's "Demo Request (trytoday form)" action, a
// primary lead-form conversion: the label every lead form on the site sends.
// Swap in a dedicated "Plan requested" action's label once one exists.
const GOOGLE_ADS_LEAD = 'AW-672346912/qEmHCJ6L_pgcEKDmzMAC'

/** A random ID, so Google counts each brief once. Never the email: Google forbids personal data here. */
function newTransactionId() {
  try {
    return crypto.randomUUID()
  } catch {
    return `${Date.now()}-${Math.random().toString(36).slice(2)}`
  }
}

/** The brief is in: tell Google Ads, so the search campaign can count and bid on it. */
function trackGoogleAdsLead(transactionId: string) {
  try {
    const gtag = (window as unknown as { gtag?: (...args: unknown[]) => void }).gtag
    if (typeof gtag === 'function') {
      gtag('event', 'conversion', { send_to: GOOGLE_ADS_LEAD, value: 100.0, currency: 'USD', transaction_id: transactionId })
    }
  } catch {
    // Never let a tag error stop the confirmation showing.
  }
}

const BUDGETS = ['Under $25,000', '$25,000 – $100,000', '$100,000 – $500,000', 'Over $500,000', 'Not sure yet']

type Stage = 'contact' | 'brief' | 'sent'

/**
 * The buying desk's offer: send a brief, get a costed plan back within 24
 * hours, no account. Two steps, so the easy fields come first: work email
 * and agency are sent to Formspark as soon as they're given (stage
 * "contact"), so a visitor who stops at the brief is still a lead. The brief
 * follows as a second submission (stage "brief"). Both go through /api/lead
 * to the buying-desk-plan Formspark form.
 */
export function PlanRequestForm({
  utms,
  hero,
  capture,
}: {
  utms: Record<string, string>
  hero: string
  capture: (name: string, props?: Record<string, unknown>) => void
}) {
  const [stage, setStage] = useState<Stage>('contact')
  const [sending, setSending] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [contact, setContact] = useState({ email: '', agency: '' })

  async function send(fields: Record<string, string>) {
    const res = await fetch('/api/lead', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        form: 'buying-desk-plan',
        ...fields,
        ...utms,
        hero,
        page: '/buying-desk',
        submitted_at: new Date().toISOString(),
      }),
    })
    if (!res.ok) throw new Error(`Status ${res.status}`)
  }

  async function onContact(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const data = new FormData(e.currentTarget)
    if (String(data.get('website') || '')) return // a bot filled the hidden field
    const next = { email: String(data.get('email') || '').trim(), agency: String(data.get('agency') || '').trim() }
    setContact(next)
    setError(null)
    setSending(true)
    capture('buying_desk_plan_form_started')
    try {
      await send({ stage: 'contact', ...next })
    } catch (err) {
      // The brief step still sends the email and agency, so carry on.
      console.error('Plan request (contact) failed', err)
    }
    setSending(false)
    setStage('brief')
  }

  async function onBrief(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const data = new FormData(e.currentTarget)
    if (String(data.get('website') || '')) {
      setStage('sent')
      return
    }
    const budget = String(data.get('budget') || '')
    setError(null)
    setSending(true)
    try {
      await send({
        stage: 'brief',
        ...contact,
        name: String(data.get('name') || '').trim(),
        brief: String(data.get('brief') || '').trim(),
        budget,
      })
      capture('buying_desk_plan_requested', { budget, hero })
      trackPixel('Lead', { content_name: 'buying_desk_free_plan' })
      trackGoogleAdsLead(newTransactionId())
      setStage('sent')
    } catch (err) {
      console.error('Plan request (brief) failed', err)
      setError(`That didn't send. Try again, or email the brief to ${CONTACT_EMAIL}.`)
    }
    setSending(false)
  }

  const field =
    'block w-full rounded-xl border-0 bg-white px-4 py-3 text-base text-slate-900 shadow-sm ring-1 ring-inset ring-slate-200 placeholder:text-slate-400 focus:ring-2 focus:ring-inset focus:ring-primary'
  const label = 'block text-sm font-semibold text-slate-900'
  const honeypot = (
    <div aria-hidden className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
      <label htmlFor={`website-${stage}`}>Website</label>
      <input id={`website-${stage}`} name="website" type="text" tabIndex={-1} autoComplete="off" />
    </div>
  )

  if (stage === 'sent') {
    return (
      <div className="rounded-3xl bg-white p-6 text-left shadow-xl ring-1 ring-slate-900/5 sm:p-8">
        <CheckCircle2 className="h-8 w-8 text-primary" aria-hidden />
        <h3 className="mt-4 font-display text-2xl tracking-tight text-slate-900">Your brief is in.</h3>
        <p className="mt-3 text-base text-slate-700">
          Your costed plan will reach <span className="font-semibold text-slate-900">{contact.email || 'your inbox'}</span>{' '}
          within 24 hours: audiences, channels, budgets and modelled reach, with our fee for the campaign. Nothing is
          bought unless you approve it.
        </p>
        <div className="mt-6 rounded-2xl bg-tint p-5">
          <p className="font-semibold text-slate-900">Want to walk through it together?</p>
          <p className="mt-1 text-sm text-slate-700">Book 15 minutes and we&rsquo;ll go through the plan with you.</p>
          <a
            href={BOOKING_URL}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => capture('buying_desk_call_booking_clicked', { location: 'confirmation' })}
            className="mt-4 inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-white hover:bg-primary/90"
          >
            <CalendarCheck className="h-4 w-4" aria-hidden />
            Pick a time
          </a>
        </div>
      </div>
    )
  }

  return (
    <div className="rounded-3xl bg-white p-6 text-left shadow-xl ring-1 ring-slate-900/5 sm:p-8">
      <p className="text-xs font-semibold uppercase tracking-wider text-primary">
        Step {stage === 'contact' ? 1 : 2} of 2
      </p>

      {stage === 'contact' ? (
        <form onSubmit={onContact} className="relative mt-4 flex flex-col gap-5">
          {honeypot}
          <div>
            <label htmlFor="plan-email" className={label}>
              Work email
            </label>
            <input id="plan-email" name="email" type="email" required autoComplete="email" placeholder="you@agency.com" className={`mt-2 ${field}`} />
          </div>
          <div>
            <label htmlFor="plan-agency" className={label}>
              Agency
            </label>
            <input id="plan-agency" name="agency" type="text" required autoComplete="organization" placeholder="Agency name" className={`mt-2 ${field}`} />
          </div>
          <button
            type="submit"
            disabled={sending}
            className="inline-flex items-center justify-center gap-2 rounded-full bg-primary px-6 py-3 text-base font-semibold text-white hover:bg-primary/90 disabled:opacity-70"
          >
            {sending ? <Loader2 className="h-4 w-4 animate-spin" aria-hidden /> : null}
            Next: the brief
            <ArrowRight className="h-4 w-4" aria-hidden />
          </button>
          <p className="text-sm text-slate-500">We use your email to send the plan. No account, no credit card.</p>
        </form>
      ) : (
        <form onSubmit={onBrief} className="relative mt-4 flex flex-col gap-5">
          {honeypot}
          <div>
            <label htmlFor="plan-brief" className={label}>
              The brief
            </label>
            <textarea
              id="plan-brief"
              name="brief"
              required
              rows={5}
              placeholder="Paste it, or tell us the goal, budget, dates, market and audience. You can send the RFP afterwards."
              className={`mt-2 ${field}`}
            />
          </div>
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            <div>
              <label htmlFor="plan-budget" className={label}>
                Rough media budget
              </label>
              <select id="plan-budget" name="budget" defaultValue="" className={`mt-2 ${field}`}>
                <option value="" disabled>
                  Choose one
                </option>
                {BUDGETS.map(b => (
                  <option key={b} value={b}>
                    {b}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label htmlFor="plan-name" className={label}>
                Your name <span className="font-normal text-slate-500">(optional)</span>
              </label>
              <input id="plan-name" name="name" type="text" autoComplete="name" className={`mt-2 ${field}`} />
            </div>
          </div>
          <button
            type="submit"
            disabled={sending}
            className="inline-flex items-center justify-center gap-2 rounded-full bg-primary px-6 py-3 text-base font-semibold text-white hover:bg-primary/90 disabled:opacity-70"
          >
            {sending ? <Loader2 className="h-4 w-4 animate-spin" aria-hidden /> : null}
            Get my free plan
            <ArrowRight className="h-4 w-4" aria-hidden />
          </button>
          {error ? (
            <p role="alert" className="text-sm font-medium text-red-700">
              {error}
            </p>
          ) : (
            <p className="text-sm text-slate-500">Plan back within 24 hours. Nothing is bought unless you approve it.</p>
          )}
        </form>
      )}
    </div>
  )
}
