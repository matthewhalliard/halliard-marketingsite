import Head from 'next/head'
import Link from 'next/link'
import { Button } from '../components/mmm/Button'
import { Container } from '../components/mmm/Container'

const SIGN_UP_URL = 'https://app.halliardmedia.com/sign-up'

const PLUS_PATTERN = "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%231a6ab4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")"

const FEATURES = [
  {
    anchor: 'plan',
    number: '01',
    kicker: 'Plan',
    title: 'Visual flowcharts in minutes, not hours.',
    blurb:
      'Drag flights across every channel, see budget roll-ups and reach update in real time, and export a client-ready plan with one click. No more rebuilding the same PowerPoint at 11pm.',
    bullets: [
      'Visual flowchart builder with Gantt timeline',
      'Multi-channel scheduling with real network logos',
      'Reach, frequency, and revenue estimation',
      'Client-ready PDF exports',
    ],
    image: '/features/plan.png',
    alt: 'Halliard visual media flowchart with Gantt timeline across Streaming TV, Streaming Audio, Paid Social, and Online Video',
  },
  {
    anchor: 'compare',
    number: '02',
    kicker: 'Compare',
    title: 'Three scenarios, side by side.',
    blurb:
      'See exactly how shifting spend between channels changes reach, frequency, and revenue. Answer "what if we moved $200K from TV to CTV?" in seconds, not a week.',
    bullets: [
      'Run up to three budget scenarios simultaneously',
      'Auto-calculated reach and frequency diffs',
      'Channel-level spend breakdowns with delta pills',
      'One-click base plan switching',
    ],
    image: '/features/compare.png',
    alt: 'Scenario comparison view showing Current Plan vs Video Heavy vs Social First with reach, frequency, revenue, and channel spend deltas',
  },
  {
    anchor: 'optimize',
    number: '03',
    kicker: 'Optimize',
    title: 'Know where the next dollar does the most.',
    blurb:
      'Halliard builds a diminishing returns curve for every channel and tells you exactly where to shift spend for the biggest revenue lift. MMM-powered, no six-figure consulting engagement required.',
    bullets: [
      'Response curves per channel, powered by MMM',
      'AI spend reallocation recommendations',
      'Current vs. optimal spend markers',
      'Projected revenue impact per shift',
    ],
    image: '/features/optimize.png',
    alt: 'Response curves chart showing diminishing returns for Streaming TV, Paid Social, and Streaming Audio with current and optimal spend markers',
  },
  {
    anchor: 'measure',
    number: '04',
    kicker: 'Measure',
    title: 'Platform numbers vs. actual revenue.',
    blurb:
      'Connect your data warehouse and see funnel-stage performance alongside MMM-attributed revenue. No more hedging when the CMO asks if the campaign actually worked.',
    bullets: [
      'Direct connection to Snowflake, BigQuery, Domo',
      'Funnel-stage performance: Awareness to Conversion',
      'MMM-attributed revenue per channel',
      'Blended CPM and ROAS tracking',
    ],
    image: '/features/measure.png',
    alt: 'Campaign performance dashboard with KPI wells, funnel performance, and channel attribution table showing ROAS per channel',
  },
  {
    anchor: 'buy',
    number: '05',
    kicker: 'Buy',
    title: 'Every buy, every dollar, tracked.',
    blurb:
      'Vendor-level status, real-time pacing, and full fee transparency so you catch overspend before it blows the quarter and answer "where did the money go" in one screen.',
    bullets: [
      'Vendor-level buy status and delivery tracking',
      'Real-time pacing with color-coded alerts',
      'Fee transparency: agency, DSP, data, verification',
      'Weekly spend allocation and reconciliation',
    ],
    image: '/features/buy.png',
    alt: 'Buy tracking table showing planned vs delivered spend, pacing bars, status pills, and fee transparency for Netflix, Hulu, Spotify, Facebook, TikTok, and YouTube',
  },
  {
    anchor: 'collaborate',
    number: '06',
    kicker: 'Collaborate',
    title: 'Every edit tracked. Every approval logged.',
    blurb:
      'Full version history with visual diffs, approval workflows, and plain-English change summaries. Roll back any plan to any version. Audit-ready by default.',
    bullets: [
      'Full version history with visual diff viewer',
      'User-level audit trail and role-based access',
      'Approval workflows and status tracking',
      'Plain-English change summaries on every edit',
    ],
    image: '/features/collaborate.png',
    alt: 'Version history panel showing planners, approvers, and clients with edits, comments, approvals, and revision requests across a campaign plan',
  },
]

function Hero() {
  return (
    <div className="relative overflow-hidden">
      <div className="absolute inset-0 opacity-[0.07]" style={{ backgroundImage: PLUS_PATTERN, backgroundSize: '18px 18px' }} />
      <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse at 50% 0%, rgba(211,228,255,0.3) 0%, rgba(255,255,255,0.95) 70%, rgb(255,255,255) 100%)' }} />
      <Container className="relative pt-32 pb-16 text-center lg:pt-40">
        <div className="mx-auto max-w-3xl">
          <p className="inline-flex items-center gap-2 rounded-full bg-tint px-4 py-1.5 text-sm font-medium text-primary mb-6">
            <span>⚙️</span> Six tools. One platform. Zero spreadsheets.
          </p>
          <h1 className="font-display text-5xl font-medium tracking-tight text-slate-900 sm:text-6xl lg:text-7xl">
            Everything you need to plan,{' '}
            <span className="relative text-primary">
              <span className="relative">buy, and prove.</span>
            </span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg tracking-tight text-slate-700">
            From visual flowcharts to MMM-attributed revenue, Halliard replaces the patchwork of spreadsheets, PDFs, and
            one-off tools with a single platform built for how media teams actually work.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row justify-center gap-4">
            <Button href={SIGN_UP_URL} color="blue" className="">
              Start Planning Free
            </Button>
            <Button href="/trytoday" variant="outline" color="slate" className="">
              See it in action
            </Button>
          </div>
        </div>
      </Container>
    </div>
  )
}

