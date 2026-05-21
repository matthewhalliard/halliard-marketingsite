import Head from 'next/head'
import React, { useEffect, useState } from 'react'
import { Container } from '../components/mmm/Container'
import { Button } from '../components/mmm/Button'
import { trackCta } from '../lib/track'
import { trackPixel } from '@/lib/meta-pixel'

// =============================================================================
// /agentic — cold-paid LP for the agentic-buying angle.
//
// Audience: independent-agency planners + heads of media. The pitch they need
// is what they can tell their CLIENT, not what we tell their engineering team.
//
// Funnel: single inbound enquiry form (Matthew replies personally to book).
// No Clerk, no calendar embed (mobile cold paid breaks both — MEMORY hardcoded).
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

// =============================================================================
// HERO — the client-facing pitch
// =============================================================================
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
      <Container className="relative pt-28 pb-16 text-center lg:pt-32">
        <div className="mx-auto max-w-3xl">
          <p className="inline-flex items-center gap-2 rounded-full bg-tint px-4 py-1.5 text-sm font-medium text-primary mb-6">
            <span>🚩</span> For independent agencies
          </p>
          <h1 className="font-display text-4xl font-medium tracking-tight text-slate-900 sm:text-5xl lg:text-[64px] lg:leading-[1.05]">
            Every independent agency needs its{' '}
            <span className="text-primary">own buying agent.</span>
          </h1>
          <p className="mx-auto mt-7 max-w-2xl text-lg sm:text-xl tracking-tight text-slate-700 leading-relaxed">
            Not a DSP&rsquo;s agent. Not a holdco&rsquo;s agent.
            <strong className="text-slate-900"> Your agency&rsquo;s agent.</strong>{' '}
            Trained on your playbook. Buying on the open market on your client&rsquo;s behalf.
            Human-in-the-loop on every flight.
          </p>
          <div className="mt-9 flex flex-col sm:flex-row justify-center gap-4">
            <Button
              className=""
              color="blue"
              onClick={() => {
                fireEnquiryIntent('hero')
                scrollToEnquiry()
              }}
            >
              Join the 2026 pilot cohort →
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

// =============================================================================
// MANIFESTO QUOTE BAND — ties /agentic to the editorial flag-planting post.
// Single quote, attribution, link to full manifesto. No CTA competition.
// =============================================================================
function ManifestoQuoteBand() {
  return (
    <section className="bg-white py-12 sm:py-16 border-b border-tint">
      <Container className="">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-xs font-semibold uppercase tracking-wider text-primary">
            From the Halliard editorial · May 2026
          </p>
          <blockquote className="mt-5">
            <p className="font-display text-2xl sm:text-3xl font-medium tracking-tight text-slate-900 leading-snug">
              &ldquo;Independents don&rsquo;t need a platform&rsquo;s agent.
              They need <span className="text-primary">their own.</span>&rdquo;
            </p>
          </blockquote>
          <p className="mt-6 text-base text-slate-600 leading-relaxed">
            The biggest media-buying decision your agency makes in 2026 is not
            which DSP. It&rsquo;s which agent buys for you.
          </p>
          <p className="mt-5 text-sm">
            <a
              href="/manifesto/the-independents-agent"
              className="text-primary underline hover:no-underline"
            >
              Read the full manifesto →
            </a>
          </p>
        </div>
      </Container>
    </section>
  )
}

