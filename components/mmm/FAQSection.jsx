import { Container } from './Container'

export function FAQSection() {
  const faqs = [
    {
      question: "Do we need an existing MMM to use Halliard?",
      answer: "No! We can build a custom MMM for you using your historical data. If you already have one from any provider, we'll integrate it seamlessly."
    },
    {
      question: "How long does it take to build a custom MMM?",
      answer: "Initial model development takes 2-3 weeks depending on data availability. Monthly refreshes are automatic after that."
    },
    {
      question: "Can brands and agencies use the same account?",
      answer: "Yes! We support multi-user access with role-based permissions. Brands can invite their agencies and control what data they can access."
    },
    {
      question: "Can we run multiple geo-lift tests at once?",
      answer: "Yes, as long as they test different channels and use non-overlapping DMAs. Our platform ensures proper test isolation."
    },
    {
      question: "What makes your confidence scoring different?",
      answer: "We combine multiple validation methods - platform data, MMM correlation, geo-tests, and brand studies - into a single confidence score."
    },
    {
      question: "Can agencies white label for client presentations?",
      answer: "Absolutely. Agencies can replace our branding with theirs for new business pitches and client reporting."
    }
  ]

  return (
    <section
      id="faq"
      aria-label="Frequently asked questions"
      className="py-20 sm:py-32"
    >
      <Container>
        <div className="mx-auto max-w-2xl md:text-center">
          <h2 className="font-display text-3xl tracking-tight text-[#1F1F1F] sm:text-4xl">
            Frequently asked questions
          </h2>
        </div>
        <ul
          role="list"
          className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-8 lg:max-w-none lg:grid-cols-2"
        >
          {faqs.map((faq, faqIndex) => (
            <li key={faqIndex}>
              <h3 className="font-display text-lg leading-7 text-[#1F1F1F]">
                {faq.question}
              </h3>
              <p className="mt-4 text-sm text-[#4B4B4B]">{faq.answer}</p>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  )
} 