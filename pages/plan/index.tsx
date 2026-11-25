import Head from 'next/head'
import Link from 'next/link'
import React from 'react'
import {
  ArrowRight,
  BarChart3,
  Building2,
  CalendarRange,
  CircleDollarSign,
  Download,
  FileSpreadsheet,
  GripHorizontal,
  Layers,
  type LucideIcon,
  MapPin,
  MousePointerClick,
  Pencil,
  PieChart,
  Radio,
  RefreshCw,
  ScrollText,
  ShieldCheck,
  SlidersHorizontal,
  Table2,
  Target,
  Timer,
  Tv,
  Users,
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
import { PlanGridHero } from '../../components/plan/plan-grid-hero'
import { AddToAssistant } from '../../components/plan/add-to-assistant'
import { PLAN_STEPS } from '../../components/plan/steps'
import {
  ApproveVisual,
  BuyVisual,
  ClientsVisual,
  LedgerVisual,
  LocalVisual,
  PacingVisual,
} from '../../components/plan/feature-visuals'
import { BuysOnBanner, LisaQuote } from '../../components/plan/proof'
import {
  ChartsScene,
  ExportScene,
  FlowchartScene,
  PlanTotalScene,
  TableScene,
} from '../../components/plan/planner-visuals'

// The hero matches the ad group that sent the visitor. Search ads for the
// reach and frequency ad group carry utm_content or utm_term naming it.
const HERO = {
  default: {
    eyebrow: 'For agency and in-house media planners',
    title: 'Media planning with the reach',
    accent: 'in plain view.',
    body: 'Paste a brief or drop in an RFP. In about six minutes Halliard drafts the audiences, strategy and channel plan. Then work it the way you already do: edit spend in one table, see where reach tops out, flight it week by week and export it to Excel.',
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

// The three planning problems agencies raised most on sales calls, each with
// what Halliard does about it. Kept to a line each: this is a glance, not a read.
const PROBLEMS: { icon: LucideIcon; before: string; after: string }[] = [
  { icon: BarChart3, before: 'Reach and frequency lives in an old spreadsheet.', after: 'Every line modelled as you edit it.' },
  { icon: CalendarRange, before: 'The flowchart is a separate file.', after: 'Flight it in the plan, with reach under every week.' },
  { icon: CircleDollarSign, before: 'How much is enough? We guess.', after: 'The reach curve shows where more spend stops paying.' },
]

// The planner's own views, each with what it does for a planner. Labels name
// the portal tab; they double as the `feature` on plan_feature_viewed.
const PLANNER: Step[] = [
  {
    icon: Table2,
    label: 'Table',
    title: 'Every line of the plan, in one grid.',
    body: 'Each strategy, channel and property sits in one table with its spend, CPM, impressions, reach and frequency. Type a new spend into any line and reach recalculates for that line and its strategy.',
    points: [
      { icon: BarChart3, text: 'Reach at every level from 1+ to 10+, with frequency beside it' },
      { icon: Tv, text: 'TV and radio start on a recommended demo guarantee' },
      { icon: Users, text: 'Set the buying audience and frequency cap line by line' },
    ],
    frame: 'Plan · Table',
    Scene: TableScene,
  },
  {
    icon: PieChart,
    label: 'Charts',
    title: 'See where more spend stops buying reach.',
    body: 'The reach curve shows what each extra dollar adds. Pick any spend on it to see the reach it buys, so you can defend the budget, or find the point where more money mostly buys frequency.',
    points: [
      { icon: MousePointerClick, text: 'A reach curve you can pick a spend on' },
      { icon: Layers, text: 'Audience overlap between channels' },
      { icon: SlidersHorizontal, text: 'Spend and frequency breakdowns' },
      { icon: Download, text: 'Download any chart as an image or a CSV for the deck' },
    ],
    frame: 'Plan · Charts',
    Scene: ChartsScene,
  },
  {
    icon: CalendarRange,
    label: 'Flowchart',
    title: 'Flight it week by week, and watch reach move.',
    body: 'Drag a block to move it, drag its ends to resize it, drag across empty weeks to add one, and right-click to split or delete. Each block keeps its budget, and the weekly dollars show while you drag. Make several changes: they are recalculated together once you pause.',
    points: [
      { icon: GripHorizontal, text: 'Live weekly dollars while you drag' },
      { icon: BarChart3, text: 'Reach under each channel by week, month or quarter' },
      { icon: Target, text: 'Totals per strategy and for the whole plan, each person counted once' },
    ],
    frame: 'Plan · Flowchart',
    Scene: FlowchartScene,
  },
  {
    icon: FileSpreadsheet,
    label: 'Export',
    title: 'Hand it over in Excel.',
    body: 'Export the plan as an Excel workbook. Its Flighting sheet matches the Flowchart, block for block, so the client, the buyers and finance all work from the same weeks.',
    points: [
      { icon: CalendarRange, text: 'The Flighting sheet mirrors the Flowchart' },
      { icon: RefreshCw, text: 'Change the plan, export again' },
    ],
    frame: 'Plan · Export',
    Scene: ExportScene,
  },
]

/**
 * The planning landing page, at /planning (it was the homepage until the home
 * became the brand page). /plan renders it too, for older ads, with /planning
 * as its canonical; both keep the `plan_*` event names, so the planning ads'
 * visitors read as one page.
 */
export function PlanLanding({ path }: { path: '/planning' | '/plan' }) {
  const { utms, track, capture, href } = useLandingAttribution(path, { event: 'plan' })
  const heroKey = heroFor(utms)

  const hero = HERO[heroKey]

  return (
    <>
      <Head>
        <title>Media Planning Tool and Software, Free to Start | Halliard</title>
        <meta
          name="description"
          content="Plan TV, radio, streaming and social in one table, with reach and frequency modelled as you edit. Flight it week by week and export to Excel. Free to start."
        />
        <link rel="canonical" href="https://www.halliardmedia.com/planning" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://www.halliardmedia.com/planning" />
        <meta property="og:title" content="Media Planning Tool and Software, Free to Start | Halliard" />
        <meta
          property="og:description"
          content="Paste a brief. Halliard drafts the plan in minutes; you edit it in one table, flight it week by week and see the reach move."
        />
      </Head>
      <LandingHeader href={href} cta="Start planning free" onClick={() => track('header')} />
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
                  <Link href="/sample" className="text-base font-semibold text-primary hover:underline">
                    See a sample plan &rarr;
                  </Link>
                </div>
                <p className="mt-4 text-sm text-slate-600">
                  Free. No credit card. Try it on a past brief or a made-up one.
                </p>
                <AddToAssistant
                  className="mt-6"
                  onAdd={assistant => capture('plan_add_to_assistant_clicked', { assistant, location: 'hero' })}
                />
                <ul className="mt-6 flex flex-wrap justify-center lg:justify-start gap-x-6 gap-y-3 text-sm text-slate-600">
                  <li className="inline-flex items-center gap-2">
                    <Pencil className="h-4 w-4 text-primary" aria-hidden />
                    Edit every line
                  </li>
                  <li className="inline-flex items-center gap-2">
                    <CalendarRange className="h-4 w-4 text-primary" aria-hidden />
                    Week-by-week flowchart
                  </li>
                  <li className="inline-flex items-center gap-2">
                    <FileSpreadsheet className="h-4 w-4 text-primary" aria-hidden />
                    Exports to Excel
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

        {/* THE PROBLEM */}
        <section className="py-16 sm:py-20">
          <Container className="max-w-5xl">
            <SectionHeading eyebrow="Sound familiar?" title="Planning shouldn't run on guesswork." />
            <ul className="mt-10 grid grid-cols-1 gap-5 md:grid-cols-3">
              {PROBLEMS.map(({ icon: Icon, before, after }) => (
                <li key={before} className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-900/5">
                  <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-tint text-primary">
                    <Icon className="h-5 w-5" aria-hidden />
                  </span>
                  <p className="mt-4 text-slate-500">{before}</p>
                  <p className="mt-2 flex items-start gap-2 font-display text-lg leading-snug tracking-tight text-slate-900">
                    <ArrowRight className="mt-1 h-4 w-4 shrink-0 text-primary" aria-hidden />
                    {after}
                  </p>
                </li>
              ))}
            </ul>
          </Container>
        </section>

        {/* INSIDE THE PLANNER */}
        <section className="py-20 sm:py-28" style={SOFT_BAND}>
          <Container className="max-w-6xl">
            <SectionHeading
              eyebrow="Inside the planner"
              title="The plan, worked the way planners work."
              body="A table to edit, charts to defend the budget, a flowchart to flight it and a workbook to hand over."
            />
            <StepRows
              steps={PLANNER}
              numbered={false}
              onSeen={feature => capture('plan_feature_viewed', { feature })}
            />
          </Container>
        </section>

        {/* THE PLAN TOTAL */}
        <section className="py-16 sm:py-24">
          <Container className="max-w-6xl">
            <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-2 lg:gap-16">
              <div>
                <p className="inline-flex items-center rounded-full bg-tint px-4 py-1.5 text-sm font-medium text-primary">
                  The plan total
                </p>
                <h2 className="mt-5 font-display text-3xl tracking-tight text-slate-900 sm:text-4xl">
                  One reach number for the whole plan.
                </h2>
                <p className="mt-4 text-lg tracking-tight text-slate-700">
                  Add up each strategy&rsquo;s reach and you count the same people twice. Halliard gives the plan&rsquo;s 1+
                  reach across every strategy, counting each person once, next to its average frequency, impressions and
                  blended CPM. It&rsquo;s the number to put in front of the client.
                </p>
              </div>
              <div className="min-w-0">
                <Frame label="Plan · Total">
                  <PlanTotalScene />
                </Frame>
              </div>
            </div>
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
          subtitle="Edit it, flight it, export it. You make the calls."
          cta="Start planning free"
          href={href}
          onClick={() => track('closing')}
        />
      </main>
    </>
  )
}

export default function PlanPage() {
  return <PlanLanding path="/plan" />
}

;(PlanPage as any).disableNavbar = true
;(PlanPage as any).fullWidth = true
;(PlanPage as any).siteBg = true
