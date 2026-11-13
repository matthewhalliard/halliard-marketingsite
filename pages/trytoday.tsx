import Head from 'next/head'
import React, { useState } from 'react'
import Link from 'next/link'
import { Button } from '../components/mmm/Button'
import { Container } from '../components/mmm/Container'
import { HeroBackdrop, LandingHeader, SIGN_UP_URL } from '../components/landing/kit'
import { trackPixel } from '@/lib/meta-pixel'

// A demo request form, and the thank-you it turns into. Not for search.
function TryToday() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [company, setCompany] = useState('')
  const [role, setRole] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const isValid = name.trim() && email.trim() && company.trim() && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!isValid) return
    setSubmitting(true)
    try {
      await fetch('/api/lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name, email, company, role,
          source: 'trytoday',
          _subject: `Demo request from ${name} at ${company}`,
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
          name, email, company, role,
          source: 'trytoday',
        })
      }
      // Fire Meta Pixel Lead event
      trackPixel('Lead', { content_name: 'demo_request', source: 'trytoday' })
      setSubmitted(true)
    } catch {
      // Still show success — Formspark may have received it
      setSubmitted(true)
    }
    setSubmitting(false)
  }

  if (submitted) {
    return (
      <>
        <Head>
          <title>Thanks | Halliard</title>
          <meta name="robots" content="noindex" />
        </Head>
        <LandingHeader href={SIGN_UP_URL} cta="Start planning free" />
        <main className="relative">
          <HeroBackdrop />
          <Container className="relative max-w-xl pt-32 pb-24 text-center lg:pt-40">
            <h1 className="font-display text-4xl font-medium tracking-tight text-slate-900 sm:text-5xl">
              You&rsquo;re all set.
            </h1>
            <p className="mt-4 text-lg text-slate-600">
              Matthew will reach out within 24 hours to schedule your demo.
            </p>
            <p className="mt-2 text-slate-500">
              In the meantime, you can start planning for free, with no credit card.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
              <Button href={SIGN_UP_URL} color="blue" className="px-6 py-3 text-base">
                Start planning free
              </Button>
              <Button href="/buying-desk" variant="outline" color="slate" className="px-6 py-3 text-base">
                See the buying desk
              </Button>
            </div>
            <p className="mt-6 text-sm">
              <Link href="/" className="text-primary hover:underline">
                Back to Halliard
              </Link>
            </p>
          </Container>
        </main>
      </>
    )
  }

  return (
    <>
      <Head>
        <title>Request a Demo | Halliard</title>
        <meta
          name="description"
          content="Request a demo of Halliard: media planning from a brief, a buying desk that buys and paces the plan, and measurement that proves what it did."
        />
        <meta name="robots" content="noindex" />
      </Head>
      <LandingHeader href="/demo" cta="Book a demo" />
      <main className="relative">
        <HeroBackdrop />
        <Container className="relative max-w-xl pt-32 pb-24 lg:pt-40">
          <div className="text-center mb-10">
            <h1 className="font-display text-4xl font-medium tracking-tight text-slate-900 sm:text-5xl">
              See Halliard in action
            </h1>
            <p className="mt-4 text-lg text-slate-600">
              A 20-minute walkthrough, tailored to your agency: a plan drafted from your brief, the buying desk, and
              how we measure what the media did.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5 rounded-2xl border border-tint bg-white p-6 shadow-lg shadow-primary/5 sm:p-8">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-slate-700 mb-1">
                Your name
              </label>
              <input
                id="name"
                type="text"
                required
                className="w-full border border-slate-300 rounded-lg px-4 py-3 text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                placeholder="Jane Smith"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-slate-700 mb-1">
                Work email
              </label>
              <input
                id="email"
                type="email"
                required
                className="w-full border border-slate-300 rounded-lg px-4 py-3 text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                placeholder="jane@agency.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div>
              <label htmlFor="company" className="block text-sm font-medium text-slate-700 mb-1">
                Agency or company
              </label>
              <input
                id="company"
                type="text"
                required
                className="w-full border border-slate-300 rounded-lg px-4 py-3 text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                placeholder="Acme Media"
                value={company}
                onChange={(e) => setCompany(e.target.value)}
              />
            </div>

            <div>
              <label htmlFor="role" className="block text-sm font-medium text-slate-700 mb-1">
                Your role <span className="text-slate-400">(optional)</span>
              </label>
              <input
                id="role"
                type="text"
                className="w-full border border-slate-300 rounded-lg px-4 py-3 text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                placeholder="Media Director"
                value={role}
                onChange={(e) => setRole(e.target.value)}
              />
            </div>

            <button
              type="submit"
              disabled={!isValid || submitting}
              className={`w-full rounded-full px-6 py-3 text-base font-semibold text-white transition-colors ${
                isValid && !submitting
                  ? 'bg-primary hover:bg-secondary cursor-pointer'
                  : 'bg-slate-300 cursor-not-allowed'
              }`}
            >
              {submitting ? 'Sending...' : 'Request a demo'}
            </button>

            <p className="text-center text-sm text-slate-500 mt-4">
              Or{' '}
              <a href={SIGN_UP_URL} className="text-primary font-medium hover:underline">
                start planning free
              </a>
              . No demo needed, no credit card.
            </p>
          </form>
        </Container>
      </main>
    </>
  )
}

;(TryToday as any).disableNavbar = true
;(TryToday as any).fullWidth = true
;(TryToday as any).siteBg = true

export default TryToday