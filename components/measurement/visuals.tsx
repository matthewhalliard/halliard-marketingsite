import React from 'react'
import { ArrowRight, CheckCircle2, Mic, Monitor, Signpost, TriangleAlert } from 'lucide-react'
import { appear, prog, useTimeline } from '../plan/motion'

/**
 * Looping scenes for the measurement pages, in the planning pages' visual
 * language: a portal readout that builds itself while on screen and holds its
 * finished frame under reduced motion. The numbers are illustrative unless a
 * page states them; frames say "Example" where they are.
 */

const NAVY = 'rgb(38,50,133)'
const BLUE = 'rgb(26,106,180)'
const TINT = 'rgb(211,228,255)'
const GREY = 'rgb(148,163,184)'

function Scene({ children, innerRef, opacity }: { children: React.ReactNode; innerRef: React.Ref<HTMLDivElement>; opacity: number }) {
  return (
    <div ref={innerRef} className="text-[12px] text-slate-700" aria-hidden>
      <div style={{ opacity }}>{children}</div>
    </div>
  )
}

function Header({ title, tag }: { title: string; tag: string }) {
  return (
    <div className="flex items-center justify-between">
      <span className="font-semibold text-slate-900">{title}</span>
      <span className="rounded-full bg-tint/60 px-2 py-0.5 text-[10.5px] font-medium text-primary">{tag}</span>
    </div>
  )
}

/** A curve's points, drawn up to `p` of the way along. */
function partialPath(pts: (readonly [number, number])[], p: number) {
  const shown = pts.slice(0, Math.max(2, Math.ceil(p * pts.length)))
  return shown.map(([x, y], i) => `${i ? 'L' : 'M'}${x.toFixed(1)},${y.toFixed(1)}`).join('')
}

// ---------------------------------------------------------------- /mmm

const CURVES = [
  { name: 'Streaming TV', top: 0.92, k: 0.32, color: NAVY },
  { name: 'Paid search', top: 0.62, k: 0.18, color: BLUE },
  { name: 'Podcasts', top: 0.36, k: 0.4, color: 'rgb(99,140,214)' },
]

const CONTRIBUTION = [
  { name: 'Streaming TV', value: 1.24, label: '+$1.24M' },
  { name: 'Paid search', value: 0.84, label: '+$840K' },
  { name: 'Podcasts', value: 0.31, label: '+$310K' },
  { name: 'Meta prospecting', value: 0, label: 'No measurable impact', claim: 'Platform reported 2,000 conversions' },
]

