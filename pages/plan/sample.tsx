import Head from 'next/head'
import Link from 'next/link'
import React from 'react'
import { ArrowRight, CreditCard, FileText, Home, MapPin, Quote, Search, ShoppingCart, Target } from 'lucide-react'
import { Container } from '../../components/mmm/Container'
import { Button } from '../../components/mmm/Button'
import {
  Accent,
  ClosingCta,
  Frame,
  HeroBackdrop,
  LandingHeader,
  SOFT_BAND,
  useLandingAttribution,
} from '../../components/landing/kit'
import { PlanGridHero } from '../../components/plan/plan-grid-hero'
import { BRIEF_FIELDS, BRIEF_TEXT, MEDIA, RESEARCH, STRATEGIES, TOP_ZIPS } from '../../components/plan/step-visuals'
import { LisaQuote } from '../../components/plan/proof'
import { PLAN_LINKS } from '../../components/plan/nav'

// One plan, start to finish, for someone who wants to see the output before
// they sign up. It is the same illustrative HVAC brief the landing page's
// animations use, read from the same data, so the two never disagree. Not a
// client's plan, and the page says so.

const SECTIONS = [
  { id: 'brief', label: 'The brief' },
  { id: 'audience', label: 'The audience' },
  { id: 'strategies', label: 'The strategies' },
  { id: 'plan', label: 'The plan' },
]

function Chapter({ n, id, title, body }: { n: number; id: string; title: string; body: string }) {
  return (
    <div id={id} className="scroll-mt-28">
      <p className="text-sm font-semibold text-primary">
        {String(n).padStart(2, '0')} · {SECTIONS[n - 1]!.label}
      </p>
      <h2 className="mt-2 font-display text-2xl font-medium tracking-tight text-slate-900 sm:text-3xl">{title}</h2>
      <p className="mt-3 max-w-2xl text-slate-600">{body}</p>
    </div>
  )
}

