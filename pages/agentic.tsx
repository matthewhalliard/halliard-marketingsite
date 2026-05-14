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

// =============================================================================
// On-brand SVG diagrams. All use Halliard palette:
//   primary navy   #263285 (Tailwind: primary)
//   secondary blue #1a6ab4
//   tint           #d3e4ff
//   slate-900      #0f172a
//   slate-700      #334155
//   slate-300      #cbd5e1
//   red accent     #dc2626 (only for "biased" / problem-state)
// =============================================================================

function BiasDiagram() {
  // Shows: Holdco DSPs route money INTO their own inventory (red arrows)
  // vs. Halliard agent routes money into the OPEN exchange (blue arrows).
  return (
    <svg
      viewBox="0 0 800 460"
      className="w-full h-auto"
      role="img"
      aria-label="Holdco DSPs route media spend into their own inventory. A Halliard buyer agent routes spend across the open exchange."
    >
      <defs>
        <marker id="arrow-red" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto">
          <path d="M 0 0 L 10 5 L 0 10 z" fill="#dc2626" />
        </marker>
        <marker id="arrow-blue" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto">
          <path d="M 0 0 L 10 5 L 0 10 z" fill="#1a6ab4" />
        </marker>
      </defs>

      {/* Left column: BIASED */}
      <text x="200" y="34" textAnchor="middle" fontFamily="Inter, system-ui" fontSize="15" fontWeight="700" fill="#dc2626" letterSpacing="1.5">
        BIASED STACK
      </text>
      <text x="200" y="56" textAnchor="middle" fontFamily="Inter, system-ui" fontSize="13" fill="#64748b">
        TTD / Amazon DSP / Google DV360
      </text>

      {/* Agency box (biased) */}
      <rect x="100" y="86" width="200" height="58" rx="10" fill="#ffffff" stroke="#cbd5e1" strokeWidth="1.5" />
      <text x="200" y="112" textAnchor="middle" fontFamily="Inter, system-ui" fontSize="15" fontWeight="600" fill="#0f172a">Your agency</text>
      <text x="200" y="131" textAnchor="middle" fontFamily="Inter, system-ui" fontSize="12" fill="#64748b">$ media budget</text>

      {/* Holdco DSP box */}
      <rect x="100" y="182" width="200" height="58" rx="10" fill="#fef2f2" stroke="#fca5a5" strokeWidth="1.5" />
      <text x="200" y="208" textAnchor="middle" fontFamily="Inter, system-ui" fontSize="15" fontWeight="600" fill="#7f1d1d">Holdco DSP</text>
      <text x="200" y="227" textAnchor="middle" fontFamily="Inter, system-ui" fontSize="11" fill="#b91c1c">Takes 15-25% + recommends own inventory</text>

      {/* Owned inventory boxes */}
      <rect x="60" y="310" width="95" height="44" rx="8" fill="#ffffff" stroke="#fca5a5" strokeWidth="1.5" />
      <text x="107" y="330" textAnchor="middle" fontFamily="Inter, system-ui" fontSize="12" fontWeight="600" fill="#7f1d1d">Owned</text>
      <text x="107" y="345" textAnchor="middle" fontFamily="Inter, system-ui" fontSize="10" fill="#b91c1c">inventory A</text>

      <rect x="165" y="310" width="95" height="44" rx="8" fill="#ffffff" stroke="#fca5a5" strokeWidth="1.5" />
      <text x="212" y="330" textAnchor="middle" fontFamily="Inter, system-ui" fontSize="12" fontWeight="600" fill="#7f1d1d">Owned</text>
      <text x="212" y="345" textAnchor="middle" fontFamily="Inter, system-ui" fontSize="10" fill="#b91c1c">inventory B</text>

      <rect x="245" y="310" width="55" height="44" rx="8" fill="#ffffff" stroke="#e2e8f0" strokeWidth="1.5" strokeDasharray="4 3" />
      <text x="272" y="330" textAnchor="middle" fontFamily="Inter, system-ui" fontSize="11" fontWeight="600" fill="#94a3b8">Other</text>
      <text x="272" y="345" textAnchor="middle" fontFamily="Inter, system-ui" fontSize="9" fill="#94a3b8">inventory</text>

      {/* Arrows agency → DSP */}
      <line x1="200" y1="144" x2="200" y2="177" stroke="#dc2626" strokeWidth="2.5" markerEnd="url(#arrow-red)" />
      <text x="265" y="165" fontFamily="Inter, system-ui" fontSize="11" fontWeight="600" fill="#7f1d1d">$1.00</text>

      {/* Arrows DSP → inventory (thick to owned, thin to other) */}
      <line x1="170" y1="242" x2="125" y2="305" stroke="#dc2626" strokeWidth="4" markerEnd="url(#arrow-red)" />
      <line x1="200" y1="242" x2="205" y2="305" stroke="#dc2626" strokeWidth="4" markerEnd="url(#arrow-red)" />
      <line x1="230" y1="242" x2="265" y2="305" stroke="#fca5a5" strokeWidth="1.5" markerEnd="url(#arrow-red)" strokeDasharray="3 2" />

      {/* Footer cost */}
      <rect x="100" y="388" width="200" height="40" rx="6" fill="#fef2f2" stroke="#fca5a5" />
      <text x="200" y="413" textAnchor="middle" fontFamily="Inter, system-ui" fontSize="13" fontWeight="600" fill="#7f1d1d">Your client pays for the bias.</text>

      {/* Divider */}
      <line x1="400" y1="30" x2="400" y2="430" stroke="#e2e8f0" strokeWidth="1" strokeDasharray="4 4" />

      {/* Right column: HALLIARD */}
      <text x="600" y="34" textAnchor="middle" fontFamily="Inter, system-ui" fontSize="15" fontWeight="700" fill="#263285" letterSpacing="1.5">
        UNBIASED STACK
      </text>
      <text x="600" y="56" textAnchor="middle" fontFamily="Inter, system-ui" fontSize="13" fill="#64748b">
        Halliard buyer agent
      </text>

      {/* Agency box */}
      <rect x="500" y="86" width="200" height="58" rx="10" fill="#ffffff" stroke="#cbd5e1" strokeWidth="1.5" />
      <text x="600" y="112" textAnchor="middle" fontFamily="Inter, system-ui" fontSize="15" fontWeight="600" fill="#0f172a">Your agency</text>
      <text x="600" y="131" textAnchor="middle" fontFamily="Inter, system-ui" fontSize="12" fill="#64748b">$ media budget</text>

      {/* Halliard agent */}
      <rect x="500" y="182" width="200" height="58" rx="10" fill="#d3e4ff" stroke="#263285" strokeWidth="1.5" />
      <text x="600" y="208" textAnchor="middle" fontFamily="Inter, system-ui" fontSize="15" fontWeight="600" fill="#263285">Halliard agent</text>
      <text x="600" y="227" textAnchor="middle" fontFamily="Inter, system-ui" fontSize="11" fill="#1a6ab4">Take rate. Buys to your principles.</text>

      {/* Open exchange boxes — even distribution */}
      <rect x="450" y="310" width="66" height="44" rx="8" fill="#ffffff" stroke="#1a6ab4" strokeWidth="1.5" />
      <text x="483" y="330" textAnchor="middle" fontFamily="Inter, system-ui" fontSize="11" fontWeight="600" fill="#263285">CTV</text>
      <text x="483" y="344" textAnchor="middle" fontFamily="Inter, system-ui" fontSize="9" fill="#1a6ab4">SSP</text>

      <rect x="522" y="310" width="66" height="44" rx="8" fill="#ffffff" stroke="#1a6ab4" strokeWidth="1.5" />
      <text x="555" y="330" textAnchor="middle" fontFamily="Inter, system-ui" fontSize="11" fontWeight="600" fill="#263285">OLV</text>
      <text x="555" y="344" textAnchor="middle" fontFamily="Inter, system-ui" fontSize="9" fill="#1a6ab4">SSP</text>

      <rect x="594" y="310" width="66" height="44" rx="8" fill="#ffffff" stroke="#1a6ab4" strokeWidth="1.5" />
      <text x="627" y="330" textAnchor="middle" fontFamily="Inter, system-ui" fontSize="11" fontWeight="600" fill="#263285">Audio</text>
      <text x="627" y="344" textAnchor="middle" fontFamily="Inter, system-ui" fontSize="9" fill="#1a6ab4">SSP</text>

      <rect x="666" y="310" width="66" height="44" rx="8" fill="#ffffff" stroke="#1a6ab4" strokeWidth="1.5" />
      <text x="699" y="330" textAnchor="middle" fontFamily="Inter, system-ui" fontSize="11" fontWeight="600" fill="#263285">OOH</text>
      <text x="699" y="344" textAnchor="middle" fontFamily="Inter, system-ui" fontSize="9" fill="#1a6ab4">SSP</text>

      {/* Arrows agency → agent */}
      <line x1="600" y1="144" x2="600" y2="177" stroke="#1a6ab4" strokeWidth="2.5" markerEnd="url(#arrow-blue)" />
      <text x="665" y="165" fontFamily="Inter, system-ui" fontSize="11" fontWeight="600" fill="#263285">$1.00</text>

      {/* Arrows agent → exchange (even) */}
      <line x1="540" y1="242" x2="495" y2="305" stroke="#1a6ab4" strokeWidth="2" markerEnd="url(#arrow-blue)" />
      <line x1="580" y1="242" x2="560" y2="305" stroke="#1a6ab4" strokeWidth="2" markerEnd="url(#arrow-blue)" />
      <line x1="620" y1="242" x2="630" y2="305" stroke="#1a6ab4" strokeWidth="2" markerEnd="url(#arrow-blue)" />
      <line x1="660" y1="242" x2="700" y2="305" stroke="#1a6ab4" strokeWidth="2" markerEnd="url(#arrow-blue)" />

      {/* Footer */}
      <rect x="500" y="388" width="200" height="40" rx="6" fill="#d3e4ff" stroke="#263285" />
      <text x="600" y="413" textAnchor="middle" fontFamily="Inter, system-ui" fontSize="13" fontWeight="600" fill="#263285">Every $1 buys where the plan says.</text>
    </svg>
  )
}

