import Head from 'next/head'
import Link from 'next/link'
import { Button } from '../components/mmm/Button'
import { Container } from '../components/mmm/Container'
import {
  CheckIcon,
  ChartBarSquareIcon,
  ShoppingCartIcon,
  PresentationChartLineIcon,
  BeakerIcon,
  MegaphoneIcon,
} from '@heroicons/react/24/outline'

const SIGN_UP_URL = 'https://app.halliardmedia.com/sign-up'

const PLUS_PATTERN = "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%231a6ab4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")"

function Hero() {
  return (
    <div className="relative overflow-hidden">
      <div className="absolute inset-0 opacity-[0.07]" style={{ backgroundImage: PLUS_PATTERN, backgroundSize: '18px 18px' }} />
      <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse at 50% 0%, rgba(211,228,255,0.3) 0%, rgba(255,255,255,0.95) 70%, rgb(255,255,255) 100%)' }} />
      <Container className="relative pt-32 pb-16 text-center lg:pt-40">
        <div className="mx-auto max-w-3xl">
          <p className="inline-flex items-center gap-2 rounded-full bg-tint px-4 py-1.5 text-sm font-medium text-primary mb-6">
            <span>💳</span> Free to start. Priced to your team.
          </p>
          <h1 className="font-display text-5xl font-medium tracking-tight text-slate-900 sm:text-6xl lg:text-7xl">
            Start free.{' '}
            <span className="relative text-primary">
              <span className="relative">Pay for what fits.</span>
            </span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg tracking-tight text-slate-700">
            Every Halliard account starts on a free plan — no credit card, no trial countdown. When you're ready to scale,
            we'll price to your team, your media volume, and the parts of Halliard you actually need.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row justify-center gap-4">
            <Button href={SIGN_UP_URL} color="blue" className="">
              Start Planning Free
            </Button>
            <Button href="/trytoday" variant="outline" color="slate" className="">
              Talk to us
            </Button>
          </div>
        </div>
      </Container>
    </div>
  )
}

