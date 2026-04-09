import Head from 'next/head'
import Link from 'next/link'
import { Button } from '../components/mmm/Button'
import { Container } from '../components/mmm/Container'

const SIGN_UP_URL = 'https://app.halliardmedia.com/sign-up'

function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/70 backdrop-blur-sm border-b border-gray-100">
      <Container className="">
        <nav className="relative flex justify-between items-center py-5">
          <Link href="/" aria-label="Home">
            <img
              src="https://framerusercontent.com/images/s97qQgHpRGf1STgb6vDMgqYNU4.png?scale-down-to=512"
              alt="Halliard"
              className="h-8 w-auto"
            />
          </Link>
          <div className="flex items-center gap-x-4">
            <Link
              href="/trytoday"
              className="hidden sm:inline text-sm text-slate-600 hover:text-slate-900"
            >
              See it in action
            </Link>
            <Button href={SIGN_UP_URL} color="blue">
              Start Planning Free
            </Button>
          </div>
        </nav>
      </Container>
    </header>
  )
}

const PLUS_PATTERN = "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%231a6ab4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")"

function Hero() {
  return (
    <div className="relative overflow-hidden">
      {/* Plus dot pattern background */}
      <div className="absolute inset-0 opacity-[0.07]" style={{ backgroundImage: PLUS_PATTERN, backgroundSize: '18px 18px' }} />
      {/* Radial gradient overlay */}
      <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse at 50% 0%, rgba(211,228,255,0.3) 0%, rgba(255,255,255,0.95) 70%, rgb(255,255,255) 100%)' }} />
      <Container className="relative pt-32 pb-16 text-center lg:pt-40">
        <div className="mx-auto max-w-3xl">
          <p className="inline-flex items-center gap-2 rounded-full bg-tint px-4 py-1.5 text-sm font-medium text-primary mb-6">
            <span>🏆</span> Built for independent agencies
          </p>
          <h1 className="font-display text-5xl font-medium tracking-tight text-slate-900 sm:text-6xl lg:text-7xl">
            The Media Planning Tool Your Agency{' '}
            <span className="relative text-primary">
              <svg
                aria-hidden="true"
                viewBox="0 0 418 42"
                className="absolute left-0 top-2/3 h-[0.58em] w-full fill-primary/30"
                preserveAspectRatio="none"
              >
                <path d="M203.371.916c-26.013-2.078-76.686 1.963-124.73 9.946L67.3 12.749C35.421 18.062 18.2 21.766 6.004 25.934 1.244 27.561.828 27.778.874 28.61c.07 1.214.828 1.121 9.595-1.176 9.072-2.377 17.15-3.92 39.246-7.496C123.565 7.986 157.869 4.492 195.942 5.046c7.461.108 19.25 1.696 19.17 2.582-.107 1.183-7.874 4.31-25.75 10.366-21.992 7.45-35.43 12.534-36.701 13.884-2.173 2.308-.202 4.407 4.442 4.734 2.654.187 3.263.157 15.593-.78 35.401-2.686 57.944-3.488 88.365-3.143 46.327.526 75.721 2.23 130.788 7.584 19.787 1.924 20.814 1.98 24.557 1.332l.066-.011c1.201-.203 1.53-1.825.399-2.335-2.911-1.31-4.893-1.604-22.048-3.261-57.509-5.556-87.871-7.36-132.059-7.842-23.239-.254-33.617-.116-50.627.674-11.629.54-42.371 2.494-46.696 2.967-2.359.259 8.133-3.625 26.504-9.81 23.239-7.825 27.934-10.149 28.304-14.005.417-4.348-3.529-6-16.878-7.066Z" />
              </svg>
              <span className="relative">Actually Needs</span>
            </span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg tracking-tight text-slate-700">
            Stop planning in Excel. Build flowcharts, track spend, and prove results — all in one
            platform.{' '}
            <span className="font-semibold text-slate-900">Free to start.</span>
          </p>
          <div className="mt-10 flex flex-col sm:flex-row justify-center gap-4">
            <Button href={SIGN_UP_URL} color="blue">
              Start Planning Free
            </Button>
            <Button href="/trytoday" variant="outline" color="slate">
              See It In Action →
            </Button>
          </div>

          <div className="mx-auto mt-14 max-w-2xl rounded-2xl bg-white shadow-lg p-6 text-left border border-tint">
            <p className="text-slate-700 italic">
              "We replaced 14 spreadsheets and three Slack channels with Halliard. Our planners spend time
              planning, not formatting. Client presentations went from half a day to 45 minutes."
            </p>
            <div className="mt-4 flex items-center gap-3">
              <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-semibold text-sm flex-shrink-0">
                SM
              </div>
              <div>
                <p className="text-sm font-semibold text-slate-900">Media Director</p>
                <p className="text-xs text-slate-500">Independent Agency, 85 people</p>
              </div>
            </div>
          </div>

          {/* Product screenshot */}
          <div className="mx-auto mt-16 max-w-5xl">
            <div className="rounded-xl border border-tint shadow-2xl overflow-hidden">
              <img
                src="/images/product/flighting.png"
                alt="Halliard media planning platform — flight planner with channel logos, budget allocation, and Gantt timeline"
                className="w-full"
              />
            </div>
          </div>
        </div>
      </Container>
    </div>
  )
}