function WhatIsItSection() {
  return (
    <section className="bg-white py-16 sm:py-20 border-b border-tint">
      <Container className="">
        <div className="mx-auto max-w-5xl">
          <div className="text-center">
            <h2 className="font-display text-3xl font-medium tracking-tight text-slate-900 sm:text-4xl">
              DSPs recommend their own inventory.<br />
              <span className="text-primary">Your agent shouldn&rsquo;t.</span>
            </h2>
            <p className="mx-auto mt-6 max-w-2xl text-lg text-slate-700 leading-relaxed">
              Trade Desk, Amazon, Google &mdash; every holdco-grade buyer is recommending the
              inventory it makes the most fee on. A Halliard buyer agent works for your agency,
              not for the exchange.
            </p>
          </div>
          <div className="mt-12 rounded-2xl border border-tint bg-slate-50 p-6 sm:p-10 shadow-sm">
            <BiasDiagram />
          </div>
        </div>
      </Container>
    </section>
  )
}

// -----------------------------------------------------------------------------
// Agent anatomy diagram — what a Halliard buyer agent IS.
// Inputs: brand safety, audience strategy, channel mix, frequency caps,
// historical performance → agent reasoning → execution on PubMatic/ADCP.
// -----------------------------------------------------------------------------
function AgentAnatomyDiagram() {
  return (
    <svg
      viewBox="0 0 900 460"
      className="w-full h-auto"
      role="img"
      aria-label="A Halliard buyer agent takes your agency's principles as inputs, reasons about every impression, and executes buys via PubMatic and ADCP."
    >
      <defs>
        <marker id="agent-arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto">
          <path d="M 0 0 L 10 5 L 0 10 z" fill="#1a6ab4" />
        </marker>
      </defs>

      {/* LEFT — principles (5 stacked cards) */}
      <text x="110" y="34" textAnchor="middle" fontFamily="Inter, system-ui" fontSize="13" fontWeight="700" fill="#475569" letterSpacing="1.5">
        YOUR PRINCIPLES
      </text>

      {[
        { y: 60, label: 'Brand safety', sub: 'allow / block lists' },
        { y: 132, label: 'Audience strategy', sub: 'priority segments, look-alikes' },
        { y: 204, label: 'Channel mix', sub: 'CTV 40% / OLV 25% / Audio 20%…' },
        { y: 276, label: 'Frequency caps', sub: 'per-user / per-flight' },
        { y: 348, label: 'Performance history', sub: 'past response curves' },
      ].map((p, i) => (
        <g key={i}>
          <rect x="20" y={p.y} width="200" height="58" rx="10" fill="#ffffff" stroke="#cbd5e1" strokeWidth="1.5" />
          <rect x="20" y={p.y} width="5" height="58" rx="2" fill="#1a6ab4" />
          <text x="38" y={p.y + 25} fontFamily="Inter, system-ui" fontSize="14" fontWeight="600" fill="#0f172a">{p.label}</text>
          <text x="38" y={p.y + 45} fontFamily="Inter, system-ui" fontSize="11" fill="#64748b">{p.sub}</text>
          {/* connector */}
          <line x1="220" y1={p.y + 29} x2="350" y2="230" stroke="#cbd5e1" strokeWidth="1.5" />
        </g>
      ))}

      {/* CENTER — the agent */}
      <text x="450" y="34" textAnchor="middle" fontFamily="Inter, system-ui" fontSize="13" fontWeight="700" fill="#263285" letterSpacing="1.5">
        HALLIARD BUYER AGENT
      </text>

      <rect x="350" y="168" width="200" height="124" rx="16" fill="#263285" />
      <rect x="350" y="168" width="200" height="124" rx="16" fill="#1a6ab4" opacity="0.18" />
      <text x="450" y="203" textAnchor="middle" fontFamily="Inter, system-ui" fontSize="15" fontWeight="700" fill="#ffffff">Reason</text>
      <text x="450" y="229" textAnchor="middle" fontFamily="Inter, system-ui" fontSize="15" fontWeight="700" fill="#ffffff">Bid</text>
      <text x="450" y="255" textAnchor="middle" fontFamily="Inter, system-ui" fontSize="15" fontWeight="700" fill="#ffffff">Buy</text>
      <text x="450" y="281" textAnchor="middle" fontFamily="Inter, system-ui" fontSize="11" fill="#d3e4ff">every impression, every second</text>

      {/* Big arrow into agent */}
      <line x1="320" y1="230" x2="345" y2="230" stroke="#1a6ab4" strokeWidth="3" markerEnd="url(#agent-arrow)" />

      {/* Big arrow out of agent */}
      <line x1="552" y1="230" x2="672" y2="230" stroke="#1a6ab4" strokeWidth="3" markerEnd="url(#agent-arrow)" />

      {/* RIGHT — exchange */}
      <text x="790" y="34" textAnchor="middle" fontFamily="Inter, system-ui" fontSize="13" fontWeight="700" fill="#475569" letterSpacing="1.5">
        OPEN EXCHANGE
      </text>

      <rect x="680" y="60" width="220" height="340" rx="14" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="1.5" />

      <text x="790" y="90" textAnchor="middle" fontFamily="Inter, system-ui" fontSize="13" fontWeight="600" fill="#1a6ab4">via PubMatic / ADCP</text>
      <line x1="700" y1="105" x2="880" y2="105" stroke="#e2e8f0" strokeWidth="1" />

      {[
        { y: 122, label: 'CTV inventory' },
        { y: 158, label: 'Online video' },
        { y: 194, label: 'Digital audio' },
        { y: 230, label: 'Social' },
        { y: 266, label: 'Display' },
        { y: 302, label: 'OOH / DOOH' },
        { y: 338, label: 'Direct deals' },
      ].map((row, i) => (
        <g key={i}>
          <circle cx="702" cy={row.y + 8} r="4" fill="#1a6ab4" />
          <text x="716" y={row.y + 13} fontFamily="Inter, system-ui" fontSize="13" fill="#0f172a">{row.label}</text>
        </g>
      ))}

      {/* Footer label */}
      <text x="450" y="420" textAnchor="middle" fontFamily="Inter, system-ui" fontSize="13" fill="#64748b">
        Every buy auditable, every reasoning logged. You stay in control.
      </text>
    </svg>
  )
}

