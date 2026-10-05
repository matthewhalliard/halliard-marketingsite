import Head from 'next/head'
import React from 'react'
import {
  ArrowRight,
  BadgeDollarSign,
  Building2,
  CalendarCheck,
  CheckCircle2,
  ClipboardCheck,
  CreditCard,
  FileText,
  Gauge,
  ListChecks,
  MapPin,
  Radio,
  ScrollText,
  ShieldCheck,
  Timer,
  Upload,
} from 'lucide-react'
import { Container } from '../../components/mmm/Container'
import { Button } from '../../components/mmm/Button'
import {
  Accent,
  ClosingCta,
  FeatureGrid,
  Frame,
  HeroBackdrop,
  HeroVisual,
  LandingHeader,
  SOFT_BAND,
  SectionHeading,
  StepRows,
  useLandingAttribution,
  type Feature,
  type Step,
} from '../../components/landing/kit'
import { BriefScene } from '../../components/plan/step-visuals'
import {
  ApproveVisual,
  BuyVisual,
  ClientsVisual,
  LedgerVisual,
  LocalVisual,
  PacingVisual,
} from '../../components/plan/feature-visuals'
import { BuysOnBanner, LisaQuote } from '../../components/plan/proof'
import { CampaignScene, FeeScene, LiveScene, NarrowPlan } from '../../components/buying/scenes'
import { BUYING_DESK_LINKS } from '../../components/buying/nav'

// Landing page A on the GTM map: the buying desk offer, for the "freelance
// media buyer", "outsourced media buying" and "AI media buying" search ad
// groups and the LinkedIn and Meta campaigns that point here. The hero
// matches the ad group by utm_content or utm_term.
const HERO = {
  freelance: {
    eyebrow: "Your agency's buying desk",
    title: 'A media buyer for less',
    accent: 'than a freelancer.',
  },
  outsourced: {
    eyebrow: 'Outsourced media buying',
    title: "Your agency's buying desk,",
    accent: 'without the hire.',
  },
  ai: {
    eyebrow: 'AI media buying',
    title: 'An agent that buys.',
    accent: 'You approve.',
  },
}
type HeroKey = keyof typeof HERO

function heroFor(params: Record<string, string>): HeroKey {
  const hint = `${params.utm_content || ''} ${params.utm_term || ''}`.toLowerCase()
  if (/outsourc|white.?label|for.?agencies/.test(hint)) return 'outsourced'
  if (/\bai\b|agentic|artificial/.test(hint)) return 'ai'
  return 'freelance'
}

const STEPS: Step[] = [
  {
    icon: FileText,
    label: 'The brief',
    title: 'Send the brief the way you would to a buyer',
    body: 'Write it in your own words or drop in the RFP. Halliard reads it, writes it back in plain words, and checks the budget and the dates hang together.',
    points: [
      { icon: Upload, text: 'Your words or the RFP, no forms to fill' },
      { icon: ListChecks, text: 'The goal, budget, timing and audience, pulled out for you' },
      { icon: CalendarCheck, text: 'A check that the budget and the dates hang together' },
    ],
    frame: 'Brief',
    Scene: BriefScene,
  },
  {
    icon: ClipboardCheck,
    label: 'The plan',
    title: 'Approve the plan, line by line',
    body: 'Halliard drafts the audiences, the strategies and a media plan with reach modelled before spend. You change what you want and approve what you keep.',
    points: [
      { icon: Gauge, text: 'Reach and frequency modelled before anything is bought' },
      { icon: BadgeDollarSign, text: 'Every channel and property with its budget and CPM' },
      { icon: ShieldCheck, text: 'Nothing is bought until you approve it' },
    ],
    frame: 'Media plan',
    Scene: NarrowPlan,
  },
  {
    icon: Radio,
    label: 'Buying and pacing',
    title: 'Halliard buys it and keeps it pacing',
    body: 'The approved plan goes live on PubMatic and Meta. Every six hours Halliard checks delivery. Bigger changes wait for your approval; small budget adjustments run on their own and are logged.',
    points: [
      { icon: Timer, text: 'Delivery checked every six hours' },
      { icon: CheckCircle2, text: 'Bigger budget moves proposed, approved by you, then made' },
      { icon: ScrollText, text: 'Every read, change and approval on the record' },
    ],
    frame: 'Campaigns',
    Scene: LiveScene,
  },
]

const FEATURES: Feature[] = [
  { icon: ShieldCheck, title: 'Nothing buys without you', body: 'Every line of a plan is approved by a person before a dollar is spent.', Visual: ApproveVisual },
  { icon: Timer, title: 'Pacing, checked every six hours', body: 'Once a plan is live, Halliard watches delivery and flags what drifts.', Visual: PacingVisual },
  { icon: ScrollText, title: 'Every action on the record', body: 'What was bought, why, and what the platform said back. Show your client.', Visual: LedgerVisual },
  { icon: Radio, title: 'Buys on PubMatic and Meta', body: 'Approved plans go live through Halliard, with every fee shown.', Visual: BuyVisual },
  { icon: Building2, title: 'One login, many clients', body: 'Plan and buy for several advertisers and switch between them.', Visual: ClientsVisual },
  { icon: MapPin, title: 'Built for local', body: 'Catchments inside the DMA, ZIPs ranked on the brief, search sized by market.', Visual: LocalVisual },
]

