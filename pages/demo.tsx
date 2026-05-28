import Head from 'next/head'
import React, { useEffect, useState } from 'react'
import { Container } from '../components/mmm/Container'
import { Button } from '../components/mmm/Button'
import { trackCta } from '../lib/track'
import { trackPixel } from '@/lib/meta-pixel'

function MinimalHeader() {
  // Cold-paid LP header: logo only, no nav, no exit CTAs. The page's own CTAs are the only paths.
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/70 backdrop-blur-sm border-b border-gray-100">
      <Container className="">
        <nav className="relative flex justify-center items-center py-5">
          <img
            src="https://framerusercontent.com/images/s97qQgHpRGf1STgb6vDMgqYNU4.png?scale-down-to=512"
            alt="Halliard"
            className="h-8 w-auto"
          />
        </nav>
      </Container>
    </header>
  )
}

const CALENDAR_EMBED_SRC =
  'https://calendar.google.com/calendar/appointments/schedules/AcZssZ1jtM9RZtwp5-TuTTBbXg9Wkc9VEV1dLDUpVS-ajVsNJOoJSBGQDyd7hZ-S_x7mVHGYpZTRPHW2?gv=true'

const PLUS_PATTERN =
  "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%231a6ab4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")"

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
    <div className="relative overflow-hidden">
      <div
        className="absolute inset-0 opacity-[0.07]"
        style={{ backgroundImage: PLUS_PATTERN, backgroundSize: '18px 18px' }}
      />
      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse at 50% 0%, rgba(211,228,255,0.3) 0%, rgba(255,255,255,0.95) 70%, rgb(255,255,255) 100%)',
        }}
      />
      <Container className="relative pt-28 pb-12 text-center lg:pt-32">
        <div className="mx-auto max-w-3xl">
          <p className="inline-flex items-center gap-2 rounded-full bg-tint px-4 py-1.5 text-sm font-medium text-primary mb-6">
            <span>📍</span> For independent agencies
          </p>
          <h1 className="font-display text-4xl font-medium tracking-tight text-slate-900 sm:text-5xl lg:text-6xl">
            Plan, buy, and measure media{' '}
            <span className="relative text-primary">
              <svg
                aria-hidden="true"
                viewBox="0 0 418 42"
                className="absolute left-0 top-2/3 h-[0.58em] w-full fill-primary/30"
                preserveAspectRatio="none"
              >
                <path d="M203.371.916c-26.013-2.078-76.686 1.963-124.73 9.946L67.3 12.749C35.421 18.062 18.2 21.766 6.004 25.934 1.244 27.561.828 27.778.874 28.61c.07 1.214.828 1.121 9.595-1.176 9.072-2.377 17.15-3.92 39.246-7.496C123.565 7.986 157.869 4.492 195.942 5.046c7.461.108 19.25 1.696 19.17 2.582-.107 1.183-7.874 4.31-25.75 10.366-21.992 7.45-35.43 12.534-36.701 13.884-2.173 2.308-.202 4.407 4.442 4.734 2.654.187 3.263.157 15.593-.78 35.401-2.686 57.944-3.488 88.365-3.143 46.327.526 75.721 2.23 130.788 7.584 19.787 1.924 20.814 1.98 24.557 1.332l.066-.011c1.201-.203 1.53-1.825.399-2.335-2.911-1.31-4.893-1.604-22.048-3.261-57.509-5.556-87.871-7.36-132.059-7.842-23.239-.254-33.617-.116-50.627.674-11.629.54-42.371 2.494-46.696 2.967-2.359.259 8.133-3.625 26.504-9.81 23.239-7.825 27.934-10.149 28.304-14.005.417-4.348-3.529-6-16.878-7.066Z" />
              </svg>
              <span className="relative">in one tool</span>
            </span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg tracking-tight text-slate-700">
            Built for independent agencies. Replace the spreadsheets, see what&rsquo;s actually working,
            and walk into pitches with holdco-grade plans.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row justify-center gap-4">
            <Button
              className=""
              color="blue"
              onClick={() => {
                fireDemoIntent('hero')
                scrollToBooking()
              }}
            >
              Book a 15-min demo →
            </Button>
          </div>

          <p className="mt-5 text-sm text-slate-500">
            15 minutes. No deck. No follow-up unless you ask.
          </p>

          {/* Product screenshot — moved into hero for visual weight */}
          <div className="mx-auto mt-12 max-w-5xl">
            <div className="rounded-xl border border-tint shadow-2xl overflow-hidden bg-white">
              <img
                src="/images/product/flighting.webp"
                alt="Halliard media planning platform — flight planner with channel logos, budget allocation, and Gantt timeline"
                className="w-full h-auto"
              />
            </div>
          </div>
        </div>
      </Container>
    </div>
  )
}

function TrustStrip() {
  return (
    <section className="bg-white pt-8 pb-12 border-b border-tint">
      <Container className="">
        <p className="text-center text-sm font-medium text-slate-500 uppercase tracking-wider">
          The brands our agency customers plan media for
        </p>
        <div className="mt-6 flex flex-wrap items-center justify-center gap-x-12 gap-y-6 grayscale opacity-70">
          <img
            src="/images/client-logos/allen-allen.png"
            alt="Allen &amp; Allen"
            className="h-8 w-auto"
          />
          <img
            src="/images/client-logos/ablenow.png"
            alt="ABLEnow"
            className="h-8 w-auto"
          />
          <img
            src="/images/client-logos/invest529.png"
            alt="Invest529"
            className="h-8 w-auto"
          />
          <img
            src="/images/client-logos/vcu.png"
            alt="VCU"
            className="h-8 w-auto"
          />
          <img
            src="/images/client-logos/ymca.png"
            alt="YMCA"
            className="h-8 w-auto"
          />
        </div>
      </Container>
    </section>
  )
}

