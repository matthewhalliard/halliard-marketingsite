import Head from 'next/head'
import Link from 'next/link'
import React, { useEffect, useRef, useState } from 'react'
import {
  ArrowRight,
  BarChart3,
  Building2,
  CalendarCheck,
  CreditCard,
  FileText,
  Layers,
  ListChecks,
  MapPin,
  Radio,
  ScrollText,
  Search,
  ShieldCheck,
  Target,
  Timer,
  Tv,
  Upload,
  Users,
  type LucideIcon,
} from 'lucide-react'
import { Container } from '../components/mmm/Container'
import { Button } from '../components/mmm/Button'
import { CampaignsExplainer } from '../components/plan/campaigns-explainer'
import { BriefExplainer } from '../components/plan/brief-explainer'
import { AudienceExplainer } from '../components/plan/audience-explainer'
import { StrategyExplainer } from '../components/plan/strategy-explainer'

// The client portal: sign up, tell us about you, send a first brief.
const SIGN_UP_URL = 'https://client.halliardmedia.com/sign-up'

// The hero matches the ad group that sent the visitor. Search ads for the
// reach and frequency ad group carry utm_content or utm_term naming it.
const HERO = {
  default: {
    eyebrow: 'Free media planning tool',
    title: 'A media plan for any client,',
    accent: 'from one brief.',
    body: 'Describe the campaign or drop in an RFP. Halliard drafts the audiences, the strategy and a media plan, and models the reach before any money is spent.',
  },
  reach: {
    eyebrow: 'Free reach & frequency planner',
    title: 'Reach and frequency modelled',
    accent: 'before you spend.',
    body: 'Send a brief and Halliard builds the plan, then models reach and frequency for every strategy in it, down to the channel and the property.',
  },
}
type HeroKey = keyof typeof HERO

function heroFor(params: Record<string, string>): HeroKey {
  const hint = `${params.utm_content || ''} ${params.utm_term || ''}`.toLowerCase()
  return /reach|frequency/.test(hint) ? 'reach' : 'default'
}

/** The sign-up URL carrying this visit's UTMs and click IDs, so the account can be attributed. */
function signUpUrl(params: Record<string, string>) {
  const qs = new URLSearchParams(params).toString()
  return qs ? `${SIGN_UP_URL}?${qs}` : SIGN_UP_URL
}

interface Step {
  icon: LucideIcon
  label: string
  title: string
  body: string
  points: { icon: LucideIcon; text: string }[]
  frame: string
  Explainer: () => React.JSX.Element
}

const STEPS: Step[] = [
  {
    icon: FileText,
    label: 'The brief',
    title: 'Send a brief the way you would to a planner',
    body: 'No forms to fill. Halliard reads what you wrote and anything you attached, then writes it back in plain words so you can check it is what you meant.',
    points: [
      { icon: Upload, text: 'Write it in your own words, or drop in the RFP' },
      { icon: ListChecks, text: 'The goal, budget, timing and audience, pulled out for you' },
      { icon: CalendarCheck, text: 'A check that the budget and the dates hang together' },
    ],
    frame: 'Brief',
    Explainer: BriefExplainer,
  },
  {
    icon: Users,
    label: 'Audiences',
    title: 'Audiences sized, and placed on the map',
    body: 'Each audience is matched to what a survey panel actually asked, counted one filter at a time, and pinned to where they live.',
    points: [
      { icon: MapPin, text: 'Down to the DMA and the ZIP, named by neighbourhood' },
      { icon: BarChart3, text: 'Sized from real panel answers, not guesses' },
      { icon: Tv, text: 'The media each audience consumes, ranked' },
    ],
    frame: 'Audiences',
    Explainer: AudienceExplainer,
  },
  {
    icon: Target,
    label: 'Strategy and plan',
    title: 'A role for every dollar, and the reach it buys',
    body: 'Halliard researches the category before it plans, writes each strategy as a role for media, then fits channels to it and models what they reach.',
    points: [
      { icon: Search, text: 'The category, the competition and live search demand' },
      { icon: Layers, text: 'Each strategy with its own audience, budget and flight' },
      { icon: BarChart3, text: 'Reach and frequency modelled before anything is bought' },
    ],
    frame: 'Strategy',
    Explainer: StrategyExplainer,
  },
]

const FEATURES: { icon: LucideIcon; title: string; body: string }[] = [
  { icon: ShieldCheck, title: 'Nothing buys without you', body: 'Every line of a plan is approved by a person before a dollar is spent.' },
  { icon: Timer, title: 'Pacing, checked every six hours', body: 'Once a plan is live, Halliard watches delivery and flags what drifts.' },
  { icon: ScrollText, title: 'Every action on the record', body: 'What was bought, why, and what the platform said back. Show your client.' },
  { icon: MapPin, title: 'Built for local', body: 'Catchments inside the DMA, ZIPs ranked on the brief, search sized by market.' },
  { icon: Building2, title: 'One login, many clients', body: 'Agencies plan and buy for several advertisers and switch between them.' },
  { icon: Radio, title: 'Buys on PubMatic and Meta', body: 'Approved plans go live through Halliard, with every fee shown.' },
]

