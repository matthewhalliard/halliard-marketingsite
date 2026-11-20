import Head from 'next/head'
import Link from 'next/link'
import React from 'react'
import { ArrowRight, CircleAlert, Search, ShieldCheck, Target } from 'lucide-react'
import { Container } from '../components/mmm/Container'
import { Button } from '../components/mmm/Button'
import { Accent, ClosingCta, HeroBackdrop, HeroVisual, LandingHeader, SOFT_BAND, SectionHeading, useLandingAttribution } from '../components/landing/kit'
import { AuditScene } from '../components/brand/scenes'

/**
 * The free Google Ads audit: the offer the brand ads point at. Connect
 * read-only, and the portal reads the last 90 days (Halliard3's
 * packages/google audit). Meta isn't offered until its app review clears.
 */

const GETS: { icon: typeof Search; title: string; body: string }[] = [
  { icon: Search, title: 'Searches that never converted', body: 'The money that went on them, and the costliest by name, so you can see exactly what to block.' },
  { icon: CircleAlert, title: 'Campaigns with no results', body: 'Anything that spent in the last 90 days without a single conversion.' },
  { icon: Target, title: 'What a result really costs', body: 'Your cost per result for the whole account and for each campaign.' },
]

export default function AuditPage() {
  const { track, href } = useLandingAttribution('/audit')
  return (
    <>
      <Head>
        <title>Free Google Ads Audit: See What the Last 90 Days Wasted | Halliard</title>
        <meta
          name="description"
          content="Connect Google Ads read-only and see, in a couple of minutes, the searches that spent and never converted, campaigns with no results and what each result cost. Free."
        />
        <link rel="canonical" href="https://www.halliardmedia.com/audit" />
        <meta property="og:url" content="https://www.halliardmedia.com/audit" />
        <meta property="og:title" content="Free Google Ads audit | Halliard" />
      </Head>
      <LandingHeader href={href} cta="Connect Google Ads" onClick={() => track('header')} />
      <main>
        <section className="relative">
          <HeroBackdrop />
          <Container className="relative max-w-6xl pt-36 pb-20 lg:pt-44 lg:pb-28">
            <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)]">
              <div className="text-center lg:text-left">
                <p className="mb-6 inline-flex items-center gap-2 rounded-full bg-tint px-4 py-1.5 text-sm font-medium text-primary">
                  <ShieldCheck className="h-4 w-4" aria-hidden /> Free · read-only
                </p>
                <h1 className="font-display text-5xl font-medium tracking-tight text-slate-900 sm:text-6xl">
                  See what your Google Ads <Accent>wasted.</Accent>
                </h1>
                <p className="mx-auto mt-6 max-w-xl text-lg tracking-tight text-slate-700 lg:mx-0">
                  Connect read-only. In a couple of minutes you&rsquo;ll see the last 90 days: the searches that spent and never
                  converted, the campaigns with no results, and what each result really cost.
                </p>
                <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row lg:justify-start">
                  <Button href={href} color="blue" className="px-6 py-3 text-base" onClick={() => track('hero')}>
                    Connect Google Ads
                    <ArrowRight className="ml-2 h-4 w-4" aria-hidden />
                  </Button>
                </div>
                <p className="mt-4 text-sm text-slate-600">We only read. Nothing changes in your account unless you approve it.</p>
              </div>
              <HeroVisual label="Audit · example">
                <AuditScene />
              </HeroVisual>
            </div>
          </Container>
        </section>

        <section className="py-20 sm:py-24" style={SOFT_BAND}>
          <Container className="max-w-5xl">
            <SectionHeading eyebrow="What you get" title="Three answers from your last 90 days." />
            <ul className="mt-10 grid grid-cols-1 gap-5 md:grid-cols-3">
              {GETS.map(({ icon: Icon, title, body }) => (
                <li key={title} className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-900/5">
                  <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-tint text-primary">
                    <Icon className="h-5 w-5" aria-hidden />
                  </span>
                  <h3 className="mt-4 font-display text-lg tracking-tight text-slate-900">{title}</h3>
                  <p className="mt-2 text-slate-600">{body}</p>
                </li>
              ))}
            </ul>
            <div className="mx-auto mt-10 max-w-3xl space-y-4 text-slate-700">
              <p>
                <span className="font-semibold text-slate-900">If tracking is broken, we say so first.</span> An account recording no
                conversions can&rsquo;t be judged, so the audit tells you to fix tracking rather than calling everything waste.
              </p>
              <p>
                <span className="font-semibold text-slate-900">Then, if you want, we fix it.</span> Tell us your goal and budget and we
                draft a plan that starts by blocking what never converts. Nothing runs until you approve it.{' '}
                <Link href="/" className="font-medium text-primary hover:underline">
                  How Halliard runs your ads &rarr;
                </Link>
              </p>
              <p className="text-sm text-slate-500">Meta audit coming soon. The audit shown above is an example.</p>
            </div>
          </Container>
        </section>

        <ClosingCta
          title="Your last 90 days, audited."
          subtitle="Free, in a couple of minutes."
          cta="Connect Google Ads"
          href={href}
          onClick={() => track('closing')}
          note="Read-only. No card."
        />
      </main>
    </>
  )
}

;(AuditPage as any).disableNavbar = true
;(AuditPage as any).fullWidth = true
;(AuditPage as any).siteBg = true
