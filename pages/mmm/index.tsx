import Head from 'next/head'
import Link from 'next/link'
import { useState } from 'react'
import { Container } from '../../components/mmm/Container'
import {
  ExclamationTriangleIcon,
  CurrencyDollarIcon,
  QuestionMarkCircleIcon,
} from '@heroicons/react/24/outline'

const PLUS_PATTERN = "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%231a6ab4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")"

/* ─── Inline Lead Capture Form ─── */
function LeadCaptureForm({ id, heading, subheading }: { id?: string; heading?: string; subheading?: string }) {
  const [submitted, setSubmitted] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [form, setForm] = useState({
    name: '',
    email: '',
    company: '',
    monthly_media_spend: '',
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
          source: 'mmm-landing',
          _subject: `MMM Channel Efficiency Request: ${form.company}`,
        }),
      })
      // Fire Google Ads conversion
      if (typeof window !== 'undefined' && (window as any).gtag) {
        (window as any).gtag('event', 'conversion', {
          send_to: 'AW-672346912/qEmHCJ6L_pgcEKDmzMAC',
          value: 200.0,
          currency: 'USD',
        })
      }
      // Fire PostHog event
      if (typeof window !== 'undefined' && (window as any).posthog) {
        (window as any).posthog.capture('demo_request_submitted', {
          ...form,
          source: 'mmm-landing',
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
    <div id={id} className="rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 p-8 sm:p-10">
      {submitted ? (
        <div className="text-center py-8">
          <div className="mx-auto w-16 h-16 bg-blue-500/20 rounded-full flex items-center justify-center mb-6">
            <svg className="h-8 w-8 text-blue-400" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
            </svg>
          </div>
          <h3 className="font-display text-2xl font-medium text-white">We&rsquo;re on it.</h3>
          <p className="mt-3 text-slate-300">We&rsquo;ll review your info and send a preliminary channel efficiency analysis within 48 hours.</p>
        </div>
      ) : (
        <>
          <h2 className="font-display text-2xl font-medium text-white mb-2">
            {heading || 'Get Your Free Channel Efficiency Analysis'}
          </h2>
          <p className="text-sm text-slate-400 mb-8">
            {subheading || 'See where your media dollars are working - and where they\'re wasted.'}
          </p>
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label htmlFor={`${id}-name`} className="block text-sm font-medium text-slate-300 mb-1.5">Name</label>
              <input
                id={`${id}-name`}
                type="text"
                required
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-white placeholder-slate-500 focus:border-blue-500 focus:ring-blue-500 focus:ring-1"
                placeholder="Jane Smith"
              />
            </div>
            <div>
              <label htmlFor={`${id}-email`} className="block text-sm font-medium text-slate-300 mb-1.5">Work Email</label>
              <input
                id={`${id}-email`}
                type="email"
                required
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-white placeholder-slate-500 focus:border-blue-500 focus:ring-blue-500 focus:ring-1"
                placeholder="jane@agency.com"
              />
            </div>
            <div>
              <label htmlFor={`${id}-company`} className="block text-sm font-medium text-slate-300 mb-1.5">Company</label>
              <input
                id={`${id}-company`}
                type="text"
                required
                value={form.company}
                onChange={(e) => setForm({ ...form, company: e.target.value })}
                className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-white placeholder-slate-500 focus:border-blue-500 focus:ring-blue-500 focus:ring-1"
                placeholder="Acme Media"
              />
            </div>
            <div>
              <label htmlFor={`${id}-spend`} className="block text-sm font-medium text-slate-300 mb-1.5">Monthly Media Spend (approx.)</label>
              <select
                id={`${id}-spend`}
                required
                value={form.monthly_media_spend}
                onChange={(e) => setForm({ ...form, monthly_media_spend: e.target.value })}
                className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-white focus:border-blue-500 focus:ring-blue-500 focus:ring-1 [&>option]:bg-slate-800"
              >
                <option value="" disabled>Select range</option>
                <option value="<50k">Under $50,000</option>
                <option value="50k-100k">$50,000 - $100,000</option>
                <option value="100k-250k">$100,000 - $250,000</option>
                <option value="250k-500k">$250,000 - $500,000</option>
                <option value="500k-1m">$500,000 - $1M</option>
                <option value="1m+">$1M+</option>
              </select>
            </div>
            <button
              type="submit"
              disabled={submitting}
              className="w-full rounded-lg bg-blue-600 px-4 py-3.5 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {submitting ? 'Sending...' : 'Get My Free Channel Efficiency Analysis →'}
            </button>
            <p className="text-xs text-slate-500 text-center mt-3">No spam, no sales calls. We&rsquo;ll send your analysis within 48 hours.</p>
          </form>
        </>
      )}
    </div>
  )
}

/* ─── Header ─── */
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
        </nav>
      </Container>
    </header>
  )
}

