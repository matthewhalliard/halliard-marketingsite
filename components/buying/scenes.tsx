import React from 'react'
import { AlertTriangle, Check, CheckCircle2, Clock, Loader2 } from 'lucide-react'
import { appear, prog, useTimeline } from '../plan/motion'
import { PlanGridHero } from '../plan/plan-grid-hero'

/**
 * The /buying-desk scenes: likenesses of the client portal's Campaigns tab
 * and a live campaign, using its own labels ("Campaign fee", "Going live is
 * approved separately") and the same example
 * brief as /plan (a DFW HVAC spring launch).
 *
 * The fee figures come from Halliard3's campaign-fee rules
 * (packages/pubmatic/src/campaign-fee.ts) for this example: one PubMatic
 * campaign, 13 weeks, three video packages with audience segments. About 64
 * buyer hours at $85/hr is $5,442; Halliard's fee is 30% of that, $1,633.
 * Change them together if those rules change.
 */

const FREELANCER = 5442
const HALLIARD = 1633
const HOURS = 64
const RATE = 85
const BREAKDOWN = [
  { label: 'Planning', hours: 4.5 },
  { label: 'Setup', hours: 13 },
  { label: 'Launch', hours: 1.3 },
  { label: 'Monitoring', hours: 38.6 },
  { label: 'Reporting', hours: 6.7 },
]

const usd = (v: number) => `$${Math.round(v).toLocaleString('en-US')}`

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

function Label({ children }: { children: React.ReactNode }) {
  return <div className="text-[10px] font-semibold uppercase tracking-[0.6px] text-slate-500">{children}</div>
}

/* -------------------------------------------------------- Campaigns tab */

const PACKAGES = [
  { name: 'Paramount+', logo: 'paramount-plus', format: '15s video', budget: 42000 },
  { name: 'Pluto TV', logo: 'pluto', format: '15s video', budget: 36000 },
  { name: 'Tubi', logo: 'tubi', format: '15s video', budget: 32000 },
]

/**
 * The hero: Halliard drafts the campaign from the approved plan,
 * checks each package's creative, shows the campaign fee against a
 * freelancer's, and goes live once you approve it.
 */
