import Head from 'next/head'
import Link from 'next/link'
import React from 'react'
import {
  ArrowRight,
  BadgeDollarSign,
  CalendarCheck,
  CheckCircle2,
  ClipboardCheck,
  FileText,
  Gauge,
  ListChecks,
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
  Frame,
  HeroBackdrop,
  HeroVisual,
  LandingHeader,
  PLUS_PATTERN,
  SOFT_BAND,
  SectionHeading,
  StepRows,
  useLandingAttribution,
  type Step,
} from '../../components/landing/kit'
import { BriefScene } from '../../components/plan/step-visuals'
import { BuysOnBanner, LisaQuote } from '../../components/plan/proof'
import { CampaignScene, FEE_EXAMPLE, FeeScene, LiveScene, NarrowPlan } from '../../components/buying/scenes'
import { BUYING_DESK_LINKS } from '../../components/buying/nav'
import { BOOKING_URL, PlanRequestForm } from '../../components/buying/PlanRequestForm'

// Landing page A on the GTM map: the buying desk, sold as a service to
// agencies short on buyers. The offer is a free costed plan from the
// visitor's brief, back within 24 hours, with no account: the form at
// #get-plan sends it to Formspark through /api/lead, and the account comes
// later, when they approve a plan. The hero matches the ad by utm_content or
// utm_term: the "freelance media buyer", "outsourced media buying" and "AI
// media buying" search ad groups get their own; everything else, Meta
// included, gets the default.
const HERO = {
  default: {
    eyebrow: 'For agencies short on buyers',
    title: 'Your next campaign planned, bought and kept pacing.',
    accent: 'No new hire.',
  },
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
  if (/freelanc|cheaper/.test(hint)) return 'freelance'
  if (/outsourc|white.?label|for.?agencies/.test(hint)) return 'outsourced'
  if (/\bai\b|agentic|artificial/.test(hint)) return 'ai'
  return 'default'
}

const usd = (v: number) => `$${v.toLocaleString('en-US')}`

// Paraphrased from what agencies told us on sales calls, not quotes.
const PAINS = [
  {
    line: 'All the digital still runs through one person.',
    detail: 'Planning, programmatic, social and reporting, for every client, from one inbox.',
  },
  {
    line: 'Someone left, and the role never got backfilled.',
    detail: 'So you lean on freelancers you have to brief, chase and check.',
  },
  {
    line: "We're brute-forcing it in spreadsheets.",
    detail: 'Campaign IDs by hand, invoices to match, and finance asking whether the campaign even started.',
  },
]

const CHANGES = [
  ['Hire a buyer and carry the salary whether there is work or not', 'Pay a fee per campaign, only when there is a campaign'],
  ['Brief a freelancer, then chase and check the work', 'Send the brief once and approve a plan you can read line by line'],
  ['Wait days for a plan', 'A costed plan with modelled reach, back within 24 hours'],
  ['Find out late that a line stopped delivering', 'Delivery checked every six hours, with bigger changes brought to you first'],
  ['Rebuild the story for the client from spreadsheets', 'Every buy, change and approval on a record you can show the client'],
]

const STEPS: Step[] = [
  {
    icon: FileText,
    label: 'Send the brief · 5 minutes',
    title: 'Send it the way you would to a buyer',
    body: 'Write it in your own words or send the RFP. We pull out the goal, budget, timing and audience, and check that the budget and the dates add up.',
    points: [
      { icon: Upload, text: 'Your words or the RFP, no forms to fill' },
      { icon: ListChecks, text: 'The goal, budget, timing and audience, pulled out for you' },
      { icon: CalendarCheck, text: 'A check that the budget and the dates add up' },
    ],
    frame: 'Brief',
    Scene: BriefScene,
  },
  {
    icon: ClipboardCheck,
    label: 'Get the plan · within 24 hours',
    title: 'A costed plan you approve line by line',
    body: 'Audiences, channels and properties with budgets, CPMs and reach modelled before spend, plus our fee for the campaign. Change what you want and approve what you keep.',
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
    label: 'We buy it · live in days',
    title: 'We buy it and keep it pacing',
    body: 'Approved lines go live on Meta and PubMatic. We check delivery every six hours. Bigger changes wait for your approval; small budget adjustments run on their own and are logged.',
    points: [
      { icon: Timer, text: 'Delivery checked every six hours' },
      { icon: CheckCircle2, text: 'Bigger budget moves proposed, approved by you, then made' },
      { icon: ScrollText, text: 'Every buy, change and approval on the record' },
    ],
    frame: 'Campaigns',
    Scene: LiveScene,
  },
]

