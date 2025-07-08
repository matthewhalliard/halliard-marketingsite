import { Container } from '../mmm/Container'

const testimonials = [
  {
    quote:
      'Geo-lift showed only 20% of our podcast ROAS was incremental. We reallocated $150k/month and grew new customer revenue 18%.',
    author: 'VP Growth',
    company: 'Subscription Coffee Brand',
  },
  {
    quote:
      'Streaming TV looked expensive until lift analysis proved a 2.3x incremental ROAS. We doubled budget with confidence.',
    author: 'Head of Media',
    company: 'Fintech App',
  },
  {
    quote:
      'Billboards were a black box. After testing we learned certain markets drive 6x more lift than others.',
    author: 'CMO',
    company: 'DTC Mattress Co.',
  },
]

export function TestimonialsSection() {
  return (
    <section className="py-24 bg-slate-50">
      <Container>
        <div className="mx-auto max-w-2xl lg:text-center">
          <h2 className="font-display text-3xl tracking-tight text-slate-900 sm:text-4xl">
            Marketers Getting Clarity
          </h2>
        </div>

        <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((t) => (
            <figure
              key={t.quote}
              className="rounded-2xl bg-white p-8 shadow-lg flex flex-col justify-between"
            >
              <blockquote className="text-slate-700 italic">
                “{t.quote}”
              </blockquote>
              <figcaption className="mt-6 text-sm text-slate-900 font-medium">
                {t.author} — {t.company}
              </figcaption>
            </figure>
          ))}
        </div>
      </Container>
    </section>
  )
} 