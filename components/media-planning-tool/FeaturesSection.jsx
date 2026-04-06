import { Container } from '../mmm/Container'

const features = [
  {
    emoji: '📐',
    title: 'Flowcharts that don\u2019t live in Excel',
    desc: 'Build plans in a real tool, not a spreadsheet from 2014.',
  },
  {
    emoji: '📊',
    title: 'Know what\u2019s actually working',
    desc: 'Connect to MMM, brand studies, and geo-lift tests.',
  },
  {
    emoji: '🏆',
    title: 'Win more pitches',
    desc: 'Walk into the room with data, not gut feel.',
  },
  {
    emoji: '💡',
    title: 'Affordable MMM',
    desc: 'Marketing mix modeling that doesn\u2019t cost $250K.',
  },
  {
    emoji: '🌐',
    title: '1,000+ media properties',
    desc: 'Plan across every channel.',
  },
  {
    emoji: '🛠️',
    title: 'Built by media people',
    desc: 'Founded by ex-Amazon DSP planners.',
  },
]

export function FeaturesSection() {
  return (
    <section id="features" className="py-24 bg-slate-50">
      <Container>
        <div className="mx-auto max-w-2xl lg:text-center">
          <h2 className="font-display text-3xl tracking-tight text-slate-900 sm:text-4xl">
            Everything you need in one place
          </h2>
          <p className="mt-4 text-lg text-slate-600">
            No more stitching together 6 tools to do your job.
          </p>
        </div>

        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((f) => (
            <div
              key={f.title}
              className="rounded-2xl bg-white p-8 shadow-lg ring-1 ring-slate-100 hover:shadow-xl transition-shadow"
            >
              <div className="text-4xl mb-4">{f.emoji}</div>
              <h3 className="text-lg font-semibold text-slate-900 mb-2">{f.title}</h3>
              <p className="text-sm text-slate-600 leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>

        {/* Full-width product screenshot */}
        <div className="mt-20 rounded-xl overflow-hidden ring-1 ring-slate-200 shadow-xl">
          <img
            src="https://framerusercontent.com/images/ZEuzFtIjwJ18pSQSRR5q6Ky7YjE.png"
            alt="Halliard platform overview"
            className="w-full"
            loading="lazy"
          />
        </div>
      </Container>
    </section>
  )
}
