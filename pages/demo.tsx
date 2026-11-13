import Head from 'next/head'
import React, { useEffect, useState } from 'react'
import { BarChart3, CalendarCheck, Clock, FileText, LineChart, MapPin, Pencil, Radio, ShieldCheck, Timer } from 'lucide-react'
import { Container } from '../components/mmm/Container'
import { Button } from '../components/mmm/Button'
import { Accent, HeroBackdrop, HeroVisual, LandingHeader, SOFT_BAND, SectionHeading } from '../components/landing/kit'
import { PlanGridHero } from '../components/plan/plan-grid-hero'
import { LisaQuote } from '../components/plan/proof'
import { LiveScene } from '../components/buying/scenes'
import { LiftScene, ProductRows, type ProductRow } from '../components/demo/rows'
import { trackCta } from '../lib/track'
import { trackPixel } from '@/lib/meta-pixel'

const CALENDAR_EMBED_SRC =
  'https://calendar.google.com/calendar/appointments/schedules/AcZssZ1jtM9RZtwp5-TuTTBbXg9Wkc9VEV1dLDUpVS-ajVsNJOoJSBGQDyd7hZ-S_x7mVHGYpZTRPHW2?gv=true'


function scrollToBooking() {
  if (typeof window === 'undefined') return
  const el = document.getElementById('book')
  if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
}

