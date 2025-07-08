import { Container } from '../mmm/Container'

const features = [
  {
    category: 'Planning Tools',
    items: [
      'Power analysis to size budget',
      'Market matching algorithm',
      'Duration calculator',
    ],
  },
  {
    category: 'Execution',
    items: [
      'DMA export for platforms',
      'Real-time pacing alerts',
      'Overlap prevention',
    ],
  },
  {
    category: 'Analysis',
    items: [
      'Stat-sig lift calculation',
      'Incremental ROAS',
      'Confidence intervals',
    ],
  },
]

export function FeaturesSection() {
  return (
    <section id="features" className="py-24 bg-slate-50">
      <Container>
        <div className="mx-auto max-w-2xl lg:text-center">
          <h2 className="font-display text-3xl tracking-tight text-slate-900 sm:text-4xl">
            Everything You Need to Measure Offline Channels
          </h2>
          <p className="mt-4 text-lg text-slate-600">
            Plan, run and analyze geo-lift tests in one platform.
          </p>
        </div>

        <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((col) => (
            <div key={col.category} className="rounded-2xl bg-white p-8 shadow">
              <h3 className="text-xl font-semibold text-primary mb-4">
                {col.category}
              </h3>
              <ul className="space-y-3 list-disc list-inside">
                {col.items.map((item) => (
                  <li key={item} className="text-slate-700">
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </Container>
    </section>
  )
} 