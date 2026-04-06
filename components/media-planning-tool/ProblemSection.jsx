import { Container } from '../mmm/Container'

const steps = [
  { num: '1', icon: '📊', title: 'Build flowchart in Excel' },
  { num: '2', icon: '📧', title: 'Email it for approvals' },
  { num: '3', icon: '📋', title: 'Copy numbers into buying system' },
  { num: '4', icon: '📉', title: 'Pull reports into another spreadsheet' },
  { num: '5', icon: '🔬', title: 'Run through Keen or Nielsen' },
  { num: '6', icon: '📎', title: 'Paste into PowerPoint' },
]

export function ProblemSection() {
  return (
    <section
      id="problem"
      aria-label="The problem with media planning"
      className="pt-20 pb-14 sm:pt-32 sm:pb-20 lg:pb-32 bg-slate-50"
    >
      <Container>
        <div className="mx-auto max-w-2xl md:text-center">
          <h2 className="font-display text-3xl tracking-tight text-slate-900 sm:text-4xl">
            You know the drill.
          </h2>
        </div>

        <div className="mt-16 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
          {steps.map((step) => (
            <div
              key={step.num}
              className="rounded-2xl bg-white p-6 shadow-lg ring-1 ring-slate-100 text-center"
            >
              <div className="text-3xl mb-3">{step.icon}</div>
              <div className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-primary/10 text-primary text-sm font-bold mb-3">
                {step.num}
              </div>
              <p className="text-sm font-medium text-slate-900">{step.title}</p>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <p className="mx-auto max-w-2xl font-display text-2xl sm:text-3xl font-medium tracking-tight text-primary">
            256 steps from brief to billing.
          </p>
          <p className="mt-3 text-lg text-slate-600">
            That&rsquo;s not a process — that&rsquo;s a tax on your team&rsquo;s time.
          </p>
        </div>
      </Container>
    </section>
  )
}
