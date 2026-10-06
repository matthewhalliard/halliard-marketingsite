import Head from 'next/head'
import Link from 'next/link'
import React from 'react'
import { BarChart3, CheckCircle2, ClipboardCheck, Gauge, Radio, ScrollText, ShieldCheck, Timer, Workflow } from 'lucide-react'
import { Container } from '../../components/mmm/Container'
import {
  Accent,
  ClosingCta,
  HeroBackdrop,
  LandingHeader,
  SOFT_BAND,
  SectionHeading,
  StepRows,
  useLandingAttribution,
  type Step,
} from '../../components/landing/kit'
import { PLAN_STEPS } from '../../components/plan/steps'
import { PLAN_LINKS } from '../../components/plan/nav'
import { CampaignScene, LiveScene, NarrowPlan } from '../../components/buying/scenes'

// The planning tool, stage by stage, for someone weighing it up before they
// sign up. Buying is shown as what it is here: optional, after the plan.
const STEPS: Step[] = [
  // The plan gets its own stage here, so the third is strategy alone.
  ...PLAN_STEPS.map(s => (s.label === 'Strategy and plan' ? { ...s, label: 'Strategy' } : s)),
  {
    icon: ClipboardCheck,
    label: 'The plan',
    title: 'A plan you can read line by line',
    body: 'Channels and properties fitted to each strategy, with budget, impressions, CPM, reach and fit on every line. Change what you want and keep what works.',
    points: [
      { icon: Gauge, text: 'Reach and frequency modelled before any spend' },
      { icon: BarChart3, text: 'Balanced or reach-first, at the flip of a dial' },
      { icon: CheckCircle2, text: 'Yours to keep, whoever buys it' },
    ],
    frame: 'Media plan',
    Scene: NarrowPlan,
  },
]

const BUYING_STEPS: Step[] = [
  {
    icon: Workflow,
    label: 'The campaign',
    title: 'The buy drafted, the fee shown',
    body: 'Hand the approved plan to Halliard and it drafts the campaign: the inventory and audiences for each strategy, a creative check on every package, and the fee next to what a freelancer would charge.',
    points: [
      { icon: CheckCircle2, text: 'Creative checked against each package’s specs' },
      { icon: BarChart3, text: 'The fee shown before you approve' },
      { icon: ShieldCheck, text: 'Going live is approved separately' },
    ],
    frame: 'Campaigns',
    Scene: CampaignScene,
  },
  {
    icon: Radio,
    label: 'Live',
    title: 'Bought, paced and on the record',
    body: 'The campaign goes live on PubMatic and Meta. Every six hours Halliard reads delivery. Bigger changes wait for your approval; small budget adjustments run on their own and are logged.',
    points: [
      { icon: Timer, text: 'Delivery checked every six hours' },
      { icon: CheckCircle2, text: 'Bigger budget moves proposed, approved by you, then made' },
      { icon: ScrollText, text: 'Every read, change and approval logged' },
    ],
    frame: 'Campaigns',
    Scene: LiveScene,
  },
]

export default function PlanHowItWorksPage() {
  const { track, href } = useLandingAttribution('/plan/how-it-works', { posthog: 'both' })
  return (
    <>
      <Head>
        <title>How the Media Planning Tool Works | Halliard</title>
        <meta
          name="description"
          content="From one brief to a media plan: the brief read back, audiences sized to the ZIP, strategies with a role for every dollar, and reach and frequency modelled before you spend."
        />
      </Head>
      <LandingHeader href={href} cta="Get your first plan" onClick={() => track('header')} links={PLAN_LINKS} />
      <main>
        {/* HERO */}
        <section className="relative">
          <HeroBackdrop />
          <Container className="relative max-w-6xl pt-32 pb-8 lg:pt-40">
            <div className="mx-auto max-w-3xl text-center">
              <p className="inline-flex items-center gap-2 rounded-full bg-tint px-4 py-1.5 text-sm font-medium text-primary mb-6">
                <Workflow className="h-4 w-4" aria-hidden />
                How it works
              </p>
              <h1 className="font-display text-4xl font-medium tracking-tight text-slate-900 sm:text-6xl">
                From one brief to <Accent>a plan.</Accent>
              </h1>
              <p className="mx-auto mt-6 max-w-2xl text-lg tracking-tight text-slate-700">
                Four stages, the same ones a good planner works through. You write the brief; Halliard does the rest
                and shows its working. Free to start.
              </p>
              <p className="mt-4 text-sm text-slate-500">
                Want to see a finished one first?{' '}
                <Link href="/plan/sample" className="font-semibold text-primary hover:underline">
                  Open the sample plan →
                </Link>
              </p>
            </div>
          </Container>
        </section>

        {/* THE STAGES */}
        <section className="pb-20 sm:pb-28">
          <Container className="max-w-6xl">
            <StepRows steps={STEPS} />
          </Container>
        </section>

        {/* OPTIONAL BUYING */}
        <section className="py-16 sm:py-24" style={SOFT_BAND}>
          <Container className="max-w-6xl">
            <SectionHeading
              eyebrow="Optional"
              title="Then, if you want it bought"
              body="The plan is yours either way. Buy it the way you do today, or hand it to Halliard to buy and keep pacing."
            />
            <StepRows steps={BUYING_STEPS} />
            <p className="mt-4 text-center text-sm text-slate-500">
              Buying has a fee, shown on each campaign before you approve it.{' '}
              <Link href="/buying-desk/pricing" className="font-semibold text-primary hover:underline">
                See how it is worked out →
              </Link>
            </p>
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

;(PlanHowItWorksPage as any).disableNavbar = true
;(PlanHowItWorksPage as any).fullWidth = true
;(PlanHowItWorksPage as any).siteBg = true
