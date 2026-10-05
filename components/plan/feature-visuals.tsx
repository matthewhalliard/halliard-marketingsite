import React from 'react'
import { Check, CheckCircle2, ChevronDown, Clock, MapPin } from 'lucide-react'
import { appear, prog, useTimeline } from './motion'

/**
 * Small looping scenes for the "after you approve" cards, one per card, in
 * the same visual language as the hero grid and the step scenes. Each runs
 * only while on screen and holds its finished frame under reduced motion.
 * Illustrative, not a client's data.
 */

// PubMatic's mark is only a colour square at these sizes; the portal draws its initial over it.
const INITIALS: Record<string, string> = { pubmatic: 'P' }

function Logo({ name, size = 16 }: { name: string; size?: number }) {
  return (
    <span className="relative inline-flex shrink-0" style={{ width: size, height: size }}>
      <img src={`/plan-grid/${name}.png`} alt="" width={size} height={size} className="rounded-[4px]" style={{ width: size, height: size }} />
      {INITIALS[name] ? (
        <span className="absolute inset-0 flex items-center justify-center font-bold text-white" style={{ fontSize: size * 0.6 }}>
          {INITIALS[name]}
        </span>
      ) : null}
    </span>
  )
}

function Stage({ children, innerRef, opacity }: { children: React.ReactNode; innerRef: React.Ref<HTMLDivElement>; opacity: number }) {
  return (
    <div
      ref={innerRef}
      className="relative h-40 overflow-hidden rounded-xl border border-tint bg-gradient-to-b from-tint/30 to-white p-3 text-[11.5px] text-slate-700"
      aria-hidden
    >
      <div style={{ opacity }}>{children}</div>
    </div>
  )
}

