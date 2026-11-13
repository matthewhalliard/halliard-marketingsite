import Head from 'next/head'
import React from 'react'
import {
  ArrowLeftRight,
  BarChart3,
  FlaskConical,
  Link2,
  Map as MapIcon,
  Mic,
  Radio,
  ShieldCheck,
  Signpost,
  Tv,
} from 'lucide-react'
import { Container } from '../../components/mmm/Container'
import { ClosingCta, Frame, LandingHeader, SOFT_BAND, SectionHeading, useLandingAttribution } from '../../components/landing/kit'
import { LisaQuote } from '../../components/plan/proof'
import { CardGrid, DEMO_URL, Faq, LeadForm, MeasurementHero, NumberedSteps, PriceCard } from '../../components/measurement/kit'
import { ChannelLiftScene, GeoLiftScene } from '../../components/measurement/visuals'

const PROBLEMS = [
  {
    icon: ArrowLeftRight,
    title: 'Correlation isn’t causation',
    body: 'Attribution says paid social drove 40% of conversions. What happens when you turn it off? An incrementality test tells you.',
  },
  {
    icon: ShieldCheck,
    title: 'Clients want proof',
    body: 'CFOs ask how much comes back for every dollar spent. A geo-lift test gives the answer.',
  },
  {
    icon: BarChart3,
    title: '60% still use click attribution',
    body: 'Despite 15 years of outcomes-based messaging, most campaigns are still judged on clicks. It’s time to measure what matters.',
  },
]

const STEPS = [
  { title: 'Select markets', body: 'Choose matched test and control DMAs.' },
  { title: 'Run the campaign', body: 'Deliver ads only in the test markets.' },
  { title: 'Measure the lift', body: 'Compare outcomes in test markets against control.' },
  { title: 'Scale the budget', body: 'Invest in the channels that prove incremental.' },
]

const CHANNELS = [
  {
    icon: Signpost,
    title: 'Billboards and OOH',
    body: 'Out-of-home is the last major channel with no click-through attribution. Billboards, DOOH and transit, measured without pixels or new tracking.',
  },
  {
    icon: Mic,
    title: 'Podcasts',
    body: 'No cookies, no pixels, just “trust us” metrics. Promo codes undercount, because buyers forget or share them.',
  },
  {
    icon: Tv,
    title: 'Streaming TV',
    body: 'Impressions don’t equal impact. A geo-lift test shows what streaming TV adds in the markets it runs in.',
  },
  {
    icon: Radio,
    title: 'Radio and anything you can geo-target',
    body: 'Still reaching millions, still no conversions to track. Any channel you can target by market can be tested.',
  },
]

const CONNECTED = [
  {
    icon: MapIcon,
    title: 'Test and control by design',
    body: 'Run media in test markets and hold out control markets. The lift is measured, with no modelling assumptions and no reliance on cookies or platform data.',
  },
  {
    icon: FlaskConical,
    title: 'Results you can present',
    body: 'A statistically rigorous read of the incremental lift per channel, ready for the client.',
  },
  {
    icon: Link2,
    title: 'Connected to MMM and planning',
    body: 'Test results validate mix-model response curves and feed the next plan: a loop from test to plan.',
  },
]

const FAQ = [
  { q: 'Why geo-lift rather than promo codes?', a: 'Promo codes undercount impact, because many buyers forget or share them.' },
  { q: 'How long does a test run?', a: 'Most reach significance in 3–4 weeks, depending on spend.' },
  { q: 'Which channels can be tested?', a: 'Any channel you can geo-target: podcasts, streaming TV, radio, OOH and more.' },
  { q: 'Do I need historical data?', a: 'No. The experiment isolates the lift during the test window only.' },
]