function Header({ signUpHref, onClick }: { signUpHref: string; onClick: () => void }) {
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
          <div className="flex items-center gap-x-4" onClickCapture={onClick}>
            <Button href={signUpHref} color="blue" className="">
              Get your first plan
            </Button>
          </div>
        </nav>
      </Container>
    </header>
  )
}

/** A product-window frame around an explainer, labelled with the portal tab it shows. */
function Frame({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white shadow-xl shadow-slate-900/5 overflow-hidden">
      <div className="flex items-center gap-2 border-b border-slate-100 bg-slate-50/80 px-4 py-2.5">
        <span className="h-2.5 w-2.5 rounded-full bg-slate-200" />
        <span className="h-2.5 w-2.5 rounded-full bg-slate-200" />
        <span className="h-2.5 w-2.5 rounded-full bg-slate-200" />
        <span className="ml-2 text-xs font-medium text-slate-500">client.halliardmedia.com · {label}</span>
      </div>
      <div className="px-4 pt-5 pb-3 sm:px-6">{children}</div>
    </div>
  )
}

function IconBadge({ icon: Icon, className = '' }: { icon: LucideIcon; className?: string }) {
  return (
    <span className={`inline-flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary ${className}`}>
      <Icon className="h-5 w-5" aria-hidden />
    </span>
  )
}

