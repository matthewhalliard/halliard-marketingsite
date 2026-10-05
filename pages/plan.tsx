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
import { PlanGridHero } from '../components/plan/plan-grid-hero'
import { AudienceScene, BriefScene, StrategyScene } from '../components/plan/step-visuals'
import {
  ApproveVisual,
  BuyVisual,
  ClientsVisual,
  LedgerVisual,
  LocalVisual,
  PacingVisual,
} from '../components/plan/feature-visuals'
import { BuysOnBanner, LisaQuote } from '../components/plan/proof'

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
    Explainer: BriefScene,
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
    Explainer: AudienceScene,
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
    Explainer: StrategyScene,
  },
]

const FEATURES: { icon: LucideIcon; title: string; body: string; Visual: () => React.JSX.Element }[] = [
  { icon: ShieldCheck, title: 'Nothing buys without you', body: 'Every line of a plan is approved by a person before a dollar is spent.', Visual: ApproveVisual },
  { icon: Timer, title: 'Pacing, checked every six hours', body: 'Once a plan is live, Halliard watches delivery and flags what drifts.', Visual: PacingVisual },
  { icon: ScrollText, title: 'Every action on the record', body: 'What was bought, why, and what the platform said back. Show your client.', Visual: LedgerVisual },
  { icon: MapPin, title: 'Built for local', body: 'Catchments inside the DMA, ZIPs ranked on the brief, search sized by market.', Visual: LocalVisual },
  { icon: Building2, title: 'One login, many clients', body: 'Agencies plan and buy for several advertisers and switch between them.', Visual: ClientsVisual },
  { icon: Radio, title: 'Buys on PubMatic and Meta', body: 'Approved plans go live through Halliard, with every fee shown.', Visual: BuyVisual },
]

const PLUS_PATTERN = "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%231a6ab4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")"

// The hand-drawn underline from the homepage hero.
const SCRIBBLE =
  'M203.371.916c-26.013-2.078-76.686 1.963-124.73 9.946L67.3 12.749C35.421 18.062 18.2 21.766 6.004 25.934 1.244 27.561.828 27.778.874 28.61c.07 1.214.828 1.121 9.595-1.176 9.072-2.377 17.15-3.92 39.246-7.496C123.565 7.986 157.869 4.492 195.942 5.046c7.461.108 19.25 1.696 19.17 2.582-.107 1.183-7.874 4.31-25.75 10.366-21.992 7.45-35.43 12.534-36.701 13.884-2.173 2.308-.202 4.407 4.442 4.734 2.654.187 3.263.157 15.593-.78 35.401-2.686 57.944-3.488 88.365-3.143 46.327.526 75.721 2.23 130.788 7.584 19.787 1.924 20.814 1.98 24.557 1.332l.066-.011c1.201-.203 1.53-1.825.399-2.335-2.911-1.31-4.893-1.604-22.048-3.261-57.509-5.556-87.871-7.36-132.059-7.842-23.239-.254-33.617-.116-50.627.674-11.629.54-42.371 2.494-46.696 2.967-2.359.259 8.133-3.625 26.504-9.81 23.239-7.825 27.934-10.149 28.304-14.005.417-4.348-3.529-6-16.878-7.066Z'

