import Head from 'next/head'
import React from 'react'
import { ArrowRight, Scale } from 'lucide-react'
import { Container } from '../mmm/Container'
import { Button } from '../mmm/Button'
import { PixelViewContent } from '@/components/PixelViewContent'
import { ClosingCta, HeroBackdrop, LandingHeader, SOFT_BAND, SectionHeading, useLandingAttribution } from '../landing/kit'
import { Faq } from '../measurement/kit'

/**
 * A "Halliard compared with X" page. Everything said about the other product
 * must come from that company's own pages, listed in `sources` with the date
 * they were read, and the page must say where the other product is the better
 * choice. A comparison that only flatters us is not worth publishing.
 */
export interface Comparison {
  slug: string
  competitor: string
  title: string
  description: string
  heading: React.ReactNode
  intro: string
  chooseThem: string[]
  chooseUs: string[]
  /** Each row: what is compared, the other product, Halliard. A few words per cell. */
  groups: { group: string; rows: [string, string, string][] }[]
  both: { title: string; body: string }
  faq: { q: string; a: string }[]
  sources: { label: string; href: string }[]
  checked: string
  /** The buttons' label, when the page isn't selling the planning tool. */
  cta?: string
}

export function ComparePage({ data }: { data: Comparison }) {
  const path = `/compare/${data.slug}`
  const { href, track } = useLandingAttribution(path)
  const url = `https://www.halliardmedia.com${path}`
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: data.faq.map(f => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
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
      <LandingHeader href={href} cta={data.cta ?? 'Start planning free'} onClick={() => track('header')} />
      <main>
        <PixelViewContent name={`compare-${data.slug}`} category="comparison" />

        <section className="relative">
          <HeroBackdrop />
          <Container className="relative max-w-6xl pt-32 pb-14 lg:pt-40">
            <div className="mx-auto max-w-3xl text-center">
              <p className="mb-6 inline-flex items-center gap-2 rounded-full bg-tint px-4 py-1.5 text-sm font-medium text-primary">
                <Scale className="h-4 w-4" aria-hidden />
                Halliard and {data.competitor}
              </p>
              <h1 className="font-display text-4xl font-medium tracking-tight text-slate-900 sm:text-6xl">{data.heading}</h1>
              <p className="mx-auto mt-6 max-w-2xl text-lg tracking-tight text-slate-700">{data.intro}</p>
              <div className="mt-8 flex justify-center">
                <Button href={href} color="blue" className="px-6 py-3 text-base" onClick={() => track('hero')}>
                  {data.cta ?? 'Start planning free'}
                  <ArrowRight className="ml-2 h-4 w-4" aria-hidden />
                </Button>
              </div>
            </div>
          </Container>
        </section>

        <section className="pb-20 sm:pb-28">
          <Container className="max-w-5xl">
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <Verdict title={`Choose ${data.competitor} if`} items={data.chooseThem} />
              <Verdict title="Choose Halliard if" items={data.chooseUs} ours />
            </div>
          </Container>
        </section>

        <section className="py-20 sm:py-28" style={SOFT_BAND}>
          <Container className="max-w-5xl">
            <SectionHeading eyebrow="Side by side" title={`${data.competitor} and Halliard, line by line`} />
            <div className="mt-12 overflow-hidden rounded-2xl border border-tint bg-white">
              <table className="w-full table-fixed text-left text-sm sm:text-base">
                <thead>
                  <tr className="border-b border-tint text-xs uppercase tracking-wider text-slate-500">
                    <th scope="col" className="w-[28%] px-3 py-3 font-semibold sm:px-5">&nbsp;</th>
                    <th scope="col" className="px-3 py-3 font-semibold sm:px-5">{data.competitor}</th>
                    <th scope="col" className="px-3 py-3 font-semibold text-primary sm:px-5">Halliard</th>
                  </tr>
                </thead>
                {data.groups.map(({ group, rows }) => (
                  <tbody key={group} className="divide-y divide-slate-100">
                    <tr>
                      <th colSpan={3} scope="colgroup" className="bg-slate-50 px-3 py-2 text-xs font-semibold uppercase tracking-wider text-primary sm:px-5">
                        {group}
                      </th>
                    </tr>
                    {rows.map(([what, them, us]) => (
                      <tr key={what}>
                        <th scope="row" className="px-3 py-3 align-top font-medium text-slate-900 sm:px-5">{what}</th>
                        <td className="px-3 py-3 align-top text-slate-600 sm:px-5">{them}</td>
                        <td className="px-3 py-3 align-top text-slate-900 sm:px-5">{us}</td>
                      </tr>
                    ))}
                  </tbody>
                ))}
              </table>
            </div>
            <p className="mx-auto mt-6 max-w-3xl text-center text-sm text-slate-500">
              {data.competitor} details are from its own site, read {data.checked}:{' '}
              {data.sources.map((s, i) => (
                <React.Fragment key={s.href}>
                  {i > 0 ? ', ' : ''}
                  <a href={s.href} rel="nofollow noopener" target="_blank" className="underline hover:text-primary">
                    {s.label}
                  </a>
                </React.Fragment>
              ))}
              . If something here is out of date, <a href="/demo" className="underline hover:text-primary">tell us</a>.
            </p>
          </Container>
        </section>

        <section className="py-20 sm:py-28">
          <Container className="max-w-3xl">
            <div className="rounded-2xl border border-tint bg-white p-8 text-center sm:p-10">
              <h2 className="font-display text-2xl tracking-tight text-slate-900 sm:text-3xl">{data.both.title}</h2>
              <p className="mt-4 text-lg text-slate-700">{data.both.body}</p>
            </div>
          </Container>
        </section>

        <section className="py-20 sm:py-28" style={SOFT_BAND}>
          <Container className="max-w-6xl">
            <SectionHeading eyebrow="Questions" title={`Halliard and ${data.competitor}`} />
            <Faq items={data.faq} />
          </Container>
        </section>

        <ClosingCta
          title="Try it on a brief you already have."
          subtitle="See the plan before you decide."
          cta={data.cta ?? 'Start planning free'}
          href={href}
          onClick={() => track('closing')}
        />
      </main>
    </>
  )
}

function Verdict({ title, items, ours = false }: { title: string; items: string[]; ours?: boolean }) {
  return (
    <div className={`rounded-2xl border bg-white p-6 sm:p-8 ${ours ? 'border-primary/40 shadow-lg shadow-primary/5' : 'border-tint'}`}>
      <h2 className={`font-display text-xl tracking-tight ${ours ? 'text-primary' : 'text-slate-900'}`}>{title}</h2>
      <ul className="mt-4 space-y-3 text-slate-700">
        {items.map(item => (
          <li key={item} className="flex gap-3">
            <span className={`mt-2 h-1.5 w-1.5 shrink-0 rounded-full ${ours ? 'bg-primary' : 'bg-slate-400'}`} aria-hidden />
            {item}
          </li>
        ))}
      </ul>
    </div>
  )
}
