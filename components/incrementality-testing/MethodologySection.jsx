import { Container } from '../mmm/Container'

const methodologySteps = [
  { number: '1', title: 'Pre-Test Planning', items: ['Historical data analysis','Power calculation','Market selection','Test design documentation'] },
  { number: '2', title: 'Test Execution', items: ['Campaign setup verification','Daily monitoring','Anomaly detection','Mid-flight adjustments'] },
  { number: '3', title: 'Analysis & Results', items: ['Statistical significance testing','Lift calculation','Confidence interval generation','Strategic recommendations'] },
  { number: '4', title: 'Implementation', items: ['Budget reallocation guidance','Scaling strategies','Ongoing measurement plan','Executive reporting'] },
]

export function MethodologySection() {
  return (
    <section id="methodology" className="py-24 bg-white">
      <Container>
        <div className="mx-auto max-w-2xl lg:text-center">
          <h2 className="font-display text-3xl tracking-tight text-slate-900 sm:text-4xl">
            Our Testing Framework
          </h2>
          <p className="mt-4 text-lg tracking-tight text-slate-700">
            A proven methodology for getting reliable, actionable results
          </p>
        </div>

        <div className="mx-auto mt-16 max-w-5xl">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
            {methodologySteps.map((step) => (
              <div key={step.number} className="relative">
                {step.number !== '4' && (
                  <div className="hidden lg:block absolute top-8 left-full w-full h-0.5 bg-gray-300 z-0" />
                )}
                <div className="relative z-10">
                  <div className="flex items-center justify-center w-16 h-16 bg-primary text-white rounded-full text-2xl font-bold mx-auto mb-4">
                    {step.number}
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 text-center mb-4">
                    {step.title}
                  </h3>
                  <ul className="space-y-2">
                    {step.items.map((item, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <svg className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        <span className="text-sm text-gray-600">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  )
} 