function FreePlan() {
  const includes = [
    'Build unlimited media plans',
    'Every channel: TV, CTV, digital, OOH, audio, social',
    'Scenario comparison (up to 3 scenarios)',
    'Reach and frequency estimation',
    'PDF exports with Halliard branding',
    'Single-user access',
  ]
  return (
    <section className="py-20 bg-white">
      <Container className="">
        <div className="mx-auto max-w-4xl">
          <div className="rounded-2xl border border-slate-200 bg-gradient-to-br from-slate-50 to-white p-10">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 mb-8">
              <div>
                <p className="text-sm font-semibold text-primary tracking-widest uppercase mb-2">Free, forever</p>
                <h2 className="font-display text-4xl font-medium text-slate-900">
                  Everything you need to build a plan.
                </h2>
                <p className="mt-3 text-slate-600">No credit card. No trial clock. Actually free.</p>
              </div>
              <Button href={SIGN_UP_URL} color="blue" className="">
                Start Planning Free
              </Button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {includes.map((item) => (
                <div key={item} className="flex items-start gap-3">
                  <CheckIcon className="mt-1 h-5 w-5 flex-shrink-0 text-primary" />
                  <span className="text-slate-700">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </section>
  )
}

function PlatformTiers() {
  const tiers = [
    {
      Icon: ChartBarSquareIcon,
      name: 'Planning',
      tagline: 'For teams who want to build and share plans professionally.',
      bullets: [
        'Unlimited plans, unlimited scenarios',
        'Remove Halliard branding on exports',
        'Team seats, roles, and approvals',
        'Full version history and audit trail',
        'White-glove onboarding',
      ],
      cta: 'Talk to us',
    },
    {
      Icon: ShoppingCartIcon,
      name: 'Buying',
      tagline: 'For teams who want to plan and execute in one platform.',
      bullets: [
        'Everything in Planning',
        'Vendor-level buy tracking and pacing',
        'Fee transparency: agency, DSP, data, verification',
        'Weekly spend allocation and reconciliation',
        'Multi-client / multi-brand workspaces',
      ],
      cta: 'Talk to us',
      highlight: true,
    },
    {
      Icon: PresentationChartLineIcon,
      name: 'Measurement',
      tagline: 'For teams who want to prove what the spend did.',
      bullets: [
        'Everything in Planning + Buying',
        'Connect Snowflake, BigQuery, Domo',
        'MMM-powered response curves',
        'Funnel-stage attribution dashboard',
        'Dedicated account team',
      ],
      cta: 'Talk to us',
    },
  ]
  return (
    <section className="py-20 bg-slate-50 border-t border-slate-100">
      <Container className="">
        <div className="mx-auto max-w-3xl text-center mb-14">
          <h2 className="font-display text-4xl font-medium text-slate-900 sm:text-5xl">
            When you're ready for more.
          </h2>
          <p className="mt-4 text-lg text-slate-600">
            Pick the shape that fits your team. We'll price it to your size and your media volume — no list prices we
            made up, no enterprise gotchas.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {tiers.map((t) => (
            <div
              key={t.name}
              className={`flex flex-col rounded-2xl p-8 bg-white border ${
                t.highlight ? 'border-primary shadow-lg ring-1 ring-primary' : 'border-slate-200'
              }`}
            >
              <div className="flex items-center gap-3 mb-4">
                <t.Icon className="h-7 w-7 text-primary" />
                <h3 className="text-xl font-semibold text-slate-900">{t.name}</h3>
                {t.highlight && (
                  <span className="ml-auto text-xs font-semibold text-primary bg-tint px-2.5 py-1 rounded-full">
                    Most teams
                  </span>
                )}
              </div>
              <p className="text-slate-600 mb-6 text-sm leading-relaxed">{t.tagline}</p>
              <ul className="space-y-3 mb-8 flex-1">
                {t.bullets.map((b) => (
                  <li key={b} className="flex items-start gap-3">
                    <CheckIcon className="mt-0.5 h-4 w-4 flex-shrink-0 text-primary" />
                    <span className="text-sm text-slate-700">{b}</span>
                  </li>
                ))}
              </ul>
              <Button
                href="/trytoday"
                variant={t.highlight ? 'solid' : 'outline'}
                color={t.highlight ? 'blue' : 'slate'}
                className="w-full"
              >
                {t.cta}
              </Button>
            </div>
          ))}
        </div>
      </Container>
    </section>
  )
}

function Services() {
  const services = [
    {
      Icon: BeakerIcon,
      name: 'Marketing Mix Modeling',
      price: '$25,000',
      priceNote: 'flat per model · 3–4 week turnaround',
      tagline: 'Causal MMM built for mid-market agencies and brands.',
      bullets: [
        'Bayesian causal model, not vendor black box',
        'Media + non-media drivers (pricing, seasonality, promos)',
        'Channel response curves and saturation analysis',
        'Scenario planner for next-period budgets',
      ],
      compareNote: 'Traditional MMM: $50–$250K and 3–6 months.',
      href: '/mmm',
      ctaText: 'Learn more about MMM',
    },
    {
      Icon: MegaphoneIcon,
      name: 'Brand Lift Studies',
      price: 'From $5,000',
      priceNote: '$5K–$10K per study · fast turnaround',
      tagline: 'Aided and unaided awareness, consideration, and preference.',
      bullets: [
        'Pre / post exposed vs. control methodology',
        'Aided and unaided brand awareness',
        'Consideration, preference, and purchase intent lift',
        'Built for clients who can\'t afford $50K studies',
      ],
      compareNote: 'Traditional brand studies: $40–$50K.',
      href: '/brand-studies',
      ctaText: 'Learn more about Brand Studies',
    },
  ]
  return (
    <section className="py-20 bg-white border-t border-slate-100">
      <Container className="">
        <div className="mx-auto max-w-3xl text-center mb-14">
          <p className="text-sm font-semibold text-primary tracking-widest uppercase mb-3">Measurement services</p>
          <h2 className="font-display text-4xl font-medium text-slate-900 sm:text-5xl">
            Measurement services with real prices.
          </h2>
          <p className="mt-4 text-lg text-slate-600">
            For teams who want rigorous measurement without the six-figure contract. Priced flat, turnaround in weeks,
            not quarters.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
          {services.map((s) => (
            <div key={s.name} className="flex flex-col rounded-2xl p-8 bg-slate-50 border border-slate-200">
              <div className="flex items-center gap-3 mb-4">
                <s.Icon className="h-7 w-7 text-primary" />
                <h3 className="text-xl font-semibold text-slate-900">{s.name}</h3>
              </div>
              <div className="mb-4">
                <p className="font-display text-4xl font-bold text-slate-900">{s.price}</p>
                <p className="text-sm text-slate-500 mt-1">{s.priceNote}</p>
              </div>
              <p className="text-slate-600 mb-6 text-sm leading-relaxed">{s.tagline}</p>
              <ul className="space-y-2.5 mb-6 flex-1">
                {s.bullets.map((b) => (
                  <li key={b} className="flex items-start gap-3">
                    <CheckIcon className="mt-0.5 h-4 w-4 flex-shrink-0 text-primary" />
                    <span className="text-sm text-slate-700">{b}</span>
                  </li>
                ))}
              </ul>
              <p className="text-xs text-slate-500 italic mb-4">{s.compareNote}</p>
              <Link href={s.href} className="text-sm font-semibold text-primary hover:underline">
                {s.ctaText} &rarr;
              </Link>
            </div>
          ))}
        </div>
      </Container>
    </section>
  )
}

function FAQ() {
  const faqs = [
    {
      q: 'Why don\'t you list prices for the platform?',
      a: 'Because a 50-person independent agency pays differently than a 3-person in-house team, and both of them pay differently than a holding company. We price to your team size, your media volume, and the parts of Halliard you actually use. Tell us what you\'re working with and we\'ll give you a number the same day — no three-call sales process.',
    },
    {
      q: 'Is the free plan actually free?',
      a: 'Yes. Forever. No credit card, no trial countdown, no "free for 14 days" fine print. You get the full planning experience, minus the team features (seats, approvals, white-label exports) which are on the paid tiers.',
    },
    {
      q: 'Can I try the paid features before buying?',
      a: 'Yes. Book a 30-minute walkthrough via "Start Planning Free" and we\'ll turn on the paid feature set for two weeks while you evaluate. No payment info required upfront.',
    },
    {
      q: 'What does MMM actually cost?',
      a: '$25,000 flat per model. That\'s list price — no enterprise dance, no "request a demo" gate. Most competitors charge $50K–$250K for the same output. Delivered in 3–4 weeks.',
    },
    {
      q: 'Do you offer annual contracts or month-to-month?',
      a: 'Both. Month-to-month on the platform if you want to start small; annual if you want a discount. Measurement services (MMM, Brand Lift) are priced per engagement, not per year.',
    },
  ]
  return (
    <section className="py-20 bg-slate-50 border-t border-slate-100">
      <Container className="">
        <div className="mx-auto max-w-3xl">
          <h2 className="font-display text-4xl font-medium text-slate-900 text-center mb-12">
            Questions people usually ask.
          </h2>
          <div className="space-y-6">
            {faqs.map((f) => (
              <div key={f.q} className="bg-white border border-slate-200 rounded-xl p-6">
                <h3 className="font-semibold text-slate-900 mb-2">{f.q}</h3>
                <p className="text-slate-700 text-sm leading-relaxed">{f.a}</p>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  )
}

function FinalCTA() {
  return (
    <section className="py-20 bg-white">
      <Container className="">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="font-display text-4xl font-medium text-slate-900 sm:text-5xl">
            Start free. Upgrade when you're ready.
          </h2>
          <p className="mt-4 text-lg text-slate-700">
            No credit card. No trial clock. No three-call sales process.
          </p>
          <div className="mt-8 flex justify-center gap-4">
            <Button href={SIGN_UP_URL} color="blue" className="">
              Start Planning Free
            </Button>
            <Button href="/trytoday" variant="outline" color="slate" className="">
              Talk to us
            </Button>
          </div>
        </div>
      </Container>
    </section>
  )
}

export default function PricingPage() {
  return (
    <>
      <Head>
        <title>Pricing — Halliard Media Planning Platform</title>
        <meta
          name="description"
          content="Halliard is free to start — no credit card, no trial clock. Platform plans (Planning, Buying, Measurement) priced to your team. Services: MMM $25K, Brand Lift $5K+."
        />
      </Head>
      <main>
        <Hero />
        <FreePlan />
        <PlatformTiers />
        <Services />
        <FAQ />
        <FinalCTA />
      </main>
    </>
  )
}
