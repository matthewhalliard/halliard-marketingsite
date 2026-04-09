import Head from 'next/head'
import Link from 'next/link'
import { useState } from 'react'

function Logo() {
  return (
    <Link href="/" className="flex items-center">
      <img src="/halliard-logo.png" alt="Halliard" className="h-7 w-auto" />
    </Link>
  )
}

function CheckIcon() {
  return (
    <svg className="h-5 w-5 text-blue-400 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
    </svg>
  )
}

function ChartIcon() {
  return (
    <svg className="h-12 w-12 text-blue-400" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" />
    </svg>
  )
}

function EyeIcon() {
  return (
    <svg className="h-12 w-12 text-blue-400" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
  )
}

function TargetIcon() {
  return (
    <svg className="h-12 w-12 text-blue-400" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9 9 0 100-18 9 9 0 000 18z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 15a3 3 0 100-6 3 3 0 000 6z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 12h.01" />
    </svg>
  )
}

export default function OOHLanding() {
  const [submitted, setSubmitted] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [form, setForm] = useState({
    name: '',
    email: '',
    company: '',
    monthly_ooh_spend: '',
    markets: '',
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitting(true)
    try {
      await fetch('/api/lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...form,
          source: 'ooh-landing',
          _subject: `OOH Impact Request: ${form.company}`,
        }),
      })
      // Fire Google Ads conversion
      if (typeof window !== 'undefined' && (window as any).gtag) {
        (window as any).gtag('event', 'conversion', {
          'send_to': 'AW-672346912/qEmHCJ6L_pgcEKDmzMAC',
          'value': 200.0,
          'currency': 'USD',
        })
      }
      // Fire PostHog event
      if (typeof window !== 'undefined' && (window as any).posthog) {
        (window as any).posthog.capture('demo_request_submitted', {
          ...form,
          source: 'ooh-landing',
        })
      }
      setSubmitted(true)
    } catch {
      alert('Something went wrong. Please try again.')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <>
      <Head>
        <title>Prove Your OOH Spend Works | Halliard</title>
        <meta
          name="description"
          content="Can't prove your billboard and outdoor advertising ROI? Get a free OOH Impact Snapshot powered by Marketing Mix Modeling. No pixels, no tracking — just math."
        />
      </Head>

      {/* Hero */}
      <section className="relative overflow-hidden bg-slate-900 pt-8 pb-20 sm:pt-12 sm:pb-32">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_rgba(59,130,246,0.15),_transparent_60%)]" />

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Nav */}
          <nav className="flex items-center justify-between pb-16 sm:pb-24">
            <Logo />
          </nav>

          <div className="lg:grid lg:grid-cols-2 lg:gap-16 items-center">
            {/* Left: Copy */}
            <div>
              <p className="text-sm font-semibold uppercase tracking-widest text-blue-400 mb-4">
                OOH Attribution
              </p>
              <h1 className="font-display text-4xl font-medium tracking-tight text-white sm:text-5xl lg:text-6xl">
                You're spending on billboards.{' '}
                <span className="text-blue-400">Can you prove it's working?</span>
              </h1>
              <p className="mt-6 text-lg text-slate-300 max-w-xl">
                Out-of-home is the last major channel with no click-through attribution. 
                Your CFO asks for proof, and you've got nothing but reach estimates and gut feel.
              </p>
              <p className="mt-4 text-lg text-slate-300 max-w-xl">
                We fix that. Using Marketing Mix Modeling, we isolate the real business impact 
                of your OOH spend — no pixels, no tracking, no guesswork. Just math.
              </p>

              <div className="mt-10 space-y-4">
                <div className="flex items-start gap-3">
                  <CheckIcon />
                  <span className="text-slate-200">Works with billboard, DOOH, transit, and any offline channel</span>
                </div>
                <div className="flex items-start gap-3">
                  <CheckIcon />
                  <span className="text-slate-200">No new tracking or pixels required — uses your existing data</span>
                </div>
                <div className="flex items-start gap-3">
                  <CheckIcon />
                  <span className="text-slate-200">See exactly how much revenue your OOH spend is driving</span>
                </div>
              </div>
            </div>

            {/* Right: Form */}
            <div className="mt-12 lg:mt-0">
              <div className="rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 p-8 sm:p-10">
                {submitted ? (
                  <div className="text-center py-8">
                    <div className="mx-auto w-16 h-16 bg-blue-500/20 rounded-full flex items-center justify-center mb-6">
                      <svg className="h-8 w-8 text-blue-400" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                      </svg>
                    </div>
                    <h3 className="font-display text-2xl font-medium text-white">
                      We're on it.
                    </h3>
                    <p className="mt-3 text-slate-300">
                      We'll review your info and send your OOH Impact Snapshot within 48 hours.
                    </p>
                  </div>
                ) : (
                  <>
                    <h2 className="font-display text-2xl font-medium text-white mb-2">
                      Get Your Free OOH Impact Snapshot
                    </h2>
                    <p className="text-sm text-slate-400 mb-8">
                      A personalized directional analysis of your outdoor spend's business impact.
                    </p>

                    <form onSubmit={handleSubmit} className="space-y-5">
                      <div>
                        <label htmlFor="name" className="block text-sm font-medium text-slate-300 mb-1.5">
                          Name
                        </label>
                        <input
                          id="name"
                          type="text"
                          required
                          value={form.name}
                          onChange={(e) => setForm({ ...form, name: e.target.value })}
                          className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-white placeholder-slate-500 focus:border-blue-500 focus:ring-blue-500 focus:ring-1"
                          placeholder="Jane Smith"
                        />
                      </div>

                      <div>
                        <label htmlFor="email" className="block text-sm font-medium text-slate-300 mb-1.5">
                          Work Email
                        </label>
                        <input
                          id="email"
                          type="email"
                          required
                          value={form.email}
                          onChange={(e) => setForm({ ...form, email: e.target.value })}
                          className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-white placeholder-slate-500 focus:border-blue-500 focus:ring-blue-500 focus:ring-1"
                          placeholder="jane@agency.com"
                        />
                      </div>

                      <div>
                        <label htmlFor="company" className="block text-sm font-medium text-slate-300 mb-1.5">
                          Company
                        </label>
                        <input
                          id="company"
                          type="text"
                          required
                          value={form.company}
                          onChange={(e) => setForm({ ...form, company: e.target.value })}
                          className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-white placeholder-slate-500 focus:border-blue-500 focus:ring-blue-500 focus:ring-1"
                          placeholder="Acme Media"
                        />
                      </div>

                      <div>
                        <label htmlFor="spend" className="block text-sm font-medium text-slate-300 mb-1.5">
                          Monthly OOH Spend (approx.)
                        </label>
                        <select
                          id="spend"
                          required
                          value={form.monthly_ooh_spend}
                          onChange={(e) => setForm({ ...form, monthly_ooh_spend: e.target.value })}
                          className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-white focus:border-blue-500 focus:ring-blue-500 focus:ring-1 [&>option]:bg-slate-800"
                        >
                          <option value="" disabled>Select range</option>
                          <option value="<25k">Under $25,000</option>
                          <option value="25k-50k">$25,000 – $50,000</option>
                          <option value="50k-100k">$50,000 – $100,000</option>
                          <option value="100k-250k">$100,000 – $250,000</option>
                          <option value="250k+">$250,000+</option>
                        </select>
                      </div>

                      <div>
                        <label htmlFor="markets" className="block text-sm font-medium text-slate-300 mb-1.5">
                          Markets (optional)
                        </label>
                        <input
                          id="markets"
                          type="text"
                          value={form.markets}
                          onChange={(e) => setForm({ ...form, markets: e.target.value })}
                          className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-white placeholder-slate-500 focus:border-blue-500 focus:ring-blue-500 focus:ring-1"
                          placeholder="NYC, LA, Chicago..."
                        />
                      </div>

                      <button
                        type="submit"
                        disabled={submitting}
                        className="w-full rounded-lg bg-blue-600 px-4 py-3.5 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                      >
                        {submitting ? 'Sending...' : 'Get My Free OOH Impact Snapshot →'}
                      </button>

                      <p className="text-xs text-slate-500 text-center mt-3">
                        No spam, no sales calls. We'll send your snapshot within 48 hours.
                      </p>
                    </form>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 sm:py-28 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-display text-3xl font-medium tracking-tight text-slate-900 sm:text-4xl">
              How we measure the unmeasurable
            </h2>
            <p className="mt-4 text-lg text-slate-600 max-w-2xl mx-auto">
              Marketing Mix Modeling uses statistical analysis to isolate the impact of each channel — 
              including offline channels that can't be tracked with clicks or pixels.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 lg:gap-12">
            <div className="text-center">
              <div className="mx-auto w-20 h-20 bg-blue-50 rounded-2xl flex items-center justify-center mb-6">
                <EyeIcon />
              </div>
              <h3 className="font-display text-xl font-medium text-slate-900 mb-3">
                1. We analyze your data
              </h3>
              <p className="text-slate-600">
                Share your media spend by channel and your business outcomes (sales, leads, web traffic). 
                No tracking pixels needed — just the data you already have.
              </p>
            </div>

            <div className="text-center">
              <div className="mx-auto w-20 h-20 bg-blue-50 rounded-2xl flex items-center justify-center mb-6">
                <ChartIcon />
              </div>
              <h3 className="font-display text-xl font-medium text-slate-900 mb-3">
                2. We isolate OOH's impact
              </h3>
              <p className="text-slate-600">
                Our model separates the contribution of every channel — including billboards, transit, 
                and DOOH — from seasonality, trends, and other factors.
              </p>
            </div>

            <div className="text-center">
              <div className="mx-auto w-20 h-20 bg-blue-50 rounded-2xl flex items-center justify-center mb-6">
                <TargetIcon />
              </div>
              <h3 className="font-display text-xl font-medium text-slate-900 mb-3">
                3. You get proof
              </h3>
              <p className="text-slate-600">
                A clear report showing how much revenue your OOH spend is generating, 
                your cost per incremental outcome, and where to reallocate for maximum ROI.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Pain Points */}
      <section className="py-20 sm:py-28 bg-slate-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="lg:grid lg:grid-cols-2 lg:gap-16 items-center">
            <div>
              <h2 className="font-display text-3xl font-medium tracking-tight text-slate-900 sm:text-4xl">
                Sound familiar?
              </h2>
              <div className="mt-8 space-y-6">
                {[
                  '"We spend $200K/month on billboards but I can\'t tell the CFO what it\'s doing."',
                  '"Our digital team shows ROAS dashboards. OOH just shows impressions and reach."',
                  '"We think our outdoor is working but we can\'t prove it — so it\'s first on the chopping block."',
                  '"We tried geo-lift tests but they\'re expensive and take months."',
                ].map((quote, i) => (
                  <div key={i} className="flex gap-4 items-start">
                    <span className="text-2xl text-blue-400 font-serif leading-none mt-1">"</span>
                    <p className="text-lg text-slate-700 italic">{quote}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-12 lg:mt-0 bg-white rounded-2xl p-8 sm:p-10 shadow-sm border border-slate-200">
              <h3 className="font-display text-xl font-medium text-slate-900 mb-6">
                What you get in the free snapshot:
              </h3>
              <ul className="space-y-4">
                {[
                  'Directional estimate of your OOH contribution to business outcomes',
                  'Benchmarks from comparable advertisers in your category',
                  'Preliminary view of channel-level efficiency',
                  'Recommendations for a full MMM engagement',
                ].map((item, i) => (
                  <li key={i} className="flex gap-3 items-start">
                    <svg className="h-5 w-5 text-blue-600 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                    </svg>
                    <span className="text-slate-700">{item}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-8 pt-6 border-t border-slate-100">
                <p className="text-sm text-slate-500">
                  The full MMM engagement goes deeper — your actual spend data, multi-touch modeling, 
                  optimization scenarios, and ongoing measurement. The snapshot shows you what's possible.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="py-20 sm:py-28 bg-slate-900">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-display text-3xl font-medium tracking-tight text-white sm:text-4xl">
            Stop guessing. Start proving.
          </h2>
          <p className="mt-4 text-lg text-slate-300">
            Get a free OOH Impact Snapshot and see what your billboard spend is actually doing for your business.
          </p>
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault()
              window.scrollTo({ top: 0, behavior: 'smooth' })
            }}
            className="mt-8 inline-flex items-center rounded-lg bg-blue-600 px-6 py-3.5 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 transition-colors"
          >
            Get Your Free Snapshot →
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 bg-slate-950 border-t border-white/5">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          <span className="text-sm text-slate-500">© {new Date().getFullYear()} Halliard Media Inc.</span>
          <Link href="/" className="text-sm text-slate-500 hover:text-slate-400">
            halliardmedia.com
          </Link>
        </div>
      </footer>
    </>
  )
}

(OOHLanding as any).disableNavbar = true;
(OOHLanding as any).fullWidth = true;
(OOHLanding as any).siteBg = false;
