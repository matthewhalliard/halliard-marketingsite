import { Container } from '../mmm/Container'
import { Button } from '../mmm/Button'
import Link from 'next/link'

const SIGN_UP_URL = 'https://app.halliardmedia.com/sign-up'

export function Hero({ onSignupClick }) {
  return (
    <Container className="pt-32 pb-16 text-center lg:pt-40">
      <h1 className="mx-auto max-w-4xl font-display text-5xl font-medium tracking-tight text-slate-900 sm:text-7xl">
        Your clients are asking{' '}
        <span className="relative whitespace-nowrap text-primary">
          <svg
            aria-hidden="true"
            viewBox="0 0 418 42"
            className="absolute left-0 top-2/3 h-[0.58em] w-full fill-primary/30"
            preserveAspectRatio="none"
          >
            <path d="M203.371.916c-26.013-2.078-76.686 1.963-124.73 9.946L67.3 12.749C35.421 18.062 18.2 21.766 6.004 25.934 1.244 27.561.828 27.778.874 28.61c.07 1.214.828 1.121 9.595-1.176 9.072-2.377 17.15-3.92 39.246-7.496C123.565 7.986 157.869 4.492 195.942 5.046c7.461.108 19.25 1.696 19.17 2.582-.107 1.183-7.874 4.31-25.75 10.366-21.992 7.45-35.43 12.534-36.701 13.884-2.173 2.308-.202 4.407 4.442 4.734 2.654.187 3.263.157 15.593-.78 35.401-2.686 57.944-3.488 88.365-3.143 46.327.526 75.721 2.23 130.788 7.584 19.787 1.924 20.814 1.98 24.557 1.332l.066-.011c1.201-.203 1.53-1.825.399-2.335-2.911-1.31-4.893-1.604-22.048-3.261-57.509-5.556-87.871-7.36-132.059-7.842-23.239-.254-33.617-.116-50.627.674-11.629.54-42.371 2.494-46.696 2.967-2.359.259 8.133-3.625 26.504-9.81 23.239-7.825 27.934-10.149 28.304-14.005.417-4.348-3.529-6-16.878-7.066Z" />
          </svg>
          <span className="relative">&lsquo;did this work?&rsquo;</span>
        </span>
      </h1>
      <p className="mx-auto mt-6 max-w-2xl text-lg tracking-tight text-slate-700">
        Stop planning in spreadsheets. Build flowcharts, track spend, and prove results — all in one platform. Free to start.
      </p>
      <div className="mt-10 flex flex-col sm:flex-row justify-center gap-4">
        <a
          href={SIGN_UP_URL}
          onClick={(e) => {
            e.preventDefault()
            if (onSignupClick) onSignupClick(SIGN_UP_URL)
          }}
          className="inline-flex items-center justify-center rounded-full bg-primary px-6 py-3 text-sm font-semibold text-white hover:bg-primary/90 transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
        >
          Start Planning Free
        </a>
        <Button href="/trytoday" variant="outline" color="slate">
          See It In Action
        </Button>
      </div>

      {/* Stat cards */}
      <div className="mt-16 grid grid-cols-2 gap-4 sm:grid-cols-4 text-center">
        {[
          { emoji: '📊', title: 'Plan', desc: 'Flowcharts & scenarios in minutes' },
          { emoji: '💰', title: 'Track', desc: 'Every dollar, planned to delivered' },
          { emoji: '🎯', title: 'Prove', desc: 'MMM & geo-lift measurement' },
          { emoji: '⚡', title: 'Free to Start', desc: 'No credit card required' },
        ].map((item) => (
          <div key={item.title} className="rounded-2xl bg-white p-6 shadow-lg ring-1 ring-slate-100">
            <div className="text-4xl">{item.emoji}</div>
            <p className="mt-3 text-sm font-semibold text-slate-900">{item.title}</p>
            <p className="mt-1 text-xs text-slate-600">{item.desc}</p>
          </div>
        ))}
      </div>

      {/* Hero product shot */}
      <div className="mt-16 sm:mt-20">
        <div className="rounded-xl overflow-hidden ring-1 ring-slate-200 shadow-2xl">
          <img
            src="https://framerusercontent.com/images/LYy1CcqUUqNr3V5tUBdRBX8Tc.png"
            alt="Halliard media planning platform"
            className="w-full"
            loading="eager"
          />
        </div>
      </div>
    </Container>
  )
}
