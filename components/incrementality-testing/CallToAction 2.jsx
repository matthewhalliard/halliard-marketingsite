import { Button } from '../mmm/Button'
import { Container } from '../mmm/Container'

export function CallToAction() {
  return (
    <section
      id="get-started"
      className="relative overflow-hidden bg-primary py-16"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-primary to-blue-600/80" />
      <Container className="relative">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="font-display text-3xl tracking-tight text-white sm:text-4xl">
            Time to Know What Really Works
          </h2>
          <p className="mt-4 text-lg tracking-tight text-white/90">
            Every day without incrementality testing is budget potentially wasted on correlation theater.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row gap-x-6 gap-y-4 justify-center">
            <Button href="/schedule-demo" variant="solid" color="white">
              Schedule Demo
            </Button>
            <Button
              href="/action-plan"
              variant="outline"
              color="white"
            >
              Create Action Plan
            </Button>
          </div>
        </div>
      </Container>
    </section>
  )
} 