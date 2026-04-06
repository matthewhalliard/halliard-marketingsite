import { Container } from '../mmm/Container'

const faqs = [
  {
    q: 'Is Halliard really free?',
    a: 'Yes. Free plan, no credit card. Plan as much media as you want.',
  },
  {
    q: 'Who is Halliard for?',
    a: 'Independent agencies (30\u2013300 people) that plan and buy cross-channel media.',
  },
  {
    q: 'What about measurement?',
    a: 'Connect your MMM or let us build one. Run geo-lift tests, see measured vs unmeasured channels.',
  },
  {
    q: 'How is this different from CommsPoint or Nielsen?',
    a: 'Faster, free to start, and built for how modern agencies actually work.',
  },
  {
    q: 'Can I import my existing plans?',
    a: 'Yes. Upload your Excel flowcharts and we\u2019ll convert them.',
  },
]

export function FAQSection() {
  return (
    <section id="faq" className="py-24 bg-slate-50">
      <Container>
        <div className="mx-auto max-w-2xl lg:text-center">
          <h2 className="font-display text-3xl tracking-tight text-slate-900 sm:text-4xl">
            Frequently Asked Questions
          </h2>
        </div>

        <div className="mt-16 max-w-3xl mx-auto">
          <div className="divide-y divide-slate-200">
            {faqs.map((f) => (
              <div key={f.q} className="py-8">
                <h3 className="font-display text-lg font-medium text-slate-900">{f.q}</h3>
                <p className="mt-3 text-slate-600 leading-relaxed">{f.a}</p>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  )
}
