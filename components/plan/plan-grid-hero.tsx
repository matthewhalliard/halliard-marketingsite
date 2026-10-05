import React, { useEffect, useRef, useState } from 'react'
import { ChevronDown } from 'lucide-react'

/**
 * The hero's media plan: a likeness of the client portal's plan grid, where
 * strategies split into channels and channels into properties, each with its
 * spend, impressions, CPM, reach and fit. Budgets count up into place, then
 * the plan rebalances between the "Balanced" and "Reach" settings of the
 * planner's dial, the way a planner would flip it.
 *
 * An illustrative plan, not a client's. Logos are the ones the portal keeps
 * in public/property-icons; the Halliard mark is the one beside a channel
 * Halliard can buy.
 */

type Mode = 'balanced' | 'reach'

interface Property {
  name: string
  icon: string
  cpm: number
  fit: number
  spend: Record<Mode, number>
}

interface Channel {
  name: string
  /** Halliard can buy this channel for the client, if they want it to. */
  halliardBuys?: boolean
  properties: Property[]
}

interface Strategy {
  name: string
  audience: string
  reach: Record<Mode, number>
  channels: Channel[]
}

const PLAN: Strategy[] = [
  {
    name: 'Build fame',
    audience: 'Adults 25–54 · Dallas DMA',
    reach: { balanced: 58, reach: 64 },
    channels: [
      {
        name: 'CTV',
        halliardBuys: true,
        properties: [
          { name: 'Paramount+', icon: 'paramount-plus', cpm: 27, fit: 86, spend: { balanced: 42000, reach: 48000 } },
          { name: 'Pluto TV', icon: 'pluto', cpm: 20, fit: 80, spend: { balanced: 36000, reach: 40000 } },
          { name: 'Tubi', icon: 'tubi', cpm: 18, fit: 66, spend: { balanced: 32000, reach: 22000 } },
        ],
      },
      {
        name: 'Streaming audio',
        properties: [
          { name: 'Spotify', icon: 'spotify', cpm: 16, fit: 84, spend: { balanced: 22000, reach: 28000 } },
          { name: 'Pandora', icon: 'pandora', cpm: 14, fit: 71, spend: { balanced: 18000, reach: 12000 } },
        ],
      },
    ],
  },
  {
    name: 'Prompt action',
    audience: 'In market · 12 ZIPs',
    reach: { balanced: 41, reach: 45 },
    channels: [
      {
        name: 'Paid social',
        halliardBuys: true,
        properties: [
          { name: 'Instagram', icon: 'instagram', cpm: 10, fit: 86, spend: { balanced: 26000, reach: 31000 } },
          { name: 'Facebook', icon: 'facebook', cpm: 9, fit: 79, spend: { balanced: 34000, reach: 29000 } },
        ],
      },
      {
        name: 'Online video',
        properties: [
          { name: 'YouTube', icon: 'youtube', cpm: 14, fit: 80, spend: { balanced: 40000, reach: 40000 } },
        ],
      },
    ],
  },
]

const BUDGET = 250000
const SUMMARY: Record<Mode, { reach: number; freq: number }> = {
  balanced: { reach: 61, freq: 4.6 },
  reach: { reach: 66, freq: 4.1 },
}
const ALL_PROPERTIES = PLAN.flatMap(s => s.channels.flatMap(c => c.properties))
const MAX_SPEND = Math.max(...ALL_PROPERTIES.flatMap(p => [p.spend.balanced, p.spend.reach]))

const TWEEN_MS = 1100
const HOLD_MS = 4200

const ease = (t: number) => 1 - Math.pow(1 - t, 3)

/** Every number the grid shows, flattened so one tween can move them all. */
function targetsFor(mode: Mode | 'empty'): number[] {
  if (mode === 'empty') return [...ALL_PROPERTIES.map(() => 0), ...PLAN.map(() => 0), 0, 0]
  return [
    ...ALL_PROPERTIES.map(p => p.spend[mode]),
    ...PLAN.map(s => s.reach[mode]),
    SUMMARY[mode].reach,
    SUMMARY[mode].freq,
  ]
}

function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(false)
  useEffect(() => {
    const q = window.matchMedia('(prefers-reduced-motion: reduce)')
    setReduced(q.matches)
    const on = () => setReduced(q.matches)
    q.addEventListener('change', on)
    return () => q.removeEventListener('change', on)
  }, [])
  return reduced
}

const usd = (v: number) => `$${Math.round(v).toLocaleString('en-US')}`
const compact = (v: number) =>
  v >= 1e6 ? `${(v / 1e6).toFixed(1)}M` : v >= 1000 ? `${Math.round(v / 1000)}K` : `${Math.round(v)}`

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

function FitChip({ fit, show }: { fit: number; show: boolean }) {
  const tone =
    fit >= 80 ? 'bg-primary text-white' : fit >= 70 ? 'bg-tint text-primary' : 'bg-slate-100 text-slate-500'
  return (
    <span
      className={`inline-flex min-w-[2rem] justify-center rounded-full px-2 py-0.5 text-[11px] font-semibold tabular-nums transition-all duration-500 ${tone} ${
        show ? 'opacity-100 scale-100' : 'opacity-0 scale-75'
      }`}
    >
      {fit}
    </span>
  )
}

