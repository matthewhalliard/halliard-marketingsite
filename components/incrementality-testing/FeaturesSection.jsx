import { Container } from '../mmm/Container'

const features = [
  {
    category: 'Experiment Design',
    items: [
      { name: 'Power Analysis', description: 'Know required budget before you start' },
      { name: 'Market Matching', description: 'AI selects comparable test/control markets' },
      { name: 'Duration Calculator', description: 'Optimal test length for significance' },
      { name: 'Overlap Prevention', description: 'Run multiple tests without interference' },
    ],
  },
  {
    category: 'Test Management',
    items: [
      { name: 'DMA Export', description: 'Ready-to-upload market lists' },
      { name: 'Progress Tracking', description: 'Real-time experiment monitoring' },
      { name: 'Budget Pacing', description: 'Ensure consistent test delivery' },
      { name: 'Quality Checks', description: 'Automated anomaly detection' },
    ],
  },
  {
    category: 'Results & Analysis',
    items: [
      { name: 'Lift Calculation', description: 'Precise incremental impact' },
      { name: 'Confidence Intervals', description: 'Statistical significance visualization' },
      { name: 'iROAS Metrics', description: 'True incremental return on ad spend' },
      { name: 'Decision Support', description: 'Clear scale/cut recommendations' },
    ],
  },
]

export function FeaturesSection() {
  return (
    <section id="features" className="py-24 bg-slate-50">
      <Container>
        <div className="mx-auto max-w-2xl lg:text-center">
          <h2 className="font-display text-3xl tracking-tight text-slate-900 sm:text-4xl">
            Everything You Need for Scientific Testing
          </h2>
          <p className="mt-4 text-lg tracking-tight text-slate-700">
            Purpose-built tools for designing, running, and analyzing geo-lift experiments
          </p>
        </div>

        <div className="mx-auto mt-16 max-w-7xl">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
            {features.map((category) => (
              <div key={category.category}>
                <h3 className="text-xl font-bold text-slate-900 mb-6">
                  {category.category}
                </h3>
                <div className="space-y-4">
                  {category.items.map((feature) => (
                    <div key={feature.name} className="bg-white rounded-lg p-4 border border-gray-200">
                      <div className="flex items-start gap-3">
                        <svg className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        <div>
                          <h4 className="font-semibold text-slate-900">
                            {feature.name}
                          </h4>
                          <p className="text-sm text-gray-600 mt-1">
                            {feature.description}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  )
} 