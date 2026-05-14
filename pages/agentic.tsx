import Head from 'next/head'
import React, { useEffect, useState } from 'react'
import { Container } from '../components/mmm/Container'
import { Button } from '../components/mmm/Button'
import { trackCta } from '../lib/track'
import { trackPixel } from '@/lib/meta-pixel'

// =============================================================================
// /agentic — cold-paid landing page for the agentic-buying angle.
//
// Funnel design (memory rules, 2026-05-14):
//   - Meta cold paid is 99.6% MOBILE. Mobile cannot complete a Clerk signup
//     or a Google Calendar embed reliably. (MEMORY.md hardcoded.)
//   - This page therefore has ONE CTA: a 4-field inbound enquiry form.
//   - Submit goes to /api/lead which proxies to Formspark phcmKSgAi.
//   - Matthew personally follows up to book the actual call.
//
// We are NOT pretending this page will produce Clerk signups. The KPIs are:
//   1. Enquiry form submissions (primary)
//   2. Snitcher company IDs on /agentic visits (secondary)
//   3. Google branded-search lift over 30 days (tertiary)
// =============================================================================

function MinimalHeader() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/70 backdrop-blur-sm border-b border-gray-100">
      <Container className="">
        <nav className="relative flex justify-center items-center py-5">
          <img
            src="https://framerusercontent.com/images/s97qQgHpRGf1STgb6vDMgqYNU4.png?scale-down-to=512"
            alt="Halliard"
            className="h-8 w-auto"
          />
        </nav>
      </Container>
    </header>
  )
}

const PLUS_PATTERN =
  "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%231a6ab4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")"

function scrollToEnquiry() {
  if (typeof window === 'undefined') return
  const el = document.getElementById('enquire')
  if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
}

function fireEnquiryIntent(location: string) {
  try {
    trackCta('agentic_enquiry_intent_click', location)
    if (typeof window !== 'undefined') {
      const w = window as any
      if (w.posthog) {
        w.posthog.capture('agentic_enquiry_intent_click', {
          location,
          page: '/agentic',
        })
      }
      if (w.gtag) {
        w.gtag('event', 'conversion', {
          send_to: 'AW-672346912/qEmHCJ6L_pgcEKDmzMAC',
        })
      }
    }
    trackPixel('Lead', {
      content_name: 'agentic_enquiry_intent_click',
      source: 'agentic_lp',
      engagement_tier: 'viewed',
    })
  } catch {
    /* never block UX on tracking */
  }
}

function fireEnquirySubmitted(payload: Record<string, string>) {
  try {
    if (typeof window !== 'undefined') {
      const w = window as any
      if (w.posthog) {
        w.posthog.capture('agentic_enquiry_submitted', {
          page: '/agentic',
          agency: payload.agency || null,
        })
      }
      if (w.gtag) {
        w.gtag('event', 'conversion', {
          send_to: 'AW-672346912/qEmHCJ6L_pgcEKDmzMAC',
          value: 100.0,
          currency: 'USD',
        })
      }
    }
    trackPixel('Lead', {
      content_name: 'agentic_enquiry_submitted',
      source: 'agentic_lp',
      engagement_tier: 'submitted',
    })
  } catch {
    /* never block */
  }
}

