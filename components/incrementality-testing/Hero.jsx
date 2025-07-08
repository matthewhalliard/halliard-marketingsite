import { Button } from '../mmm/Button'
import { Container } from '../mmm/Container'

export function Hero() {
  return (
    <Container className="pt-32 pb-16 text-center lg:pt-40">
      <h1 className="mx-auto max-w-4xl font-display text-5xl font-medium tracking-tight text-slate-900 sm:text-7xl">
        Your Attribution Report is{' '}
        <span className="relative whitespace-nowrap text-primary">
          <svg
            aria-hidden="true"
            viewBox="0 0 418 42"
            className="absolute left-0 top-2/3 h-[0.58em] w-full fill-primary/30"
            preserveAspectRatio="none"
          >
            <path d="M203.371.916c-26.013-2.078-76.686 1.963-124.73 9.946L67.3 12.749C35.421 18.062 18.2 21.766 6.004 25.934 1.244 27.561.828 27.778.874 28.61c.07 1.214.828 1.121 9.595-1.176 9.072-2.377 17.15-3.92 39.246-7.496C123.565 7.986 157.869 4.492 195.942 5.046c7.461.108 19.25 1.696 19.17 2.582-.107 1.183-7.874 4.31-25.75 10.366-21.992 7.45-35.43 12.534-36.701 13.884-2.173 2.308-.202 4.407 4.442 4.734 2.654.187 3.263.157 15.593-.78 35.401-2.686 57.944-3.488 88.365-3.143 46.327.526 75.721 2.23 130.788 7.584 19.787 1.924 20.814 1.98 24.557 1.332l.066-.011c1.201-.203 1.53-1.825.399-2.335-2.911-1.31-4.893-1.604-22.048-3.261-57.509-5.556-87.871-7.36-132.059-7.842-23.239-.254-33.617-.116-50.627.674-11.629.54-42.371 2.494-46.696 2.967-2.359.259 8.133-3.625 26.504-9.81 23.239-7.825 27.934-10.149 28.304-14.005.417-4.348-3.529-6-16.878-7.066Z" />
          </svg>
          <span className="relative">misleading you</span>
        </span>
      </h1>
      <p className="mx-auto mt-6 max-w-2xl text-lg tracking-tight text-slate-700">
        Major brands discovered 30-85% of their "high-performing" channels weren't incremental at all. 
        Geo-lift testing reveals what actually drives growth vs. what just takes credit.
      </p>
      <div className="mt-10 flex flex-col sm:flex-row justify-center gap-4">
        <Button href="/schedule-demo" color="blue">
          Schedule Demo
        </Button>
        <Button href="/action-plan" variant="outline">
          Create Action Plan
        </Button>
      </div>
      
      <div className="mt-16">
        <p className="text-sm font-medium text-slate-600 uppercase tracking-wide">Trusted by data-driven marketers who were tired of correlation theater</p>
        <div className="mt-8 grid grid-cols-1 gap-8 sm:grid-cols-3 text-left max-w-3xl mx-auto">
          <div className="bg-white p-6 rounded-lg shadow-sm border border-slate-200">
            <p className="text-sm text-slate-600 italic">"We thought Facebook was our best channel at 3.2x ROAS. Testing showed only 1.8x was incremental."</p>
            <p className="mt-2 text-sm font-medium text-slate-900">— Director of Growth</p>
            <p className="text-sm text-primary font-bold">Saved 30% of budget</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm border border-slate-200">
            <p className="text-sm text-slate-600 italic">"Our branded search showed 8x ROAS but 85% would have converted anyway."</p>
            <p className="mt-2 text-sm font-medium text-slate-900">— VP Marketing</p>
            <p className="text-sm text-primary font-bold">Reallocated $100K/month</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm border border-slate-200">
            <p className="text-sm text-slate-600 italic">"Retargeting looked amazing at 5x ROAS. Reality? Only 15% incremental."</p>
            <p className="mt-2 text-sm font-medium text-slate-900">— CMO</p>
            <p className="text-sm text-primary font-bold">Cut waste by $50K/month</p>
          </div>
        </div>
      </div>
    </Container>
  )
} 