function Dial({ mode }: { mode: Mode }) {
  return (
    <span className="inline-flex rounded-full bg-slate-100 p-0.5 text-[10px] font-semibold leading-4">
      {(['balanced', 'reach'] as Mode[]).map(m => (
        <span
          key={m}
          className={`rounded-full px-2 py-0.5 transition-colors duration-300 ${
            m === mode ? 'bg-white text-primary shadow-sm' : 'text-slate-500'
          }`}
        >
          {m === 'balanced' ? 'Balanced' : 'Reach'}
        </span>
      ))}
    </span>
  )
}

export function PlanGridHero() {
  const reduced = usePrefersReducedMotion()
  const [mode, setMode] = useState<Mode>('balanced')
  const [values, setValues] = useState<number[]>(() => targetsFor('empty'))
  const [built, setBuilt] = useState(false)
  const fromRef = useRef<number[]>(targetsFor('empty'))
  const valuesRef = useRef(values)
  valuesRef.current = values

  // Tween every number from where it is to the current mode's targets.
  useEffect(() => {
    const to = targetsFor(mode)
    if (reduced) {
      setValues(to)
      setBuilt(true)
      return
    }
    const from = valuesRef.current.slice()
    fromRef.current = from
    const start = performance.now()
    let raf = 0
    const step = (now: number) => {
      const t = Math.min(1, (now - start) / TWEEN_MS)
      const k = ease(t)
      setValues(from.map((f, i) => f + (to[i]! - f) * k))
      if (t < 1) raf = requestAnimationFrame(step)
      else setBuilt(true)
    }
    raf = requestAnimationFrame(step)
    return () => cancelAnimationFrame(raf)
  }, [mode, reduced])

  // Flip the dial on a loop once the plan has been built.
  useEffect(() => {
    if (reduced || !built) return
    const id = window.setTimeout(() => setMode(m => (m === 'balanced' ? 'reach' : 'balanced')), HOLD_MS)
    return () => window.clearTimeout(id)
  }, [built, mode, reduced])

  // Read the tweened values back out in grid order.
  let k = 0
  const spendOf = new Map<Property, number>()
  for (const p of ALL_PROPERTIES) spendOf.set(p, values[k++]!)
  const reachOf = new Map<Strategy, number>()
  for (const s of PLAN) reachOf.set(s, values[k++]!)
  const totalReach = values[k++]!
  const freq = values[k++]!
  const totalSpend = ALL_PROPERTIES.reduce((sum, p) => sum + spendOf.get(p)!, 0)
  const totalImpr = ALL_PROPERTIES.reduce((sum, p) => sum + (spendOf.get(p)! / p.cpm) * 1000, 0)

  const cell = 'px-2 py-1.5 whitespace-nowrap overflow-hidden text-ellipsis'
  const num = `${cell} text-right tabular-nums`

  return (
    <div className="text-[12.5px] text-slate-800">
      {/* Summary strip */}
      <div className="grid grid-cols-2 gap-px overflow-hidden rounded-lg border border-tint bg-tint sm:grid-cols-4">
        {[
          { label: 'Budget', value: usd(BUDGET) },
          { label: 'Planned', value: usd(totalSpend) },
          { label: 'Reach 1+', value: `${totalReach.toFixed(0)}%` },
          { label: 'Avg. freq.', value: freq ? freq.toFixed(1) : '0.0' },
        ].map(s => (
          <div key={s.label} className="bg-white px-3 py-2">
            <div className="text-[10px] font-semibold uppercase tracking-[0.6px] text-slate-500">{s.label}</div>
            <div className="mt-0.5 text-[15px] font-semibold tabular-nums text-slate-900">{s.value}</div>
          </div>
        ))}
      </div>

      {/* Toolbar: the planner's reach <-> fit dial */}
      <div className="mt-3 flex items-center justify-between gap-3">
        <span className="text-[11px] font-medium text-slate-500">Base plan · 2 strategies · 8 properties</span>
        <Dial mode={mode} />
      </div>

      {/* Grid */}
      <div className="mt-2 overflow-hidden rounded-lg border border-slate-200">
        <table className="w-full table-fixed border-collapse">
          <colgroup>
            <col />
            <col className="w-[34%] sm:w-[30%] xl:w-[27%]" />
            <col className="hidden w-[10%] sm:table-column" />
            <col className="hidden w-[11%] md:table-column" />
            <col className="hidden w-[10%] sm:table-column" />
            <col className="w-[17%] sm:w-[10%]" />
          </colgroup>
          <thead>
            <tr className="bg-slate-50 text-[10.5px] font-semibold uppercase tracking-[0.6px] text-slate-500">
              <th className={`${cell} text-left`}>Plan</th>
              <th className={`${cell} text-left`}>Spend</th>
              <th className={`${num} hidden sm:table-cell`}>Impr.</th>
              <th className={`${num} hidden md:table-cell`}>CPM</th>
              <th className={`${num} hidden sm:table-cell`}>Reach</th>
              <th className={`${cell} text-center`}>Fit</th>
            </tr>
          </thead>
          <tbody>
            {PLAN.map(strategy => {
              const sSpend = strategy.channels.reduce(
                (sum, c) => sum + c.properties.reduce((x, p) => x + spendOf.get(p)!, 0),
                0,
              )
              const sImpr = strategy.channels.reduce(
                (sum, c) => sum + c.properties.reduce((x, p) => x + (spendOf.get(p)! / p.cpm) * 1000, 0),
                0,
              )
              return (
                <React.Fragment key={strategy.name}>
                  <tr className="border-t border-slate-200 bg-tint/30">
                    <td className={cell}>
                      <div className="flex items-center gap-1.5">
                        <ChevronDown className="h-3.5 w-3.5 text-slate-400" aria-hidden />
                        <div className="leading-tight">
                          <div className="font-semibold text-slate-900">{strategy.name}</div>
                          <div className="text-[11px] text-slate-500">{strategy.audience}</div>
                        </div>
                      </div>
                    </td>
                    <td className={`${cell} font-semibold tabular-nums`}>
                      {usd(sSpend)}
                    </td>
                    <td className={`${num} hidden sm:table-cell font-semibold`}>{compact(sImpr)}</td>
                    <td className={`${num} hidden md:table-cell text-slate-400`}>—</td>
                    <td className={`${num} hidden sm:table-cell font-semibold`}>{reachOf.get(strategy)!.toFixed(0)}%</td>
                    <td className={cell} />
                  </tr>
                  {strategy.channels.map(channel => {
                    const cSpend = channel.properties.reduce((x, p) => x + spendOf.get(p)!, 0)
                    const cImpr = channel.properties.reduce((x, p) => x + (spendOf.get(p)! / p.cpm) * 1000, 0)
                    return (
                      <React.Fragment key={channel.name}>
                        <tr className="border-t border-slate-100">
                          <td className={cell}>
                            <div className="flex items-center gap-1.5 pl-2 sm:pl-3.5">
                              <ChevronDown className="h-3 w-3 text-slate-400" aria-hidden />
                              <span className="font-medium">{channel.name}</span>
                              {channel.halliardBuys ? (
                                <span className="ml-1 inline-flex items-center" title="Halliard can buy this for you">
                                  <Logo name="halliard-mark" size={15} />
                                </span>
                              ) : null}
                            </div>
                          </td>
                          <td className={`${cell} font-medium tabular-nums`}>{usd(cSpend)}</td>
                          <td className={`${num} hidden sm:table-cell`}>{compact(cImpr)}</td>
                          <td className={`${num} hidden md:table-cell`}>
                            {cImpr ? `$${((cSpend / cImpr) * 1000).toFixed(2)}` : '—'}
                          </td>
                          <td className={`${num} hidden sm:table-cell`} />
                          <td className={cell} />
                        </tr>
                        {channel.properties.map(p => {
                          const spend = spendOf.get(p)!
                          return (
                            <tr key={p.name} className="border-t border-slate-100">
                              <td className={cell}>
                                <div className="flex items-center gap-2 pl-5 sm:pl-8">
                                  <Logo name={p.icon} />
                                  <span>{p.name}</span>
                                </div>
                              </td>
                              <td className={cell}>
                                <div className="flex items-center gap-2">
                                  <span className="w-[4.25rem] shrink-0 tabular-nums">{usd(spend)}</span>
                                  <span className="hidden h-1.5 min-w-0 flex-1 overflow-hidden rounded-full bg-slate-100 xl:block">
                                    <span
                                      className="block h-full rounded-full bg-gradient-to-r from-primary to-secondary"
                                      style={{ width: `${(spend / MAX_SPEND) * 100}%` }}
                                    />
                                  </span>
                                </div>
                              </td>
                              <td className={`${num} hidden sm:table-cell text-slate-600`}>
                                {compact((spend / p.cpm) * 1000)}
                              </td>
                              <td className={`${num} hidden md:table-cell text-slate-600`}>${p.cpm.toFixed(2)}</td>
                              <td className={`${num} hidden sm:table-cell`} />
                              <td className={`${cell} text-center`}>
                                <FitChip fit={p.fit} show={built || spend > 1000} />
                              </td>
                            </tr>
                          )
                        })}
                      </React.Fragment>
                    )
                  })}
                </React.Fragment>
              )
            })}
          </tbody>
        </table>
      </div>
      <div className="mt-2.5 flex flex-wrap items-center justify-between gap-x-4 gap-y-1.5 text-[11px] text-slate-500">
        <span>
          {mode === 'reach'
            ? 'Reach first: budget moves to the properties that add the most new people.'
            : 'Balanced: impressions count by how well each property fits the job.'}
        </span>
        <span className="inline-flex items-center gap-1.5">
          <Logo name="halliard-mark" size={13} />
          Halliard can buy this for you. Optional.
        </span>
      </div>
    </div>
  )
}
