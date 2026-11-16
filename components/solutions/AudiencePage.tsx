import Head from 'next/head'
import Link from 'next/link'
import React from 'react'
import { ArrowRight, type LucideIcon } from 'lucide-react'
import { Container } from '../mmm/Container'
import { Button } from '../mmm/Button'
import { PixelViewContent } from '@/components/PixelViewContent'
import { ClosingCta, HeroBackdrop, LandingHeader, SOFT_BAND, SectionHeading, useLandingAttribution } from '../landing/kit'
import { Faq, NumberedSteps } from '../measurement/kit'

/**
 * A "Halliard for <audience>" page: the same product, told through the
 * problems that audience has. Every claim about Halliard must already be made
 * on the product or pricing pages; these pages add no new promises.
 */
export interface Audience {
  slug: string
  /** The page's address, when it does not live under /solutions. */
  path?: string
  /** The buttons' label and destination, when not the sign-up. */
  cta?: { label: string; href: string }
  /** The pricing section's eyebrow and the questions heading, when the defaults do not fit. */
  questionsTitle?: string
  icon: LucideIcon
  eyebrow: string
  title: string
  description: string
  heading: React.ReactNode
  intro: string
  problemsTitle: string
  /** A few words each: what happens today, then what happens with Halliard. */
  problems: { icon: LucideIcon; before: string; after: string }[]
  stepsTitle: string
  steps: { title: string; body: string }[]
  priceTitle: string
  prices: { what: string; price: string }[]
  priceNote: string
  proof?: React.ReactNode
  faq: { q: string; a: string }[]
  closing: { title: string; subtitle: string }
}

export function AudiencePage({ data }: { data: Audience }) {
  const path = data.path ?? `/solutions/${data.slug}`
  const { href: signUp, track } = useLandingAttribution(path)
  const href = data.cta?.href ?? signUp
  const cta = data.cta?.label ?? 'Start planning free'
  const url = `https://www.halliardmedia.com${path}`
  const Icon = data.icon
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: data.faq.map(f => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })),
  }

  return (
    <>
      <Head>
        <title>{data.title}</title>
        <meta name="description" content={data.description} />
        <link rel="canonical" href={url} />
        <meta property="og:title" content={data.title} />
        <meta property="og:description" content={data.description} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={url} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      </Head>
      <LandingHeader href={href} cta={cta} onClick={() => track('header')} />
      <main>
        <PixelViewContent name={`solutions-${data.slug}`} category="audience" />

        <section className="relative">
          <HeroBackdrop />
          <Container className="relative max-w-6xl pt-32 pb-16 lg:pt-40">
            <div className="mx-auto max-w-3xl text-center">
              <p className="mb-6 inline-flex items-center gap-2 rounded-full bg-tint px-4 py-1.5 text-sm font-medium text-primary">
                <Icon className="h-4 w-4" aria-hidden />
                {data.eyebrow}
              </p>
              <h1 className="font-display text-4xl font-medium tracking-tight text-slate-900 sm:text-6xl">{data.heading}</h1>
              <p className="mx-auto mt-6 max-w-2xl text-lg tracking-tight text-slate-700">{data.intro}</p>
              <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
                <Button href={href} color="blue" className="px-6 py-3 text-base" onClick={() => track('hero')}>
                  {cta}
                  <ArrowRight className="ml-2 h-4 w-4" aria-hidden />
                </Button>
                <Link href="/demo" className="text-sm font-semibold text-primary hover:underline">
                  Or book a demo
                </Link>
              </div>
            </div>
          </Container>
        </section>

        <section className="py-20 sm:py-28" style={SOFT_BAND}>
          <Container className="max-w-6xl">
            <SectionHeading eyebrow="What changes" title={data.problemsTitle} />
            <ul className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {data.problems.map(({ icon: PIcon, before, after }) => (
                <li key={before} className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-900/5">
                  <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-tint text-primary">
                    <PIcon className="h-5 w-5" aria-hidden />
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

        <section className="py-20 sm:py-28">
          <Container className="max-w-6xl">
            <SectionHeading eyebrow="How it fits" title={data.stepsTitle} />
            <NumberedSteps steps={data.steps} />
          </Container>
        </section>

        <section className="py-20 sm:py-28" style={SOFT_BAND}>
          <Container className="max-w-3xl">
            <SectionHeading eyebrow="Pricing" title={data.priceTitle} />
            <div className="mt-12 overflow-hidden rounded-2xl border border-tint bg-white">
              <dl className="divide-y divide-slate-100">
                {data.prices.map(p => (
                  <div key={p.what} className="flex items-baseline justify-between gap-6 px-5 py-4 sm:px-8">
                    <dt className="text-slate-700">{p.what}</dt>
                    <dd className="text-right font-display text-lg text-slate-900">{p.price}</dd>
                  </div>
                ))}
              </dl>
            </div>
            <p className="mt-6 text-center text-sm text-slate-600">
              {data.priceNote}{' '}
              <Link href="/pricing" className="font-semibold text-primary hover:underline">
                See full pricing
              </Link>
            </p>
            {data.proof ? <div className="mt-16">{data.proof}</div> : null}
          </Container>
        </section>

        <section className="py-20 sm:py-28">
          <Container className="max-w-6xl">
            <SectionHeading eyebrow="Questions" title={data.questionsTitle ?? 'What teams ask first'} />
            <Faq items={data.faq} />
          </Container>
        </section>

        <ClosingCta
          title={data.closing.title}
          subtitle={data.closing.subtitle}
          cta={cta}
          href={href}
          onClick={() => track('closing')}
        />
      </main>
    </>
  )
}