// =============================================================================
// "IT KNOWS YOUR AGENCY" — iconed list of what the agent ingests.
// Implemented as a responsive grid of icon-cards (not an SVG diagram).
// =============================================================================
const PRINCIPLE_ITEMS: Array<{ icon: React.ReactNode; title: string; body: string }> = [
  {
    title: 'Your channel strategies',
    body: 'Mix targets per client, growth bets, channels you trust.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M3 3v18h18" />
        <path d="M7 14l4-4 3 3 5-7" />
      </svg>
    ),
  },
  {
    title: 'Your definition of premium media',
    body: 'Allow-lists, tier-1 placements, the inventory your clients pay for.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M12 2l2.39 6.95H22l-6.2 4.5 2.39 6.95L12 16l-6.18 4.4 2.39-6.95L2 8.95h7.61L12 2z" />
      </svg>
    ),
  },
  {
    title: 'Your brand-safety rules',
    body: 'Block-lists, content categories, anything your clients flag as off-limits.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
        <path d="M9 12l2 2 4-4" />
      </svg>
    ),
  },
  {
    title: 'Your audience playbook',
    body: 'Priority segments, look-alikes, custom 1st-party data per client.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <circle cx="9" cy="8" r="3.2" />
        <path d="M2.5 19c.6-3.4 3.4-5.5 6.5-5.5s5.9 2.1 6.5 5.5" />
        <circle cx="17" cy="7" r="2.4" />
        <path d="M14.7 13.5c2.6 0 5 1.6 5.5 4.2" />
      </svg>
    ),
  },
  {
    title: 'Your frequency and pacing rules',
    body: 'Per-user caps, per-flight pacing, weekday and daypart limits.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <circle cx="12" cy="12" r="9" />
        <path d="M12 7v5l3.5 2" />
      </svg>
    ),
  },
  {
    title: 'Your performance history',
    body: 'Past response curves, what worked for which client, what to repeat.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M21 21H4a1 1 0 01-1-1V3" />
        <rect x="7" y="12" width="3" height="6" rx="0.5" />
        <rect x="12" y="8" width="3" height="10" rx="0.5" />
        <rect x="17" y="5" width="3" height="13" rx="0.5" />
      </svg>
    ),
  },
]

function PrincipleCard({
  icon,
  title,
  body,
}: {
  icon: React.ReactNode
  title: string
  body: string
}) {
  return (
    <div className="rounded-xl border border-tint bg-white p-5 sm:p-6 shadow-sm">
      <div className="flex items-start gap-4">
        <div className="flex h-10 w-10 flex-none items-center justify-center rounded-lg bg-tint text-primary">
          <span className="block h-5 w-5">{icon}</span>
        </div>
        <div className="min-w-0">
          <h3 className="text-base font-semibold text-slate-900">{title}</h3>
          <p className="mt-1 text-sm text-slate-600 leading-relaxed">{body}</p>
        </div>
      </div>
    </div>
  )
}

function KnowsYourAgencySection() {
  return (
    <section className="bg-white py-16 sm:py-20 border-b border-tint">
      <Container className="">
        <div className="mx-auto max-w-5xl">
          <div className="text-center">
            <p className="inline-flex items-center gap-2 rounded-full bg-tint px-3 py-1 text-xs font-semibold uppercase tracking-wider text-primary">
              It knows your agency
            </p>
            <h2 className="mt-4 font-display text-3xl font-medium tracking-tight text-slate-900 sm:text-4xl">
              Trained on how <em>your</em> buyers buy.
            </h2>
            <p className="mx-auto mt-5 max-w-2xl text-lg text-slate-700 leading-relaxed">
              Before the agent buys anything, it learns your agency. Your channel strategies,
              your premium-media list, your brand-safety guidelines, your audience priorities,
              your frequency rules, the performance data behind every past plan. It buys the
              way your team would buy, just on every impression, all at once.
            </p>
          </div>
          <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
            {PRINCIPLE_ITEMS.map((it) => (
              <PrincipleCard key={it.title} icon={it.icon} title={it.title} body={it.body} />
            ))}
          </div>
          <p className="mt-10 text-center text-sm text-slate-500">
            Your senior buyers&rsquo; playbook, codified once. Executed on every impression.
          </p>
        </div>
      </Container>
    </section>
  )
}

