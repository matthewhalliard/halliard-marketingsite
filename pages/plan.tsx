import Head from 'next/head'
import React from 'react'
import {
  ArrowRight,
  BarChart3,
  Building2,
  CalendarCheck,
  CreditCard,
  FileText,
  Layers,
  ListChecks,
  MapPin,
  Radio,
  ScrollText,
  Search,
  ShieldCheck,
  Target,
  Timer,
  Tv,
  Upload,
  Users,
} from 'lucide-react'
import { Container } from '../components/mmm/Container'
import { Button } from '../components/mmm/Button'
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
  type Step,
} from '../components/landing/kit'
import { PlanGridHero } from '../components/plan/plan-grid-hero'
import { AudienceScene, BriefScene, StrategyScene } from '../components/plan/step-visuals'
import {
  ApproveVisual,
  BuyVisual,
  ClientsVisual,
  LedgerVisual,
  LocalVisual,
  PacingVisual,
} from '../components/plan/feature-visuals'
import { BuysOnBanner, LisaQuote } from '../components/plan/proof'

// The hero matches the ad group that sent the visitor. Search ads for the
// reach and frequency ad group carry utm_content or utm_term naming it.
const HERO = {
  default: {
    eyebrow: 'Free media planning tool',
    title: 'A media plan for any client,',
    accent: 'from one brief.',
    body: 'Describe the campaign or drop in an RFP. Halliard drafts the audiences, the strategy and a media plan, and models the reach before any money is spent.',
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

const STEPS: Step[] = [
  {
    icon: FileText,
    label: 'The brief',
    title: 'Send a brief the way you would to a planner',
    body: 'No forms to fill. Halliard reads what you wrote and anything you attached, then writes it back in plain words so you can check it is what you meant.',
    points: [
      { icon: Upload, text: 'Write it in your own words, or drop in the RFP' },
      { icon: ListChecks, text: 'The goal, budget, timing and audience, pulled out for you' },
      { icon: CalendarCheck, text: 'A check that the budget and the dates hang together' },
    ],
    frame: 'Brief',
    Scene: BriefScene,
  },
  {
    icon: Users,
    label: 'Audiences',
    title: 'Audiences sized, and placed on the map',
    body: 'Each audience is matched to what a survey panel actually asked, counted one filter at a time, and pinned to where they live.',
    points: [
      { icon: MapPin, text: 'Down to the DMA and the ZIP, named by neighbourhood' },
      { icon: BarChart3, text: 'Sized from real panel answers, not guesses' },
      { icon: Tv, text: 'The media each audience consumes, ranked' },
    ],
    frame: 'Audiences',
    Scene: AudienceScene,
  },
  {
    icon: Target,
    label: 'Strategy and plan',
    title: 'A role for every dollar, and the reach it buys',
    body: 'Halliard researches the category before it plans, writes each strategy as a role for media, then fits channels to it and models what they reach.',
    points: [
      { icon: Search, text: 'The category, the competition and live search demand' },
      { icon: Layers, text: 'Each strategy with its own audience, budget and flight' },
      { icon: BarChart3, text: 'Reach and frequency modelled before anything is bought' },
    ],
    frame: 'Strategy',
    Scene: StrategyScene,
  },
]

const FEATURES: Feature[] = [
  { icon: ShieldCheck, title: 'Nothing buys without you', body: 'Every line of a plan is approved by a person before a dollar is spent.', Visual: ApproveVisual },
  { icon: Timer, title: 'Pacing, checked every six hours', body: 'Once a plan is live, Halliard watches delivery and flags what drifts.', Visual: PacingVisual },
  { icon: ScrollText, title: 'Every action on the record', body: 'What was bought, why, and what the platform said back. Show your client.', Visual: LedgerVisual },
  { icon: MapPin, title: 'Built for local', body: 'Catchments inside the DMA, ZIPs ranked on the brief, search sized by market.', Visual: LocalVisual },
  { icon: Building2, title: 'One login, many clients', body: 'Agencies plan and buy for several advertisers and switch between them.', Visual: ClientsVisual },
  { icon: Radio, title: 'Buys on PubMatic and Meta', body: 'Approved plans go live through Halliard, with every fee shown.', Visual: BuyVisual },
]

export default function PlanPage() {
  const { utms, track, href } = useLandingAttribution('/plan')
  const heroKey = heroFor(utms)

  const hero = HERO[heroKey]

  return (
    <>
      <Head>
        <title>Free Media Planning Tool: A Plan From One Brief | Halliard</title>
        <meta
          name="description"
          content="Send a brief or an RFP. Halliard drafts the audiences, the strategy and a media plan, with reach and frequency modelled before you spend. Sign up free."
        />
        <meta property="og:title" content="Free Media Planning Tool: A Plan From One Brief | Halliard" />
        <meta
          property="og:description"
          content="Send a brief. Get back a plan with its reach modelled before you spend, then watch it run."
        />
      </Head>
      <LandingHeader href={href} cta="Get your first plan" onClick={() => track('header')} />
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
                  {hero.body} <span className="font-semibold text-slate-900">Free to start.</span>
                </p>
                <div className="mt-10 flex flex-col sm:flex-row justify-center lg:justify-start gap-4">
                  <Button href={href} color="blue" className="px-6 py-3 text-base" onClick={() => track('hero')}>
                    Get your first plan
                    <ArrowRight className="ml-2 h-4 w-4" aria-hidden />
                  </Button>
                </div>
                <div className="mt-8 inline-flex items-center gap-3 rounded-2xl border border-tint bg-white/80 px-4 py-3 text-left shadow-sm">
                  <img src="/plan-grid/halliard-mark.png" alt="" width={28} height={28} className="h-7 w-7 shrink-0" />
                  <p className="text-sm text-slate-700">
                    <span className="font-semibold text-primary">Optional:</span> Halliard can also buy the plan for
                    you and keep it pacing. You approve every line first.
                  </p>
                </div>
                <ul className="mt-6 flex flex-wrap justify-center lg:justify-start gap-x-6 gap-y-3 text-sm text-slate-600">
                  <li className="inline-flex items-center gap-2">
                    <CreditCard className="h-4 w-4 text-primary" aria-hidden />
                    No credit card
                  </li>
                  <li className="inline-flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-primary" aria-hidden />
                    Plans down to the ZIP
                  </li>
                </ul>
              </div>
              <HeroVisual label="Media plan">
                <PlanGridHero />
              </HeroVisual>
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
              title="What Halliard does with one brief"
              body="Sign up, tell us who you plan for, and send your first brief. Here is what happens next."
            />
            <StepRows steps={STEPS} />
          </Container>
        </section>

        {/* SOCIAL PROOF */}
        <section className="py-16 sm:py-20">
          <Container className="">
            <div className="mx-auto max-w-3xl">
              <LisaQuote />
            </div>
          </Container>
        </section>

        {/* FEATURES */}
        <section className="py-20 sm:py-28" style={SOFT_BAND}>
          <Container className="max-w-6xl">
            <SectionHeading
              eyebrow="Optional"
              title="Want it bought? Halliard can do that too."
              body="Planning is yours either way. If you want, hand the approved plan to Halliard: it buys it, keeps it pacing and shows you every fee. Or take the plan and buy it the way you do today."
            />
            <FeatureGrid features={FEATURES} />
          </Container>
        </section>

        <ClosingCta
          title="Send your next brief to Halliard."
          subtitle="Plan it free. Have us buy it if you want."
          cta="Get your first plan"
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
