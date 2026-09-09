import Head from 'next/head'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { Container } from '../components/mmm/Container'
import { Button } from '../components/mmm/Button'
import { trackCta } from '../lib/track'
import { trackPixel } from '@/lib/meta-pixel'

// =============================================================================
// /execution — Halliard 3.0 landing page.
//
// Audience: independent-agency owners, founders, media directors, VPs of media
// at 2-50 person shops. The pitch is: we run your media on your seats, 7% of
// spend, no AOR, you approve the plan and see every decision.
//
// Funnel: brief form on the page → /api/lead → Formspark → Matthew replies
// with a plan within 48 hours. Secondary CTA: book a 20-min call via the
// existing Google Calendar appointment link.
//
// Style: Halliard house style (Lexend + Inter + primary navy + tint), matches
// pages/index.jsx. Full site nav preserved (not the minimal-header treatment
// used by /agentic and /demo).
//
// Custom inline SVGs throughout — no product screenshots, no stock icons for
// the six service cards.
// =============================================================================

const CALENDAR_URL =
  'https://calendar.google.com/calendar/appointments/schedules/AcZssZ1jtM9RZtwp5-TuTTBbXg9Wkc9VEV1dLDUpVS-ajVsNJOoJSBGQDyd7hZ-S_x7mVHGYpZTRPHW2?gv=true'

const PLUS_PATTERN =
  "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%231a6ab4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")"

const UTM_KEYS = [
  'utm_source',
  'utm_medium',
  'utm_campaign',
  'utm_content',
  'utm_term',
  'gclid',
  'fbclid',
  'li_fat_id',
]

// ---------- helpers ----------

function setCookie(name: string, value: string, days = 30) {
  if (typeof document === 'undefined') return
  const expires = new Date(Date.now() + days * 864e5).toUTCString()
  document.cookie = `${name}=${encodeURIComponent(value)}; expires=${expires}; path=/; SameSite=Lax`
}

function getCookie(name: string): string {
  if (typeof document === 'undefined') return ''
  const match = document.cookie
    .split('; ')
    .find((row) => row.startsWith(`${name}=`))
  return match ? decodeURIComponent(match.split('=')[1] || '') : ''
}

function persistUtms() {
  if (typeof window === 'undefined') return
  const params = new URLSearchParams(window.location.search)
  UTM_KEYS.forEach((k) => {
    const v = params.get(k)
    if (v) setCookie(`hal_${k}`, v)
  })
}

function readUtms(): Record<string, string> {
  const out: Record<string, string> = {}
  UTM_KEYS.forEach((k) => {
    const v = getCookie(`hal_${k}`)
    if (v) out[k] = v
  })
  return out
}

function scrollToId(id: string) {
  if (typeof window === 'undefined') return
  const el = document.getElementById(id)
  if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
}

function fireBriefIntent(location: string) {
  try {
    trackCta('execution_brief_intent_click', location)
    const w = window as any
    if (w?.posthog?.capture) {
      w.posthog.capture('execution_brief_intent_click', {
        location,
        page: '/execution',
      })
    }
    trackPixel('Lead', {
      content_name: 'execution_brief_intent_click',
      source: 'execution_lp',
      location,
    })
  } catch {
    // never break the page
  }
}

function fireBookCall(location: string) {
  try {
    trackCta('execution_book_call_click', location)
    const w = window as any
    if (w?.posthog?.capture) {
      w.posthog.capture('execution_book_call_click', {
        location,
        page: '/execution',
      })
    }
    if (w?.gtag) {
      w.gtag('event', 'conversion', {
        send_to: 'AW-672346912/qEmHCJ6L_pgcEKDmzMAC',
      })
    }
    trackPixel('Lead', {
      content_name: 'execution_book_call_click',
      source: 'execution_lp',
      location,
    })
  } catch {
    // swallow
  }
}

function fireBriefSubmitted(payload: Record<string, unknown>) {
  try {
    const w = window as any
    if (w?.posthog?.capture) {
      w.posthog.capture('execution_brief_submitted', {
        page: '/execution',
        agency: payload.agency,
        budget: payload.budget,
        channels: payload.channels,
      })
    }
    if (w?.gtag) {
      w.gtag('event', 'conversion', {
        send_to: 'AW-672346912/qEmHCJ6L_pgcEKDmzMAC',
      })
    }
    trackPixel('Lead', {
      content_name: 'execution_brief_submitted',
      source: 'execution_lp',
    })
  } catch {
    // swallow
  }
}

// ---------- header ----------

function SiteHeader() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/85 backdrop-blur-sm border-b border-tint">
      <Container className="">
        <nav className="relative flex justify-between items-center py-4">
          <Link href="/" aria-label="Home" className="flex items-center">
            <img
              src="https://framerusercontent.com/images/s97qQgHpRGf1STgb6vDMgqYNU4.png?scale-down-to=512"
              alt="Halliard"
              className="h-8 w-auto"
            />
          </Link>
          <div className="hidden sm:flex items-center gap-x-8 text-sm text-slate-700">
            <Link href="/pricing" className="hover:text-primary transition-colors">
              Pricing
            </Link>
            <Link href="/agentic" className="hover:text-primary transition-colors">
              Agent
            </Link>
            <Link
              href="/manifesto/the-independents-agent"
              className="hover:text-primary transition-colors"
            >
              Manifesto
            </Link>
          </div>
          <div className="flex items-center gap-x-3">
            <a
              href="#brief"
              onClick={(e) => {
                e.preventDefault()
                fireBriefIntent('header')
                scrollToId('brief')
              }}
              className="hidden sm:inline text-sm text-primary font-medium hover:underline"
            >
              Send a brief
            </a>
            <Button
              href={CALENDAR_URL}
              color="blue"
              className=""
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => fireBookCall('header')}
            >
              Book a call
            </Button>
          </div>
        </nav>
      </Container>
    </header>
  )
}

// ---------- SVGs (custom, house tokens) ----------