// Tracks iframe engagement: fires Meta Lead + PostHog events when the visitor
// either (a) views the calendar long enough OR (b) clicks INTO the iframe
// (best available cross-origin signal that they're actively booking).
function useCalendarEngagementTracking(
  iframeRef: React.RefObject<HTMLIFrameElement | null>,
) {
  useEffect(() => {
    if (typeof window === 'undefined') return
    if (!iframeRef.current) return

    let viewedFired = false
    let engagedFired = false
    let bookedAssumedFired = false
    let iframeInView = false
    let inViewSince: number | null = null
    let engagedAt: number | null = null
    const VIEWED_THRESHOLD_MS = 3000
    // If the user has been actively engaged with the iframe for >= 30s and
    // then leaves the page, treat it as "probably booked." Google Calendar
    // is cross-origin so we cannot observe the booking confirmation directly;
    // this is the strongest proxy short of an Apps Script webhook.
    const BOOKED_ASSUMED_MIN_ENGAGE_MS = 30000

    function fireCalendarViewed() {
      if (viewedFired) return
      viewedFired = true
      try {
        const w = window as any
        if (w.posthog) {
          w.posthog.capture('calendar_viewed', { page: '/demo' })
        }
      } catch {}
      trackPixel('Lead', {
        content_name: 'calendar_viewed',
        source: 'demo_lp',
        engagement_tier: 'viewed',
      })
    }

    function fireCalendarEngaged() {
      if (engagedFired) return
      engagedFired = true
      engagedAt = Date.now()
      try {
        const w = window as any
        if (w.posthog) {
          w.posthog.capture('calendar_engaged', {
            page: '/demo',
            signal: 'iframe_click',
          })
        }
        if (w.gtag) {
          w.gtag('event', 'conversion', {
            send_to: 'AW-672346912/qEmHCJ6L_pgcEKDmzMAC',
            value: 50.0,
            currency: 'USD',
          })
        }
      } catch {}
      // Strongest signal we can capture without Apps Script — fire as Lead
      // so Meta optimizes against this. content_name lets us segment in CAPI.
      trackPixel('Lead', {
        content_name: 'calendar_engaged',
        source: 'demo_lp',
        engagement_tier: 'engaged',
      })
    }

    function fireDemoBookedAssumed(reason: string) {
      if (bookedAssumedFired) return
      if (!engagedFired || engagedAt === null) return
      const dwell = Date.now() - engagedAt
      if (dwell < BOOKED_ASSUMED_MIN_ENGAGE_MS) return
      bookedAssumedFired = true
      try {
        const w = window as any
        if (w.posthog) {
          w.posthog.capture('demo_booked_assumed', {
            page: '/demo',
            reason,
            engaged_dwell_ms: dwell,
          })
        }
        if (w.gtag) {
          // Higher-value conversion than calendar_engaged—strongest pre-confirm
          // signal we can capture cross-origin
          w.gtag('event', 'conversion', {
            send_to: 'AW-672346912/qEmHCJ6L_pgcEKDmzMAC',
            value: 150.0,
            currency: 'USD',
          })
        }
      } catch {}
      trackPixel('Lead', {
        content_name: 'demo_booked_assumed',
        source: 'demo_lp',
        engagement_tier: 'booked_assumed',
        dwell_ms: dwell,
      })
    }

    // 1. IntersectionObserver — fires `calendar_viewed` after iframe is in
    //    viewport for >3s. Runs continuously to track "is iframe in view"
    //    so the blur listener below knows whether to count blur as engagement.
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting && entry.intersectionRatio > 0.5) {
            iframeInView = true
            if (inViewSince === null) {
              inViewSince = Date.now()
              setTimeout(() => {
                if (iframeInView && !viewedFired) {
                  fireCalendarViewed()
                }
              }, VIEWED_THRESHOLD_MS)
            }
          } else {
            iframeInView = false
            inViewSince = null
          }
        }
      },
      { threshold: [0, 0.5, 1] },
    )
    observer.observe(iframeRef.current)

    // 2. window.blur listener — when user clicks INTO the iframe, the parent
    //    window loses focus. If the iframe is also in the viewport, that's
    //    the strongest possible signal short of an Apps Script webhook that
    //    the user is actively engaging with the booking widget.
    function onBlur() {
      // Defer to next tick: document.activeElement may not have updated yet
      setTimeout(() => {
        if (!iframeInView) return
        const active = document.activeElement as HTMLElement | null
        if (active && active.tagName === 'IFRAME' && active === iframeRef.current) {
          fireCalendarEngaged()
        }
      }, 50)
    }

    // Page-exit / visibility-change handlers: if the user engaged with the
    // calendar for >30s and then leaves (close tab, navigate away, hide),
    // assume they probably booked. We fire `demo_booked_assumed` as our
    // best cross-origin proxy for booking completion.
    function onPageHide() {
      fireDemoBookedAssumed('pagehide')
    }
    function onVisibilityChange() {
      if (document.visibilityState === 'hidden') {
        fireDemoBookedAssumed('visibility_hidden')
      }
    }
    window.addEventListener('blur', onBlur)
    window.addEventListener('pagehide', onPageHide)
    document.addEventListener('visibilitychange', onVisibilityChange)

    return () => {
      observer.disconnect()
      window.removeEventListener('blur', onBlur)
      window.removeEventListener('pagehide', onPageHide)
      document.removeEventListener('visibilitychange', onVisibilityChange)
    }
  }, [iframeRef])
}

function fireDemoIntent(location: string) {
  try {
    trackCta('demo_intent_click', location)
    if (typeof window !== 'undefined') {
      const w = window as any
      if (w.posthog) {
        w.posthog.capture('demo_intent_click', { location, page: '/demo' })
      }
      if (w.gtag) {
        w.gtag('event', 'conversion', {
          send_to: 'AW-672346912/qEmHCJ6L_pgcEKDmzMAC',
        })
      }
    }
    trackPixel('Lead', { content_name: 'demo_intent_click', source: 'demo_lp' })
  } catch {
    /* never block UX on tracking */
  }
}

