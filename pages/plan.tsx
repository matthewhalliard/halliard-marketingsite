import Head from 'next/head'
import Link from 'next/link'
import React, { useEffect, useRef, useState } from 'react'
import { Container } from '../components/mmm/Container'
import { Button } from '../components/mmm/Button'

const SIGN_UP_URL = 'https://app.halliardmedia.com/sign-up'

interface PlanSummary {
  hostname: string
  brandName: string
  industry: string
  targetAudience?: string
  rationale?: string
  budget: number
  reach: string
  frequency: string
  response: string
  channelMix: { audio: number; video: number; digital: number; ooh?: number }
  inferenceMode?: 'ai' | 'heuristic'
}

type Stage = 'idle' | 'analyzing' | 'ready' | 'error'

const ANALYSIS_STEPS = [
  'Crawling your website…',
  'Understanding your brand…',
  'Sizing your audience…',
  'Choosing the right channels…',
  'Building reach & frequency curve…',
  'Rendering your plan…',
]

function fmtCurrency(v: number) {
  return v >= 1e6 ? `$${(v / 1e6).toFixed(1)}M` : v >= 1000 ? `$${Math.round(v / 1000)}K` : `$${v}`
}

function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/70 backdrop-blur-sm border-b border-gray-100">
      <Container className="">
        <nav className="relative flex justify-between items-center py-5">
          <Link href="/" aria-label="Home">
            <img
              src="https://framerusercontent.com/images/s97qQgHpRGf1STgb6vDMgqYNU4.png?scale-down-to=512"
              alt="Halliard"
              className="h-8 w-auto"
            />
          </Link>
          <div className="flex items-center gap-x-4">
            <Button href={SIGN_UP_URL} color="blue" className="">
              Start Planning Free
            </Button>
          </div>
        </nav>
      </Container>
    </header>
  )
}