function FeatureSections() {
  return (
    <div className="bg-white">
      {FEATURES.map((f, i) => {
        const reverse = i % 2 === 1
        return (
          <section
            id={f.anchor}
            key={f.anchor}
            className={`py-20 ${i % 2 === 1 ? 'bg-slate-50' : 'bg-white'} scroll-mt-24`}
          >
            <Container className="">
              <div className={`flex flex-col ${reverse ? 'lg:flex-row-reverse' : 'lg:flex-row'} gap-12 items-center`}>
                {/* Copy */}
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="text-sm font-semibold text-primary tracking-widest">{f.number}</span>
                    <span className="text-sm font-semibold text-slate-500 uppercase tracking-wider">{f.kicker}</span>
                  </div>
                  <h2 className="font-display text-4xl font-medium tracking-tight text-slate-900 sm:text-5xl">
                    {f.title}
                  </h2>
                  <p className="mt-4 text-lg text-slate-700">{f.blurb}</p>
                  <ul className="mt-6 space-y-3">
                    {f.bullets.map((b) => (
                      <li key={b} className="flex items-start gap-3">
                        <svg className="mt-1.5 h-4 w-4 flex-shrink-0 text-primary" viewBox="0 0 16 16" fill="currentColor">
                          <path d="M6.5 10.5L3.5 7.5L2.5 8.5L6.5 12.5L13.5 5.5L12.5 4.5L6.5 10.5Z" />
                        </svg>
                        <span className="text-slate-700">{b}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                {/* Visual */}
                <div className="flex-1 w-full">
                  <div className="rounded-xl overflow-hidden shadow-xl ring-1 ring-slate-900/5">
                    <img src={f.image} alt={f.alt} className="w-full h-auto block" />
                  </div>
                </div>
              </div>
            </Container>
          </section>
        )
      })}
    </div>
  )
}

function IntegrationsStrip() {
  const integrations = [
    'Snowflake',
    'BigQuery',
    'Domo',
    'Google Ads',
    'Meta',
    'The Trade Desk',
    'PubMatic',
    'Nielsen',
  ]
  return (
    <section className="py-16 bg-white border-t border-slate-100">
      <Container className="">
        <div className="mx-auto max-w-3xl text-center mb-10">
          <h3 className="font-display text-3xl font-medium text-slate-900">
            Connects to the stack you already run on.
          </h3>
          <p className="mt-3 text-slate-600">
            Pull in your data, your platforms, your measurement — no CSV exports required.
          </p>
        </div>
        <div className="flex flex-wrap justify-center gap-3">
          {integrations.map((name) => (
            <div
              key={name}
              className="px-5 py-3 bg-slate-50 border border-slate-200 rounded-lg text-sm font-semibold text-slate-700"
            >
              {name}
            </div>
          ))}
        </div>
      </Container>
    </section>
  )
}

function SecuritySection() {
  const items = [
    { title: 'SSO & SAML', desc: 'Enterprise SSO on the Agency plan. Okta, Azure AD, Google Workspace.' },
    { title: 'Role-based access', desc: 'Planner, approver, admin, and view-only roles across every account and plan.' },
    { title: 'Full audit trail', desc: 'Every edit, approval, and rollback logged. Audit-ready on day one.' },
    { title: 'Your data stays yours', desc: 'Warehouse connections stay in your account. We don\u2019t resell or model on your data.' },
  ]
  return (
    <section className="py-20 bg-slate-50 border-t border-slate-100">
      <Container className="">
        <div className="mx-auto max-w-3xl text-center mb-12">
          <h3 className="font-display text-3xl font-medium text-slate-900">
            Built for agencies and marketing teams that take security seriously.
          </h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {items.map((i) => (
            <div key={i.title} className="bg-white border border-slate-200 rounded-xl p-6">
              <h4 className="text-base font-semibold text-slate-900 mb-2">{i.title}</h4>
              <p className="text-sm text-slate-600">{i.desc}</p>
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
            Stop stitching tools together.
          </h2>
          <p className="mt-4 text-lg text-slate-700">
            Free to start. No credit card. No demo call required.
          </p>
          <div className="mt-8 flex justify-center gap-4">
            <Button href={SIGN_UP_URL} color="blue" className="">
              Start Planning Free
            </Button>
            <Button href="/trytoday" variant="outline" color="slate" className="">
              See it in action
            </Button>
          </div>
        </div>
      </Container>
    </section>
  )
}

export default function FeaturesPage() {
  return (
    <>
      <Head>
        <title>Features — Halliard Media Planning Platform</title>
        <meta
          name="description"
          content="Explore every feature of the Halliard media planning platform: visual flowcharts, scenario comparison, response curves, MMM measurement, buy tracking, and version control."
        />
      </Head>
      <main>
        <Hero />
        <FeatureSections />
        <IntegrationsStrip />
        <SecuritySection />
        <FinalCTA />
      </main>
    </>
  )
}