// #1 — Hero flow: Brief → Plan → Live
function HeroFlowSvg() {
  return (
    <svg
      viewBox="0 0 800 420"
      className="w-full h-auto"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="Brief in, plan produced, campaign live"
    >
      <defs>
        <linearGradient id="planGrid" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="rgb(211,228,255)" stopOpacity="0.6" />
          <stop offset="1" stopColor="rgb(211,228,255)" stopOpacity="0.15" />
        </linearGradient>
      </defs>

      {/* subtle background frame */}
      <rect
        x="12"
        y="12"
        width="776"
        height="396"
        rx="18"
        fill="white"
        stroke="rgb(211,228,255)"
        strokeWidth="1.5"
      />

      {/* STAGE 1: BRIEF */}
      <g transform="translate(60,90)">
        <rect
          x="0"
          y="0"
          width="150"
          height="200"
          rx="10"
          fill="white"
          stroke="rgb(38,50,133)"
          strokeWidth="1.8"
        />
        <rect
          x="18"
          y="24"
          width="90"
          height="8"
          rx="2"
          fill="rgb(38,50,133)"
          opacity="0.85"
        />
        <rect
          x="18"
          y="44"
          width="114"
          height="4"
          rx="2"
          fill="rgb(38,50,133)"
          opacity="0.25"
        />
        <rect
          x="18"
          y="56"
          width="100"
          height="4"
          rx="2"
          fill="rgb(38,50,133)"
          opacity="0.25"
        />
        <rect
          x="18"
          y="68"
          width="114"
          height="4"
          rx="2"
          fill="rgb(38,50,133)"
          opacity="0.25"
        />
        <rect
          x="18"
          y="80"
          width="74"
          height="4"
          rx="2"
          fill="rgb(38,50,133)"
          opacity="0.25"
        />
        <rect
          x="18"
          y="106"
          width="60"
          height="6"
          rx="2"
          fill="rgb(26,106,180)"
          opacity="0.7"
        />
        <rect
          x="18"
          y="124"
          width="114"
          height="4"
          rx="2"
          fill="rgb(38,50,133)"
          opacity="0.25"
        />
        <rect
          x="18"
          y="136"
          width="90"
          height="4"
          rx="2"
          fill="rgb(38,50,133)"
          opacity="0.25"
        />
        <rect
          x="18"
          y="148"
          width="114"
          height="4"
          rx="2"
          fill="rgb(38,50,133)"
          opacity="0.25"
        />
        <text
          x="75"
          y="188"
          textAnchor="middle"
          fill="rgb(38,50,133)"
          fontSize="11"
          fontWeight="600"
          fontFamily="Inter, sans-serif"
        >
          BRIEF
        </text>
      </g>

      {/* arrow 1 → */}
      <g stroke="rgb(38,50,133)" strokeWidth="1.8" fill="none">
        <line
          x1="222"
          y1="190"
          x2="292"
          y2="190"
          strokeLinecap="round"
        />
        <polyline
          points="284,182 292,190 284,198"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>

      {/* STAGE 2: PLAN GRID */}
      <g transform="translate(305,80)">
        <rect
          x="0"
          y="0"
          width="200"
          height="220"
          rx="10"
          fill="white"
          stroke="rgb(38,50,133)"
          strokeWidth="1.8"
        />
        <rect x="1" y="1" width="198" height="30" rx="10" fill="url(#planGrid)" />
        {/* channel rows */}
        {[
          ['Meta', 50],
          ['Google', 80],
          ['CTV', 110],
          ['YouTube', 140],
          ['Display', 170],
        ].map(([label, y]) => (
          <g key={String(label)}>
            <text
              x="14"
              y={(y as number) + 4}
              fill="rgb(38,50,133)"
              fontSize="10"
              fontWeight="500"
              fontFamily="Inter, sans-serif"
            >
              {label}
            </text>
          </g>
        ))}
        {/* week columns / cells */}
        {[70, 100, 130, 160].map((x) => (
          <line
            key={x}
            x1={x}
            y1="40"
            x2={x}
            y2="200"
            stroke="rgb(211,228,255)"
            strokeWidth="1"
          />
        ))}
        {[40, 70, 100, 130, 160, 190].map((y) => (
          <line
            key={y}
            x1="65"
            y1={y}
            x2="190"
            y2={y}
            stroke="rgb(211,228,255)"
            strokeWidth="1"
          />
        ))}
        {/* filled flight cells */}
        {[
          [70, 45, 60],
          [100, 45, 40],
          [70, 75, 90],
          [100, 105, 60],
          [130, 105, 60],
          [70, 135, 120],
          [130, 165, 60],
        ].map(([x, y, w], i) => (
          <rect
            key={i}
            x={x as number}
            y={y as number}
            width={w as number}
            height="18"
            rx="2"
            fill="rgb(38,50,133)"
            opacity={0.55 + (i % 3) * 0.15}
          />
        ))}
        <text
          x="100"
          y="212"
          textAnchor="middle"
          fill="rgb(38,50,133)"
          fontSize="11"
          fontWeight="600"
          fontFamily="Inter, sans-serif"
        >
          PLAN
        </text>
      </g>

      {/* arrow 2 → */}
      <g stroke="rgb(38,50,133)" strokeWidth="1.8" fill="none">
        <line
          x1="518"
          y1="190"
          x2="588"
          y2="190"
          strokeLinecap="round"
        />
        <polyline
          points="580,182 588,190 580,198"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>

      {/* STAGE 3: LIVE CARD */}
      <g transform="translate(600,90)">
        <rect
          x="0"
          y="0"
          width="150"
          height="200"
          rx="10"
          fill="white"
          stroke="rgb(38,50,133)"
          strokeWidth="1.8"
        />
        {/* live pill */}
        <g transform="translate(18,20)">
          <rect
            x="0"
            y="0"
            width="60"
            height="20"
            rx="10"
            fill="rgb(16,185,129)"
            opacity="0.12"
          />
          <circle cx="12" cy="10" r="4" fill="rgb(16,185,129)">
            <animate
              attributeName="opacity"
              values="1;0.3;1"
              dur="1.6s"
              repeatCount="indefinite"
            />
          </circle>
          <text
            x="22"
            y="14"
            fill="rgb(6,120,80)"
            fontSize="10"
            fontWeight="700"
            fontFamily="Inter, sans-serif"
          >
            LIVE
          </text>
        </g>
        {/* metric block */}
        <text
          x="18"
          y="72"
          fill="rgb(38,50,133)"
          fontSize="22"
          fontWeight="700"
          fontFamily="Lexend, sans-serif"
        >
          $42,180
        </text>
        <text
          x="18"
          y="88"
          fill="rgb(38,50,133)"
          opacity="0.55"
          fontSize="10"
          fontFamily="Inter, sans-serif"
        >
          spent week 1
        </text>
        {/* bar chart */}
        {[
          [18, 110, 12],
          [36, 100, 22],
          [54, 88, 34],
          [72, 96, 26],
          [90, 82, 40],
          [108, 76, 46],
        ].map(([x, y, h], i) => (
          <rect
            key={i}
            x={x as number}
            y={y as number}
            width="10"
            height={h as number}
            rx="1.5"
            fill="rgb(26,106,180)"
            opacity={0.55 + i * 0.07}
          />
        ))}
        <line
          x1="18"
          y1="152"
          x2="132"
          y2="152"
          stroke="rgb(211,228,255)"
          strokeWidth="1"
        />
        <text
          x="18"
          y="168"
          fill="rgb(38,50,133)"
          opacity="0.75"
          fontSize="9"
          fontFamily="Inter, sans-serif"
        >
          Pacing 102%
        </text>
        <text
          x="75"
          y="188"
          textAnchor="middle"
          fill="rgb(38,50,133)"
          fontSize="11"
          fontWeight="600"
          fontFamily="Inter, sans-serif"
        >
          LIVE
        </text>
      </g>
    </svg>
  )
}

