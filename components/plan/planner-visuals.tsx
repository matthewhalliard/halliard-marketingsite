import React from 'react'
import { Download, FileSpreadsheet, Loader2, MousePointer2, Radio, Scissors, Trash2, Tv } from 'lucide-react'
import { appear, prog, useTimeline } from './motion'

/**
 * Scenes for the planner's own views: the Table, the Charts, the Flowchart,
 * the Excel export and the plan total. Likenesses of the client portal in the
 * same visual language as the hero grid, each looping only while on screen and
 * holding its finished frame under reduced motion. The plan is the hero's
 * example (a Dallas–Fort Worth spring launch, $250K, 13 weeks). Illustrative,
 * not a client's.
 */

function Logo({ name, size = 16 }: { name: string; size?: number }) {
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

const usd = (v: number) => `$${Math.round(v).toLocaleString('en-US')}`
const usdK = (v: number) => `$${Math.round(v / 1000)}K`
const compact = (v: number) =>
  v >= 1e6 ? `${(v / 1e6).toFixed(1)}M` : v >= 1000 ? `${Math.round(v / 1000)}K` : `${Math.round(v)}`
const lerp = (a: number, b: number, k: number) => a + (b - a) * k

/* ------------------------------------------------------------------ Table */

// The audience the strategy is sized against, in people.
const POP = 2_000_000

interface Line {
  name: string
  logo?: string
  Icon?: typeof Tv
  cpm: number
  /** The most of the audience this line could ever reach. */
  cap: number
  spend: number
  /** TV and radio start on a recommended demo guarantee. */
  guarantee?: string
}

const LINES: Line[] = [
  { name: 'Local broadcast TV', Icon: Tv, cpm: 32, cap: 0.75, spend: 60000, guarantee: 'A35–64' },
  { name: 'Local radio', Icon: Radio, cpm: 11, cap: 0.5, spend: 18000, guarantee: 'A35–64' },
  { name: 'Paramount+', logo: 'paramount-plus', cpm: 27, cap: 0.6, spend: 42000 },
  { name: 'Spotify', logo: 'spotify', cpm: 16, cap: 0.45, spend: 22000 },
]
const EDITED = 2 // Paramount+
const EDITED_TO = 60000

/** Reach at 1+, 3+ and 10+ and average frequency for impressions against a line's ceiling. */
function reachFor(impr: number, cap: number) {
  const r1 = cap * (1 - Math.exp(-impr / (POP * 1.5)))
  const f = r1 > 0 ? impr / (POP * r1) : 0
  const r3 = r1 * Math.max(0, Math.min(1, (f - 1) / (f + 1.5)))
  const r10 = r1 * Math.max(0, Math.min(1, (f - 1) / (f + 14)))
  return { r1: r1 * 100, r3: r3 * 100, r10: r10 * 100, f }
}

export function TableScene() {
  const { ref, t, opacity } = useTimeline(13000)

  // Click into Paramount+'s spend, type a new figure, and reach recalculates.
  const editing = t > 2200 && t < 3700
  const typedTo = '60,000'
  const typed = typedTo.slice(0, Math.max(0, Math.min(typedTo.length, Math.floor((t - 2700) / 110))))
  const k = prog(t, 3800, 900)
  const flash = t > 3800 && t < 5200
  const settings = prog(t, 6200, 500)

  const rows = LINES.map((l, i) => {
    const spend = i === EDITED ? lerp(l.spend, EDITED_TO, k) : l.spend
    const impr = (spend / l.cpm) * 1000
    return { ...l, spend, impr, ...reachFor(impr, l.cap) }
  })
  const totSpend = rows.reduce((s, r) => s + r.spend, 0)
  const totImpr = rows.reduce((s, r) => s + r.impr, 0)
  // Each person counted once across the lines: what's left after nobody is missed twice.
  const r1 = (1 - rows.reduce((p, r) => p * (1 - r.r1 / 100), 1)) * 87
  const f = totImpr / (POP * (r1 / 100))
  const r3 = r1 * Math.max(0, Math.min(1, (f - 1) / (f + 1.5)))
  const r10 = r1 * Math.max(0, Math.min(1, (f - 1) / (f + 14)))

  const cell = 'px-2 py-1.5 whitespace-nowrap'
  const num = `${cell} text-right tabular-nums`
  const reachCell = (edited: boolean) =>
    `${num} transition-colors duration-500 ${flash && edited ? 'bg-tint/70 text-primary font-semibold' : ''}`

  return (
    <div ref={ref} className="text-[12px] text-slate-800" style={{ opacity }} aria-hidden>
      <div className="flex items-center justify-between gap-3">
        <span className="text-[11px] font-medium text-slate-500">Build fame · Adults 35–64 · Dallas–Fort Worth</span>
        <span className="hidden rounded-full bg-slate-100 px-2 py-0.5 text-[10px] font-semibold text-slate-500 sm:inline">
          Reach 1+ to 10+
        </span>
      </div>
      <div className="mt-2 overflow-hidden rounded-lg border border-slate-200">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-slate-50 text-[10px] font-semibold uppercase tracking-[0.6px] text-slate-500">
              <th className={`${cell} text-left`}>Line</th>
              <th className={`${cell} text-left`}>Spend</th>
              <th className={`${num} hidden md:table-cell lg:hidden`}>CPM</th>
              <th className={`${num} hidden sm:table-cell lg:hidden xl:table-cell`}>Impr.</th>
              <th className={num}>1+</th>
              <th className={`${num} hidden sm:table-cell`}>3+</th>
              <th className={`${num} hidden md:table-cell lg:hidden xl:table-cell`}>10+</th>
              <th className={num}>Freq.</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-t border-slate-200 bg-tint/30 font-semibold">
              <td className={cell}>Build fame</td>
              <td className={`${cell} tabular-nums`}>{usd(totSpend)}</td>
              <td className={`${num} hidden text-slate-400 md:table-cell lg:hidden`}>${((totSpend / totImpr) * 1000).toFixed(2)}</td>
              <td className={`${num} hidden sm:table-cell lg:hidden xl:table-cell`}>{compact(totImpr)}</td>
              <td className={reachCell(true)}>{r1.toFixed(0)}%</td>
              <td className={`${reachCell(true)} hidden sm:table-cell`}>{r3.toFixed(0)}%</td>
              <td className={`${reachCell(true)} hidden md:table-cell lg:hidden xl:table-cell`}>{r10.toFixed(1)}%</td>
              <td className={reachCell(true)}>{f.toFixed(1)}</td>
            </tr>
            {rows.map((r, i) => {
              const isEdited = i === EDITED
              return (
                <React.Fragment key={r.name}>
                  <tr className="border-t border-slate-100" style={appear(t, 200 + i * 140)}>
                    <td className={cell}>
                      <div className="flex items-center gap-2 pl-1 sm:pl-3">
                        {r.logo ? (
                          <Logo name={r.logo} />
                        ) : r.Icon ? (
                          <span className="inline-flex h-4 w-4 items-center justify-center rounded-[4px] bg-tint text-primary">
                            <r.Icon className="h-3 w-3" aria-hidden />
                          </span>
                        ) : null}
                        <span className="leading-tight">
                          <span className="block whitespace-normal">{r.name}</span>
                          {r.guarantee ? (
                            <span
                              className="mt-0.5 inline-flex rounded-full bg-tint/70 px-1.5 text-[9.5px] font-semibold text-primary"
                              style={appear(t, 1100 + i * 200)}
                            >
                              {r.guarantee} guarantee
                            </span>
                          ) : null}
                        </span>
                      </div>
                    </td>
                    <td className={cell}>
                      {isEdited && editing ? (
                        <span className="inline-flex min-w-[4.5rem] items-center rounded border border-primary bg-white px-1.5 py-0.5 tabular-nums ring-2 ring-tint">
                          {t < 2700 ? (
                            <span className="bg-tint px-px">{usd(r.spend)}</span>
                          ) : (
                            <>
                              ${typed}
                              <span className="ml-px inline-block h-3 w-px animate-pulse bg-primary" />
                            </>
                          )}
                        </span>
                      ) : (
                        <span className={`tabular-nums ${isEdited ? 'border-b border-dashed border-primary/40' : ''}`}>
                          {usd(r.spend)}
                        </span>
                      )}
                    </td>
                    <td className={`${num} hidden text-slate-600 md:table-cell lg:hidden`}>${r.cpm.toFixed(2)}</td>
                    <td className={`${num} hidden text-slate-600 sm:table-cell lg:hidden xl:table-cell`}>{compact(r.impr)}</td>
                    <td className={reachCell(isEdited)}>{r.r1.toFixed(0)}%</td>
                    <td className={`${reachCell(isEdited)} hidden sm:table-cell`}>{r.r3.toFixed(0)}%</td>
                    <td className={`${reachCell(isEdited)} hidden md:table-cell lg:hidden xl:table-cell`}>{r.r10.toFixed(1)}%</td>
                    <td className={reachCell(isEdited)}>{r.f.toFixed(1)}</td>
                  </tr>
                  {isEdited ? (
                    <tr>
                      <td colSpan={8} className="p-0">
                        <div
                          className="overflow-hidden transition-[max-height] duration-500"
                          style={{ maxHeight: `${settings * 4}rem`, opacity: settings }}
                        >
                          <div className="mx-2 mb-1.5 ml-6 flex flex-wrap gap-1.5 rounded-md bg-slate-50 px-2 py-1.5 text-[11px] sm:ml-9">
                            <span className="rounded-full bg-white px-2 py-0.5 ring-1 ring-slate-200">
                              <span className="text-slate-500">Buying audience</span>{' '}
                              <span className="font-medium text-slate-900">Homeowners 35–64</span>
                            </span>
                            <span className="rounded-full bg-white px-2 py-0.5 ring-1 ring-slate-200">
                              <span className="text-slate-500">Frequency cap</span>{' '}
                              <span className="font-medium text-slate-900">3 per week</span>
                            </span>
                          </div>
                        </div>
                      </td>
                    </tr>
                  ) : null}
                </React.Fragment>
              )
            })}
          </tbody>
        </table>
      </div>
      <div className="mt-2 text-[11px] text-slate-500">
        {t > 3800 ? 'Paramount+ to $60,000: reach recalculated for the line and the strategy.' : 'Click any spend to change it.'}
      </div>
    </div>
  )
}

/* ----------------------------------------------------------------- Charts */

// Reach 1+ for the whole plan at a given spend: 61% at the plan's $250K.
const curve = (s: number) => 67 * (1 - Math.exp(-s / 105000))
const CW = 400
const CH = 170
const PAD = { l: 34, r: 18, t: 12, b: 24 }
const MAX_S = 400000
const cx = (s: number) => PAD.l + (s / MAX_S) * (CW - PAD.l - PAD.r)
const cy = (r: number) => PAD.t + (1 - r / 70) * (CH - PAD.t - PAD.b)
const CURVE_PATH = Array.from({ length: 81 }, (_, i) => {
  const s = (i / 80) * MAX_S
  return `${i ? 'L' : 'M'}${cx(s).toFixed(1)},${cy(curve(s)).toFixed(1)}`
}).join(' ')

const TABS = ['Reach curve', 'Overlap', 'Spend & frequency'] as const

function ReachCurve({ t }: { t: number }) {
  const draw = prog(t, 300, 1400)
  // The picked spend: the plan's own, then dragged down and up the curve.
  const s =
    t < 2600 ? 250000 : t < 3600 ? lerp(250000, 150000, prog(t, 2600, 900)) : lerp(150000, 350000, prog(t, 4000, 1100))
  const r = curve(s)
  const showPick = t > 1700
  const tipLeft = cx(s) > CW * 0.6
  return (
    <svg viewBox={`0 0 ${CW} ${CH}`} className="h-auto w-full" role="img" aria-label="Reach curve">
      {/* where more spend mostly buys frequency */}
      <rect
        x={cx(300000)}
        y={PAD.t}
        width={cx(MAX_S) - cx(300000)}
        height={CH - PAD.t - PAD.b}
        fill="rgb(211,228,255)"
        opacity={0.35 * prog(t, 1600, 500)}
      />
      <text x={cx(350000)} y={CH - PAD.b - 6} textAnchor="middle" fontSize="8.5" fill="rgb(38,50,133)" opacity={prog(t, 1600, 500)}>
        Reach flattens
      </text>
      {[0, 20, 40, 60].map(v => (
        <g key={v}>
          <line x1={PAD.l} x2={CW - PAD.r} y1={cy(v)} y2={cy(v)} stroke="#e2e8f0" strokeWidth="0.75" />
          <text x={PAD.l - 5} y={cy(v) + 3} textAnchor="end" fontSize="8.5" fill="#64748b">
            {v}%
          </text>
        </g>
      ))}
      {[0, 100000, 200000, 300000, 400000].map(v => (
        <text key={v} x={cx(v)} y={CH - 8} textAnchor="middle" fontSize="8.5" fill="#64748b">
          ${v / 1000}K
        </text>
      ))}
      <path
        d={CURVE_PATH}
        fill="none"
        stroke="rgb(26,106,180)"
        strokeWidth="2.25"
        pathLength={1}
        strokeDasharray="1"
        strokeDashoffset={1 - draw}
      />
      {showPick ? (
        <g style={{ opacity: prog(t, 1700, 300) }}>
          <line x1={cx(s)} x2={cx(s)} y1={cy(r)} y2={CH - PAD.b} stroke="rgb(38,50,133)" strokeDasharray="3 3" strokeWidth="1" />
          <circle cx={cx(s)} cy={cy(r)} r="5" fill="white" stroke="rgb(38,50,133)" strokeWidth="2" />
          <g transform={`translate(${tipLeft ? cx(s) - 112 : cx(s) + 10}, ${cy(r) + 6})`}>
            <rect width="102" height="30" rx="5" fill="rgb(38,50,133)" />
            <text x="8" y="12" fontSize="9" fill="white" fontWeight="600">
              {usdK(s)} → {r.toFixed(0)}% reach
            </text>
            <text x="8" y="23" fontSize="8" fill="rgb(211,228,255)">
              +{(curve(s + 10000) - r).toFixed(1)} pts per extra $10K
            </text>
          </g>
        </g>
      ) : null}
    </svg>
  )
}

function Overlap({ t }: { t: number }) {
  const circles = [
    { label: 'CTV', pct: '34%', x: 150, y: 78, r: 54, fill: 'rgba(38,50,133,0.16)', stroke: 'rgb(38,50,133)' },
    { label: 'Paid social', pct: '29%', x: 226, y: 78, r: 50, fill: 'rgba(26,106,180,0.16)', stroke: 'rgb(26,106,180)' },
    { label: 'Streaming audio', pct: '18%', x: 190, y: 132, r: 38, fill: 'rgba(100,116,139,0.14)', stroke: '#64748b' },
  ]
  return (
    <svg viewBox={`0 0 ${CW} ${CH}`} className="h-auto w-full" role="img" aria-label="Audience overlap between channels">
      {circles.map((c, i) => {
        const p = prog(t, 200 + i * 250, 600)
        return (
          <g key={c.label}>
            <circle cx={c.x} cy={c.y} r={c.r * p} fill={c.fill} stroke={c.stroke} strokeWidth="1.25" />
            <text
              x={i === 0 ? c.x - 66 : i === 1 ? c.x + 60 : c.x}
              y={i === 2 ? c.y + c.r + 12 : c.y - 34}
              textAnchor={i === 0 ? 'end' : i === 1 ? 'start' : 'middle'}
              fontSize="9.5"
              fill="#0f172a"
              opacity={p}
            >
              <tspan fontWeight="600">{c.label}</tspan> {c.pct}
            </text>
          </g>
        )
      })}
      <g opacity={prog(t, 1100, 400)}>
        <text x="188" y="72" textAnchor="middle" fontSize="10" fontWeight="700" fill="rgb(38,50,133)">
          11%
        </text>
        <text x="188" y="83" textAnchor="middle" fontSize="7.5" fill="#334155">
          see both
        </text>
      </g>
    </svg>
  )
}

function SpendFrequency({ t }: { t: number }) {
  const spend = [
    { name: 'CTV', v: 110000 },
    { name: 'Online video', v: 40000 },
    { name: 'Paid social', v: 60000 },
    { name: 'Streaming audio', v: 40000 },
  ]
  const freq = [22, 17, 13, 10, 8, 6, 5, 4, 3, 12] // share of people reached, by times seen
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
      <div>
        <Label>Spend by channel</Label>
        <ul className="mt-2 flex flex-col gap-1.5">
          {spend.map((s, i) => (
            <li key={s.name} className="grid grid-cols-[6.5rem_1fr_2.5rem] items-center gap-2 text-[11px]">
              <span className="truncate">{s.name}</span>
              <span className="h-2 overflow-hidden rounded-full bg-slate-100">
                <span
                  className="block h-full rounded-full bg-gradient-to-r from-primary to-secondary"
                  style={{ width: `${(s.v / 110000) * 100 * prog(t, 200 + i * 120, 700)}%` }}
                />
              </span>
              <span className="text-right tabular-nums text-slate-600">{usdK(s.v)}</span>
            </li>
          ))}
        </ul>
      </div>
      <div>
        <Label>People reached, by times seen</Label>
        <div className="mt-2 flex h-[5.5rem] items-end gap-1">
          {freq.map((v, i) => (
            <div key={i} className="flex flex-1 flex-col items-center gap-1">
              <span
                className="w-full rounded-t bg-secondary/80"
                style={{ height: `${(v / 22) * 4.25 * prog(t, 500 + i * 60, 600)}rem` }}
              />
              <span className="text-[9px] tabular-nums text-slate-500">{i === 9 ? '10+' : i + 1}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export function ChartsScene() {
  const { ref, t, opacity } = useTimeline(16500)
  const tab = t < 7000 ? 0 : t < 11500 ? 1 : 2
  const start = [0, 7000, 11500][tab]!
  const local = t - start
  const pressed = tab === 0 && t > 5600 && t < 5800
  const toast = tab === 0 && t > 5800 && t < 6900
  return (
    <div ref={ref} className="text-[12px] text-slate-800" style={{ opacity }} aria-hidden>
      <div className="flex items-center justify-between gap-2">
        <div className="flex min-w-0 gap-1 overflow-hidden">
          {TABS.map((name, i) => (
            <span
              key={name}
              className={`whitespace-nowrap rounded-md px-2 py-1 text-[11px] font-semibold transition-colors duration-300 ${
                i === tab ? 'bg-tint/70 text-primary' : 'text-slate-500'
              } ${i === 2 ? 'hidden sm:inline' : ''}`}
            >
              {name}
            </span>
          ))}
        </div>
        <div className="flex shrink-0 gap-1">
          {['Image', 'CSV'].map(f => (
            <span
              key={f}
              className={`inline-flex items-center gap-1 rounded-md border px-1.5 py-0.5 text-[10.5px] font-medium transition-all ${
                f === 'CSV' && pressed ? 'scale-95 border-primary bg-tint text-primary' : 'border-slate-200 bg-white text-slate-600'
              }`}
            >
              <Download className="h-3 w-3" aria-hidden />
              {f}
            </span>
          ))}
        </div>
      </div>
      <div className="relative mt-3 min-h-[11rem]" key={tab} style={{ opacity: prog(local, 0, 400) }}>
        {tab === 0 ? <ReachCurve t={local} /> : tab === 1 ? <Overlap t={local} /> : <SpendFrequency t={local} />}
        {toast ? (
          <span className="absolute bottom-1 right-1 rounded-md bg-slate-900 px-2 py-1 text-[10.5px] text-white">
            reach-curve.csv downloaded
          </span>
        ) : null}
      </div>
      <div className="mt-1 text-[11px] text-slate-500">
        {tab === 0
          ? 'Pick any spend on the curve to see the reach it buys.'
          : tab === 1
            ? 'How many people two channels reach in common.'
            : 'Where the money goes, and how often people see it.'}
      </div>
    </div>
  )
}

/* -------------------------------------------------------------- Flowchart */

const WEEKS = 13
// Weeks of Mar 2 – May 25: the month on its first week, the day after.
const WEEK_LABELS = ['Mar', '9', '16', '23', '30', 'Apr', '13', '20', '27', 'May', '11', '18', '25']
const MONTH_START = new Set([0, 5, 9])

interface Block {
  start: number
  end: number
  budget: number
  isNew?: boolean
}
interface Row {
  name: string
  logo?: string
  strategy: 0 | 1
  /** Reach ceiling for a week, and dollars that get it halfway there. */
  cap: number
  half: number
  blocks: Block[]
}

const ROWS_BEFORE: Row[] = [
  { name: 'CTV', logo: 'paramount-plus', strategy: 0, cap: 30, half: 9000, blocks: [{ start: 0, end: 6, budget: 66000 }, { start: 8, end: 13, budget: 44000 }] },
  { name: 'Streaming audio', logo: 'spotify', strategy: 0, cap: 18, half: 4000, blocks: [{ start: 2, end: 10, budget: 40000 }] },
  { name: 'Paid social', logo: 'instagram', strategy: 1, cap: 24, half: 5000, blocks: [{ start: 4, end: 13, budget: 60000 }] },
  { name: 'Online video', logo: 'youtube', strategy: 1, cap: 20, half: 6000, blocks: [{ start: 0, end: 6, budget: 40000 }] },
]

/** Where every block sits at time `t`, with the drag (if any) in progress. */
function layoutAt(t: number) {
  const rows = ROWS_BEFORE.map(r => ({ ...r, blocks: r.blocks.map(b => ({ ...b })) }))
  let drag: { row: number; block: number; label: string; kind: 'move' | 'resize' | 'add' } | null = null

  // 1. Move streaming audio two weeks later.
  const m = prog(t, 1500, 1400)
  const shift = Math.round(m * 2)
  rows[1]!.blocks[0]!.start += shift
  rows[1]!.blocks[0]!.end += shift
  if (t > 1300 && t < 3300) drag = { row: 1, block: 0, label: '', kind: 'move' }

  // 2. Shorten paid social: same budget, more per week.
  const r = prog(t, 4000, 1300)
  rows[2]!.blocks[0]!.end = 13 - Math.round(r * 3)
  if (t > 3800 && t < 5700) drag = { row: 2, block: 0, label: '', kind: 'resize' }

  // 3. Drag across empty weeks to add online video's second flight.
  const a = prog(t, 6400, 1000)
  if (t > 6400) {
    const end = 9 + Math.max(1, Math.round(a * 4))
    rows[3]!.blocks.push({ start: 9, end, budget: 0, isNew: true })
    if (t < 7900) drag = { row: 3, block: 1, label: '', kind: 'add' }
  }

  // 4. Right-click CTV's first block and split it.
  if (t > 9400) {
    rows[0]!.blocks.splice(0, 1, { start: 0, end: 3, budget: 33000 }, { start: 3, end: 6, budget: 33000 })
  }
  return { rows, drag }
}

const weekly = (b: Block) => (b.budget ? b.budget / (b.end - b.start) : 0)

function weeklyReach(rows: Row[]) {
  return rows.map(r =>
    Array.from({ length: WEEKS }, (_, w) => {
      const b = r.blocks.find(x => w >= Math.floor(x.start) && w < Math.ceil(x.end))
      if (!b) return 0
      // A new flight carries part of the line's budget once the plan is recalculated.
      const dollars = b.isNew ? 5000 : weekly(b)
      return r.cap * (1 - Math.pow(0.5, dollars / r.half))
    }),
  )
}

const FINAL = layoutAt(99999).rows
const REACH_BEFORE = weeklyReach(ROWS_BEFORE)
const REACH_AFTER = weeklyReach(FINAL)

// Reach over the flight: cumulative, with each person counted once. Illustrative
// totals that move with the recalculation.
const TOTALS_BEFORE = { s0: 58, s1: 41, plan: 61 }
const TOTALS_AFTER = { s0: 59, s1: 43, plan: 63 }

export function FlowchartScene() {
  const { ref, t, opacity } = useTimeline(14500)
  const { rows, drag } = layoutAt(t)
  const menu = t > 8300 && t < 9400
  const recalcing = t > 10000 && t < 11000
  const k = prog(t, 11000, 900)
  const reach = REACH_BEFORE.map((row, i) => row.map((v, w) => lerp(v, REACH_AFTER[i]![w]!, k)))
  const tot = {
    s0: lerp(TOTALS_BEFORE.s0, TOTALS_AFTER.s0, k),
    s1: lerp(TOTALS_BEFORE.s1, TOTALS_AFTER.s1, k),
    plan: lerp(TOTALS_BEFORE.plan, TOTALS_AFTER.plan, k),
  }
  const pending = (t > 3000 ? 1 : 0) + (t > 5500 ? 1 : 0) + (t > 7500 ? 1 : 0) + (t > 9400 ? 1 : 0)

  const grid = { gridTemplateColumns: `minmax(4.75rem, 7.5rem) repeat(${WEEKS}, minmax(0, 1fr))` }
  const pct = (w: number) => `${(w / WEEKS) * 100}%`

  return (
    <div ref={ref} className="text-[11.5px] text-slate-800" style={{ opacity }} aria-hidden>
      <div className="flex items-center justify-between gap-2">
        <span className="inline-flex rounded-full bg-slate-100 p-0.5 text-[10px] font-semibold leading-4">
          {['Week', 'Month', 'Quarter'].map(v => (
            <span key={v} className={`rounded-full px-2 py-0.5 ${v === 'Week' ? 'bg-white text-primary shadow-sm' : 'text-slate-500'}`}>
              {v}
            </span>
          ))}
        </span>
        <span
          className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[10.5px] font-medium transition-opacity duration-300 ${
            recalcing ? 'bg-tint/70 text-primary opacity-100' : pending && t < 10000 ? 'text-slate-500 opacity-100' : 'opacity-0'
          }`}
        >
          {recalcing ? (
            <>
              <Loader2 className="h-3 w-3 animate-spin" aria-hidden /> Recalculating {pending} changes
            </>
          ) : (
            `${pending} change${pending === 1 ? '' : 's'}`
          )}
        </span>
      </div>

      <div className="mt-2 overflow-hidden rounded-lg border border-slate-200">
        {/* week header */}
        <div className="grid bg-slate-50 text-[9px] font-semibold uppercase tracking-[0.4px] text-slate-500" style={grid}>
          <div className="px-2 py-1.5">Channel</div>
          {WEEK_LABELS.map((w, i) => (
            <div key={i} className="whitespace-nowrap border-l border-slate-200/70 py-1.5 pl-0.5 xl:pl-0 xl:text-center">
              <span className="hidden xl:inline">{w}</span>
              <span className="xl:hidden">{MONTH_START.has(i) ? w : '\u00a0'}</span>
            </div>
          ))}
        </div>

        {rows.map((row, ri) => (
          <React.Fragment key={row.name}>
            {ri === 0 || ROWS_BEFORE[ri - 1]!.strategy !== row.strategy ? (
              <div className="border-t border-slate-200 bg-tint/30 px-2 py-1 text-[10.5px] font-semibold text-slate-900">
                {row.strategy === 0 ? 'Build fame' : 'Prompt action'}
              </div>
            ) : null}
            {/* the channel's flight blocks */}
            <div className="grid border-t border-slate-100" style={grid}>
              <div className="flex min-w-0 items-center gap-1.5 px-2 py-1.5">
                {row.logo ? <Logo name={row.logo} size={14} /> : null}
                <span className="truncate">{row.name}</span>
              </div>
              <div className="relative" style={{ gridColumn: `2 / span ${WEEKS}` }}>
                {Array.from({ length: WEEKS }, (_, w) => (
                  <span key={w} className="absolute inset-y-0 border-l border-slate-100" style={{ left: pct(w) }} />
                ))}
                {row.blocks.map((b, bi) => {
                  const active = drag && drag.row === ri && drag.block === bi
                              return (
                    <span
                      key={bi}
                      className={`absolute inset-y-1 flex items-center justify-center overflow-hidden rounded-md text-[10px] font-semibold tabular-nums ${
                        b.isNew && t < 7900
                          ? 'border border-dashed border-primary bg-tint/40 text-primary'
                          : active
                            ? 'bg-primary text-white shadow-md ring-2 ring-tint'
                            : 'border border-secondary/30 bg-tint/80 text-primary'
                      }`}
                      style={{ left: `calc(${pct(b.start)} + 1px)`, width: `calc(${pct(b.end - b.start)} - 2px)` }}
                    >
                      <span className="hidden truncate px-1 sm:inline">{b.isNew ? (t < 7900 ? '' : 'New flight') : usdK(b.budget)}</span>
                    </span>
                  )
                })}
                {drag && drag.row === ri && drag.kind !== 'add' && row.blocks[drag.block] ? (
                  <WeeklyTip
                    at={(row.blocks[drag.block]!.start + row.blocks[drag.block]!.end) / 2}
                    text={`${usd(weekly(row.blocks[drag.block]!))} / week`}
                  />
                ) : null}
                {drag && drag.row === ri ? <Cursor row={row} drag={drag} /> : null}
                {menu && ri === 0 ? (
                  <span className="absolute left-[12%] top-6 z-10 w-[7.5rem] rounded-md border border-slate-200 bg-white p-1 text-[10.5px] shadow-lg">
                    <span className={`flex items-center gap-1.5 rounded px-1.5 py-1 ${t > 8900 ? 'bg-tint/60 text-primary' : ''}`}>
                      <Scissors className="h-3 w-3" aria-hidden /> Split block
                    </span>
                    <span className="flex items-center gap-1.5 rounded px-1.5 py-1 text-slate-600">
                      <Trash2 className="h-3 w-3" aria-hidden /> Delete block
                    </span>
                  </span>
                ) : null}
              </div>
            </div>
            {/* the channel's reach by week */}
            <div className="grid" style={grid}>
              <div className="px-2 pb-1.5 pl-[1.6rem] text-[9.5px] text-slate-500">Reach / wk</div>
              {reach[ri]!.map((v, w) => (
                <div key={w} className="flex items-end justify-center px-px pb-1.5">
                  <span
                    className="block w-full rounded-sm bg-secondary transition-[height]"
                    style={{ height: `${Math.max(v ? 2 : 0, (v / 30) * 18)}px`, opacity: v ? 0.35 + v / 50 : 0 }}
                    title={`${v.toFixed(0)}%`}
                  />
                </div>
              ))}
            </div>
          </React.Fragment>
        ))}

        {/* totals: per strategy and the whole plan, each person counted once */}
        <div className="grid grid-cols-3 gap-px border-t border-slate-200 bg-slate-200 text-[10.5px]">
          {[
            { label: 'Build fame', v: tot.s0 },
            { label: 'Prompt action', v: tot.s1 },
            { label: 'Whole plan', v: tot.plan },
          ].map((s, i) => (
            <div key={s.label} className={`px-2 py-1.5 ${i === 2 ? 'bg-tint/40' : 'bg-white'}`}>
              <div className="text-slate-500">{s.label}</div>
              <div className={`font-semibold tabular-nums ${k > 0 && k < 1 ? 'text-primary' : 'text-slate-900'}`}>
                {s.v.toFixed(0)}% reach 1+
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="mt-2 text-[11px] text-slate-500">
        Whole plan counts each person once, across both strategies.
      </div>
    </div>
  )
}

function WeeklyTip({ text, at }: { text: string; at: number }) {
  return (
    <span
      className="pointer-events-none absolute -top-[1.1rem] z-10 -translate-x-1/2 whitespace-nowrap rounded bg-slate-900 px-1.5 py-0.5 text-[9.5px] font-semibold text-white"
      style={{ left: `${(at / WEEKS) * 100}%` }}
    >
      {text}
    </span>
  )
}

function Cursor({ row, drag }: { row: Row; drag: { block: number; kind: 'move' | 'resize' | 'add' } }) {
  const b = row.blocks[drag.block]
  if (!b) return null
  const x = drag.kind === 'move' ? (b.start + b.end) / 2 : b.end
  return (
    <MousePointer2
      className="pointer-events-none absolute top-3 z-20 h-4 w-4 fill-slate-900 text-white drop-shadow"
      style={{ left: `calc(${(x / WEEKS) * 100}% - 3px)` }}
      aria-hidden
    />
  )
}

/* ----------------------------------------------------------------- Export */

const SHEET_WEEKS = 9
const SHEET_LABELS = ['3/2', '3/9', '3/16', '3/23', '3/30', '4/6', '4/13', '4/20', '4/27']

export function ExportScene() {
  const { ref, t, opacity } = useTimeline(10000)
  const pressed = t > 900 && t < 1150
  const file = prog(t, 1500, 400)
  const sheet = t > 2300
  const cols = 'A B C D E F G H I J K'.split(' ')
  const lines = FINAL.flatMap(r => {
    const blocks = r.blocks.filter(b => !b.isNew)
    return [{ name: r.name, budget: blocks.reduce((s, b) => s + b.budget, 0), blocks }]
  })
  let cellIndex = 0
  return (
    <div ref={ref} className="text-[11.5px] text-slate-800" style={{ opacity }} aria-hidden>
      <div className="flex flex-wrap items-center justify-between gap-2">
        <span
          className={`inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-[11.5px] font-semibold transition-all ${
            pressed ? 'scale-95 bg-primary/90 text-white' : 'bg-primary text-white'
          }`}
        >
          <Download className="h-3.5 w-3.5" aria-hidden /> Export to Excel
        </span>
        <span
          className="inline-flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-2.5 py-1.5"
          style={{ opacity: file, transform: `translateY(${(1 - file) * 6}px)` }}
        >
          <FileSpreadsheet className="h-4 w-4 text-[#107C41]" aria-hidden />
          <span className="font-medium">Spring_launch_plan.xlsx</span>
        </span>
      </div>

      <div className="mt-3 overflow-hidden rounded-lg border border-slate-300 bg-white" style={{ opacity: sheet ? 1 : 0.25 }}>
        <div className="overflow-hidden">
          <table className="w-full table-fixed border-collapse text-[10.5px]">
            <colgroup>
              <col className="w-6" />
              <col className="w-[5rem] sm:w-[7rem]" />
              <col className="w-[3rem] sm:w-[3.5rem]" />
              {Array.from({ length: SHEET_WEEKS }, (_, i) => (
                <col key={i} className={i > 4 ? 'hidden sm:table-column' : ''} />
              ))}
            </colgroup>
            <thead>
              <tr className="bg-slate-100 text-[9.5px] text-slate-500">
                <th className="border border-slate-200 font-normal" />
                {cols.slice(0, 3 + SHEET_WEEKS).map((c, i) => (
                  <th key={c} className={`border border-slate-200 py-0.5 font-normal ${i > 6 ? 'hidden sm:table-cell' : ''}`}>
                    {c}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              <tr className="font-semibold">
                <td className="border border-slate-200 bg-slate-100 text-center text-[9.5px] font-normal text-slate-500">1</td>
                <td className="border border-slate-200 px-1.5 py-1">Channel</td>
                <td className="border border-slate-200 px-1.5 py-1 text-right">Budget</td>
                {SHEET_LABELS.map((w, i) => (
                  <td key={i} className={`border border-slate-200 px-0.5 py-1 text-center text-[9.5px] ${i > 4 ? 'hidden sm:table-cell' : ''}`}>
                    {w}
                  </td>
                ))}
              </tr>
              {lines.map((l, ri) => (
                <tr key={l.name}>
                  <td className="border border-slate-200 bg-slate-100 text-center text-[9.5px] text-slate-500">{ri + 2}</td>
                  <td className="truncate border border-slate-200 px-1.5 py-1">{l.name}</td>
                  <td className="border border-slate-200 px-1.5 py-1 text-right tabular-nums">{usdK(l.budget)}</td>
                  {Array.from({ length: SHEET_WEEKS }, (_, w) => {
                    const b = l.blocks.find(x => w >= x.start && w < x.end)
                    const at = 2500 + cellIndex++ * 55
                    return (
                      <td
                        key={w}
                        className={`border border-slate-200 px-1 py-1 text-right tabular-nums ${b ? 'bg-tint/50 text-primary' : ''} ${
                          w > 4 ? 'hidden sm:table-cell' : ''
                        }`}
                        style={{ opacity: sheet ? prog(t, at, 250) : 0 }}
                      >
                        {b ? compact(weekly(b)) : ''}
                      </td>
                    )
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="flex items-center gap-1 border-t border-slate-200 bg-slate-50 px-2 py-1 text-[10px]">
          <span className="rounded-b border-x border-b border-slate-300 bg-white px-2 py-0.5 font-semibold text-[#107C41]">Flighting</span>
        </div>
      </div>
      <div className="mt-2 text-[11px] text-slate-500">The Flighting sheet: the same blocks, week by week, as the Flowchart.</div>
    </div>
  )
}

/* ------------------------------------------------------------- Plan total */

const STRATS = [
  { name: 'Build fame', reach: 58 },
  { name: 'Prompt action', reach: 41 },
]

export function PlanTotalScene() {
  const { ref, t, opacity } = useTimeline(9000)
  const added = STRATS.reduce((s, x) => s + x.reach, 0)
  const merge = prog(t, 2600, 1200)
  const planReach = 61
  const stats = [
    { label: 'Reach 1+', value: `${Math.round(lerp(0, planReach, prog(t, 3600, 900)))}%` },
    { label: 'Avg. frequency', value: lerp(0, 4.6, prog(t, 3800, 900)).toFixed(1) },
    { label: 'Impressions', value: `${lerp(0, 17.0, prog(t, 4000, 900)).toFixed(1)}M` },
    { label: 'Blended CPM', value: `$${lerp(0, 14.68, prog(t, 4200, 900)).toFixed(2)}` },
  ]
  return (
    <div ref={ref} className="text-[12px] text-slate-800" style={{ opacity }} aria-hidden>
      <Label>Reach 1+ by strategy</Label>
      <ul className="mt-2 flex flex-col gap-2">
        {STRATS.map((s, i) => (
          <li key={s.name} className="grid grid-cols-[6.5rem_1fr_2.5rem] items-center gap-2">
            <span className="truncate">{s.name}</span>
            <span className="h-2.5 overflow-hidden rounded-full bg-slate-100">
              <span
                className="block h-full rounded-full bg-secondary/80"
                style={{ width: `${s.reach * prog(t, 300 + i * 300, 800)}%` }}
              />
            </span>
            <span className="text-right tabular-nums">{s.reach}%</span>
          </li>
        ))}
        <li className="grid grid-cols-[6.5rem_1fr_2.5rem] items-center gap-2 font-semibold text-slate-900">
          <span>Whole plan</span>
          <span className="relative h-2.5 overflow-hidden rounded-full bg-slate-100">
            {/* Added up, the strategies would claim 99%; counted once, it's 61%. */}
            <span
              className="absolute inset-y-0 left-0 rounded-full border border-dashed border-slate-400"
              style={{ width: `${added}%`, opacity: prog(t, 1400, 500) * (1 - merge * 0.6) }}
            />
            <span
              className="absolute inset-y-0 left-0 rounded-full bg-gradient-to-r from-primary to-secondary"
              style={{ width: `${lerp(added, planReach, merge) * prog(t, 1400, 600)}%` }}
            />
          </span>
          <span className="text-right tabular-nums">{Math.round(lerp(added, planReach, merge) * (t > 1400 ? 1 : 0))}%</span>
        </li>
      </ul>
      <p className="mt-2 text-[11px] text-slate-500" style={appear(t, 3000)}>
        Not {added}%: someone both strategies reach is counted once.
      </p>
      <div className="mt-3 grid grid-cols-2 gap-px overflow-hidden rounded-lg border border-tint bg-tint sm:grid-cols-4">
        {stats.map(s => (
          <div key={s.label} className="bg-white px-3 py-2">
            <div className="text-[10px] font-semibold uppercase tracking-[0.6px] text-slate-500">{s.label}</div>
            <div className="mt-0.5 text-[15px] font-semibold tabular-nums text-slate-900">{s.value}</div>
          </div>
        ))}
      </div>
    </div>
  )
}
