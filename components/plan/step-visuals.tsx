import React from 'react'
import {
  Ban,
  BookOpen,
  CalendarRange,
  CheckCircle2,
  DollarSign,
  FileText,
  Home,
  Loader2,
  MapPin,
  Megaphone,
  MousePointerClick,
  Radio,
  Search,
  Target,
  Users,
  type LucideIcon,
} from 'lucide-react'
import { appear, prog, useTimeline } from './motion'

/**
 * The how-it-works scenes: likenesses of the client portal's Brief, Audience
 * and Strategy tabs, using their own labels ("In your words", "What you told
 * us", "Where they stand out", "What media they consume", "Budget by
 * strategy"), one example brief, and the portal's property logos. The plan in
 * the hero is the same example's media plan. Illustrative, not a client's.
 */

function Logo({ name, size = 18 }: { name: string; size?: number }) {
  return (
    <img
      src={`/plan-grid/${name}.png`}
      alt=""
      width={size}
      height={size}
      className="shrink-0 rounded-[4px]"
      style={{ width: size, height: size }}
    />
  )
}

function Label({ children }: { children: React.ReactNode }) {
  return <div className="text-[10px] font-semibold uppercase tracking-[0.6px] text-slate-500">{children}</div>
}

function IconBadge({ icon: Icon, size = 'sm' }: { icon: LucideIcon; size?: 'sm' | 'md' }) {
  const box = size === 'md' ? 'h-9 w-9 rounded-lg' : 'h-7 w-7 rounded-md'
  const glyph = size === 'md' ? 'h-[18px] w-[18px]' : 'h-3.5 w-3.5'
  return (
    <span className={`inline-flex shrink-0 items-center justify-center bg-tint text-primary ${box}`}>
      <Icon className={glyph} aria-hidden />
    </span>
  )
}

/* ------------------------------------------------------------------ Brief */

const BRIEF_TEXT =
  "Spring launch for a family-owned HVAC company across Dallas–Fort Worth. $250K, March through May. We want homeowners 35–64 in the northern suburbs to know us before the first hot week, then book a tune-up. Please don't buy late-night TV."

const BRIEF_FIELDS: { icon: LucideIcon; label: string; value: string }[] = [
  { icon: Target, label: 'Goal', value: 'Known before the first hot week, then booked tune-ups' },
  { icon: DollarSign, label: 'Budget', value: '$250,000' },
  { icon: CalendarRange, label: 'Flight', value: 'Mar 2 – May 31, 2027 · 13 weeks' },
  { icon: Users, label: 'Audience', value: 'Homeowners 35–64, northern suburbs' },
  { icon: MapPin, label: 'Where', value: 'Dallas–Fort Worth DMA' },
  { icon: Ban, label: 'What not to buy', value: 'Late-night TV' },
]