// #2 — Decisions log
function DecisionsLogSvg() {
  const rows = [
    {
      when: '09:14',
      what: 'Shift $2.4k from Meta prospecting → Google non-brand',
      who: 'Halliard',
      status: 'Awaiting you',
      pending: true,
    },
    {
      when: '08:02',
      what: 'Pause creative rotation V3 (CTR −38% wk/wk)',
      who: 'Halliard',
      status: 'You approved',
      pending: false,
    },
    {
      when: 'Yesterday',
      what: 'Add negative kw list (12 terms) to Search / Brand',
      who: 'Halliard',
      status: 'You approved',
      pending: false,
    },
    {
      when: 'Yesterday',
      what: 'Frequency cap Meta retargeting 3/7d → 2/7d',
      who: 'Halliard',
      status: 'You sent back',
      pending: false,
    },
  ]
  return (
    <svg
      viewBox="0 0 820 360"
      className="w-full h-auto"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="Every Halliard decision is logged and requires your approval"
    >
      <rect
        x="8"
        y="8"
        width="804"
        height="344"
        rx="14"
        fill="white"
        stroke="rgb(211,228,255)"
        strokeWidth="1.5"
      />
      {/* header bar */}
      <rect x="8" y="8" width="804" height="42" rx="14" fill="rgb(38,50,133)" />
      <rect x="8" y="36" width="804" height="14" fill="rgb(38,50,133)" />
      <text
        x="28"
        y="34"
        fill="white"
        fontSize="13"
        fontWeight="600"
        fontFamily="Inter, sans-serif"
      >
        Decisions log · A&amp;A · Q3
      </text>
      <text
        x="792"
        y="34"
        textAnchor="end"
        fill="rgb(211,228,255)"
        fontSize="11"
        fontFamily="Inter, sans-serif"
      >
        Nothing spends without you
      </text>
      {/* col headers */}
      <g fontFamily="Inter, sans-serif" fontSize="10" fill="rgb(38,50,133)" opacity="0.55">
        <text x="28" y="72">
          WHEN
        </text>
        <text x="110" y="72">
          DECISION
        </text>
        <text x="600" y="72">
          PROPOSED BY
        </text>
        <text x="720" y="72">
          STATUS
        </text>
      </g>
      <line
        x1="20"
        y1="82"
        x2="800"
        y2="82"
        stroke="rgb(211,228,255)"
        strokeWidth="1"
      />
      {rows.map((r, i) => {
        const y = 100 + i * 58
        return (
          <g key={i}>
            <text
              x="28"
              y={y}
              fill="rgb(38,50,133)"
              fontSize="11"
              opacity="0.7"
              fontFamily="Inter, sans-serif"
            >
              {r.when}
            </text>
            <text
              x="110"
              y={y}
              fill="rgb(38,50,133)"
              fontSize="12"
              fontFamily="Inter, sans-serif"
            >
              {r.what}
            </text>
            <g transform={`translate(600, ${y - 12})`}>
              <circle cx="8" cy="8" r="8" fill="rgb(38,50,133)" opacity="0.85" />
              <text
                x="8"
                y="12"
                textAnchor="middle"
                fill="white"
                fontSize="9"
                fontWeight="700"
                fontFamily="Inter, sans-serif"
              >
                H
              </text>
              <text
                x="22"
                y="12"
                fill="rgb(38,50,133)"
                fontSize="11"
                fontFamily="Inter, sans-serif"
              >
                {r.who}
              </text>
            </g>
            {r.pending ? (
              <g transform={`translate(720, ${y - 14})`}>
                <rect
                  x="0"
                  y="0"
                  width="72"
                  height="22"
                  rx="11"
                  fill="rgb(38,50,133)"
                >
                  <animate
                    attributeName="opacity"
                    values="1;0.55;1"
                    dur="1.8s"
                    repeatCount="indefinite"
                  />
                </rect>
                <text
                  x="36"
                  y="14"
                  textAnchor="middle"
                  fill="white"
                  fontSize="10"
                  fontWeight="600"
                  fontFamily="Inter, sans-serif"
                >
                  {r.status}
                </text>
              </g>
            ) : (
              <g transform={`translate(720, ${y - 14})`}>
                <rect
                  x="0"
                  y="0"
                  width="80"
                  height="22"
                  rx="11"
                  fill="white"
                  stroke="rgb(211,228,255)"
                  strokeWidth="1.2"
                />
                <text
                  x="40"
                  y="14"
                  textAnchor="middle"
                  fill="rgb(38,50,133)"
                  fontSize="10"
                  fontFamily="Inter, sans-serif"
                >
                  {r.status}
                </text>
              </g>
            )}
            {i < rows.length - 1 && (
              <line
                x1="20"
                y1={y + 24}
                x2="800"
                y2={y + 24}
                stroke="rgb(211,228,255)"
                strokeWidth="1"
              />
            )}
          </g>
        )
      })}
    </svg>
  )
}

// #3 — Your seats, your accounts
function SeatsDiagramSvg() {
  return (
    <svg
      viewBox="0 0 720 360"
      className="w-full h-auto"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="Your platforms stay in your agency. Halliard operates inside them, never owns them."
    >
      {/* Halliard agent node */}
      <g transform="translate(30,140)">
        <rect
          x="0"
          y="0"
          width="150"
          height="80"
          rx="10"
          fill="rgb(38,50,133)"
        />
        <text
          x="75"
          y="34"
          textAnchor="middle"
          fill="white"
          fontSize="14"
          fontWeight="700"
          fontFamily="Lexend, sans-serif"
        >
          Halliard
        </text>
        <text
          x="75"
          y="54"
          textAnchor="middle"
          fill="rgb(211,228,255)"
          fontSize="11"
          fontFamily="Inter, sans-serif"
        >
          buyer + trafficker
        </text>
      </g>

      {/* dotted arrow into agency */}
      <g
        stroke="rgb(38,50,133)"
        strokeWidth="1.8"
        strokeDasharray="6 5"
        fill="none"
      >
        <path
          d="M 185 180 Q 240 180 260 180"
          strokeLinecap="round"
        />
        <polyline
          points="252,172 260,180 252,188"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeDasharray="0"
        />
      </g>
      <text
        x="222"
        y="168"
        textAnchor="middle"
        fill="rgb(38,50,133)"
        fontSize="10"
        fontFamily="Inter, sans-serif"
        opacity="0.6"
      >
        operates
      </text>

      {/* Your agency container */}
      <g transform="translate(270,40)">
        <rect
          x="0"
          y="0"
          width="420"
          height="280"
          rx="14"
          fill="white"
          stroke="rgb(38,50,133)"
          strokeWidth="2"
          strokeDasharray="0"
        />
        <rect
          x="0"
          y="0"
          width="420"
          height="34"
          rx="14"
          fill="rgb(211,228,255)"
          opacity="0.5"
        />
        <rect
          x="0"
          y="20"
          width="420"
          height="14"
          fill="rgb(211,228,255)"
          opacity="0.5"
        />
        <text
          x="18"
          y="22"
          fill="rgb(38,50,133)"
          fontSize="12"
          fontWeight="700"
          fontFamily="Inter, sans-serif"
        >
          YOUR AGENCY
        </text>
        <text
          x="402"
          y="22"
          textAnchor="end"
          fill="rgb(38,50,133)"
          fontSize="10"
          fontFamily="Inter, sans-serif"
          opacity="0.7"
        >
          you own the accounts
        </text>

        {/* platform tiles */}
        {[
          ['Meta', 30, 60],
          ['Google Ads', 150, 60],
          ['DV360', 270, 60],
          ['The Trade Desk', 30, 150],
          ['YouTube', 150, 150],
          ['LinkedIn', 270, 150],
        ].map(([label, x, y]) => (
          <g key={String(label)} transform={`translate(${x}, ${y})`}>
            <rect
              x="0"
              y="0"
              width="115"
              height="70"
              rx="8"
              fill="white"
              stroke="rgb(211,228,255)"
              strokeWidth="1.5"
            />
            <circle
              cx="20"
              cy="35"
              r="10"
              fill="rgb(38,50,133)"
              opacity="0.15"
            />
            <text
              x="20"
              y="39"
              textAnchor="middle"
              fill="rgb(38,50,133)"
              fontSize="10"
              fontWeight="700"
              fontFamily="Inter, sans-serif"
            >
              {String(label).slice(0, 1)}
            </text>
            <text
              x="40"
              y="40"
              fill="rgb(38,50,133)"
              fontSize="12"
              fontFamily="Inter, sans-serif"
            >
              {label}
            </text>
          </g>
        ))}
      </g>
    </svg>
  )
}