/* ─── Hero with inline form ─── */
function Hero() {
  return (
    <div className="relative overflow-hidden bg-slate-900">
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_rgba(59,130,246,0.15),_transparent_60%)]" />

      <div className="relative">
        <Container className="pt-32 pb-20 lg:pt-40 lg:pb-28">
          <div className="lg:grid lg:grid-cols-2 lg:gap-16 items-center">
            {/* Left: Copy */}
            <div>
              <p className="inline-flex items-center gap-2 rounded-full bg-blue-500/10 border border-blue-500/20 px-4 py-1.5 text-sm font-medium text-blue-400 mb-6">
                📊 Causal Marketing Mix Modeling
              </p>
              <h1 className="font-display text-4xl font-medium tracking-tight text-white sm:text-5xl lg:text-6xl">
                Marketing Mix Modeling at{' '}
                <span className="text-blue-400">1/10th the Cost</span>
              </h1>
              <p className="mx-auto mt-6 max-w-2xl text-lg text-slate-300">
                Not correlation - <strong className="text-white">causation.</strong> Traditional MMM costs $50-250K and takes 3-6 months.
                Halliard delivers causal MMM for <strong className="text-white">$25K</strong>, model in hand in <strong className="text-white">3-4 weeks</strong> - built for independent agencies, not just Fortune 500s.
              </p>

              <div className="mt-10 space-y-4">
                <div className="flex items-start gap-3">
                  <svg className="h-5 w-5 text-blue-400 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                  </svg>
                  <span className="text-slate-200">Causal inference - isolates true channel impact, not just correlations</span>
                </div>
                <div className="flex items-start gap-3">
                  <svg className="h-5 w-5 text-blue-400 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                  </svg>
                  <span className="text-slate-200">Model delivered in 3-4 weeks, not 3-6 months</span>
                </div>
                <div className="flex items-start gap-3">
                  <svg className="h-5 w-5 text-blue-400 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                  </svg>
                  <span className="text-slate-200">$25K transparent pricing - no "request a demo" gatekeeping</span>
                </div>
              </div>
            </div>

            {/* Right: Form */}
            <div className="mt-12 lg:mt-0">
              <LeadCaptureForm id="hero-form" />
            </div>
          </div>
        </Container>
      </div>
    </div>
  )
}