// =============================================================================
// "DSP TAX" — savings story
// =============================================================================
function DspTaxDiagram() {
  // Stacked bar comparison: $100K client budget,
  // Holdco DSP path: 15-20% DSP fee + 5-10% data + 5% bias premium = lots of waste
  // Halliard path: ~5% take rate
  return (
    <svg
      viewBox="0 0 800 360"
      className="w-full h-auto"
      role="img"
      aria-label="$100K of client media budget under a holdco DSP loses 20-25% to fees and bias. Under a Halliard buyer agent it loses ~5% take rate."
    >
      {/* Left: DSP path */}
      <text x="200" y="32" textAnchor="middle" fontFamily="Inter, system-ui" fontSize="14" fontWeight="700" fill="#7f1d1d" letterSpacing="1.5">DSP</text>
      <text x="200" y="52" textAnchor="middle" fontFamily="Inter, system-ui" fontSize="12" fill="#64748b">$100K client budget</text>

      {/* Stacked bar */}
      <g>
        {/* DSP seat fee 15% */}
        <rect x="120" y="80" width="160" height="42" fill="#dc2626" />
        <text x="200" y="107" textAnchor="middle" fontFamily="Inter, system-ui" fontSize="13" fontWeight="600" fill="#ffffff">DSP seat fee · 15%</text>

        {/* Audience / data fees 10% */}
        <rect x="120" y="122" width="160" height="28" fill="#ea580c" />
        <text x="200" y="141" textAnchor="middle" fontFamily="Inter, system-ui" fontSize="12" fontWeight="600" fill="#ffffff">Audience &amp; data fees · 10%</text>

        {/* Bias premium 5% */}
        <rect x="120" y="150" width="160" height="16" fill="#f59e0b" />
        <text x="200" y="163" textAnchor="middle" fontFamily="Inter, system-ui" fontSize="10" fontWeight="600" fill="#ffffff">Owned-inventory premium · 5%</text>

        {/* Working media 70% */}
        <rect x="120" y="166" width="160" height="222" fill="#f1f5f9" stroke="#cbd5e1" />
        <text x="200" y="275" textAnchor="middle" fontFamily="Inter, system-ui" fontSize="16" fontWeight="700" fill="#0f172a">$70K</text>
        <text x="200" y="295" textAnchor="middle" fontFamily="Inter, system-ui" fontSize="12" fill="#64748b">working media · 70%</text>
      </g>

      {/* Divider */}
      <line x1="400" y1="40" x2="400" y2="340" stroke="#e2e8f0" strokeDasharray="4 4" />

      {/* Right: Halliard path */}
      <text x="600" y="32" textAnchor="middle" fontFamily="Inter, system-ui" fontSize="14" fontWeight="700" fill="#263285" letterSpacing="1.5">HALLIARD AGENT</text>
      <text x="600" y="52" textAnchor="middle" fontFamily="Inter, system-ui" fontSize="12" fill="#64748b">$100K client budget</text>

      <g>
        {/* Halliard take rate 5% */}
        <rect x="520" y="80" width="160" height="14" fill="#1a6ab4" />
        <text x="600" y="91" textAnchor="middle" fontFamily="Inter, system-ui" fontSize="10" fontWeight="600" fill="#ffffff">Halliard take rate · 5%</text>

        {/* Working media 95% */}
        <rect x="520" y="94" width="160" height="294" fill="#d3e4ff" stroke="#263285" />
        <text x="600" y="240" textAnchor="middle" fontFamily="Inter, system-ui" fontSize="22" fontWeight="700" fill="#0f172a">$95K</text>
        <text x="600" y="265" textAnchor="middle" fontFamily="Inter, system-ui" fontSize="12" fill="#263285">working media · 95%</text>
      </g>

      {/* Callout */}
      <g transform="translate(0,0)">
        <rect x="305" y="160" width="190" height="50" rx="8" fill="#ffffff" stroke="#263285" strokeWidth="1.5" />
        <text x="400" y="183" textAnchor="middle" fontFamily="Inter, system-ui" fontSize="14" fontWeight="700" fill="#263285">+ $25K to working media</text>
        <text x="400" y="200" textAnchor="middle" fontFamily="Inter, system-ui" fontSize="11" fill="#1a6ab4">per $100K of every client&rsquo;s budget</text>
      </g>
    </svg>
  )
}

