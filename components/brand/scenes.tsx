import React, { useEffect, useRef, useState } from 'react'
import { Check, Loader2, Lock, ScrollText, ShieldCheck } from 'lucide-react'

/**
 * The brand pages' product windows: connecting, the audit, the plan and the
 * receipts, drawn to match the client portal and animated the way /plan's
 * scenes are: numbers count into place, rows arrive one by one, then the
 * scene loops. Reduced motion shows each one finished and still.
 *
 * Example figures: the audit's totals come from an audit of a real Google Ads
 * account; the searches, plan and receipts are illustrative.
 */

const ease = (t: number) => 1 - Math.pow(1 - t, 3)
const usd = (n: number) => `$${Math.round(n).toLocaleString('en-US')}`

function useReducedMotion() {
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

/**
 * A step counter that walks 0..steps-1 at the given pace and loops after a
 * hold, starting only once the scene is on screen. Reduced motion parks it on
 * the last step.
 */
function useSteps(steps: number, { every = 700, hold = 3500 }: { every?: number; hold?: number } = {}) {
  const reduced = useReducedMotion()
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)
  const [step, setStep] = useState(0)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const io = new IntersectionObserver(([e]) => setVisible(!!e?.isIntersecting), { threshold: 0.3 })
    io.observe(el)
    return () => io.disconnect()
  }, [])
  useEffect(() => {
    if (reduced) {
      setStep(steps - 1)
      return
    }
    if (!visible) return
    const id = window.setTimeout(() => setStep(s => (s + 1) % steps), step === steps - 1 ? hold : every)
    return () => window.clearTimeout(id)
  }, [step, steps, every, hold, visible, reduced])
  return { ref, step: reduced ? steps - 1 : step }
}

/** A number that counts toward its target whenever the target changes. */
function useCount(target: number, ms = 900) {
  const [value, setValue] = useState(0)
  const from = useRef(0)
  useEffect(() => {
    const start = performance.now()
    const a = from.current
    let raf = 0
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / ms)
      const v = a + (target - a) * ease(t)
      from.current = v
      setValue(v)
      if (t < 1) raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [target, ms])
  return value
}

type LogoName = 'google' | 'googleads' | 'meta' | 'facebook' | 'instagram' | 'snapchat' | 'reddit' | 'spotify'

