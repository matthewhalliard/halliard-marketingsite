import Head from 'next/head'
import Link from 'next/link'
import React from 'react'
import { ArrowRight, BadgeDollarSign, CalendarCheck, ClipboardCheck, Link2, ScrollText, Search, ShieldCheck, UserCheck } from 'lucide-react'
import { Container } from '../components/mmm/Container'
import { Button } from '../components/mmm/Button'
import {
  Accent,
  ClosingCta,
  HeroBackdrop,
  HeroVisual,
  LandingHeader,
  SOFT_BAND,
  SectionHeading,
  StepRows,
  useLandingAttribution,
  type Step,
} from '../components/landing/kit'
import { AuditScene, ConnectScene, ConnectorsStrip, PlanScene, PlatformLogo, ReceiptsScene } from '../components/brand/scenes'

/**
 * The homepage: Halliard for brands, where Halliard is the agency. It sells
 * one outcome, the ads taken off the brand's plate with every dollar
 * accounted for, and starts with the free Google Ads audit. The planning tool
 * that was the homepage is at /planning; agencies have /agencies.
 */

const STEPS: Step[] = [
  {
    icon: Link2,
    label: 'Connect',
    title: 'Connect your ad accounts. We only read.',
    body: 'Sign in to Google Ads and Meta, and to Snapchat, Reddit or Spotify Ads if you advertise there too. Nothing changes until you approve a plan. No accounts yet? Skip it: we can run your ads in ours.',
    points: [
      { icon: ShieldCheck, text: 'Read-only until you approve' },
      { icon: CalendarCheck, text: 'Takes about a minute' },
    ],
    frame: 'Connect',
    Scene: ConnectScene,
  },
  {
    icon: Search,
    label: 'See what’s wasted',
    title: 'Your last 90 days, audited in minutes.',
    body: 'The searches that spent and never converted, by name. Campaigns that spent without a single result. What each result really cost. If tracking is broken, we say so first instead of calling everything waste.',
    points: [
      { icon: Search, text: 'Wasted searches listed by name' },
      { icon: ClipboardCheck, text: 'Free, whether or not you sign up for more' },
    ],
    frame: 'Audit · example',
    Scene: AuditScene,
  },
  {
    icon: CalendarCheck,
    label: 'Approve a plan',
    title: 'Tell us the goal. Approve the plan.',
    body: 'Give us your goal and monthly budget. We draft a plan for Google Search and Meta that starts by blocking what never converts, and you approve it, and the month’s fee, in one step.',
    points: [
      { icon: BadgeDollarSign, text: 'Ad budget goes to Google and Meta at cost' },
      { icon: CalendarCheck, text: 'A new plan each month, ready before the last ends' },
    ],
    frame: 'Plan · example',
    Scene: PlanScene,
  },
  {
    icon: ScrollText,
    label: 'We run it',
    title: 'We run it, and show our work.',
    body: 'We launch the plan and keep it on pace. Anything that matters waits for your approval; small budget moves are logged. Every change has a receipt: what changed, why, and what Google or Meta said back.',
    points: [
      { icon: UserCheck, text: 'Our team checks every plan before it launches' },
      { icon: ScrollText, text: 'A receipt for every change' },
    ],
    frame: 'Changes · example',
    Scene: ReceiptsScene,
  },
]

const WHY: { title: string; body: string }[] = [
  {
    title: 'Every ad dollar, accounted for.',
    body: 'Every request we send to Google and Meta, and what they said back, is kept. Ask why anything changed and see the record.',
  },
  {
    title: 'One flat price.',
    body: 'From $149 a month, set by your ad budget. Never a cut of your spend, no credits to count. Monthly, cancel any time.',
  },
  {
    title: 'People behind the agent.',
    body: 'Our agents draft the plan and watch it every six hours; our team checks each plan before it goes live, at no extra cost.',
  },
]

const FAQ: { q: string; a: string }[] = [
  { q: 'Do you change anything without asking?', a: 'Nothing launches without your approval. Small budget moves within the limits you set run on their own, and each one is logged with a receipt.' },
  { q: 'Do I need my own ad accounts?', a: 'No. Connect yours if you have them, and we audit them first. If not, we can run your ads in ours.' },
  { q: 'What does it cost?', a: 'A flat monthly fee by ad budget: $149 under $2,000 a month, $399 up to $10,000, $999 up to $30,000. Above that, we agree a fee. Your ad budget is billed by Google and Meta at cost.' },
  { q: 'Which channels?', a: 'Google Search and Meta (Facebook and Instagram). The free audit reads Google Ads today; a Meta audit is coming.' },
  { q: 'Can I leave?', a: 'Yes. Plans are monthly, and the accounts stay yours.' },
]