/** A mix model readout: response curves draw in, then each channel's incremental revenue. */
export function MixModelScene() {
  const { ref, t, opacity } = useTimeline(10000)
  const W = 240
  const H = 96
  const curve = (top: number, k: number) =>
    Array.from({ length: 41 }, (_, i) => {
      const x = i / 40
      const y = top * (1 - Math.exp(-x / k))
      return [10 + x * (W - 20), H - 8 - y * (H - 18)] as const
    })
  // Where streaming TV's curve flattens: past this point each extra dollar adds little.
  const satX = 0.62
  const sat = [10 + satX * (W - 20), H - 8 - CURVES[0]!.top * (1 - Math.exp(-satX / CURVES[0]!.k)) * (H - 18)] as const
  return (
    <Scene innerRef={ref} opacity={opacity}>
      <Header title="Response curves" tag="Causal model" />
      <svg viewBox={`0 0 ${W} ${H}`} className="mt-2 block w-full">
        <line x1="10" y1={H - 8} x2={W - 10} y2={H - 8} stroke={TINT} strokeWidth="1.5" />
        <line x1="10" y1="6" x2="10" y2={H - 8} stroke={TINT} strokeWidth="1.5" />
        {CURVES.map((c, i) => (
          <path
            key={c.name}
            d={partialPath(curve(c.top, c.k), prog(t, 300 + i * 500, 2200))}
            fill="none"
            stroke={c.color}
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        ))}
        <g style={{ opacity: prog(t, 2900, 400) }}>
          <line x1={sat[0]} y1={sat[1]} x2={sat[0]} y2={H - 8} stroke={NAVY} strokeWidth="1" strokeDasharray="3 3" />
          <circle cx={sat[0]} cy={sat[1]} r="3.6" fill="#fff" stroke={NAVY} strokeWidth="1.8" />
          <text
            x={sat[0] - 6}
            y={sat[1] - 8}
            fontSize="8.5"
            fill={NAVY}
            fontWeight={600}
            textAnchor="end"
            stroke="#fff"
            strokeWidth="3"
            paintOrder="stroke"
          >
            Diminishing returns
          </text>
        </g>
        <text x={W - 10} y={H - 1} fontSize="7.5" fill={GREY} textAnchor="end">
          Spend →
        </text>
      </svg>
      <div className="mt-1 flex flex-wrap gap-x-3 gap-y-1 text-[10.5px] text-slate-500">
        {CURVES.map(c => (
          <span key={c.name} className="inline-flex items-center gap-1.5">
            <span className="h-1.5 w-3 rounded-full" style={{ background: c.color }} />
            {c.name}
          </span>
        ))}
      </div>
      <div className="mt-4 border-t border-tint pt-3">
        <p className="text-[10.5px] font-semibold uppercase tracking-wide text-slate-500">Incremental revenue by channel</p>
        <ul className="mt-2 flex flex-col gap-2">
          {CONTRIBUTION.map((row, i) => {
            const at = 3600 + i * 550
            const zero = row.value === 0
            return (
              <li key={row.name} style={appear(t, at)}>
                <div className="grid grid-cols-[7.5rem_minmax(0,1fr)_auto] items-center gap-3">
                  <span className="truncate text-slate-700">{row.name}</span>
                  <span className="h-2.5 overflow-hidden rounded-full bg-slate-100">
                    <span
                      className="block h-full rounded-full bg-primary"
                      style={{ width: `${(row.value / 1.24) * 100 * prog(t, at, 900)}%` }}
                    />
                  </span>
                  <span className={`text-[11px] font-semibold ${zero ? 'text-amber-700' : 'text-primary'}`}>{row.label}</span>
                </div>
                {row.claim ? (
                  <p className="mt-1 inline-flex items-center gap-1 text-[10.5px] text-amber-700" style={appear(t, at + 700)}>
                    <TriangleAlert className="h-3 w-3" aria-hidden /> {row.claim}
                  </p>
                ) : null}
              </li>
            )
          })}
        </ul>
      </div>
    </Scene>
  )
}

const MOVES = [
  { name: 'Niche display', before: 120, after: 0 },
  { name: 'Programmatic trade desk', before: 80, after: 0 },
  { name: 'Streaming TV', before: 150, after: 270 },
  { name: 'Paid search', before: 100, after: 180 },
]

/** The model's recommendation applied: spend leaves channels with no impact for ones with proven impact. */
export function ReallocationScene() {
  const { ref, t, opacity } = useTimeline(9000)
  const max = 270
  const shift = prog(t, 1600, 2200)
  return (
    <Scene innerRef={ref} opacity={opacity}>
      <Header title="Budget recommendation" tag="From the model" />
      <div className="mt-3 flex items-center gap-4 text-[10.5px] text-slate-500">
        <span className="inline-flex items-center gap-1.5">
          <span className="h-2 w-3 rounded-sm bg-slate-300" /> Before
        </span>
        <span className="inline-flex items-center gap-1.5">
          <span className="h-2 w-3 rounded-sm bg-primary" /> After
        </span>
      </div>
      <ul className="mt-3 flex flex-col gap-3">
        {MOVES.map((m, i) => {
          const now = m.before + (m.after - m.before) * shift
          const cut = m.after < m.before
          return (
            <li key={m.name} style={appear(t, 200 + i * 250)}>
              <div className="flex items-baseline justify-between">
                <span className="text-slate-700">{m.name}</span>
                <span className={`text-[11px] font-semibold ${cut ? 'text-slate-400' : 'text-primary'}`}>
                  ${m.before}K <ArrowRight className="inline h-3 w-3 align-[-2px]" aria-hidden /> ${Math.round(now)}K
                </span>
              </div>
              <div className="relative mt-1 h-2.5 rounded-full bg-slate-100">
                <span className="absolute inset-y-0 left-0 rounded-full bg-slate-300" style={{ width: `${(m.before / max) * 100}%` }} />
                <span className="absolute inset-y-0 left-0 rounded-full bg-primary" style={{ width: `${(now / max) * 100}%`, opacity: 0.9 }} />
              </div>
            </li>
          )
        })}
      </ul>
      <div className="mt-4 flex items-center gap-1.5 border-t border-tint pt-3 text-[11px] font-medium text-primary" style={appear(t, 4200)}>
        <CheckCircle2 className="h-3.5 w-3.5" aria-hidden /> $200K moved to channels with proven impact
      </div>
    </Scene>
  )
}

