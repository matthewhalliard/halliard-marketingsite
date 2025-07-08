import { Container } from '../mmm/Container'

const faqs = [
  {
    q: 'Why geo-lift vs. promo codes?',
    a: 'Promo codes undercount impact because many buyers forget or share codes.'
  },
  {
    q: 'How long does a test run?',
    a: 'Most reach significance in 3–4 weeks depending on spend.'
  },
  {
    q: 'Which channels can be tested?',
    a: 'Any channel you can geo-target—podcasts, streaming TV, radio, OOH and more.'
  },
  {
    q: 'Do I need historical data?',
    a: 'No, the experiment isolates lift during the test window only.'
  },
]

export function FAQSection() {
  return (
    <section id="faq" className="py-24 bg-white">
      <Container>
        <div className="mx-auto max-w-2xl lg:text-center">
          <h2 className="font-display text-3xl tracking-tight text-slate-900 sm:text-4xl">
            Frequently Asked Questions
          </h2>
        </div>

        <div className="mt-16 max-w-3xl mx-auto space-y-8">
          {faqs.map((f) => (
            <div key={f.q}>
              <h3 className="font-medium text-slate-900">{f.q}</h3>
              <p className="mt-2 text-slate-700 text-sm">{f.a}</p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  )
} 