const INCLUDED = [
  'Brief read and checked',
  'Media plan with modelled reach',
  'Campaigns built and launched',
  'Pacing checked every six hours',
  'Budget moves proposed to you',
  'A record you can show the client',
]

const FAQ = [
  {
    q: 'Is this going to be extra work for my team?',
    a: 'You send a brief and approve a plan, the same as briefing a buyer. There is no tool to learn and no campaigns to build.',
  },
  {
    q: 'Which channels can you buy?',
    a: 'Meta (Facebook and Instagram), and streaming TV through PubMatic, including Paramount+, Tubi and Pluto TV.',
  },
  {
    q: 'What does the free plan commit me to?',
    a: 'Nothing. If you like the plan, approve it and we set up your account and buy it. If you don’t, you keep the plan.',
  },
]

export default function BuyingDeskPage() {
  const { utms, track, capture } = useLandingAttribution('/buying-desk', { posthog: 'halliard3' })
  const heroKey = heroFor(utms)
  const hero = HERO[heroKey]
  const toForm = (location: string) => () => track(location)
  const book = (location: string) => () => capture('buying_desk_call_booking_clicked', { location })

  return (
    <>
      <Head>
        <title>Your Agency&apos;s Buying Desk, Without the Hire | Halliard</title>
        <meta
          name="description"
          content="Send us the brief and get a costed media plan back within 24 hours, free. Approve it line by line and we buy it on Meta and streaming TV and keep it pacing."
        />
        <meta property="og:title" content="Your Agency's Buying Desk, Without the Hire | Halliard" />
        <meta
          property="og:description"
          content="Send the brief, get a costed plan back within 24 hours, approve every line. No new hire."
        />
      </Head>
      <LandingHeader href="#get-plan" cta="Get a free plan" onClick={toForm('header')} links={BUYING_DESK_LINKS} />
      <main>
        {/* HERO: most visitors read only this screen, so the offer and the price are here. */}
        <section className="relative">
          <HeroBackdrop />
          <Container className="relative max-w-6xl pt-20 pb-14 sm:pt-28 lg:pt-40 lg:pb-28">
            <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)] gap-12 items-center">
              <div className="text-center lg:text-left">
                <p className="hidden sm:inline-flex items-center gap-2 rounded-full bg-tint px-4 py-1.5 text-sm font-medium text-primary mb-5">
                  <img src="/plan-grid/halliard-mark.png" alt="" className="h-4 w-4" />
                  {hero.eyebrow}
                </p>
                <h1 className="font-display text-[2rem] leading-tight font-medium tracking-tight text-slate-900 sm:text-6xl text-balance">
                  {hero.title} <Accent>{hero.accent}</Accent>
                </h1>
                <p className="mx-auto lg:mx-0 mt-4 sm:mt-5 max-w-xl text-base sm:text-lg tracking-tight text-slate-700">
                  Send us the brief. You get a costed media plan back within 24 hours. Approve it line by line, and we buy
                  it on Meta and streaming TV and keep it on pace.
                </p>
                <div className="mt-6 sm:mt-7 flex flex-col sm:flex-row justify-center lg:justify-start gap-3">
                  <Button href="#get-plan" color="blue" className="px-6 py-3 text-base" onClick={toForm('hero')}>
                    Get a free plan for your next brief
                    <ArrowRight className="ml-2 h-4 w-4" aria-hidden />
                  </Button>
                  <a
                    href={BOOKING_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={book('hero')}
                    className="inline-flex items-center justify-center rounded-full px-6 py-3 text-base text-slate-700 ring-1 ring-slate-300 hover:text-slate-900 hover:ring-slate-400"
                  >
                    Talk to us first
                  </a>
                </div>
                <div className="mx-auto lg:mx-0 mt-5 sm:mt-6 max-w-md rounded-2xl bg-white/90 px-5 py-3 sm:py-4 text-left shadow-sm ring-1 ring-slate-900/5">
                  <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                    Example: 13-week streaming TV campaign
                  </p>
                  <p className="mt-1 flex flex-wrap items-baseline gap-x-3 tabular-nums">
                    <span className="text-lg text-slate-400 line-through">{usd(FEE_EXAMPLE.freelancer)}</span>
                    <span className="font-display text-3xl font-medium text-primary">{usd(FEE_EXAMPLE.halliard)}</span>
                    <span className="text-sm text-slate-600">Halliard fee</span>
                  </p>
                  <p className="mt-1 text-xs sm:text-sm text-slate-600">
                    Against about {FEE_EXAMPLE.hours} hours of a freelance buyer at ${FEE_EXAMPLE.rate}/hr. Every campaign
                    shows its fee before you approve it.
                  </p>
                </div>
                <ul className="mt-6 flex flex-wrap justify-center lg:justify-start gap-x-6 gap-y-2 text-sm text-slate-600">
                  {['Plan back within 24 hours', 'You approve every line', 'No account needed'].map(t => (
                    <li key={t} className="inline-flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4 text-primary" aria-hidden />
                      {t}
                    </li>
                  ))}
                </ul>
                <p className="mt-4 text-sm text-slate-500">
                  No brief right now?{' '}
                  <Link href="/plan/sample" className="font-medium text-primary underline-offset-2 hover:underline" onClick={() => capture('buying_desk_sample_plan_clicked')}>
                    See a sample plan
                  </Link>
                </p>
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

        {/* THE PROBLEM */}
        <section className="py-16 sm:py-24">
          <Container className="max-w-4xl">
            <SectionHeading eyebrow="Sound familiar?" title="The work keeps growing. The team doesn't." />
            <div className="mt-10 grid grid-cols-1 gap-4">
              {PAINS.map(p => (
                <div key={p.line} className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-900/5">
                  <p className="font-display text-xl tracking-tight text-slate-900">&ldquo;{p.line}&rdquo;</p>
                  <p className="mt-2 text-slate-600">{p.detail}</p>
                </div>
              ))}
            </div>
            <p className="mt-8 text-lg text-slate-700">
              Every new client means another hire or another freelancer. A hire is months of salary before you know it
              worked out. And the work you can&rsquo;t staff is work you turn down.
            </p>
          </Container>
        </section>

        {/* WHAT CHANGES */}
        <section className="py-16 sm:py-24" style={SOFT_BAND}>
          <Container className="max-w-4xl">
            <SectionHeading eyebrow="What changes" title="A buying desk you don't have to staff" />
            <div className="mt-10 overflow-x-auto rounded-2xl bg-white shadow-sm ring-1 ring-slate-900/5">
              <table className="w-full min-w-[34rem] text-left text-base">
                <thead className="bg-tint/60 text-xs font-semibold uppercase tracking-wider text-slate-600">
                  <tr>
                    <th className="px-5 py-3">Today</th>
                    <th className="px-5 py-3">With Halliard</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {CHANGES.map(([before, after]) => (
                    <tr key={before}>
                      <td className="w-1/2 px-5 py-4 align-top text-slate-500">{before}</td>
                      <td className="px-5 py-4 align-top font-medium text-slate-900">{after}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Container>
        </section>

        {/* HOW IT WORKS */}
        <section className="py-20 sm:py-28">
          <Container className="max-w-6xl">
            <SectionHeading
              eyebrow="How it works"
              title="Three steps, and you approve each one"
              body="Nothing is bought until you approve it."
            />
            <StepRows steps={STEPS} />
            <div className="mt-14 text-center">
              <Button href="/buying-desk/how-it-works" variant="outline" color="slate" className="px-6 py-3 text-base">
                See all six stages →
              </Button>
            </div>
          </Container>
        </section>

        {/* THE OFFER */}
        <section className="py-16 sm:py-24" style={SOFT_BAND}>
          <Container className="max-w-6xl">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
              <div>
                <p className="inline-flex items-center rounded-full bg-tint px-4 py-1.5 text-sm font-medium text-primary">
                  What it costs
                </p>
                <h2 className="mt-5 font-display text-3xl tracking-tight text-slate-900 sm:text-4xl">
                  One fee per campaign, shown before you approve
                </h2>
                <p className="mt-4 text-lg tracking-tight text-slate-700">
                  We estimate the hours a freelance buyer would spend to plan, set up, launch, monitor and report on the
                  campaign, at ${FEE_EXAMPLE.rate} an hour. Our fee is 30% of that. Pass it through to your client or
                  absorb it.
                </p>
                <ul className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-3 text-slate-700">
                  {INCLUDED.map(t => (
                    <li key={t} className="flex items-start gap-3">
                      <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-primary" aria-hidden />
                      {t}
                    </li>
                  ))}
                </ul>
                <div className="mt-8 flex flex-col sm:flex-row gap-3">
                  <Button href="#get-plan" color="blue" className="px-6 py-3 text-base" onClick={toForm('offer')}>
                    Get a free plan for your next brief
                    <ArrowRight className="ml-2 h-4 w-4" aria-hidden />
                  </Button>
                  <Button href="/buying-desk/pricing" variant="outline" color="slate" className="px-6 py-3 text-base">
                    Work out your fee
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

        {/* PROOF */}
        <section className="py-16 sm:py-20">
          <Container className="">
            <div className="mx-auto max-w-3xl">
              <LisaQuote />
            </div>
          </Container>
        </section>

        {/* QUESTIONS */}
        <section className="pb-16 sm:pb-24">
          <Container className="max-w-3xl">
            <SectionHeading eyebrow="Questions" title="Before you send a brief" />
            <div className="mt-10 flex flex-col gap-3">
              {FAQ.map((f, i) => (
                <details key={f.q} open={i === 0} className="group rounded-2xl bg-white px-6 py-5 shadow-sm ring-1 ring-slate-900/5">
                  <summary className="cursor-pointer list-none font-semibold text-slate-900">{f.q}</summary>
                  <p className="mt-3 text-slate-600">{f.a}</p>
                </details>
              ))}
              <details className="group rounded-2xl bg-white px-6 py-5 shadow-sm ring-1 ring-slate-900/5">
                <summary className="cursor-pointer list-none font-semibold text-slate-900">
                  Can my own buyers use it instead?
                </summary>
                <p className="mt-3 text-slate-600">
                  Yes. If you have buyers and want them to plan faster, see{' '}
                  <Link href="/plan" className="font-medium text-primary hover:underline">
                    Halliard for planners
                  </Link>
                  .
                </p>
              </details>
            </div>
          </Container>
        </section>

        {/* THE FORM */}
        <section id="get-plan" className="relative scroll-mt-20 overflow-hidden bg-primary py-16 sm:py-24">
          <div className="absolute inset-0 bg-gradient-to-br from-primary to-secondary" />
          <div className="absolute inset-0 opacity-[0.15]" style={{ backgroundImage: PLUS_PATTERN, backgroundSize: '18px 18px' }} />
          <Container className="relative max-w-5xl">
            <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] gap-10 items-start">
              <div className="text-center lg:text-left text-white">
                <p className="text-sm font-semibold uppercase tracking-wider text-white/80">Free, no account</p>
                <h2 className="mt-3 font-display text-3xl tracking-tight sm:text-4xl text-balance">
                  Send your next brief. Get a costed plan back within 24 hours.
                </h2>
                <p className="mt-4 text-lg text-white/85">
                  If you like the plan, approve it and we buy it. If you don&rsquo;t, you&rsquo;ve lost five minutes.
                </p>
                <p className="mt-6 text-sm text-white/80">
                  Rather talk first?{' '}
                  <a href={BOOKING_URL} target="_blank" rel="noopener noreferrer" onClick={book('form')} className="font-semibold text-white underline underline-offset-2">
                    Book 15 minutes
                  </a>
                </p>
              </div>
              <PlanRequestForm utms={utms} hero={heroKey} capture={capture} />
            </div>
          </Container>
        </section>
      </main>
    </>
  )
}

;(BuyingDeskPage as any).disableNavbar = true
;(BuyingDeskPage as any).fullWidth = true
;(BuyingDeskPage as any).siteBg = true