// ---------------------------------------------------------------- /brand-studies

const LIFT_METRICS = [
  { name: 'Aided awareness', control: 61, exposed: 76 },
  { name: 'Consideration', control: 34, exposed: 43 },
  { name: 'Preference', control: 22, exposed: 28 },
]

/** A brand lift readout: people who saw the campaign against people who didn't, metric by metric. */
export function BrandLiftScene() {
  const { ref, t, opacity } = useTimeline(9000)
  return (
    <Scene innerRef={ref} opacity={opacity}>
      <Header title="Brand lift study" tag="Exposed vs. control" />
      <div className="mt-3 flex items-center gap-4 text-[10.5px] text-slate-500">
        <span className="inline-flex items-center gap-1.5">
          <span className="h-2 w-3 rounded-sm bg-slate-300" /> Didn&rsquo;t see the campaign
        </span>
        <span className="inline-flex items-center gap-1.5">
          <span className="h-2 w-3 rounded-sm bg-primary" /> Saw it
        </span>
      </div>
      <ul className="mt-4 flex flex-col gap-4">
        {LIFT_METRICS.map((m, i) => {
          const at = 300 + i * 700
          const p = prog(t, at, 1200)
          const lift = m.exposed - m.control
          return (
            <li key={m.name}>
              <div className="flex items-baseline justify-between">
                <span className="text-slate-700">{m.name}</span>
                <span
                  className="rounded-full bg-tint/70 px-2 py-0.5 text-[11px] font-semibold text-primary"
                  style={appear(t, at + 1100)}
                >
                  +{lift} pts
                </span>
              </div>
              <div className="mt-1.5 flex flex-col gap-1">
                <div className="flex items-center gap-2">
                  <span className="h-2.5 flex-1 overflow-hidden rounded-full bg-slate-100">
                    <span className="block h-full rounded-full bg-slate-300" style={{ width: `${m.control * p}%` }} />
                  </span>
                  <span className="w-8 text-right text-[10.5px] text-slate-500">{Math.round(m.control * p)}%</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="h-2.5 flex-1 overflow-hidden rounded-full bg-slate-100">
                    <span className="block h-full rounded-full bg-primary" style={{ width: `${m.exposed * p}%` }} />
                  </span>
                  <span className="w-8 text-right text-[10.5px] font-semibold text-primary">{Math.round(m.exposed * p)}%</span>
                </div>
              </div>
            </li>
          )
        })}
      </ul>
      <div className="mt-4 grid grid-cols-3 gap-3 border-t border-tint pt-3" style={appear(t, 3400)}>
        <div>
          <p className="text-[10.5px] text-slate-500">Sample</p>
          <p className="font-display text-base text-slate-900">1,200</p>
        </div>
        <div>
          <p className="text-[10.5px] text-slate-500">Confidence</p>
          <p className="font-display text-base text-slate-900">95%</p>
        </div>
        <div>
          <p className="text-[10.5px] text-slate-500">Results in</p>
          <p className="font-display text-base text-slate-900">3 weeks</p>
        </div>
      </div>
    </Scene>
  )
}