function DspTaxSection() {
  return (
    <section className="bg-slate-50 py-16 sm:py-20 border-b border-tint">
      <Container className="">
        <div className="mx-auto max-w-5xl">
          <div className="text-center">
            <p className="inline-flex items-center gap-2 rounded-full bg-tint px-3 py-1 text-xs font-semibold uppercase tracking-wider text-primary">
              The DSP tax
            </p>
            <h2 className="mt-4 font-display text-3xl font-medium tracking-tight text-slate-900 sm:text-4xl">
              Stop paying 30% to a vendor<br />that buys against you.
            </h2>
            <p className="mx-auto mt-5 max-w-2xl text-lg text-slate-700 leading-relaxed">
              Every DSP charges 15 to 25% in fees on top of audience and data costs, and
              prioritises the inventory it makes the most fee on. A Halliard buyer agent runs
              on a flat take rate and shops the open market on your client&rsquo;s behalf. Same
              client budget, more working media.
            </p>
          </div>
          <div className="mt-12 rounded-2xl border border-tint bg-white p-6 sm:p-10 shadow-sm">
            <DspTaxDiagram />
          </div>
        </div>
      </Container>
    </section>
  )
}

// =============================================================================
// HOW IT WORKS — flow with planner-in-the-loop
// =============================================================================
// =============================================================================
// HOW IT WORKS — 4 numbered step-cards in a responsive grid (no SVG).
// =============================================================================
const HOW_STEPS: Array<{ step: string; title: string; body: string; highlight?: boolean }> = [
  {
    step: '1',
    title: 'You plan',
    body: 'Strategy, channel mix, budget. In Halliard or imported from your stack.',
  },
  {
    step: '2',
    title: 'Agent shops every exchange',
    body: 'Bids and quotes across Meta, Google, PubMatic, Magnite, Amazon, Index, Xandr, OpenX and more.',
  },
  {
    step: '3',
    title: 'Planner reviews recommendations',
    body: 'Your buyer sees every line item the agent proposes. Pick, swap, reject. Nothing buys without approval.',
    highlight: true,
  },
  {
    step: '4',
    title: 'Approved buys execute',
    body: 'Halliard runs the campaign. You see every dollar of spend in real time.',
  },
]

function HowItWorksStepCard({
  step,
  title,
  body,
  highlight,
  isLast,
}: {
  step: string
  title: string
  body: string
  highlight?: boolean
  isLast: boolean
}) {
  return (
    <div className="relative">
      <div
        className={`relative h-full rounded-xl border p-5 sm:p-6 shadow-sm ${
          highlight
            ? 'border-primary bg-tint/40 ring-1 ring-primary/30'
            : 'border-tint bg-white'
        }`}
      >
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 flex-none items-center justify-center rounded-full bg-primary text-white text-base font-bold">
            {step}
          </div>
          <h3 className="text-base font-semibold text-slate-900 leading-snug">
            {title}
          </h3>
        </div>
        <p className="mt-3 text-sm text-slate-600 leading-relaxed">{body}</p>
        {highlight && (
          <p className="mt-3 inline-flex items-center gap-1.5 rounded-full bg-primary px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wider text-white">
            Human in the loop
          </p>
        )}
      </div>

      {/* Connector chevron — only on desktop, between cards */}
      {!isLast && (
        <div
          aria-hidden="true"
          className="hidden lg:flex absolute top-1/2 -right-3.5 z-10 -translate-y-1/2 h-7 w-7 items-center justify-center rounded-full bg-white border border-tint text-primary shadow"
        >
          <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M5 12h14" />
            <path d="M13 5l7 7-7 7" />
          </svg>
        </div>
      )}
    </div>
  )
}

function HowItWorksSection() {
  return (
    <section className="bg-white py-16 sm:py-20 border-b border-tint">
      <Container className="">
        <div className="mx-auto max-w-6xl">
          <div className="text-center">
            <p className="inline-flex items-center gap-2 rounded-full bg-tint px-3 py-1 text-xs font-semibold uppercase tracking-wider text-primary">
              How it works
            </p>
            <h2 className="mt-4 font-display text-3xl font-medium tracking-tight text-slate-900 sm:text-4xl">
              Your planners stay in control.<br />
              <span className="text-primary">The agent does the shopping.</span>
            </h2>
            <p className="mx-auto mt-5 max-w-2xl text-lg text-slate-700 leading-relaxed">
              The agent never buys without a human approving the line item.
              Your senior buyers spend their time on strategy and client conversations,
              not on platform UIs.
            </p>
          </div>
          <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {HOW_STEPS.map((s, i) => (
              <HowItWorksStepCard
                key={s.step}
                step={s.step}
                title={s.title}
                body={s.body}
                highlight={s.highlight}
                isLast={i === HOW_STEPS.length - 1}
              />
            ))}
          </div>
        </div>
      </Container>
    </section>
  )
}

