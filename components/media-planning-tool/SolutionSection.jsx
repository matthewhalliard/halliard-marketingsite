import { Container } from '../mmm/Container'

const solutions = [
  {
    label: 'Plan',
    title: 'Flowcharts that don\u2019t live in Excel.',
    desc: 'Build media plans in a real planning tool — not a spreadsheet someone made in 2014. Drag channels, set flights, adjust budgets, and see the whole picture.',
    image: 'https://framerusercontent.com/images/Do50VB1Dg8wMM5JKLRuIGrIzoYI.png',
    imageAlt: 'Halliard flowcharting tool',
    secondaryImage: 'https://framerusercontent.com/images/biNbVFzIoeZzMakKat3pZ0svGtw.png',
    secondaryAlt: 'Budget input in Halliard',
    reverse: false,
  },
  {
    label: 'Track',
    title: 'Every dollar, from planned to delivered.',
    desc: 'See spend pacing in real time. No more reconciling platform reports in yet another spreadsheet. One view, always current.',
    image: 'https://framerusercontent.com/images/5Hfm6BdkFLXUIQw9MBO0RIUD7ks.png',
    imageAlt: 'Halliard planning and tracking view',
    reverse: true,
  },
  {
    label: 'Prove',
    title: 'Know what\u2019s actually working.',
    desc: 'Connect your plans to real business outcomes — marketing mix models, brand studies, and geo-lift tests. Stop relying on what platforms claim.',
    image: 'https://framerusercontent.com/images/6vVS4BRqrWJJFZMzwaumOSjJ2M.png',
    imageAlt: 'Scenario comparison in Halliard',
    reverse: false,
  },
]

export function SolutionSection() {
  return (
    <section id="solution" className="py-24 bg-white">
      <Container>
        <div className="mx-auto max-w-2xl lg:text-center mb-20">
          <h2 className="font-display text-3xl tracking-tight text-slate-900 sm:text-4xl">
            Plan → Track → Prove
          </h2>
          <p className="mt-4 text-lg text-slate-600">
            One platform. Three steps. No more duct-tape workflows.
          </p>
        </div>

        <div className="space-y-32">
          {solutions.map((s, i) => (
            <div
              key={s.label}
              className={`mx-auto max-w-5xl lg:flex lg:items-center lg:gap-16 ${
                s.reverse ? 'lg:flex-row-reverse' : ''
              }`}
            >
              {/* Text */}
              <div className="flex-1 lg:max-w-md">
                <p className="text-sm font-semibold tracking-widest uppercase text-primary/50 mb-4">
                  {s.label}
                </p>
                <h3 className="font-display text-2xl sm:text-3xl font-medium tracking-tight text-slate-900">
                  {s.title}
                </h3>
                <p className="mt-4 text-lg text-slate-600 leading-relaxed">{s.desc}</p>
              </div>

              {/* Image */}
              <div className="flex-1 mt-10 lg:mt-0 relative">
                <div className="rounded-xl overflow-hidden ring-1 ring-slate-200 shadow-xl">
                  <img
                    src={s.image}
                    alt={s.imageAlt}
                    className="w-full"
                    loading="lazy"
                  />
                </div>
                {s.secondaryImage && (
                  <div className="hidden lg:block absolute -bottom-10 -right-6 w-3/5 rounded-xl overflow-hidden ring-1 ring-slate-200 shadow-xl">
                    <img
                      src={s.secondaryImage}
                      alt={s.secondaryAlt}
                      className="w-full"
                      loading="lazy"
                    />
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  )
}
