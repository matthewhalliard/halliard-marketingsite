import { Container } from './Container'

export function Testimonials() {
  const testimonials = [
    {
      name: 'Sarah Chen',
      role: 'VP of Marketing',
      company: 'DTC Fashion Brand',
      headshot: '[Headshot: Professional photo of Sarah Chen, smiling, business casual attire]',
      logo: '[Logo: Fashion brand logo - modern, minimalist design]',
      quote: "Before Radia, our MMM model told us to shift budget to social, but we couldn't validate if it would actually work. The geo-lift test designer helped us prove a 23% incremental lift before committing our full budget.",
      metrics: '+23% incremental revenue, 6 weeks to validate'
    },
    {
      name: 'Marcus Rodriguez',
      role: 'Head of Analytics',
      company: 'Performance Marketing Agency',
      headshot: '[Headshot: Professional photo of Marcus Rodriguez, confident pose, business attire]',
      logo: '[Logo: Marketing agency logo - bold, dynamic design]',
      quote: "We manage MMM for 12 clients. What used to take our team days of Excel work now happens instantly in Radia. The response curves alone have helped us prevent $2M in wasted ad spend this quarter.",
      metrics: '$2M saved in Q3, 80% time reduction'
    }
  ]

  return (
    <div className="py-20 sm:py-32">
      <Container>
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="font-display text-3xl tracking-tight text-slate-900 sm:text-4xl">
            Trusted by Performance Marketers
          </h2>
          <p className="mt-4 text-lg text-slate-600">
            See how teams are using Radia to validate and optimize their MMM insights
          </p>
        </div>
        
        <div className="mx-auto mt-16 grid max-w-5xl grid-cols-1 gap-8 lg:grid-cols-2">
          {testimonials.map((testimonial) => (
            <div key={testimonial.name} className="rounded-2xl bg-white p-8 shadow-lg">
              <div className="flex items-center gap-x-4 mb-6">
                {/* Headshot Placeholder */}
                <div className="h-16 w-16 rounded-full border-2 border-dashed border-gray-300 bg-gray-50 p-2 flex items-center justify-center">
                  <p className="text-[8px] text-gray-500 text-center">{testimonial.headshot}</p>
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-slate-900">{testimonial.name}</h3>
                  <p className="text-sm text-slate-600">{testimonial.role}</p>
                  <p className="text-sm text-slate-500">{testimonial.company}</p>
                </div>
                {/* Company Logo Placeholder */}
                <div className="h-12 w-24 rounded border-2 border-dashed border-gray-300 bg-gray-50 p-2 flex items-center justify-center">
                  <p className="text-[8px] text-gray-500 text-center">{testimonial.logo}</p>
                </div>
              </div>
              
              <blockquote className="text-slate-700">
                "{testimonial.quote}"
              </blockquote>
              
              <div className="mt-6 rounded-lg bg-blue-50 p-4">
                <p className="text-sm font-semibold text-blue-900">Results:</p>
                <p className="text-sm text-blue-700">{testimonial.metrics}</p>
              </div>
            </div>
          ))}
        </div>
        
        {/* Additional logos section */}
        <div className="mt-16">
          <p className="text-center text-sm font-semibold text-slate-600 mb-8">
            Also trusted by teams at
          </p>
          <div className="mx-auto max-w-4xl">
            <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
              {['Company 1', 'Company 2', 'Company 3', 'Company 4'].map((company) => (
                <div key={company} className="h-12 rounded border-2 border-dashed border-gray-300 bg-gray-50 p-2 flex items-center justify-center">
                  <p className="text-xs text-gray-500">[Logo: {company}]</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </div>
  )
} 