import Head from 'next/head'
import Link from 'next/link'
import React from 'react'
import { ArrowRight, BookOpen } from 'lucide-react'
import { Container } from '../../components/mmm/Container'
import { Accent, ClosingCta, HeroBackdrop, HeroVisual, LandingHeader, useLandingAttribution } from '../../components/landing/kit'
import { GUIDE, type GuideBlock } from '../../components/resources/guide-content'
import { FrequencyFigure, GuideFlowScene, JourneyFigure } from '../../components/resources/visuals'
import { Inline } from '../../components/resources/inline'

// The long-form guide for "media planning" and "how to create a media plan".
// It carries the original site's guide over, in this site's look.

/** The short answer to "how to create a media plan", each step pointing at its chapter. */
const STEPS = [
  { title: 'Set objectives and KPIs', id: 'setting-objectives' },
  { title: 'Research your audience', id: 'audience-research' },
  { title: 'Map the consumer journey', id: 'understanding-the-consumer-journey' },
  { title: 'Choose your channels', id: 'selecting-channels' },
  { title: 'Pick properties and formats', id: 'selecting-properties-and-formats' },
  { title: 'Set frequency and flighting', id: 'ad-frequency' },
  { title: 'Measure, then refine the plan', id: 'measuring-success' },
]

const CHAPTERS = GUIDE.flatMap(b => (b.t === 'h2' ? [b] : []))

/** One block of the article. */
function Block({ b }: { b: GuideBlock }) {
  switch (b.t) {
    case 'h2':
      return (
        <h2 id={b.id} className="mt-14 scroll-mt-28 font-display text-3xl tracking-tight text-slate-900 first:mt-0">
          {b.text}
        </h2>
      )
    case 'h3':
      return (
        <h3 id={b.id} className="mt-10 scroll-mt-28 font-display text-xl tracking-tight text-slate-900">
          {b.text}
        </h3>
      )
    case 'h4':
      return (
        <h4 className="mt-6 font-semibold text-slate-900">{b.text}</h4>
      )
    case 'ul':
      return (
        <ul className="mt-4 list-disc space-y-2 pl-6 marker:text-primary">
          {b.items.map((item, j) => (
            <li key={j}>
              <Inline text={item} />
            </li>
          ))}
        </ul>
      )
    default:
      return (
        <p className="mt-4">
          <Inline text={b.text} />
        </p>
      )
  }
}

/** A figure after the block that introduces it, where one makes the text clearer. */
function figureAfter(b: GuideBlock) {
  if (b.t === 'p' && b.text.startsWith('The customer journey is how')) return <JourneyFigure />
  if (b.t === 'ul' && b.items[0]?.startsWith('**Flighting**')) return <FrequencyFigure />
  return null
}

