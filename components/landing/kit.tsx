import Link from 'next/link'
import React, { useEffect, useRef, useState } from 'react'
import { ArrowRight, type LucideIcon } from 'lucide-react'
import { Container } from '../mmm/Container'
import { Button } from '../mmm/Button'

/**
 * The building blocks the paid-search landing pages share (/plan,
 * /buying-desk): halliardmedia.com's hero treatment, the product-window
 * frame the animated scenes sit in, section headings, the step rows, the
 * feature grid, the closing band, and attribution that carries the visit's
 * UTMs and click IDs to the client portal's sign-up.
 */

// The client portal: sign up, tell us about you, send a first brief.
export const SIGN_UP_URL = 'https://client.halliardmedia.com/sign-up'

export const PLUS_PATTERN =
  "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%231a6ab4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")"

// The hand-drawn underline from the homepage hero.
const SCRIBBLE =
  'M203.371.916c-26.013-2.078-76.686 1.963-124.73 9.946L67.3 12.749C35.421 18.062 18.2 21.766 6.004 25.934 1.244 27.561.828 27.778.874 28.61c.07 1.214.828 1.121 9.595-1.176 9.072-2.377 17.15-3.92 39.246-7.496C123.565 7.986 157.869 4.492 195.942 5.046c7.461.108 19.25 1.696 19.17 2.582-.107 1.183-7.874 4.31-25.75 10.366-21.992 7.45-35.43 12.534-36.701 13.884-2.173 2.308-.202 4.407 4.442 4.734 2.654.187 3.263.157 15.593-.78 35.401-2.686 57.944-3.488 88.365-3.143 46.327.526 75.721 2.23 130.788 7.584 19.787 1.924 20.814 1.98 24.557 1.332l.066-.011c1.201-.203 1.53-1.825.399-2.335-2.911-1.31-4.893-1.604-22.048-3.261-57.509-5.556-87.871-7.36-132.059-7.842-23.239-.254-33.617-.116-50.627.674-11.629.54-42.371 2.494-46.696 2.967-2.359.259 8.133-3.625 26.504-9.81 23.239-7.825 27.934-10.149 28.304-14.005.417-4.348-3.529-6-16.878-7.066Z'

/** A grey band that fades in and out at its edges, so sections never start on a hard line. */
export const SOFT_BAND: React.CSSProperties = {
  background:
    'linear-gradient(to bottom, rgba(248,250,252,0) 0, rgb(248,250,252) 140px, rgb(248,250,252) calc(100% - 140px), rgba(248,250,252,0) 100%)',
}

/**
 * The visit's UTMs and click IDs, registered on the PostHog person (first
 * and last touch), a named page-view event, and a CTA click tracker. `href`
 * is the client sign-up carrying the same parameters.
 */
export function useLandingAttribution(page: string) {
  const utmRef = useRef<Record<string, string>>({})
  const [utms, setUtms] = useState<Record<string, string>>({})
  const event = page.replace(/^\//, '').replace(/[^a-z0-9]+/gi, '_')

  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    const found: Record<string, string> = {}
    for (const [k, v] of params.entries()) {
      if (k.startsWith('utm_') || k === 'gclid' || k === 'fbclid') found[k] = v
    }
    utmRef.current = found
    setUtms(found)

    const ph = (window as any).posthog
    if (ph && Object.keys(found).length > 0) {
      // `register` adds these to every event for the session; `people.set_once`
      // locks the FIRST-touch attribution.
      ph.register?.(found)
      ph.people?.set_once?.({
        first_utm_source: found.utm_source,
        first_utm_medium: found.utm_medium,
        first_utm_campaign: found.utm_campaign,
        first_utm_content: found.utm_content,
        first_utm_term: found.utm_term,
        first_gclid: found.gclid,
        first_landing_page: page,
      })
      ph.people?.set?.({
        last_utm_source: found.utm_source,
        last_utm_medium: found.utm_medium,
        last_utm_campaign: found.utm_campaign,
        last_utm_content: found.utm_content,
        last_landing_page: page,
      })
    }
    ph?.capture?.(`${event}_page_viewed`, { ...found, landing_page: page })
  }, [page, event])

  const track = (location: string) => {
    ;(window as any).posthog?.capture?.(`${event}_signup_cta_clicked`, { ...utmRef.current, location })
  }
  const qs = new URLSearchParams(utms).toString()
  return { utms, track, href: qs ? `${SIGN_UP_URL}?${qs}` : SIGN_UP_URL }
}