export function CampaignScene() {
  const { ref, t, opacity } = useTimeline(13000)
  const asking = t < 1700
  const feeIn = prog(t, 4600, 900)
  const approved = t > 8000
  return (
    <div ref={ref} className="text-[12.5px] text-slate-800" style={{ opacity }}>
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <Logo name="halliard-mark" size={20} />
          <div className="leading-tight">
            <div className="font-semibold text-slate-900">Campaign · Build fame</div>
            <div className="text-[11px] text-slate-500">Mar 2 – May 31 · 13 weeks · Dallas–Fort Worth</div>
          </div>
        </div>
        <span
          className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-[10.5px] font-semibold ${
            approved ? 'bg-primary text-white' : 'bg-tint/70 text-primary'
          }`}
        >
          {approved ? <Check className="h-3 w-3" aria-hidden /> : null}
          {approved ? 'Live' : asking ? 'Drafting' : 'Draft'}
        </span>
      </div>

      <div className="mt-3 flex min-h-[1.25rem] items-center gap-1.5 text-[11.5px] text-primary">
        {asking ? (
          <>
            <Loader2 className="h-3.5 w-3.5 animate-spin" aria-hidden />
            Halliard is finding the inventory and audiences that suit each strategy
          </>
        ) : (
          <span className="text-slate-500" style={appear(t, 1700)}>
            Drafted from the approved plan · 3 packages · {usd(110000)}
          </span>
        )}
      </div>

      <div className="mt-2 overflow-hidden rounded-lg border border-slate-200">
        <div className="grid grid-cols-[minmax(0,1fr)_5.5rem_5rem] bg-slate-50 px-2.5 py-1.5 text-[10px] font-semibold uppercase tracking-[0.5px] text-slate-500 sm:grid-cols-[minmax(0,1fr)_7rem_5.5rem_6rem]">
          <span>Package</span>
          <span className="hidden sm:block">Audience</span>
          <span className="text-right">Budget</span>
          <span className="text-right">Creative</span>
        </div>
        {PACKAGES.map((p, i) => {
          const at = 1800 + i * 350
          const checked = t > 3000 + i * 450
          return (
            <div
              key={p.name}
              className="grid grid-cols-[minmax(0,1fr)_5.5rem_5rem] items-center border-t border-slate-100 px-2.5 py-2 sm:grid-cols-[minmax(0,1fr)_7rem_5.5rem_6rem]"
              style={appear(t, at)}
            >
              <span className="flex min-w-0 items-center gap-2">
                <Logo name={p.logo} />
                <span className="min-w-0 leading-tight">
                  <span className="block truncate font-medium text-slate-900">{p.name}</span>
                  <span className="block text-[10.5px] text-slate-500">{p.format}</span>
                </span>
              </span>
              <span className="hidden truncate text-[11px] sm:block">
                <span className="rounded-full bg-tint/70 px-2 py-0.5 text-primary">Homeowners 35–64</span>
              </span>
              <span className="text-right tabular-nums">{usd(p.budget)}</span>
              <span className="flex justify-end">
                {checked ? (
                  <span className="inline-flex items-center gap-1 text-[11px] font-medium text-primary">
                    <CheckCircle2 className="h-3.5 w-3.5" aria-hidden /> Ready
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1 text-[11px] text-slate-500">
                    <Loader2 className="h-3 w-3 animate-spin" aria-hidden /> Checking specs
                  </span>
                )}
              </span>
            </div>
          )
        })}
      </div>

      {/* The Campaigns tab's fee band */}
      <div className="mt-3 flex flex-col gap-1.5 rounded-2xl bg-tint/45 px-4 py-3" style={appear(t, 4400)}>
        <div className="flex flex-wrap items-center justify-between gap-x-3 gap-y-1">
          <span className="text-[13px] font-medium text-primary">Campaign fee</span>
          <span className="inline-flex items-center gap-2 tabular-nums">
            <span className="text-[13px] text-slate-500">
              <span className="line-through decoration-slate-400">{usd(FREELANCER * feeIn)}</span> freelancer
            </span>
            <span className="text-slate-400">/</span>
            <span className="font-display text-[19px] font-medium leading-none text-slate-900">{usd(HALLIARD * feeIn)}</span>
            <img src="/halliard-logo.png" alt="Halliard" className="h-[15px] w-auto" />
          </span>
        </div>
        <p className="m-0 text-[11.5px] leading-snug text-slate-500">
          A freelance buyer would take about {HOURS} hours at ${RATE}/hr to plan, buy, monitor and report on this campaign.
        </p>
      </div>

      <div className="mt-3 flex flex-wrap items-center justify-between gap-2" style={appear(t, 5800)}>
        <span className="text-[11px] text-slate-500">Going live is approved separately</span>
        <span
          className={`inline-flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-[12px] font-semibold transition-colors duration-300 ${
            approved ? 'bg-white text-primary ring-1 ring-primary' : 'bg-primary text-white'
          }`}
          style={{ transform: t > 7700 && t < 8000 ? 'scale(0.94)' : 'none' }}
        >
          {approved ? (
            <>
              <Clock className="h-3.5 w-3.5" aria-hidden /> Live · pacing checked every 6 hours
            </>
          ) : (
            'Approve to go live'
          )}
        </span>
      </div>
    </div>
  )
}

/* --------------------------------------------------------- Live and paced */

const LINES = [
  { name: 'Paramount+', logo: 'paramount-plus', pace: 98, after: 99, budget: 42000, afterBudget: 46000 },
  { name: 'Pluto TV', logo: 'pluto', pace: 101, after: 101, budget: 36000, afterBudget: 36000 },
  { name: 'Tubi', logo: 'tubi', pace: 99, after: 99, budget: 32000, afterBudget: 32000 },
  { name: 'Instagram', logo: 'instagram', pace: 103, after: 102, budget: 26000, afterBudget: 30000 },
  { name: 'Facebook', logo: 'facebook', pace: 72, after: 96, budget: 34000, afterBudget: 30000 },
]

/**
 * Step 3: the campaign is live. A check finds Facebook under-pacing, Halliard
 * proposes moving budget, you approve it, and the lines settle.
 */
export function LiveScene() {
  const { ref, t, opacity } = useTimeline(13000)
  const flagged = t > 2200
  const proposal = t > 3200
  const approved = t > 6200
  const settle = prog(t, 6400, 1400)
  return (
    <div ref={ref} className="text-[12.5px] text-slate-800" style={{ opacity }}>
      <div className="flex flex-wrap items-center justify-between gap-2">
        <span className="font-semibold text-slate-900">Spring launch · live</span>
        <span className="inline-flex items-center gap-1 text-[11px] text-slate-500">
          <Clock className="h-3.5 w-3.5" aria-hidden /> Checked {t < 1200 ? 'just now' : '2 hours ago'} · every 6 hours
        </span>
      </div>
      <div className="mt-2.5 overflow-hidden rounded-lg border border-slate-200">
        <div className="grid grid-cols-[minmax(0,1fr)_minmax(0,1.3fr)_3.25rem] bg-slate-50 px-2.5 py-1.5 text-[10px] font-semibold uppercase tracking-[0.5px] text-slate-500">
          <span>Line</span>
          <span>Delivery vs. plan</span>
          <span className="text-right">Pace</span>
        </div>
        {LINES.map((l, i) => {
          const pace = l.pace + (l.after - l.pace) * settle
          const low = pace < 90 && flagged
          const fill = Math.min(100, pace) * prog(t, 200 + i * 150, 900)
          return (
            <div key={l.name} className="grid grid-cols-[minmax(0,1fr)_minmax(0,1.3fr)_3.25rem] items-center border-t border-slate-100 px-2.5 py-1.5">
              <span className="flex min-w-0 items-center gap-2">
                <Logo name={l.logo} size={15} />
                <span className="truncate">{l.name}</span>
              </span>
              <span className="relative h-2 overflow-hidden rounded-full bg-slate-100">
                <span
                  className={`block h-full rounded-full transition-colors duration-500 ${low ? 'bg-amber-500' : 'bg-gradient-to-r from-secondary to-primary'}`}
                  style={{ width: `${fill}%` }}
                />
              </span>
              <span className={`text-right tabular-nums font-medium ${low ? 'text-amber-700' : 'text-slate-700'}`}>
                {Math.round(pace)}%
              </span>
            </div>
          )
        })}
      </div>

      {/* The proposal that waits for a person */}
      <div className="mt-3 rounded-lg border border-tint bg-white p-3 shadow-sm" style={appear(t, 3200)}>
        {proposal ? (
          <>
            <div className="flex items-start gap-2">
              <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0 text-amber-600" aria-hidden />
              <div className="min-w-0 leading-snug">
                <div className="font-semibold text-slate-900">Facebook is under-pacing at 72%</div>
                <div className="text-[11.5px] text-slate-600">
                  Move {usd(4000)} from Facebook to Instagram, which is delivering ahead of plan.
                </div>
              </div>
            </div>
            <div className="mt-2.5 flex items-center justify-between gap-2">
              <span className="text-[11px] text-slate-500">{approved ? 'Approved by you · logged' : 'Waiting for your approval'}</span>
              <span
                className={`inline-flex items-center gap-1 rounded-full px-3 py-1 text-[11px] font-semibold transition-colors duration-300 ${
                  approved ? 'bg-primary text-white' : 'bg-white text-primary ring-1 ring-primary'
                }`}
                style={{ transform: t > 5900 && t < 6200 ? 'scale(0.94)' : 'none' }}
              >
                {approved ? <Check className="h-3 w-3" aria-hidden /> : null}
                {approved ? 'Approved' : 'Approve'}
              </span>
            </div>
          </>
        ) : null}
      </div>
    </div>
  )
}

/* ------------------------------------------------------------- The fee */

/**
 * What it costs: the freelancer's hours, stage by stage, priced at $85/hr,
 * then Halliard's fee at 30% of that.
 */
export function FeeScene() {
  const { ref, t, opacity } = useTimeline(11000)
  const max = Math.max(...BREAKDOWN.map(b => b.hours))
  const total = BREAKDOWN.reduce((sum, b, i) => sum + b.hours * prog(t, 300 + i * 350, 700), 0)
  const priced = prog(t, 2600, 900)
  const cut = prog(t, 4000, 700)
  return (
    <div ref={ref} className="text-[12.5px] text-slate-800" style={{ opacity }}>
      <Label>A freelance buyer's hours</Label>
      <ul className="mt-2 flex flex-col gap-1.5">
        {BREAKDOWN.map((b, i) => {
          const p = prog(t, 300 + i * 350, 700)
          return (
            <li key={b.label} className="grid grid-cols-[5.5rem_minmax(0,1fr)_3.5rem] items-center gap-2">
              <span className="text-slate-600">{b.label}</span>
              <span className="h-2.5 overflow-hidden rounded-full bg-slate-100">
                <span className="block h-full rounded-full bg-slate-400" style={{ width: `${(b.hours / max) * 100 * p}%` }} />
              </span>
              <span className="text-right tabular-nums">{(b.hours * p).toFixed(1)}h</span>
            </li>
          )
        })}
      </ul>
      <div className="mt-3 flex items-baseline justify-between border-t border-slate-100 pt-2.5">
        <span className="text-slate-600">
          About <span className="font-semibold tabular-nums text-slate-900">{Math.round(total)} hours</span> × ${RATE}/hr
        </span>
        <span className="relative font-display text-[22px] font-medium tabular-nums text-slate-500">
          {usd(FREELANCER * priced)}
          <span
            className="absolute left-0 top-1/2 h-[2px] -translate-y-1/2 bg-slate-400"
            style={{ width: `${cut * 100}%` }}
          />
        </span>
      </div>
      <div
        className="mt-3 flex items-center justify-between rounded-xl bg-gradient-to-r from-primary to-secondary px-4 py-3 text-white"
        style={appear(t, 4400, 600)}
      >
        <span className="flex items-center gap-2">
          <img src="/plan-grid/halliard-mark.png" alt="" className="h-6 w-6 rounded bg-white p-0.5" />
          <span className="leading-tight">
            <span className="block font-semibold">Halliard's campaign fee</span>
            <span className="block text-[11px] text-white/80">30% of the freelancer's estimate</span>
          </span>
        </span>
        <span className="font-display text-[26px] font-medium tabular-nums">{usd(HALLIARD * prog(t, 4500, 900))}</span>
      </div>
      <p className="mt-2.5 text-[11px] leading-snug text-slate-500">
        Example: a 13-week streaming TV campaign with three video packages and audience segments. Every campaign shows its own
        estimate before you approve it.
      </p>
    </div>
  )
}

/** The hero plan from /plan, without impressions and CPM, to fit a step's half-width frame. */
export function NarrowPlan() {
  return <PlanGridHero narrow />
}
