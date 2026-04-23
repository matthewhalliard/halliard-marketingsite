import Head from 'next/head'
import Link from 'next/link'
import { Button } from '../../components/mmm/Button'
import { Container } from '../../components/mmm/Container'
import {
  PuzzlePieceIcon,
  ScaleIcon,
  UsersIcon,
  ChartBarSquareIcon,
  BoltIcon,
  CheckCircleIcon,
} from '@heroicons/react/24/outline'

const SIGN_UP_URL = 'https://app.halliardmedia.com/sign-up'
const SIGN_IN_URL = 'https://app.halliardmedia.com/sign-in'

const SOLUTIONS_LINKS = [
  { href: '/solutions/independent-agencies', label: 'For Independent Agencies' },
  { href: '/solutions/in-house-marketing', label: 'For In-House Marketing Teams' },
  { href: '/mmm', label: 'Marketing Mix Modeling' },
  { href: '/brand-studies', label: 'Brand Studies' },
]

const PLUS_PATTERN = "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%231a6ab4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")"

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
            <div className="relative group hidden sm:block">
              <button
                type="button"
                className="inline-flex items-center gap-1 text-sm text-slate-600 hover:text-slate-900"
                aria-haspopup="true"
              >
                Solutions
                <svg className="h-3 w-3" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth={1.5}>
                  <path d="M3 4.5l3 3 3-3" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
              <div className="absolute right-0 top-full pt-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-opacity">
                <div className="w-64 rounded-lg border border-gray-100 bg-white shadow-lg py-2">
                  {SOLUTIONS_LINKS.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      className="block px-4 py-2 text-sm text-slate-700 hover:bg-gray-50 hover:text-primary"
                    >
                      {item.label}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
            <a
              href={SIGN_IN_URL}
              className="hidden sm:inline text-sm text-slate-600 hover:text-slate-900"
            >
              Sign in
            </a>
            <Button href={SIGN_UP_URL} color="blue" className="">
              Start Planning Free
            </Button>
          </div>
        </nav>
      </Container>
    </header>
  )
}

function Hero() {
  return (
    <div className="relative overflow-hidden">
      <div className="absolute inset-0 opacity-[0.07]" style={{ backgroundImage: PLUS_PATTERN, backgroundSize: '18px 18px' }} />
      <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse at 50% 0%, rgba(211,228,255,0.3) 0%, rgba(255,255,255,0.95) 70%, rgb(255,255,255) 100%)' }} />
      <Container className="relative pt-32 pb-16 text-center lg:pt-40">
        <div className="mx-auto max-w-3xl">
          <p className="inline-flex items-center gap-2 rounded-full bg-tint px-4 py-1.5 text-sm font-medium text-primary mb-6">
            <span>🏢</span> For independent agencies, 30–300 people
          </p>
          <h1 className="font-display text-5xl font-medium tracking-tight text-slate-900 sm:text-6xl lg:text-7xl">
            The planning stack built for{' '}
            <span className="relative text-primary">
              <span className="relative">independents</span>
            </span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg tracking-tight text-slate-700">
            You don't have a 40-person ops team. You don't want enterprise contracts. You just need your planners to stop
            fighting spreadsheets and start building plans your clients actually understand.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row justify-center gap-4">
            <Button href={SIGN_UP_URL} color="blue" className="">
              Start Planning Free
            </Button>
            <Button href="/trytoday" variant="outline" color="slate" className="">
              See It In Action →
            </Button>
          </div>
        </div>
      </Container>
    </div>
  )
}