export default function IncrementalityTestingPage() {
  const { track } = useLandingAttribution('/incrementality-testing', { posthog: 'both' })
  return (
    <>
      <Head>
        <title>Incrementality Testing and Geo-Lift for Agencies | Halliard</title>
        <meta
          name="description"
          content="Incrementality testing with geo-lift experiments: prove what billboards, podcasts, streaming TV and every other channel add, with test and control markets, not attribution."
        />
        <link rel="canonical" href="https://www.halliardmedia.com/incrementality-testing" />
        <meta property="og:title" content="Incrementality Testing and Geo-Lift for Agencies | Halliard" />
        <meta property="og:description" content="Geo-lift tests that show causal impact, not correlation, including for OOH, podcasts and streaming TV." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://www.halliardmedia.com/incrementality-testing" />
      </Head>
      <LandingHeader href={DEMO_URL} cta="Book a demo" onClick={() => track('header')} />
      <main>
        <MeasurementHero
          icon={FlaskConical}
          eyebrow="Incrementality testing"
          title="Prove your media"
          accent="actually works."
          body="Geo-lift tests show causal impact, not correlation: which channels drive real business results, including the ones no pixel can see."
          points={[
            'Test and control markets, not attribution models',
            'Works for OOH, podcasts, streaming TV and radio',
            'Most tests reach significance in 3–4 weeks',
          ]}
          facts={[
            { value: '$15,000', label: 'Per test' },
            { value: '3–4 weeks', label: 'For most tests to reach significance' },
            { value: 'Any channel', label: 'That you can target by market' },
          ]}
          visual={{ label: 'Geo-lift test · Example', Scene: GeoLiftScene }}
          onCta={() => track('hero')}
        />

        <section className="py-20 sm:py-28" style={SOFT_BAND}>
          <Container className="max-w-6xl">
            <SectionHeading
              eyebrow="The problem"
              title="Attribution is broken. You know it."
              body="Every platform claims credit for the same conversion. An incrementality test is the only way to know what is driving results."
            />
            <CardGrid cards={PROBLEMS} />
          </Container>
        </section>

        <section className="py-20 sm:py-28">
          <Container className="max-w-6xl">
            <SectionHeading eyebrow="How a geo-lift test works" title="Real experiments, real answers" />
            <NumberedSteps steps={STEPS} />
          </Container>
        </section>

        <section className="py-20 sm:py-28" style={SOFT_BAND}>
          <Container className="max-w-6xl">
            <SectionHeading
              eyebrow="Hard-to-measure channels"
              title="Measure the channels clicks can’t"
              body="The channels with the biggest reach are often the ones nobody can prove. A geo-lift test doesn’t need a click."
            />
            <CardGrid cards={CHANNELS} columns={4} />
            <div className="mx-auto mt-12 max-w-3xl">
              <Frame label="Lift by channel · Example">
                <ChannelLiftScene />
              </Frame>
            </div>
          </Container>
        </section>

        <section id="ooh-snapshot" className="py-20 sm:py-28">
          <Container className="max-w-6xl">
            <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
              <div>
                <p className="inline-flex items-center rounded-full bg-tint px-4 py-1.5 text-sm font-medium text-primary">
                  Out-of-home
                </p>
                <h2 className="mt-5 font-display text-3xl tracking-tight text-slate-900 sm:text-4xl">
                  Spending on billboards? See what they’re doing.
                </h2>
                <p className="mt-4 text-lg text-slate-700">
                  Your CFO asks for proof, and you have reach estimates and gut feel. Using marketing mix modeling, we
                  isolate the business impact of your OOH spend: no pixels, no tracking, just math.
                </p>
                <ul className="mt-6 flex flex-col gap-2 text-slate-700">
                  <li>A directional estimate of OOH’s contribution to business outcomes</li>
                  <li>Benchmarks from comparable advertisers in your category</li>
                  <li>A preliminary view of channel-level efficiency</li>
                </ul>
                <p className="mt-6 text-sm text-slate-500">
                  The snapshot shows what’s possible. A full test or mix model goes deeper, on your actual spend data.
                </p>
              </div>
              <LeadForm
                source="ooh-landing"
                subject="OOH Impact Request"
                heading="Get a free OOH impact snapshot"
                intro="A directional analysis of your outdoor spend’s business impact."
                spendField="monthly_ooh_spend"
                spendLabel="Monthly OOH spend (approx.)"
                spendOptions={[
                  { value: '<25k', label: 'Under $25,000' },
                  { value: '25k-50k', label: '$25,000 – $50,000' },
                  { value: '50k-100k', label: '$50,000 – $100,000' },
                  { value: '100k-250k', label: '$100,000 – $250,000' },
                  { value: '250k+', label: '$250,000+' },
                ]}
                extra={{ field: 'markets', label: 'Markets (optional)', placeholder: 'e.g. Richmond, Norfolk' }}
                submitLabel="Get my free snapshot"
                done="We’ll review your details and send your OOH impact snapshot within 48 hours."
              />
            </div>
          </Container>
        </section>

        <section className="py-20 sm:py-28" style={SOFT_BAND}>
          <Container className="max-w-6xl">
            <SectionHeading
              eyebrow="What you get"
              title="Causal proof, connected to your plan"
              body="Geo-lift tests show what your media spend is doing, and what it isn’t."
            />
            <CardGrid cards={CONNECTED} />
          </Container>
        </section>

        <section className="py-20 sm:py-28">
          <Container className="max-w-6xl">
            <SectionHeading eyebrow="Pricing" title="Priced per test" body="Billed through the agency, from the client’s budget." />
            <PriceCard
              price="$15,000"
              unit="per test"
              items={[
                'Test design and market selection',
                'Running the geo-lift experiment',
                'Statistical analysis and reporting',
                'Presentation-ready results',
                'Results connected to MMM and planning',
              ]}
              onCta={() => track('pricing')}
            />
          </Container>
        </section>

        <section className="py-20 sm:py-28" style={SOFT_BAND}>
          <Container className="max-w-6xl">
            <SectionHeading eyebrow="Questions" title="Common questions" />
            <Faq items={FAQ} />
            <div className="mx-auto mt-16 max-w-3xl">
              <LisaQuote />
            </div>
          </Container>
        </section>

        <ClosingCta
          title="Stop guessing. Start proving."
          subtitle="Your clients deserve real answers."
          cta="Book a demo"
          href={DEMO_URL}
          onClick={() => track('closing')}
          note="A 15-minute call. No deck."
        />
      </main>
    </>
  )
}

;(IncrementalityTestingPage as any).disableNavbar = true
;(IncrementalityTestingPage as any).fullWidth = true
;(IncrementalityTestingPage as any).siteBg = true
