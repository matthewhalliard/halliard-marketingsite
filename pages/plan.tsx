import Head from 'next/head'
import Link from 'next/link'
import React, { useEffect, useRef, useState } from 'react'
import { Container } from '../components/mmm/Container'
import { Button } from '../components/mmm/Button'

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

const STEPS = [
  {
    title: 'Sign up and tell us about you',
    body: 'An agency or a brand, the client you will plan for first, and where you buy media today. No credit card.',
  },
  {
    title: 'Send a brief',
    body: 'Write it in your own words or drop in the RFP. Halliard reads it for the goal, the budget, the timing and who it is for.',
  },
  {
    title: 'Get the plan back',
    body: 'Audiences, strategies and a media plan, with reach and frequency modelled. Approve it and Halliard buys it and keeps it pacing.',
  },
]

const DELIVERABLES = [
  {
    label: 'Audiences',
    title: 'Who, and where they live',
    body: 'Planning audiences drafted from the brief, down to the DMA and the ZIP, with the media each one consumes.',
  },
  {
    label: 'Strategy',
    title: 'A role for every dollar',
    body: 'Each strategy says what the media is doing, for whom and in what moment, with its own budget and flight.',
  },
  {
    label: 'Media plan',
    title: 'Reach before spend',
    body: 'Channels and properties fitted to each strategy, with reach and frequency modelled before anything is bought.',
  },
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
        <Container className="max-w-3xl">
          <div className="text-center">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-semibold tracking-wide mb-6 uppercase">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />
              {hero.eyebrow}
            </div>
            <h1 className="font-display text-4xl sm:text-6xl font-medium tracking-tight text-slate-900 leading-[1.05]">
              {hero.title}
              <br />
              <span className="text-primary">{hero.accent}</span>
            </h1>
            <p className="mt-6 text-lg text-slate-600 max-w-xl mx-auto">{hero.body}</p>
            <div className="mt-10 flex flex-col sm:flex-row gap-3 justify-center">
              <a
                href={href}
                onClick={() => trackSignUp('hero')}
                className="inline-flex items-center justify-center rounded-xl px-7 py-3.5 font-semibold text-white text-base bg-primary hover:bg-secondary transition-colors"
              >
                Get your first plan →
              </a>
              <Link
                href="/schedule-demo"
                className="inline-flex items-center justify-center rounded-xl px-7 py-3.5 font-semibold text-slate-700 text-base border border-slate-300 bg-white hover:bg-slate-50 transition-colors"
              >
                Talk to us first
              </Link>
            </div>
            <p className="mt-3 text-xs text-slate-400">Sign up free. No credit card.</p>
          </div>
        </Container>

        {/* HOW IT WORKS */}
        <Container className="max-w-4xl mt-24">
          <h2 className="text-center font-display text-2xl sm:text-3xl font-medium tracking-tight text-slate-900">
            From brief to plan in three steps
          </h2>
          <ol className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-6">
            {STEPS.map((s, i) => (
              <li key={s.title} className="bg-white rounded-xl border border-slate-200 p-6">
                <div className="w-8 h-8 rounded-full bg-primary/10 text-primary font-bold flex items-center justify-center mb-4">
                  {i + 1}
                </div>
                <h3 className="font-display text-lg font-medium text-slate-900 mb-2">{s.title}</h3>
                <p className="text-slate-600 text-sm leading-relaxed">{s.body}</p>
              </li>
            ))}
          </ol>
        </Container>

        {/* WHAT YOU GET */}
        <Container className="max-w-4xl mt-24">
          <h2 className="text-center font-display text-2xl sm:text-3xl font-medium tracking-tight text-slate-900">
            What comes back from one brief
          </h2>
          <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-6">
            {DELIVERABLES.map(d => (
              <div key={d.label} className="rounded-xl border border-slate-200 bg-white p-6">
                <div className="text-[10px] font-bold tracking-widest text-primary uppercase mb-2">{d.label}</div>
                <h3 className="font-display text-lg font-medium text-slate-900 mb-2">{d.title}</h3>
                <p className="text-slate-600 text-sm leading-relaxed">{d.body}</p>
              </div>
            ))}
          </div>
        </Container>

        {/* CLOSING CTA */}
        <Container className="max-w-4xl mt-24">
          <div className="bg-gradient-to-br from-primary to-secondary rounded-2xl p-8 sm:p-12 text-white text-center">
            <h2 className="font-display text-2xl sm:text-3xl font-medium tracking-tight">
              Send your next brief to Halliard.
            </h2>
            <p className="mt-3 text-white/80 text-lg max-w-xl mx-auto">
              Get back a plan with its reach modelled before you spend. Approve it, and Halliard
              buys it and keeps it pacing.
            </p>
            <a
              href={href}
              onClick={() => trackSignUp('closing')}
              className="mt-8 inline-flex items-center justify-center px-7 py-3.5 rounded-xl bg-white text-primary font-semibold hover:bg-slate-100 transition-colors"
            >
              Get your first plan →
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
