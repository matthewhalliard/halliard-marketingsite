import Head from 'next/head'
import Link from 'next/link'
import React from 'react'
import {
  ArrowRight,
  Baby,
  Download,
  FileSpreadsheet,
  Glasses,
  type LucideIcon,
  Megaphone,
  MessageCircle,
  RefreshCw,
  Rocket,
  ShoppingBag,
  Smartphone,
  Store,
  Sunrise,
} from 'lucide-react'
import { Container } from '../components/mmm/Container'
import { Button } from '../components/mmm/Button'
import { Accent, ClosingCta, HeroBackdrop, LandingHeader, SOFT_BAND, SectionHeading, useLandingAttribution } from '../components/landing/kit'

// "Media plan template": the free Excel template, and plan templates by goal
// that open as a brief in Halliard. The template download used to be a page of
// its own; it is the first thing here now.

const EXCEL_TEMPLATE_URL =
  'https://firebasestorage.googleapis.com/v0/b/elegant-clarity-269013.appspot.com/o/Halliard%20Media%20Plan%20Template.xlsx?alt=media&token=e0d10019-ca4c-48e1-b0ed-e814dd4b955c'

const TEMPLATES: { icon: LucideIcon; title: string; body: string }[] = [
  { icon: Smartphone, title: 'Reach millennials', body: 'Reach millennials between 25 and 40 years old across the US.' },
  { icon: ShoppingBag, title: 'Promote an e-commerce store', body: 'Use channels that drive clicks and sales.' },
  { icon: Store, title: 'Drive people to a physical location', body: 'Use channels that can be placed close to your location.' },
  { icon: Rocket, title: 'Launch a new D2C brand', body: 'Create hype around a new brand with tastemakers in upscale urban areas.' },
  { icon: Sunrise, title: 'Target the morning commute', body: 'Reach your audience as they leave for work in the morning.' },
  { icon: Baby, title: 'Reach Gen Z', body: 'Reach 18 to 24 year olds, who are less likely to consume traditional media.' },
  { icon: MessageCircle, title: 'Create social buzz', body: 'Focus on channels proven to build your profile on social media.' },
  { icon: Glasses, title: 'Reach baby boomers', body: 'Reach baby boomers over 55 across the US.' },
  { icon: RefreshCw, title: 'Change brand perceptions', body: 'Focus on the channels most likely to change how people see your brand.' },
  { icon: Megaphone, title: 'Build brand awareness', body: 'Focus on the channels proven to raise awareness of your brand.' },
]

export default function MediaPlanningTemplatesPage() {
  const { track, href } = useLandingAttribution('/media-planning-templates', { posthog: 'both' })
  return (
    <>
      <Head>
        <title>Media Plan Template: Free Excel Download and Plans by Goal | Halliard</title>
        <link rel="canonical" href="https://www.halliardmedia.com/media-planning-templates" />
        <meta
          name="description"
          content="A free media plan template in Excel, plus media plan templates by goal: awareness, e-commerce, foot traffic, Gen Z, millennials and more. Build any of them free in Halliard."
        />
        <meta property="og:title" content="Media Plan Template: Free Excel Download and Plans by Goal | Halliard" />
      </Head>
      <LandingHeader href={href} cta="Build your plan free" onClick={() => track('header')} />
      <main>
        {/* HERO */}
        <section className="relative">
          <HeroBackdrop />
          <Container className="relative max-w-4xl pt-32 pb-12 text-center lg:pt-40">
            <p className="mb-6 inline-flex items-center gap-2 rounded-full bg-tint px-4 py-1.5 text-sm font-medium text-primary">
              <FileSpreadsheet className="h-4 w-4" aria-hidden />
              Templates
            </p>
            <h1 className="font-display text-4xl font-medium tracking-tight text-slate-900 sm:text-6xl">
              Media plan templates, <Accent>free.</Accent>
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg tracking-tight text-slate-700">
              Download the Excel template to track a plan and its spend, or start from a goal and let Halliard draft the
              whole plan for you.
            </p>
          </Container>
        </section>

        {/* EXCEL TEMPLATE */}
        <section className="pb-16">
          <Container className="max-w-4xl">
            <div className="flex flex-col gap-6 rounded-2xl border-2 border-primary bg-white p-7 shadow-xl shadow-primary/10 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex gap-4">
                <span className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary text-white">
                  <FileSpreadsheet className="h-6 w-6" aria-hidden />
                </span>
                <div>
                  <h2 className="font-display text-xl tracking-tight text-slate-900">Free Excel media plan template</h2>
                  <p className="mt-1 text-sm text-slate-600">
                    Track and organize your media planning and media buying in one spreadsheet: channels, flights, budgets
                    and actuals.
                  </p>
                </div>
              </div>
              <a
                href={EXCEL_TEMPLATE_URL}
                onClick={() => track('excel-template')}
                className="inline-flex shrink-0 items-center justify-center rounded-full bg-primary px-5 py-3 text-sm font-semibold text-white hover:bg-primary/90"
              >
                <Download className="mr-2 h-4 w-4" aria-hidden />
                Download the template
              </a>
            </div>
          </Container>
        </section>

        {/* TEMPLATES BY GOAL */}
        <section className="py-20 sm:py-24" style={SOFT_BAND}>
          <Container className="max-w-6xl">
            <SectionHeading
              eyebrow="Plans by goal"
              title="Start from what the campaign has to do."
              body="Pick a goal, add your budget and market, and Halliard drafts the audiences, channels and reach for it."
            />
            <ul className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {TEMPLATES.map(({ icon: Icon, title, body }) => (
                <li key={title} className="flex flex-col rounded-2xl border border-tint bg-white p-6 shadow-sm">
                  <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-tint text-primary">
                    <Icon className="h-5 w-5" aria-hidden />
                  </span>
                  <h3 className="mt-4 font-display text-lg text-slate-900">{title}</h3>
                  <p className="mt-2 flex-1 text-sm text-slate-600">{body}</p>
                  <Button
                    href={href}
                    color="blue"
                    className="mt-6 self-start"
                    onClick={() => track(`template-${title.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`)}
                  >
                    Build this plan free
                    <ArrowRight className="ml-2 h-4 w-4" aria-hidden />
                  </Button>
                </li>
              ))}
            </ul>
            <p className="mt-10 text-center text-sm text-slate-600">
              Want to see what you get?{' '}
              <Link href="/sample" className="font-medium text-primary hover:underline">
                Read a finished sample plan
              </Link>
              , or learn{' '}
              <Link href="/guide/media-planning-guide" className="font-medium text-primary hover:underline">
                how to create a media plan
              </Link>
              .
            </p>
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