export default function BrandHome() {
  const { track, href } = useLandingAttribution('/', { event: 'home' })
  return (
    <>
      <Head>
        <title>Your Advertising, Handled: Google and Meta Ads Run for You | Halliard</title>
        <meta
          name="description"
          content="Halliard plans, buys and measures your Google and Meta ads for a flat monthly fee. You approve the plan, every change has a receipt. Start with a free Google Ads audit."
        />
        <link rel="canonical" href="https://www.halliardmedia.com/" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://www.halliardmedia.com/" />
        <meta property="og:title" content="Your advertising, handled | Halliard" />
        <meta property="og:description" content="Google and Meta ads planned, bought and measured for you, at a flat monthly fee. Start with a free audit." />
      </Head>
      <LandingHeader href={href} cta="Get your free audit" onClick={() => track('header')} />
      <main>
        <section className="relative">
          <HeroBackdrop />
          <Container className="relative max-w-6xl pt-36 pb-20 lg:pt-44 lg:pb-28">
            <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)]">
              <div className="text-center lg:text-left">
                <h1 className="font-display text-5xl font-medium tracking-tight text-slate-900 sm:text-6xl">
                  Your advertising, <Accent>handled.</Accent>
                </h1>
                <p className="mt-4 font-display text-2xl tracking-tight text-slate-700">Every ad dollar, accounted for.</p>
                <p className="mx-auto mt-6 max-w-xl text-lg tracking-tight text-slate-700 lg:mx-0">
                  We plan, buy and measure your Google and Meta ads for a flat monthly price. You approve the plan and see what each
                  dollar did. Start with a free audit.
                </p>
                <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row sm:gap-6 lg:justify-start">
                  <Button href={href} color="blue" className="px-6 py-3 text-base" onClick={() => track('hero')}>
                    Get your free Google Ads audit
                    <ArrowRight className="ml-2 h-4 w-4" aria-hidden />
                  </Button>
                  <Link href="/agencies" className="text-base font-semibold text-primary hover:underline">
                    For agencies &rarr;
                  </Link>
                </div>
                <p className="mt-4 text-sm text-slate-600">Read-only. No card. Results in a couple of minutes.</p>
                <ul className="mt-6 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-sm text-slate-600 lg:justify-start">
                  <li className="text-slate-500">We run your ads on</li>
                  {(
                    [
                      ['google', 'Google Search'],
                      ['facebook', 'Facebook'],
                      ['instagram', 'Instagram'],
                    ] as const
                  ).map(([logo, name]) => (
                    <li key={name} className="inline-flex items-center gap-2 font-medium text-slate-800">
                      <PlatformLogo name={logo} size={20} />
                      {name}
                    </li>
                  ))}
                </ul>
              </div>
              <HeroVisual label="Audit · example">
                <AuditScene />
              </HeroVisual>
            </div>
          </Container>
        </section>

        <section className="py-20 sm:py-28" style={SOFT_BAND}>
          <Container className="max-w-6xl">
            <SectionHeading eyebrow="How it works" title="From a free audit to ads that run, with you in charge." />
            <p className="mt-8 text-center text-sm text-slate-500">Connect by signing in</p>
            <ConnectorsStrip className="mt-3" />
            <StepRows steps={STEPS} />
          </Container>
        </section>

        <section className="py-16 sm:py-24">
          <Container className="max-w-5xl">
            <SectionHeading eyebrow="Why brands switch" title="An agency that shows its work." />
            <ul className="mt-10 grid grid-cols-1 gap-5 md:grid-cols-3">
              {WHY.map(w => (
                <li key={w.title} className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-900/5">
                  <h3 className="font-display text-lg tracking-tight text-slate-900">{w.title}</h3>
                  <p className="mt-2 text-slate-600">{w.body}</p>
                </li>
              ))}
            </ul>
          </Container>
        </section>

        <section className="py-16 sm:py-20" style={SOFT_BAND}>
          <Container className="max-w-3xl">
            <SectionHeading eyebrow="Questions" title="Before you connect anything" />
            <div className="mt-10 flex flex-col gap-3">
              {FAQ.map(f => (
                <details key={f.q} className="group rounded-2xl bg-white px-6 py-5 shadow-sm ring-1 ring-slate-900/5">
                  <summary className="cursor-pointer list-none font-semibold text-slate-900">{f.q}</summary>
                  <p className="mt-3 text-slate-600">{f.a}</p>
                </details>
              ))}
            </div>
            <p className="mt-8 text-center text-sm text-slate-600">
              Agency or in-house team planning your own media?{' '}
              <Link href="/planning" className="font-medium text-primary hover:underline">
                See the planning tool &rarr;
              </Link>
            </p>
          </Container>
        </section>

        <ClosingCta
          title="See what your ads wasted."
          subtitle="Then let us fix it."
          cta="Get your free audit"
          href={href}
          onClick={() => track('closing')}
          note="Read-only. No card."
        />
      </main>
    </>
  )
}

;(BrandHome as any).disableNavbar = true
;(BrandHome as any).fullWidth = true
;(BrandHome as any).siteBg = true
