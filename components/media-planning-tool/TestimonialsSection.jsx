import { Container } from '../mmm/Container'

const testimonials = [
  {
    quote: 'It\u2019s like having Telmar, Tableau, and Excel all in one interface.',
    author: 'Director of Strategy',
  },
  {
    quote: 'I love showing tools like this in business pitches. They make us look sharp.',
    author: 'Agency VP',
  },
  {
    quote: 'Y\u2019all, I have tried some BAD media planning tools and Halliard just feels super easy.',
    author: 'Sr Media Manager',
  },
  {
    quote: 'Current Excel-based process is manual and cumbersome. We need a tool that reduces errors and gives everyone visibility.',
    author: 'Media Director',
  },
]

export function TestimonialsSection() {
  return (
    <section className="py-24 bg-white">
      <Container>
        <div className="mx-auto max-w-2xl lg:text-center">
          <h2 className="font-display text-3xl tracking-tight text-slate-900 sm:text-4xl">
            What media teams are saying
          </h2>
        </div>

        <div className="mt-16 grid gap-8 sm:grid-cols-2">
          {testimonials.map((t) => (
            <figure
              key={t.author}
              className="rounded-2xl bg-slate-50 p-8 shadow-lg ring-1 ring-slate-100 flex flex-col justify-between"
            >
              <blockquote className="text-lg text-slate-700 italic leading-relaxed">
                &ldquo;{t.quote}&rdquo;
              </blockquote>
              <figcaption className="mt-6 flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <span className="text-primary font-bold text-sm">
                    {t.author.split(' ').map(w => w[0]).join('').slice(0, 2)}
                  </span>
                </div>
                <span className="text-sm font-medium text-slate-900">{t.author}</span>
              </figcaption>
            </figure>
          ))}
        </div>
      </Container>
    </section>
  )
}
