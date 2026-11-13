import Head from 'next/head'
import React from 'react'
import { BadgeDollarSign, EyeOff, FileBarChart, Megaphone, Target, Users } from 'lucide-react'
import { Container } from '../components/mmm/Container'
import { PixelViewContent } from '@/components/PixelViewContent'
import { ClosingCta, LandingHeader, SOFT_BAND, SectionHeading, useLandingAttribution } from '../components/landing/kit'
import { LisaQuote } from '../components/plan/proof'
import { CardGrid, DEMO_URL, MeasurementHero, PriceCard } from '../components/measurement/kit'

const PROBLEMS = [
  {
    icon: EyeOff,
    title: 'No one measures brand',
    body: 'Everyone measures performance. Almost no one measures brand, yet brand is what makes performance work, and clients are starting to notice.',
  },
  {
    icon: BadgeDollarSign,
    title: 'Traditional studies cost too much',
    body: '$40–50K for one brand lift study means only the biggest clients get measured. Halliard makes it affordable for every client.',
  },
  {
    icon: Megaphone,
    title: 'Agencies can’t defend what they can’t measure',
    body: 'Brand is the hardest line item to defend. Aided and unaided awareness, consideration and preference data give clients the answer.',
  },
]

const MEASURES = [
  {
    icon: Target,
    title: 'Awareness, consideration, preference',
    body: 'Aided and unaided awareness, consideration and preference, with competitive positioning. Results in 3–4 weeks.',
  },
  {
    icon: Users,
    title: 'Breakdowns that show the gap',
    body: 'Demographic breakdowns reveal who isn’t reached yet, with creative recommendations and pre- and post-campaign measurement.',
  },
  {
    icon: FileBarChart,
    title: 'Ready to present',
    body: 'Survey design, panel fielding, analysis and a report you can put in front of the client.',
  },
]

export default function BrandStudiesPage() {
  const { track } = useLandingAttribution('/brand-studies', { posthog: 'both' })
  return (
    <>
      <Head>
        <title>Brand Lift Study for Agencies, From $5,500 | Halliard</title>
        <meta
          name="description"
          content="A brand lift study your clients can afford: awareness, consideration and preference measured in 3–4 weeks, from $5,500, where traditional studies cost $40–50K."
        />
        <link rel="canonical" href="https://www.halliardmedia.com/brand-studies" />
        <meta property="og:title" content="Brand Lift Study for Agencies, From $5,500 | Halliard" />
        <meta property="og:description" content="Traditional brand lift studies cost $40–50K. Halliard measures the same things from $5,500, in 3–4 weeks." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://www.halliardmedia.com/brand-studies" />
      </Head>
      <LandingHeader href={DEMO_URL} cta="Book a demo" onClick={() => track('header')} />
      <main>
        <PixelViewContent name="brand-studies" category="product" />
        <MeasurementHero
          icon={Target}
          eyebrow="Brand lift studies"
          title="Brand studies your clients can"
          accent="actually afford."
          body="Traditional brand lift studies cost $40–50K. Halliard measures the same things from $5,500, with results in 3–4 weeks that tell the client what to do next."
          points={[
            'Aided and unaided awareness, consideration and preference',
            'Demographic and competitive breakdowns',
            'Pre- and post-campaign measurement',
          ]}
          facts={[
            { value: '$5,500', label: 'Studies from' },
            { value: '3–4 weeks', label: 'To results' },
            { value: '$40–50K', label: 'What a traditional study costs' },
          ]}
          onCta={() => track('hero')}
        />

        <section className="py-20 sm:py-28" style={SOFT_BAND}>
          <Container className="max-w-6xl">
            <SectionHeading
              eyebrow="The problem"
              title="Brand is the hardest line item to defend"
              body="CFOs cut what they can’t measure. Without brand studies, brand budgets are the first to go."
            />
            <CardGrid cards={PROBLEMS} />
          </Container>
        </section>

        <section className="py-20 sm:py-28">
          <Container className="max-w-6xl">
            <SectionHeading
              eyebrow="What a study measures"
              title="Brand measurement that drives action"
              body="Not a report that sits on a shelf: a study that says what to fix."
            />
            <CardGrid cards={MEASURES} />
          </Container>
        </section>

        <section className="py-20 sm:py-28" style={SOFT_BAND}>
          <Container className="max-w-4xl">
            <div className="rounded-2xl border border-tint bg-white p-8 shadow-lg sm:p-12">
              <p className="inline-flex items-center rounded-full bg-tint px-4 py-1.5 text-sm font-medium text-primary">
                Case study · Allen &amp; Allen
              </p>
              <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-3">
                <div>
                  <p className="font-display text-4xl text-primary">76%</p>
                  <p className="mt-1 text-sm text-slate-600">Aided awareness</p>
                </div>
                <div>
                  <p className="font-display text-4xl text-primary">Gap</p>
                  <p className="mt-1 text-sm text-slate-600">Female consideration identified</p>
                </div>
                <div>
                  <p className="font-display text-4xl text-primary">Acted</p>
                  <p className="mt-1 text-sm text-slate-600">Creative strategy adjusted immediately</p>
                </div>
              </div>
              <p className="mt-8 leading-relaxed text-slate-700">
                The study showed strong overall awareness but a gap in consideration among women. The client changed its
                creative strategy straight away, turning measurement into action in days, not months.
              </p>
            </div>
          </Container>
        </section>

        <section className="py-20 sm:py-28">
          <Container className="max-w-6xl">
            <SectionHeading eyebrow="Pricing" title="Priced per study" body="Billed through the agency, from the client’s budget." />
            <PriceCard
              from
              price="$5,500"
              unit="per study"
              note="Up to $12,500 for larger studies"
              items={[
                'Survey design and methodology',
                'Panel fielding and data collection',
                'Full analysis and insights',
                'Demographic and competitive breakdowns',
                'Presentation-ready reporting',
              ]}
              onCta={() => track('pricing')}
            />
            <div className="mx-auto mt-16 max-w-3xl">
              <LisaQuote />
            </div>
          </Container>
        </section>

        <ClosingCta
          title="Every client deserves to know their brand."
          subtitle="Now they can afford to."
          cta="Book a demo"
          href={DEMO_URL}
          onClick={() => track('closing')}
          note="A 15-minute call. No deck."
        />
      </main>
    </>
  )
}

;(BrandStudiesPage as any).disableNavbar = true
;(BrandStudiesPage as any).fullWidth = true
;(BrandStudiesPage as any).siteBg = true