// #6 — Reach / coverage honeycomb (horizontal hex row)
function ReachSvg() {
  const live = ['Meta', 'Google Search', 'Google Display', 'YouTube']
  const coming = ['CTV', 'OOH', 'TV', 'Radio', 'Audio']
  return (
    <svg
      viewBox="0 0 900 260"
      className="w-full h-auto"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="Channels live today and coming next"
    >
      {/* row labels */}
      <text
        x="20"
        y="55"
        fill="rgb(38,50,133)"
        fontSize="12"
        fontWeight="700"
        fontFamily="Inter, sans-serif"
      >
        LIVE TODAY
      </text>
      <text
        x="20"
        y="165"
        fill="rgb(38,50,133)"
        opacity="0.55"
        fontSize="12"
        fontWeight="700"
        fontFamily="Inter, sans-serif"
      >
        COMING NEXT
      </text>

      {live.map((label, i) => {
        const x = 150 + i * 175
        return (
          <g key={label} transform={`translate(${x}, 30)`}>
            <rect
              x="0"
              y="0"
              width="150"
              height="70"
              rx="10"
              fill="rgb(38,50,133)"
            />
            <circle cx="24" cy="35" r="6" fill="rgb(16,185,129)" />
            <text
              x="42"
              y="40"
              fill="white"
              fontSize="13"
              fontWeight="600"
              fontFamily="Inter, sans-serif"
            >
              {label}
            </text>
          </g>
        )
      })}
      {coming.map((label, i) => {
        const x = 60 + i * 165
        return (
          <g key={label} transform={`translate(${x}, 140)`}>
            <rect
              x="0"
              y="0"
              width="145"
              height="60"
              rx="10"
              fill="white"
              stroke="rgb(38,50,133)"
              strokeWidth="1.5"
              strokeDasharray="4 4"
              opacity="0.85"
            />
            <text
              x="72"
              y="35"
              textAnchor="middle"
              fill="rgb(38,50,133)"
              fontSize="13"
              fontWeight="500"
              fontFamily="Inter, sans-serif"
            >
              {label}
            </text>
          </g>
        )
      })}
    </svg>
  )
}

// ---------- Service glyphs (custom line icons) ----------

const strokeProps = {
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.8,
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
}

function GlyphPlanning() {
  return (
    <svg viewBox="0 0 48 48" aria-hidden="true" {...strokeProps}>
      <rect x="8" y="6" width="24" height="30" rx="3" />
      <path d="M13 14h14M13 20h14M13 26h10" />
      <path d="M28 34l6 6 6-8" />
    </svg>
  )
}
function GlyphBuying() {
  return (
    <svg viewBox="0 0 48 48" aria-hidden="true" {...strokeProps}>
      <rect x="6" y="14" width="36" height="24" rx="3" />
      <path d="M6 22h36" />
      <path d="M18 32c0-2 2-4 6-4s6 2 6 4" />
      <circle cx="24" cy="26" r="2" />
      <path d="M14 10l4-4 4 4" />
    </svg>
  )
}
function GlyphTrafficking() {
  return (
    <svg viewBox="0 0 48 48" aria-hidden="true" {...strokeProps}>
      <path d="M12 24a12 12 0 0 1 20-9" />
      <path d="M36 24a12 12 0 0 1-20 9" />
      <polyline points="30,12 32,15 29,17" />
      <polyline points="18,36 16,33 19,31" />
    </svg>
  )
}
function GlyphQa() {
  return (
    <svg viewBox="0 0 48 48" aria-hidden="true" {...strokeProps}>
      <rect x="6" y="8" width="30" height="22" rx="2" />
      <path d="M12 24l4-6 5 7 4-4 4 5" />
      <circle cx="34" cy="34" r="6" />
      <path d="M38 38l4 4" />
    </svg>
  )
}
function GlyphRecap() {
  return (
    <svg viewBox="0 0 48 48" aria-hidden="true" {...strokeProps}>
      <path d="M8 40V10" />
      <path d="M8 40h32" />
      <rect x="14" y="26" width="4" height="10" />
      <rect x="22" y="18" width="4" height="18" />
      <rect x="30" y="12" width="4" height="24" />
      <path d="M36 8l4 2-2 4" />
    </svg>
  )
}
function GlyphReconciliation() {
  return (
    <svg viewBox="0 0 48 48" aria-hidden="true" {...strokeProps}>
      <path d="M10 8v18a6 6 0 0 0 6 6" />
      <path d="M38 8v18a6 6 0 0 1-6 6" />
      <path d="M16 32h16" />
      <path d="M20 38l4 4 4-4" />
      <path d="M10 14h6M32 14h6" />
    </svg>
  )
}

// ---------- sections ----------