function PainSection() {
  const pains = [
    {
      icon: '📊',
      title: 'Spreadsheet Chaos',
      description:
        'Flowcharts in PowerPoint. Budgets in Excel. Contacts in email. Notes in Slack. No single source of truth — and it collapses every time a client changes something.',
    },
    {
      icon: '🔦',
      title: 'Blind Spending',
      description:
        "You're placing millions across TV, digital, OOH, and audio — but you can't tell the client if it's actually working. Platform numbers lie. Attribution is broken.",
    },
    {
      icon: '🤷',
      title: 'No Proof It Worked',
      description:
        "The campaign ended. The results are... complicated. You can't definitively show the client what drove their sales lift. And they're asking hard questions.",
    },
  ]

  return (
    <section id="problem" className="py-16 sm:py-24 bg-white">
      <Container className="">
        <div className="mx-auto max-w-2xl text-center mb-16">
          <h2 className="font-display text-3xl tracking-tight text-slate-900 sm:text-4xl">
            256 steps from brief to billing
          </h2>
          <p className="mt-4 text-lg text-slate-600">
            The average independent agency juggles 8+ tools to plan a single campaign. It's chaos that
            costs you time, money, and client trust.
          </p>
        </div>
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-3">
          {pains.map((pain) => (
            <div key={pain.title} className="rounded-2xl border border-red-100 bg-red-50/50 p-8">
              <div className="text-3xl mb-4">{pain.icon}</div>
              <h3 className="text-lg font-semibold text-slate-900 mb-2">{pain.title}</h3>
              <p className="text-slate-600">{pain.description}</p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  )
}

function SolutionSection() {
  const steps = [
    {
      number: '01',
      icon: '🗺️',
      title: 'Plan',
      image: '/images/product/flighting.png',
      description:
        'Build visual media flowcharts in minutes, not hours. Drag flights across channels, see budget roll-ups in real time, and share client-ready plans in one click.',
      features: [
        'Visual flowchart builder with Gantt timeline',
        'Multi-channel scheduling with real logos',
        'Reach, frequency & revenue estimation',
        'Client-ready exports',
      ],
    },
    {
      number: '02',
      icon: '📈',
      title: 'Compare',
      image: '/images/product/compare.png',
      description:
        'Run three budget scenarios side-by-side. See how shifting spend between channels affects reach, frequency, and revenue — instantly.',
      features: [
        'Side-by-side scenario comparison',
        'Auto-calculated reach & frequency diffs',
        'Channel-level spend breakdowns',
        'One-click base plan switching',
      ],
    },
    {
      number: '03',
      icon: '✅',
      title: 'Optimize',
      image: '/images/product/response-curves.png',
      description:
        'See the diminishing returns curve for every channel. Know exactly where your next dollar has the most impact — and where to stop spending.',
      features: [
        'Channel response curves (MMM-powered)',
        'AI spend reallocation recommendations',
        'Optimal vs. current spend markers',
        'Revenue impact forecasting',
      ],
    },
  ]

  return (
    <section id="solution" className="py-16 sm:py-24 bg-slate-50">
      <Container className="">
        <div className="mx-auto max-w-2xl text-center mb-16">
          <h2 className="font-display text-3xl tracking-tight text-slate-900 sm:text-4xl">
            Plan it. Compare it. Optimize it.
          </h2>
          <p className="mt-4 text-lg text-slate-600">
            Halliard connects your planning, scenario modeling, and measurement into a single workflow
            built for how agencies actually operate.
          </p>
        </div>
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          {steps.map((step) => (
            <div key={step.title} className="relative rounded-2xl bg-white p-8 shadow-lg border border-tint">
              <div className="flex items-center gap-4 mb-6">
                <span className="font-display text-4xl font-bold text-primary/20">{step.number}</span>
                <span className="text-3xl">{step.icon}</span>
              </div>
              <h3 className="text-xl font-semibold text-slate-900 mb-3">{step.title}</h3>
              {step.image && (
                <div className="mb-6 rounded-lg border border-tint overflow-hidden shadow-sm">
                  <img src={step.image} alt={step.title} className="w-full" />
                </div>
              )}
              <p className="text-slate-600 mb-6">{step.description}</p>
              <ul className="space-y-2">
                {step.features.map((f) => (
                  <li key={f} className="flex items-center gap-2 text-sm text-slate-700">
                    <svg
                      className="h-4 w-4 flex-shrink-0 text-primary"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                    {f}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </Container>
    </section>
  )
}

function FeaturesGrid() {
  const features = [
    {
      icon: '🗂️',
      title: 'Flowcharting, not Excel',
      description:
        'Build real media flowcharts with drag-and-drop simplicity. See your entire plan visually — by channel, week, market. Update once, update everywhere.',
    },
    {
      icon: '💸',
      title: 'Real-time spend tracking',
      description:
        'Connect vendor data and see exactly where every dollar is going. Catch pacing issues before they become client problems.',
    },
    {
      icon: '📐',
      title: 'Measurement that matters',
      description:
        "Run MMM, geo-lift tests, and brand studies from one place. Stop guessing — start knowing what's actually driving results.",
    },
    {
      icon: '🏆',
      title: 'Compete with holding companies',
      description:
        'Bring enterprise-grade planning and measurement to every pitch. Look as sophisticated as WPP — move faster and keep all the margin.',
    },
  ]

  return (
    <section id="features" className="py-16 sm:py-24 bg-white">
      <Container className="">
        <div className="mx-auto max-w-2xl text-center mb-16">
          <h2 className="font-display text-3xl tracking-tight text-slate-900 sm:text-4xl">
            Everything your team needs, nothing they don't
          </h2>
          <p className="mt-4 text-lg text-slate-600">
            Purpose-built for independent agencies managing real media budgets across real channels.
          </p>
        </div>
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2">
          {features.map((feature) => (
            <div key={feature.title} className="flex gap-6 rounded-2xl bg-slate-50 p-8">
              <div className="flex-shrink-0 text-4xl">{feature.icon}</div>
              <div>
                <h3 className="text-lg font-semibold text-slate-900 mb-2">{feature.title}</h3>
                <p className="text-slate-600">{feature.description}</p>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  )
}

function TestimonialsSection() {
  const testimonials = [
    {
      quote:
        "We replaced 14 spreadsheets and three Slack channels with Halliard. Our planners now spend time planning, not formatting. Client presentations that used to take half a day now take 45 minutes.",
      author: 'Sarah M.',
      role: 'Media Director, Independent Agency (85 people)',
    },
    {
      quote:
        "The flowchart tool alone was worth it. But the real value is being able to show clients measurement results that hold up. We've retained two major accounts this year by proving our work with Halliard data.",
      author: 'David K.',
      role: 'VP Strategy, Integrated Agency (120 people)',
    },
    {
      quote:
        "We were losing pitches to holding companies because we couldn't demonstrate sophisticated measurement. Halliard leveled the playing field. We won three new accounts in Q1.",
      author: 'Jennifer L.',
      role: 'Founder & CEO, Media Agency (45 people)',
    },
  ]

  return (
    <section id="testimonials" className="py-16 sm:py-24 bg-slate-50">
      <Container className="">
        <div className="mx-auto max-w-2xl text-center mb-16">
          <h2 className="font-display text-3xl tracking-tight text-slate-900 sm:text-4xl">
            Agencies like yours are winning with Halliard
          </h2>
        </div>
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          {testimonials.map((t, idx) => (
            <div key={idx} className="flex flex-col rounded-2xl bg-white p-8 shadow-lg border border-tint">
              <blockquote className="flex-1 text-slate-600 italic">"{t.quote}"</blockquote>
              <div className="mt-6 border-t border-gray-100 pt-6">
                <p className="text-sm font-semibold text-slate-900">{t.author}</p>
                <p className="text-sm text-slate-500">{t.role}</p>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  )
}

function WhoItsFor() {
  return (
    <section className="py-16 sm:py-24 bg-white">
      <Container className="">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-16 items-center">
          <div>
            <h2 className="font-display text-3xl tracking-tight text-slate-900 sm:text-4xl">
              Built for independent agencies managing real media budgets
            </h2>
            <p className="mt-4 text-lg text-slate-600">
              Halliard is designed for agencies between 30 and 300 people — large enough to have complex
              media operations, lean enough to need everything to work.
            </p>
            <div className="mt-8 space-y-5">
              {[
                {
                  label: 'Independent agencies, 30–300 people',
                  sub: 'Not built for freelancers or holding company mega-agencies',
                },
                {
                  label: 'Cross-channel media — TV, digital, OOH, audio, social',
                  sub: 'You manage a real media mix, not just one channel',
                },
                {
                  label: 'Client budgets that deserve real measurement',
                  sub: "Your clients spend millions. They're starting to ask hard questions.",
                },
              ].map((item) => (
                <div key={item.label} className="flex items-start gap-3">
                  <span className="text-2xl flex-shrink-0">✅</span>
                  <div>
                    <p className="font-semibold text-slate-900">{item.label}</p>
                    <p className="text-sm text-slate-600">{item.sub}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="rounded-2xl bg-slate-50 p-8 border border-slate-200">
            <p className="text-sm font-semibold text-slate-500 uppercase tracking-wide mb-5">
              Halliard is NOT for
            </p>
            <div className="space-y-4">
              {[
                'Creative-only agencies with no media buying',
                'Pure performance / programmatic shops focused on a single channel',
                'Freelancers or solo media planners',
                'Holding company agencies with existing enterprise tooling',
              ].map((item) => (
                <div key={item} className="flex items-start gap-3 text-slate-500">
                  <span className="text-base flex-shrink-0 mt-0.5">✗</span>
                  <p className="text-sm">{item}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </section>
  )
}

function CTAFooter() {
  return (
    <section className="relative overflow-hidden bg-primary py-20">
      <div className="absolute inset-0 bg-gradient-to-br from-primary to-secondary" />
      {/* Plus dot pattern */}
      <div className="absolute inset-0 opacity-[0.15]" style={{ backgroundImage: PLUS_PATTERN, backgroundSize: '18px 18px' }} />
      {/* Radial glow */}
      <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse at 50% 50%, rgba(255,255,255,0.08) 0%, transparent 70%)' }} />
      <Container className="relative">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="font-display text-3xl tracking-tight text-white sm:text-4xl">
            Your clients spend millions on media.
          </h2>
          <p className="mt-2 font-display text-3xl tracking-tight text-white/80 sm:text-4xl">
            Help them see what it is doing.
          </p>
          <p className="mt-6 text-base text-white/70 font-medium tracking-wide uppercase">
            Now onboarding a limited number of agencies.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
            <Button href={SIGN_UP_URL} variant="solid" color="white">
              Start Planning Free
            </Button>
            <Button href="/trytoday" variant="outline" color="white">
              See It In Action →
            </Button>
          </div>
        </div>
      </Container>
    </section>
  )
}

export default function MediaPlanningToolPage() {
  return (
    <>
      <Head>
        <title>Media Planning Tool & Software for Independent Agencies | Halliard</title>
        <meta
          name="description"
          content="The media planning tool built for independent agencies. Build flowcharts, track spend in real time, and prove results with MMM and incrementality testing. Free to start."
        />
        <meta
          property="og:title"
          content="Media Planning Tool & Software for Independent Agencies | Halliard"
        />
        <meta
          property="og:description"
          content="Stop planning in Excel. Build flowcharts, track spend, and prove results — all in one platform. Free to start."
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://halliardmedia.com/media-planning-tool" />
        <meta
          property="og:image"
          content="https://framerusercontent.com/images/s97qQgHpRGf1STgb6vDMgqYNU4.png"
        />
        <link rel="canonical" href="https://halliardmedia.com/media-planning-tool" />
      </Head>
      <Header />
      <main>
        <Hero />
        <PainSection />
        <SolutionSection />
        <FeaturesGrid />
        <TestimonialsSection />
        <WhoItsFor />
        <CTAFooter />
      </main>
    </>
  )
}

MediaPlanningToolPage.disableNavbar = true
MediaPlanningToolPage.fullWidth = true
MediaPlanningToolPage.siteBg = true
