import { Container } from './Container'

export function FeaturesSection() {
  const featureCategories = [
    {
      title: 'Measurement Capabilities',
      features: [
        'Multi-Source Integration - Platform APIs, MMM outputs, geo-tests, brand studies',
        '48-Channel Hierarchy - Comprehensive taxonomy from streaming to OOH',
        'Confidence Scoring - Measurement methodology drives reliability ratings',
        'Sub-Brand Support - Switch between product lines seamlessly'
      ]
    },
    {
      title: 'MMM Features',
      features: [
        'Model Flexibility - Connect any existing MMM or build new',
        'Response Curves - Visualize diminishing returns and saturation points',
        'Automated Refresh - Models update as new performance data arrives',
        'Cross-Validation - Compare MMM predictions to test results'
      ]
    },
    {
      title: 'Testing & Validation',
      features: [
        'Geo-Lift Test Wizard - Design statistically powered tests in 3 steps',
        'Power Analysis - Minimum budget and duration calculations',
        'DMA Stratification - Automatic market selection for treatment/control',
        'Active Test Monitoring - Track progress and view results in real-time'
      ]
    },
    {
      title: 'Reporting & Export',
      features: [
        'Executive KPI Summary - Total spend, reach, sales lift at a glance',
        'Channel Deep Dives - Detailed performance by channel and property',
        'Export Everything - CSV/XLS export for both measured and test roadmap',
        'White Label Ready - Agencies can brand for client presentations'
      ]
    }
  ]

  return (
    <section
      id="features"
      aria-label="Features"
      className="pt-10 pb-7 sm:pt-16 sm:pb-10 lg:pb-16"
    >
      <Container>
        <div className="mx-auto max-w-2xl md:text-center">
          <h2 className="font-display text-3xl tracking-tight text-slate-900 sm:text-4xl">
            Everything you need for unified measurement
          </h2>
          <p className="mt-4 text-lg tracking-tight text-slate-600">
            Built for both brands and agencies who need to prove what's working and optimize what isn't.
          </p>
        </div>

        <div className="mt-16 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-2">
          {featureCategories.map((category) => (
            <div key={category.title} className="rounded-2xl border border-slate-200 p-8">
              <h3 className="text-lg font-semibold text-slate-900 mb-6">{category.title}</h3>
              <ul className="space-y-4">
                {category.features.map((feature, index) => {
                  const [title, description] = feature.split(' - ')
                  return (
                    <li key={index} className="flex items-start">
                      <svg className="h-6 w-6 text-primary mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                      </svg>
                      <div>
                        <span className="font-medium text-slate-900">{title}</span>
                        {description && (
                          <span className="text-slate-600"> - {description}</span>
                        )}
                      </div>
                    </li>
                  )
                })}
              </ul>
            </div>
          ))}
        </div>
      </Container>
    </section>
  )
} 