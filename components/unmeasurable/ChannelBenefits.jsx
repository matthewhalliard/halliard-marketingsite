import { Container } from '../mmm/Container'

const benefits = [
  {
    channel: 'Podcasts',
    points: ['Host-read + dynamic ads', 'Measure true CPA', 'Scale winners fast'],
  },
  {
    channel: 'Streaming TV',
    points: ['Connected TV & OTT', 'Optimize creative', 'Prove incremental reach'],
  },
  {
    channel: 'Billboards',
    points: ['Digital & classic OOH', 'Market-level lift', 'Know which locations work'],
  },
]

export function ChannelBenefits() {
  return (
    <section className="py-24 bg-white">
      <Container>
        <div className="mx-auto max-w-2xl lg:text-center">
          <h2 className="font-display text-3xl tracking-tight text-slate-900 sm:text-4xl">
            Unleash Hard-to-Measure Channels
          </h2>
          <p className="mt-4 text-lg text-slate-600">
            Geo-lift lets you prove ROI across any media you can geo-target.
          </p>
        </div>

        <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {benefits.map((b) => (
            <div key={b.channel} className="rounded-2xl bg-slate-50 p-8 shadow-sm">
              <h3 className="text-xl font-semibold text-primary mb-4 text-center">
                {b.channel}
              </h3>
              <ul className="space-y-3">
                {b.points.map((p) => (
                  <li key={p} className="text-slate-700 text-sm flex items-start gap-2">
                    <span className="text-primary">✓</span>
                    {p}
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