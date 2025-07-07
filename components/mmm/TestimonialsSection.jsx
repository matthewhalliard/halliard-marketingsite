import { Container } from './Container'

export function TestimonialsSection() {
  const testimonials = [
    {
      quote: "We discovered our Instagram spend was 35% past diminishing returns while our podcast investment was underweight. The geo-lift test validated the MMM findings. We reallocated $2M annually and saw 28% better ROAS.",
      author: "Jennifer Wu",
      role: "CMO"
    },
    {
      quote: "Halliard transformed how we approach measurement. We integrated our existing MMM in minutes and now run geo-lift tests that used to take weeks of manual work. Game changer.",
      author: "Michael Chen",
      role: "Chief Analytics Officer"
    },
    {
      quote: "Finally, we can see all our marketing data in one place. The confidence scoring helped us trust incrementality tests over inflated platform metrics. Our CAC dropped 40% in 6 months.",
      author: "Marcus Rodriguez",
      role: "VP Growth"
    },
    {
      quote: "The platform paid for itself in the first month. We found $500K of wasted spend in channels that looked good in platform reporting but failed incrementality testing.",
      author: "Sarah Kim",
      role: "Director of Analytics"
    },
    {
      quote: "Halliard helps us prove our recommendations with data. The ability to show clients side-by-side MMM outputs versus platform metrics builds trust instantly.",
      author: "David Patel",
      role: "SVP Strategy"
    },
    {
      quote: "We used to wait 8 weeks for MMM updates. Now we get fresh insights weekly and can run geo tests on demand. It's completely changed how we optimize media.",
      author: "Lisa Thompson",
      role: "Head of Media"
    }
  ]

  return (
    <section
      id="testimonials"
      aria-label="What our customers are saying"
      className="py-10 sm:py-16"
    >
      <Container>
        <div className="mx-auto max-w-2xl md:text-center">
          <h2 className="font-display text-3xl tracking-tight text-slate-900 sm:text-4xl">
            Loved by brands and agencies alike
          </h2>
          <p className="mt-4 text-lg tracking-tight text-slate-600">
            Our platform helps marketing teams make better decisions with confidence.
          </p>
        </div>
        <div className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-6 lg:max-w-none lg:grid-cols-3">
          {testimonials.map((testimonial, idx) => (
            <div key={idx} className="flex flex-col rounded-2xl bg-white p-8 shadow-lg">
              <blockquote className="flex-1 text-slate-600">
                "{testimonial.quote}"
              </blockquote>
              <div className="mt-6 border-t border-gray-100 pt-6">
                <p className="text-sm font-semibold text-slate-900">{testimonial.author}</p>
                <p className="text-sm text-slate-600">{testimonial.role}</p>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  )
} 