import Head from 'next/head'
import Link from 'next/link'
import Script from 'next/script'
import { Button } from '../components/mmm/Button'
import { Container } from '../components/mmm/Container'

const SIGN_UP_URL = 'https://app.halliardmedia.com/sign-up'

// Google Ads conversion tracking
function fireSignupConversion(url) {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'conversion', {
      send_to: 'AW-672346912/d-VaCIzdx-waEKDmzMAC',
      value: 100.0,
      currency: 'USD',
      event_callback: function () {
        if (typeof url !== 'undefined') {
          window.location = url
        }
      },
    })
    return false
  }
  return true
}

// ---------------------------------------------------------------------------
// Nav
// ---------------------------------------------------------------------------
function Nav() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <nav className="flex items-center justify-between py-6">
          <Link href="/" aria-label="Home">
            <img
              src="https://framerusercontent.com/images/s97qQgHpRGf1STgb6vDMgqYNU4.png?scale-down-to=512"
              alt="Halliard"
              className="h-7 w-auto"
            />
          </Link>
          <div className="flex items-center gap-6">
            <Link
              href="/trytoday"
              className="hidden sm:inline text-sm font-medium text-white/70 hover:text-white transition-colors"
            >
              See It In Action
            </Link>
            <a
              href={SIGN_UP_URL}
              onClick={(e) => {
                e.preventDefault()
                fireSignupConversion(SIGN_UP_URL)
              }}
              className="inline-flex items-center justify-center rounded-full bg-white px-5 py-2 text-sm font-semibold text-[#263285] hover:bg-white/90 transition-colors"
            >
              Start Planning Free
            </a>
          </div>
        </nav>
      </div>
    </header>
  )
}

// ---------------------------------------------------------------------------
// Hero
// ---------------------------------------------------------------------------
function Hero() {
  return (
    <section className="relative bg-[#263285] overflow-hidden">
      {/* Subtle grid texture */}
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            'linear-gradient(rgba(255,255,255,.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.1) 1px, transparent 1px)',
          backgroundSize: '64px 64px',
        }}
      />
      {/* Gradient wash */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse 80% 60% at 50% 0%, rgba(211,228,255,0.12) 0%, transparent 60%)',
        }}
      />

      <div className="relative mx-auto max-w-7xl px-6 lg:px-8 pt-32 sm:pt-40 pb-20 sm:pb-28">
        <div className="max-w-3xl">
          <h1 className="font-display text-[2.5rem] sm:text-[3.25rem] lg:text-[3.75rem] leading-[1.08] font-medium tracking-tight text-white">
            Your clients are asking &lsquo;did this work?&rsquo;
            <br />
            <span className="text-[#d3e4ff]">
              You shouldn&rsquo;t need 6&nbsp;tools to answer&nbsp;them.
            </span>
          </h1>
          <p className="mt-8 text-lg sm:text-xl leading-relaxed text-white/70 max-w-2xl">
            Halliard replaces your Excel flowcharts, disconnected buying tools, and patchwork
            reporting with one platform&nbsp;&mdash; so you can plan media, track spend, and prove
            results in the same place.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row gap-4">
            <a
              href={SIGN_UP_URL}
              onClick={(e) => {
                e.preventDefault()
                fireSignupConversion(SIGN_UP_URL)
              }}
              className="inline-flex items-center justify-center rounded-full bg-white px-7 py-3 text-sm font-semibold text-[#263285] hover:bg-white/90 transition-colors"
            >
              Start Planning Free
            </a>
            <Link
              href="/trytoday"
              className="inline-flex items-center justify-center rounded-full ring-1 ring-white/25 px-7 py-3 text-sm font-medium text-white hover:ring-white/50 transition-colors"
            >
              See It In Action
              <svg className="ml-2 w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>
        </div>

        {/* Social proof quote */}
        <div className="mt-16 border-l-2 border-[#d3e4ff]/40 pl-6 max-w-xl">
          <p className="text-white/60 text-base italic leading-relaxed">
            &ldquo;It&rsquo;s like having Telmar, Tableau, and Excel all in one interface.&rdquo;
          </p>
          <p className="mt-3 text-white/40 text-sm font-medium tracking-wide uppercase">
            Director of Strategy
          </p>
        </div>

        {/* Hero product shot */}
        <div className="mt-16 sm:mt-20">
          <div className="rounded-xl overflow-hidden ring-1 ring-white/10 shadow-2xl">
            <img
              src="https://framerusercontent.com/images/LYy1CcqUUqNr3V5tUBdRBX8Tc.png"
              alt="Halliard media planning platform"
              className="w-full"
              loading="eager"
            />
          </div>
        </div>
      </div>
    </section>
  )
}

