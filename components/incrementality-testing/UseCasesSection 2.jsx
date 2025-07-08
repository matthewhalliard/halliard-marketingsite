import { Container } from '../mmm/Container'

const useCases = [
  {
    title: 'Channel Testing',
    items: [
      { question: 'New Channels', answer: 'Should we invest in podcasts/CTV/TikTok?' },
      { question: 'Channel Comparison', answer: 'Which platform drives more incremental sales?' },
      { question: 'Budget Allocation', answer: 'Where should the next dollar go?' },
    ],
  },
  {
    title: 'Campaign Testing',
    items: [
      { question: 'Creative Impact', answer: 'Does this new creative actually work better?' },
      { question: 'Audience Testing', answer: 'Are we reaching new customers or preaching to the choir?' },
      { question: 'Frequency Optimization', answer: 'When do we hit diminishing returns?' },
    ],
  },
  {
    title: 'Strategic Questions',
    items: [
      { question: 'Market Expansion', answer: 'Will this channel work in new geos?' },
      { question: 'Competitive Response', answer: 'Did our campaign move the needle?' },
      { question: 'Seasonality', answer: "What's baseline vs. marketing-driven?" },
    ],
  },
]

export function UseCasesSection() {
  return (
    <section id="use-cases" className="py-24 bg-white">
      <Container>
        <div className="mx-auto max-w-2xl lg:text-center">
          <h2 className="font-display text-3xl tracking-tight text-slate-900 sm:text-4xl">
            Answer Your Toughest Marketing Questions
          </h2>
          <p className="mt-4 text-lg tracking-tight text-slate-700">
            Geo-lift testing provides definitive answers when attribution fails
          </p>
        </div>

        <div className="mx-auto mt-16 max-w-7xl">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
            {useCases.map((category) => (
              <div key={category.title} className="bg-slate-50 rounded-2xl p-8">
                <h3 className="text-xl font-bold text-slate-900 mb-6">
                  {category.title}
                </h3>
                <div className="space-y-6">
                  {category.items.map((item, index) => (
                    <div key={index}>
                      <h4 className="font-semibold text-slate-900 mb-2">
                        {item.question}
                      </h4>
                      <p className="text-gray-600">
                        {item.answer}
                      </p>
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