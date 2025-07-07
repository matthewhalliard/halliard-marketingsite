import { Button } from './Button'
import { Container } from './Container'

export function CallToAction() {
  return (
    <section
      id="get-started"
      className="relative overflow-hidden bg-[#1F3FFF] py-32"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-[#1F3FFF] to-[#1F3FFF]/80" />
      <Container className="relative">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="font-display text-3xl tracking-tight text-white sm:text-4xl">
            Ready to Make Better Budget Decisions?
          </h2>
          <p className="mt-4 text-lg tracking-tight text-white/90">
            Whether you're a brand seeking truth or an agency proving value, get unified measurement, 
            validated testing, and confidence scoring in one platform.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row gap-x-6 gap-y-4 justify-center">
            <Button href="/demo" variant="solid" color="white">
              Schedule a Demo
            </Button>
            <Button
              href="/calculator"
              variant="outline"
              color="white"
            >
              Try Test Power Calculator
            </Button>
          </div>
        </div>
      </Container>
    </section>
  )
} 