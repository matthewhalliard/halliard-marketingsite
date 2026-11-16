import Head from 'next/head'
import Link from 'next/link'
import React from 'react'
import {
  ArrowRight,
  CalendarRange,
  Clock,
  Download,
  FileSpreadsheet,
  GraduationCap,
  HeartPulse,
  type LucideIcon,
  Megaphone,
  MousePointerClick,
  RefreshCw,
  Search,
  Store,
  Table2,
  Wallet,
  Wrench,
  BookOpen,
} from 'lucide-react'
import { Container } from '../components/mmm/Container'
import { Button } from '../components/mmm/Button'
import { Accent, ClosingCta, HeroBackdrop, HeroVisual, LandingHeader, SOFT_BAND, SectionHeading, useLandingAttribution } from '../components/landing/kit'
import { TemplateSheetScene } from '../components/resources/visuals'

// "Media plan template": what people search for is the file and a finished
// example, so those come first. The examples by business and the jobs Halliard
// plans for come after, as the way from a spreadsheet into the product.

// The workbook is the client portal's own plan export, filled in with the
// sample plan on /sample. It is served from this site.
const EXCEL_TEMPLATE_URL = '/templates/halliard-media-plan-template.xlsx'

const TABS: { icon: LucideIcon; title: string; body: string }[] = [
  {
    icon: Table2,
    title: 'The plan',
    body: 'One row for each strategy, channel and property, with its audience, who buys it, spend, CPM and impressions. Impressions and totals are formulas, so they update as you type.',
  },
  {
    icon: Wallet,
    title: 'The budget',
    body: 'Spend and share of budget by strategy and by channel, with the blended CPM for the whole plan. It is the Summary tab.',
  },
  {
    icon: CalendarRange,
    title: 'The flowchart',
    body: 'Spend by week across the flight, channel by channel, with a weekly total. It is the Flighting tab.',
  },
]

const INCLUDES = [
  'Who the audience is, and where they are',
  'What job each dollar has',
  'Which channels and properties it runs on',
  'How much it costs, and when it runs',
  'How many of the audience it should reach, and how often',
]

// Made-up plans, to show the shape of one for a business like the reader's.
// Budgets and splits are illustrative, not a client's and not a recommendation.
const EXAMPLES: { icon: LucideIcon; title: string; budget: number; flight: string; job: string; mix: [string, number][] }[] = [
  {
    icon: Wrench,
    title: 'Local service business',
    budget: 60000,
    flight: '10 weeks',
    job: 'Build fame in the service area',
    mix: [['Streaming TV', 28000], ['Streaming audio', 12000], ['Paid social', 12000], ['Search', 8000]],
  },
  {
    icon: GraduationCap,
    title: 'College',
    budget: 150000,
    flight: '12 weeks',
    job: 'Prompt applications',
    mix: [['Paid social', 55000], ['Search', 40000], ['Streaming TV', 35000], ['Online video', 20000]],
  },
  {
    icon: HeartPulse,
    title: 'Healthcare provider',
    budget: 200000,
    flight: '16 weeks',
    job: 'Educate a specific patient audience',
    mix: [['Streaming TV', 80000], ['Online video', 45000], ['Paid social', 40000], ['Search', 35000]],
  },
  {
    icon: Store,
    title: 'Multi-location retailer',
    budget: 120000,
    flight: '8 weeks',
    job: 'Be there in the moment before a store visit',
    mix: [['Outdoor near stores', 40000], ['Radio', 30000], ['Paid social', 30000], ['Search', 20000]],
  },
]

// The jobs Halliard plans for, and the bar its budget check holds each one to.
const JOBS: { icon: LucideIcon; title: string; bar: string }[] = [
  { icon: Megaphone, title: 'Build fame', bar: 'Half the audience reached three or more times.' },
  { icon: RefreshCw, title: 'Remind', bar: 'Half the audience reached about once a week.' },
  { icon: BookOpen, title: 'Educate', bar: '40% of the audience reached four or more times.' },
  { icon: Clock, title: 'Be there in a moment', bar: '60% reached at least once, through channels that can be timed.' },
  { icon: Search, title: 'Capture demand', bar: 'Checked against how much search there is to buy.' },
  { icon: MousePointerClick, title: 'Prompt action', bar: 'Checked against cost per lead or sale.' },
]

const FAQ: { q: string; a: string }[] = [
  {
    q: 'Does the media plan template work in Google Sheets?',
    a: 'Yes. Upload the file to Google Drive and open it with Google Sheets. The formulas carry over.',
  },
  {
    q: 'Is this a social media content calendar?',
    a: 'No. It plans paid advertising: where ads run, what they cost and how many people they reach. A content calendar schedules posts.',
  },
  {
    q: 'What is a media flowchart?',
    a: 'The week-by-week view of a media plan: each channel down the side, the weeks across the top, and what is spent in each. In this template it is the Flighting tab.',
  },
  {
    q: 'What is the difference between a template and a planning tool?',
    a: 'The template records a plan you have already made. Halliard drafts the plan from a brief, sizes the audience and models its reach, and you edit any line.',
  },
]

const usd = (v: number) => `$${v.toLocaleString('en-US')}`