// ---------------------------------------------------------------------------
// Section: Name The Enemy
// ---------------------------------------------------------------------------
function EnemySection() {
  return (
    <section className="bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-start">
          <div>
            <p className="text-sm font-semibold tracking-widest uppercase text-[#263285]/50 mb-4">
              The status quo
            </p>
            <h2 className="font-display text-4xl sm:text-5xl font-medium tracking-tight text-slate-900 leading-[1.1]">
              You know the&nbsp;drill.
            </h2>
          </div>
          <div className="lg:pt-2">
            <p className="text-lg leading-relaxed text-slate-600">
              Build the flowchart in Excel. Email it around for approvals. Copy the numbers into your
              buying system. Pull platform reports into another spreadsheet. Run them through Keen or
              Nielsen. Paste the results into a PowerPoint. Present it to the client.
            </p>
            <p className="mt-6 text-lg leading-relaxed text-slate-600">
              Repeat 30&nbsp;times a year.
            </p>
            <p className="mt-8 font-display text-2xl sm:text-3xl font-medium tracking-tight text-[#263285]">
              256 steps from brief to billing.
              <br />
              That&rsquo;s not a process&nbsp;&mdash; that&rsquo;s a tax on your team&rsquo;s time.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

// ---------------------------------------------------------------------------
// Section: Flowcharting
// ---------------------------------------------------------------------------
function FlowchartSection() {
  return (
    <section className="bg-[#fafbfd] py-24 sm:py-32 overflow-hidden">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-20 items-center">
          <div>
            <p className="text-sm font-semibold tracking-widest uppercase text-[#263285]/50 mb-4">
              Planning
            </p>
            <h2 className="font-display text-4xl sm:text-5xl font-medium tracking-tight text-slate-900 leading-[1.1]">
              Flowcharts that don&rsquo;t live in&nbsp;Excel.
            </h2>
            <p className="mt-6 text-lg leading-relaxed text-slate-600 max-w-lg">
              Build media plans in a real planning tool&nbsp;&mdash; not a spreadsheet someone made in
              2014. Drag channels, set flights, adjust budgets, and see the whole picture.
            </p>
            {/* Quote */}
            <div className="mt-10 border-l-2 border-[#263285]/20 pl-6">
              <p className="text-slate-500 italic leading-relaxed">
                &ldquo;Current Excel-based process is manual and cumbersome. We need a tool that
                reduces errors and gives everyone visibility.&rdquo;
              </p>
              <p className="mt-3 text-sm font-medium text-slate-400 uppercase tracking-wide">
                Media Director
              </p>
            </div>
          </div>
          <div className="relative">
            <div className="rounded-xl overflow-hidden ring-1 ring-slate-200 shadow-xl">
              <img
                src="https://framerusercontent.com/images/Do50VB1Dg8wMM5JKLRuIGrIzoYI.png"
                alt="Halliard flowcharting tool"
                className="w-full"
                loading="lazy"
              />
            </div>
            {/* Offset second screenshot */}
            <div className="hidden lg:block absolute -bottom-12 -right-8 w-3/5 rounded-xl overflow-hidden ring-1 ring-slate-200 shadow-xl">
              <img
                src="https://framerusercontent.com/images/biNbVFzIoeZzMakKat3pZ0svGtw.png"
                alt="Budget input in Halliard"
                className="w-full"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

// ---------------------------------------------------------------------------
// Section: Measurement
// ---------------------------------------------------------------------------
function MeasurementSection() {
  return (
    <section className="bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-20 items-center">
          {/* Image first on large screens (order swap) */}
          <div className="order-2 lg:order-1 relative">
            <div className="rounded-xl overflow-hidden ring-1 ring-slate-200 shadow-xl">
              <img
                src="https://framerusercontent.com/images/6vVS4BRqrWJJFZMzwaumOSjJ2M.png"
                alt="Scenario comparison in Halliard"
                className="w-full"
                loading="lazy"
              />
            </div>
          </div>
          <div className="order-1 lg:order-2">
            <p className="text-sm font-semibold tracking-widest uppercase text-[#263285]/50 mb-4">
              Measurement
            </p>
            <h2 className="font-display text-4xl sm:text-5xl font-medium tracking-tight text-slate-900 leading-[1.1]">
              Know what&rsquo;s actually working.
              <br />
              <span className="text-[#263285]/60">Not what platforms&nbsp;claim.</span>
            </h2>
            <p className="mt-6 text-lg leading-relaxed text-slate-600 max-w-lg">
              Meta says 2,000&nbsp;conversions. Google says 3,000. Your client&rsquo;s sales went up
              4%. Who gets credit? Halliard connects your plans to real business
              outcomes&nbsp;&mdash; marketing mix models, brand studies, and geo-lift tests.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

// ---------------------------------------------------------------------------
// Section: Win Pitches
// ---------------------------------------------------------------------------
function PitchSection() {
  return (
    <section className="bg-[#263285] py-24 sm:py-32 relative overflow-hidden">
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            'linear-gradient(rgba(255,255,255,.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.1) 1px, transparent 1px)',
          backgroundSize: '64px 64px',
        }}
      />
      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-20 items-center">
          <div>
            <p className="text-sm font-semibold tracking-widest uppercase text-[#d3e4ff]/50 mb-4">
              New business
            </p>
            <h2 className="font-display text-4xl sm:text-5xl font-medium tracking-tight text-white leading-[1.1]">
              Walk into the room with data, not gut&nbsp;feel.
            </h2>
            <p className="mt-6 text-lg leading-relaxed text-white/60 max-w-lg">
              Your prospects evaluate you against holding company agencies with billion-dollar tech
              stacks. Halliard gives you the same integrated view.
            </p>
            <div className="mt-10 border-l-2 border-[#d3e4ff]/30 pl-6">
              <p className="text-white/50 italic leading-relaxed">
                &ldquo;I love showing tools like this in business pitches. They make us look
                sharp.&rdquo;
              </p>
              <p className="mt-3 text-sm font-medium text-white/30 uppercase tracking-wide">
                Agency VP
              </p>
            </div>
          </div>
          <div className="rounded-xl overflow-hidden ring-1 ring-white/10 shadow-2xl">
            <img
              src="https://framerusercontent.com/images/5Hfm6BdkFLXUIQw9MBO0RIUD7ks.png"
              alt="Halliard planning view"
              className="w-full"
              loading="lazy"
            />
          </div>
        </div>
      </div>
    </section>
  )
}

// ---------------------------------------------------------------------------
// Section: Affordable MMM
// ---------------------------------------------------------------------------
function MMMSection() {
  return (
    <section className="bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-semibold tracking-widest uppercase text-[#263285]/50 mb-4">
            Accessible analytics
          </p>
          <h2 className="font-display text-4xl sm:text-5xl font-medium tracking-tight text-slate-900 leading-[1.1]">
            Marketing mix modeling shouldn&rsquo;t cost half a million&nbsp;dollars.
          </h2>
          <p className="mt-6 text-lg leading-relaxed text-slate-600">
            Traditional MMM providers charge $50&ndash;250K. Halliard makes MMM accessible at a
            fraction of the cost.
          </p>
        </div>

        {/* Stat callout */}
        <div className="mt-16 mx-auto max-w-xl">
          <div className="relative rounded-2xl bg-[#fafbfd] border border-slate-100 p-10 text-center">
            <p className="font-display text-6xl sm:text-7xl font-medium text-[#263285] tracking-tight">
              2<span className="text-[#263285]/40">/</span>200<span className="text-[#263285]/30">+</span>
            </p>
            <p className="mt-4 text-slate-500 text-base leading-relaxed">
              &ldquo;Only 2 out of our 200+ clients currently use marketing mix modeling.&rdquo;
            </p>
            <p className="mt-2 text-sm font-medium text-slate-400 uppercase tracking-wide">
              GM, Top-10 Independent Agency
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

// ---------------------------------------------------------------------------
// Section: How It Works
// ---------------------------------------------------------------------------
function HowItWorks() {
  const steps = [
    {
      num: '01',
      title: 'Plan',
      description: 'Build flowcharts, set budgets, model scenarios.',
    },
    {
      num: '02',
      title: 'Track',
      description: 'See every dollar from planned to delivered. Real-time.',
    },
    {
      num: '03',
      title: 'Prove',
      description: 'Connect plans to business outcomes with MMM.',
    },
  ]

  return (
    <section className="bg-[#fafbfd] py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <p className="text-sm font-semibold tracking-widest uppercase text-[#263285]/50 mb-4">
          How it works
        </p>
        <h2 className="font-display text-4xl sm:text-5xl font-medium tracking-tight text-slate-900 leading-[1.1] max-w-xl">
          Three steps. One&nbsp;platform.
        </h2>

        <div className="mt-16 grid sm:grid-cols-3 gap-px bg-slate-200 rounded-2xl overflow-hidden ring-1 ring-slate-200">
          {steps.map((step) => (
            <div key={step.num} className="bg-white p-10 sm:p-12">
              <span className="font-display text-5xl font-medium text-[#263285]/15 block mb-6">
                {step.num}
              </span>
              <h3 className="font-display text-xl font-medium text-slate-900 mb-3">
                {step.title}
              </h3>
              <p className="text-slate-500 leading-relaxed">{step.description}</p>
            </div>
          ))}
        </div>

        {/* Full-width product screenshot */}
        <div className="mt-16 rounded-xl overflow-hidden ring-1 ring-slate-200 shadow-xl">
          <img
            src="https://framerusercontent.com/images/ZEuzFtIjwJ18pSQSRR5q6Ky7YjE.png"
            alt="Halliard platform overview"
            className="w-full"
            loading="lazy"
          />
        </div>
      </div>
    </section>
  )
}

// ---------------------------------------------------------------------------
// Section: Who It's For
// ---------------------------------------------------------------------------
function WhoItsFor() {
  return (
    <section className="bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24">
          <div>
            <p className="text-sm font-semibold tracking-widest uppercase text-[#263285]/50 mb-4">
              Built for
            </p>
            <h2 className="font-display text-4xl sm:text-5xl font-medium tracking-tight text-slate-900 leading-[1.1]">
              Independent agencies that plan real&nbsp;media.
            </h2>
            <div className="mt-10 space-y-6">
              {[
                '30–300 person agencies',
                'Cross-channel media — TV, digital, OOH, audio, social',
                'Teams tired of Excel flowcharts',
              ].map((item) => (
                <div key={item} className="flex items-start gap-4">
                  <div className="mt-1.5 h-2 w-2 rounded-full bg-[#263285] flex-shrink-0" />
                  <p className="text-lg text-slate-700">{item}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="lg:pt-4">
            <div className="rounded-2xl bg-slate-50 border border-slate-100 p-10">
              <p className="text-sm font-semibold text-slate-400 uppercase tracking-widest mb-6">
                Not for
              </p>
              <div className="space-y-5">
                {[
                  'Creative-only agencies',
                  'Pure performance shops',
                ].map((item) => (
                  <div key={item} className="flex items-start gap-4">
                    <span className="text-slate-300 mt-0.5 text-lg leading-none">&times;</span>
                    <p className="text-slate-400">{item}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

// ---------------------------------------------------------------------------
// Footer CTA
// ---------------------------------------------------------------------------
function FooterCTA() {
  return (
    <section className="relative bg-[#263285] py-24 sm:py-32 overflow-hidden">
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            'linear-gradient(rgba(255,255,255,.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.1) 1px, transparent 1px)',
          backgroundSize: '64px 64px',
        }}
      />
      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse 60% 50% at 50% 100%, rgba(211,228,255,0.08) 0%, transparent 60%)',
        }}
      />
      <div className="relative mx-auto max-w-7xl px-6 lg:px-8 text-center">
        <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl font-medium tracking-tight text-white leading-[1.1] mx-auto max-w-3xl">
          Your clients are spending millions on&nbsp;media.
          <br />
          <span className="text-[#d3e4ff]/70">Help them see what it&rsquo;s&nbsp;doing.</span>
        </h2>
        <div className="mt-12">
          <a
            href={SIGN_UP_URL}
            onClick={(e) => {
              e.preventDefault()
              fireSignupConversion(SIGN_UP_URL)
            }}
            className="inline-flex items-center justify-center rounded-full bg-white px-8 py-3.5 text-sm font-semibold text-[#263285] hover:bg-white/90 transition-colors"
          >
            Start Planning Free
          </a>
        </div>
      </div>
    </section>
  )
}

// ---------------------------------------------------------------------------
// Minimal footer
// ---------------------------------------------------------------------------
function Footer() {
  return (
    <footer className="bg-[#1a2460] py-10">
      <div className="mx-auto max-w-7xl px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
        <img
          src="https://framerusercontent.com/images/s97qQgHpRGf1STgb6vDMgqYNU4.png?scale-down-to=512"
          alt="Halliard"
          className="h-5 w-auto opacity-50"
        />
        <p className="text-sm text-white/30">
          &copy; {new Date().getFullYear()} Halliard Media. All rights reserved.
        </p>
      </div>
    </footer>
  )
}

// ---------------------------------------------------------------------------
// Page
// ---------------------------------------------------------------------------
export default function MediaPlanningToolPage() {
  return (
    <>
      <Head>
        <title>Media Planning Tool for Independent Agencies | Halliard</title>
        <meta
          name="description"
          content="Plan media, track spend, and prove results in one platform. Halliard replaces your Excel flowcharts and patchwork reporting. Free to start."
        />
        <meta
          property="og:title"
          content="Media Planning Tool for Independent Agencies | Halliard"
        />
        <meta
          property="og:description"
          content="Your clients are asking 'did this work?' You shouldn't need 6 tools to answer them. Plan, track, and prove — all in one place."
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://halliardmedia.com/media-planning-tool" />
        <meta
          property="og:image"
          content="https://framerusercontent.com/images/LYy1CcqUUqNr3V5tUBdRBX8Tc.png"
        />
        <link rel="canonical" href="https://halliardmedia.com/media-planning-tool" />
      </Head>

      <Script id="mpt-conversion" strategy="afterInteractive">
        {`
          function gtag_report_conversion(url) {
            var callback = function () {
              if (typeof(url) != 'undefined') { window.location = url; }
            };
            gtag('event', 'conversion', {
              'send_to': 'AW-672346912/d-VaCIzdx-waEKDmzMAC',
              'value': 100.0,
              'currency': 'USD',
              'event_callback': callback
            });
            return false;
          }
        `}
      </Script>

      <Nav />
      <main>
        <Hero />
        <EnemySection />
        <FlowchartSection />
        <MeasurementSection />
        <PitchSection />
        <MMMSection />
        <HowItWorks />
        <WhoItsFor />
        <FooterCTA />
      </main>
      <Footer />
    </>
  )
}

MediaPlanningToolPage.disableNavbar = true
MediaPlanningToolPage.fullWidth = true
MediaPlanningToolPage.siteBg = true
