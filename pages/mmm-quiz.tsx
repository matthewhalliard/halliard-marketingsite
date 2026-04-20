import Head from 'next/head'
import Link from 'next/link'
import React, { useEffect, useMemo, useRef, useState } from 'react'
import { Container } from '../components/mmm/Container'
import { QUIZ_QUESTIONS } from '../lib/mmm-quiz/questions'

const SIGN_UP_URL = 'https://app.halliardmedia.com/sign-up'
const BOOK_CALL_URL = 'https://www.halliardmedia.com/mmm#hero-form'

interface Narrative {
  profileSentence: string
  subScoreBlurbs: { data: string; mix: string; scale: string; measurement: string }
  topUnlocks: { title: string; body: string }[]
  ctaLine: string
}
interface QuizSummary {
  total: number
  subScores: { data: number; mix: number; scale: number; measurement: number }
  hardBlockers: string[]
  tier: { label: string; tone: 'strong' | 'emerging' | 'not_yet' }
  profile: {
    estimatedBudget: string
    isUrgent: boolean
    isQualified: boolean
    motivation: string
  }
}

type Stage = 'intro' | 'questions' | 'scoring' | 'result' | 'error'

const SCORING_STEPS = [
  'Reviewing your answers…',
  'Weighing data readiness…',
  'Benchmarking against 800+ quizzes…',
  'Generating your unlocks…',
  'Rendering your report…',
]

function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-sm border-b border-gray-100">
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
            <Link href="/mmm" className="text-sm font-medium text-slate-700 hover:text-slate-900">
              MMM →
            </Link>
          </div>
        </nav>
      </Container>
    </header>
  )
}