/** Google's mark is drawn here; Meta's family come from the plan grid's icons. */
export function PlatformLogo({ name, size = 18 }: { name: LogoName; size?: number }) {
  if (name === 'google') {
    return (
      <svg viewBox="0 0 48 48" width={size} height={size} aria-hidden className="shrink-0">
        <path fill="#EA4335" d="M24 9.5c3.5 0 6.6 1.2 9.1 3.6l6.8-6.8C35.8 2.4 30.3 0 24 0 14.6 0 6.6 5.4 2.6 13.2l7.9 6.1C12.4 13.6 17.7 9.5 24 9.5z" />
        <path fill="#4285F4" d="M46.1 24.5c0-1.6-.1-3.1-.4-4.5H24v9h12.4c-.5 2.9-2.2 5.3-4.6 7l7.2 5.6c4.2-3.9 7.1-9.7 7.1-17.1z" />
        <path fill="#FBBC05" d="M10.5 28.7c-.5-1.4-.8-3-.8-4.7s.3-3.3.8-4.7l-7.9-6.1C.9 16.5 0 20.1 0 24s.9 7.5 2.6 10.8l7.9-6.1z" />
        <path fill="#34A853" d="M24 48c6.5 0 11.9-2.1 15.9-5.8l-7.2-5.6c-2 1.4-4.7 2.3-8.7 2.3-6.3 0-11.6-4.1-13.5-9.8l-7.9 6.1C6.6 42.6 14.6 48 24 48z" />
      </svg>
    )
  }
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

/* ---------------------------------------------------------------- connect */

/**
 * Every platform a client can connect by signing in, as the portal's connect
 * wall offers them. Google and Meta are where Halliard runs a brand's ads;
 * Snapchat, Reddit and Spotify connect read-only to start.
 */
export const CONNECTORS: { name: string; logo: LogoName; readOnly?: boolean }[] = [
  { name: 'Google Ads', logo: 'googleads' },
  { name: 'Meta', logo: 'meta' },
  { name: 'Snapchat', logo: 'snapchat', readOnly: true },
  { name: 'Reddit', logo: 'reddit', readOnly: true },
  { name: 'Spotify Ads', logo: 'spotify', readOnly: true },
]

export function ConnectScene() {
  // 0 idle · 1 Google signing in · 2 Google connected · 3 Meta signing in · 4 Meta connected · 5 reading · 6 held
  const { ref, step } = useSteps(7, { every: 1000, hold: 3200 })
  const state = (i: number) => {
    if (i === 0) return step === 0 ? 'idle' : step === 1 ? 'busy' : 'done'
    if (i === 1) return step < 3 ? 'idle' : step === 3 ? 'busy' : 'done'
    return 'idle'
  }
  return (
    <div ref={ref} className="flex flex-col gap-2 text-left">
      <div className="grid grid-cols-1 gap-2">
        {CONNECTORS.map((p, i) => {
          const st = state(i)
          return (
            <div
              key={p.name}
              className={`flex items-center justify-between gap-2 rounded-lg border px-3 py-2.5 transition-colors duration-500 ${
                st === 'done' ? 'border-primary/40 bg-tint/40' : 'border-slate-200 bg-white'
              }`}
            >
              <span className="flex min-w-0 items-center gap-2">
                <PlatformLogo name={p.logo} size={20} />
                <span className="truncate text-[13px] font-medium text-slate-900">{p.name}</span>
              </span>
              {st === 'done' ? (
                <span className="inline-flex shrink-0 items-center gap-1 text-[11px] font-medium text-primary">
                  <Check className="h-3.5 w-3.5" aria-hidden /> Connected
                </span>
              ) : st === 'busy' ? (
                <Loader2 className="h-3.5 w-3.5 shrink-0 animate-spin text-slate-500" aria-hidden />
              ) : (
                <span className="shrink-0 text-[11px] text-slate-500">{p.readOnly ? 'Read-only' : 'Sign in'}</span>
              )}
            </div>
          )
        })}
      </div>
      <div className={`flex items-center gap-2 rounded-lg bg-slate-50 px-3 py-2 text-[12px] text-slate-600 transition-opacity duration-500 ${step >= 5 ? 'opacity-100' : 'opacity-0'}`}>
        <Lock className="h-3.5 w-3.5 text-primary" aria-hidden />
        Reading the last 90 days. Nothing changes without your approval.
      </div>
    </div>
  )
}

/** The platforms a client connects by signing in, as a strip of logos. */
export function ConnectorsStrip({ className = '' }: { className?: string }) {
  return (
    <ul className={`flex flex-wrap items-center justify-center gap-x-6 gap-y-3 text-sm text-slate-700 ${className}`}>
      {CONNECTORS.map(c => (
        <li key={c.name} className="inline-flex items-center gap-2 font-medium">
          <PlatformLogo name={c.logo} size={22} />
          {c.name}
        </li>
      ))}
    </ul>
  )
}

/* ------------------------------------------------------------------ audit */

const WASTED: [string, string, number][] = [
  ['free candle making kit', 'Shop · Search', 412],
  ['candle making course', 'Shop · Search', 268],
  ['how to make soy candles', 'Generic', 191],
  ['candle wax wholesale', 'Generic', 147],
]

export function AuditScene() {
  // 0 scanning · 1 totals · 2..5 rows · 6 blocked · 7 held
  const { ref, step } = useSteps(8, { every: 750, hold: 3600 })
  const scanned = step >= 1
  const spent = useCount(scanned ? 5430 : 0)
  const results = useCount(scanned ? 212 : 0)
  const wasted = useCount(scanned ? 2389 : 0, 1400)
  const share = useCount(scanned ? 44 : 0, 1400)
  const rows = Math.max(0, Math.min(WASTED.length, step - 1))
  const blocked = step >= 6
  return (
    <div ref={ref} className="text-left">
      <div className="mb-3 flex items-center justify-between text-[11px] text-slate-500">
        <span className="flex items-center gap-1.5">
          <PlatformLogo name="google" size={14} /> Google Ads · last 90 days
        </span>
        <span className="h-1.5 w-28 overflow-hidden rounded-full bg-slate-100">
          <span className={`block h-full rounded-full bg-primary transition-all ease-out ${scanned ? 'w-full duration-700' : 'w-1/4 duration-300'}`} />
        </span>
      </div>
      <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
        {[
          ['Spent', usd(spent), 'last 90 days', false],
          ['Results', Math.round(results).toLocaleString('en-US'), 'conversions', false],
          ['Cost per result', scanned ? '$26' : '—', '', false],
          ['Never converted', usd(wasted), `${Math.round(share)}% of spend`, true],
        ].map(([label, value, note, hot]) => (
          <div key={label as string} className={`rounded-lg border px-3 py-2 ${hot ? 'border-primary/30 bg-tint/50' : 'border-slate-200 bg-white'}`}>
            <p className="text-[10px] uppercase tracking-wide text-slate-500">{label}</p>
            <p className={`font-display text-lg tabular-nums ${hot ? 'text-primary' : 'text-slate-900'}`}>{value}</p>
            {note ? <p className="text-[11px] text-slate-500">{note}</p> : null}
          </div>
        ))}
      </div>
      <table className="mt-4 w-full text-[12px]">
        <thead>
          <tr className="text-left text-[10px] uppercase tracking-wide text-slate-500">
            <th className="pb-1.5 font-medium">Search that never converted</th>
            <th className="pb-1.5 text-right font-medium">Spent</th>
            <th className="pb-1.5 text-right font-medium" />
          </tr>
        </thead>
        <tbody>
          {WASTED.map(([term, , cost], i) => (
            <tr
              key={term}
              className={`border-t border-slate-100 transition-all duration-500 ${i < rows ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-1'}`}
            >
              <td className={`py-1.5 pr-2 font-medium transition-colors duration-500 ${blocked ? 'text-slate-400 line-through' : 'text-slate-900'}`}>{term}</td>
              <td className="py-1.5 text-right tabular-nums text-slate-900">{usd(cost)}</td>
              <td className="w-20 py-1.5 text-right">
                <span
                  className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-semibold transition-all duration-500 ${
                    blocked ? 'bg-primary text-white opacity-100' : 'opacity-0'
                  }`}
                >
                  <ShieldCheck className="h-3 w-3" aria-hidden /> Blocked
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

/* ------------------------------------------------------------------- plan */

const LINES: { channel: string; logo: LogoName; why: string; spend: [number, number] }[] = [
  { channel: 'Google Search', logo: 'google', why: 'People searching for what you sell', spend: [2000, 2600] },
  { channel: 'Facebook', logo: 'facebook', why: 'Your best customers, and people like them', spend: [1100, 1600] },
  { channel: 'Instagram', logo: 'instagram', why: 'The same audiences, in Reels and Stories', spend: [900, 1800] },
]
const BUDGETS = [4000, 6000]

/** Where the next dollar goes: results flatten as spend climbs, and the plan sits on the curve. */
function Curve({ at }: { at: number }) {
  const W = 220
  const H = 70
  const y = (x: number) => H - 6 - (H - 14) * (1 - Math.exp(-x * 2.4))
  const d = Array.from({ length: 41 }, (_, i) => {
    const x = i / 40
    return `${i ? 'L' : 'M'}${(x * (W - 8) + 4).toFixed(1)},${y(x).toFixed(1)}`
  }).join(' ')
  const cx = at * (W - 8) + 4
  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="h-[70px] w-full" aria-hidden>
      <path d={d} fill="none" stroke="currentColor" strokeWidth="2" className="text-primary/70" />
      <circle cx={cx} cy={y(at)} r="5" className="fill-primary transition-all duration-700" />
    </svg>
  )
}

export function PlanScene() {
  // 0 empty · 1..3 lines arrive · 4 held at $4,000 · 5 budget raised · 6 approve
  const { ref, step } = useSteps(7, { every: 800, hold: 2800 })
  const hi = step >= 5 ? 1 : 0
  const total = useCount(step >= 1 ? BUDGETS[hi]! : 0)
  return (
    <div ref={ref} className="text-left">
      <div className="flex items-center justify-between text-[11px] text-slate-500">
        <span className="uppercase tracking-wide">December plan · online sales</span>
        <span className="rounded-full bg-tint px-2 py-0.5 font-semibold tabular-nums text-primary">{usd(total)} / month</span>
      </div>
      <ul className="mt-3 flex flex-col gap-2">
        {LINES.map((l, i) => {
          const shown = step >= i + 1
          const spend = l.spend[hi]!
          return (
            <li
              key={l.channel}
              className={`rounded-lg border border-slate-200 bg-white px-3 py-2 transition-all duration-500 ${shown ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-1'}`}
            >
              <div className="flex items-center justify-between gap-3">
                <span className="flex items-center gap-2.5">
                  <PlatformLogo name={l.logo} size={20} />
                  <span>
                    <span className="block text-[13px] font-medium text-slate-900">{l.channel}</span>
                    <span className="block text-[11px] text-slate-500">{l.why}</span>
                  </span>
                </span>
                <span className="font-display text-base tabular-nums text-slate-900">{usd(shown ? spend : 0)}</span>
              </div>
              <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-slate-100">
                <div className="h-full rounded-full bg-primary transition-all duration-700 ease-out" style={{ width: shown ? `${(spend / 2600) * 100}%` : '0%' }} />
              </div>
            </li>
          )
        })}
      </ul>
      <div className="mt-3 grid grid-cols-[1fr_auto] items-end gap-3 border-t border-slate-200 pt-3">
        <div>
          <p className="text-[11px] text-slate-500">Where the next dollar goes</p>
          <Curve at={step >= 5 ? 0.62 : step >= 1 ? 0.42 : 0.05} />
        </div>
        <div className="text-right">
          <p className="mb-2 text-[11px] text-slate-500">Halliard $399 flat</p>
          <span
            className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-[12px] font-medium transition-all duration-500 ${
              step >= 6 ? 'bg-primary text-white shadow-lg shadow-primary/30' : 'bg-slate-100 text-slate-500'
            }`}
          >
            <Check className="h-3.5 w-3.5" aria-hidden /> {step >= 6 ? 'Approved' : 'Approve and pay'}
          </span>
        </div>
      </div>
    </div>
  )
}

/* --------------------------------------------------------------- receipts */

const RECEIPTS: { date: string; logo: LogoName; what: string; how: string }[] = [
  { date: 'Dec 3', logo: 'google', what: 'Blocked 91 searches that never converted', how: 'Approved by you' },
  { date: 'Dec 6', logo: 'instagram', what: 'Moved $200 from Instagram to Google Search', how: 'Logged · under your limit' },
  { date: 'Dec 9', logo: 'facebook', what: 'Paused an ad costing 3x the rest per result', how: 'Approved by you' },
  { date: 'Dec 12', logo: 'google', what: 'Raised the bid on your best-selling candle', how: 'Approved by you' },
]

export function ReceiptsScene() {
  const { ref, step } = useSteps(RECEIPTS.length + 1, { every: 1000, hold: 3000 })
  return (
    <div ref={ref} className="flex flex-col gap-2 text-left">
      {RECEIPTS.map((r, i) => {
        const shown = step >= i + 1
        const latest = i === step - 1
        return (
          <div
            key={r.what}
            className={`flex items-start gap-3 rounded-lg border px-3 py-2 transition-all duration-500 ${
              shown ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-2'
            } ${latest ? 'border-primary/40 bg-tint/40' : 'border-slate-200 bg-white'}`}
          >
            <PlatformLogo name={r.logo} size={18} />
            <div className="min-w-0 flex-1">
              <p className="text-[13px] font-medium text-slate-900">{r.what}</p>
              <p className="text-[11px] text-slate-500">
                {r.date} · {r.how}
              </p>
            </div>
            <span className="inline-flex shrink-0 items-center gap-1 text-[10px] font-semibold text-primary">
              <ScrollText className="h-3 w-3" aria-hidden /> Receipt
            </span>
          </div>
        )
      })}
    </div>
  )
}