function Hero() {
  return (
    <div className="relative overflow-hidden">
      <div
        className="absolute inset-0 opacity-[0.07]"
        style={{ backgroundImage: PLUS_PATTERN, backgroundSize: '18px 18px' }}
      />
      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse at 50% 0%, rgba(211,228,255,0.3) 0%, rgba(255,255,255,0.95) 70%, rgb(255,255,255) 100%)',
        }}
      />
      <Container className="relative pt-28 pb-12 text-center lg:pt-32">
        <div className="mx-auto max-w-3xl">
          <p className="inline-flex items-center gap-2 rounded-full bg-tint px-4 py-1.5 text-sm font-medium text-primary mb-6">
            <span>🤖</span> For independent agencies managing $5M+ in media
          </p>
          <h1 className="font-display text-4xl font-medium tracking-tight text-slate-900 sm:text-5xl lg:text-6xl">
            Your buyer agent.{' '}
            <span className="relative text-primary">
              <svg
                aria-hidden="true"
                viewBox="0 0 418 42"
                className="absolute left-0 top-2/3 h-[0.58em] w-full fill-primary/30"
                preserveAspectRatio="none"
              >
                <path d="M203.371.916c-26.013-2.078-76.686 1.963-124.73 9.946L67.3 12.749C35.421 18.062 18.2 21.766 6.004 25.934 1.244 27.561.828 27.778.874 28.61c.07 1.214.828 1.121 9.595-1.176 9.072-2.377 17.15-3.92 39.246-7.496C123.565 7.986 157.869 4.492 195.942 5.046c7.461.108 19.25 1.696 19.17 2.582-.107 1.183-7.874 4.31-25.75 10.366-21.992 7.45-35.43 12.534-36.701 13.884-2.173 2.308-.202 4.407 4.442 4.734 2.654.187 3.263.157 15.593-.78 35.401-2.686 57.944-3.488 88.365-3.143 46.327.526 75.721 2.23 130.788 7.584 19.787 1.924 20.814 1.98 24.557 1.332l.066-.011c1.201-.203 1.53-1.825.399-2.335-2.911-1.31-4.893-1.604-22.048-3.261-57.509-5.556-87.871-7.36-132.059-7.842-23.239-.254-33.617-.116-50.627.674-11.629.54-42.371 2.494-46.696 2.967-2.359.259 8.133-3.625 26.504-9.81 23.239-7.825 27.934-10.149 28.304-14.005.417-4.348-3.529-6-16.878-7.066Z" />
              </svg>
              <span className="relative">Your principles.</span>
            </span>
            <br />
            Without the TTD tax.
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg tracking-tight text-slate-700">
            Halliard is building agentic buying for independent agencies — your team&rsquo;s
            buying principles, executed by an agent on PubMatic/ADCP at a fraction of
            holdco-DSP fees. Plan → Buy → Measure, unbiased, in one system.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row justify-center gap-4">
            <Button
              className=""
              color="blue"
              onClick={() => {
                fireEnquiryIntent('hero')
                scrollToEnquiry()
              }}
            >
              Talk to us about a pilot →
            </Button>
          </div>

          <p className="mt-5 text-sm text-slate-500">
            We&rsquo;re onboarding a small cohort of independents in 2026. No deck. No follow-up unless you ask.
          </p>
        </div>
      </Container>
    </div>
  )
}

function WhatIsItSection() {
  return (
    <section className="bg-white py-16 border-b border-tint">
      <Container className="">
        <div className="mx-auto max-w-4xl">
          <h2 className="font-display text-3xl font-medium tracking-tight text-slate-900 text-center sm:text-4xl">
            DSPs recommend their own inventory.<br />
            <span className="text-primary">Your agent shouldn&rsquo;t.</span>
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-slate-700 text-center leading-relaxed">
            Trade Desk, Amazon, Google &mdash; every holdco-grade buyer is recommending the
            inventory it makes the most fee on. Independents pay that bias every time they buy.
          </p>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-slate-700 text-center leading-relaxed">
            A Halliard buyer agent buys against <em>your</em> media principles &mdash; brand safety,
            audience strategy, channel mix, frequency caps &mdash; trained on how your senior
            buyers actually buy. Direct exchange access via PubMatic / ADCP. Take rate, not seat licenses.
          </p>
        </div>
      </Container>
    </section>
  )
}

const PILLARS: Array<{ title: string; body: string; img: string; alt: string }> = [
  {
    title: 'Plan — the intelligence layer',
    body: 'Channel mix, reach &amp; frequency, scenario versions, MMM-grade response curves. The plan your senior strategists would build, in minutes, not weeks. Already in production with Lewis Media.',
    img: '/images/product/flighting.webp',
    alt: 'Halliard planner with channel-level budget allocation across 18 channels',
  },
  {
    title: 'Buy — your agent on the exchange',
    body: 'Your buyer agent inherits your team&rsquo;s principles, executes plans into the open exchange via PubMatic / ADCP, and respects every guardrail you set. Fees are a take rate on media &mdash; not a per-seat tax.',
    img: '/images/product/compare.webp',
    alt: 'Halliard scenario comparison showing strategy options side by side',
  },
  {
    title: 'Measure — feedback into the next plan',
    body: 'MMM-grade response curves and brand-study reads close the loop. The agent learns from outcomes; next quarter&rsquo;s plan starts from real attribution, not last year&rsquo;s spreadsheet.',
    img: '/images/product/response-curves.webp',
    alt: 'Halliard response curves dashboard showing channel-level marginal returns',
  },
]

function PillarRow({
  item,
  reverse,
}: {
  item: { title: string; body: string; img: string; alt: string }
  reverse?: boolean
}) {
  return (
    <div
      className={`flex flex-col ${reverse ? 'lg:flex-row-reverse' : 'lg:flex-row'} items-center gap-10 lg:gap-16`}
    >
      <div className="lg:flex-1">
        <h3
          className="font-display text-2xl sm:text-3xl font-medium text-slate-900"
          dangerouslySetInnerHTML={{ __html: item.title }}
        />
        <p
          className="mt-3 text-lg text-slate-700 leading-relaxed"
          dangerouslySetInnerHTML={{ __html: item.body }}
        />
      </div>
      <div className="lg:flex-1 w-full">
        <div className="rounded-xl border border-tint shadow-lg overflow-hidden bg-white">
          <img src={item.img} alt={item.alt} className="w-full h-auto" />
        </div>
      </div>
    </div>
  )
}