function Hero() {
  return (
    <section className="relative">
      <HeroBackdrop />
      <Container className="relative max-w-6xl pt-32 pb-16 lg:pt-40 lg:pb-24">
        <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.25fr)] gap-12 items-center">
          <div className="text-center lg:text-left">
            <p className="inline-flex items-center gap-2 rounded-full bg-tint px-4 py-1.5 text-sm font-medium text-primary mb-6">
              <MapPin className="h-4 w-4" aria-hidden />
              For independent agencies
            </p>
            <h1 className="font-display text-5xl font-medium tracking-tight text-slate-900 sm:text-6xl">
              Plan it, buy it, <Accent>prove it worked.</Accent>
            </h1>
            <p className="mx-auto lg:mx-0 mt-6 max-w-xl text-lg tracking-tight text-slate-700">
              Halliard drafts the media plan from your brief, buys it and keeps it pacing if you want, and measures what
              it did for your client. Book 15 minutes and we&rsquo;ll show you on a brief of your own.
            </p>
            <div className="mt-10 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
              <Button
                color="blue"
                className="px-6 py-3 text-base"
                onClick={() => {
                  fireDemoIntent('hero')
                  scrollToBooking()
                }}
              >
                Book a 15-min demo &rarr;
              </Button>
            </div>
            <p className="mt-4 text-sm text-slate-600">15 minutes. No deck. No follow-up unless you ask.</p>
          </div>
          <HeroVisual label="Media plan · Draft, edit any line">
            <PlanGridHero />
          </HeroVisual>
        </div>
      </Container>
    </section>
  )
}

const CLIENT_LOGOS = [
  { src: '/images/client-logos/allen-allen.png', alt: 'Allen & Allen' },
  { src: '/images/client-logos/ablenow.png', alt: 'ABLEnow' },
  { src: '/images/client-logos/invest529.png', alt: 'Invest529' },
  { src: '/images/client-logos/vcu.png', alt: 'VCU' },
  { src: '/images/client-logos/ymca.png', alt: 'YMCA' },
]

function TrustStrip() {
  return (
    <section className="pb-12 sm:pb-16">
      <Container className="max-w-6xl">
        <p className="text-center text-sm font-medium text-slate-500">The brands our agency customers plan media for</p>
        <div className="mt-6 flex flex-wrap items-center justify-center gap-x-12 gap-y-6 grayscale opacity-70">
          {CLIENT_LOGOS.map(logo => (
            <img key={logo.src} src={logo.src} alt={logo.alt} className="h-8 w-auto" />
          ))}
        </div>
      </Container>
    </section>
  )
}

const PRODUCTS: ProductRow[] = [
  {
    icon: FileText,
    label: 'Planning · free to start',
    title: 'A plan from your brief in minutes',
    body: 'Paste a brief or drop in an RFP. Halliard drafts the audiences, strategy and channel plan with reach and frequency modelled, and you edit any line and test what-ifs on the spot.',
    points: [
      { icon: Pencil, text: 'Edit every line of the plan' },
      { icon: BarChart3, text: 'Reach and frequency for every strategy' },
      { icon: MapPin, text: 'Audiences sized down to the ZIP' },
    ],
    frame: 'Media plan',
    Scene: () => <PlanGridHero narrow />,
  },
  {
    icon: Radio,
    label: 'Buying desk',
    title: 'We buy it and keep it pacing',
    body: 'Approve the plan line by line and Halliard buys it on Meta and streaming TV, checks pacing every six hours and reports back. The fee is 30% of what a freelance buyer would charge, shown before you approve.',
    points: [
      { icon: ShieldCheck, text: 'Nothing goes live without your approval' },
      { icon: Timer, text: 'Pacing checked every six hours' },
      { icon: Clock, text: 'No new hire for your team' },
    ],
    frame: 'Campaigns',
    Scene: LiveScene,
  },
  {
    icon: LineChart,
    label: 'Measurement',
    title: 'Prove what the media did',
    body: 'Show your client what their spend actually moved. Brand studies start at $5,500 and marketing mix models are $25,000, run for your clients and billed through you.',
    points: [
      { icon: CalendarCheck, text: 'Brand studies from $5,500' },
      { icon: BarChart3, text: 'Marketing mix models at $25,000' },
      { icon: LineChart, text: 'Geo-lift tests for channels you can\u2019t click-track' },
    ],
    frame: 'Measurement',
    Scene: LiftScene,
  },
]