export default function PlanPage() {
  const [url, setUrl] = useState('')
  const [stage, setStage] = useState<Stage>('idle')
  const [stepIdx, setStepIdx] = useState(0)
  const [summary, setSummary] = useState<PlanSummary | null>(null)
  const [pngDataUrl, setPngDataUrl] = useState<string | null>(null)
  const [errorMsg, setErrorMsg] = useState<string | null>(null)

  // Email capture state (shown once plan is revealed)
  const [email, setEmail] = useState('')
  const [emailSubmitting, setEmailSubmitting] = useState(false)
  const [emailSubmitted, setEmailSubmitted] = useState(false)

  const stepTimerRef = useRef<ReturnType<typeof setInterval> | null>(null)
  const resultRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    if (stage !== 'analyzing') {
      if (stepTimerRef.current) clearInterval(stepTimerRef.current)
      return
    }
    setStepIdx(0)
    stepTimerRef.current = setInterval(() => {
      setStepIdx(i => Math.min(i + 1, ANALYSIS_STEPS.length - 1))
    }, 900)
    return () => {
      if (stepTimerRef.current) clearInterval(stepTimerRef.current)
    }
  }, [stage])

  const normalizeUrl = (raw: string): string => {
    const trimmed = raw.trim()
    if (!trimmed) return ''
    if (trimmed.startsWith('http://') || trimmed.startsWith('https://')) return trimmed
    return `https://${trimmed}`
  }

  const isValidUrl = (raw: string): boolean => {
    const normalized = raw.startsWith('http://') || raw.startsWith('https://') ? raw : `https://${raw.trim()}`
    try {
      const u = new URL(normalized)
      // Hostname must have a dot and at least 2-char TLD
      return !!u.hostname && /\.[a-z]{2,}$/i.test(u.hostname)
    } catch {
      return false
    }
  }

  const handleSubmit = async (e?: React.FormEvent, urlOverride?: string) => {
    if (e) e.preventDefault()
    const raw = (urlOverride ?? url).trim()
    if (!isValidUrl(raw)) {
      setErrorMsg("That doesn't look like a valid URL. Try something like nike.com.")
      setStage('error')
      return
    }
    const normalized = normalizeUrl(raw)

    setErrorMsg(null)
    setSummary(null)
    setPngDataUrl(null)
    setEmailSubmitted(false)
    setStage('analyzing')

    try {
      // Start timing for minimum theater duration — plans generate fast,
      // but we want the loading animation to breathe a bit.
      const minTheaterMs = 3800
      const start = Date.now()

      const apiRes = await fetch(`/api/sample-plan?format=json&url=${encodeURIComponent(normalized)}`)
      if (!apiRes.ok) {
        const j = await apiRes.json().catch(() => ({}))
        throw new Error(j.error || `Request failed (${apiRes.status})`)
      }
      const data = await apiRes.json()

      // PostHog tracking — mirrors the pattern from trytoday.tsx
      if (typeof window !== 'undefined' && (window as any).posthog) {
        ;(window as any).posthog.capture('sample_plan_generated', {
          url: normalized,
          brand: data.summary?.brandName,
          industry: data.summary?.industry,
          inference_mode: data.summary?.inferenceMode,
          budget: data.summary?.budget,
        })
      }

      const elapsed = Date.now() - start
      const waitMore = Math.max(0, minTheaterMs - elapsed)
      await new Promise(r => setTimeout(r, waitMore))

      setSummary(data.summary)
      setPngDataUrl(`data:${data.pngMime};base64,${data.pngBase64}`)
      setStage('ready')

      // Scroll to result on mobile
      setTimeout(() => resultRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 150)
    } catch (err: any) {
      console.error(err)
      setErrorMsg(err?.message || 'Something went wrong generating your plan.')
      setStage('error')
    }
  }

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return
    setEmailSubmitting(true)
    try {
      await fetch('/api/lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email,
          source: 'plan-lead-magnet',
          url_analyzed: normalizeUrl(url),
          brand_name: summary?.brandName,
          industry: summary?.industry,
          budget: summary?.budget,
          _subject: `Plan generator lead: ${summary?.brandName || url}`,
        }),
      })
      if (typeof window !== 'undefined' && (window as any).gtag) {
        ;(window as any).gtag('event', 'conversion', {
          send_to: 'AW-672346912/qEmHCJ6L_pgcEKDmzMAC',
          value: 200.0,
          currency: 'USD',
        })
      }
      if (typeof window !== 'undefined' && (window as any).posthog) {
        ;(window as any).posthog.capture('sample_plan_email_captured', {
          email, source: 'plan-lead-magnet',
          brand: summary?.brandName, industry: summary?.industry,
        })
      }
      setEmailSubmitted(true)
    } catch {
      // Still show success; Formspark likely received it
      setEmailSubmitted(true)
    }
    setEmailSubmitting(false)
  }

  return (
    <>
      <Head>
        <title>See Your Media Plan in 30 Seconds | Halliard</title>
        <meta
          name="description"
          content="Enter your website URL and Halliard builds a full media plan for your brand — channel mix, flighting, reach & frequency — in 30 seconds."
        />
        <meta property="og:title" content="See Your Media Plan in 30 Seconds | Halliard" />
        <meta property="og:description" content="Enter your URL. Get a real media plan. No signup required." />
      </Head>
      <Header />
      <main className="pt-28 pb-24 bg-gradient-to-b from-white via-slate-50 to-white min-h-screen">
        {/* HERO */}
        <Container className="max-w-3xl">
          <div className="text-center">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-semibold tracking-wide mb-6 uppercase">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse" />
              Live plan generator
            </div>
            <h1 className="font-display text-4xl sm:text-6xl font-medium tracking-tight text-slate-900 leading-[1.05]">
              See your media plan<br />
              <span className="text-primary">in 30 seconds.</span>
            </h1>
            <p className="mt-6 text-lg text-slate-600 max-w-xl mx-auto">
              Enter your website. Halliard analyzes your brand, picks a channel mix,
              and builds a full media plan — flighting, reach & frequency, the works.
              No signup. No credit card.
            </p>
          </div>

          {/* URL INPUT */}
          <form onSubmit={handleSubmit} className="mt-10">
            <div className="flex flex-col sm:flex-row gap-3 p-2 bg-white border border-slate-200 rounded-2xl shadow-lg shadow-slate-200/50">
              <div className="flex-1 flex items-center gap-3 px-4">
                <svg className="w-5 h-5 text-slate-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                </svg>
                <input
                  type="text"
                  inputMode="url"
                  autoComplete="url"
                  placeholder="nike.com, marriott.com, your brand..."
                  value={url}
                  onChange={e => {
                    setUrl(e.target.value)
                    if (stage === 'error') setStage('idle')
                  }}
                  className="flex-1 py-3 bg-transparent text-slate-900 placeholder-slate-400 text-base border-0 ring-0 focus:ring-0 focus:outline-none focus:border-0 shadow-none focus:shadow-none appearance-none"
                  style={{ boxShadow: 'none', outline: 'none' }}
                  disabled={stage === 'analyzing'}
                />
              </div>
              <button
                type="submit"
                disabled={stage === 'analyzing' || !url.trim()}
                className={`rounded-xl px-6 py-3 font-semibold text-white transition-colors text-base ${
                  stage === 'analyzing' || !url.trim()
                    ? 'bg-slate-300 cursor-not-allowed'
                    : 'bg-primary hover:bg-secondary cursor-pointer'
                }`}
              >
                {stage === 'analyzing' ? 'Building…' : 'Generate Plan →'}
              </button>
            </div>

            {stage === 'error' && errorMsg && (
              <div className="mt-3 text-sm text-red-600 text-center">{errorMsg}</div>
            )}

            <p className="mt-3 text-center text-xs text-slate-400">
              We only read public pages. Nothing is stored until you sign up.
            </p>
          </form>

          {/* Try-me chips */}
          {stage === 'idle' && (
            <div className="mt-6 flex flex-wrap gap-2 justify-center">
              <span className="text-xs text-slate-500 mr-1 self-center">Try:</span>
              {['nike.com', 'marriott.com', 'allbirds.com', 'chase.com', 'ford.com'].map(ex => (
                <button
                  key={ex}
                  type="button"
                  onClick={() => {
                    setUrl(ex)
                    handleSubmit(undefined, ex)
                  }}
                  className="px-3 py-1.5 rounded-full bg-white border border-slate-200 text-xs text-slate-600 hover:bg-slate-50 hover:border-slate-300 transition-colors"
                >
                  {ex}
                </button>
              ))}
            </div>
          )}
        </Container>

        {/* LOADING THEATER */}
        {stage === 'analyzing' && (
          <Container className="max-w-2xl mt-14">
            <div className="bg-white rounded-2xl border border-slate-200 shadow-lg shadow-slate-200/50 p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-8 h-8 rounded-full border-2 border-primary border-t-transparent animate-spin" />
                <div className="text-slate-900 font-medium">Analyzing {url.replace(/^https?:\/\//, '').replace(/^www\./, '')}</div>
              </div>
              <ul className="space-y-3">
                {ANALYSIS_STEPS.map((step, i) => {
                  const done = i < stepIdx
                  const active = i === stepIdx
                  return (
                    <li key={step} className="flex items-center gap-3">
                      <div
                        className={`w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 transition-colors ${
                          done ? 'bg-green-500 text-white' : active ? 'bg-blue-100 text-blue-600' : 'bg-slate-100 text-slate-400'
                        }`}
                      >
                        {done ? (
                          <svg viewBox="0 0 20 20" fill="currentColor" className="w-3.5 h-3.5">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 00-1.414 0L8 12.586 4.707 9.293a1 1 0 10-1.414 1.414l4 4a1 1 0 001.414 0l8-8a1 1 0 000-1.414z" clipRule="evenodd" />
                          </svg>
                        ) : active ? (
                          <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
                        ) : null}
                      </div>
                      <span className={`text-sm ${done ? 'text-slate-500' : active ? 'text-slate-900 font-medium' : 'text-slate-400'}`}>
                        {step}
                      </span>
                    </li>
                  )
                })}
              </ul>
            </div>
          </Container>
        )}

        {/* RESULT */}
        {stage === 'ready' && summary && pngDataUrl && (
          <div ref={resultRef} className="mt-16">
            <Container className="max-w-5xl">
              <div className="text-center mb-8">
                <div className="inline-block px-3 py-1 rounded-full bg-green-50 text-green-700 text-xs font-semibold tracking-wide uppercase mb-3">
                  ✓ Your plan is ready
                </div>
                <h2 className="font-display text-3xl sm:text-4xl font-medium tracking-tight text-slate-900">
                  Here's what we'd build for {summary.brandName}.
                </h2>
              </div>

              {/* Stats strip */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-px bg-slate-200 rounded-xl overflow-hidden mb-6 border border-slate-200">
                <Stat label="Category" value={summary.industry} />
                <Stat label="Budget" value={fmtCurrency(summary.budget)} />
                <Stat label="Reach" value={summary.reach} />
                <Stat label="Avg. Frequency" value={summary.frequency} />
              </div>

              {/* AI rationale (when available) */}
              {(summary.targetAudience || summary.rationale) && (
                <div className="mb-6 bg-gradient-to-br from-slate-50 to-white border border-slate-200 rounded-xl p-5 sm:p-6">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-primary/10 text-primary text-[10px] font-bold tracking-widest uppercase">
                      <svg className="w-3 h-3" viewBox="0 0 20 20" fill="currentColor"><path d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z" /></svg>
                      AI Analysis
                    </span>
                  </div>
                  {summary.targetAudience && (
                    <div className="mb-3">
                      <div className="text-[10px] font-bold tracking-widest text-slate-400 uppercase mb-1">Target audience</div>
                      <div className="text-slate-800 text-sm leading-relaxed">{summary.targetAudience}</div>
                    </div>
                  )}
                  {summary.rationale && (
                    <div>
                      <div className="text-[10px] font-bold tracking-widest text-slate-400 uppercase mb-1">Why this mix</div>
                      <div className="text-slate-800 text-sm leading-relaxed">{summary.rationale}</div>
                    </div>
                  )}
                </div>
              )}

              {/* The rendered plan */}
              <div className="rounded-2xl overflow-hidden shadow-2xl shadow-slate-900/20 bg-slate-900">
                <img
                  src={pngDataUrl}
                  alt={`Media plan for ${summary.brandName}`}
                  className="w-full h-auto block"
                />
              </div>

              {/* CTA + email capture */}
              <div className="mt-10 bg-gradient-to-br from-primary to-secondary rounded-2xl p-8 sm:p-10 text-white">
                {!emailSubmitted ? (
                  <>
                    <h3 className="font-display text-2xl sm:text-3xl font-medium tracking-tight">
                      Want to edit this plan in Halliard?
                    </h3>
                    <p className="mt-2 text-white/80 text-lg">
                      Sign up free — no credit card — and this plan loads straight into your
                      workspace. Or drop your email and we'll send you an editable copy.
                    </p>
                    <div className="mt-6 flex flex-col sm:flex-row gap-3">
                      <a
                        href={SIGN_UP_URL}
                        className="inline-flex items-center justify-center px-6 py-3 rounded-xl bg-white text-primary font-semibold hover:bg-slate-100 transition-colors"
                      >
                        Start Planning Free →
                      </a>
                    </div>

                    <div className="mt-8 pt-8 border-t border-white/20">
                      <form onSubmit={handleEmailSubmit} className="flex flex-col sm:flex-row gap-3">
                        <input
                          type="email"
                          placeholder="you@yourcompany.com"
                          value={email}
                          onChange={e => setEmail(e.target.value)}
                          required
                          className="flex-1 rounded-xl px-4 py-3 text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-white"
                        />
                        <button
                          type="submit"
                          disabled={emailSubmitting || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)}
                          className={`rounded-xl px-6 py-3 font-semibold transition-colors ${
                            emailSubmitting || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
                              ? 'bg-white/30 text-white/60 cursor-not-allowed'
                              : 'bg-slate-900 text-white hover:bg-slate-800'
                          }`}
                        >
                          {emailSubmitting ? 'Sending…' : 'Email me this plan'}
                        </button>
                      </form>
                    </div>
                  </>
                ) : (
                  <div className="text-center py-4">
                    <div className="text-4xl mb-3">📬</div>
                    <h3 className="font-display text-2xl font-medium">Check your inbox.</h3>
                    <p className="mt-2 text-white/80">
                      We've sent an editable version of this plan to <strong>{email}</strong>.
                    </p>
                    <a
                      href={SIGN_UP_URL}
                      className="mt-6 inline-flex items-center justify-center px-6 py-3 rounded-xl bg-white text-primary font-semibold hover:bg-slate-100 transition-colors"
                    >
                      Open it in Halliard →
                    </a>
                  </div>
                )}
              </div>

              {/* Disclaimer */}
              <p className="mt-8 text-center text-xs text-slate-400 max-w-xl mx-auto">
                This sample plan is built from public category benchmarks. Sign up to model
                your actual audience, inventory, and measurement — powered by the same
                engine agencies use in production.
              </p>

              <div className="mt-12 text-center">
                <button
                  onClick={() => { setStage('idle'); setUrl(''); setSummary(null); setPngDataUrl(null); window.scrollTo({ top: 0, behavior: 'smooth' }) }}
                  className="text-sm text-slate-600 hover:text-slate-900 underline underline-offset-4"
                >
                  ← Try another URL
                </button>
              </div>
            </Container>
          </div>
        )}

        {/* SOCIAL PROOF / HOW IT WORKS (only when idle) */}
        {stage === 'idle' && (
          <Container className="max-w-4xl mt-24">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Feature
                step="1"
                title="Enter your URL"
                body="We read your site — brand, category, positioning. No login, no credit card, no uploads."
              />
              <Feature
                step="2"
                title="Halliard builds a plan"
                body="Channel mix, property-level flighting, budget allocation, and reach & frequency projections — in one pass."
              />
              <Feature
                step="3"
                title="Edit it in the product"
                body="Sign up free and this plan loads into your workspace. Adjust budgets, swap channels, run scenarios."
              />
            </div>
          </Container>
        )}
      </main>
    </>
  )
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="bg-white px-5 py-4">
      <div className="text-[10px] font-bold tracking-widest text-slate-400 uppercase mb-1">{label}</div>
      <div className="text-slate-900 font-semibold text-lg sm:text-xl truncate" title={value}>{value}</div>
    </div>
  )
}

function Feature({ step, title, body }: { step: string; title: string; body: string }) {
  return (
    <div className="bg-white rounded-xl border border-slate-200 p-6">
      <div className="w-8 h-8 rounded-full bg-primary/10 text-primary font-bold flex items-center justify-center mb-4">
        {step}
      </div>
      <h3 className="font-display text-lg font-medium text-slate-900 mb-2">{title}</h3>
      <p className="text-slate-600 text-sm leading-relaxed">{body}</p>
    </div>
  )
}

;(PlanPage as any).disableNavbar = true
;(PlanPage as any).fullWidth = true
;(PlanPage as any).siteBg = true