// -----------------------------------------------------------------------------
// Plan → Buy → Measure loop diagram. A flywheel with feedback arrows.
// -----------------------------------------------------------------------------
function LoopDiagram() {
  return (
    <svg
      viewBox="0 0 800 400"
      className="w-full h-auto"
      role="img"
      aria-label="Plan to Buy to Measure flywheel: planning informs the buyer agent, buying produces outcomes, measurement feeds back into the next plan."
    >
      <defs>
        <marker id="loop-arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="8" markerHeight="8" orient="auto">
          <path d="M 0 0 L 10 5 L 0 10 z" fill="#263285" />
        </marker>
      </defs>

      {/* PLAN node */}
      <g>
        <rect x="60" y="140" width="180" height="120" rx="14" fill="#d3e4ff" stroke="#263285" strokeWidth="1.5" />
        <text x="150" y="170" textAnchor="middle" fontFamily="Inter, system-ui" fontSize="12" fontWeight="700" fill="#263285" letterSpacing="1.5">1 · PLAN</text>
        <text x="150" y="196" textAnchor="middle" fontFamily="Inter, system-ui" fontSize="15" fontWeight="600" fill="#0f172a">Intelligence layer</text>
        <text x="150" y="218" textAnchor="middle" fontFamily="Inter, system-ui" fontSize="11" fill="#1a6ab4">channel mix · reach</text>
        <text x="150" y="233" textAnchor="middle" fontFamily="Inter, system-ui" fontSize="11" fill="#1a6ab4">response curves</text>
        <text x="150" y="248" textAnchor="middle" fontFamily="Inter, system-ui" fontSize="11" fill="#1a6ab4">scenario versions</text>
      </g>

      {/* BUY node */}
      <g>
        <rect x="310" y="140" width="180" height="120" rx="14" fill="#263285" />
        <text x="400" y="170" textAnchor="middle" fontFamily="Inter, system-ui" fontSize="12" fontWeight="700" fill="#d3e4ff" letterSpacing="1.5">2 · BUY</text>
        <text x="400" y="196" textAnchor="middle" fontFamily="Inter, system-ui" fontSize="15" fontWeight="600" fill="#ffffff">Your agent</text>
        <text x="400" y="218" textAnchor="middle" fontFamily="Inter, system-ui" fontSize="11" fill="#d3e4ff">your principles</text>
        <text x="400" y="233" textAnchor="middle" fontFamily="Inter, system-ui" fontSize="11" fill="#d3e4ff">PubMatic / ADCP</text>
        <text x="400" y="248" textAnchor="middle" fontFamily="Inter, system-ui" fontSize="11" fill="#d3e4ff">take-rate pricing</text>
      </g>

      {/* MEASURE node */}
      <g>
        <rect x="560" y="140" width="180" height="120" rx="14" fill="#d3e4ff" stroke="#263285" strokeWidth="1.5" />
        <text x="650" y="170" textAnchor="middle" fontFamily="Inter, system-ui" fontSize="12" fontWeight="700" fill="#263285" letterSpacing="1.5">3 · MEASURE</text>
        <text x="650" y="196" textAnchor="middle" fontFamily="Inter, system-ui" fontSize="15" fontWeight="600" fill="#0f172a">Feedback loop</text>
        <text x="650" y="218" textAnchor="middle" fontFamily="Inter, system-ui" fontSize="11" fill="#1a6ab4">MMM · incrementality</text>
        <text x="650" y="233" textAnchor="middle" fontFamily="Inter, system-ui" fontSize="11" fill="#1a6ab4">brand studies</text>
        <text x="650" y="248" textAnchor="middle" fontFamily="Inter, system-ui" fontSize="11" fill="#1a6ab4">attribution</text>
      </g>

      {/* Forward arrows */}
      <line x1="240" y1="200" x2="305" y2="200" stroke="#263285" strokeWidth="2.5" markerEnd="url(#loop-arrow)" />
      <line x1="490" y1="200" x2="555" y2="200" stroke="#263285" strokeWidth="2.5" markerEnd="url(#loop-arrow)" />

      {/* Feedback arc — measure back to plan */}
      <path d="M 650 260 Q 650 340 400 340 Q 150 340 150 260" fill="none" stroke="#263285" strokeWidth="2.5" markerEnd="url(#loop-arrow)" />
      <text x="400" y="363" textAnchor="middle" fontFamily="Inter, system-ui" fontSize="12" fontWeight="600" fill="#263285">feeds the next plan</text>

      {/* Top labels for forward arrows */}
      <text x="272" y="190" textAnchor="middle" fontFamily="Inter, system-ui" fontSize="10" fontWeight="600" fill="#1a6ab4">approved plan</text>
      <text x="522" y="190" textAnchor="middle" fontFamily="Inter, system-ui" fontSize="10" fontWeight="600" fill="#1a6ab4">delivery + spend</text>

      {/* Header */}
      <text x="400" y="50" textAnchor="middle" fontFamily="Inter, system-ui" fontSize="22" fontWeight="700" fill="#0f172a">One unbiased system</text>
      <text x="400" y="78" textAnchor="middle" fontFamily="Inter, system-ui" fontSize="14" fill="#64748b">Plan, buy, and measure all feed each other &mdash; with no vendor in the middle taking a cut on bias.</text>
    </svg>
  )
}

