import Head from 'next/head'
import Link from 'next/link'
import React from 'react'
import { ArrowRight, BadgeDollarSign, Check, Clock, CreditCard, FileText, LineChart, Percent, ShoppingCart, type LucideIcon } from 'lucide-react'
import { Container } from '../../components/mmm/Container'
import { Button } from '../../components/mmm/Button'
import { Accent, ClosingCta, HeroBackdrop, LandingHeader, SOFT_BAND, SectionHeading, useLandingAttribution } from '../../components/landing/kit'
import { FeeCalculator } from '../../components/buying/fee-calculator'
import { LisaQuote } from '../../components/plan/proof'
import { RULES, estimateFee } from '../../components/buying/fee-model'

// One page for every price, in the order an agency meets them. Planning is
// paid from the agency's own budget, so it is free for a team planning on its
// own and paid only where an agency rolls it out with us alongside. Buying and
// measurement are client costs the agency bills through: buying per campaign,
// priced against the freelancer it replaces, and measurement per project.

// The fee calculator's "Streaming TV launch" example, worked out by the same rules.
const EXAMPLE = estimateFee({
  weeks: 13,
  platforms: 1,
  packages: 3,
  video: true,
  segments: true,
  finerThanDma: false,
  auction: true,
  deliveryRisk: false,
})
const usd = (v: number) => `$${Math.round(v).toLocaleString('en-US')}`

const PLANNING = [
  'Send a brief in your own words, or drop in an RFP',
  'Audiences sized and placed on the map, down to the ZIP',
  'Strategies researched and written for every dollar',
  'A media plan with reach and frequency modelled',
]

const ROLLOUT = [
  'Onboarding and training for your planners',
  'Your rates, channels and clients set up for you',
  'A person to email, not a help center',
]

const BUYING = [
  'Halliard buys the plan on Meta and PubMatic',
  'Pacing checked every six hours',
  'You approve every line, and going live, first',
  'The fee shows on each campaign before you approve it',
]

const MEASUREMENT: { name: string; price: string; href: string }[] = [
  { name: 'Brand study', price: 'from $5,500', href: '/brand-studies' },
  { name: 'Marketing mix model', price: '$25,000', href: '/mmm' },
  { name: 'Mix model re-run', price: '$7,500', href: '/mmm' },
  { name: 'Incrementality test', price: '$15,000', href: '/incrementality-testing' },
]

const FEE_STEPS = [
  {
    icon: Clock,
    title: 'We estimate a buyer\u2019s hours',
    body: 'How long a freelance media buyer would spend to plan, set up, launch, monitor and report on the campaign.',
  },
  {
    icon: BadgeDollarSign,
    title: `Priced at $${RULES.hourlyRate} an hour`,
    body: `The freelance rate the estimate uses, with a $${RULES.minimumProjectFee.toLocaleString('en-US')} minimum for small campaigns.`,
  },
  {
    icon: Percent,
    title: 'Halliard charges 30% of that',
    body: 'The fee shows on the campaign, worked out from what is in it, before you approve it.',
  },
]

const DRIVERS = [
  ['Flight length', 'Monitoring and weekly reports run every week. After the first four weeks a campaign settles and needs less.'],
  ['Platforms', 'Each platform adds planning, setup, launch and monitoring.'],
  ['Packages or ad sets', 'Each one adds planning and launch work, and its complexity adds setup and monitoring.'],
  ['What each package involves', 'Video, audience segments, ZIP targeting and auction buying each add to its complexity.'],
  ['Delivery risk', 'A narrow audience or geography likely to under-pace gets a quarter more monitoring.'],
]

function Card({
  icon: Icon,
  name,
  sub,
  featured = false,
  children,
}: {
  icon: LucideIcon
  name: string
  sub: string
  featured?: boolean
  children: React.ReactNode
}) {
  return (
    <div
      className={`flex flex-col rounded-2xl bg-white p-7 ${
        featured ? 'border-2 border-primary shadow-xl shadow-primary/10' : 'border border-tint shadow-sm'
      }`}
    >
      <div className="flex items-center gap-3">
        <span
          className={`inline-flex h-11 w-11 items-center justify-center rounded-xl ${
            featured ? 'bg-primary text-white' : 'bg-tint text-primary'
          }`}
        >
          <Icon className="h-5 w-5" aria-hidden />
        </span>
        <div>
          <p className="font-display text-lg text-slate-900">{name}</p>
          <p className="text-sm text-slate-500">{sub}</p>
        </div>
      </div>
      {children}
    </div>
  )
}