function Card({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return <div className={`rounded-2xl border border-tint bg-white p-5 shadow-sm sm:p-6 ${className}`}>{children}</div>
}

function Logo({ name, size = 18 }: { name: string; size?: number }) {
  return (
    <img src={`/plan-grid/${name}.png`} alt="" width={size} height={size} className="shrink-0 rounded-[4px]" style={{ width: size, height: size }} />
  )
}

export default function SamplePlanPage() {
  const { track, href } = useLandingAttribution('/plan/sample', { posthog: 'both' })
  return (
    <>
      <Head>
        <title>Sample Media Plan: From One Brief | Halliard</title>
        <meta
          name="description"
          content="See a finished Halliard media plan before you sign up: the brief, the audience down to the ZIP, two strategies and the plan with reach and frequency modelled."
        />
      </Head>
      <LandingHeader href={href} cta="Get your first plan" onClick={() => track('header')} links={PLAN_LINKS} />
      <main>
        {/* HERO */}
        <section className="relative">
          <HeroBackdrop />
          <Container className="relative max-w-6xl pt-32 pb-10 lg:pt-40">
            <div className="mx-auto max-w-3xl text-center">
              <p className="inline-flex items-center gap-2 rounded-full bg-tint px-4 py-1.5 text-sm font-medium text-primary mb-6">
                <FileText className="h-4 w-4" aria-hidden />
                Sample plan
              </p>
              <h1 className="font-display text-4xl font-medium tracking-tight text-slate-900 sm:text-6xl">
                One brief, <Accent>one plan.</Accent>
              </h1>
              <p className="mx-auto mt-6 max-w-2xl text-lg tracking-tight text-slate-700">
                A spring campaign for a family-owned HVAC company in Dallas–Fort Worth, from the brief as it was written to
                the media plan Halliard drafted from it. This is what you get back.
              </p>
              <p className="mt-3 text-sm text-slate-500">An illustrative plan, not a client&rsquo;s.</p>
            </div>
            <nav aria-label="On this page" className="mt-10 flex flex-wrap justify-center gap-2">
              {SECTIONS.map((s, i) => (
                <a
                  key={s.id}
                  href={`#${s.id}`}
                  className="rounded-full border border-tint bg-white/80 px-4 py-1.5 text-sm font-medium text-slate-700 shadow-sm hover:border-primary/40 hover:text-primary"
                >
                  <span className="text-primary">{i + 1}</span> {s.label}
                </a>
              ))}
            </nav>
          </Container>
        </section>

        {/* 01 THE BRIEF */}
        <section className="py-14 sm:py-20">
          <Container className="max-w-6xl">
            <Chapter
              n={1}
              id="brief"
              title="Written the way you would write it to a planner"
              body="No forms. Halliard reads the brief and anything attached, then writes back what it understood, so you can check it before anything is planned."
            />
            <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-2">
              <Card>
                <p className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.6px] text-slate-500">
                  <Quote className="h-3.5 w-3.5" aria-hidden /> In your words
                </p>
                <blockquote className="mt-3 text-lg leading-relaxed text-slate-800">&ldquo;{BRIEF_TEXT}&rdquo;</blockquote>
              </Card>
              <Card>
                <p className="text-xs font-semibold uppercase tracking-[0.6px] text-slate-500">What Halliard read back</p>
                <dl className="mt-3 divide-y divide-slate-100">
                  {BRIEF_FIELDS.map(f => (
                    <div key={f.label} className="flex items-start gap-3 py-2.5">
                      <span className="mt-0.5 inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-tint text-primary">
                        <f.icon className="h-4 w-4" aria-hidden />
                      </span>
                      <dt className="w-32 shrink-0 text-sm text-slate-500">{f.label}</dt>
                      <dd className="text-sm font-medium text-slate-900">{f.value}</dd>
                    </div>
                  ))}
                </dl>
              </Card>
            </div>
          </Container>
        </section>

        {/* 02 THE AUDIENCE */}
        <section className="py-14 sm:py-20" style={SOFT_BAND}>
          <Container className="max-w-6xl">
            <Chapter
              n={2}
              id="audience"
              title="Who they are, where they live, what they watch"
              body="The audience is matched to what a survey panel actually asked, sized one filter at a time, and placed on the map down to the ZIP."
            />
            <Card className="mt-8">
              <div className="flex flex-wrap items-center gap-4 border-b border-slate-100 pb-5">
                <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-tint text-primary">
                  <Home className="h-5 w-5" aria-hidden />
                </span>
                <div className="min-w-0 flex-1">
                  <p className="font-semibold text-slate-900">Northern suburb homeowners</p>
                  <p className="text-sm text-slate-500">Homeowners 35–64 · Dallas–Fort Worth, 18 ZIPs</p>
                </div>
                <div className="text-right">
                  <p className="font-display text-2xl font-medium tabular-nums text-slate-900">412,000</p>
                  <p className="text-xs text-slate-500">people · Halliard panel, 2025</p>
                </div>
              </div>
              <div className="mt-5 grid grid-cols-1 gap-8 md:grid-cols-2">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.6px] text-slate-500">Where they stand out</p>
                  <ul className="mt-3 flex flex-col gap-2.5">
                    {TOP_ZIPS.map(z => (
                      <li key={z.zip} className="flex items-center gap-3 text-sm">
                        <MapPin className="h-4 w-4 shrink-0 text-primary" aria-hidden />
                        <span className="w-32 shrink-0">
                          {z.place} <span className="text-slate-400">{z.zip}</span>
                        </span>
                        <span className="h-2 min-w-0 flex-1 overflow-hidden rounded-full bg-slate-100">
                          <span
                            className="block h-full rounded-full bg-gradient-to-r from-secondary to-primary"
                            style={{ width: `${(Math.min(z.index, 400) / 400) * 100}%` }}
                          />
                        </span>
                        <span className="w-10 shrink-0 text-right font-medium tabular-nums">
                          {z.index >= 400 ? '400+' : z.index}
                        </span>
                      </li>
                    ))}
                  </ul>
                  <p className="mt-3 text-xs text-slate-500">Index against everyone in the area (100 = the same)</p>
                </div>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.6px] text-slate-500">What media they consume</p>
                  <div className="mt-3 overflow-hidden rounded-xl border border-slate-200">
                    <div className="grid grid-cols-[minmax(0,1fr)_4.5rem_4.5rem] bg-slate-50 px-3 py-2 text-[11px] font-semibold uppercase tracking-[0.5px] text-slate-500">
                      <span>Channel or service</span>
                      <span className="text-right">Weekly</span>
                      <span className="text-right">Index</span>
                    </div>
                    {MEDIA.map(m => {
                      const Icon = m.icon
                      return (
                        <div
                          key={m.name}
                          className="grid grid-cols-[minmax(0,1fr)_4.5rem_4.5rem] items-center border-t border-slate-100 px-3 py-2 text-sm"
                        >
                          <span className="flex min-w-0 items-center gap-2">
                            {m.logo ? (
                              <Logo name={m.logo} />
                            ) : Icon ? (
                              <span className="inline-flex h-[18px] w-[18px] items-center justify-center rounded-[4px] bg-tint text-primary">
                                <Icon className="h-3 w-3" aria-hidden />
                              </span>
                            ) : null}
                            <span className="truncate">{m.name}</span>
                          </span>
                          <span className="text-right tabular-nums text-slate-600">{m.reach}%</span>
                          <span className="text-right font-medium tabular-nums">{m.index}</span>
                        </div>
                      )
                    })}
                  </div>
                </div>
              </div>
            </Card>
          </Container>
        </section>

        {/* 03 THE STRATEGIES */}
        <section className="py-14 sm:py-20">
          <Container className="max-w-6xl">
            <Chapter
              n={3}
              id="strategies"
              title="A role for every dollar"
              body="Halliard researched the category before it planned, then wrote each strategy as a job for media, with its own audience, moment, flight and budget."
            />
            <div className="mt-6 flex flex-wrap items-center gap-2 text-sm text-slate-600">
              <Search className="h-4 w-4 text-primary" aria-hidden />
              <span>Researched first:</span>
              {RESEARCH.map(r => (
                <span key={r} className="rounded-full bg-tint px-3 py-1 text-xs font-medium text-primary">
                  {r}
                </span>
              ))}
            </div>
            <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-2">
              {STRATEGIES.map(s => (
                <Card key={s.task}>
                  <div className="flex items-center gap-3">
                    <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-tint text-primary">
                      <s.icon className="h-5 w-5" aria-hidden />
                    </span>
                    <span className="text-sm font-semibold text-primary">{s.task}</span>
                    <span className="ml-auto font-display text-xl font-medium tabular-nums text-slate-900">{s.budget}</span>
                  </div>
                  <p className="mt-4 font-display text-lg text-slate-900">{s.headline}</p>
                  <dl className="mt-4 divide-y divide-slate-100 text-sm">
                    {s.rows.map(([k, v]) => (
                      <div key={k} className="flex gap-3 py-2">
                        <dt className="w-20 shrink-0 text-slate-500">{k}</dt>
                        <dd className="text-slate-800">{v}</dd>
                      </div>
                    ))}
                  </dl>
                  <div className="mt-3 flex flex-wrap items-center gap-2 text-xs text-slate-500">
                    {s.verdict ? (
                      <span className="rounded-full bg-primary px-2.5 py-0.5 font-semibold text-white">{s.verdict}</span>
                    ) : null}
                    <span>Why: {s.sources.join(', ')}</span>
                  </div>
                </Card>
              ))}
            </div>
          </Container>
        </section>

        {/* 04 THE PLAN */}
        <section className="py-14 sm:py-20" style={SOFT_BAND}>
          <Container className="max-w-6xl">
            <Chapter
              n={4}
              id="plan"
              title="The plan, with its reach modelled"
              body="Channels and properties fitted to each strategy, with spend, impressions, CPM, reach and fit on every line. The dial moves budget between a balanced plan and one that reaches the most people."
            />
            <div className="relative mt-8">
              <div
                className="absolute -inset-3 rounded-[2rem] blur-2xl sm:-inset-8"
                style={{ background: 'radial-gradient(ellipse at 60% 40%, rgba(26,106,180,0.16) 0%, rgba(211,228,255,0.3) 45%, transparent 75%)' }}
                aria-hidden
              />
              <div className="relative">
                <Frame label="Media plan" hero>
                  <PlanGridHero />
                </Frame>
              </div>
            </div>
          </Container>
        </section>

        {/* WHAT NEXT */}
        <section className="py-14 sm:py-20">
          <Container className="max-w-5xl">
            <div className="text-center">
              <h2 className="font-display text-2xl font-medium tracking-tight text-slate-900 sm:text-3xl">
                Then the plan is yours
              </h2>
            </div>
            <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2">
              <Card>
                <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-tint text-primary">
                  <Target className="h-5 w-5" aria-hidden />
                </span>
                <h3 className="mt-4 font-display text-lg text-slate-900">Buy it the way you do today</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">
                  Take the plan to your own buyers and platforms. Planning is free to start.
                </p>
              </Card>
              <Card>
                <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-tint text-primary">
                  <ShoppingCart className="h-5 w-5" aria-hidden />
                </span>
                <h3 className="mt-4 font-display text-lg text-slate-900">
                  Or have Halliard buy it <span className="text-sm font-normal text-slate-400">(optional)</span>
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">
                  Halliard buys it on Meta and PubMatic and keeps it pacing. You approve every line first, and the fee
                  shows before you do.{' '}
                  <Link href="/buying-desk/pricing" className="font-semibold text-primary hover:underline">
                    How the fee works →
                  </Link>
                </p>
              </Card>
            </div>
            <div className="mt-10 flex flex-col items-center gap-3">
              <Button href={href} color="blue" className="px-6 py-3 text-base" onClick={() => track('sample')}>
                Get your own plan
                <ArrowRight className="ml-2 h-4 w-4" aria-hidden />
              </Button>
              <p className="flex items-center gap-2 text-sm text-slate-500">
                <CreditCard className="h-4 w-4" aria-hidden /> Free to start · No credit card
              </p>
            </div>
            <div className="mx-auto mt-14 max-w-3xl">
              <LisaQuote />
            </div>
          </Container>
        </section>

        <ClosingCta
          title="Send your first brief to Halliard."
          subtitle="Plan it free. Have us buy it if you want."
          cta="Get your first plan"
          href={href}
          onClick={() => track('closing')}
        />
      </main>
    </>
  )
}

;(SamplePlanPage as any).disableNavbar = true
;(SamplePlanPage as any).fullWidth = true
;(SamplePlanPage as any).siteBg = true
