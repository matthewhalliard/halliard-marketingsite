import Head from 'next/head'
import Link from 'next/link'
import React from 'react'
import {
  ArrowRight,
  BarChart3,
  Building2,
  MapPin,
  Pencil,
  Radio,
  ScrollText,
  ShieldCheck,
  Timer,
} from 'lucide-react'
import { Container } from '../../components/mmm/Container'
import { Button } from '../../components/mmm/Button'
import {
  Accent,
  ClosingCta,
  FeatureGrid,
  HeroBackdrop,
  HeroVisual,
  LandingHeader,
  SOFT_BAND,
  SectionHeading,
  StepRows,
  useLandingAttribution,
  type Feature,
} from '../../components/landing/kit'
import { PlanGridHero } from '../../components/plan/plan-grid-hero'
import { PLAN_STEPS } from '../../components/plan/steps'
import { PLAN_LINKS } from '../../components/plan/nav'
import {
  ApproveVisual,
  BuyVisual,
  ClientsVisual,
  LedgerVisual,
  LocalVisual,
  PacingVisual,
} from '../../components/plan/feature-visuals'
import { BuysOnBanner, LisaQuote } from '../../components/plan/proof'

// The hero matches the ad group that sent the visitor. Search ads for the
// reach and frequency ad group carry utm_content or utm_term naming it.
const HERO = {
  default: {
    eyebrow: 'For agency and in-house media planners',
    title: 'Hyper-fast',
    accent: 'media planning.',
    body: 'Paste a brief or drop in an RFP. In about six minutes Halliard drafts the audiences, strategy and channel plan, with reach modelled. Then you edit any line and test what-ifs on the spot.',
  },
  reach: {
    eyebrow: 'Free reach & frequency planner',
    title: 'Reach and frequency modelled',
    accent: 'before you spend.',
    body: 'Send a brief and Halliard builds the plan, then models reach and frequency for every strategy in it, down to the channel and the property.',
  },
}
type HeroKey = keyof typeof HERO

function heroFor(params: Record<string, string>): HeroKey {
  const hint = `${params.utm_content || ''} ${params.utm_term || ''}`.toLowerCase()
  return /reach|frequency/.test(hint) ? 'reach' : 'default'
}

const FEATURES: Feature[] = [
  { icon: ShieldCheck, title: 'Nothing buys without you', body: 'Every line of a plan is approved by a person before a dollar is spent.', Visual: ApproveVisual },
  { icon: Timer, title: 'Pacing, checked every six hours', body: 'Once a plan is live, Halliard watches delivery and flags what drifts.', Visual: PacingVisual },
  { icon: ScrollText, title: 'Every action on the record', body: 'What was bought, why, and what the platform said back. Show your client.', Visual: LedgerVisual },
  { icon: Building2, title: 'Plan for one brand or many', body: 'Agencies switch between every client in one login. Brand teams keep all their own plans in one place.', Visual: ClientsVisual },
  { icon: MapPin, title: 'Built for local', body: 'Catchments inside the DMA, ZIPs ranked on the brief, search sized by market.', Visual: LocalVisual },
  { icon: Radio, title: 'Buys on PubMatic and Meta', body: 'Approved plans go live through Halliard, with every fee shown.', Visual: BuyVisual },
]