function PainSection() {
  const pains = [
    {
      Icon: PuzzlePieceIcon,
      title: 'You\'re stitching 8+ tools together',
      description:
        'Flowcharts in PowerPoint. Budgets in Excel. Notes in Slack. Buys in a different platform. No single source of truth — and every client change breaks everything.',
    },
    {
      Icon: ScaleIcon,
      title: 'Enterprise tools don\'t fit you',
      description:
        'Bionic, MediaOcean, Camphouse — built for holding companies with procurement teams and dedicated admins. You need power without the overhead.',
    },
    {
      Icon: UsersIcon,
      title: 'Junior planners burn out on mechanics',
      description:
        'Your best people should be thinking strategy, not rebuilding flowcharts in PowerPoint for the fourth time this week. Halliard handles the mechanics so they can focus on the work that wins.',
    },
  ]

  return (
    <section className="py-20 bg-white">
      <Container className="">
        <div className="mx-auto max-w-3xl text-center mb-16">
          <h2 className="font-display text-4xl font-medium text-slate-900 sm:text-5xl">
            Independent agencies have a specific problem.
          </h2>
          <p className="mt-4 text-lg text-slate-700">
            You're large enough to run complex media operations, lean enough that every inefficiency shows up on the P&L.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {pains.map(({ Icon, title, description }) => (
            <div key={title} className="rounded-2xl border border-gray-100 p-8">
              <Icon className="h-10 w-10 text-primary mb-4" />
              <h3 className="text-xl font-semibold text-slate-900 mb-3">{title}</h3>
              <p className="text-slate-700">{description}</p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  )
}

function SolutionSection() {
  const wins = [
    {
      Icon: BoltIcon,
      title: 'Build plans in minutes, not days',
      description: 'Drag flights across channels. Budget roll-ups auto-calculate. Client-ready exports in one click.',
    },
    {
      Icon: ChartBarSquareIcon,
      title: 'Show clients what works',
      description: 'Platform metrics plus MMM-attributed revenue, side by side. No more "it\'s complicated" when the CMO asks.',
    },
    {
      Icon: CheckCircleIcon,
      title: 'Scale without adding headcount',
      description: 'Version history, approvals, audit trail. Run more accounts with the team you have.',
    },
  ]

  return (
    <section className="py-20 bg-gradient-to-b from-white to-slate-50">
      <Container className="">
        <div className="mx-auto max-w-3xl text-center mb-16">
          <h2 className="font-display text-4xl font-medium text-slate-900 sm:text-5xl">
            One platform. Six tools. Zero spreadsheets.
          </h2>
          <p className="mt-4 text-lg text-slate-700">
            Everything your agency needs to plan, execute, and prove media campaigns — built for how independents actually work.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {wins.map(({ Icon, title, description }) => (
            <div key={title} className="rounded-2xl bg-white border border-gray-100 p-8">
              <Icon className="h-10 w-10 text-primary mb-4" />
              <h3 className="text-xl font-semibold text-slate-900 mb-3">{title}</h3>
              <p className="text-slate-700">{description}</p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  )
}

function Testimonial() {
  return (
    <section className="py-20 bg-white">
      <Container className="">
        <div className="mx-auto max-w-3xl text-center">
          <blockquote className="text-2xl text-slate-800 font-display leading-relaxed">
            "Halliard gave our planners a better way to build media plans and our clients a clearer picture of what their
            spend is doing. That's been really valuable for us."
          </blockquote>
          <div className="mt-6 text-slate-600">
            <div className="font-semibold text-slate-900">Lisa Matulis</div>
            <div className="text-sm">Group Client Lead, Lewis Media Partners</div>
          </div>
        </div>
      </Container>
    </section>
  )
}

function FinalCTA() {
  return (
    <section className="py-20 bg-gradient-to-b from-slate-50 to-white">
      <Container className="">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="font-display text-4xl font-medium text-slate-900 sm:text-5xl">
            Stop planning in spreadsheets.
          </h2>
          <p className="mt-4 text-lg text-slate-700">
            Free to start. No credit card. No demo call required.
          </p>
          <div className="mt-8 flex justify-center gap-4">
            <Button href={SIGN_UP_URL} color="blue" className="">
              Start Planning Free
            </Button>
            <Button href="/trytoday" variant="outline" color="slate" className="">
              See It In Action →
            </Button>
          </div>
        </div>
      </Container>
    </section>
  )
}

export default function IndependentAgencies() {
  return (
    <>
      <Head>
        <title>Media Planning Software for Independent Agencies | Halliard</title>
        <meta
          name="description"
          content="Halliard is the media planning platform built for independent agencies (30–300 people). Build flowcharts, track spend, and prove results — without enterprise overhead."
        />
      </Head>
      <Header />
      <main>
        <Hero />
        <PainSection />
        <SolutionSection />
        <Testimonial />
        <FinalCTA />
      </main>
    </>
  )
}
