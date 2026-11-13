import Head from 'next/head'
import React from 'react'
import { BarChart3, CircleDollarSign, Compass, LineChart, Link2, TriangleAlert } from 'lucide-react'
import { Container } from '../../components/mmm/Container'
import { PixelViewContent } from '@/components/PixelViewContent'
import { ClosingCta, Frame, LandingHeader, SOFT_BAND, SectionHeading, useLandingAttribution } from '../../components/landing/kit'
import { LisaQuote } from '../../components/plan/proof'
import { CardGrid, DEMO_URL, MeasurementHero, NumberedSteps, PriceCard } from '../../components/measurement/kit'
import { MixModelScene, ReallocationScene } from '../../components/measurement/visuals'

const PROBLEMS = [
  {
    icon: TriangleAlert,
    title: 'Platform metrics overcount',
    body: 'Meta reported 2,000 conversions. Our causal model showed no business impact. One agency moved $200K to channels that actually moved the needle.',
  },
  {
    icon: CircleDollarSign,
    title: 'Too expensive for most clients',
    body: 'Only 2 of 200+ agencies use MMM. Traditional providers charge $50–250K and hide pricing behind a demo. Mid-market clients deserve real measurement too.',
  },
  {
    icon: Compass,
    title: 'Planning on gut feel',
    body: 'Without causal measurement you are guessing which channels work. Response curves show where returns diminish and where the next dollar does the most.',
  },
]

const DELIVERS = [
  {
    icon: LineChart,
    title: 'Channel response curves',
    body: 'The diminishing-returns curve for every channel, so you know where to add spend and where to stop.',
  },
  {
    icon: BarChart3,
    title: 'Platform claims beside the model',
    body: 'Connect Snowflake, BigQuery or Domo and see platform-reported results next to what the model attributes.',
  },
  {
    icon: Link2,
    title: 'Connected to your plan',
    body: 'Results feed the planning tool, so the next plan starts from what the model found.',
  },
]

const STEPS = [
  {
    title: 'Share your data',
    body: 'Media spend by channel and business outcomes such as sales, leads or web traffic. No new tracking or pixels, just the data you already have.',
  },
  {
    title: 'We build the causal model',
    body: 'A Bayesian model isolates each channel’s contribution, controlling for seasonality, trends and confounders. Delivered in 3–4 weeks.',
  },
  {
    title: 'You get results to act on',
    body: 'Response curves, recommendations for where to move spend, and a clear picture of what is driving the business, not what platforms claim.',
  },
]

export default function MMMPage() {
  const { track } = useLandingAttribution('/mmm')
  return (
    <>
      <Head>
        <title>Marketing Mix Modeling for Agencies, $25K in 3–4 Weeks | Halliard</title>
        <meta
          name="description"
          content="Marketing mix modeling for agencies and their clients: a causal model for $25,000, delivered in 3–4 weeks, where traditional MMM costs $50–250K and takes months."
        />
        <link rel="canonical" href="https://www.halliardmedia.com/mmm" />
        <meta property="og:title" content="Marketing Mix Modeling for Agencies, $25K in 3–4 Weeks | Halliard" />
        <meta property="og:description" content="Not correlation, causation. A causal mix model for $25,000, delivered in 3–4 weeks." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://www.halliardmedia.com/mmm" />
      </Head>
      <LandingHeader href={DEMO_URL} cta="Book a demo" onClick={() => track('header')} />
      <main>
        <PixelViewContent name="mmm" category="product" />
        <MeasurementHero
          icon={LineChart}
          eyebrow="Marketing mix modeling"
          title="Marketing mix modeling at"
          accent="a tenth of the cost."
          body={
            <>
              Not correlation, causation. Traditional MMM costs $50–250K and takes 3–6 months. Halliard builds a causal
              model for $25,000 in 3–4 weeks, for independent agencies and their clients, not just the Fortune 500.
            </>
          }
          points={[
            'Causal inference that isolates each channel’s real impact',
            'A model in 3–4 weeks, not 3–6 months',
            'A published price: $25,000 per model',
          ]}
          facts={[
            { value: '$25,000', label: 'Per model' },
            { value: '3–4 weeks', label: 'From data to model' },
            { value: '$200K+', label: 'Misallocated spend found and moved for one agency' },
          ]}
          visual={{ label: 'Mix model · Example', Scene: MixModelScene }}
          onCta={() => track('hero')}
        />

        <section className="py-20 sm:py-28" style={SOFT_BAND}>
          <Container className="max-w-6xl">
            <SectionHeading
              eyebrow="The problem"
              title="You can’t optimize what you can’t measure"
              body="Most agencies rely on platform metrics that double-count conversions. Causal MMM cuts through that, but until now it was only for the biggest spenders."
            />
            <CardGrid cards={PROBLEMS} />
          </Container>
        </section>

        <section className="py-20 sm:py-28">
          <Container className="max-w-6xl">
            <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-2 lg:gap-16">
              <div>
                <p className="inline-flex items-center rounded-full bg-tint px-4 py-1.5 text-sm font-medium text-primary">
                  Real results
                </p>
                <h2 className="mt-5 font-display text-3xl tracking-tight text-slate-900 sm:text-4xl">
                  We found channels with no measurable impact, and cut them.
                </h2>
                <p className="mt-5 text-lg text-slate-700">
                  For one client the model showed that niche display, a programmatic trade desk and specialty
                  publications were driving no incremental conversions. That spend moved to channels with proven impact,
                  saving six figures a year.
                </p>
              </div>
              <div className="min-w-0">
                <Frame label="Budget recommendation · Example">
                  <ReallocationScene />
                </Frame>
              </div>
            </div>
          </Container>
        </section>

        <section className="py-20 sm:py-28" style={SOFT_BAND}>
          <Container className="max-w-6xl">
            <SectionHeading
              eyebrow="What you get"
              title="A causal model that connects to your plan"
              body="Response curves, platform claims beside the model, and results that carry into the next plan."
            />
            <CardGrid cards={DELIVERS} />
          </Container>
        </section>

        <section className="py-20 sm:py-28">
          <Container className="max-w-6xl">
            <SectionHeading eyebrow="How it works" title="From your data to a model in 3–4 weeks" />
            <NumberedSteps steps={STEPS} />
          </Container>
        </section>

        <section className="py-20 sm:py-28" style={SOFT_BAND}>
          <Container className="max-w-6xl">
            <SectionHeading eyebrow="Pricing" title="One price, published" body="No six-month contract to see a number." />
            <PriceCard
              price="$25,000"
              unit="per model"
              note="Re-runs on new data: $7,500"
              items={[
                'Full causal model build and calibration',
                'Channel response curves',
                'Recommendations for where to move spend',
                'Results in the Halliard planning tool',
                'Delivered in 3–4 weeks',
              ]}
              onCta={() => track('pricing')}
            />
            <div className="mx-auto mt-16 max-w-3xl">
              <LisaQuote />
            </div>
          </Container>
        </section>

        <ClosingCta
          title="Your clients spend millions on media."
          subtitle="Show them what it’s doing."
          cta="Book a demo"
          href={DEMO_URL}
          onClick={() => track('closing')}
          note="A 15-minute call. No deck."
        />
      </main>
    </>
  )
}

;(MMMPage as any).disableNavbar = true
;(MMMPage as any).fullWidth = true
;(MMMPage as any).siteBg = true
