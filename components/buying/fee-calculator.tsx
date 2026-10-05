import React, { useMemo, useState } from 'react'
import { Minus, Plus } from 'lucide-react'
import { estimateFee, RULES, type FeeInput } from './fee-model'

/**
 * The pricing page's calculator: describe a campaign, see a freelance buyer's
 * hours by stage, what that would cost, and Halliard's fee. Uses the same
 * rules the client portal uses to show a campaign's fee (fee-model.ts).
 */

const PRESETS: { name: string; input: FeeInput }[] = [
  {
    name: 'Streaming TV launch',
    input: { weeks: 13, platforms: 1, packages: 3, video: true, segments: true, finerThanDma: false, auction: true, deliveryRisk: false },
  },
  {
    name: 'Local social sprint',
    input: { weeks: 4, platforms: 1, packages: 2, video: false, segments: false, finerThanDma: true, auction: true, deliveryRisk: false },
  },
  {
    name: 'Two-platform launch',
    input: { weeks: 8, platforms: 2, packages: 5, video: true, segments: true, finerThanDma: false, auction: true, deliveryRisk: false },
  },
  {
    name: 'Always-on social',
    input: { weeks: 26, platforms: 1, packages: 2, video: false, segments: false, finerThanDma: false, auction: true, deliveryRisk: false },
  },
]

const TOGGLES: { key: keyof FeeInput; label: string; hint: string }[] = [
  { key: 'video', label: 'Video or CTV creative', hint: 'Specs and completion goals to manage' },
  { key: 'segments', label: 'Third-party audience segments', hint: 'Segments to choose and check' },
  { key: 'finerThanDma', label: 'ZIP or radius targeting', hint: 'Geography finer than the DMA' },
  { key: 'auction', label: 'Auction buying', hint: 'Bids to set and watch, as on social' },
  { key: 'deliveryRisk', label: 'Narrow audience', hint: 'Likely to under-pace, so more monitoring' },
]

const usd = (v: number) => `$${Math.round(v).toLocaleString('en-US')}`

function Stepper({
  id,
  label,
  value,
  min,
  max,
  onChange,
}: {
  id: string
  label: string
  value: number
  min: number
  max: number
  onChange: (v: number) => void
}) {
  return (
    <div className="flex items-center justify-between gap-3">
      <label htmlFor={id} className="text-sm font-medium text-slate-800">
        {label}
      </label>
      <div className="inline-flex items-center rounded-full bg-slate-100 p-1">
        <button
          type="button"
          aria-label={`Fewer ${label.toLowerCase()}`}
          onClick={() => onChange(Math.max(min, value - 1))}
          className="inline-flex h-8 w-8 items-center justify-center rounded-full text-slate-600 hover:bg-white disabled:opacity-40"
          disabled={value <= min}
        >
          <Minus className="h-4 w-4" aria-hidden />
        </button>
        <output id={id} className="w-8 text-center text-sm font-semibold tabular-nums text-slate-900">
          {value}
        </output>
        <button
          type="button"
          aria-label={`More ${label.toLowerCase()}`}
          onClick={() => onChange(Math.min(max, value + 1))}
          className="inline-flex h-8 w-8 items-center justify-center rounded-full text-slate-600 hover:bg-white disabled:opacity-40"
          disabled={value >= max}
        >
          <Plus className="h-4 w-4" aria-hidden />
        </button>
      </div>
    </div>
  )
}

