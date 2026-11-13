import React from 'react'
import { type LucideIcon } from 'lucide-react'
import { Frame, IconBadge } from '../landing/kit'

/**
 * The demo page's three products, one row each: copy on one side, the
 * product's scene in a portal frame on the other, alternating. The kit's
 * StepRows numbers its rows as steps; these are products, not steps.
 */
export interface ProductRow {
  icon: LucideIcon
  label: string
  title: string
  body: string
  points: { icon: LucideIcon; text: string }[]
  frame: string
  Scene: () => React.JSX.Element
}

export function ProductRows({ rows }: { rows: ProductRow[] }) {
  return (
    <div className="mt-16 flex flex-col gap-20">
      {rows.map((row, i) => (
        <div key={row.label} className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          <div className={i % 2 === 1 ? 'lg:order-2' : ''}>
            <div className="flex items-center gap-4">
              <IconBadge icon={row.icon} />
              <span className="text-sm font-semibold text-primary">{row.label}</span>
            </div>
            <h3 className="mt-5 font-display text-2xl tracking-tight text-slate-900 sm:text-3xl">{row.title}</h3>
            <p className="mt-4 text-slate-700 leading-relaxed">{row.body}</p>
            <ul className="mt-6 flex flex-col gap-3">
              {row.points.map(({ icon: Icon, text }) => (
                <li key={text} className="flex items-start gap-3 text-slate-700">
                  <span className="mt-0.5 inline-flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-white ring-1 ring-tint">
                    <Icon className="h-3.5 w-3.5 text-primary" aria-hidden />
                  </span>
                  <span>{text}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className={`min-w-0 ${i % 2 === 1 ? 'lg:order-1' : ''}`}>
            <Frame label={row.frame}>
              <row.Scene />
            </Frame>
          </div>
        </div>
      ))}
    </div>
  )
}

// An illustrative geo-lift readout: markets that saw the campaign against
// matched markets that didn't. Example numbers, labelled as such.
const LIFT = [
  { label: 'Test markets', value: 100, note: 'Saw the campaign' },
  { label: 'Control markets', value: 82, note: 'Matched, no campaign' },
]

/** A measurement result, drawn as a simple test-versus-control comparison. */
export function LiftScene() {
  return (
    <div className="text-[12.5px] text-slate-800">
      <p className="text-[11px] font-semibold uppercase tracking-wide text-slate-500">Example geo-lift readout</p>
      <ul className="mt-3 flex flex-col gap-3">
        {LIFT.map(row => (
          <li key={row.label} className="grid grid-cols-[7rem_minmax(0,1fr)] items-center gap-3">
            <span>
              <span className="block text-slate-700">{row.label}</span>
              <span className="block text-[11px] text-slate-400">{row.note}</span>
            </span>
            <span className="h-3 overflow-hidden rounded-full bg-slate-100">
              <span
                className={`block h-full rounded-full ${row.value === 100 ? 'bg-primary' : 'bg-slate-400'}`}
                style={{ width: `${row.value}%` }}
              />
            </span>
          </li>
        ))}
      </ul>
      <div className="mt-5 grid grid-cols-3 gap-3 border-t border-tint pt-4">
        <div>
          <p className="text-[11px] text-slate-500">Incremental lift</p>
          <p className="font-display text-xl text-primary">+18%</p>
        </div>
        <div>
          <p className="text-[11px] text-slate-500">Confidence</p>
          <p className="font-display text-xl text-slate-900">95%</p>
        </div>
        <div>
          <p className="text-[11px] text-slate-500">Read in</p>
          <p className="font-display text-xl text-slate-900">4 weeks</p>
        </div>
      </div>
    </div>
  )
}
