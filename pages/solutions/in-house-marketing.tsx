import Head from 'next/head'
import Link from 'next/link'
import { Button } from '../../components/mmm/Button'
import { Container } from '../../components/mmm/Container'
import {
  ChartBarSquareIcon,
  CurrencyDollarIcon,
  PresentationChartLineIcon,
  EyeIcon,
  ArrowsRightLeftIcon,
  ShieldCheckIcon,
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
            <span>📊</span> For in-house marketing teams
          </p>
          <h1 className="font-display text-5xl font-medium tracking-tight text-slate-900 sm:text-6xl lg:text-7xl">
            Own your media plan.{' '}
            <span className="relative text-primary">
              <span className="relative">Prove the ROI.</span>
            </span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg tracking-tight text-slate-700">
            You plan and measure your own media across TV, digital, OOH, audio, and social. Stop duct-taping spreadsheets
            together before every budget meeting — and start walking into the CFO's office with numbers that hold up.
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
      Icon: CurrencyDollarIcon,
      title: 'The CFO wants proof',
      description:
        "Platform metrics say your campaign worked. Sales data says maybe. You need to show business impact — not impressions — and you need to show it in the language finance speaks.",
    },
    {
      Icon: EyeIcon,
      title: 'Your agency controls the narrative',
      description:
        "You're paying millions to run media, and your agency owns the plan, the buying, and the reporting. You want your own view — your own source of truth — without firing your agency.",
    },
    {
      Icon: ArrowsRightLeftIcon,
      title: 'Cross-channel is a mess',
      description:
        "TV plans live in one place. Digital in another. OOH in a third. Nobody can tell you the real blended CPM, blended reach, or where to shift spend for the best return.",
    },
  ]

  return (
    <section className="py-20 bg-white">
      <Container className="">
        <div className="mx-auto max-w-3xl text-center mb-16">
          <h2 className="font-display text-4xl font-medium text-slate-900 sm:text-5xl">
            In-house marketing has a different problem.
          </h2>
          <p className="mt-4 text-lg text-slate-700">
            You're not selling plans to clients. You're defending the plan to your own executives.
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
      Icon: ChartBarSquareIcon,
      title: 'One plan, every channel',
      description:
        'TV, CTV, digital, OOH, audio, social — all in one visual flowchart. See blended reach, frequency, and budget in real time.',
    },
    {
      Icon: PresentationChartLineIcon,
      title: 'MMM without the six-figure contract',
      description:
        'Marketing mix modeling built into the platform. See which channels actually drive revenue — no $500K consulting engagement needed.',
    },
    {
      Icon: ShieldCheckIcon,
      title: 'Your source of truth, not your agency\'s',
      description:
        'Pull in your own sales, CRM, and platform data. Compare what the agency says to what the numbers say. Version-controlled, audit-ready.',
    },
  ]

  return (
    <section className="py-20 bg-gradient-to-b from-white to-slate-50">
      <Container className="">
        <div className="mx-auto max-w-3xl text-center mb-16">
          <h2 className="font-display text-4xl font-medium text-slate-900 sm:text-5xl">
            Built to hold up in the boardroom.
          </h2>
          <p className="mt-4 text-lg text-slate-700">
            Halliard gives in-house marketing teams the same tools enterprise agencies use — without the enterprise price tag.
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

function FinalCTA() {
  return (
    <section className="py-20 bg-white">
      <Container className="">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="font-display text-4xl font-medium text-slate-900 sm:text-5xl">
            Your next budget meeting shouldn't be a guessing game.
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

export default function InHouseMarketing() {
  return (
    <>
      <Head>
        <title>Media Planning Software for In-House Marketing Teams | Halliard</title>
        <meta
          name="description"
          content="Halliard is the media planning platform for in-house marketing teams at mid-market brands. Own your plan, measure what works, and prove ROI to the CFO."
        />
      </Head>
      <main>
        <Hero />
        <PainSection />
        <SolutionSection />
        <FinalCTA />
      </main>
    </>
  )
}
