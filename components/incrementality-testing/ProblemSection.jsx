import { Container } from '../mmm/Container'

export function ProblemSection() {
  return (
    <section id="problem" className="py-24 bg-slate-50">
      <Container>
        <div className="mx-auto max-w-2xl lg:text-center">
          <h2 className="font-display text-3xl tracking-tight text-slate-900 sm:text-4xl">
            The Incrementality Crisis
          </h2>
          <p className="mt-4 text-lg tracking-tight text-slate-700">
            Your attribution is lying to you:
          </p>
        </div>

        <div className="mx-auto mt-12 max-w-2xl sm:mt-16 lg:mt-20 lg:max-w-4xl">
          <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-10 lg:max-w-none lg:grid-cols-2 lg:gap-y-16">
            <div className="relative pl-16">
              <dt className="text-base font-semibold leading-7 text-gray-900">
                <div className="absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-lg bg-primary">
                  <span className="text-2xl">📈</span>
                </div>
                Platform Metrics Inflate Impact
              </dt>
              <dd className="mt-2 text-base leading-7 text-gray-600">
                Every platform claims the conversion
              </dd>
            </div>

            <div className="relative pl-16">
              <dt className="text-base font-semibold leading-7 text-gray-900">
                <div className="absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-lg bg-primary">
                  <span className="text-2xl">🔄</span>
                </div>
                Correlation ≠ Causation
              </dt>
              <dd className="mt-2 text-base leading-7 text-gray-600">
                Just because sales went up doesn't mean your ads caused it
              </dd>
            </div>

            <div className="relative pl-16">
              <dt className="text-base font-semibold leading-7 text-gray-900">
                <div className="absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-lg bg-primary">
                  <span className="text-2xl">💸</span>
                </div>
                Hidden Waste
              </dt>
              <dd className="mt-2 text-base leading-7 text-gray-600">
                Up to 40% of "attributed" sales would happen anyway
              </dd>
            </div>

            <div className="relative pl-16">
              <dt className="text-base font-semibold leading-7 text-gray-900">
                <div className="absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-lg bg-primary">
                  <span className="text-2xl">🎭</span>
                </div>
                Performance Theater
              </dt>
              <dd className="mt-2 text-base leading-7 text-gray-600">
                Looking good in dashboards while wasting money
              </dd>
            </div>
          </dl>
        </div>
      </Container>
    </section>
  )
} 