export default function PlanPage() {
  // Capture UTMs + register as person props so all events downstream
  // (even in client.halliardmedia.com) get tied to the right attribution.
  const utmRef = useRef<Record<string, string>>({})
  const [attribution, setAttribution] = useState<Record<string, string>>({})
  const [heroKey, setHeroKey] = useState<HeroKey>('default')
  useEffect(() => {
    if (typeof window === 'undefined') return
    const params = new URLSearchParams(window.location.search)
    const utms: Record<string, string> = {}
    for (const [k, v] of params.entries()) {
      if (k.startsWith('utm_') || k === 'gclid' || k === 'fbclid') utms[k] = v
    }
    utmRef.current = utms
    setAttribution(utms)
    setHeroKey(heroFor(utms))

    const ph = (window as any).posthog
    if (ph && Object.keys(utms).length > 0) {
      // `register` adds these to every event for the session; `people.set_once`
      // locks the FIRST-touch attribution.
      ph.register?.(utms)
      ph.people?.set_once?.({
        first_utm_source: utms.utm_source,
        first_utm_medium: utms.utm_medium,
        first_utm_campaign: utms.utm_campaign,
        first_utm_content: utms.utm_content,
        first_utm_term: utms.utm_term,
        first_gclid: utms.gclid,
        first_landing_page: '/plan',
      })
      ph.people?.set?.({
        last_utm_source: utms.utm_source,
        last_utm_medium: utms.utm_medium,
        last_utm_campaign: utms.utm_campaign,
        last_utm_content: utms.utm_content,
        last_landing_page: '/plan',
      })
    }
    ph?.capture?.('plan_page_viewed', { ...utms, landing_page: '/plan' })
  }, [])

  const trackSignUp = (location: string) => {
    if (typeof window === 'undefined') return
    ;(window as any).posthog?.capture?.('plan_signup_cta_clicked', { ...utmRef.current, location })
  }

  const hero = HERO[heroKey]
  const href = signUpUrl(attribution)

  return (
    <>
      <Head>
        <title>Free Media Planning Tool: A Plan From One Brief | Halliard</title>
        <meta
          name="description"
          content="Send a brief or an RFP. Halliard drafts the audiences, the strategy and a media plan, with reach and frequency modelled before you spend. Sign up free."
        />
        <meta property="og:title" content="Free Media Planning Tool: A Plan From One Brief | Halliard" />
        <meta
          property="og:description"
          content="Send a brief. Get back a plan with its reach modelled before you spend, then watch it run."
        />
      </Head>
      <Header signUpHref={href} onClick={() => trackSignUp('header')} />
      <main className="pt-28 pb-24 bg-gradient-to-b from-white via-slate-50 to-white min-h-screen">
        {/* HERO */}
        <Container className="max-w-6xl">
          <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)] gap-12 items-center">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-semibold tracking-wide mb-6 uppercase">
                <BarChart3 className="h-3.5 w-3.5" aria-hidden />
                {hero.eyebrow}
              </div>
              <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-medium tracking-tight text-slate-900 leading-[1.05]">
                {hero.title}
                <br />
                <span className="text-primary">{hero.accent}</span>
              </h1>
              <p className="mt-6 text-lg text-slate-600 max-w-xl">{hero.body}</p>
              <div className="mt-8 flex flex-col sm:flex-row gap-3">
                <a
                  href={href}
                  onClick={() => trackSignUp('hero')}
                  className="inline-flex items-center justify-center gap-2 rounded-xl px-7 py-3.5 font-semibold text-white text-base bg-primary hover:bg-secondary transition-colors"
                >
                  Get your first plan
                  <ArrowRight className="h-4 w-4" aria-hidden />
                </a>
                <Link
                  href="/schedule-demo"
                  className="inline-flex items-center justify-center rounded-xl px-7 py-3.5 font-semibold text-slate-700 text-base border border-slate-300 bg-white hover:bg-slate-50 transition-colors"
                >
                  Talk to us first
                </Link>
              </div>
              <ul className="mt-8 flex flex-wrap gap-x-6 gap-y-3 text-sm text-slate-600">
                <li className="inline-flex items-center gap-2">
                  <CreditCard className="h-4 w-4 text-primary" aria-hidden />
                  Sign up free, no credit card
                </li>
                <li className="inline-flex items-center gap-2">
                  <ShieldCheck className="h-4 w-4 text-primary" aria-hidden />
                  You approve every line
                </li>
                <li className="inline-flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-primary" aria-hidden />
                  Plans down to the ZIP
                </li>
              </ul>
            </div>
            <Frame label="Campaigns">
              <CampaignsExplainer />
            </Frame>
          </div>
        </Container>

        {/* HOW IT WORKS */}
        <Container className="max-w-6xl mt-32">
          <div className="text-center max-w-2xl mx-auto">
            <div className="text-xs font-bold tracking-widest text-primary uppercase">How it works</div>
            <h2 className="mt-3 font-display text-3xl sm:text-4xl font-medium tracking-tight text-slate-900">
              What Halliard does with one brief
            </h2>
            <p className="mt-4 text-slate-600 text-lg">
              Sign up, tell us who you plan for, and send your first brief. Here is what happens next.
            </p>
          </div>

          <div className="mt-16 flex flex-col gap-24">
            {STEPS.map((step, i) => (
              <section
                key={step.label}
                className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center"
              >
                <div className={i % 2 === 1 ? 'lg:order-2' : ''}>
                  <div className="flex items-center gap-3">
                    <IconBadge icon={step.icon} />
                    <span className="text-xs font-bold tracking-widest text-slate-400 uppercase">
                      Step {i + 1} · {step.label}
                    </span>
                  </div>
                  <h3 className="mt-5 font-display text-2xl sm:text-3xl font-medium tracking-tight text-slate-900">
                    {step.title}
                  </h3>
                  <p className="mt-4 text-slate-600 leading-relaxed">{step.body}</p>
                  <ul className="mt-6 flex flex-col gap-3">
                    {step.points.map(({ icon: Icon, text }) => (
                      <li key={text} className="flex items-start gap-3 text-slate-700">
                        <Icon className="mt-0.5 h-5 w-5 flex-shrink-0 text-primary" aria-hidden />
                        <span>{text}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className={`min-w-0 ${i % 2 === 1 ? 'lg:order-1' : ''}`}>
                  <Frame label={step.frame}>
                    <step.Explainer />
                  </Frame>
                </div>
              </section>
            ))}
          </div>
        </Container>

        {/* FEATURES */}
        <Container className="max-w-6xl mt-32">
          <div className="text-center max-w-2xl mx-auto">
            <div className="text-xs font-bold tracking-widest text-primary uppercase">After you approve</div>
            <h2 className="mt-3 font-display text-3xl sm:text-4xl font-medium tracking-tight text-slate-900">
              Halliard buys it and keeps it pacing
            </h2>
          </div>
          <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {FEATURES.map(f => (
              <div key={f.title} className="rounded-2xl border border-slate-200 bg-white p-6">
                <IconBadge icon={f.icon} />
                <h3 className="mt-4 font-display text-lg font-medium text-slate-900">{f.title}</h3>
                <p className="mt-2 text-slate-600 text-sm leading-relaxed">{f.body}</p>
              </div>
            ))}
          </div>
        </Container>

        {/* CLOSING CTA */}
        <Container className="max-w-4xl mt-32">
          <div className="bg-gradient-to-br from-primary to-secondary rounded-3xl p-8 sm:p-14 text-white text-center">
            <h2 className="font-display text-3xl sm:text-4xl font-medium tracking-tight">
              Send your next brief to Halliard.
            </h2>
            <p className="mt-4 text-white/80 text-lg max-w-xl mx-auto">
              Get back a plan with its reach modelled before you spend. Approve it, and Halliard
              buys it and keeps it pacing.
            </p>
            <a
              href={href}
              onClick={() => trackSignUp('closing')}
              className="mt-8 inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl bg-white text-primary font-semibold hover:bg-slate-100 transition-colors"
            >
              Get your first plan
              <ArrowRight className="h-4 w-4" aria-hidden />
            </a>
            <p className="mt-3 text-xs text-white/70">Sign up free. No credit card.</p>
          </div>
        </Container>
      </main>
    </>
  )
}

;(PlanPage as any).disableNavbar = true
;(PlanPage as any).fullWidth = true
;(PlanPage as any).siteBg = true
