import { Container } from './Container'
import Image from 'next/image'

export function SolutionSection() {
  const steps = [
    {
      number: '1',
      title: 'Connect or Create Your MMM',
      features: [
        { title: 'Have an MMM?', description: 'Connect outputs from Nielsen, Analytic Partners, Keen, or any provider via CSV/API' },
        { title: 'Need an MMM?', description: "We'll build a custom model using your historical data" },
        { title: 'Real-time Updates', description: 'MMM results refresh automatically as new data flows in' },
      ],
      screenshot: '[Screenshot: MMM Integration Setup - Shows logos of Nielsen, Analytic Partners, Keen, and other MMM providers with simple "Connect" buttons and API configuration fields. Also shows "Build Custom MMM" option.]'
    },
    {
      number: '2',
      title: 'See All Channels in One View',
      features: [
        { title: 'Measured Channels', description: 'Platform data, MMM results, geo-tests, and brand studies unified' },
        { title: 'Test Roadmap', description: 'Prioritized list of unmeasured channels with estimated impact' },
        { title: 'Confidence Levels', description: 'Visual indicators show measurement reliability (Very High to Low)' },
        { title: 'KPI Tracking', description: 'Spend, reach, frequency, sales lift with sparkline trends' },
      ],
      screenshot: '[Screenshot: Channel Performance Dashboard - Shows grid of 48 channels with confidence scores, measurement sources, and key metrics. Includes both measured channels (green) and unmeasured channels (gray) with "Design Test" buttons.]'
    },
    {
      number: '3',
      title: 'Validate with Incrementality Tests',
      features: [
        { title: '3-Step Test Design', description: 'Setup → Power Analysis → Launch in minutes' },
        { title: 'Automated DMA Selection', description: 'We handle the geographic stratification' },
        { title: 'Power Calculations', description: 'Know if your test will deliver significant results before spending' },
        { title: 'Results Integration', description: 'Successful tests automatically update channel confidence' },
      ],
      screenshot: '[Screenshot: Geo-Lift Test Wizard - Shows 3-step flow with DMA map highlighting treatment/control regions, power analysis graph, and test monitoring dashboard with real-time results.]'
    }
  ]

  const imageMap = {
    '1': '/images/mmm/step1-mmm-integration.png',
    '2': '/images/mmm/step2-channel-dashboard.png',
    '3': '/images/mmm/step3-geo-lift-wizard.png',
  }

  return (
    <section
      id="solution"
      aria-label="Halliard's solution"
      className="pt-10 pb-7 sm:pt-16 sm:pb-10 lg:pb-16"
    >
      <Container>
        <div className="mx-auto max-w-2xl md:text-center">
          <h2 className="font-display text-3xl tracking-tight text-slate-900 sm:text-4xl">
            Halliard's Unified Measurement Platform
          </h2>
          <p className="mt-4 text-lg tracking-tight text-slate-600">
            Connect your existing MMM or let us build one. Validate every channel. Make confident budget decisions.
          </p>
        </div>

        <div className="mt-16 space-y-16">
          {steps.map((step, index) => (
            <div key={step.number} className={`grid grid-cols-1 gap-8 lg:grid-cols-2 ${index % 2 === 1 ? 'lg:grid-flow-row-dense' : ''}`}>
              <div className={`${index % 2 === 1 ? 'lg:col-start-2' : ''}`}>
                <div className="flex items-center mb-4">
                  <span className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-white font-bold text-lg">
                    {step.number}
                  </span>
                  <h3 className="ml-4 text-2xl font-bold text-[#1F1F1F]">{step.title}</h3>
                </div>
                <div className="space-y-4">
                  {step.features.map((feature) => (
                    <div key={feature.title} className="flex items-start">
                      <svg className="h-6 w-6 text-primary mr-2 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                      </svg>
                      <div>
                        <span className="font-semibold text-slate-900">{feature.title}:</span>{' '}
                        <span className="text-slate-600">{feature.description}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className={`rounded-2xl bg-gray-100 p-4 ${index % 2 === 1 ? 'lg:col-start-1' : ''}`}>
                <Image
                  src={imageMap[step.number]}
                  alt={step.title}
                  width={960}
                  height={540}
                  className="rounded-lg shadow-md w-full h-auto"
                />
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  )
} 