export default function PlanPage() {
  const { utms, track, href } = useLandingAttribution('/plan', { posthog: 'both' })
  const heroKey = heroFor(utms)

  const hero = HERO[heroKey]

  return (
    <>
      <Head>
        <title>Media Planning Software, Free to Start | Halliard</title>
        <meta
          name="description"
          content="Hyper-fast media planning. Paste a brief and Halliard drafts the audiences, strategy and channel plan with reach modelled. You edit any line. Free to start."
        />
        <meta property="og:title" content="Media Planning Software, Free to Start | Halliard" />
        <meta
          property="og:description"
          content="Paste a brief. Halliard drafts the plan with reach modelled in minutes, and you make the calls."
        />
      </Head>
      <LandingHeader href={href} cta="Start planning free" onClick={() => track('header')} links={PLAN_LINKS} />
      <main>
        {/* HERO */}
        <section className="relative">
          <HeroBackdrop />
          <Container className="relative max-w-6xl pt-32 pb-20 lg:pt-40 lg:pb-28">
            <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.25fr)] gap-12 items-center">
              <div className="text-center lg:text-left">
                <p className="inline-flex items-center gap-2 rounded-full bg-tint px-4 py-1.5 text-sm font-medium text-primary mb-6">
                  <BarChart3 className="h-4 w-4" aria-hidden />
                  {hero.eyebrow}
                </p>
                <h1 className="font-display text-5xl font-medium tracking-tight text-slate-900 sm:text-6xl">
                  {hero.title}{' '}
                  <Accent>{hero.accent}</Accent>
                </h1>
                <p className="mx-auto lg:mx-0 mt-6 max-w-xl text-lg tracking-tight text-slate-700">
                  {hero.body}
                </p>
                <div className="mt-10 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 sm:gap-6">
                  <Button href={href} color="blue" className="px-6 py-3 text-base" onClick={() => track('hero')}>
                    Start planning free
                    <ArrowRight className="ml-2 h-4 w-4" aria-hidden />
                  </Button>
                  <Link href="/plan/sample" className="text-base font-semibold text-primary hover:underline">
                    See a sample plan &rarr;
                  </Link>
                </div>
                <p className="mt-4 text-sm text-slate-600">
                  Free. No credit card. Try it on a past brief or a made-up one.
                </p>
                <ul className="mt-6 flex flex-wrap justify-center lg:justify-start gap-x-6 gap-y-3 text-sm text-slate-600">
                  <li className="inline-flex items-center gap-2">
                    <Pencil className="h-4 w-4 text-primary" aria-hidden />
                    Edit every line
                  </li>
                  <li className="inline-flex items-center gap-2">
                    <BarChart3 className="h-4 w-4 text-primary" aria-hidden />
                    Reach &amp; frequency built in
                  </li>
                  <li className="inline-flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-primary" aria-hidden />
                    Down to the ZIP
                  </li>
                </ul>
              </div>
              <HeroVisual label="Media plan · Draft, edit any line">
                <PlanGridHero />
              </HeroVisual>
            </div>
          </Container>
        </section>

        {/* SOCIAL PROOF */}
        <section className="pb-12 sm:pb-16">
          <Container className="">
            <div className="mx-auto max-w-3xl">
              <LisaQuote />
            </div>
          </Container>
        </section>

        {/* WHERE HALLIARD CAN BUY */}
        <section className="relative py-6">
          <Container className="max-w-6xl">
            <BuysOnBanner />
          </Container>
        </section>

        {/* HOW IT WORKS */}
        <section className="py-20 sm:py-28" style={SOFT_BAND}>
          <Container className="max-w-6xl">
            <SectionHeading
              eyebrow="How it works"
              title="From brief to plan in minutes"
              body="Three steps. Anything Halliard drafts, you can change."
            />
            <StepRows steps={PLAN_STEPS} />
          </Container>
        </section>

        {/* FEATURES */}
        <section className="py-20 sm:py-28" style={SOFT_BAND}>
          <Container className="max-w-6xl">
            <SectionHeading
              eyebrow="Optional"
              title="When you're ready, Halliard can buy it too."
              body="Planning is yours either way. If you want, hand the approved plan to Halliard: it buys it, keeps it pacing and shows you every fee. Or take the plan and buy it the way you do today."
            />
            <FeatureGrid features={FEATURES} />
          </Container>
        </section>

        <ClosingCta
          title="Your next plan, drafted in minutes."
          subtitle="You make the calls. Have us buy it if you want."
          cta="Start planning free"
          href={href}
          onClick={() => track('closing')}
        />
      </main>
    </>
  )
}

;(PlanPage as any).disableNavbar = true
;(PlanPage as any).fullWidth = true
;(PlanPage as any).siteBg = true