function ProductSection() {
  return (
    <section className="py-20 sm:py-28" style={SOFT_BAND}>
      <Container className="max-w-6xl">
        <SectionHeading
          eyebrow="What you'll see"
          title="One partner from brief to proof"
          body="Use one part or all three. Each is priced on its own."
        />
        <ProductRows rows={PRODUCTS} />
      </Container>
    </section>
  )
}

function ProofSection() {
  return (
    <section className="py-16 sm:py-20">
      <Container className="max-w-6xl">
        <div className="mx-auto max-w-3xl">
          <LisaQuote />
        </div>
        <div className="mx-auto mt-14 max-w-3xl text-center">
          <p className="font-display text-2xl font-medium leading-snug text-slate-900 sm:text-3xl">
            &ldquo;Halliard told us our client&rsquo;s Meta was driving zero incremental conversions. We cancelled the wrong
            line item for two years.&rdquo;
          </p>
          <p className="mt-6 text-sm font-medium text-slate-700">Director of Strategy, independent agency</p>
        </div>
      </Container>
    </section>
  )
}

// External link to the same Google Calendar appointment scheduler. Used as a
// fallback when the embedded iframe fails to load (ad-blockers, slow networks,
// third-party cookie blocking) and always shown as a redundant path.
const CALENDAR_FALLBACK_HREF =
  'https://calendar.google.com/calendar/u/0/appointments/schedules/AcZssZ1jtM9RZtwp5-TuTTBbXg9Wkc9VEV1dLDUpVS-ajVsNJOoJSBGQDyd7hZ-S_x7mVHGYpZTRPHW2'

function fireFallbackClick(reason: string) {
  try {
    const w = window as any
    if (w.posthog) {
      w.posthog.capture('demo_booking_fallback_click', { page: '/demo', reason })
    }
  } catch {}
  trackPixel('Lead', {
    content_name: 'demo_booking_fallback_click',
    source: 'demo_lp',
    engagement_tier: 'fallback',
  })
}

function BookingSection() {
  const iframeRef = React.useRef<HTMLIFrameElement>(null)
  const [iframeLoaded, setIframeLoaded] = useState(false)
  const [iframeStuck, setIframeStuck] = useState(false)
  useCalendarEngagementTracking(iframeRef)

  // If the iframe doesn't fire onLoad within 5s, surface a prominent
  // fallback. Ad-blockers and third-party-cookie blocking are the most
  // common reasons — either way, give the visitor a working path.
  useEffect(() => {
    if (iframeLoaded) return
    const t = setTimeout(() => {
      if (!iframeLoaded) {
        setIframeStuck(true)
        try {
          const w = window as any
          if (w.posthog) {
            w.posthog.capture('demo_booking_iframe_stuck', { page: '/demo' })
          }
        } catch {}
      }
    }, 5000)
    return () => clearTimeout(t)
  }, [iframeLoaded])

  return (
    <section id="book" className="py-20 sm:py-28 scroll-mt-20" style={SOFT_BAND}>
      <Container className="">
        <SectionHeading
          eyebrow="Book a demo"
          title="Book a 15-min demo"
          body="Tell us your clients and your biggest media headache. We'll show you how Halliard fits. No deck. No follow-up unless you ask."
        />
        <div className="mt-10 mx-auto max-w-3xl">
          {iframeStuck && (
            <div className="mb-4 rounded-md border border-amber-200 bg-amber-50 p-4 text-sm text-amber-900">
              <p className="font-medium">Calendar didn&rsquo;t load.</p>
              <p className="mt-1">
                Looks like the embedded calendar is blocked.{' '}
                <a
                  href={CALENDAR_FALLBACK_HREF}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => fireFallbackClick('iframe_stuck_banner')}
                  className="underline font-medium hover:text-amber-700"
                >
                  Open the scheduler in a new tab →
                </a>
              </p>
            </div>
          )}
          <div className="rounded-2xl border border-tint overflow-hidden bg-white shadow-lg">
            <iframe
              ref={iframeRef}
              src={CALENDAR_EMBED_SRC}
              style={{ border: 0 }}
              width="100%"
              height="700"
              frameBorder="0"
              title="Book a 15-min Halliard demo"
              onLoad={() => {
                setIframeLoaded(true)
                try {
                  if (typeof window !== 'undefined' && (window as any).posthog) {
                    ;(window as any).posthog.capture('demo_booking_iframe_loaded', {
                      page: '/demo',
                    })
                  }
                } catch {
                  /* swallow */
                }
              }}
            />
          </div>
          {/* Always-visible fallback link — ad-block-proof path to the same
              scheduler, also useful on flaky mobile networks. */}
          <p className="mt-4 text-center text-sm text-slate-500">
            Calendar not loading?{' '}
            <a
              href={CALENDAR_FALLBACK_HREF}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => fireFallbackClick('always_visible_link')}
              className="underline text-primary hover:text-primary/80"
            >
              Open in a new tab →
            </a>
          </p>
        </div>
      </Container>
    </section>
  )
}

