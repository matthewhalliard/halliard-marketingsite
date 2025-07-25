import Image from 'next/image'
import { Button } from './Button'
import { Container } from './Container'

export function Hero() {
  return (
    <div className="relative">
      <Container className="pt-32 pb-16 text-center lg:pt-40">
        <h1 className="mx-auto max-w-4xl font-display text-5xl font-medium tracking-tight text-slate-900 sm:text-7xl">
          Finally, an MMM That{' '}
          <span className="relative text-primary sm:whitespace-nowrap">
            <svg
              aria-hidden="true"
              viewBox="0 0 418 42"
              className="absolute left-0 top-2/3 h-[0.58em] w-full fill-primary/30"
              preserveAspectRatio="none"
            >
              <path d="M203.371.916c-26.013-2.078-76.686 1.963-124.73 9.946L67.3 12.749C35.421 18.062 18.2 21.766 6.004 25.934 1.244 27.561.828 27.778.874 28.61c.07 1.214.828 1.121 9.595-1.176 9.072-2.377 17.15-3.92 39.246-7.496C123.565 7.986 157.869 4.492 195.942 5.046c7.461.108 19.25 1.696 19.17 2.582-.107 1.183-7.874 4.31-25.75 10.366-21.992 7.45-35.43 12.534-36.701 13.884-2.173 2.308-.202 4.407 4.442 4.734 2.654.187 3.263.157 15.593-.78 35.401-2.686 57.944-3.488 88.365-3.143 46.327.526 75.721 2.23 130.788 7.584 19.787 1.924 20.814 1.98 24.557 1.332l.066-.011c1.201-.203 1.53-1.825.399-2.335-2.911-1.31-4.893-1.604-22.048-3.261-57.509-5.556-87.871-7.36-132.059-7.842-23.239-.254-33.617-.116-50.627.674-11.629.54-42.371 2.494-46.696 2.967-2.359.259 8.133-3.625 26.504-9.81 23.239-7.825 27.934-10.149 28.304-14.005.417-4.348-3.529-6-16.878-7.066Z" />
            </svg>
            <span className="relative">Tells You What to Do</span>
          </span>{' '}
        </h1>
        <p className="mx-auto mt-6 max-w-2xl text-lg tracking-tight text-slate-700">
          Stop drowning in attribution reports. Get clear, actionable recommendations 
          for every channel, every week. Your MMM data, transformed into a planning roadmap.
        </p>
        <div className="mt-10 flex flex-col sm:flex-row justify-center gap-4">
          <Button href="/schedule-demo" color="blue">
            Schedule Demo
          </Button>
          <Button href="/action-plan" variant="outline">
            Create Action Plan
          </Button>
        </div>
        
        <div className="mt-16 grid grid-cols-2 gap-4 sm:grid-cols-4 text-center">
          <div>
            <div className="text-4xl font-bold text-primary">↗</div>
            <p className="mt-2 text-sm font-medium text-slate-900">Reallocation Engine</p>
            <p className="text-xs text-slate-600">Move $50K from Social to CTV for +12% efficiency</p>
          </div>
          <div>
            <div className="text-4xl font-bold text-primary">⚠</div>
            <p className="mt-2 text-sm font-medium text-slate-900">Saturation Scanner</p>
            <p className="text-xs text-slate-600">Facebook hitting diminishing returns at $200K/month</p>
          </div>
          <div>
            <div className="text-4xl font-bold text-primary">🎯</div>
            <p className="mt-2 text-sm font-medium text-slate-900">Growth Finder</p>
            <p className="text-xs text-slate-600">Podcasts underinvested by 40% vs. optimal</p>
          </div>
          <div>
            <div className="text-4xl font-bold text-primary">🧪</div>
            <p className="mt-2 text-sm font-medium text-slate-900">Test Prioritizer</p>
            <p className="text-xs text-slate-600">Validate Pinterest next - 85% confidence in 3 weeks</p>
          </div>
        </div>
      </Container>
    </div>
  )
} 