import Head from 'next/head'
import Link from 'next/link'
import React from 'react'
import { ArrowRight, BadgeDollarSign, Check, CreditCard, FileText, ShoppingCart } from 'lucide-react'
import { Container } from '../../components/mmm/Container'
import { Button } from '../../components/mmm/Button'
import { Accent, ClosingCta, HeroBackdrop, LandingHeader, useLandingAttribution } from '../../components/landing/kit'
import { LisaQuote } from '../../components/plan/proof'
import { PLAN_LINKS } from '../../components/plan/nav'
import { RULES, estimateFee } from '../../components/buying/fee-model'

// Pricing for someone who came for the planning tool: planning first, buying
// as the optional extra it is. A planning visitor sent to the buying desk's
// pricing page met "30% of a freelancer" before anything about planning, and
// left in seconds. The buying desk's page keeps the full calculator.

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

const BUYING = [
  'Halliard buys the plan on Meta and PubMatic',
  'Pacing checked every six hours',
  'You approve every line, and going live, first',
  'Every read, change and approval on the record',
]

export default function PlanPricingPage() {
  const { track, href } = useLandingAttribution('/plan/pricing', { posthog: 'both' })
  return (
    <>
      <Head>
        <title>Pricing: Planning Is Free to Start | Halliard</title>
        <meta
          name="description"
          content="Halliard's media planning tool is free to start, with no credit card. Buying is optional: if Halliard buys the plan, the fee is 30% of what a freelance buyer would charge."
        />
      </Head>
      <LandingHeader href={href} cta="Get your first plan" onClick={() => track('header')} links={PLAN_LINKS} />
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
                Planning is <Accent>free to start.</Accent>
              </h1>
              <p className="mx-auto mt-6 max-w-2xl text-lg tracking-tight text-slate-700">
                Send a brief and get your plan back without paying anything. Buying is optional, and you only pay a fee
                when Halliard buys a campaign for you.
              </p>
            </div>
          </Container>
        </section>

        {/* THE TWO PRICES */}
        <section className="pb-16 sm:pb-24">
          <Container className="max-w-5xl">
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              {/* Planning */}
              <div className="relative flex flex-col rounded-2xl border-2 border-primary bg-white p-7 shadow-xl shadow-primary/10">
                <div className="flex items-center gap-3">
                  <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-primary text-white">
                    <FileText className="h-5 w-5" aria-hidden />
                  </span>
                  <div>
                    <p className="font-display text-lg text-slate-900">Planning</p>
                    <p className="text-sm text-slate-500">Brief in, plan out</p>
                  </div>
                </div>
                <p className="mt-6 font-display text-4xl font-medium tracking-tight text-slate-900">Free to start</p>
                <p className="mt-2 flex items-center gap-2 text-sm text-slate-600">
                  <CreditCard className="h-4 w-4 text-primary" aria-hidden /> No credit card
                </p>
                <ul className="mt-6 flex flex-1 flex-col gap-3">
                  {PLANNING.map(item => (
                    <li key={item} className="flex gap-3 text-sm text-slate-700">
                      <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" aria-hidden />
                      {item}
                    </li>
                  ))}
                </ul>
                <Button href={href} color="blue" className="mt-8 w-full py-3 text-base" onClick={() => track('pricing-planning')}>
                  Get your first plan
                  <ArrowRight className="ml-2 h-4 w-4" aria-hidden />
                </Button>
              </div>

              {/* Buying */}
              <div className="flex flex-col rounded-2xl border border-tint bg-white p-7 shadow-sm">
                <div className="flex items-center gap-3">
                  <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-tint text-primary">
                    <ShoppingCart className="h-5 w-5" aria-hidden />
                  </span>
                  <div>
                    <p className="font-display text-lg text-slate-900">
                      Buying <span className="text-sm font-normal text-slate-400">(optional)</span>
                    </p>
                    <p className="text-sm text-slate-500">If you want Halliard to buy the plan</p>
                  </div>
                </div>
                <p className="mt-6 font-display text-4xl font-medium tracking-tight text-slate-900">
                  30% <span className="text-xl text-slate-500">of a freelancer</span>
                </p>
                <p className="mt-2 text-sm text-slate-600">
                  A freelance buyer&rsquo;s hours at ${RULES.hourlyRate}/hr, shown on each campaign before you approve it.
                </p>
                <ul className="mt-6 flex flex-1 flex-col gap-3">
                  {BUYING.map(item => (
                    <li key={item} className="flex gap-3 text-sm text-slate-700">
                      <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" aria-hidden />
                      {item}
                    </li>
                  ))}
                </ul>
                <div className="mt-6 rounded-xl bg-slate-50 p-4 text-sm">
                  <p className="text-slate-500">Example: a 13-week streaming TV campaign</p>
                  <p className="mt-1 text-slate-800">
                    A freelancer: about {Math.round(EXAMPLE.hours)} hours,{' '}
                    <span className="line-through decoration-slate-400">{usd(EXAMPLE.freelancer)}</span> · Halliard:{' '}
                    <span className="font-semibold text-primary">{usd(EXAMPLE.halliard)}</span>
                  </p>
                </div>
                <Link
                  href="/buying-desk/pricing"
                  className="mt-6 inline-flex items-center justify-center rounded-full border border-tint px-5 py-3 text-sm font-semibold text-primary hover:border-primary/40"
                >
                  Work out a campaign&rsquo;s fee
                  <ArrowRight className="ml-2 h-4 w-4" aria-hidden />
                </Link>
              </div>
            </div>
            <p className="mt-6 text-center text-sm text-slate-500">
              Plan with Halliard and buy the way you do today, or hand any plan to Halliard to buy. You decide per
              campaign.
            </p>
            <div className="mx-auto mt-14 max-w-3xl">
              <LisaQuote />
            </div>
          </Container>
        </section>

        <ClosingCta
          title="Send your first brief to Halliard."
          subtitle="Plan it free. Have us buy it if you want."
          cta="Get your first plan"
          href={href}
          onClick={() => track('closing')}
        />
      </main>
    </>
  )
}

;(PlanPricingPage as any).disableNavbar = true
;(PlanPricingPage as any).fullWidth = true
;(PlanPricingPage as any).siteBg = true