function Checklist({ items }: { items: string[] }) {
  return (
    <ul className="mt-6 flex flex-col gap-3">
      {items.map(item => (
        <li key={item} className="flex gap-3 text-sm text-slate-700">
          <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" aria-hidden />
          {item}
        </li>
      ))}
    </ul>
  )
}

/** Served at /pricing, and at /plan/pricing for the ads and sitelinks that link there. */
export function PricingLanding({ path }: { path: '/pricing' | '/plan/pricing' }) {
  const { track, href } = useLandingAttribution(path, { event: 'plan_pricing' })
  return (
    <>
      <Head>
        <title>Pricing: Free Media Planning, Buying and Measurement | Halliard</title>
        <link rel="canonical" href="https://www.halliardmedia.com/pricing" />
        <meta
          name="description"
          content="Media planning is free for teams planning on their own, or $13,000 a year rolled out across an agency. Buying costs 30% of a freelance buyer per campaign. Brand studies from $5,500, mix models $25,000."
        />
      </Head>
      <LandingHeader href={href} cta="Start planning free" onClick={() => track('header')} />
      <main>
        {/* HERO */}
        <section className="relative">
          <HeroBackdrop />
          <Container className="relative max-w-6xl pt-32 pb-10 lg:pt-40">
            <div className="mx-auto max-w-3xl text-center">
              <p className="mb-6 inline-flex items-center gap-2 rounded-full bg-tint px-4 py-1.5 text-sm font-medium text-primary">
                <BadgeDollarSign className="h-4 w-4" aria-hidden />
                Pricing
              </p>
              <h1 className="font-display text-4xl font-medium tracking-tight text-slate-900 sm:text-6xl">
                Plan free. <Accent>Pay when it runs.</Accent>
              </h1>
              <p className="mx-auto mt-6 max-w-2xl text-lg tracking-tight text-slate-700">
                Planning is free for any team planning on its own. Buying and measurement are client costs: you pay per
                campaign we buy or per study we run, and you can bill it through.
              </p>
            </div>
          </Container>
        </section>

        {/* THE THREE PRICES */}
        <section className="pb-16 sm:pb-24">
          <Container className="max-w-6xl">
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
              <Card icon={FileText} name="Planning" sub="Brief in, plan out" featured>
                <p className="mt-6 font-display text-4xl font-medium tracking-tight text-slate-900">Free</p>
                <p className="mt-2 flex items-center gap-2 text-sm text-slate-600">
                  <CreditCard className="h-4 w-4 text-primary" aria-hidden /> No credit card, no brief limit
                </p>
                <Checklist items={PLANNING} />
                <Button href={href} color="blue" className="mt-8 w-full py-3 text-base" onClick={() => track('pricing-planning')}>
                  Start planning free
                  <ArrowRight className="ml-2 h-4 w-4" aria-hidden />
                </Button>
                <div className="mt-8 flex flex-1 flex-col rounded-xl bg-slate-50 p-5">
                  <p className="text-sm font-medium text-slate-900">Agency rollout</p>
                  <p className="mt-1 font-display text-2xl text-slate-900">
                    $13,000 <span className="text-base text-slate-500">a year</span>
                  </p>
                  <p className="mt-2 text-sm text-slate-600">For agencies putting a whole planning team on Halliard.</p>
                  <Checklist items={ROLLOUT} />
                  <Link href="/demo" className="mt-6 inline-flex items-center text-sm font-semibold text-primary hover:underline">
                    Talk to us <ArrowRight className="ml-1 h-4 w-4" aria-hidden />
                  </Link>
                </div>
              </Card>

              <Card icon={ShoppingCart} name="Buying desk" sub="Halliard buys and paces the plan">
                <p className="mt-6 font-display text-4xl font-medium tracking-tight text-slate-900">
                  30% <span className="text-xl text-slate-500">of a freelancer</span>
                </p>
                <p className="mt-2 text-sm text-slate-600">
                  Per campaign. A freelance buyer&rsquo;s hours at ${RULES.hourlyRate}/hr, billed to the client.
                </p>
                <Checklist items={BUYING} />
                <div className="mt-6 rounded-xl bg-slate-50 p-4 text-sm">
                  <p className="text-slate-500">Example: a 13-week streaming TV campaign</p>
                  <p className="mt-1 text-slate-800">
                    A freelancer: about {Math.round(EXAMPLE.hours)} hours,{' '}
                    <span className="line-through decoration-slate-400">{usd(EXAMPLE.freelancer)}</span> · Halliard:{' '}
                    <span className="font-semibold text-primary">{usd(EXAMPLE.halliard)}</span>
                  </p>
                </div>
                <div className="flex-1" />
                <a
                  href="#buying-fee"
                  className="mt-8 inline-flex items-center justify-center rounded-full border border-tint px-5 py-3 text-sm font-semibold text-primary hover:border-primary/40"
                >
                  Work out a campaign&rsquo;s fee
                  <ArrowRight className="ml-2 h-4 w-4" aria-hidden />
                </a>
              </Card>

              <Card icon={LineChart} name="Measurement" sub="Proof the media worked">
                <p className="mt-6 font-display text-4xl font-medium tracking-tight text-slate-900">
                  Per project
                </p>
                <p className="mt-2 text-sm text-slate-600">A fixed price agreed before we start, billed to the client.</p>
                <dl className="mt-6 divide-y divide-slate-100">
                  {MEASUREMENT.map(m => (
                    <div key={m.name} className="flex items-baseline justify-between gap-4 py-3 text-sm">
                      <dt>
                        <Link href={m.href} className="text-slate-700 hover:text-primary">
                          {m.name}
                        </Link>
                      </dt>
                      <dd className="font-medium text-slate-900">{m.price}</dd>
                    </div>
                  ))}
                </dl>
                <div className="flex-1" />
                <Button href="/demo" variant="outline" color="slate" className="mt-8 w-full py-3 text-base">
                  Book a demo
                </Button>
              </Card>
            </div>
            <p className="mt-6 text-center text-sm text-slate-500">
              Plan with Halliard and buy the way you do today, or hand any plan to us to buy. You decide per campaign.
            </p>
          </Container>
        </section>

        {/* HOW THE BUYING FEE WORKS */}
        <section id="buying-fee" className="scroll-mt-24 py-16 sm:py-24" style={SOFT_BAND}>
          <Container className="max-w-6xl">
            <SectionHeading
              eyebrow="The buying fee"
              title="Priced against the buyer you would otherwise hire"
              body="Describe a campaign and see its fee. The estimate uses the same rules the portal uses on a real campaign."
            />
            <ol className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-3">
              {FEE_STEPS.map((m, i) => (
                <li key={m.title} className="rounded-2xl border border-tint bg-white/90 p-6 shadow-sm">
                  <div className="flex items-center gap-3">
                    <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-tint text-primary">
                      <m.icon className="h-5 w-5" aria-hidden />
                    </span>
                    <span className="text-sm font-semibold text-primary">Step {i + 1}</span>
                  </div>
                  <h3 className="mt-4 font-display text-lg text-slate-900">{m.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-600">{m.body}</p>
                </li>
              ))}
            </ol>
            <div className="mt-12">
              <FeeCalculator />
            </div>
            <dl className="mx-auto mt-12 max-w-4xl divide-y divide-slate-200 rounded-2xl border border-tint bg-white shadow-sm">
              {DRIVERS.map(([k, v]) => (
                <div key={k} className="grid grid-cols-1 gap-1 px-6 py-4 sm:grid-cols-[14rem_minmax(0,1fr)] sm:gap-6">
                  <dt className="font-medium text-slate-900">{k}</dt>
                  <dd className="text-slate-600">{v}</dd>
                </div>
              ))}
            </dl>
          </Container>
        </section>

        <section className="py-16 sm:py-20">
          <Container className="max-w-3xl">
            <LisaQuote />
          </Container>
        </section>

        <ClosingCta
          title="Send your first brief to Halliard."
          subtitle="Plan it free. Have us buy or measure it when you're ready."
          cta="Start planning free"
          href={href}
          onClick={() => track('closing')}
        />
      </main>
    </>
  )
}

export default function PlanPricingPage() {
  return <PricingLanding path="/plan/pricing" />
}

;(PlanPricingPage as any).disableNavbar = true
;(PlanPricingPage as any).fullWidth = true
;(PlanPricingPage as any).siteBg = true