function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div
        className="absolute inset-0 opacity-[0.07]"
        style={{ backgroundImage: PLUS_PATTERN, backgroundSize: '18px 18px' }}
      />
      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse at 50% 0%, rgba(211,228,255,0.35) 0%, rgba(255,255,255,0.95) 65%, rgb(255,255,255) 100%)',
        }}
      />
      <Container className="relative pt-32 pb-16 lg:pt-40 lg:pb-24">
        <div className="mx-auto max-w-4xl text-center">
          <p className="inline-flex items-center gap-2 rounded-full bg-tint px-4 py-1.5 text-sm font-medium text-primary mb-6">
            <span>🎯</span> Media execution for independent agencies
          </p>
          <h1 className="font-display text-5xl font-medium tracking-tight text-slate-900 sm:text-6xl lg:text-7xl">
            The media team you don&rsquo;t have to{' '}
            <span className="relative text-primary">
              <svg
                aria-hidden="true"
                viewBox="0 0 418 42"
                className="absolute left-0 top-2/3 h-[0.58em] w-full fill-primary/30"
                preserveAspectRatio="none"
              >
                <path d="M203.371.916c-26.013-2.078-76.686 1.963-124.73 9.946L67.3 12.749C35.421 18.062 18.2 21.766 6.004 25.934 1.244 27.561.828 27.778.874 28.61c.07 1.214.828 1.121 9.595-1.176 9.072-2.377 17.15-3.92 39.246-7.496C123.565 7.986 157.869 4.492 195.942 5.046c7.461.108 19.25 1.696 19.17 2.582-.107 1.183-7.874 4.31-25.75 10.366-21.992 7.45-35.43 12.534-36.701 13.884-2.173 2.308-.202 4.407 4.442 4.734 2.654.187 3.263.157 15.593-.78 35.401-2.686 57.944-3.488 88.365-3.143 46.327.526 75.721 2.23 130.788 7.584 19.787 1.924 20.814 1.98 24.557 1.332l.066-.011c1.201-.203 1.53-1.825.399-2.335-2.911-1.31-4.893-1.604-22.048-3.261-57.509-5.556-87.871-7.36-132.059-7.842-23.239-.254-33.617-.116-50.627.674-11.629.54-42.371 2.494-46.696 2.967-2.359.259 8.133-3.625 26.504-9.81 23.239-7.825 27.934-10.149 28.304-14.005.417-4.348-3.529-6-16.878-7.066Z" />
              </svg>
              <span className="relative">hire.</span>
            </span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg tracking-tight text-slate-700">
            Send us a brief. We plan, build and run it on your own platforms. You
            approve the plan and see every decision.{' '}
            <span className="font-semibold text-slate-900">
              7% of media, nothing else.
            </span>
          </p>
          <div className="mt-10 flex flex-col sm:flex-row justify-center gap-4">
            <Button
              href="#brief"
              color="blue"
              className=""
              onClick={(e: React.MouseEvent) => {
                e.preventDefault()
                fireBriefIntent('hero')
                scrollToId('brief')
              }}
            >
              Get my free plan →
            </Button>
            <Button
              href={CALENDAR_URL}
              variant="outline"
              color="slate"
              className=""
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => fireBookCall('hero')}
            >
              Book a 20-min call
            </Button>
          </div>

          <p className="mt-6 text-sm text-slate-500">
            Currently running media for Lewis Media Partners
          </p>

          <div className="mx-auto mt-16 max-w-5xl">
            <div className="rounded-xl border border-tint shadow-2xl overflow-hidden bg-white">
              <HeroFlowSvg />
            </div>
          </div>
        </div>
      </Container>
    </section>
  )
}