/* ─── Stats Section ─── */
function StatsSection() {
  const stats = [
    { number: '6', label: 'Models Delivered', sublabel: 'across real agency clients' },
    { number: '$200K+', label: 'Misallocated Spend Found', sublabel: 'reallocated to channels that work' },
    { number: '3-4 wks', label: 'Model Turnaround', sublabel: 'not 3-6 months' },
  ]

  return (
    <section className="py-16 sm:py-20 bg-white border-b border-slate-100">
      <Container className="">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-3">
          {stats.map((stat) => (
            <div key={stat.label} className="text-center">
              <p className="font-display text-4xl sm:text-5xl font-bold text-primary">{stat.number}</p>
              <p className="mt-2 text-lg font-semibold text-slate-900">{stat.label}</p>
              <p className="mt-1 text-sm text-slate-500">{stat.sublabel}</p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  )
}

/* ─── Client Logo Strip ─── */
function ClientLogos() {
  const clients = [
    { name: 'YMCA', logo: '/images/client-logos/ymca.png' },
    { name: 'VCU', logo: '/images/client-logos/vcu.png' },
    { name: 'Invest529', logo: '/images/client-logos/invest529.png' },
    { name: 'ABLEnow', logo: '/images/client-logos/ablenow.png' },
    { name: 'Allen & Allen', logo: '/images/client-logos/allen-allen.png' },
    { name: 'Lewis Media Partners', logo: '/images/testimonials/lewis-media-logo.png' },
  ]

  return (
    <section className="py-12 sm:py-16 bg-slate-50 border-b border-slate-100">
      <Container className="">
        <p className="text-center text-sm font-semibold uppercase tracking-widest text-slate-500 mb-10">
          Trusted by teams planning real media budgets
        </p>
        <div className="flex flex-wrap items-center justify-center gap-x-12 gap-y-6">
          {clients.map((client) =>
            <img
                key={client.name}
                src={client.logo}
                alt={client.name}
                className="h-8 w-auto grayscale opacity-60 hover:opacity-100 hover:grayscale-0 transition-all"
              />
          )}
        </div>
      </Container>
    </section>
  )
}

/* ─── Pain Section ─── */
function PainSection() {
  const pains = [
    {
      Icon: ExclamationTriangleIcon,
      title: 'Platform Metrics Lie',
      description:
        'Meta reported 2,000 conversions. Our causal MMM showed zero business impact. One agency reallocated $200K to channels that actually moved the needle.',
    },
    {
      Icon: CurrencyDollarIcon,
      title: 'Too Expensive for Most Clients',
      description:
        'Only 2 out of 200+ agencies use MMM. Traditional providers charge $50-250K and hide pricing behind "get a demo." Your mid-market clients deserve real measurement too.',
    },
    {
      Icon: QuestionMarkCircleIcon,
      title: 'Gut Feel Planning',
      description:
        'Without causal measurement, you\'re guessing which channels work. Response curves show you exactly where diminishing returns kick in - and where your next dollar has the most impact.',
    },
  ]

  return (
    <section className="py-16 sm:py-24 bg-white">
      <Container className="">
        <div className="mx-auto max-w-2xl text-center mb-16">
          <h2 className="font-display text-3xl tracking-tight text-slate-900 sm:text-4xl">
            You can&rsquo;t optimize what you can&rsquo;t measure
          </h2>
          <p className="mt-4 text-lg text-slate-600">
            Most agencies rely on platform metrics that double-count conversions. Causal MMM cuts through the noise - but until now, it was only for the biggest spenders.
          </p>
        </div>
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-3">
          {pains.map((pain) => (
            <div key={pain.title} className="rounded-2xl border border-red-100 bg-red-50/50 p-8">
              <pain.Icon className="w-8 h-8 text-red-400 mb-4" />
              <h3 className="text-lg font-semibold text-slate-900 mb-2">{pain.title}</h3>
              <p className="text-slate-600">{pain.description}</p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  )
}

/* ─── Zero-Contribution Callout ─── */
function ZeroContributionSection() {
  return (
    <section className="py-16 sm:py-24 bg-slate-900">
      <Container className="">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-sm font-semibold uppercase tracking-widest text-blue-400 mb-4">Real Results</p>
          <h2 className="font-display text-3xl tracking-tight text-white sm:text-4xl">
            We found channels with <span className="text-blue-400">zero measurable impact</span> - and cut them.
          </h2>
          <p className="mt-6 text-lg text-slate-300 max-w-2xl mx-auto">
            For one client, our causal model revealed that three channels - niche display, programmatic trade desk, and specialty publications - were generating
            zero incremental conversions. That spend was reallocated to channels with proven causal impact, saving six figures annually.
          </p>
        </div>
      </Container>
    </section>
  )
}

/* ─── Features Section ─── */
function FeaturesSection() {
  const features = [
    {
      title: 'Channel Response Curves',
      image: '/images/product/response-curves.webp',
      description:
        'See the diminishing returns curve for every channel. Know exactly where to increase spend and where to stop.',
    },
    {
      title: 'Measurement Dashboard',
      image: '/images/product/measurement.webp',
      description:
        'Connect Snowflake, BigQuery, or Domo. See platform metrics vs. MMM-attributed revenue side by side.',
    },
    {
      title: 'Connected to Your Plan',
      image: '/images/product/flighting.webp',
      description:
        'Your MMM results feed directly into the planning tool. Response curves appear alongside your media flowchart.',
    },
  ]

  return (
    <section className="py-16 sm:py-24 bg-slate-50">
      <Container className="">
        <div className="mx-auto max-w-2xl text-center mb-16">
          <h2 className="font-display text-3xl tracking-tight text-slate-900 sm:text-4xl">
            Causal MMM that connects to your workflow
          </h2>
          <p className="mt-4 text-lg text-slate-600">
            Response curves, attribution dashboards, and planning tools - all in one platform. No more exporting CSVs between systems.
          </p>
        </div>
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          {features.map((feature) => (
            <div key={feature.title} className="rounded-2xl bg-white p-8 shadow-lg border border-tint">
              <div className="mb-6 rounded-lg border border-tint overflow-hidden shadow-sm">
                <img src={feature.image} alt={feature.title} className="w-full" />
              </div>
              <h3 className="text-xl font-semibold text-slate-900 mb-3">{feature.title}</h3>
              <p className="text-slate-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  )
}

/* ─── How It Works ─── */
function HowItWorks() {
  const steps = [
    {
      step: '1',
      title: 'Share your data',
      description: 'Media spend by channel plus business outcomes (sales, leads, web traffic). No new tracking or pixels required - just the data you already have.',
    },
    {
      step: '2',
      title: 'We build your causal model',
      description: 'Our Bayesian model isolates the true causal contribution of every channel, controlling for seasonality, trends, and confounders. Delivered in 3-4 weeks.',
    },
    {
      step: '3',
      title: 'You get actionable results',
      description: 'Channel response curves, spend reallocation recommendations, and a clear picture of what\'s actually driving your business - not what platforms claim.',
    },
  ]

  return (
    <section className="py-16 sm:py-24 bg-white">
      <Container className="">
        <div className="mx-auto max-w-2xl text-center mb-16">
          <h2 className="font-display text-3xl tracking-tight text-slate-900 sm:text-4xl">
            How it works
          </h2>
        </div>
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-3 max-w-4xl mx-auto">
          {steps.map((s) => (
            <div key={s.step} className="text-center">
              <div className="mx-auto w-12 h-12 rounded-full bg-primary text-white flex items-center justify-center text-lg font-bold mb-4">
                {s.step}
              </div>
              <h3 className="text-lg font-semibold text-slate-900 mb-2">{s.title}</h3>
              <p className="text-slate-600 text-sm">{s.description}</p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  )
}

/* ─── Testimonial ─── */
function TestimonialSection() {
  return (
    <section className="py-16 sm:py-24 bg-slate-50">
      <Container className="">
        <div className="mx-auto max-w-3xl">
          <div className="rounded-2xl bg-white p-8 sm:p-12 shadow-lg border border-tint">
            <div className="flex items-center gap-4 mb-8">
              <img
                src="/images/testimonials/lewis-media-logo.png"
                alt="Lewis Media Partners"
                className="h-8 w-auto"
              />
            </div>
            <blockquote className="text-xl sm:text-2xl font-medium text-slate-800 leading-relaxed">
              &ldquo;Halliard gave our planners a better way to build media plans and our clients a clearer
              picture of what their spend is doing. That&rsquo;s been really valuable for us.&rdquo;
            </blockquote>
            <div className="mt-8 flex items-center gap-4">
              <img
                src="/images/testimonials/lisa-matulis.jpg"
                alt="Lisa Matulis"
                className="w-12 h-12 rounded-full object-cover"
              />
              <div>
                <p className="text-sm font-semibold text-slate-900">Lisa Matulis</p>
                <p className="text-sm text-slate-500">Group Client Lead, Lewis Media Partners</p>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  )
}

/* ─── Pricing ─── */
function PricingSection() {
  return (
    <section className="py-16 sm:py-24 bg-white">
      <Container className="">
        <div className="mx-auto max-w-2xl text-center mb-12">
          <h2 className="font-display text-3xl tracking-tight text-slate-900 sm:text-4xl">
            Simple, transparent pricing
          </h2>
          <p className="mt-4 text-lg text-slate-600">
            No &ldquo;request a demo&rdquo; gatekeeping. No six-month contracts to see a number.
          </p>
        </div>
        <div className="mx-auto max-w-lg">
          <div className="rounded-2xl bg-white p-8 sm:p-12 shadow-lg border border-tint text-center">
            <p className="font-display text-5xl font-bold text-primary">$25,000</p>
            <p className="mt-2 text-lg font-semibold text-slate-900">per model</p>
            <div className="mt-6 border-t border-slate-100 pt-6">
              <ul className="space-y-3 text-left">
                {[
                  'Full causal model build & calibration',
                  'Channel response curves',
                  'Spend reallocation recommendations',
                  'Integration with Halliard planning tool',
                  'Delivered in 3-4 weeks',
                  'Reruns available at reduced cost',
                ].map((item) => (
                  <li key={item} className="flex items-center gap-2 text-sm text-slate-700">
                    <svg className="h-4 w-4 flex-shrink-0 text-primary" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="mt-8">
              <a
                href="#bottom-form"
                onClick={(e) => {
                  e.preventDefault()
                  document.getElementById('bottom-form')?.scrollIntoView({ behavior: 'smooth' })
                }}
                className="inline-flex w-full items-center justify-center rounded-full bg-primary py-2 px-4 text-sm font-semibold text-white hover:bg-primary/90 transition-colors"
              >
                Get Your Free Channel Efficiency Analysis →
              </a>
            </div>
          </div>
        </div>
      </Container>
    </section>
  )
}

/* ─── Bottom CTA with Form ─── */
function CTAFooter() {
  return (
    <section className="relative overflow-hidden bg-slate-900 py-20 sm:py-28">
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_rgba(59,130,246,0.15),_transparent_60%)]" />
      <Container className="relative">
        <div className="mx-auto max-w-2xl text-center mb-12">
          <h2 className="font-display text-3xl tracking-tight text-white sm:text-4xl">
            Your clients spend millions on media.
          </h2>
          <p className="mt-2 font-display text-3xl tracking-tight text-white/80 sm:text-4xl">
            Show them what it&rsquo;s actually doing.
          </p>
        </div>
        <div className="mx-auto max-w-lg">
          <LeadCaptureForm
            id="bottom-form"
            heading="Get Your Free Channel Efficiency Analysis"
            subheading="Tell us about your media spend and we'll show you what a causal model can uncover."
          />
        </div>
      </Container>
    </section>
  )
}

/* ─── Page ─── */
export default function MMMPage() {
  return (
    <>
      <Head>
        <title>Causal Marketing Mix Modeling for Agencies | $25K MMM | Halliard</title>
        <meta
          name="description"
          content="Causal marketing mix modeling at 1/10th the cost. Traditional MMM costs $50-250K and takes months. Halliard delivers causal MMM for $25K in 3-4 weeks - built for independent agencies."
        />
        <meta property="og:title" content="Causal Marketing Mix Modeling for Agencies | $25K MMM | Halliard" />
        <meta property="og:description" content="Not correlation - causation. Traditional MMM costs $50-250K. Halliard delivers causal MMM for $25K in 3-4 weeks. Built for independent agencies." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://halliardmedia.com/mmm" />
        <meta property="og:image" content="/images/product/response-curves.webp" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Causal Marketing Mix Modeling for Agencies | $25K MMM | Halliard" />
        <meta name="twitter:description" content="Not correlation - causation. Halliard delivers causal MMM for $25K in 3-4 weeks." />
        <meta name="twitter:image" content="/images/product/response-curves.webp" />
        <link rel="canonical" href="https://halliardmedia.com/mmm" />
      </Head>
      <Header />
      <main>
        <Hero />
        <StatsSection />
        <ClientLogos />
        <PainSection />
        <ZeroContributionSection />
        <FeaturesSection />
        <HowItWorks />
        <TestimonialSection />
        <PricingSection />
        <CTAFooter />
      </main>

      {/* Footer */}
      <footer className="py-8 bg-slate-950 border-t border-white/5">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          <span className="text-sm text-slate-500">© {new Date().getFullYear()} Halliard Media Inc.</span>
          <Link href="/" className="text-sm text-slate-500 hover:text-slate-400">halliardmedia.com</Link>
        </div>
      </footer>
    </>
  )
}

MMMPage.disableNavbar = true
MMMPage.fullWidth = true
MMMPage.siteBg = true