export default function MmmQuizPage() {
  const [stage, setStage] = useState<Stage>('intro')
  const [qIdx, setQIdx] = useState(0)
  const [answers, setAnswers] = useState<Record<string, string>>({})
  const [scoringStepIdx, setScoringStepIdx] = useState(0)
  const [summary, setSummary] = useState<QuizSummary | null>(null)
  const [narrative, setNarrative] = useState<Narrative | null>(null)
  const [pngDataUrl, setPngDataUrl] = useState<string | null>(null)
  const [errorMsg, setErrorMsg] = useState<string | null>(null)

  const [email, setEmail] = useState('')
  const [emailSubmitting, setEmailSubmitting] = useState(false)
  const [emailSubmitted, setEmailSubmitted] = useState(false)

  const utmRef = useRef<Record<string, string>>({})
  const scoringTimerRef = useRef<ReturnType<typeof setInterval> | null>(null)
  const resultRef = useRef<HTMLDivElement | null>(null)
  const startTimeRef = useRef<number>(Date.now())

  // Capture UTMs + fire page view
  useEffect(() => {
    if (typeof window === 'undefined') return
    const params = new URLSearchParams(window.location.search)
    const utms: Record<string, string> = {}
    for (const [k, v] of params.entries()) {
      if (k.startsWith('utm_') || k === 'gclid' || k === 'fbclid') utms[k] = v
    }
    utmRef.current = utms

    const ph = (window as any).posthog
    if (ph && Object.keys(utms).length > 0) {
      ph.register?.(utms)
      ph.people?.set_once?.({
        first_utm_source: utms.utm_source, first_utm_medium: utms.utm_medium,
        first_utm_campaign: utms.utm_campaign, first_utm_content: utms.utm_content,
        first_gclid: utms.gclid, first_landing_page: '/mmm-quiz',
      })
      ph.people?.set?.({
        last_utm_source: utms.utm_source, last_utm_medium: utms.utm_medium,
        last_utm_campaign: utms.utm_campaign, last_utm_content: utms.utm_content,
        last_landing_page: '/mmm-quiz',
      })
    }
    ph?.capture?.('mmm_quiz_page_viewed', { ...utms, landing_page: '/mmm-quiz' })
  }, [])

  const track = (event: string, props: Record<string, unknown> = {}) => {
    if (typeof window === 'undefined') return
    const ph = (window as any).posthog
    ph?.capture?.(event, { ...utmRef.current, ...props })
  }

  // Scoring animation
  useEffect(() => {
    if (stage !== 'scoring') {
      if (scoringTimerRef.current) clearInterval(scoringTimerRef.current)
      return
    }
    setScoringStepIdx(0)
    scoringTimerRef.current = setInterval(() => {
      setScoringStepIdx(i => Math.min(i + 1, SCORING_STEPS.length - 1))
    }, 800)
    return () => {
      if (scoringTimerRef.current) clearInterval(scoringTimerRef.current)
    }
  }, [stage])

  const currentQ = QUIZ_QUESTIONS[qIdx]
  const totalQ = QUIZ_QUESTIONS.length
  const progressPct = useMemo(() => Math.round((Object.keys(answers).length / totalQ) * 100), [answers, totalQ])

  const startQuiz = () => {
    startTimeRef.current = Date.now()
    track('mmm_quiz_started')
    setStage('questions')
    setQIdx(0)
  }

  const selectAnswer = async (optionId: string) => {
    const q = QUIZ_QUESTIONS[qIdx]
    const newAnswers = { ...answers, [q.id]: optionId }
    setAnswers(newAnswers)
    track('mmm_quiz_question_answered', {
      question_id: q.id,
      question_index: qIdx + 1,
      option_id: optionId,
      elapsed_ms: Date.now() - startTimeRef.current,
    })

    // Advance
    if (qIdx < totalQ - 1) {
      // small delay for micro-animation feel
      setTimeout(() => setQIdx(qIdx + 1), 160)
    } else {
      // last question — go to scoring
      setTimeout(() => submitQuiz(newAnswers), 200)
    }
  }

  const goBack = () => {
    if (qIdx > 0) setQIdx(qIdx - 1)
  }

  const submitQuiz = async (finalAnswers: Record<string, string>) => {
    setStage('scoring')
    track('mmm_quiz_completed', { total_time_ms: Date.now() - startTimeRef.current })

    const minTheaterMs = 3200
    const start = Date.now()
    try {
      const apiRes = await fetch('/api/mmm-quiz-result', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ answers: finalAnswers }),
      })
      if (!apiRes.ok) {
        const j = await apiRes.json().catch(() => ({}))
        throw new Error(j.error || `Request failed (${apiRes.status})`)
      }
      const data = await apiRes.json()

      track('mmm_quiz_result_ready', {
        total: data.summary?.total,
        tier: data.summary?.tier?.label,
        is_qualified: data.summary?.profile?.isQualified,
        is_urgent: data.summary?.profile?.isUrgent,
      })

      const wait = Math.max(0, minTheaterMs - (Date.now() - start))
      await new Promise(r => setTimeout(r, wait))

      setSummary(data.summary)
      setNarrative(data.narrative)
      setPngDataUrl(`data:${data.pngMime};base64,${data.pngBase64}`)
      setStage('result')
      setTimeout(() => resultRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 150)
    } catch (err: any) {
      console.error(err)
      track('mmm_quiz_scoring_failed', { error: String(err?.message || err).slice(0, 200) })
      setErrorMsg(err?.message || 'Something went wrong scoring your quiz.')
      setStage('error')
    }
  }

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return
    setEmailSubmitting(true)
    track('mmm_quiz_email_submit_started', { total: summary?.total, tier: summary?.tier?.label })
    try {
      await fetch('/api/lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email,
          source: 'mmm-quiz',
          total_score: summary?.total,
          tier: summary?.tier?.label,
          is_qualified: summary?.profile?.isQualified,
          estimated_budget: summary?.profile?.estimatedBudget,
          ...utmRef.current,
          _subject: `MMM Quiz lead: ${email} — score ${summary?.total}/100 (${summary?.tier?.label})`,
        }),
      })
      if (typeof window !== 'undefined' && (window as any).gtag) {
        ;(window as any).gtag('event', 'conversion', {
          send_to: 'AW-672346912/qEmHCJ6L_pgcEKDmzMAC',
          value: summary?.profile?.isQualified ? 400.0 : 100.0,
          currency: 'USD',
        })
      }
      track('mmm_quiz_email_captured', {
        total: summary?.total, tier: summary?.tier?.label,
        is_qualified: summary?.profile?.isQualified,
      })
      if (typeof window !== 'undefined' && (window as any).posthog) {
        ;(window as any).posthog.identify?.(email, {
          email,
          first_email_source: 'mmm-quiz',
          first_mmm_quiz_score: summary?.total,
          first_mmm_quiz_tier: summary?.tier?.label,
        })
      }
      setEmailSubmitted(true)
    } catch {
      setEmailSubmitted(true)
    }
    setEmailSubmitting(false)
  }

  const bookCallClick = (location: string) => () => {
    track('mmm_quiz_book_call_clicked', { location, total: summary?.total, tier: summary?.tier?.label })
  }

  return (
    <>
      <Head>
        <title>Is Your Marketing Ready for MMM? | Halliard Readiness Quiz</title>
        <meta name="description" content="Take the 2-minute MMM Readiness Quiz. Get your score, a personalized report, and the top 3 things to unlock before you invest in marketing mix modeling." />
        <meta property="og:title" content="MMM Readiness Quiz | Halliard" />
        <meta property="og:description" content="Take the 2-minute quiz. Get your MMM readiness score and a personalized report." />
      </Head>
      <Header />
      <main className="pt-28 pb-24 bg-gradient-to-b from-white via-slate-50 to-white min-h-screen">
        {/* INTRO */}
        {stage === 'intro' && (
          <Container className="max-w-2xl">
            <div className="text-center">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-semibold tracking-wide mb-6 uppercase">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                Free · 2 minutes · No signup required
              </div>
              <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-medium tracking-tight text-slate-900 leading-[1.05]">
                Is your marketing ready<br />
                for <span className="text-primary">MMM?</span>
              </h1>
              <p className="mt-6 text-lg text-slate-600 max-w-xl mx-auto">
                10 quick questions. Get a personalized <strong>readiness score</strong>, the 3 things
                you should unlock before investing in marketing mix modeling, and a peer
                benchmark vs. 800+ other advertisers.
              </p>
              <button
                onClick={startQuiz}
                className="mt-10 inline-flex items-center justify-center px-8 py-4 rounded-xl bg-primary text-white text-base font-semibold hover:bg-secondary transition-colors shadow-lg shadow-blue-500/20"
              >
                Start the quiz →
              </button>
              <p className="mt-4 text-xs text-slate-400">
                No email required to see your score. Most people finish in under 2 minutes.
              </p>
            </div>

            <div className="mt-16 grid grid-cols-1 sm:grid-cols-3 gap-5">
              <Feature num="1" title="Answer 10 questions" body="All multiple-choice. No data uploads, no free text. Takes under 2 minutes." />
              <Feature num="2" title="Get your score" body="Personalized MMM readiness score across 4 dimensions: data, mix, scale, measurement." />
              <Feature num="3" title="See your unlocks" body="The 3 specific things we'd fix to get you ready for an MMM engagement." />
            </div>
          </Container>
        )}

        {/* QUESTIONS */}
        {stage === 'questions' && currentQ && (
          <Container className="max-w-2xl">
            {/* Progress */}
            <div className="mb-8">
              <div className="flex items-center justify-between text-xs font-semibold text-slate-500 mb-2 tracking-wide">
                <span>Question {qIdx + 1} of {totalQ}</span>
                <span>{progressPct}%</span>
              </div>
              <div className="h-1.5 rounded-full bg-slate-200 overflow-hidden">
                <div
                  className="h-full bg-primary transition-all duration-300 ease-out"
                  style={{ width: `${((qIdx + 1) / totalQ) * 100}%` }}
                />
              </div>
            </div>

            <div className="bg-white rounded-2xl border border-slate-200 shadow-lg shadow-slate-200/30 p-8 sm:p-10">
              <h2 className="font-display text-2xl sm:text-3xl font-medium tracking-tight text-slate-900">
                {currentQ.prompt}
              </h2>
              {currentQ.helper && (
                <p className="mt-3 text-sm text-slate-500">{currentQ.helper}</p>
              )}

              <div className="mt-7 space-y-3">
                {currentQ.options.map(opt => {
                  const isSelected = answers[currentQ.id] === opt.id
                  return (
                    <button
                      key={opt.id}
                      onClick={() => selectAnswer(opt.id)}
                      className={`w-full text-left px-5 py-4 rounded-xl border-2 transition-all duration-150 ${
                        isSelected
                          ? 'border-primary bg-blue-50 text-slate-900'
                          : 'border-slate-200 bg-white text-slate-700 hover:border-slate-300 hover:bg-slate-50'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div className={`w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 border-2 transition-colors ${
                          isSelected ? 'border-primary bg-primary' : 'border-slate-300 bg-white'
                        }`}>
                          {isSelected && (
                            <svg viewBox="0 0 20 20" fill="white" className="w-3 h-3">
                              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 00-1.414 0L8 12.586 4.707 9.293a1 1 0 10-1.414 1.414l4 4a1 1 0 001.414 0l8-8a1 1 0 000-1.414z" clipRule="evenodd" />
                            </svg>
                          )}
                        </div>
                        <span className="text-base font-medium">{opt.label}</span>
                      </div>
                    </button>
                  )
                })}
              </div>
            </div>

            <div className="mt-6 flex items-center justify-between">
              <button
                onClick={goBack}
                disabled={qIdx === 0}
                className={`text-sm font-medium transition-colors ${
                  qIdx === 0 ? 'text-slate-300 cursor-not-allowed' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                ← Back
              </button>
              <div className="text-xs text-slate-400">
                Your answers are not saved until you submit an email at the end.
              </div>
            </div>
          </Container>
        )}

        {/* SCORING THEATER */}
        {stage === 'scoring' && (
          <Container className="max-w-2xl mt-8">
            <div className="bg-white rounded-2xl border border-slate-200 shadow-lg shadow-slate-200/30 p-8 sm:p-10">
              <div className="flex items-center gap-3 mb-7">
                <div className="w-8 h-8 rounded-full border-2 border-primary border-t-transparent animate-spin" />
                <div className="text-slate-900 font-medium">Scoring your quiz…</div>
              </div>
              <ul className="space-y-3">
                {SCORING_STEPS.map((step, i) => {
                  const done = i < scoringStepIdx
                  const active = i === scoringStepIdx
                  return (
                    <li key={step} className="flex items-center gap-3">
                      <div className={`w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 transition-colors ${
                        done ? 'bg-green-500 text-white' : active ? 'bg-blue-100 text-blue-600' : 'bg-slate-100 text-slate-400'
                      }`}>
                        {done ? (
                          <svg viewBox="0 0 20 20" fill="currentColor" className="w-3.5 h-3.5"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 00-1.414 0L8 12.586 4.707 9.293a1 1 0 10-1.414 1.414l4 4a1 1 0 001.414 0l8-8a1 1 0 000-1.414z" clipRule="evenodd" /></svg>
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
        {stage === 'result' && summary && narrative && pngDataUrl && (
          <div ref={resultRef}>
            <Container className="max-w-5xl">
              <div className="text-center mb-8">
                <div className="inline-block px-3 py-1 rounded-full bg-green-50 text-green-700 text-xs font-semibold tracking-wide uppercase mb-3">
                  ✓ Your score is ready
                </div>
                <h2 className="font-display text-3xl sm:text-4xl font-medium tracking-tight text-slate-900">
                  You scored <span className={
                    summary.tier.tone === 'strong' ? 'text-blue-600' :
                    summary.tier.tone === 'emerging' ? 'text-amber-600' : 'text-red-600'
                  }>{summary.total}/100</span> — {summary.tier.label}
                </h2>
                <p className="mt-3 text-lg text-slate-600 max-w-2xl mx-auto">
                  {narrative.profileSentence}
                </p>
              </div>

              {/* Score card PNG */}
              <div className="rounded-2xl overflow-hidden shadow-2xl shadow-slate-900/20 bg-slate-900">
                <img src={pngDataUrl} alt={`MMM Readiness Report — ${summary.total}/100`} className="w-full h-auto block" />
              </div>

              {/* CTA + email capture */}
              <div className="mt-10 bg-gradient-to-br from-primary to-secondary rounded-2xl p-8 sm:p-10 text-white">
                {!emailSubmitted ? (
                  <>
                    <h3 className="font-display text-2xl sm:text-3xl font-medium tracking-tight">
                      {summary.profile.isQualified
                        ? "Let's build your MMM."
                        : "Get the detailed report."}
                    </h3>
                    <p className="mt-2 text-white/80 text-lg">
                      {narrative.ctaLine}
                    </p>

                    <div className="mt-6 flex flex-col sm:flex-row gap-3">
                      {summary.profile.isQualified ? (
                        <a
                          href={BOOK_CALL_URL}
                          onClick={bookCallClick('results_primary')}
                          className="inline-flex items-center justify-center px-6 py-3 rounded-xl bg-white text-primary font-semibold hover:bg-slate-100 transition-colors"
                        >
                          Book a 20-min scoping call →
                        </a>
                      ) : (
                        <a
                          href="#email-form"
                          className="inline-flex items-center justify-center px-6 py-3 rounded-xl bg-white text-primary font-semibold hover:bg-slate-100 transition-colors"
                        >
                          Get the full report →
                        </a>
                      )}
                    </div>

                    <div id="email-form" className="mt-8 pt-8 border-t border-white/20">
                      <p className="text-sm text-white/70 mb-3">
                        Email me a PDF copy of this report — plus a peer benchmark against advertisers like you.
                      </p>
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
                          {emailSubmitting ? 'Sending…' : 'Email me the report'}
                        </button>
                      </form>
                    </div>
                  </>
                ) : (
                  <div className="text-center py-4">
                    <div className="text-4xl mb-3">📬</div>
                    <h3 className="font-display text-2xl font-medium">Report sent.</h3>
                    <p className="mt-2 text-white/80">
                      Check <strong>{email}</strong> for your MMM readiness report.
                    </p>
                    {summary.profile.isQualified && (
                      <a
                        href={BOOK_CALL_URL}
                        onClick={bookCallClick('after_email_capture')}
                        className="mt-6 inline-flex items-center justify-center px-6 py-3 rounded-xl bg-white text-primary font-semibold hover:bg-slate-100 transition-colors"
                      >
                        Book a scoping call →
                      </a>
                    )}
                  </div>
                )}
              </div>

              {/* Unlocks detail */}
              <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-5">
                {narrative.topUnlocks.map((u, i) => (
                  <div key={i} className="bg-white rounded-xl border border-slate-200 p-6">
                    <div className="w-8 h-8 rounded-full bg-primary/10 text-primary font-bold flex items-center justify-center mb-4">
                      {i + 1}
                    </div>
                    <h4 className="font-display text-lg font-medium text-slate-900 mb-2">{u.title}</h4>
                    <p className="text-slate-600 text-sm leading-relaxed">{u.body}</p>
                  </div>
                ))}
              </div>

              <div className="mt-12 text-center">
                <button
                  onClick={() => {
                    track('mmm_quiz_retake_clicked', { previous_total: summary.total })
                    setStage('intro'); setAnswers({}); setQIdx(0); setSummary(null); setNarrative(null); setPngDataUrl(null); setEmail(''); setEmailSubmitted(false)
                    window.scrollTo({ top: 0, behavior: 'smooth' })
                  }}
                  className="text-sm text-slate-600 hover:text-slate-900 underline underline-offset-4"
                >
                  ← Retake the quiz
                </button>
              </div>
            </Container>
          </div>
        )}

        {/* ERROR */}
        {stage === 'error' && (
          <Container className="max-w-xl text-center">
            <div className="text-5xl mb-4">⚠️</div>
            <h2 className="font-display text-2xl font-medium text-slate-900">Something broke.</h2>
            <p className="mt-3 text-slate-600">{errorMsg}</p>
            <button
              onClick={() => { setStage('intro'); setAnswers({}); setQIdx(0); setErrorMsg(null) }}
              className="mt-6 inline-flex items-center justify-center px-6 py-3 rounded-xl bg-primary text-white font-semibold hover:bg-secondary transition-colors"
            >
              Try again
            </button>
          </Container>
        )}
      </main>
    </>
  )
}

function Feature({ num, title, body }: { num: string; title: string; body: string }) {
  return (
    <div className="bg-white rounded-xl border border-slate-200 p-6">
      <div className="w-8 h-8 rounded-full bg-primary/10 text-primary font-bold flex items-center justify-center mb-4">
        {num}
      </div>
      <h3 className="font-display text-base font-medium text-slate-900 mb-2">{title}</h3>
      <p className="text-slate-600 text-sm leading-relaxed">{body}</p>
    </div>
  )
}

;(MmmQuizPage as any).disableNavbar = true
;(MmmQuizPage as any).fullWidth = true
;(MmmQuizPage as any).siteBg = true