export function FeeCalculator() {
  const [input, setInput] = useState<FeeInput>(PRESETS[0]!.input)
  const fee = useMemo(() => estimateFee(input), [input])
  const set = <K extends keyof FeeInput>(key: K, value: FeeInput[K]) => setInput(prev => ({ ...prev, [key]: value }))
  const maxStage = Math.max(...fee.breakdown.map(b => b.hours), 1)
  const preset = PRESETS.find(p => JSON.stringify(p.input) === JSON.stringify(input))?.name

  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
      {/* Inputs */}
      <form className="rounded-2xl border border-tint bg-white p-6 shadow-lg" onSubmit={e => e.preventDefault()}>
        <fieldset>
          <legend className="text-xs font-semibold uppercase tracking-[0.6px] text-slate-500">Start from an example</legend>
          <div className="mt-2.5 flex flex-wrap gap-2">
            {PRESETS.map(p => (
              <button
                key={p.name}
                type="button"
                onClick={() => setInput(p.input)}
                aria-pressed={preset === p.name}
                className={`rounded-full px-3.5 py-1.5 text-sm font-medium transition-colors ${
                  preset === p.name ? 'bg-primary text-white' : 'bg-tint/60 text-primary hover:bg-tint'
                }`}
              >
                {p.name}
              </button>
            ))}
          </div>
        </fieldset>

        <div className="mt-6 flex flex-col gap-5 border-t border-slate-100 pt-6">
          <div>
            <div className="flex items-center justify-between">
              <label htmlFor="fee-weeks" className="text-sm font-medium text-slate-800">
                Flight length
              </label>
              <span className="text-sm font-semibold tabular-nums text-slate-900">
                {input.weeks} {input.weeks === 1 ? 'week' : 'weeks'}
              </span>
            </div>
            <input
              id="fee-weeks"
              type="range"
              min={1}
              max={52}
              value={input.weeks}
              onChange={e => set('weeks', Number(e.target.value))}
              className="mt-2.5 w-full accent-[rgb(38,50,133)]"
            />
          </div>
          <Stepper id="fee-platforms" label="Platforms" value={input.platforms} min={1} max={4} onChange={v => set('platforms', v)} />
          <Stepper id="fee-packages" label="Packages or ad sets" value={input.packages} min={1} max={12} onChange={v => set('packages', v)} />
        </div>

        <fieldset className="mt-6 border-t border-slate-100 pt-6">
          <legend className="sr-only">What the campaign involves</legend>
          <div className="flex flex-col gap-3">
            {TOGGLES.map(t => {
              const on = input[t.key] as boolean
              return (
                <label key={t.key} className="flex cursor-pointer items-start justify-between gap-4">
                  <span className="leading-tight">
                    <span className="block text-sm font-medium text-slate-800">{t.label}</span>
                    <span className="block text-xs text-slate-500">{t.hint}</span>
                  </span>
                  <input type="checkbox" checked={on} onChange={e => set(t.key, e.target.checked)} className="peer sr-only" />
                  <span
                    aria-hidden
                    className={`relative mt-0.5 inline-flex h-6 w-11 shrink-0 items-center rounded-full transition-colors peer-focus-visible:ring-2 peer-focus-visible:ring-primary peer-focus-visible:ring-offset-2 ${
                      on ? 'bg-primary' : 'bg-slate-200'
                    }`}
                  >
                    <span
                      className={`absolute h-5 w-5 rounded-full bg-white shadow transition-transform ${on ? 'translate-x-[22px]' : 'translate-x-0.5'}`}
                    />
                  </span>
                </label>
              )
            })}
          </div>
        </fieldset>
      </form>

      {/* Result */}
      <div className="flex flex-col gap-4" aria-live="polite">
        <div className="rounded-2xl border border-tint bg-white p-6 shadow-lg">
          <div className="text-xs font-semibold uppercase tracking-[0.6px] text-slate-500">A freelance buyer's hours</div>
          <ul className="mt-3 flex flex-col gap-2">
            {fee.breakdown.map(b => (
              <li key={b.label} className="grid grid-cols-[6rem_minmax(0,1fr)_3.75rem] items-center gap-3 text-sm">
                <span className="text-slate-600">{b.label}</span>
                <span className="h-2.5 overflow-hidden rounded-full bg-slate-100">
                  <span
                    className="block h-full rounded-full bg-slate-400 transition-[width] duration-500 ease-out"
                    style={{ width: `${(b.hours / maxStage) * 100}%` }}
                  />
                </span>
                <span className="text-right tabular-nums text-slate-800">{b.hours.toFixed(1)}h</span>
              </li>
            ))}
          </ul>
          <div className="mt-4 flex flex-wrap items-baseline justify-between gap-2 border-t border-slate-100 pt-4 text-sm">
            <span className="text-slate-600">
              About <span className="font-semibold tabular-nums text-slate-900">{Math.round(fee.hours)} hours</span>{' '}
              <span className="text-slate-400">
                ({Math.round(fee.lowHours)}–{Math.round(fee.highHours)})
              </span>{' '}
              × ${RULES.hourlyRate}/hr
            </span>
            <span className="font-display text-2xl tabular-nums text-slate-400 line-through decoration-slate-400">
              {usd(fee.freelancer)}
            </span>
          </div>
          {fee.minimumApplied ? (
            <p className="mt-1 text-xs text-slate-500">
              A freelancer's minimum of {usd(RULES.minimumProjectFee)} applies to a campaign this size.
            </p>
          ) : null}
        </div>

        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-primary to-secondary p-6 text-white shadow-xl shadow-primary/20">
          <div className="flex items-start justify-between gap-4">
            <div>
              <div className="flex items-center gap-2">
                <img src="/plan-grid/halliard-mark.png" alt="" className="h-6 w-6 rounded bg-white p-0.5" />
                <span className="font-semibold">Halliard's campaign fee</span>
              </div>
              <p className="mt-1 text-sm text-white/80">30% of the freelancer's estimate</p>
            </div>
            <div className="text-right">
              <div className="font-display text-4xl font-medium tabular-nums">{usd(fee.halliard)}</div>
              <div className="text-sm text-white/80">
                saves {usd(fee.freelancer - fee.halliard)} on a freelancer
              </div>
            </div>
          </div>
        </div>
        <p className="text-xs leading-relaxed text-slate-500">
          An estimate from the same rules the client portal uses. Each campaign shows its own fee, worked out from what is
          actually in it, before you approve it.
        </p>
      </div>
    </div>
  )
}