export function BriefScene() {
  const { ref, t, opacity } = useTimeline(12000)
  const typed = Math.max(0, Math.min(BRIEF_TEXT.length, Math.floor((t - 300) / 13)))
  const typing = typed < BRIEF_TEXT.length
  const reading = t > 4000 && t < 4900
  return (
    <div ref={ref} className="text-[12.5px] text-slate-800" style={{ opacity }}>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div className="min-w-0">
          <Label>In your words</Label>
          <div className="mt-1.5 min-h-[9.5rem] rounded-lg border border-slate-200 bg-white p-3 leading-relaxed text-slate-700">
            {BRIEF_TEXT.slice(0, typed)}
            {typing ? <span className="ml-px inline-block h-3.5 w-px translate-y-0.5 animate-pulse bg-primary" /> : null}
          </div>
          <div
            className="mt-2.5 flex items-center gap-2.5 rounded-lg border border-dashed border-tint bg-tint/20 p-2.5"
            style={appear(t, 3700)}
          >
            <span className="inline-flex h-8 w-8 items-center justify-center rounded-md bg-white text-primary ring-1 ring-tint">
              <FileText className="h-4 w-4" aria-hidden />
            </span>
            <div className="min-w-0 leading-tight">
              <div className="truncate font-medium text-slate-900">Spring_2027_RFP.pdf</div>
              <div className="text-[11px] text-slate-500">Attached. Halliard reads it when you save.</div>
            </div>
          </div>
        </div>

        <div className="min-w-0">
          <div className="flex items-center justify-between">
            <Label>What you told us</Label>
            {reading ? (
              <span className="inline-flex items-center gap-1 text-[11px] text-primary">
                <Loader2 className="h-3 w-3 animate-spin" aria-hidden /> Reading
              </span>
            ) : null}
          </div>
          <ul className="mt-1.5 flex flex-col gap-1.5">
            {BRIEF_FIELDS.map((f, i) => (
              <li
                key={f.label}
                className="flex items-start gap-2.5 rounded-lg border border-slate-100 bg-white px-2.5 py-1.5"
                style={appear(t, 4800 + i * 320)}
              >
                <IconBadge icon={f.icon} />
                <div className="min-w-0 leading-tight">
                  <div className="text-[10.5px] text-slate-500">{f.label}</div>
                  <div className="font-medium text-slate-900">{f.value}</div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div
        className="mt-3 inline-flex items-center gap-2 rounded-full bg-tint/60 px-3 py-1.5 text-[12px] font-medium text-primary"
        style={appear(t, 7000)}
      >
        <CheckCircle2 className="h-4 w-4" aria-hidden />
        The budget and the dates hang together
      </div>
    </div>
  )
}

/* -------------------------------------------------------------- Audience */

// A hex map of the DMA's ZIPs, warmest where the audience over-indexes. The
// hotspot sits north of centre, where the brief points.
const HEX_R = 11
const HEX_W = Math.sqrt(3) * HEX_R
const HEX_COLS = 11
const HEX_ROWS = 8
const HEXES = Array.from({ length: HEX_COLS * HEX_ROWS }, (_, i) => {
  const col = i % HEX_COLS
  const row = Math.floor(i / HEX_COLS)
  const cx = HEX_W / 2 + 4 + col * HEX_W + (row % 2 ? HEX_W / 2 : 0)
  const cy = HEX_R + 4 + row * HEX_R * 1.5
  const d = Math.hypot((col - 5.5) / 3.2, (row - 1.6) / 2.4)
  const noise = ((Math.sin(i * 12.9898) * 43758.5453) % 1 + 1) % 1
  const heat = Math.max(0, Math.min(1, 1 - d * 0.55 + (noise - 0.5) * 0.35))
  return { cx, cy, heat }
})
const HEX_ORDER = HEXES.map((h, i) => ({ i, heat: h.heat }))
  .sort((a, b) => b.heat - a.heat)
  .reduce<Record<number, number>>((acc, h, rank) => ((acc[h.i] = rank), acc), {})
const MAP_W = HEX_COLS * HEX_W + HEX_W / 2 + 8
const MAP_H = HEX_R * 1.5 * (HEX_ROWS - 1) + HEX_R * 2 + 8

function hexPath(cx: number, cy: number) {
  const pts = Array.from({ length: 6 }, (_, k) => {
    const a = (Math.PI / 3) * k - Math.PI / 6
    return `${(cx + (HEX_R - 1) * Math.cos(a)).toFixed(1)},${(cy + (HEX_R - 1) * Math.sin(a)).toFixed(1)}`
  })
  return `M${pts.join('L')}Z`
}

function heatColor(h: number) {
  // From the portal's wash (#eef4ff) to its navy (38,50,133).
  const mix = (a: number, b: number) => Math.round(a + (b - a) * h)
  return `rgb(${mix(238, 38)},${mix(244, 50)},${mix(255, 133)})`
}

const TOP_ZIPS = [
  { zip: '75034', place: 'Frisco', index: 400 },
  { zip: '75013', place: 'Allen', index: 312 },
  { zip: '75078', place: 'Prosper', index: 288 },
  { zip: '75024', place: 'Plano', index: 241 },
]

const MEDIA: { name: string; logo?: string; icon?: LucideIcon; reach: number; index: number }[] = [
  { name: 'YouTube', logo: 'youtube', reach: 81, index: 112 },
  { name: 'Facebook', logo: 'facebook', reach: 64, index: 121 },
  { name: 'Local radio', icon: Radio, reach: 41, index: 127 },
  { name: 'Hulu', logo: 'hulu', reach: 38, index: 134 },
  { name: 'Spotify', logo: 'spotify', reach: 35, index: 118 },
  { name: 'Peacock', logo: 'peacock', reach: 22, index: 141 },
]

export function AudienceScene() {
  const { ref, t, opacity } = useTimeline(12000)
  const size = Math.round(412000 * prog(t, 500, 1600))
  return (
    <div ref={ref} className="text-[12.5px] text-slate-800" style={{ opacity }}>
      {/* The audience's header, as on the Audience tab */}
      <div className="flex flex-wrap items-center gap-3 rounded-lg border border-tint bg-tint/20 p-3" style={appear(t, 150)}>
        <IconBadge icon={Home} size="md" />
        <div className="min-w-0 flex-1 basis-40 leading-tight">
          <div className="font-semibold text-slate-900">Northern suburb homeowners</div>
          <div className="text-[11px] text-slate-500">Homeowners 35–64 · Where: Dallas–Fort Worth, 18 ZIPs</div>
        </div>
        <div className="w-full pl-12 leading-tight sm:w-auto sm:pl-0 sm:text-right">
          <div className="text-[17px] font-semibold tabular-nums text-slate-900">{size.toLocaleString('en-US')}</div>
          <div className="text-[10.5px] text-slate-500">people · Halliard panel, 2025</div>
        </div>
      </div>

      <div className="mt-3 grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div className="min-w-0">
          <Label>Where they stand out</Label>
          <svg viewBox={`0 0 ${MAP_W.toFixed(0)} ${MAP_H.toFixed(0)}`} className="mt-1.5 block w-full" aria-hidden>
            {HEXES.map((h, i) => {
              const p = prog(t, 1600 + HEX_ORDER[i]! * 18, 500)
              return (
                <path
                  key={i}
                  d={hexPath(h.cx, h.cy)}
                  fill={heatColor(h.heat * p)}
                  stroke="#fff"
                  strokeWidth={1}
                />
              )
            })}
          </svg>
          <ul className="mt-2 flex flex-col gap-1">
            {TOP_ZIPS.map((z, i) => (
              <li key={z.zip} className="flex items-center gap-2" style={appear(t, 3500 + i * 200)}>
                <MapPin className="h-3.5 w-3.5 shrink-0 text-primary" aria-hidden />
                <span className="w-[6.5rem] shrink-0 truncate">
                  {z.place} <span className="text-slate-400">{z.zip}</span>
                </span>
                <span className="h-1.5 min-w-0 flex-1 overflow-hidden rounded-full bg-slate-100">
                  <span
                    className="block h-full rounded-full bg-gradient-to-r from-secondary to-primary"
                    style={{ width: `${(Math.min(z.index, 400) / 400) * 100 * prog(t, 3600 + i * 200, 700)}%` }}
                  />
                </span>
                <span className="w-9 shrink-0 text-right tabular-nums font-medium">
                  {z.index >= 400 ? '400+' : z.index}
                </span>
              </li>
            ))}
          </ul>
        </div>

        <div className="min-w-0">
          <Label>What media they consume</Label>
          <div className="mt-1.5 overflow-hidden rounded-lg border border-slate-200">
            <div className="grid grid-cols-[minmax(0,1fr)_3.5rem_4.5rem] bg-slate-50 px-2.5 py-1.5 text-[10px] font-semibold uppercase tracking-[0.5px] text-slate-500">
              <span className="truncate">Channel or service</span>
              <span className="text-right">Weekly</span>
              <span className="text-right">Index</span>
            </div>
            {MEDIA.map((m, i) => {
              const p = prog(t, 4300 + i * 230, 700)
              const Icon = m.icon
              return (
                <div
                  key={m.name}
                  className="grid grid-cols-[minmax(0,1fr)_3.5rem_4.5rem] items-center border-t border-slate-100 px-2.5 py-1.5"
                  style={appear(t, 4200 + i * 230)}
                >
                  <span className="flex min-w-0 items-center gap-2">
                    {m.logo ? (
                      <Logo name={m.logo} size={16} />
                    ) : Icon ? (
                      <span className="inline-flex h-4 w-4 items-center justify-center rounded-[4px] bg-tint text-primary">
                        <Icon className="h-3 w-3" aria-hidden />
                      </span>
                    ) : null}
                    <span className="truncate">{m.name}</span>
                  </span>
                  <span className="text-right tabular-nums text-slate-600">{Math.round(m.reach * p)}%</span>
                  <span className="flex items-center justify-end gap-1.5">
                    <span className="h-1.5 w-8 overflow-hidden rounded-full bg-slate-100">
                      <span
                        className="block h-full rounded-full bg-primary"
                        style={{ width: `${((m.index - 100) / 50) * 100 * p}%` }}
                      />
                    </span>
                    <span className="w-7 text-right tabular-nums font-medium">{Math.round(100 + (m.index - 100) * p)}</span>
                  </span>
                </div>
              )
            })}
          </div>
          <p className="mt-1.5 text-[10.5px] text-slate-500">Index against everyone in the area (100 = the same)</p>
        </div>
      </div>
    </div>
  )
}

/* -------------------------------------------------------------- Strategy */

const SEARCH_MONTHS = ['J', 'F', 'M', 'A', 'M', 'J', 'J', 'A', 'S', 'O', 'N', 'D']
const SEARCH_DEMAND = [22, 25, 38, 61, 88, 100, 96, 84, 52, 31, 24, 20]

const RESEARCH = ['Search demand in DFW', "Competitors' ads", 'Reviews and local news']

const STRATEGIES: {
  icon: LucideIcon
  task: string
  headline: string
  rows: [string, string][]
  budget: string
  verdict?: string
  sources: string[]
}[] = [
  {
    icon: Megaphone,
    task: 'Build fame',
    headline: 'Be the name homeowners know before the first hot week',
    rows: [
      ['Audience', 'Adults 25–54 · Dallas DMA'],
      ['Moment', 'Before the first 90° day'],
      ['Flight', 'Mar 2 – Apr 12'],
      ['Creative', '15s CTV: the tech who shows up on time'],
    ],
    budget: '$150,000',
    verdict: 'Enough for fame',
    sources: ['Search demand', 'Competitor ads'],
  },
  {
    icon: MousePointerClick,
    task: 'Prompt action',
    headline: 'Turn the first heat wave into booked tune-ups',
    rows: [
      ['Audience', 'In market · 12 ZIPs'],
      ['Moment', 'When the AC first struggles'],
      ['Flight', 'Apr 13 – May 31'],
      ['Creative', 'Social: book a $79 tune-up today'],
    ],
    budget: '$100,000',
    sources: ['Reviews', 'Local news'],
  },
]

export function StrategyScene() {
  const { ref, t, opacity } = useTimeline(13000)
  const split = prog(t, 5600, 1100)
  return (
    <div ref={ref} className="text-[12.5px] text-slate-800" style={{ opacity }}>
      {/* Research */}
      <div className="grid grid-cols-1 gap-3 rounded-lg border border-slate-200 bg-white p-3 sm:grid-cols-[minmax(0,1fr)_minmax(0,1.2fr)]">
        <div className="min-w-0">
          <Label>Research</Label>
          <ul className="mt-2 flex flex-col gap-1.5">
            {RESEARCH.map((r, i) => {
              const done = t > 900 + i * 550
              return (
                <li key={r} className="flex items-center gap-2" style={appear(t, 200 + i * 550)}>
                  {done ? (
                    <CheckCircle2 className="h-4 w-4 shrink-0 text-primary" aria-hidden />
                  ) : (
                    <Search className="h-4 w-4 shrink-0 animate-pulse text-slate-400" aria-hidden />
                  )}
                  <span className={done ? 'text-slate-900' : 'text-slate-500'}>{r}</span>
                </li>
              )
            })}
          </ul>
        </div>
        <div className="min-w-0">
          <div className="flex items-baseline justify-between gap-2">
            <Label>Searches · “ac tune up”</Label>
            <span className="whitespace-nowrap text-[10.5px] font-medium text-primary" style={appear(t, 2200)}>
              Peaks in June
            </span>
          </div>
          <div className="mt-2 flex h-16 items-end gap-1">
            {SEARCH_DEMAND.map((v, i) => (
              <div key={i} className="flex h-full min-w-0 flex-1 flex-col justify-end">
                <span
                  className={`block rounded-t-[3px] ${v >= 84 ? 'bg-primary' : 'bg-secondary/40'}`}
                  style={{ height: `${v * prog(t, 500 + i * 70, 600)}%` }}
                />
              </div>
            ))}
          </div>
          <div className="mt-1 flex gap-1 text-[9.5px] text-slate-400">
            {SEARCH_MONTHS.map((m, i) => (
              <span key={i} className="min-w-0 flex-1 text-center">
                {m}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Strategy cards */}
      <div className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-2">
        {STRATEGIES.map((s, i) => {
          const at = 2600 + i * 600
          return (
            <div key={s.task} className="min-w-0 rounded-lg border border-tint bg-white p-3 shadow-sm" style={appear(t, at, 550)}>
              <div className="flex items-center gap-2">
                <IconBadge icon={s.icon} />
                <span className="text-[10.5px] font-semibold uppercase tracking-[0.6px] text-primary">{s.task}</span>
              </div>
              <div className="mt-2 font-semibold leading-snug text-slate-900">{s.headline}</div>
              <dl className="mt-2 flex flex-col gap-1">
                {s.rows.map(([k, v], j) => (
                  <div key={k} className="grid grid-cols-[4.25rem_minmax(0,1fr)] gap-2" style={appear(t, at + 350 + j * 160)}>
                    <dt className="text-[11px] text-slate-500">{k}</dt>
                    <dd className="text-slate-800 leading-snug">{v}</dd>
                  </div>
                ))}
                <div className="grid grid-cols-[4.25rem_minmax(0,1fr)] items-center gap-2" style={appear(t, at + 1050)}>
                  <dt className="text-[11px] text-slate-500">Budget</dt>
                  <dd className="flex items-center gap-1.5">
                    <span className="font-semibold tabular-nums">{s.budget}</span>
                    {s.verdict ? (
                      <span
                        className="whitespace-nowrap rounded-full bg-tint px-2 py-0.5 text-[10px] font-semibold text-primary"
                        style={appear(t, at + 1500)}
                      >
                        {s.verdict}
                      </span>
                    ) : null}
                  </dd>
                </div>
              </dl>
              <div className="mt-2.5 border-t border-slate-100 pt-2" style={appear(t, at + 1300)}>
                <div className="text-[10.5px] text-slate-500">Why Halliard suggested this</div>
                <div className="mt-1 flex flex-wrap gap-1">
                  {s.sources.map(src => (
                    <span key={src} className="inline-flex items-center gap-1 rounded-full bg-slate-100 px-2 py-0.5 text-[10.5px] text-slate-600">
                      <BookOpen className="h-3 w-3" aria-hidden />
                      {src}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          )
        })}
      </div>

      {/* Budget by strategy */}
      <div className="mt-3" style={appear(t, 5400)}>
        <Label>Budget by strategy</Label>
        <div className="mt-1.5 flex h-7 overflow-hidden rounded-md bg-slate-100 text-[11px] font-semibold text-white">
          <span
            className="flex items-center whitespace-nowrap bg-primary px-2"
            style={{ width: `${60 * split}%` }}
          >
            {split > 0.6 ? (<><span className="sm:hidden">Fame · $150K</span><span className="hidden sm:inline">Build fame · $150K</span></>) : null}
          </span>
          <span
            className="flex items-center whitespace-nowrap bg-secondary px-2"
            style={{ width: `${40 * split}%` }}
          >
            {split > 0.6 ? (<><span className="sm:hidden">Action · $100K</span><span className="hidden sm:inline">Prompt action · $100K</span></>) : null}
          </span>
        </div>
      </div>
    </div>
  )
}
