import { Container } from '../mmm/Container'
import Image from 'next/image'

const steps = [
  { num: '1', title: 'Select Markets', desc: 'Choose matched test & control DMAs' },
  { num: '2', title: 'Run Campaign', desc: 'Deliver ads only in test markets' },
  { num: '3', title: 'Measure Lift', desc: 'Compare conversions vs. control' },
  { num: '4', title: 'Scale Budget', desc: 'Invest only in incremental channels' },
]

export function SolutionSection() {
  return (
    <section id="solution" className="py-24 bg-white">
      <Container>
        <div className="mx-auto max-w-2xl lg:text-center">
          <h2 className="font-display text-3xl tracking-tight text-slate-900 sm:text-4xl">
            How Geo-Lift Testing Works
          </h2>
          <p className="mt-4 text-lg text-slate-600">
            A scientific experiment that isolates causation from correlation.
          </p>
        </div>

        <div className="mx-auto mt-16 max-w-5xl lg:flex lg:items-start lg:gap-12">
          <div className="flex-1 space-y-8">
            {steps.map((s) => (
              <div key={s.num} className="flex gap-4 items-start">
                <div className="flex-shrink-0 w-12 h-12 bg-primary text-white rounded-full flex items-center justify-center font-bold">
                  {s.num}
                </div>
                <div>
                  <p className="font-medium text-slate-900">{s.title}</p>
                  <p className="text-sm text-slate-600 mt-1">{s.desc}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="flex-1 mt-12 lg:mt-0 flex items-stretch justify-center">
            <Image
              src="/images/mmm/dma-map.png"
              alt="DMA map"
              width={400}
              height={300}
              className="rounded-lg shadow-md w-full max-w-md h-full object-contain"
            />
          </div>
        </div>
      </Container>
    </section>
  )
} 