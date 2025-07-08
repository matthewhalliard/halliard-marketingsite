import { Container } from '../mmm/Container'

const testimonials = [
  {
    content: 'We thought Facebook was our best channel at 3.2x ROAS. Geo-testing showed only 1.8x was incremental. We cut spend 30% with zero impact on revenue.',
    author: 'Director of Growth',
    company: 'DTC Beauty Brand',
    result: '30% budget savings',
  },
  {
    content: 'Our branded search showed 8x ROAS but geo-testing proved 85% would convert anyway. We shifted $100K/month to actually incremental channels.',
    author: 'VP Marketing',
    company: 'SaaS Platform',
    result: '$100K/month reallocated',
  },
  {
    content: 'Geo-lift testing revealed our retargeting was only 15% incremental. We reduced frequency caps and saved $50K/month without losing sales.',
    author: 'Head of Performance Marketing',
    company: 'E-commerce Retailer',
    result: '$50K/month saved',
  },
]

export function TestimonialsSection() {
  return (
    <section id="testimonials" className="py-24 bg-slate-50">
      <Container>
        <div className="mx-auto max-w-2xl lg:text-center">
          <h2 className="font-display text-3xl tracking-tight text-slate-900 sm:text-4xl">
            Results That Matter
          </h2>
          <p className="mt-4 text-lg tracking-tight text-slate-700">
            Real brands discovering what actually drives growth
          </p>
        </div>

        <div className="mx-auto mt-16 max-w-7xl">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
            {testimonials.map((t, i) => (
              <div key={i} className="bg-white rounded-2xl p-8 shadow-sm">
                <div className="mb-4">
                  <span className="inline-block px-3 py-1 text-sm font-semibold text-primary bg-blue-50 rounded-full">
                    {t.result}
                  </span>
                </div>
                <blockquote className="text-gray-900 mb-6">"{t.content}"</blockquote>
                <div className="border-t pt-4">
                  <p className="font-semibold text-gray-900">{t.author}</p>
                  <p className="text-sm text-gray-600">{t.company}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  )
} 