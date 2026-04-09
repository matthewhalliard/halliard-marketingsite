import Head from 'next/head'
import Link from 'next/link'
import { Button } from '../components/mmm/Button'
import { Container } from '../components/mmm/Container'
import {
  CalendarDaysIcon,
  ScaleIcon,
  BoltIcon,
  ChartBarSquareIcon,
  CurrencyDollarIcon,
  ClockIcon,
  TableCellsIcon,
  MagnifyingGlassIcon,
  UserGroupIcon,
} from '@heroicons/react/24/outline'

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

          <p className="mt-6 text-sm text-slate-500">
            Used by media teams managing $50M+ in annual spend
          </p>

          {/* Product screenshot */}
          <div className="mx-auto mt-16 max-w-5xl">
            <div className="rounded-xl border border-tint shadow-2xl overflow-hidden">
              <img
                src="/images/product/flighting.webp"
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
      Icon: TableCellsIcon,
      title: 'Spreadsheet Chaos',
      description:
        'Flowcharts in PowerPoint. Budgets in Excel. Contacts in email. Notes in Slack. No single source of truth — and it collapses every time a client changes something.',
    },
    {
      Icon: MagnifyingGlassIcon,
      title: 'Blind Spending',
      description:
        "You're placing millions across TV, digital, OOH, and audio — but you can't tell the client if it's actually working. Platform numbers lie. Attribution is broken.",
    },
    {
      Icon: UserGroupIcon,
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
              <pain.Icon className="w-8 h-8 text-red-400 mb-4" />
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
      Icon: CalendarDaysIcon,
      title: 'Plan',
      image: '/images/product/flighting.webp',
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
      Icon: ScaleIcon,
      title: 'Compare',
      image: '/images/product/compare.webp',
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
      Icon: BoltIcon,
      title: 'Optimize',
      image: '/images/product/response-curves.webp',
      description:
        'See the diminishing returns curve for every channel. Know exactly where your next dollar has the most impact — and where to stop spending.',
      features: [
        'Channel response curves (MMM-powered)',
        'AI spend reallocation recommendations',
        'Optimal vs. current spend markers',
        'Revenue impact forecasting',
      ],
    },
    {
      number: '04',
      Icon: ChartBarSquareIcon,
      title: 'Measure',
      image: '/images/product/measurement.webp',
      description:
        'Connect your data sources — Snowflake, BigQuery, Domo — and see what\'s actually working. Platform metrics vs. MMM-attributed revenue, side by side.',
      features: [
        'Snowflake, BigQuery & Domo integrations',
        'Funnel-stage performance (Awareness → Conversion)',
        'MMM revenue attribution per channel',
        'Blended CPM & ROAS tracking',
      ],
    },
    {
      number: '05',
      Icon: CurrencyDollarIcon,
      title: 'Buy',
      image: '/images/product/buying.webp',
      description:
        'Track every media buy from submission to delivery. See pacing in real time, catch overspend before it happens, and keep fees transparent.',
      features: [
        'Vendor-level buy tracking & status',
        'Real-time pacing with color-coded alerts',
        'Fee transparency (agency, DSP, data, verification)',
        'Weekly spend allocation & reconciliation',
      ],
    },
    {
      number: '06',
      Icon: ClockIcon,
      title: 'Collaborate',
      image: '/images/product/changelog.webp',
      description:
        'Every edit is tracked. Every approval is logged. Know exactly who changed what, when — and roll back if something goes wrong.',
      features: [
        'Full version history with diff viewer',
        'User-level audit trail',
        'Approval workflows & status tracking',
        'Change summaries in plain English',
      ],
    },
  ]

  return (
    <section id="solution" className="py-16 sm:py-24 bg-slate-50">
      <Container className="">
        <div className="mx-auto max-w-2xl text-center mb-16">
          <h2 className="font-display text-3xl tracking-tight text-slate-900 sm:text-4xl">
            Six tools. One platform. Zero spreadsheets.
          </h2>
          <p className="mt-4 text-lg text-slate-600">
            From flowcharts to buying to measurement — everything your agency needs to plan, execute,
            and prove media campaigns. Built for how you actually work.
          </p>
        </div>
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
          {steps.map((step) => (
            <div key={step.title} className="relative rounded-2xl bg-white p-8 shadow-lg border border-tint">
              <div className="flex items-center gap-4 mb-6">
                <span className="font-display text-4xl font-bold text-primary/20">{step.number}</span>
                <step.Icon className="w-7 h-7 text-primary" />
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

function MidPageCTA() {
  return (
    <section className="py-12 sm:py-16 bg-white">
      <Container className="">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="font-display text-2xl tracking-tight text-slate-900 sm:text-3xl">
            Ready to stop planning in spreadsheets?
          </h2>
          <p className="mt-3 text-lg text-slate-600">
            Free to start. No credit card required.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row justify-center gap-4">
            <Button href={SIGN_UP_URL} color="blue">
              Start Planning Free
            </Button>
            <Button href="/trytoday" variant="outline" color="slate">
              See It In Action →
            </Button>
          </div>
        </div>
      </Container>
    </section>
  )
}

function TestimonialSection() {
  return (
    <section className="py-16 sm:py-24 bg-slate-50">
      <Container className="">
        <div className="mx-auto max-w-3xl">
          <div className="rounded-2xl bg-white p-8 sm:p-12 shadow-lg border border-tint">
            <div className="flex items-center gap-4 mb-8">
              <img
                src="/images/testimonials/lewis-media-logo.png"
                alt="Lewis Media Partners"
                className="h-8 w-auto"
              />
            </div>
            <blockquote className="text-xl sm:text-2xl font-medium text-slate-800 leading-relaxed">
              &ldquo;Halliard gave our planners a better way to build media plans and our clients a clearer
              picture of what their spend is doing. That&rsquo;s been really valuable for us.&rdquo;
            </blockquote>
            <div className="mt-8 flex items-center gap-4">
              <img
                src="/images/testimonials/lisa-matulis.jpg"
                alt="Lisa Matulis"
                className="w-12 h-12 rounded-full object-cover"
              />
              <div>
                <p className="text-sm font-semibold text-slate-900">Lisa Matulis</p>
                <p className="text-sm text-slate-500">Group Client Lead, Lewis Media Partners</p>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  )
}

function ComparisonTable() {
  const features = [
    { name: 'Visual flowcharting', halliard: true, excel: false, bionic: true, camphouse: true },
    { name: 'Scenario comparison', halliard: true, excel: false, bionic: false, camphouse: 'Partial' },
    { name: 'Response curves (MMM)', halliard: true, excel: false, bionic: false, camphouse: false },
    { name: 'Measurement dashboard', halliard: true, excel: false, bionic: false, camphouse: 'Partial' },
    { name: 'Real-time pacing', halliard: true, excel: false, bionic: true, camphouse: true },
    { name: 'Version history & audit', halliard: true, excel: false, bionic: 'Partial', camphouse: true },
    { name: 'Free plan available', halliard: true, excel: true, bionic: false, camphouse: false },
    { name: 'Built for independents', halliard: true, excel: 'N/A', bionic: true, camphouse: false },
  ]

  const prices = { halliard: 'Free to start', excel: 'Free', bionic: 'From $199/user', camphouse: 'Custom pricing' }

  function Cell({ value, highlighted }) {
    if (value === true) return <span className="text-green-600 font-bold text-lg">✓</span>
    if (value === false) return <span className="text-red-400 font-bold text-lg">✗</span>
    return <span className={`text-xs font-medium ${highlighted ? 'text-primary' : 'text-slate-500'}`}>{value}</span>
  }

  return (
    <section className="py-16 sm:py-24 bg-slate-50">
      <Container>
        <div className="mx-auto max-w-2xl text-center mb-12">
          <h2 className="font-display text-3xl tracking-tight text-slate-900 sm:text-4xl">
            Halliard vs. the alternatives
          </h2>
          <p className="mt-4 text-lg text-slate-600">
            One platform that replaces the patchwork. See how Halliard stacks up.
          </p>
        </div>
        <div className="mx-auto max-w-4xl overflow-x-auto">
          <table className="w-full border-collapse text-sm">
            <thead>
              <tr>
                <th className="sticky left-0 z-10 bg-slate-50 text-left py-4 pr-4 pl-2 font-semibold text-slate-700 min-w-[180px]">Feature</th>
                <th className="py-4 px-4 text-center font-semibold text-primary bg-primary/5 border-x border-primary/10 min-w-[120px]">Halliard</th>
                <th className="py-4 px-4 text-center font-semibold text-slate-600 min-w-[120px]">Excel / Sheets</th>
                <th className="py-4 px-4 text-center font-semibold text-slate-600 min-w-[120px]">Bionic</th>
                <th className="py-4 px-4 text-center font-semibold text-slate-600 min-w-[120px]">Camphouse</th>
              </tr>
            </thead>
            <tbody>
              {features.map((f, i) => (
                <tr key={f.name} className={i % 2 === 0 ? 'bg-white' : 'bg-slate-50/50'}>
                  <td className="sticky left-0 z-10 py-3.5 pr-4 pl-2 font-medium text-slate-800" style={{ backgroundColor: i % 2 === 0 ? '#fff' : 'rgb(248 250 252 / 0.5)' }}>{f.name}</td>
                  <td className="py-3.5 px-4 text-center bg-primary/5 border-x border-primary/10"><Cell value={f.halliard} highlighted /></td>
                  <td className="py-3.5 px-4 text-center"><Cell value={f.excel} /></td>
                  <td className="py-3.5 px-4 text-center"><Cell value={f.bionic} /></td>
                  <td className="py-3.5 px-4 text-center"><Cell value={f.camphouse} /></td>
                </tr>
              ))}
              <tr className="border-t-2 border-slate-200">
                <td className="sticky left-0 z-10 bg-white py-4 pr-4 pl-2 font-semibold text-slate-900">Price</td>
                <td className="py-4 px-4 text-center bg-primary/5 border-x border-primary/10 font-semibold text-primary text-xs">Free to start</td>
                <td className="py-4 px-4 text-center text-xs text-slate-500 font-medium">Free</td>
                <td className="py-4 px-4 text-center text-xs text-slate-500 font-medium">{prices.bionic}</td>
                <td className="py-4 px-4 text-center text-xs text-slate-500 font-medium">{prices.camphouse}</td>
              </tr>
            </tbody>
          </table>
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
          content="/images/product/flighting.webp"
        />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Media Planning Tool & Software for Independent Agencies | Halliard" />
        <meta name="twitter:description" content="Stop planning in Excel. Build flowcharts, track spend, and prove results — all in one platform. Free to start." />
        <meta name="twitter:image" content="/images/product/flighting.webp" />
        <link rel="canonical" href="https://halliardmedia.com/media-planning-tool" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "SoftwareApplication",
              "name": "Halliard",
              "applicationCategory": "BusinessApplication",
              "operatingSystem": "Web",
              "offers": {
                "@type": "Offer",
                "price": "0",
                "priceCurrency": "USD"
              },
              "description": "Media planning tool for independent agencies. Build flowcharts, compare scenarios, measure results.",
              "url": "https://app.halliardmedia.com/sign-up"
            })
          }}
        />
      </Head>
      <Header />
      <main>
        <Hero />
        <PainSection />
        <TestimonialSection />
        <SolutionSection />
        <MidPageCTA />
        <ComparisonTable />
        <WhoItsFor />
        <CTAFooter />
      </main>
    </>
  )
}

MediaPlanningToolPage.disableNavbar = true
MediaPlanningToolPage.fullWidth = true
MediaPlanningToolPage.siteBg = true