/** Nothing buys without you: a plan waits for its approval, then each line is cleared. */
export function ApproveVisual() {
  const { ref, t, opacity } = useTimeline(7000)
  const approved = t > 2000
  const lines = [
    { name: 'Paramount+', logo: 'paramount-plus', spend: '$42,000' },
    { name: 'Instagram', logo: 'instagram', spend: '$26,000' },
    { name: 'Tubi', logo: 'tubi', spend: '$32,000' },
  ]
  return (
    <Stage innerRef={ref} opacity={opacity}>
      <div className="flex items-center justify-between">
        <span className="font-semibold text-slate-900">Spring launch · Base plan</span>
        <span
          className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-[10.5px] font-semibold transition-colors duration-300 ${
            approved ? 'bg-primary text-white' : 'bg-white text-primary ring-1 ring-primary'
          }`}
          style={{ transform: t > 1700 && t < 2000 ? 'scale(0.94)' : 'none' }}
        >
          {approved ? <Check className="h-3 w-3" aria-hidden /> : null}
          {approved ? 'Approved by you' : 'Approve plan'}
        </span>
      </div>
      <ul className="mt-2.5 flex flex-col gap-1.5">
        {lines.map((l, i) => {
          const ok = t > 2400 + i * 350
          return (
            <li key={l.name} className="flex items-center gap-2 rounded-md bg-white px-2 py-1 ring-1 ring-slate-100" style={appear(t, 200 + i * 150)}>
              <Logo name={l.logo} size={14} />
              <span className="flex-1">{l.name}</span>
              <span className="tabular-nums text-slate-500">{l.spend}</span>
              <span className={`inline-flex h-4 w-4 items-center justify-center rounded-full transition-colors duration-300 ${ok ? 'bg-primary text-white' : 'bg-slate-100 text-transparent'}`}>
                <Check className="h-2.5 w-2.5" aria-hidden />
              </span>
            </li>
          )
        })}
      </ul>
    </Stage>
  )
}

/** Pacing, checked every six hours: delivery tracks the target line, with a check every six hours. */
export function PacingVisual() {
  const { ref, t, opacity } = useTimeline(8000)
  const p = prog(t, 300, 4200)
  // Delivery against an even target, a little behind early and caught up by the end.
  const pts = Array.from({ length: 29 }, (_, i) => {
    const x = i / 28
    const y = x - 0.06 * Math.sin(Math.PI * x) * 1.6
    return [8 + x * 224, 84 - y * 70] as const
  })
  const shown = pts.slice(0, Math.max(2, Math.ceil(p * pts.length)))
  const d = shown.map(([x, y], i) => `${i ? 'L' : 'M'}${x.toFixed(1)},${y.toFixed(1)}`).join('')
  const last = shown[shown.length - 1]!
  const checks = [0.25, 0.5, 0.75, 1]
  return (
    <Stage innerRef={ref} opacity={opacity}>
      <div className="flex items-center justify-between">
        <span className="font-semibold text-slate-900">Delivery vs. plan</span>
        <span className="inline-flex items-center gap-1 text-[10.5px] text-slate-500">
          <Clock className="h-3 w-3" aria-hidden /> Checked every 6 hours
        </span>
      </div>
      <svg viewBox="0 0 240 92" className="mt-1 block w-full">
        <line x1="8" y1="84" x2="232" y2="14" stroke="rgb(211,228,255)" strokeWidth="6" strokeLinecap="round" />
        <path d={d} fill="none" stroke="rgb(38,50,133)" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
        {checks.map(c =>
          p >= c ? (
            <circle key={c} cx={8 + c * 224} cy={84 - (c - 0.06 * Math.sin(Math.PI * c) * 1.6) * 70} r="3.2" fill="#fff" stroke="rgb(26,106,180)" strokeWidth="1.6" />
          ) : null,
        )}
        <circle cx={last[0]} cy={last[1]} r="3.6" fill="rgb(38,50,133)" />
      </svg>
      <div className="flex items-center gap-1.5 text-[10.5px] font-medium text-primary" style={appear(t, 4600)}>
        <CheckCircle2 className="h-3.5 w-3.5" aria-hidden /> On pace · 100% of plan delivered
      </div>
    </Stage>
  )
}

/** Every action on the record: entries append to the run's log, newest first. */
const LOG = [
  { time: '09:00', text: 'Read delivery', where: 'meta' },
  { time: '09:01', text: 'Read delivery', where: 'pubmatic' },
  { time: '09:02', text: 'Asked you to approve a budget move', where: 'halliard-mark' },
  { time: '11:40', text: 'You approved: +$4,000 to Paramount+', where: 'halliard-mark' },
  { time: '11:41', text: 'Moved budget to Paramount+', where: 'pubmatic' },
]
export function LedgerVisual() {
  const { ref, t, opacity } = useTimeline(8000)
  const count = Math.min(LOG.length, Math.floor((t - 200) / 800) + 1)
  const visible = LOG.slice(0, Math.max(0, count)).reverse()
  return (
    <Stage innerRef={ref} opacity={opacity}>
      <div className="flex items-center justify-between">
        <span className="font-semibold text-slate-900">Activity</span>
        <span className="text-[10.5px] text-slate-500">Can't be edited or deleted</span>
      </div>
      <ul className="mt-2 flex flex-col gap-1">
        {visible.slice(0, 3).map((e, i) => (
          <li
            key={e.time + e.text}
            className="flex items-center gap-2 rounded-md bg-white px-2 py-1 ring-1 ring-slate-100"
            style={i === 0 ? appear(t, 200 + (count - 1) * 800, 400) : undefined}
          >
            <span className="w-9 shrink-0 tabular-nums text-slate-400">{e.time}</span>
            <Logo name={e.where} size={13} />
            <span className="truncate">{e.text}</span>
          </li>
        ))}
      </ul>
    </Stage>
  )
}

/** Built for local: ZIPs inside the DMA light up as the catchment is drawn. */
const ZIP_PINS = [
  { x: 44, y: 18, label: 'Frisco' },
  { x: 58, y: 34, label: 'Allen' },
  { x: 30, y: 46, label: 'Plano' },
  { x: 60, y: 60, label: 'Wylie' },
]
export function LocalVisual() {
  const { ref, t, opacity } = useTimeline(7000)
  const ring = prog(t, 300, 1400)
  return (
    <Stage innerRef={ref} opacity={opacity}>
      <div className="flex items-center justify-between">
        <span className="font-semibold text-slate-900">Dallas–Fort Worth DMA</span>
        <span className="text-[10.5px] text-slate-500">18 ZIPs in the catchment</span>
      </div>
      <div className="relative mt-2 h-[6.5rem] overflow-hidden rounded-lg bg-white ring-1 ring-slate-100">
        <div
          className="absolute inset-0 opacity-60"
          style={{ backgroundImage: 'radial-gradient(rgba(38,50,133,0.12) 1px, transparent 1px)', backgroundSize: '10px 10px' }}
        />
        <div
          className="absolute rounded-full bg-tint/70 ring-2 ring-primary/30"
          style={{
            left: '52%',
            top: '42%',
            width: `${ring * 62}%`,
            height: `${ring * 92}%`,
            transform: 'translate(-50%, -50%)',
          }}
        />
        {ZIP_PINS.map((z, i) => (
          <div
            key={z.label}
            className="absolute flex items-center gap-0.5 text-[10px] font-medium text-primary"
            style={{ left: `${z.x}%`, top: `${z.y}%`, ...appear(t, 1500 + i * 300, 350) }}
          >
            <MapPin className="h-3.5 w-3.5 fill-white" aria-hidden />
            {z.label}
          </div>
        ))}
      </div>
    </Stage>
  )
}

/** One login, many clients: the sidebar's client selector moves between advertisers. */
const CLIENTS = ['Northside Heating & Air', 'Lakeview Dental Group', 'Riverbend Credit Union', 'Cedar Park Auto']
export function ClientsVisual() {
  const { ref, t, opacity } = useTimeline(8000)
  const active = Math.min(CLIENTS.length - 1, Math.floor(Math.max(0, t - 600) / 1500))
  return (
    <Stage innerRef={ref} opacity={opacity}>
      <div className="flex items-center justify-between rounded-md bg-white px-2 py-1.5 ring-1 ring-slate-200">
        <span className="flex items-center gap-2 truncate">
          <span className="inline-flex h-5 w-5 items-center justify-center rounded bg-primary text-[10px] font-bold text-white">
            {CLIENTS[active]![0]}
          </span>
          <span className="truncate font-semibold text-slate-900">{CLIENTS[active]}</span>
        </span>
        <ChevronDown className="h-3.5 w-3.5 text-slate-400" aria-hidden />
      </div>
      <ul className="mt-1.5 flex flex-col gap-0.5">
        {CLIENTS.map((c, i) => (
          <li
            key={c}
            className={`flex items-center gap-2 rounded-md px-2 py-1 transition-colors duration-300 ${
              i === active ? 'bg-tint/70 text-primary' : 'text-slate-600'
            }`}
          >
            <span className={`h-1.5 w-1.5 rounded-full ${i === active ? 'bg-primary' : 'bg-slate-300'}`} />
            <span className="truncate">{c}</span>
          </li>
        ))}
      </ul>
    </Stage>
  )
}

/** Buys on PubMatic and Meta: the approved plan goes out to each, with its fee shown. */
export function BuyVisual() {
  const { ref, t, opacity } = useTimeline(7000)
  const flow = prog(t, 600, 1200)
  const rows = [
    { logo: 'pubmatic', name: 'PubMatic', note: 'Paramount+, Tubi, Pluto TV', spend: '$110,000' },
    { logo: 'meta', name: 'Meta', note: 'Facebook, Instagram', spend: '$60,000' },
  ]
  return (
    <Stage innerRef={ref} opacity={opacity}>
      <div className="flex items-center gap-2">
        <Logo name="halliard-mark" size={18} />
        <span className="font-semibold text-slate-900">Buying the approved plan</span>
      </div>
      <ul className="mt-2 flex flex-col gap-1.5">
        {rows.map((r, i) => (
          <li key={r.name} className="rounded-md bg-white px-2 py-1.5 ring-1 ring-slate-100" style={appear(t, 300 + i * 250)}>
            <div className="flex items-center gap-2">
              <Logo name={r.logo} size={14} />
              <span className="font-medium text-slate-900">{r.name}</span>
              <span className="truncate text-[10.5px] text-slate-500">{r.note}</span>
              <span className="ml-auto tabular-nums">{r.spend}</span>
            </div>
            <div className="mt-1 h-1 overflow-hidden rounded-full bg-slate-100">
              <span className="block h-full rounded-full bg-gradient-to-r from-secondary to-primary" style={{ width: `${flow * 100}%` }} />
            </div>
          </li>
        ))}
      </ul>
      <div className="mt-1.5 flex items-center justify-between text-[10.5px]" style={appear(t, 2200)}>
        <span className="text-slate-500">Halliard's fee, shown on every campaign</span>
        <span className="inline-flex items-center gap-1 font-medium text-primary">
          <Check className="h-3 w-3" aria-hidden /> Live
        </span>
      </div>
    </Stage>
  )
}