const FAQ_SCHEMA = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: FAQ.map(({ q, a }) => ({ '@type': 'Question', name: q, acceptedAnswer: { '@type': 'Answer', text: a } })),
}

export default function MediaPlanningTemplatesPage() {
  const { track, href } = useLandingAttribution('/media-planning-templates')
  return (
    <>
      <Head>
        <title>Free Media Plan Template (Excel) with Example | Halliard</title>
        <link rel="canonical" href="https://www.halliardmedia.com/media-planning-templates" />
        <meta
          name="description"
          content="A free media plan template for paid media, in Excel: plan, budget and flowchart tabs, filled in with an example. Download it, or have Halliard draft the plan."
        />
        <meta property="og:title" content="Free Media Plan Template (Excel) with Example | Halliard" />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(FAQ_SCHEMA) }} />
      </Head>
      <LandingHeader href={href} cta="Build your plan free" onClick={() => track('header')} />
      <main>
        {/* HERO: the download */}
        <section className="relative">
          <HeroBackdrop />
          <Container className="relative max-w-6xl pt-32 pb-16 lg:pt-40 lg:pb-20">
            <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.25fr)]">
              <div className="text-center lg:text-left">
                <p className="mb-6 inline-flex items-center gap-2 rounded-full bg-tint px-4 py-1.5 text-sm font-medium text-primary">
                  <FileSpreadsheet className="h-4 w-4" aria-hidden />
                  Template
                </p>
                <h1 className="font-display text-4xl font-medium tracking-tight text-slate-900 sm:text-6xl">
                  Media plan template, <Accent>free.</Accent>
                </h1>
                <p className="mx-auto mt-6 max-w-xl text-lg tracking-tight text-slate-700 lg:mx-0">
                  A media plan template for paid media: TV, streaming, radio, outdoor, search and paid social. Download it
                  filled in with an example, then type over it.
                </p>
                <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row sm:gap-6 lg:justify-start">
                  <a
                    href={EXCEL_TEMPLATE_URL}
                    download
                    onClick={() => track('excel-template-hero')}
                    className="inline-flex items-center justify-center rounded-full bg-primary px-6 py-3 text-base font-semibold text-white hover:bg-primary/90"
                  >
                    <Download className="mr-2 h-4 w-4" aria-hidden />
                    Download the template
                  </a>
                  <a
                    href={href}
                    onClick={() => track('hero-draft')}
                    className="text-base font-semibold text-primary hover:underline"
                  >
                    Or have Halliard draft the plan
                  </a>
                </div>
                <p className="mt-4 text-sm text-slate-600">Free. Opens in Excel or Google Sheets. No sign-up.</p>
              </div>
              <HeroVisual label="Halliard Media Plan Template.xlsx">
                <TemplateSheetScene />
              </HeroVisual>
            </div>
          </Container>
        </section>

        {/* WHAT'S IN IT */}
        <section className="pb-20">
          <Container className="max-w-6xl">
            <SectionHeading
              eyebrow="What's in the template"
              title="Plan, budget and flowchart in one file."
              body="Three views of the same plan, laid out to be read and printed."
            />
            <ul className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-3">
              {TABS.map(({ icon: Icon, title, body }) => (
                <li key={title} className="rounded-2xl border border-tint bg-white p-6 shadow-sm">
                  <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-tint text-primary">
                    <Icon className="h-5 w-5" aria-hidden />
                  </span>
                  <h3 className="mt-4 font-display text-lg text-slate-900">{title}</h3>
                  <p className="mt-2 text-sm text-slate-600">{body}</p>
                </li>
              ))}
            </ul>
          </Container>
        </section>

        {/* THE EXAMPLE, AND WHAT A MEDIA PLAN IS */}
        <section className="py-20 sm:py-24" style={SOFT_BAND}>
          <Container className="max-w-6xl">
            <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
              <div className="rounded-2xl border border-tint bg-white p-7 shadow-sm">
                <p className="text-sm font-medium text-primary">Media plan example</p>
                <h2 className="mt-2 font-display text-2xl tracking-tight text-slate-900">See it filled in.</h2>
                <p className="mt-3 text-slate-700">
                  The template comes with an example plan: a $250,000 spring launch for a heating and air company in
                  Dallas–Fort Worth, split between building fame and prompting action over 13 weeks.
                </p>
                <dl className="mt-5 grid grid-cols-2 gap-x-6 gap-y-3 text-sm">
                  {[
                    ['CTV', 110000],
                    ['Paid social', 60000],
                    ['Streaming audio', 40000],
                    ['Online video', 40000],
                  ].map(([name, spend]) => (
                    <div key={name as string} className="flex items-baseline justify-between border-b border-slate-100 pb-2">
                      <dt className="text-slate-600">{name}</dt>
                      <dd className="font-medium tabular-nums text-slate-900">{usd(spend as number)}</dd>
                    </div>
                  ))}
                </dl>
                <Link
                  href="/sample"
                  onClick={() => track('sample')}
                  className="mt-6 inline-flex items-center text-sm font-semibold text-primary hover:underline"
                >
                  Read the full example, from brief to plan
                  <ArrowRight className="ml-1.5 h-4 w-4" aria-hidden />
                </Link>
              </div>
              <div className="rounded-2xl border border-tint bg-white p-7 shadow-sm">
                <p className="text-sm font-medium text-primary">The basics</p>
                <h2 className="mt-2 font-display text-2xl tracking-tight text-slate-900">What is a media plan?</h2>
                <p className="mt-3 text-slate-700">
                  A media plan sets out who you want to reach, where your ads will run, when, and what it will cost. A good
                  one answers five questions:
                </p>
                <ol className="mt-4 space-y-2 text-sm text-slate-700">
                  {INCLUDES.map((line, i) => (
                    <li key={line} className="flex gap-3">
                      <span className="inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-tint text-[11px] font-semibold text-primary">
                        {i + 1}
                      </span>
                      {line}
                    </li>
                  ))}
                </ol>
                <Link
                  href="/guide/media-planning-guide"
                  className="mt-6 inline-flex items-center text-sm font-semibold text-primary hover:underline"
                >
                  How to create a media plan, step by step
                  <ArrowRight className="ml-1.5 h-4 w-4" aria-hidden />
                </Link>
              </div>
            </div>
          </Container>
        </section>

        {/* EXAMPLES BY BUSINESS */}
        <section className="py-20 sm:py-24">
          <Container className="max-w-6xl">
            <SectionHeading
              eyebrow="Examples by business"
              title="What a plan looks like for a business like yours."
              body="Four illustrative plans. The budgets and splits are examples, not recommendations."
            />
            <ul className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2">
              {EXAMPLES.map(({ icon: Icon, title, budget, flight, job, mix }) => (
                <li key={title} className="flex flex-col rounded-2xl border border-tint bg-white p-6 shadow-sm">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-tint text-primary">
                        <Icon className="h-5 w-5" aria-hidden />
                      </span>
                      <div>
                        <h3 className="font-display text-lg text-slate-900">{title}</h3>
                        <p className="text-sm text-slate-600">{job}</p>
                      </div>
                    </div>
                    <p className="shrink-0 text-right text-sm">
                      <span className="block font-semibold tabular-nums text-slate-900">{usd(budget)}</span>
                      <span className="block text-slate-500">{flight}</span>
                    </p>
                  </div>
                  <ul className="mt-5 space-y-2.5">
                    {mix.map(([name, spend]) => (
                      <li key={name} className="text-sm">
                        <div className="flex items-baseline justify-between">
                          <span className="text-slate-700">{name}</span>
                          <span className="tabular-nums text-slate-900">{usd(spend)}</span>
                        </div>
                        <div className="mt-1 h-1.5 overflow-hidden rounded-full bg-slate-100" aria-hidden>
                          <span className="block h-full rounded-full bg-primary/70" style={{ width: `${(spend / budget) * 100}%` }} />
                        </div>
                      </li>
                    ))}
                  </ul>
                </li>
              ))}
            </ul>
          </Container>
        </section>

        {/* START FROM THE JOB */}
        <section id="by-job" className="scroll-mt-24 py-20 sm:py-24" style={SOFT_BAND}>
          <Container className="max-w-6xl">
            <SectionHeading
              eyebrow="Plans by job"
              title="Or start from what the campaign has to do."
              body="Halliard plans by job, not by channel, and checks each budget against a bar."
            />
            <ul className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {JOBS.map(({ icon: Icon, title, bar }) => (
                <li key={title} className="rounded-2xl border border-tint bg-white p-6 shadow-sm">
                  <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-tint text-primary">
                    <Icon className="h-5 w-5" aria-hidden />
                  </span>
                  <h3 className="mt-4 font-display text-lg text-slate-900">{title}</h3>
                  <p className="mt-2 text-sm text-slate-600">{bar}</p>
                </li>
              ))}
            </ul>
            <div className="mt-10 flex justify-center">
              <Button href={href} color="blue" className="" onClick={() => track('by-job')}>
                Draft a plan from your brief, free
                <ArrowRight className="ml-2 h-4 w-4" aria-hidden />
              </Button>
            </div>
          </Container>
        </section>

        {/* QUESTIONS */}
        <section className="py-20 sm:py-24">
          <Container className="max-w-3xl">
            <SectionHeading eyebrow="Questions" title="About the template." />
            <dl className="mx-auto mt-10 max-w-3xl divide-y divide-slate-200">
              {FAQ.map(({ q, a }) => (
                <div key={q} className="py-5">
                  <dt className="font-display text-lg text-slate-900">{q}</dt>
                  <dd className="mt-2 text-slate-700">{a}</dd>
                </div>
              ))}
            </dl>
          </Container>
        </section>

        <ClosingCta
          title="Skip the spreadsheet."
          subtitle="Paste a brief and Halliard drafts the plan, with reach modelled."
          cta="Build your plan free"
          href={href}
          onClick={() => track('closing')}
        />
      </main>
    </>
  )
}

;(MediaPlanningTemplatesPage as any).disableNavbar = true
;(MediaPlanningTemplatesPage as any).fullWidth = true
;(MediaPlanningTemplatesPage as any).siteBg = true