export default function BuyingDeskPage() {
  const { utms, track, href } = useLandingAttribution('/buying-desk')
  const hero = HERO[heroFor(utms)]

  return (
    <>
      <Head>
        <title>A Media Buyer for Less Than a Freelancer | Halliard</title>
        <meta
          name="description"
          content="Send Halliard the brief. It plans the campaign, buys it on PubMatic and Meta once you approve every line, and keeps it pacing. The fee is 30% of a freelance buyer's estimate."
        />
        <meta property="og:title" content="A Media Buyer for Less Than a Freelancer | Halliard" />
        <meta
          property="og:description"
          content="Your agency's buying desk: plans, buys and paces campaigns, with every line approved by you and every fee shown up front."
        />
      </Head>
      <LandingHeader href={href} cta="Send your first brief" onClick={() => track('header')} links={BUYING_DESK_LINKS} />
      <main>
        {/* HERO */}
        <section className="relative">
          <HeroBackdrop />
          <Container className="relative max-w-6xl pt-32 pb-20 lg:pt-40 lg:pb-28">
            <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.2fr)] gap-12 items-center">
              <div className="text-center lg:text-left">
                <p className="inline-flex items-center gap-2 rounded-full bg-tint px-4 py-1.5 text-sm font-medium text-primary mb-6">
                  <img src="/plan-grid/halliard-mark.png" alt="" className="h-4 w-4" />
                  {hero.eyebrow}
                </p>
                <h1 className="font-display text-4xl font-medium tracking-tight text-slate-900 sm:text-6xl">
                  {hero.title} <Accent>{hero.accent}</Accent>
                </h1>
                <p className="mx-auto lg:mx-0 mt-6 max-w-xl text-lg tracking-tight text-slate-700">
                  Send Halliard the brief. It plans the campaign, drafts the buy and, once you approve every line, buys it
                  and keeps it pacing.{' '}
                  <span className="font-semibold text-slate-900">
                    The fee shows up front: 30% of what a freelance buyer would charge.
                  </span>
                </p>
                <div className="mt-10 flex flex-col sm:flex-row justify-center lg:justify-start gap-4">
                  <Button href={href} color="blue" className="px-6 py-3 text-base" onClick={() => track('hero')}>
                    Send your first brief
                    <ArrowRight className="ml-2 h-4 w-4" aria-hidden />
                  </Button>
                </div>
                <ul className="mt-8 flex flex-wrap justify-center lg:justify-start gap-x-6 gap-y-3 text-sm text-slate-600">
                  <li className="inline-flex items-center gap-2">
                    <ShieldCheck className="h-4 w-4 text-primary" aria-hidden />
                    You approve every line
                  </li>
                  <li className="inline-flex items-center gap-2">
                    <BadgeDollarSign className="h-4 w-4 text-primary" aria-hidden />
                    Fee shown before you approve
                  </li>
                  <li className="inline-flex items-center gap-2">
                    <CreditCard className="h-4 w-4 text-primary" aria-hidden />
                    No credit card
                  </li>
                </ul>
              </div>
              <HeroVisual label="Campaigns">
                <CampaignScene />
              </HeroVisual>
            </div>
          </Container>
        </section>

        {/* WHERE HALLIARD BUYS */}
        <section className="relative py-6">
          <Container className="max-w-6xl">
            <BuysOnBanner optional={false} />
          </Container>
        </section>

        {/* HOW IT WORKS */}
        <section className="py-20 sm:py-28" style={SOFT_BAND}>
          <Container className="max-w-6xl">
            <SectionHeading
              eyebrow="How it works"
              title="From brief to live campaign, with you approving each step"
              body="Sign up, tell us who you buy for, and send your first brief."
            />
            <StepRows steps={STEPS} />
            <div className="mt-14 text-center">
              <Button href="/buying-desk/how-it-works" variant="outline" color="slate" className="px-6 py-3 text-base">
                See all six stages →
              </Button>
            </div>
          </Container>
        </section>

        {/* WHAT IT COSTS */}
        <section className="py-16 sm:py-24">
          <Container className="max-w-6xl">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
              <div>
                <p className="inline-flex items-center rounded-full bg-tint px-4 py-1.5 text-sm font-medium text-primary">
                  What it costs
                </p>
                <h2 className="mt-5 font-display text-3xl tracking-tight text-slate-900 sm:text-4xl">
                  Priced against the buyer you would otherwise hire
                </h2>
                <p className="mt-4 text-lg tracking-tight text-slate-700">
                  For every campaign, Halliard estimates the hours a freelance buyer would spend to plan, set up, launch,
                  monitor and report on it, at $85 an hour. Halliard's fee is 30% of that, and it shows on the campaign
                  before you approve it.
                </p>
                <ul className="mt-6 flex flex-col gap-3 text-slate-700">
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-primary" aria-hidden />
                    More platforms, packages and weeks mean more hours, so the fee follows the work
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-primary" aria-hidden />
                    A fee per campaign Halliard buys, shown before you approve it
                  </li>
                </ul>
                <div className="mt-8">
                  <Button href="/buying-desk/pricing" color="blue" className="px-6 py-3 text-base">
                    Work out your fee
                    <ArrowRight className="ml-2 h-4 w-4" aria-hidden />
                  </Button>
                </div>
              </div>
              <div className="min-w-0">
                <Frame label="Campaign fee">
                  <FeeScene />
                </Frame>
              </div>
            </div>
          </Container>
        </section>

        {/* SOCIAL PROOF */}
        <section className="pb-16 sm:pb-20">
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
              eyebrow="What you get"
              title="Everything a buyer does, on the record"
              body="Halliard does the buying work and shows its working: what it bought, why, what the platform said back, and what you approved."
            />
            <FeatureGrid features={FEATURES} />
          </Container>
        </section>

        <ClosingCta
          title="Send your next brief to Halliard."
          subtitle="We plan it, buy it and keep it pacing."
          cta="Send your first brief"
          href={href}
          onClick={() => track('closing')}
        />
      </main>
    </>
  )
}

;(BuyingDeskPage as any).disableNavbar = true
;(BuyingDeskPage as any).fullWidth = true
;(BuyingDeskPage as any).siteBg = true