function ProofQuote() {
  return (
    <section className="bg-slate-50 py-16">
      <Container className="">
        <div className="mx-auto max-w-3xl text-center">
          <svg
            className="mx-auto h-10 w-10 text-primary/40"
            fill="currentColor"
            viewBox="0 0 32 32"
            aria-hidden="true"
          >
            <path d="M9.352 4C4.456 7.456 1 13.12 1 19.36c0 5.088 3.072 8.064 6.624 8.064 3.36 0 5.856-2.688 5.856-5.856 0-3.168-2.208-5.472-5.088-5.472-.576 0-1.344.096-1.536.192.48-3.264 3.552-7.104 6.624-9.024L9.352 4zm16.512 0c-4.8 3.456-8.256 9.12-8.256 15.36 0 5.088 3.072 8.064 6.624 8.064 3.264 0 5.856-2.688 5.856-5.856 0-3.168-2.304-5.472-5.184-5.472-.576 0-1.248.096-1.44.192.48-3.264 3.456-7.104 6.528-9.024L25.864 4z" />
          </svg>
          <p className="mt-6 font-display text-2xl font-medium text-slate-900 sm:text-3xl leading-snug">
            &ldquo;Halliard told us our client&rsquo;s Meta was driving zero incremental conversions.
            We cancelled the wrong line item for two years.&rdquo;
          </p>
          <p className="mt-6 text-sm font-medium text-slate-700">
            — Director of Strategy, independent agency
          </p>
        </div>
      </Container>
    </section>
  )
}

const VALUE_ITEMS: Array<{ title: string; body: string; img: string; alt: string }> = [
  {
    title: 'Replace your spreadsheets',
    body: 'Plan across 18 channels. Scenarios, versions, and approvals — without 12 tabs.',
    img: '/images/product/flighting.webp',
    alt: 'Halliard flight planner with channel-level budget allocation',
  },
  {
    title: 'See what&rsquo;s actually working',
    body: 'MMM-grade response curves, built in. No $125K Nielsen invoice.',
    img: '/images/product/response-curves.webp',
    alt: 'Halliard response curves dashboard showing channel-level marginal returns',
  },
  {
    title: 'Win more pitches',
    body: 'Plan → Buy → Measure under one roof. The integrated story holdcos pitch — for independents.',
    img: '/images/product/compare.webp',
    alt: 'Halliard scenario comparison view side by side',
  },
]

function ValueRow({
  item,
  reverse,
}: {
  item: { title: string; body: string; img: string; alt: string }
  reverse?: boolean
}) {
  return (
    <div
      className={`flex flex-col ${reverse ? 'lg:flex-row-reverse' : 'lg:flex-row'} items-center gap-10 lg:gap-16`}
    >
      <div className="lg:flex-1">
        <h3
          className="font-display text-2xl sm:text-3xl font-medium text-slate-900"
          dangerouslySetInnerHTML={{ __html: item.title }}
        />
        <p
          className="mt-3 text-lg text-slate-700 leading-relaxed"
          dangerouslySetInnerHTML={{ __html: item.body }}
        />
      </div>
      <div className="lg:flex-1 w-full">
        <div className="rounded-xl border border-tint shadow-lg overflow-hidden bg-white">
          <img src={item.img} alt={item.alt} className="w-full h-auto" />
        </div>
      </div>
    </div>
  )
}

function ValueSection() {
  return (
    <section className="bg-white py-20">
      <Container className="">
        <div className="mx-auto max-w-6xl space-y-20">
          {VALUE_ITEMS.map((item, i) => (
            <ValueRow key={item.title} item={item} reverse={i % 2 === 1} />
          ))}
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
    <section id="book" className="bg-slate-50 py-20 scroll-mt-20">
      <Container className="">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="font-display text-3xl font-medium tracking-tight text-slate-900 sm:text-4xl">
            Book a 15-min demo
          </h2>
          <p className="mt-4 text-lg text-slate-700">
            Tell us your stack and your biggest media pain. We&rsquo;ll show you how Halliard fits.
            No deck. No follow-up unless you ask.
          </p>
        </div>
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
          <div className="rounded-xl border border-tint overflow-hidden bg-white shadow-sm">
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
          className="w-full inline-flex items-center justify-center rounded-md bg-primary text-white font-medium py-3 px-4 text-base hover:bg-primary/90 active:bg-primary/80 transition"
        >
          Book a 15-min demo →
        </button>
      </div>
    </div>
  )
}

function DemoPage() {
  useEffect(() => {
    // Hide Intercom chat bubble — cold-paid LP has zero exit paths.
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
        <title>Book a Demo | Halliard — Media Planning for Independent Agencies</title>
        <meta
          name="description"
          content="See Halliard in 15 minutes. Plan, buy, and measure media in one tool. Built for independent agencies."
        />
        <meta name="robots" content="noindex,follow" />
        <meta property="og:title" content="Book a Demo | Halliard" />
        <meta
          property="og:description"
          content="Plan, buy, and measure media in one tool. Built for independent agencies. Book a 15-min demo."
        />
      </Head>
      <MinimalHeader />
      <main className="pb-24 lg:pb-0">
        <Hero />
        <TrustStrip />
        <ProofQuote />
        <ValueSection />
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