function DiagramsSection() {
  return (
    <section className="bg-white py-20">
      <Container className="">
        <div className="mx-auto max-w-6xl">
          {/* Agent anatomy */}
          <div className="text-center">
            <p className="inline-flex items-center gap-2 rounded-full bg-tint px-3 py-1 text-xs font-semibold uppercase tracking-wider text-primary">
              How it works
            </p>
            <h2 className="mt-4 font-display text-3xl font-medium tracking-tight text-slate-900 sm:text-4xl">
              Your agency&rsquo;s principles.<br />
              Your agent&rsquo;s job.
            </h2>
            <p className="mx-auto mt-5 max-w-2xl text-lg text-slate-700">
              The agent takes your senior buyers&rsquo; rules as inputs &mdash; brand safety, audience
              strategy, channel mix, frequency caps, performance history &mdash; and executes
              every impression accordingly via PubMatic / ADCP.
            </p>
          </div>
          <div className="mt-10 rounded-2xl border border-tint bg-slate-50 p-6 sm:p-10 shadow-sm">
            <AgentAnatomyDiagram />
          </div>

          {/* Plan / Buy / Measure loop */}
          <div className="mt-24 text-center">
            <h2 className="font-display text-3xl font-medium tracking-tight text-slate-900 sm:text-4xl">
              Plan, Buy, Measure &mdash; one loop, one vendor.
            </h2>
            <p className="mx-auto mt-5 max-w-2xl text-lg text-slate-700">
              Most agencies stitch together a planner, a DSP, an MMM vendor, and a brand-study
              firm. Halliard ships them as one closed loop &mdash; so what you learn in measurement
              actually shows up in next quarter&rsquo;s plan.
            </p>
          </div>
          <div className="mt-10 rounded-2xl border border-tint bg-slate-50 p-6 sm:p-10 shadow-sm">
            <LoopDiagram />
          </div>
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
        <DiagramsSection />
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
