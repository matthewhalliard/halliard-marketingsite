import { Container } from '../mmm/Container'

export function ProblemSection() {
  return (
    <section
      id="problem"
      aria-label="Unmeasurable channel problem"
      className="pt-20 pb-14 sm:pt-32 sm:pb-20 lg:pb-32 bg-slate-50"
    >
      <Container>
        <div className="mx-auto max-w-2xl md:text-center">
          <h2 className="font-display text-3xl tracking-tight text-slate-900 sm:text-4xl">
            The “Unmeasurable” Channel Problem
          </h2>
          <p className="mt-4 text-lg text-slate-600">
            You’re spending big on channels that can’t prove their worth:
          </p>
        </div>

        <div className="mt-16 grid grid-cols-1 gap-8 lg:grid-cols-2">
          {/* Channels list */}
          <div className="rounded-2xl bg-white p-8 shadow-lg">
            <h3 className="text-2xl font-bold text-slate-900 mb-6">
              Channels You Can’t Measure:
            </h3>
            <div className="space-y-6">
              {[
                { emoji: '🎙️', title: 'Podcast Ads', desc: 'No cookies, no pixels, just “trust us” metrics' },
                { emoji: '📺', title: 'Streaming TV', desc: 'Impressions don’t equal impact' },
                { emoji: '🏞️', title: 'Billboards / OOH', desc: 'Huge reach, but did anyone buy?' },
                { emoji: '📻', title: 'Radio', desc: 'Still reaching millions, still can’t track conversions' },
              ].map((item) => (
                <div key={item.title} className="flex items-start">
                  <span className="text-2xl mr-4">{item.emoji}</span>
                  <div>
                    <p className="font-medium text-slate-900">{item.title}</p>
                    <p className="text-sm text-slate-600 mt-1">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Cost list */}
          <div className="rounded-2xl bg-white p-8 shadow-lg">
            <h3 className="text-2xl font-bold text-slate-900 mb-6">The Cost of Not Knowing:</h3>
            <div className="space-y-6">
              {[
                { icon: '💸', title: 'Budget Waste', desc: 'Could be 40-60% inefficient without knowing' },
                { icon: '📉', title: 'Missed Growth', desc: 'Underinvesting in channels that actually work' },
                { icon: '🛡️', title: 'No Defense', desc: 'Can’t justify spend to CFO / board' },
                { icon: '⚔️', title: 'Competitive Disadvantage', desc: 'Others are figuring this out' },
              ].map((item) => (
                <div key={item.title} className="flex items-start">
                  <span className="text-2xl mr-4">{item.icon}</span>
                  <div>
                    <p className="font-medium text-slate-900">{item.title}</p>
                    <p className="text-sm text-slate-600 mt-1">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-12 text-center">
          <p className="text-lg font-semibold text-slate-900">
            💡 The solution? Scientific geo-lift testing that proves real impact…
          </p>
        </div>
      </Container>
    </section>
  )
} 