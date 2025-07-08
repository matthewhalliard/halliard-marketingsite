import { Container } from '../mmm/Container'

const faqs = [
  { question: 'How is this different from A/B testing?', answer: 'A/B tests compare creative/landing pages. Geo-lift tests measure if your marketing drives incremental business results vs. doing nothing.' },
  { question: 'What channels can I test?', answer: 'Any channel where you can control geographic targeting - digital, TV, audio, OOH, even direct mail.' },
  { question: 'How long before I see results?', answer: 'Most tests run 3-4 weeks, with results available within 48 hours of test completion.' },
  { question: "What if I can't pause other marketing?", answer: 'No problem. The control group accounts for all other marketing activity. We\'re measuring the incremental impact of the tested channel.' },
  { question: 'Can I test multiple things at once?', answer: 'Yes, as long as they target different DMAs. We help design non-overlapping experiments.' },
]

export function FAQSection() {
  return (
    <section id="faq" className="py-24 bg-white">
      <Container>
        <div className="mx-auto max-w-2xl lg:text-center">
          <h2 className="font-display text-3xl tracking-tight text-slate-900 sm:text-4xl">
            Frequently Asked Questions
          </h2>
          <p className="mt-4 text-lg tracking-tight text-slate-700">
            Everything you need to know about geo-lift testing
          </p>
        </div>

        <div className="mx-auto mt-16 max-w-3xl">
          <dl className="space-y-8">
            {faqs.map((faq, i) => (
              <div key={i} className="border-b border-gray-200 pb-8 last:border-0">
                <dt className="text-lg font-semibold text-slate-900 mb-4">
                  {faq.question}
                </dt>
                <dd className="text-gray-600">
                  {faq.answer}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </Container>
    </section>
  )
} 