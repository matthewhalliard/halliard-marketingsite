import Head from 'next/head'
import React from 'react'
import { BadgeDollarSign, Calculator, Clock, Percent } from 'lucide-react'
import { Container } from '../../components/mmm/Container'
import {
  Accent,
  ClosingCta,
  HeroBackdrop,
  LandingHeader,
  SOFT_BAND,
  SectionHeading,
  useLandingAttribution,
} from '../../components/landing/kit'
import { FeeCalculator } from '../../components/buying/fee-calculator'
import { RULES } from '../../components/buying/fee-model'
import { BUYING_DESK_LINKS } from '../../components/buying/nav'

const MODEL = [
  {
    icon: Clock,
    title: 'We estimate a buyer’s hours',
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

export default function BuyingDeskPricingPage() {
  const { track, href } = useLandingAttribution('/buying-desk/pricing')
  return (
    <>
      <Head>
        <title>Pricing: 30% of a Freelance Buyer | Halliard</title>
        <meta
          name="description"
          content="Halliard's campaign fee is 30% of what a freelance media buyer would charge to plan, buy, monitor and report on the campaign. Work out yours."
        />
      </Head>
      <LandingHeader href={href} cta="Send your first brief" onClick={() => track('header')} links={BUYING_DESK_LINKS} />
      <main>
        {/* HERO */}
        <section className="relative">
          <HeroBackdrop />
          <Container className="relative max-w-6xl pt-32 pb-12 lg:pt-40">
            <div className="mx-auto max-w-3xl text-center">
              <p className="inline-flex items-center gap-2 rounded-full bg-tint px-4 py-1.5 text-sm font-medium text-primary mb-6">
                <Calculator className="h-4 w-4" aria-hidden />
                Pricing
              </p>
              <h1 className="font-display text-4xl font-medium tracking-tight text-slate-900 sm:text-6xl">
                You pay <Accent>30% of a freelancer.</Accent>
              </h1>
              <p className="mx-auto mt-6 max-w-2xl text-lg tracking-tight text-slate-700">
                Every campaign Halliard buys is priced against the buyer you would otherwise hire. The fee is per campaign,
                and you see it before you approve.
              </p>
            </div>
            <ol className="mt-14 grid grid-cols-1 gap-6 md:grid-cols-3">
              {MODEL.map((m, i) => (
                <li key={m.title} className="rounded-2xl border border-tint bg-white/90 p-6 shadow-sm">
                  <div className="flex items-center gap-3">
                    <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-tint text-primary">
                      <m.icon className="h-5 w-5" aria-hidden />
                    </span>
                    <span className="text-sm font-semibold text-primary">Step {i + 1}</span>
                  </div>
                  <h2 className="mt-4 font-display text-lg text-slate-900">{m.title}</h2>
                  <p className="mt-2 text-sm leading-relaxed text-slate-600">{m.body}</p>
                </li>
              ))}
            </ol>
          </Container>
        </section>

        {/* CALCULATOR */}
        <section className="py-16 sm:py-24" style={SOFT_BAND}>
          <Container className="max-w-6xl">
            <SectionHeading
              eyebrow="Work out your fee"
              title="Describe a campaign, see what it costs"
              body="Start from an example or set your own. The estimate uses the same rules the portal uses on a real campaign."
            />
            <div className="mt-12">
              <FeeCalculator />
            </div>
          </Container>
        </section>

        {/* WHAT CHANGES THE FEE */}
        <section className="py-16 sm:py-20">
          <Container className="max-w-4xl">
            <SectionHeading eyebrow="What changes the fee" title="The fee follows the work" />
            <dl className="mt-10 divide-y divide-slate-200 rounded-2xl border border-tint bg-white shadow-sm">
              {DRIVERS.map(([k, v]) => (
                <div key={k} className="grid grid-cols-1 gap-1 px-6 py-4 sm:grid-cols-[14rem_minmax(0,1fr)] sm:gap-6">
                  <dt className="font-medium text-slate-900">{k}</dt>
                  <dd className="text-slate-600">{v}</dd>
                </div>
              ))}
            </dl>
          </Container>
        </section>

        <ClosingCta
          title="See the fee on your own campaign."
          subtitle="Send a brief. It shows before you approve."
          cta="Send your first brief"
          href={href}
          onClick={() => track('closing')}
        />
      </main>
    </>
  )
}

;(BuyingDeskPricingPage as any).disableNavbar = true
;(BuyingDeskPricingPage as any).fullWidth = true
;(BuyingDeskPricingPage as any).siteBg = true