export default function MediaPlanningGuide() {
  const { track, href } = useLandingAttribution('/guide/media-planning-guide')
  return (
    <>
      <Head>
        <title>Media Planning: The Complete Guide to Creating a Media Plan | Halliard</title>
        <link rel="canonical" href="https://www.halliardmedia.com/guide/media-planning-guide" />
        <meta
          name="description"
          content="What media planning is and how to create a media plan, step by step: objectives, audience research, channels, frequency and flighting, and how to measure the results."
        />
        <meta property="og:title" content="Media Planning: The Complete Guide to Creating a Media Plan | Halliard" />
        <meta property="og:type" content="article" />
      </Head>
      <LandingHeader href={href} cta="Build your plan free" onClick={() => track('header')} />
      <main>
        {/* HERO */}
        <section className="relative">
          <HeroBackdrop />
          <Container className="relative max-w-6xl pt-32 pb-12 lg:pt-40 lg:pb-16">
            <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
              <div className="text-center lg:text-left">
                <p className="mb-6 inline-flex items-center gap-2 rounded-full bg-tint px-4 py-1.5 text-sm font-medium text-primary">
                  <BookOpen className="h-4 w-4" aria-hidden />
                  Guide
                </p>
                <h1 className="font-display text-4xl font-medium tracking-tight text-slate-900 sm:text-6xl">
                  Media planning: <Accent>the complete guide.</Accent>
                </h1>
                <p className="mx-auto mt-6 max-w-xl text-lg tracking-tight text-slate-700 lg:mx-0">
                  What media planning is, how to create a media plan from a brief, and how to tell whether it worked.
                </p>
                <p className="mt-4 text-sm text-slate-500">By Lauren Covello</p>
              </div>
              <HeroVisual label="From objective to measured plan">
                <GuideFlowScene />
              </HeroVisual>
            </div>
          </Container>
        </section>

        {/* HOW TO CREATE A MEDIA PLAN, IN SHORT */}
        <section className="pb-12">
          <Container className="max-w-3xl">
            <div className="rounded-2xl border border-tint bg-white p-7 shadow-sm">
              <h2 className="font-display text-2xl tracking-tight text-slate-900">How to create a media plan</h2>
              <ol className="mt-5 grid gap-3 sm:grid-cols-2">
                {STEPS.map((s, i) => (
                  <li key={s.id} className="flex gap-3 text-sm text-slate-700">
                    <span className="inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-tint text-xs font-semibold text-primary">
                      {i + 1}
                    </span>
                    <a href={`#${s.id}`} className="hover:text-primary">
                      {s.title}
                    </a>
                  </li>
                ))}
              </ol>
              <p className="mt-6 text-sm text-slate-600">
                Want to see the result first?{' '}
                <Link href="/sample" className="font-medium text-primary hover:underline">
                  Read a finished media plan
                </Link>{' '}
                or{' '}
                <Link href="/how-it-works" className="font-medium text-primary hover:underline">
                  see how Halliard drafts one from a brief
                </Link>
                .
              </p>
            </div>
          </Container>
        </section>

        {/* ARTICLE */}
        <section className="pb-20">
          <Container className="max-w-6xl">
            <div className="grid grid-cols-1 gap-12 lg:grid-cols-[14rem_minmax(0,1fr)]">
              <aside className="hidden lg:block">
                <nav aria-label="Contents" className="sticky top-28">
                  <p className="text-sm font-medium text-slate-900">Contents</p>
                  <ul className="mt-3 space-y-2 text-sm">
                    {CHAPTERS.map(c => (
                      <li key={c.id}>
                        <a href={`#${c.id}`} className="text-slate-600 hover:text-primary">
                          {c.text}
                        </a>
                      </li>
                    ))}
                  </ul>
                </nav>
              </aside>
              <article className="max-w-3xl text-base leading-7 text-slate-700">
                {GUIDE.map((b, i) => (
                  <React.Fragment key={i}>
                    <Block b={b} />
                    {figureAfter(b)}
                  </React.Fragment>
                ))}
                <div className="mt-12 flex flex-col gap-3 rounded-2xl bg-tint/40 p-6 sm:flex-row sm:items-center sm:justify-between">
                  <p className="text-slate-800">Turn a brief into a plan like this in minutes.</p>
                  <Link
                    href="/sample"
                    className="inline-flex items-center text-sm font-semibold text-primary hover:underline"
                  >
                    See a sample plan
                    <ArrowRight className="ml-1.5 h-4 w-4" aria-hidden />
                  </Link>
                </div>
              </article>
            </div>
          </Container>
        </section>

        <ClosingCta
          title="Build your next media plan free."
          subtitle="Paste a brief. Halliard drafts the plan, and you make the calls."
          cta="Build your plan free"
          href={href}
          onClick={() => track('closing')}
        />
      </main>
    </>
  )
}

;(MediaPlanningGuide as any).disableNavbar = true
;(MediaPlanningGuide as any).fullWidth = true
;(MediaPlanningGuide as any).siteBg = true
