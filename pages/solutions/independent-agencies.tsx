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

const PLUS_PATTERN = "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%231a6ab4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")"

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
            Build better plans.{' '}
            <span className="relative text-primary">
              <span className="relative">Win more clients.</span>
            </span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg tracking-tight text-slate-700">
            The media planning platform for independent agencies. One tool to plan, buy, measure, and prove — so your
            team spends less time in spreadsheets and more time on the work that wins accounts.
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
      title: 'One place for the whole plan.',
      description:
        'Replace the PowerPoint flowcharts, the Excel budgets, the Slack notes, and the separate buy tracker. Every plan, every channel, every client — in one tool your team actually uses.',
    },
    {
      Icon: ScaleIcon,
      title: 'Power without the enterprise overhead.',
      description:
        'Everything Bionic, MediaOcean, and Camphouse give holding companies — without the procurement process, the six-figure contract, or the admin team you don\'t have.',
    },
    {
      Icon: UsersIcon,
      title: 'Your planners, thinking strategy again.',
      description:
        'Junior planners stop rebuilding flowcharts in PowerPoint. Senior planners get out of reconciliation hell. Everyone on your team spends more time on the work that grows the account.',
    },
  ]

  return (
    <section className="py-20 bg-white">
      <Container className="">
        <div className="mx-auto max-w-3xl text-center mb-16">
          <h2 className="font-display text-4xl font-medium text-slate-900 sm:text-5xl">
            Run a leaner shop without running it ragged.
          </h2>
          <p className="mt-4 text-lg text-slate-700">
            Halliard gives independent agencies the planning stack they\'ve been building themselves — only this time
            it works, it scales, and it doesn\'t require a full-time admin.
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
      title: 'Plans your clients can actually read.',
      description:
        'Drag flights across channels. See budget, reach, and frequency update in real time. Export a client-ready deck that tells the story without a twenty-slide walkthrough.',
    },
    {
      Icon: ChartBarSquareIcon,
      title: 'Prove the work when the CMO asks.',
      description:
        'Platform metrics and MMM-attributed revenue, side by side. Answer “did it work” with numbers instead of a hedge — and keep the account when the review comes.',
    },
    {
      Icon: CheckCircleIcon,
      title: 'Take on more without hiring more.',
      description:
        'Version history, approvals, and audit trail so senior planners can oversee more accounts. New hires get productive in a week, not a quarter.',
    },
  ]

  return (
    <section className="py-20 bg-gradient-to-b from-white to-slate-50">
      <Container className="">
        <div className="mx-auto max-w-3xl text-center mb-16">
          <h2 className="font-display text-4xl font-medium text-slate-900 sm:text-5xl">
            Plan. Buy. Measure. Prove.
          </h2>
          <p className="mt-4 text-lg text-slate-700">
            Every step of a campaign, in one platform — so your team stops stitching tools together and starts
            delivering work clients notice.
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
            Spend less time in spreadsheets. Win more pitches.
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