const SEGMENTS = [
  { name: 'Men 18–34', value: 47 },
  { name: 'Men 35+', value: 44 },
  { name: 'Women 18–34', value: 29, gap: true },
  { name: 'Women 35+', value: 31, gap: true },
]

/** Consideration by audience segment, with the segment that lags flagged for the creative team. */
export function SegmentGapScene() {
  const { ref, t, opacity } = useTimeline(9000)
  return (
    <Scene innerRef={ref} opacity={opacity}>
      <Header title="Consideration by segment" tag="Breakdown" />
      <ul className="mt-4 flex flex-col gap-3">
        {SEGMENTS.map((s, i) => {
          const at = 300 + i * 400
          const p = prog(t, at, 1100)
          const flagged = s.gap && t > 2600
          return (
            <li key={s.name} className="grid grid-cols-[6.5rem_minmax(0,1fr)_2.5rem] items-center gap-3">
              <span className={flagged ? 'font-medium text-amber-800' : 'text-slate-700'}>{s.name}</span>
              <span
                className={`h-3 overflow-hidden rounded-full ${flagged ? 'bg-amber-50 ring-1 ring-amber-300' : 'bg-slate-100'}`}
              >
                <span
                  className={`block h-full rounded-full transition-colors duration-500 ${flagged ? 'bg-amber-400' : 'bg-primary'}`}
                  style={{ width: `${(s.value / 50) * 100 * p}%` }}
                />
              </span>
              <span className={`text-right text-[11px] font-semibold ${flagged ? 'text-amber-800' : 'text-primary'}`}>
                {Math.round(s.value * p)}%
              </span>
            </li>
          )
        })}
      </ul>
      <div className="mt-4 rounded-lg border border-amber-200 bg-amber-50 px-3 py-2 text-[11px] text-amber-900" style={appear(t, 2900)}>
        <span className="inline-flex items-center gap-1.5 font-semibold">
          <TriangleAlert className="h-3.5 w-3.5" aria-hidden /> Gap: women 15 pts behind men
        </span>
        <p className="mt-0.5 text-amber-800">Recommendation: test creative built for women 18–34.</p>
      </div>
    </Scene>
  )
}

// ---------------------------------------------------------------- /incrementality-testing

// A rough grid of markets: 1 test, 2 control, 0 not in the test.
const MARKETS = [
  0, 2, 1, 0, 2, 0, 1, 0,
  1, 0, 2, 1, 0, 2, 0, 2,
  0, 1, 0, 2, 1, 0, 1, 0,
]