function PillarsSection() {
  return (
    <section className="bg-white py-20">
      <Container className="">
        <div className="mx-auto max-w-6xl space-y-20">
          {PILLARS.map((item, i) => (
            <PillarRow key={item.title} item={item} reverse={i % 2 === 1} />
          ))}
        </div>
      </Container>
    </section>
  )
}

function ProofQuote() {
  return (
    <section className="bg-slate-50 py-16">
      <Container className="">
        <div className="mx-auto max-w-3xl text-center">
          <svg
            className="mx-auto h-10 w-10 text-primary/40"
            fill="currentColor"
            viewBox="0 0 32 32"
            aria-hidden="true"
          >
            <path d="M9.352 4C4.456 7.456 1 13.12 1 19.36c0 5.088 3.072 8.064 6.624 8.064 3.36 0 5.856-2.688 5.856-5.856 0-3.168-2.208-5.472-5.088-5.472-.576 0-1.344.096-1.536.192.48-3.264 3.552-7.104 6.624-9.024L9.352 4zm16.512 0c-4.8 3.456-8.256 9.12-8.256 15.36 0 5.088 3.072 8.064 6.624 8.064 3.264 0 5.856-2.688 5.856-5.856 0-3.168-2.304-5.472-5.184-5.472-.576 0-1.248.096-1.44.192.48-3.264 3.456-7.104 6.528-9.024L25.864 4z" />
          </svg>
          <p className="mt-6 font-display text-2xl font-medium text-slate-900 sm:text-3xl leading-snug">
            &ldquo;Halliard told us our client&rsquo;s Meta was driving zero incremental conversions.
            We cancelled the wrong line item for two years.&rdquo;
          </p>
          <p className="mt-6 text-sm font-medium text-slate-700">
            — Director of Strategy, independent agency
          </p>
        </div>
      </Container>
    </section>
  )
}

function EnquirySection() {
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle')
  const [errorMsg, setErrorMsg] = useState<string | null>(null)

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setStatus('submitting')
    setErrorMsg(null)
    const form = e.currentTarget
    const data = new FormData(form)
    const payload: Record<string, string> = {
      name: String(data.get('name') || ''),
      email: String(data.get('email') || ''),
      agency: String(data.get('agency') || ''),
      problem: String(data.get('problem') || ''),
      source: 'agentic_lp',
      page: '/agentic',
      submitted_at: new Date().toISOString(),
    }

    // Honeypot — bots fill hidden fields, humans don't.
    if (String(data.get('website') || '')) {
      setStatus('success') // silent success for bots
      return
    }

    try {
      const res = await fetch('/api/lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })
      if (!res.ok) {
        throw new Error(`Status ${res.status}`)
      }
      fireEnquirySubmitted(payload)
      setStatus('success')
      form.reset()
    } catch (err: any) {
      console.error('Enquiry submission failed', err)
      setStatus('error')
      setErrorMsg(
        'Something went wrong — please email matthew@halliardmedia.com directly.',
      )
    }
  }

  return (
    <section id="enquire" className="bg-slate-50 py-20 scroll-mt-20">
      <Container className="">
        <div className="mx-auto max-w-2xl">
          <div className="text-center">
            <h2 className="font-display text-3xl font-medium tracking-tight text-slate-900 sm:text-4xl">
              Talk to us about a pilot
            </h2>
            <p className="mt-4 text-lg text-slate-700">
              We&rsquo;re onboarding a small cohort of independent agencies in 2026.
              Tell us about your agency and what you&rsquo;re trying to solve &mdash;
              Matthew will reply personally within 24 hours to schedule a call.
            </p>
          </div>

          {status === 'success' ? (
            <div className="mt-10 rounded-xl border border-tint bg-white p-8 text-center shadow-sm">
              <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary text-2xl">
                ✓
              </div>
              <h3 className="font-display text-xl font-medium text-slate-900">
                Got it. Matthew will reply within 24 hours.
              </h3>
              <p className="mt-2 text-sm text-slate-600">
                If it&rsquo;s urgent, email <a className="text-primary underline" href="mailto:matthew@halliardmedia.com">matthew@halliardmedia.com</a>.
              </p>
            </div>
          ) : (
            <form
              onSubmit={handleSubmit}
              className="mt-10 rounded-xl border border-tint bg-white p-6 sm:p-8 shadow-sm space-y-5"
            >
              {/* Honeypot */}
              <input
                type="text"
                name="website"
                tabIndex={-1}
                autoComplete="off"
                className="absolute -left-[9999px] h-0 w-0 opacity-0"
                aria-hidden="true"
              />

              <div>
                <label htmlFor="name" className="block text-sm font-medium text-slate-700">
                  Your name
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  required
                  autoComplete="name"
                  className="mt-1.5 block w-full rounded-md border border-slate-300 bg-white px-3 py-2.5 text-base text-slate-900 placeholder-slate-400 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                  placeholder="Jane Buyer"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-slate-700">
                  Work email
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  autoComplete="email"
                  inputMode="email"
                  className="mt-1.5 block w-full rounded-md border border-slate-300 bg-white px-3 py-2.5 text-base text-slate-900 placeholder-slate-400 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                  placeholder="jane@youragency.com"
                />
              </div>

              <div>
                <label htmlFor="agency" className="block text-sm font-medium text-slate-700">
                  Agency
                </label>
                <input
                  id="agency"
                  name="agency"
                  type="text"
                  required
                  autoComplete="organization"
                  className="mt-1.5 block w-full rounded-md border border-slate-300 bg-white px-3 py-2.5 text-base text-slate-900 placeholder-slate-400 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                  placeholder="Your agency name"
                />
              </div>

              <div>
                <label htmlFor="problem" className="block text-sm font-medium text-slate-700">
                  What are you trying to solve?
                </label>
                <textarea
                  id="problem"
                  name="problem"
                  rows={3}
                  required
                  className="mt-1.5 block w-full rounded-md border border-slate-300 bg-white px-3 py-2.5 text-base text-slate-900 placeholder-slate-400 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                  placeholder="One line is fine — e.g. 'we want to move buying off TTD' or 'we want to deliver agentic buying to our clients'"
                />
              </div>

              {status === 'error' && errorMsg && (
                <p className="text-sm text-red-600">{errorMsg}</p>
              )}

              <button
                type="submit"
                disabled={status === 'submitting'}
                className="w-full inline-flex items-center justify-center rounded-md bg-primary text-white font-medium py-3 px-4 text-base hover:bg-primary/90 active:bg-primary/80 transition disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {status === 'submitting' ? 'Sending…' : 'Send enquiry →'}
              </button>

              <p className="text-xs text-slate-500 text-center">
                We&rsquo;ll only use this to reply. No newsletter, no follow-up unless you ask.
              </p>
            </form>
          )}
        </div>
      </Container>
    </section>
  )
}

