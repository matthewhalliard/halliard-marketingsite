import Head from 'next/head'
import React, { useState } from 'react'
import Link from 'next/link'
import { Button } from '../components/mmm/Button'
import { Container } from '../components/mmm/Container'

const SIGN_UP_URL = 'https://app.halliardmedia.com/sign-up'

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

export default function TryToday() {
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
          <title>Thanks! | Halliard</title>
        </Head>
        <Header />
        <main className="pt-32 pb-20">
          <Container className="max-w-xl text-center">
            <div className="text-5xl mb-6">🎉</div>
            <h1 className="font-display text-4xl font-medium tracking-tight text-slate-900">
              You're all set!
            </h1>
            <p className="mt-4 text-lg text-slate-600">
              Matthew will reach out within 24 hours to schedule your personalized demo.
            </p>
            <p className="mt-2 text-slate-500">
              In the meantime, you can start planning for free — no credit card required.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
              <Button href={SIGN_UP_URL} color="blue" className="">
                Start Planning Free
              </Button>
              <Button href="/media-planning-tool" variant="outline" color="slate" className="">
                ← Back to Features
              </Button>
            </div>
          </Container>
        </main>
      </>
    )
  }

  return (
    <>
      <Head>
        <title>See Halliard In Action | Request a Demo</title>
        <meta
          name="description"
          content="Request a personalized demo of Halliard's media planning platform. See flowcharting, scenario comparison, and measurement in action."
        />
      </Head>
      <Header />
      <main className="pt-32 pb-20">
        <Container className="max-w-xl">
          <div className="text-center mb-10">
            <h1 className="font-display text-4xl font-medium tracking-tight text-slate-900 sm:text-5xl">
              See Halliard in action
            </h1>
            <p className="mt-4 text-lg text-slate-600">
              Get a 20-minute personalized walkthrough of the platform. We'll show you
              flowcharting, scenario comparison, and measurement — tailored to your agency.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
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
                Agency / Company
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
              className={`w-full rounded-lg px-6 py-3 text-base font-semibold text-white transition-colors ${
                isValid && !submitting
                  ? 'bg-primary hover:bg-secondary cursor-pointer'
                  : 'bg-slate-300 cursor-not-allowed'
              }`}
            >
              {submitting ? 'Sending...' : 'Request a Demo'}
            </button>

            <p className="text-center text-sm text-slate-500 mt-4">
              Or{' '}
              <a href={SIGN_UP_URL} className="text-primary font-medium hover:underline">
                start planning free
              </a>{' '}
              — no demo needed, no credit card required.
            </p>
          </form>
        </Container>
      </main>
    </>
  )
}

(TryToday as any).disableNavbar = true;
(TryToday as any).fullWidth = true;
(TryToday as any).siteBg = true;