// =============================================================================
// EXCHANGES — where the agent shops
// =============================================================================
function ExchangesSection() {
  // Official vendor logos in /public/logos/vendors. All logos are used as
  // nominative-fair-use references to compatible exchange platforms. We don't
  // claim partnership, endorsement, or any commercial relationship with these
  // brands beyond what's actually true.
  const exchanges: Array<{ name: string; file: string; isPng?: boolean }> = [
    { name: 'Meta', file: 'meta.svg' },
    { name: 'Google', file: 'google.svg' },
    { name: 'Amazon', file: 'amazon.svg' },
    { name: 'The Trade Desk', file: 'ttd.svg' },
    { name: 'PubMatic', file: 'pubmatic.svg' },
    { name: 'Magnite', file: 'magnite.svg' },
  ]
  return (
    <section className="bg-slate-50 py-16 sm:py-20 border-b border-tint">
      <Container className="">
        <div className="mx-auto max-w-5xl text-center">
          <p className="inline-flex items-center gap-2 rounded-full bg-tint px-3 py-1 text-xs font-semibold uppercase tracking-wider text-primary">
            Built on agent-ready platforms
          </p>
          <h2 className="mt-4 font-display text-3xl font-medium tracking-tight text-slate-900 sm:text-4xl">
            One agent. Every agent-ready platform.
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-lg text-slate-700 leading-relaxed">
            Halliard plugs into the platforms that have already shipped real agentic
            infrastructure. Each one exposes an MCP server, CLI, or agent runtime your
            buyer agent can call directly. No screen-scraping. No glue code. Just buys.
          </p>
          <div className="mt-12 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
            {exchanges.map((ex) => (
              <div
                key={ex.name}
                className="flex h-20 items-center justify-center rounded-xl border border-tint bg-white px-4 py-3 shadow-sm"
              >
                <img
                  src={`/logos/vendors/${ex.file}`}
                  alt={ex.name}
                  className="max-h-9 w-auto max-w-full object-contain"
                  loading="lazy"
                />
              </div>
            ))}
          </div>
          <p className="mt-8 text-sm text-slate-500">
            More integrations rolling out as platforms ship agent runtimes. Tell us what your clients buy and we&rsquo;ll prioritise.
          </p>
          <p className="mt-3 text-[10px] uppercase tracking-wider text-slate-400">
            Trademarks property of their respective owners. Halliard is independent and unaffiliated.
          </p>
        </div>
      </Container>
    </section>
  )
}

// =============================================================================
// PROOF QUOTE
// =============================================================================
function ProofQuote() {
  return (
    <section className="bg-white py-16 sm:py-20">
      <Container className="">
        <div className="mx-auto max-w-3xl">
          <div className="rounded-2xl border border-tint bg-slate-50 px-6 py-10 sm:px-12 sm:py-14 shadow-sm">
            <svg
              className="h-10 w-10 text-primary/40"
              fill="currentColor"
              viewBox="0 0 32 32"
              aria-hidden="true"
            >
              <path d="M9.352 4C4.456 7.456 1 13.12 1 19.36c0 5.088 3.072 8.064 6.624 8.064 3.36 0 5.856-2.688 5.856-5.856 0-3.168-2.208-5.472-5.088-5.472-.576 0-1.344.096-1.536.192.48-3.264 3.552-7.104 6.624-9.024L9.352 4zm16.512 0c-4.8 3.456-8.256 9.12-8.256 15.36 0 5.088 3.072 8.064 6.624 8.064 3.264 0 5.856-2.688 5.856-5.856 0-3.168-2.304-5.472-5.184-5.472-.576 0-1.248.096-1.44.192.48-3.264 3.456-7.104 6.528-9.024L25.864 4z" />
            </svg>
            <p className="mt-6 font-display text-2xl font-medium text-slate-900 sm:text-3xl leading-snug">
              &ldquo;We had a client paying a holdco DSP almost a fifth of every dollar in fees.
              Halliard built an agent that bought the same plan across the open exchange and
              put $180,000 a year back into working media for that one account. We&rsquo;ve
              moved three more clients onto it since.&rdquo;
            </p>
            <div className="mt-8 flex items-center gap-4">
              <div className="h-12 w-12 flex-none rounded-full bg-primary/10 flex items-center justify-center text-primary text-sm font-bold tracking-wide">
                CMO
              </div>
              <div>
                <p className="text-sm font-semibold text-slate-900">VP Media, independent agency</p>
                <p className="text-sm text-slate-500">Mid-market shop, $40M client billings</p>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  )
}

