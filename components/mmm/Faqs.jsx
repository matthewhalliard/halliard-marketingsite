import { Container } from './Container'

export function Faqs() {
  const faqs = [
    {
      question: 'Do I need an existing MMM to use Halliard?',
      answer: 'While Halliard works best with an existing MMM, you can start with our AI attribution and add MMM later. We also partner with MMM providers if you need one.'
    },
    {
      question: 'How accurate are the response curves?',
      answer: 'The response curves are generated directly from your MMM coefficients and adstock parameters. The accuracy depends on your underlying model quality.'
    },
    {
      question: 'Can I run multiple geo-lift tests simultaneously?',
      answer: "Yes, as long as they're testing different channels and have non-overlapping DMAs. Our platform helps ensure proper test isolation."
    },
    {
      question: 'What MMM providers do you integrate with?',
      answer: 'We support outputs from all major providers including Nielsen, Analytic Partners, and custom in-house models via CSV upload or API.'
    }
  ]

  return (
    <section className="py-24 sm:py-32">
      <Container>
        <div className="mx-auto max-w-2xl lg:text-center">
          <h2 className="text-base font-semibold leading-7 text-blue-600">FAQs</h2>
          <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Frequently asked questions
          </p>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            Got questions? We've got answers.
          </p>
        </div>
        
        <div className="mx-auto mt-16 max-w-2xl">
          <dl className="space-y-8">
            {faqs.map((faq) => (
              <div key={faq.question} className="border-b border-gray-200 pb-8">
                <dt className="text-lg font-semibold leading-7 text-gray-900">
                  {faq.question}
                </dt>
                <dd className="mt-2 text-base leading-7 text-gray-600">
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