/** A geo-lift test: markets split into test and control, then the two lines part after launch. */
export function GeoLiftScene() {
  const { ref, t, opacity } = useTimeline(10000)
  const W = 240
  const H = 80
  const weeks = 9
  const launch = 3
  const series = (lift: number) =>
    Array.from({ length: weeks * 4 + 1 }, (_, i) => {
      const w = i / 4
      const base = 0.45 + 0.08 * Math.sin(w * 1.3) + 0.03 * Math.sin(w * 3.1)
      const up = w > launch ? lift * Math.min(1, (w - launch) / 2.5) : 0
      return [10 + (w / weeks) * (W - 20), H - 8 - (base + up) * (H - 20)] as const
    })
  const draw = prog(t, 1800, 3200)
  const launchX = 10 + (launch / weeks) * (W - 20)
  return (
    <Scene innerRef={ref} opacity={opacity}>
      <Header title="Geo-lift test" tag="Test vs. control markets" />
      <div className="mt-3 grid grid-cols-8 gap-1">
        {MARKETS.map((m, i) => (
          <span
            key={i}
            className={`h-4 rounded-[3px] transition-colors duration-500 ${
              t < 300 + i * 40 || m === 0 ? 'bg-slate-100' : m === 1 ? 'bg-primary' : 'bg-tint'
            }`}
          />
        ))}
      </div>
      <div className="mt-2 flex gap-4 text-[10.5px] text-slate-500">
        <span className="inline-flex items-center gap-1.5">
          <span className="h-2 w-3 rounded-sm bg-primary" /> Test markets
        </span>
        <span className="inline-flex items-center gap-1.5">
          <span className="h-2 w-3 rounded-sm bg-tint" /> Control markets
        </span>
      </div>
      <svg viewBox={`0 0 ${W} ${H}`} className="mt-3 block w-full">
        <line x1="10" y1={H - 8} x2={W - 10} y2={H - 8} stroke={TINT} strokeWidth="1.5" />
        <g style={{ opacity: prog(t, 1600, 300) }}>
          <line x1={launchX} y1="4" x2={launchX} y2={H - 8} stroke={GREY} strokeWidth="1" strokeDasharray="3 3" />
          <text x={launchX + 4} y="11" fontSize="8" fill={GREY}>
            Campaign starts
          </text>
        </g>
        <path d={partialPath(series(0), draw)} fill="none" stroke="rgb(165,190,235)" strokeWidth="2.2" strokeLinecap="round" />
        <path d={partialPath(series(0.22), draw)} fill="none" stroke={NAVY} strokeWidth="2.2" strokeLinecap="round" />
      </svg>
      <div className="mt-3 grid grid-cols-3 gap-3 border-t border-tint pt-3" style={appear(t, 5200)}>
        <div>
          <p className="text-[10.5px] text-slate-500">Incremental lift</p>
          <p className="font-display text-lg text-primary">+18%</p>
        </div>
        <div>
          <p className="text-[10.5px] text-slate-500">Confidence</p>
          <p className="font-display text-lg text-slate-900">95%</p>
        </div>
        <div>
          <p className="text-[10.5px] text-slate-500">Read in</p>
          <p className="font-display text-lg text-slate-900">4 weeks</p>
        </div>
      </div>
    </Scene>
  )
}

const CHANNEL_TESTS = [
  { icon: Signpost, name: 'Billboards', lift: 12, control: 70 },
  { icon: Mic, name: 'Podcasts', lift: 9, control: 74 },
  { icon: Monitor, name: 'Streaming TV', lift: 21, control: 64 },
]

/** One test result per hard-to-measure channel: test markets against control. */
export function ChannelLiftScene() {
  const { ref, t, opacity } = useTimeline(9000)
  return (
    <Scene innerRef={ref} opacity={opacity}>
      <Header title="Lift by channel" tag="Geo-lift results" />
      <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-3">
        {CHANNEL_TESTS.map((c, i) => {
          const at = 300 + i * 600
          const p = prog(t, at, 1200)
          const test = c.control * (1 + c.lift / 100)
          return (
            <div key={c.name} className="rounded-xl border border-tint bg-gradient-to-b from-tint/30 to-white p-3" style={appear(t, at - 200)}>
              <div className="flex items-center gap-2">
                <span className="inline-flex h-7 w-7 items-center justify-center rounded-lg bg-tint text-primary">
                  <c.icon className="h-3.5 w-3.5" aria-hidden />
                </span>
                <span className="font-semibold text-slate-900">{c.name}</span>
              </div>
              <div className="mt-3 flex h-24 items-end justify-center gap-3">
                <div className="flex flex-col items-center gap-1">
                  <span className="w-7 rounded-t-md bg-slate-300" style={{ height: `${c.control * p * 0.8}px` }} />
                  <span className="text-[9.5px] text-slate-500">Control</span>
                </div>
                <div className="flex flex-col items-center gap-1">
                  <span className="w-7 rounded-t-md bg-primary" style={{ height: `${test * p * 0.8}px` }} />
                  <span className="text-[9.5px] text-slate-500">Test</span>
                </div>
              </div>
              <p className="mt-2 text-center font-display text-lg text-primary" style={appear(t, at + 1100)}>
                +{c.lift}%
              </p>
            </div>
          )
        })}
      </div>
    </Scene>
  )
}