// =============================================================================
// ENQUIRY FORM
// =============================================================================
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

    if (String(data.get('website') || '')) {
      setStatus('success')
      return
    }

    try {
      const res = await fetch('/api/lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })
      if (!res.ok) throw new Error(`Status ${res.status}`)
      fireEnquirySubmitted(payload)
      setStatus('success')
      form.reset()
    } catch (err: any) {
      console.error('Enquiry submission failed', err)
      setStatus('error')
      setErrorMsg(
        'Something went wrong. Please email matthew@halliardmedia.com directly.',
      )
    }
  }

  return (
    <section id="enquire" className="bg-slate-50 py-20 scroll-mt-20">
      <Container className="">
        <div className="mx-auto max-w-2xl">
          <div className="text-center">
            <h2 className="font-display text-3xl font-medium tracking-tight text-slate-900 sm:text-4xl">
              Join the 2026 pilot cohort
            </h2>
            <p className="mt-4 text-lg text-slate-700">
              We&rsquo;re onboarding a small cohort of independent agencies through the back
              half of 2026. Tell us about your shop and the agentic problem on your desk
              right now. Halliard replies within twenty-four hours.
            </p>
          </div>

          {status === 'success' ? (
            <div className="mt-10 rounded-xl border border-tint bg-white p-8 text-center shadow-sm">
              <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary text-2xl">
                ✓
              </div>
              <h3 className="font-display text-xl font-medium text-slate-900">
                Got it. We&rsquo;ll reply within 24 hours.
              </h3>
              <p className="mt-2 text-sm text-slate-600">
                If it&rsquo;s urgent, email <a className="text-primary underline" href="mailto:matthew@halliardmedia.com">matthew@halliardmedia.com</a>.
              </p>
              <p className="mt-4 text-sm text-slate-600">
                While you wait: <a className="text-primary underline" href="/manifesto/the-independents-agent">read the manifesto</a> &mdash; the worldview behind what we&rsquo;re building.
              </p>
            </div>
          ) : (
            <form
              onSubmit={handleSubmit}
              className="mt-10 rounded-xl border border-tint bg-white p-6 sm:p-8 shadow-sm space-y-5"
            >
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
                  placeholder="One line is fine. e.g. 'we want to offer our clients their own buying agent' or 'we want to move buying off TTD'"
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
          Join the 2026 pilot cohort →
        </button>
      </div>
    </div>
  )
}

function AgenticPage() {
  useEffect(() => {
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
        <title>Your Agency&apos;s Own Buying Agent | Halliard</title>
        <meta
          name="description"
          content="Every independent agency needs its own buying agent. Trained on your playbook. Buying on the open market on your client's behalf. Human-in-the-loop on every flight."
        />
        <meta name="robots" content="noindex,follow" />
        <meta property="og:title" content="Your agency's own buying agent | Halliard" />
        <meta
          property="og:description"
          content="Not a DSP's agent. Not a holdco's agent. Your agency's agent. Trained on your playbook. Open-market buying. Human-in-the-loop on every flight."
        />
      </Head>
      <MinimalHeader />
      <main className="pb-24 lg:pb-0">
        <Hero />
        <ManifestoQuoteBand />
        <KnowsYourAgencySection />
        <DspTaxSection />
        <HowItWorksSection />
        <ExchangesSection />
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
