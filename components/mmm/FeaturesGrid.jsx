import { Container } from './Container'

export function FeaturesGrid() {
  const featureCategories = [
    {
      title: 'Core MMM Features',
      icon: '[Icon: Brain/AI symbol with data nodes representing machine learning model]',
      features: [
        'Multi-touch attribution modeling',
        'Media mix optimization',
        'Cross-channel interaction effects',
        'Adstock & decay modeling',
        'Price & promotion effects',
        'Base vs. incremental decomposition'
      ]
    },
    {
      title: 'Measurement Capabilities',
      icon: '[Icon: Analytics dashboard with charts and metrics]',
      features: [
        'Real-time ROI tracking',
        'Marginal ROI curves',
        'Saturation analysis',
        'Budget scenario planning',
        'Contribution reporting',
        'Efficiency frontiers'
      ]
    },
    {
      title: 'Testing & Validation',
      icon: '[Icon: A/B testing beakers or scientific experiment symbols]',
      features: [
        'Geo-based lift tests',
        'Synthetic control matching',
        'Pre/post analysis',
        'Incrementality testing',
        'Model confidence scoring',
        'Prediction vs. actual tracking'
      ]
    }
  ]

  return (
    <div className="bg-gray-50 py-20 sm:py-32">
      <Container>
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="font-display text-3xl tracking-tight text-slate-900 sm:text-4xl">
            Everything You Need for Modern MMM
          </h2>
          <p className="mt-4 text-lg text-slate-600">
            Comprehensive features designed for performance marketers and data teams
          </p>
        </div>
        
        <div className="mx-auto mt-16 grid max-w-6xl grid-cols-1 gap-8 sm:grid-cols-3">
          {featureCategories.map((category) => (
            <div key={category.title} className="rounded-2xl bg-white p-8 shadow-lg">
              <div className="mx-auto mb-6 h-20 w-20 rounded-xl border-2 border-dashed border-gray-300 bg-gray-50 p-4 flex items-center justify-center">
                <p className="text-xs text-gray-600 text-center">{category.icon}</p>
              </div>
              <h3 className="text-xl font-semibold text-slate-900">{category.title}</h3>
              <ul className="mt-6 space-y-3">
                {category.features.map((feature) => (
                  <li key={feature} className="flex items-start">
                    <svg className="mr-2 h-5 w-5 flex-shrink-0 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-sm text-slate-600">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        
        {/* Platform Overview Image */}
        <div className="mx-auto mt-16 max-w-5xl rounded-2xl border-2 border-dashed border-gray-300 bg-gray-50 p-12">
          <p className="text-gray-600 text-lg font-medium text-center">
            [Platform Overview Image: Birds-eye view of the entire platform showing how all features work together - 
            from data ingestion through MMM modeling to validation and optimization]
          </p>
        </div>
      </Container>
    </div>
  )
} 