function StickyMobileCta() {
  const [show, setShow] = useState(false)
  useEffect(() => {
    function onScroll() {
      setShow(window.scrollY > 400)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [])
  if (!show) return null
  return (
    <div className="fixed bottom-0 inset-x-0 z-40 lg:hidden">
      <div className="bg-white/95 backdrop-blur border-t border-tint shadow-lg px-4 py-3">
        <button
          onClick={() => {
            fireDemoIntent('sticky_mobile')
            scrollToBooking()
          }}
          className="w-full inline-flex items-center justify-center rounded-full bg-primary text-white font-medium py-3 px-4 text-base hover:bg-primary/90 active:bg-primary/80 transition"
        >
          Book a 15-min demo →
        </button>
      </div>
    </div>
  )
}

function DemoPage() {
  useEffect(() => {
    // Hide Intercom chat bubble: the booking calendar is the one conversation this page wants.
    try {
      const w = window as any
      if (w.Intercom) w.Intercom('update', { hide_default_launcher: true })
      // CSS belt-and-suspenders in case Intercom loads after this fires
      const style = document.createElement('style')
      style.id = 'demo-lp-hide-intercom'
      style.innerHTML =
        '.intercom-lightweight-app,.intercom-launcher,.intercom-launcher-frame,#intercom-container{display:none !important;visibility:hidden !important;}'
      document.head.appendChild(style)
      return () => {
        const el = document.getElementById('demo-lp-hide-intercom')
        if (el) el.remove()
      }
    } catch {
      /* never block */
    }
  }, [])

  return (
    <>
      <Head>
        <title>Book a Demo | Halliard: Plan, Buy and Measure Media</title>
        <meta
          name="description"
          content="See Halliard in 15 minutes: a media plan from your brief, a buying desk that buys and paces it, and measurement that proves what it did. Built for independent agencies."
        />
        <meta name="robots" content="noindex,follow" />
        <meta property="og:title" content="Book a Demo | Halliard" />
        <meta
          property="og:description"
          content="Plan it, buy it, prove it worked. Built for independent agencies. Book a 15-min demo."
        />
      </Head>
      <LandingHeader
        href="#book"
        cta="Book a demo"
        onClick={() => {
          fireDemoIntent('header')
        }}
      />
      <main className="pb-24 lg:pb-0">
        <Hero />
        <TrustStrip />
        <ProductSection />
        <ProofSection />
        <BookingSection />
        <StickyMobileCta />
      </main>
    </>
  )
}

;(DemoPage as any).disableNavbar = true
;(DemoPage as any).fullWidth = true
;(DemoPage as any).siteBg = true

export default DemoPage