function PainSection() {
  const pains = [
    {
      title: 'Your buyers are drowning',
      body: 'Campaign setup is the single largest time sink your buyers have. Every new client, every new flight, every creative refresh. They\u2019re not planning — they\u2019re assembling.',
    },
    {
      title: 'Hiring takes 6 months and $130K',
      body: 'One in-house buyer is a salary, a ramp, a search and a resignation risk. And they still can\u2019t cover Meta plus Google plus CTV plus reporting at the same time.',
    },
    {
      title: 'Freelancers go quiet',
      body: 'Two unresponsive search freelancers cost you a client renewal. No paper trail, no accountability, no continuity when they take a week off.',
    },
  ]
  return (
    <section className="py-16 sm:py-24 bg-white">
      <Container className="">
        <div className="mx-auto max-w-2xl text-center mb-16">
          <h2 className="font-display text-3xl tracking-tight text-slate-900 sm:text-4xl">
            You keep winning business you can&rsquo;t staff for.
          </h2>
          <p className="mt-4 text-lg text-slate-600">
            Every independent agency we talk to has the same three problems.
          </p>
        </div>
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-3">
          {pains.map((p) => (
            <div
              key={p.title}
              className="rounded-2xl border border-red-100 bg-red-50/50 p-8"
            >
              <div className="w-8 h-8 text-red-400 mb-4">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10" />
                  <line x1="12" y1="8" x2="12" y2="12" />
                  <line x1="12" y1="16" x2="12.01" y2="16" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-slate-900 mb-2">
                {p.title}
              </h3>
              <p className="text-slate-600">{p.body}</p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  )
}

function DecisionsSection() {
  return (
    <section className="py-20 sm:py-28 bg-slate-50 border-y border-tint">
      <Container className="">
        <div className="grid lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-5">
            <p className="text-xs font-semibold uppercase tracking-wider text-primary mb-3">
              The moat
            </p>
            <h2 className="font-display text-3xl sm:text-4xl font-medium tracking-tight text-slate-900">
              You approve the plan.<br />You see every decision.
            </h2>
            <p className="mt-5 text-lg text-slate-600 leading-relaxed">
              No AI running loose with your client&rsquo;s money. Halliard proposes
              every meaningful change in the portal. You approve, tweak, or send
              back. A person signs the exceptions.
            </p>
            <p className="mt-4 text-slate-600 leading-relaxed">
              Nothing spends until you&rsquo;ve seen it.
            </p>
            <ul className="mt-6 space-y-2 text-slate-700 text-sm">
              <li>&#10003;&nbsp; Full audit log per client, exportable anytime</li>
              <li>&#10003;&nbsp; Auto-approve thresholds you control</li>
              <li>&#10003;&nbsp; A human name on every judgment call</li>
            </ul>
          </div>
          <div className="lg:col-span-7">
            <div className="rounded-2xl border border-tint bg-white p-4 sm:p-6 shadow-lg">
              <DecisionsLogSvg />
            </div>
          </div>
        </div>
      </Container>
    </section>
  )
}

function ServicesSection() {
  const items = [
    {
      title: 'Planning',
      glyph: <GlyphPlanning />,
      body: 'Brief in, media plan out within 48 hours. Channels, budgets, weekly pacing, reach and frequency.',
    },
    {
      title: 'Buying',
      glyph: <GlyphBuying />,
      body: 'We build and launch every campaign on your seats. Meta, Google, YouTube, Display live today. CTV, OOH, TV next.',
    },
    {
      title: 'Trafficking',
      glyph: <GlyphTrafficking />,
      body: 'Creative rotation, UTMs, naming conventions, exclusion lists. The invisible work that decides whether a campaign works.',
    },
    {
      title: 'Daily QA',
      glyph: <GlyphQa />,
      body: 'A person checks pacing, delivery, spend anomalies and creative fatigue every business day. Escalations before you notice.',
    },
    {
      title: 'Recap',
      glyph: <GlyphRecap />,
      body: 'Client-ready reporting each flight and each month. Not a screenshot dump. A written recap of what happened and what to do next.',
    },
    {
      title: 'Reconciliation',
      glyph: <GlyphReconciliation />,
      body: 'Platform spend matched to invoice, matched to plan. No monthly finance surprises.',
    },
  ]
  return (
    <section className="py-16 sm:py-24 bg-white">
      <Container className="">
        <div className="mx-auto max-w-2xl text-center mb-16">
          <h2 className="font-display text-3xl tracking-tight text-slate-900 sm:text-4xl">
            One fee. Six jobs done.
          </h2>
          <p className="mt-4 text-lg text-slate-600">
            Everything an in-house buyer would do — planning, buying, QA,
            reporting, reconciliation — for 7% of media managed.
          </p>
        </div>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {items.map((it, idx) => (
            <div
              key={it.title}
              className="relative rounded-2xl bg-white p-8 shadow-lg border border-tint"
            >
              <div className="flex items-center gap-4 mb-5">
                <span className="font-display text-4xl font-bold text-primary/20">
                  0{idx + 1}
                </span>
                <div className="w-8 h-8 text-primary">{it.glyph}</div>
              </div>
              <h3 className="text-xl font-semibold text-slate-900 mb-3">
                {it.title}
              </h3>
              <p className="text-slate-600">{it.body}</p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  )
}

function SeatsSection() {
  return (
    <section className="py-20 sm:py-24 bg-slate-50 border-y border-tint">
      <Container className="">
        <div className="grid lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-5">
            <p className="text-xs font-semibold uppercase tracking-wider text-primary mb-3">
              Your seats, your accounts
            </p>
            <h2 className="font-display text-3xl sm:text-4xl font-medium tracking-tight text-slate-900">
              We operate inside your agency.<br />We never own it.
            </h2>
            <p className="mt-5 text-lg text-slate-600 leading-relaxed">
              Halliard runs on your Meta, your Google Ads, your DV360, your Trade
              Desk. Media is billed by the platform to you. We&rsquo;re never in
              the transaction. Revoke access with one click.
            </p>
            <p className="mt-4 text-slate-600 leading-relaxed">
              If we go away tomorrow, your accounts, history, pixels and audiences
              stay exactly where they were.
            </p>
          </div>
          <div className="lg:col-span-7">
            <div className="rounded-2xl border border-tint bg-white p-4 sm:p-6 shadow-lg">
              <SeatsDiagramSvg />
            </div>
          </div>
        </div>
      </Container>
    </section>
  )
}

function ReachSection() {
  return (
    <section className="py-16 sm:py-20 bg-white">
      <Container className="">
        <div className="mx-auto max-w-2xl text-center mb-10">
          <h2 className="font-display text-3xl tracking-tight text-slate-900 sm:text-4xl">
            Where we can run media today
          </h2>
          <p className="mt-4 text-lg text-slate-600">
            We&rsquo;ll tell you if what you need isn&rsquo;t in our lane. No
            pretending we cover TV yet.
          </p>
        </div>
        <div className="mx-auto max-w-5xl rounded-2xl border border-tint bg-white p-4 sm:p-6 shadow-lg">
          <ReachSvg />
        </div>
      </Container>
    </section>
  )
}

function ComparisonSection() {
  const rows: Array<[string, string, string, string, string, string]> = [
    // criterion, Halliard, Hire, Pathlabs, InvisiblePPC, Concord
    ['A human is accountable', 'Yes', 'Yes', 'Yes', 'Sometimes', 'No'],
    ['Agent does the repetitive work', 'Yes', 'No', 'No', 'Templated', 'Yes'],
    ['Runs on your seats and accounts', 'Yes', 'Yes', 'Yes', 'Yes', 'Yes'],
    ['Single visible fee', 'Yes', 'Salary', 'Retainer', 'Yes', 'Software fee'],
    ['Independent (not owned by a vendor)', 'Yes', 'Yes', 'No (MiQ)', 'Yes', 'Yes'],
    ['Cross-channel by default', 'Yes', 'Depends', 'Yes', 'Google + Meta', 'Yes'],
    ['Onboarding time', '48 hrs', '3 mo', '2\u20134 wks', '1 wk', '1\u20132 wks'],
    ['Cancel any month', 'Yes', 'HR event', 'Yes', 'Yes', 'Contract'],
  ]
  return (
    <section className="py-16 sm:py-24 bg-white">
      <Container className="">
        <div className="mx-auto max-w-2xl text-center mb-12">
          <h2 className="font-display text-3xl tracking-tight text-slate-900 sm:text-4xl">
            How this compares
          </h2>
          <p className="mt-4 text-lg text-slate-600">
            You already know the alternatives. Here&rsquo;s the honest read.
          </p>
        </div>
        <div className="mx-auto max-w-5xl overflow-x-auto rounded-2xl border border-tint shadow-lg bg-white">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-slate-50 text-slate-500 text-xs uppercase tracking-wider">
                <th className="text-left px-5 py-4 font-semibold">Criterion</th>
                <th className="px-5 py-4 font-semibold text-primary">Halliard</th>
                <th className="px-5 py-4 font-semibold">Hire a buyer</th>
                <th className="px-5 py-4 font-semibold">Pathlabs</th>
                <th className="px-5 py-4 font-semibold">InvisiblePPC</th>
                <th className="px-5 py-4 font-semibold">Concord</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((r) => (
                <tr key={r[0]} className="border-t border-tint">
                  <td className="text-left px-5 py-4 text-slate-700 font-medium">
                    {r[0]}
                  </td>
                  <td className="px-5 py-4 text-center bg-primary/5 text-primary font-semibold">
                    {r[1]}
                  </td>
                  <td className="px-5 py-4 text-center text-slate-600">{r[2]}</td>
                  <td className="px-5 py-4 text-center text-slate-600">{r[3]}</td>
                  <td className="px-5 py-4 text-center text-slate-600">{r[4]}</td>
                  <td className="px-5 py-4 text-center text-slate-600">{r[5]}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Container>
    </section>
  )
}

function FitSection() {
  const yes = [
    'You run agency clients on Meta and Google (and want more)',
    'You&rsquo;re capacity-constrained on buyers or trafficking',
    'You want a plan for a pitch this week',
    'You want one visible fee, not a media markup',
  ]
  const no = [
    'You have an in-house trading desk',
    'You want us to hold the money (we don&rsquo;t)',
    'You need us to be Agency of Record',
    'You want templated single-channel PPC for $445/mo',
  ]
  return (
    <section className="py-16 sm:py-24 bg-slate-50 border-y border-tint">
      <Container className="">
        <div className="grid lg:grid-cols-2 gap-8">
          <div className="rounded-2xl bg-white p-8 shadow-lg border border-tint">
            <h3 className="font-display text-2xl font-medium text-slate-900 mb-4">
              For you if&hellip;
            </h3>
            <ul className="space-y-3 text-slate-700">
              {yes.map((y) => (
                <li key={y} className="flex gap-3">
                  <span className="text-primary font-bold">&#10003;</span>
                  <span dangerouslySetInnerHTML={{ __html: y }} />
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-2xl bg-white p-8 shadow-lg border border-tint">
            <h3 className="font-display text-2xl font-medium text-slate-900 mb-4">
              Not for you if&hellip;
            </h3>
            <ul className="space-y-3 text-slate-700">
              {no.map((n) => (
                <li key={n} className="flex gap-3">
                  <span className="text-slate-400 font-bold">&times;</span>
                  <span dangerouslySetInnerHTML={{ __html: n }} />
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Container>
    </section>
  )
}

function BriefForm() {
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle')
  const [briefStarted, setBriefStarted] = useState(false)
  const [errorMsg, setErrorMsg] = useState<string | null>(null)

  function onFirstFocus() {
    if (briefStarted) return
    setBriefStarted(true)
    try {
      const w = window as any
      if (w?.posthog?.capture) {
        w.posthog.capture('execution_brief_started', { page: '/execution' })
      }
      trackPixel('Lead', {
        content_name: 'execution_brief_started',
        source: 'execution_lp',
      })
    } catch {
      // swallow
    }
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setStatus('submitting')
    setErrorMsg(null)
    const form = e.currentTarget
    const data = new FormData(form)

    // Honeypot
    if (String(data.get('website') || '')) {
      setStatus('success')
      return
    }

    const channels = data.getAll('channels').map(String)

    const payload: Record<string, unknown> = {
      name: String(data.get('name') || ''),
      email: String(data.get('email') || ''),
      agency: String(data.get('agency') || ''),
      client: String(data.get('client') || ''),
      budget: String(data.get('budget') || ''),
      channels,
      goal: String(data.get('goal') || ''),
      source: 'execution_lp',
      page: '/execution',
      submitted_at: new Date().toISOString(),
      ...readUtms(),
      referrer: typeof document !== 'undefined' ? document.referrer : '',
    }

    try {
      const res = await fetch('/api/lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })
      if (!res.ok) throw new Error(`Status ${res.status}`)
      fireBriefSubmitted(payload)
      setStatus('success')
      form.reset()
    } catch (err) {
      console.error('Brief submission failed', err)
      setStatus('error')
      setErrorMsg(
        'Something went wrong. Please email matthew@halliardmedia.com directly.',
      )
    }
  }

  return (
    <section id="brief" className="py-20 sm:py-24 bg-white scroll-mt-24">
      <Container className="">
        <div className="mx-auto max-w-2xl">
          <div className="text-center mb-10">
            <p className="text-xs font-semibold uppercase tracking-wider text-primary mb-3">
              Send a brief
            </p>
            <h2 className="font-display text-3xl sm:text-4xl font-medium tracking-tight text-slate-900">
              Two minutes. A full plan back within 48 hours.
            </h2>
            <p className="mt-4 text-lg text-slate-600">
              Free. No commitment. If you want it live, we run it on your platforms
              for 7% of media.
            </p>
          </div>

          {status === 'success' ? (
            <div className="rounded-2xl border border-tint bg-white p-8 text-center shadow-lg">
              <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary text-2xl">
                &#10003;
              </div>
              <h3 className="font-display text-2xl font-medium text-slate-900">
                Got it.
              </h3>
              <p className="mt-3 text-slate-600">
                Your plan will be in your inbox within 48 hours. If anything in the
                brief is unclear, we&rsquo;ll email you first rather than guess.
              </p>
              <p className="mt-4 text-sm text-slate-500">
                Urgent?{' '}
                <a
                  className="text-primary underline"
                  href="mailto:matthew@halliardmedia.com"
                >
                  matthew@halliardmedia.com
                </a>
              </p>
            </div>
          ) : (
            <form
              onSubmit={handleSubmit}
              onFocus={onFirstFocus}
              className="rounded-2xl border border-tint bg-white p-6 sm:p-8 shadow-lg space-y-5"
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

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
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
                    placeholder="Jane Buyer"
                    className="mt-1.5 block w-full rounded-md border border-slate-300 bg-white px-3 py-2.5 text-base text-slate-900 placeholder-slate-400 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
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
                    placeholder="Your agency"
                    className="mt-1.5 block w-full rounded-md border border-slate-300 bg-white px-3 py-2.5 text-base text-slate-900 placeholder-slate-400 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                  />
                </div>
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
                  placeholder="jane@youragency.com"
                  className="mt-1.5 block w-full rounded-md border border-slate-300 bg-white px-3 py-2.5 text-base text-slate-900 placeholder-slate-400 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label htmlFor="client" className="block text-sm font-medium text-slate-700">
                    Client or brand
                  </label>
                  <input
                    id="client"
                    name="client"
                    type="text"
                    placeholder="Acme Co."
                    className="mt-1.5 block w-full rounded-md border border-slate-300 bg-white px-3 py-2.5 text-base text-slate-900 placeholder-slate-400 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                  />
                </div>
                <div>
                  <label htmlFor="budget" className="block text-sm font-medium text-slate-700">
                    Monthly media budget
                  </label>
                  <select
                    id="budget"
                    name="budget"
                    required
                    defaultValue=""
                    className="mt-1.5 block w-full rounded-md border border-slate-300 bg-white px-3 py-2.5 text-base text-slate-900 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                  >
                    <option value="" disabled>
                      Select
                    </option>
                    <option>Under $10,000</option>
                    <option>$10,000 to $25,000</option>
                    <option>$25,000 to $75,000</option>
                    <option>$75,000 to $200,000</option>
                    <option>Over $200,000</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700">
                  Channels in scope
                </label>
                <div className="mt-2 grid grid-cols-2 sm:grid-cols-3 gap-2 text-sm">
                  {['Meta', 'Google', 'CTV', 'OOH', 'TV or Radio', 'Other'].map(
                    (c) => (
                      <label
                        key={c}
                        className="flex items-center gap-2 rounded-md border border-slate-200 px-3 py-2 hover:border-primary/40 cursor-pointer"
                      >
                        <input
                          type="checkbox"
                          name="channels"
                          value={c}
                          className="rounded border-slate-300 text-primary focus:ring-primary/30"
                        />
                        <span className="text-slate-700">{c}</span>
                      </label>
                    ),
                  )}
                </div>
              </div>

              <div>
                <label htmlFor="goal" className="block text-sm font-medium text-slate-700">
                  What does the client need this campaign to do?
                </label>
                <textarea
                  id="goal"
                  name="goal"
                  rows={3}
                  required
                  placeholder="Objective, audience, geography, timing. Whatever you'd tell a new buyer on day one."
                  className="mt-1.5 block w-full rounded-md border border-slate-300 bg-white px-3 py-2.5 text-base text-slate-900 placeholder-slate-400 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                />
              </div>

              {status === 'error' && errorMsg && (
                <p className="text-sm text-red-600">{errorMsg}</p>
              )}

              <button
                type="submit"
                disabled={status === 'submitting'}
                className="w-full inline-flex items-center justify-center rounded-full bg-primary py-3 px-6 text-base font-semibold text-white hover:bg-primary/90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {status === 'submitting' ? 'Sending\u2026' : 'Get my free plan'}
              </button>

              <p className="text-xs text-slate-500 text-center">
                No credit card, no contract. We never contact your client.
              </p>
            </form>
          )}
        </div>
      </Container>
    </section>
  )
}

function FaqSection() {
  const items = [
    {
      q: 'I\u2019m not handing an AI my client\u2019s money.',
      a: 'You shouldn\u2019t. You approve the plan before anything spends. Every in-flight change goes through the internal portal and gets logged. A person signs the exceptions. Nothing runs on autopilot.',
    },
    {
      q: 'How is this different from hiring Pathlabs?',
      a: 'Pathlabs was acquired by MiQ in 2024 \u2014 they\u2019re now a media vendor\u2019s white-label team. We don\u2019t sell media, ever. We charge one visible fee for the work, on your seats.',
    },
    {
      q: 'Why 7% when InvisiblePPC is $445/mo?',
      a: 'InvisiblePPC does templated single-platform PPC. We build cross-channel plans, run them on your seats, and stay accountable to a person you can call.',
    },
    {
      q: 'What about Concord and other agent tools?',
      a: 'Concord is software your team runs. If you have buyers with capacity, look at Concord. Most agencies we talk to don\u2019t \u2014 they need the work done, not another tool to run.',
    },
    {
      q: 'Our money is in TV \u2014 do you do that?',
      a: 'Not yet. TV, radio and OOH are on the roadmap. Today we run Meta, Google, YouTube and Display where we have your seats. We\u2019ll tell you if what you need isn\u2019t in our lane.',
    },
    {
      q: 'Can we cancel?',
      a: 'Month to month. Revoke partner access anytime. You own the accounts \u2014 we just operate them.',
    },
    {
      q: 'Who owns the client relationship?',
      a: 'You do. Always. We\u2019re never Agency of Record and we never contact your client directly.',
    },
  ]
  return (
    <section className="py-16 sm:py-24 bg-white">
      <Container className="">
        <div className="mx-auto max-w-3xl">
          <div className="text-center mb-12">
            <h2 className="font-display text-3xl tracking-tight text-slate-900 sm:text-4xl">
              The honest answers
            </h2>
            <p className="mt-4 text-lg text-slate-600">
              What agencies ask us on the first call.
            </p>
          </div>
          <div className="divide-y divide-tint border-y border-tint">
            {items.map((it) => (
              <details key={it.q} className="group py-5">
                <summary className="flex justify-between items-center gap-4 cursor-pointer list-none">
                  <span className="font-medium text-slate-900">{it.q}</span>
                  <span className="text-primary transition-transform group-open:rotate-45 text-xl leading-none">
                    +
                  </span>
                </summary>
                <p className="mt-3 text-slate-600 leading-relaxed">{it.a}</p>
              </details>
            ))}
          </div>
        </div>
      </Container>
    </section>
  )
}

function FinalCta() {
  return (
    <section id="call" className="relative overflow-hidden">
      <div
        className="absolute inset-0 opacity-[0.07]"
        style={{ backgroundImage: PLUS_PATTERN, backgroundSize: '18px 18px' }}
      />
      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse at 50% 100%, rgba(211,228,255,0.35) 0%, rgba(255,255,255,0.95) 65%, rgb(255,255,255) 100%)',
        }}
      />
      <Container className="relative py-24 sm:py-32 text-center">
        <h2 className="font-display text-4xl sm:text-5xl font-medium tracking-tight text-slate-900 max-w-3xl mx-auto">
          One brief. 48 hours. Free plan.
        </h2>
        <p className="mt-5 text-lg text-slate-600 max-w-xl mx-auto">
          If our plan isn&rsquo;t better than what your team would have built, you
          lost two minutes.
        </p>
        <div className="mt-10 flex flex-col sm:flex-row justify-center gap-4">
          <Button
            href="#brief"
            color="blue"
            className=""
            onClick={(e: React.MouseEvent) => {
              e.preventDefault()
              fireBriefIntent('final')
              scrollToId('brief')
            }}
          >
            Send us a brief →
          </Button>
          <Button
            href={CALENDAR_URL}
            variant="outline"
            color="slate"
            className=""
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => fireBookCall('final')}
          >
            Book a 20-min call
          </Button>
        </div>
      </Container>
    </section>
  )
}

function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-400 py-10 text-sm">
      <Container className="">
        <div className="flex flex-col sm:flex-row justify-between gap-4">
          <div>
            &copy; {new Date().getFullYear()} Halliard Media Inc.
          </div>
          <div className="flex gap-6">
            <Link href="/privacy" className="hover:text-white">
              Privacy
            </Link>
            <Link href="/terms" className="hover:text-white">
              Terms
            </Link>
            <a
              href="mailto:matthew@halliardmedia.com"
              className="hover:text-white"
            >
              matthew@halliardmedia.com
            </a>
          </div>
        </div>
      </Container>
    </footer>
  )
}

// ---------- page ----------

export default function ExecutionPage() {
  useEffect(() => {
    persistUtms()
    try {
      const w = window as any
      if (w?.posthog?.capture) {
        w.posthog.capture('execution_page_view', {
          page: '/execution',
          ...readUtms(),
        })
      }
    } catch {
      // swallow
    }
  }, [])

  return (
    <>
      <Head>
        <title>
          Halliard &mdash; Media execution for independent agencies. 7% of media, nothing else.
        </title>
        <meta
          name="description"
          content="Send us a brief. We plan, build and run it on your own platforms. You approve the plan and see every decision. 7% of media, nothing else. Not agency of record."
        />
        <link rel="canonical" href="https://www.halliardmedia.com/execution" />
        <meta property="og:title" content="Halliard \u2014 Media execution for independent agencies" />
        <meta
          property="og:description"
          content="Send us a brief. Full plan back within 48 hours, free. 7% of media, nothing else."
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://www.halliardmedia.com/execution" />
        <meta name="twitter:card" content="summary_large_image" />
      </Head>
      <SiteHeader />
      <main>
        <Hero />
        <PainSection />
        <DecisionsSection />
        <ServicesSection />
        <SeatsSection />
        <ReachSection />
        <ComparisonSection />
        <FitSection />
        <BriefForm />
        <FaqSection />
        <FinalCta />
      </main>
      <Footer />
    </>
  )
}