function Header({ signUpHref, onClick }: { signUpHref: string; onClick: () => void }) {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/50 backdrop-blur-md border-b border-tint/40">
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
function Frame({ label, children, hero = false }: { label: string; children: React.ReactNode; hero?: boolean }) {
  return (
    <div
      className={`rounded-xl border border-tint bg-white overflow-hidden ${
        hero ? 'shadow-2xl shadow-primary/10' : 'shadow-lg'
      }`}
    >
      <div className="flex items-center gap-2 border-b border-tint bg-gradient-to-r from-tint/50 to-white px-4 py-2.5">
        <span className="h-2.5 w-2.5 rounded-full bg-white ring-1 ring-tint" />
        <span className="h-2.5 w-2.5 rounded-full bg-white ring-1 ring-tint" />
        <span className="h-2.5 w-2.5 rounded-full bg-white ring-1 ring-tint" />
        <span className="ml-2 text-xs font-medium text-primary/70">client.halliardmedia.com · {label}</span>
      </div>
      <div className="px-4 pt-5 pb-3 sm:px-6">{children}</div>
    </div>
  )
}

function IconBadge({ icon: Icon }: { icon: LucideIcon }) {
  return (
    <span className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-tint text-primary">
      <Icon className="h-6 w-6" aria-hidden />
    </span>
  )
}

function SectionHeading({ eyebrow, title, body }: { eyebrow: string; title: string; body?: string }) {
  return (
    <div className="mx-auto max-w-2xl text-center">
      <p className="inline-flex items-center rounded-full bg-tint px-4 py-1.5 text-sm font-medium text-primary">
        {eyebrow}
      </p>
      <h2 className="mt-5 font-display text-3xl tracking-tight text-slate-900 sm:text-4xl">{title}</h2>
      {body ? <p className="mt-4 text-lg tracking-tight text-slate-700">{body}</p> : null}
    </div>
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
      <main>
        {/* HERO */}
        <section className="relative">
          {/* The homepage's plus pattern and tint glow, fading out at the bottom into the site background. */}
          <div
            className="pointer-events-none absolute inset-x-0 top-0 h-[115%] opacity-[0.07]"
            style={{
              backgroundImage: PLUS_PATTERN,
              backgroundSize: '18px 18px',
              maskImage: 'linear-gradient(to bottom, #000 55%, transparent)',
              WebkitMaskImage: 'linear-gradient(to bottom, #000 55%, transparent)',
            }}
          />
          <div
            className="pointer-events-none absolute inset-x-0 top-0 h-[115%]"
            style={{ background: 'radial-gradient(ellipse 80% 70% at 50% 0%, rgba(211,228,255,0.55) 0%, rgba(211,228,255,0) 100%)' }}
          />
          <Container className="relative max-w-6xl pt-32 pb-20 lg:pt-40 lg:pb-28">
            <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.25fr)] gap-12 items-center">
              <div className="text-center lg:text-left">
                <p className="inline-flex items-center gap-2 rounded-full bg-tint px-4 py-1.5 text-sm font-medium text-primary mb-6">
                  <BarChart3 className="h-4 w-4" aria-hidden />
                  {hero.eyebrow}
                </p>
                <h1 className="font-display text-5xl font-medium tracking-tight text-slate-900 sm:text-6xl">
                  {hero.title}{' '}
                  <span className="relative whitespace-nowrap text-primary">
                    <svg
                      aria-hidden="true"
                      viewBox="0 0 418 42"
                      className="absolute left-0 top-2/3 h-[0.58em] w-full fill-primary/30"
                      preserveAspectRatio="none"
                    >
                      <path d={SCRIBBLE} />
                    </svg>
                    <span className="relative">{hero.accent}</span>
                  </span>
                </h1>
                <p className="mx-auto lg:mx-0 mt-6 max-w-xl text-lg tracking-tight text-slate-700">
                  {hero.body} <span className="font-semibold text-slate-900">Free to start.</span>
                </p>
                <div className="mt-10 flex flex-col sm:flex-row justify-center lg:justify-start gap-4">
                  <Button href={href} color="blue" className="px-6 py-3 text-base" onClick={() => trackSignUp('hero')}>
                    Get your first plan
                    <ArrowRight className="ml-2 h-4 w-4" aria-hidden />
                  </Button>
                </div>
                <div className="mt-8 inline-flex items-center gap-3 rounded-2xl border border-tint bg-white/80 px-4 py-3 text-left shadow-sm">
                  <img src="/plan-grid/halliard-mark.png" alt="" width={28} height={28} className="h-7 w-7 shrink-0" />
                  <p className="text-sm text-slate-700">
                    <span className="font-semibold text-primary">Optional:</span> Halliard can also buy the plan for
                    you and keep it pacing. You approve every line first.
                  </p>
                </div>
                <ul className="mt-6 flex flex-wrap justify-center lg:justify-start gap-x-6 gap-y-3 text-sm text-slate-600">
                  <li className="inline-flex items-center gap-2">
                    <CreditCard className="h-4 w-4 text-primary" aria-hidden />
                    No credit card
                  </li>
                  <li className="inline-flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-primary" aria-hidden />
                    Plans down to the ZIP
                  </li>
                </ul>
              </div>
              <div className="relative min-w-0">
                <div
                  className="absolute -inset-8 rounded-[2rem] blur-2xl"
                  style={{ background: 'radial-gradient(ellipse at 60% 40%, rgba(26,106,180,0.18) 0%, rgba(211,228,255,0.35) 45%, transparent 75%)' }}
                  aria-hidden
                />
                <div className="relative">
                  <Frame label="Media plan" hero>
                    <PlanGridHero />
                  </Frame>
                </div>
              </div>
            </div>
          </Container>
        </section>

        {/* WHERE HALLIARD CAN BUY */}
        <section className="relative py-6">
          <Container className="max-w-6xl">
            <BuysOnBanner />
          </Container>
        </section>

        {/* HOW IT WORKS */}
        <section className="py-20 sm:py-28" style={{ background: 'linear-gradient(to bottom, rgba(248,250,252,0) 0, rgb(248,250,252) 140px, rgb(248,250,252) calc(100% - 140px), rgba(248,250,252,0) 100%)' }}>
          <Container className="max-w-6xl">
            <SectionHeading
              eyebrow="How it works"
              title="What Halliard does with one brief"
              body="Sign up, tell us who you plan for, and send your first brief. Here is what happens next."
            />
            <div className="mt-16 flex flex-col gap-20">
              {STEPS.map((step, i) => (
                <div key={step.label} className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
                  <div className={i % 2 === 1 ? 'lg:order-2' : ''}>
                    <div className="flex items-center gap-4">
                      <IconBadge icon={step.icon} />
                      <span className="text-sm font-semibold text-primary">
                        Step {i + 1} · {step.label}
                      </span>
                    </div>
                    <h3 className="mt-5 font-display text-2xl tracking-tight text-slate-900 sm:text-3xl">{step.title}</h3>
                    <p className="mt-4 text-slate-700 leading-relaxed">{step.body}</p>
                    <ul className="mt-6 flex flex-col gap-3">
                      {step.points.map(({ icon: Icon, text }) => (
                        <li key={text} className="flex items-start gap-3 text-slate-700">
                          <span className="mt-0.5 inline-flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-white ring-1 ring-tint">
                            <Icon className="h-3.5 w-3.5 text-primary" aria-hidden />
                          </span>
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
                </div>
              ))}
            </div>
          </Container>
        </section>

        {/* SOCIAL PROOF */}
        <section className="py-16 sm:py-20">
          <Container className="">
            <div className="mx-auto max-w-3xl">
              <LisaQuote />
            </div>
          </Container>
        </section>

        {/* FEATURES */}
        <section className="py-20 sm:py-28" style={{ background: 'linear-gradient(to bottom, rgba(248,250,252,0) 0, rgb(248,250,252) 140px, rgb(248,250,252) calc(100% - 140px), rgba(248,250,252,0) 100%)' }}>
          <Container className="max-w-6xl">
            <SectionHeading
              eyebrow="Optional"
              title="Want it bought? Halliard can do that too."
              body="Planning is yours either way. If you want, hand the approved plan to Halliard: it buys it, keeps it pacing and shows you every fee. Or take the plan and buy it the way you do today."
            />
            <div className="mt-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {FEATURES.map(f => (
                <div key={f.title} className="rounded-2xl bg-white p-6 shadow-lg border border-tint">
                  <f.Visual />
                  <div className="mt-5 flex items-center gap-3">
                    <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-tint text-primary">
                      <f.icon className="h-4 w-4" aria-hidden />
                    </span>
                    <h3 className="font-display text-lg text-slate-900">{f.title}</h3>
                  </div>
                  <p className="mt-2 text-slate-600 text-sm leading-relaxed">{f.body}</p>
                </div>
              ))}
            </div>
          </Container>
        </section>

        {/* CLOSING CTA */}
        <section className="relative overflow-hidden bg-primary py-20">
          <div className="absolute inset-0 bg-gradient-to-br from-primary to-secondary" />
          <div className="absolute inset-0 opacity-[0.15]" style={{ backgroundImage: PLUS_PATTERN, backgroundSize: '18px 18px' }} />
          <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse at 50% 50%, rgba(255,255,255,0.08) 0%, transparent 70%)' }} />
          <Container className="relative">
            <div className="mx-auto max-w-2xl text-center">
              <h2 className="font-display text-3xl tracking-tight text-white sm:text-4xl">
                Send your next brief to Halliard.
              </h2>
              <p className="mt-2 font-display text-3xl tracking-tight text-white/80 sm:text-4xl">
                Plan it free. Have us buy it if you want.
              </p>
              <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
                <Button href={href} variant="solid" color="white" className="px-6 py-3 text-base" onClick={() => trackSignUp('closing')}>
                  Get your first plan
                  <ArrowRight className="ml-2 h-4 w-4" aria-hidden />
                </Button>
              </div>
              <p className="mt-6 text-sm text-white/70">Sign up free. No credit card.</p>
            </div>
          </Container>
        </section>
      </main>
    </>
  )
}

;(PlanPage as any).disableNavbar = true
;(PlanPage as any).fullWidth = true
;(PlanPage as any).siteBg = true