export function LandingHeader({ href, cta, onClick }: { href: string; cta: string; onClick: () => void }) {
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
            <Button href={href} color="blue" className="">
              {cta}
            </Button>
          </div>
        </nav>
      </Container>
    </header>
  )
}

/** The homepage's plus pattern and tint glow, fading out at the bottom into the site background. */
export function HeroBackdrop() {
  return (
    <>
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
    </>
  )
}

/** A headline's accent words, underlined with the homepage's hand-drawn stroke. */
export function Accent({ children }: { children: React.ReactNode }) {
  return (
    <span className="relative whitespace-nowrap text-primary">
      <svg
        aria-hidden="true"
        viewBox="0 0 418 42"
        className="absolute left-0 top-2/3 h-[0.58em] w-full fill-primary/30"
        preserveAspectRatio="none"
      >
        <path d={SCRIBBLE} />
      </svg>
      <span className="relative">{children}</span>
    </span>
  )
}

/** The hero's product window, sitting in a soft blue glow. */
export function HeroVisual({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="relative min-w-0">
      <div
        className="absolute -inset-3 rounded-[2rem] blur-2xl sm:-inset-8"
        style={{ background: 'radial-gradient(ellipse at 60% 40%, rgba(26,106,180,0.18) 0%, rgba(211,228,255,0.35) 45%, transparent 75%)' }}
        aria-hidden
      />
      <div className="relative">
        <Frame label={label} hero>
          {children}
        </Frame>
      </div>
    </div>
  )
}

/** A product-window frame around a scene, labelled with the portal tab it shows. */
export function Frame({ label, children, hero = false }: { label: string; children: React.ReactNode; hero?: boolean }) {
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

export function IconBadge({ icon: Icon }: { icon: LucideIcon }) {
  return (
    <span className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-tint text-primary">
      <Icon className="h-6 w-6" aria-hidden />
    </span>
  )
}

export function SectionHeading({ eyebrow, title, body }: { eyebrow: string; title: string; body?: string }) {
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

export interface Step {
  icon: LucideIcon
  label: string
  title: string
  body: string
  points: { icon: LucideIcon; text: string }[]
  frame: string
  Scene: () => React.JSX.Element
}

/** How-it-works rows: copy on one side, the step's scene in a product frame on the other, alternating. */
export function StepRows({ steps }: { steps: Step[] }) {
  return (
    <div className="mt-16 flex flex-col gap-20">
      {steps.map((step, i) => (
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
              <step.Scene />
            </Frame>
          </div>
        </div>
      ))}
    </div>
  )
}

export interface Feature {
  icon: LucideIcon
  title: string
  body: string
  Visual: () => React.JSX.Element
}

export function FeatureGrid({ features }: { features: Feature[] }) {
  return (
    <div className="mt-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
      {features.map(f => (
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
  )
}

/** The homepage's gradient CTA band, with its pattern and glow. */
export function ClosingCta({
  title,
  subtitle,
  cta,
  href,
  onClick,
}: {
  title: string
  subtitle: string
  cta: string
  href: string
  onClick: () => void
}) {
  return (
    <section className="relative overflow-hidden bg-primary py-20">
      <div className="absolute inset-0 bg-gradient-to-br from-primary to-secondary" />
      <div className="absolute inset-0 opacity-[0.15]" style={{ backgroundImage: PLUS_PATTERN, backgroundSize: '18px 18px' }} />
      <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse at 50% 50%, rgba(255,255,255,0.08) 0%, transparent 70%)' }} />
      <Container className="relative">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="font-display text-3xl tracking-tight text-white sm:text-4xl">{title}</h2>
          <p className="mt-2 font-display text-3xl tracking-tight text-white/80 sm:text-4xl">{subtitle}</p>
          <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
            <Button href={href} variant="solid" color="white" className="px-6 py-3 text-base" onClick={onClick}>
              {cta}
              <ArrowRight className="ml-2 h-4 w-4" aria-hidden />
            </Button>
          </div>
          <p className="mt-6 text-sm text-white/70">Sign up free. No credit card.</p>
        </div>
      </Container>
    </section>
  )
}
