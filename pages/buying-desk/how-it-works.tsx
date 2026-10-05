import Head from 'next/head'
import React from 'react'
import {
  BarChart3,
  CalendarCheck,
  CheckCircle2,
  ClipboardCheck,
  FileText,
  Gauge,
  Layers,
  ListChecks,
  MapPin,
  Megaphone,
  Radio,
  ScrollText,
  Search,
  ShieldCheck,
  Target,
  Timer,
  Tv,
  Upload,
  Users,
  Workflow,
} from 'lucide-react'
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
import { AudienceScene, BriefScene, StrategyScene } from '../../components/plan/step-visuals'
import { CampaignScene, LiveScene, NarrowPlan } from '../../components/buying/scenes'
import { BUYING_DESK_LINKS } from '../../components/buying/nav'

// The buying desk, stage by stage, from the brief to a live campaign, with
// the client portal's own screens as its pictures.
const STEPS: Step[] = [
  {
    icon: FileText,
    label: 'The brief',
    title: 'Send the brief the way you would to a buyer',
    body: 'Write it in your own words or drop in the RFP. Halliard reads everything you wrote and attached, and writes it back in plain words so you can check it is what you meant.',
    points: [
      { icon: Upload, text: 'Your words or the RFP, no forms to fill' },
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
      { icon: BarChart3, text: 'Sized from real panel answers' },
      { icon: Tv, text: 'The media each audience consumes, ranked' },
    ],
    frame: 'Audiences',
    Scene: AudienceScene,
  },
  {
    icon: Target,
    label: 'Strategy',
    title: 'A role for every dollar',
    body: 'Halliard researches the category before it plans: search demand, the competition, reviews and local news. Then it writes each strategy as a role for media, with its own audience, moment, flight and budget.',
    points: [
      { icon: Search, text: 'Research you can open and read' },
      { icon: Megaphone, text: 'Build fame, prompt action, capture demand and more' },
      { icon: Layers, text: 'Each budget checked against what the job needs' },
    ],
    frame: 'Strategy',
    Scene: StrategyScene,
  },
  {
    icon: ClipboardCheck,
    label: 'The plan',
    title: 'Approve the plan, line by line',
    body: 'Channels and properties are fitted to each strategy, with reach and frequency modelled before anything is bought. Change what you want; approve what you keep.',
    points: [
      { icon: Gauge, text: 'Reach and frequency modelled before spend' },
      { icon: BarChart3, text: 'Budget, impressions, CPM and fit on every line' },
      { icon: ShieldCheck, text: 'Nothing is bought until you approve it' },
    ],
    frame: 'Media plan',
    Scene: NarrowPlan,
  },
  {
    icon: Workflow,
    label: 'The campaign',
    title: 'The buy drafted, the fee shown',
    body: 'Halliard turns the approved plan into the campaign: the inventory and audiences for each strategy, a creative check on every package, and the campaign fee next to what a freelancer would charge.',
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

const CHECKPOINTS = [
  { title: 'The plan', body: 'You approve the media plan, line by line, before anything is drafted for buying.' },
  { title: 'Going live', body: 'The campaign, its creative and its fee are approved on their own, before a dollar is spent.' },
  { title: 'Bigger changes', body: 'While it runs, budget moves over your threshold (by default 10% or $50), new ads, targeting changes, pauses and resumes wait for you. Smaller budget adjustments run on their own and are logged.' },
]

export default function BuyingDeskHowItWorksPage() {
  const { track, href } = useLandingAttribution('/buying-desk/how-it-works')
  return (
    <>
      <Head>
        <title>How the Buying Desk Works | Halliard</title>
        <meta
          name="description"
          content="From brief to live campaign: audiences, strategy, a plan with reach modelled, the buy drafted with its fee, and pacing every six hours, with you approving each step."
        />
      </Head>
      <LandingHeader href={href} cta="Send your first brief" onClick={() => track('header')} links={BUYING_DESK_LINKS} />
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
                From brief to <Accent>live campaign.</Accent>
              </h1>
              <p className="mx-auto mt-6 max-w-2xl text-lg tracking-tight text-slate-700">
                Six stages, the same ones a good buyer works through, with you approving the plan, the launch and the
                bigger changes after it.
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

        {/* WHERE YOU APPROVE */}
        <section className="py-16 sm:py-24" style={SOFT_BAND}>
          <Container className="max-w-5xl">
            <SectionHeading
              eyebrow="Where you approve"
              title="Three points where nothing moves without you"
              body="Halliard does the work between them. Each approval, and every change made without one, is logged."
            />
            <ol className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-3">
              {CHECKPOINTS.map((c, i) => (
                <li key={c.title} className="relative rounded-2xl border border-tint bg-white p-6 shadow-lg">
                  <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-primary text-sm font-semibold text-white">
                    {i + 1}
                  </span>
                  <h3 className="mt-4 font-display text-lg text-slate-900">{c.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-600">{c.body}</p>
                </li>
              ))}
            </ol>
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

;(BuyingDeskHowItWorksPage as any).disableNavbar = true
;(BuyingDeskHowItWorksPage as any).fullWidth = true
;(BuyingDeskHowItWorksPage as any).siteBg = true
