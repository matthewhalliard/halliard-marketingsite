import { Container } from '../mmm/Container'
import { Button } from '../mmm/Button'

export function CallToAction() {
  return (
    <section id="cta" className="relative overflow-hidden bg-primary py-16">
      <div className="absolute inset-0 bg-gradient-to-br from-primary to-blue-600/80" />
      <Container className="relative">
        <div className="mx-auto max-w-xl text-center">
          <h2 className="font-display text-3xl tracking-tight text-white sm:text-4xl">
            Ready to Measure the Unmeasurable?
          </h2>
          <p className="mt-4 text-lg tracking-tight text-white/90">
            Schedule a demo or generate a custom action plan to get started.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row justify-center gap-4">
            <Button href="/schedule-demo" color="white">
              Schedule Demo
            </Button>
            <Button href="/action-plan" variant="outline" color="white">
              Create Action Plan
            </Button>
          </div>
        </div>
      </Container>
    </section>
  )
} 