function StickyMobileCta() {
  const [show, setShow] = useState(false)
  useEffect(() => {
    function onScroll() {
      setShow(window.scrollY > 400)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [])
  if (!show) return null
  return (
    <div className="fixed bottom-0 inset-x-0 z-40 lg:hidden">
      <div className="bg-white/95 backdrop-blur border-t border-tint shadow-lg px-4 py-3">
        <button
          onClick={() => {
            fireEnquiryIntent('sticky_mobile')
            scrollToEnquiry()
          }}
          className="w-full inline-flex items-center justify-center rounded-md bg-primary text-white font-medium py-3 px-4 text-base hover:bg-primary/90 active:bg-primary/80 transition"
        >
          Talk to us about a pilot →
        </button>
      </div>
    </div>
  )
}

function AgenticPage() {
  useEffect(() => {
    // Hide Intercom chat bubble — cold-paid LP has one CTA, no exits.
    try {
      const w = window as any
      if (w.Intercom) w.Intercom('update', { hide_default_launcher: true })
      const style = document.createElement('style')
      style.id = 'agentic-lp-hide-intercom'
      style.innerHTML =
        '.intercom-lightweight-app,.intercom-launcher,.intercom-launcher-frame,#intercom-container{display:none !important;visibility:hidden !important;}'
      document.head.appendChild(style)
      return () => {
        const el = document.getElementById('agentic-lp-hide-intercom')
        if (el) el.remove()
      }
    } catch {
      /* never block */
    }
  }, [])

  return (
    <>
      <Head>
        <title>Agentic Media Buying for Independent Agencies | Halliard</title>
        <meta
          name="description"
          content="Halliard is building agentic buying for independent agencies. Your team's principles, executed by an agent on PubMatic/ADCP, at a fraction of holdco-DSP fees."
        />
        <meta name="robots" content="noindex,follow" />
        <meta property="og:title" content="Agentic Media Buying for Independents | Halliard" />
        <meta
          property="og:description"
          content="Your buyer agent. Your principles. Without the TTD tax. Plan → Buy → Measure for independent agencies."
        />
      </Head>
      <MinimalHeader />
      <main className="pb-24 lg:pb-0">
        <Hero />
        <WhatIsItSection />
        <PillarsSection />
        <ProofQuote />
        <EnquirySection />
        <StickyMobileCta />
      </main>
    </>
  )
}

;(AgenticPage as any).disableNavbar = true
;(AgenticPage as any).fullWidth = true
;(AgenticPage as any).siteBg = true

export default AgenticPage
