import React from 'react'
import { Check, CircleAlert, ScrollText } from 'lucide-react'

/**
 * The brand pages' product windows: the audit, the plan and the change log,
 * drawn to match the client portal's screens. Figures are an example, from
 * an audit of a real Google Ads account, and the pages label them so.
 */

const WASTED: [string, string, number][] = [
  ['free media plan template', 'Planning · Search', 412],
  ['media buying course', 'Planning · Search', 268],
  ['what is a media planner', 'Generic', 191],
  ['media planner salary', 'Generic', 147],
]

const usd = (n: number) => `$${n.toLocaleString('en-US')}`

export function AuditScene() {
  return (
    <div className="text-left">
      <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
        {[
          ['Spent', '$5,430', 'last 90 days'],
          ['Results', '212', 'conversions'],
          ['Cost per result', '$26', ''],
          ['Never converted', '$2,389', '44% of spend'],
        ].map(([label, value, note], i) => (
          <div key={label} className={`rounded-lg border px-3 py-2 ${i === 3 ? 'border-amber-200 bg-amber-50' : 'border-slate-200 bg-white'}`}>
            <p className="text-[11px] uppercase tracking-wide text-slate-500">{label}</p>
            <p className={`font-display text-lg ${i === 3 ? 'text-amber-700' : 'text-slate-900'}`}>{value}</p>
            {note ? <p className="text-[11px] text-slate-500">{note}</p> : null}
          </div>
        ))}
      </div>
      <div className="mt-4 rounded-lg border border-amber-200 bg-amber-50/60 px-3 py-2 text-[13px] text-slate-800">
        <span className="inline-flex items-center gap-1.5 font-medium text-amber-700">
          <CircleAlert className="h-3.5 w-3.5" aria-hidden /> What we found
        </span>
        <p className="mt-1">$2,389 went on 91 searches that never converted. Blocking them keeps that money for searches that do.</p>
      </div>
      <table className="mt-4 w-full text-[12px]">
        <thead>
          <tr className="text-left text-[10px] uppercase tracking-wide text-slate-500">
            <th className="pb-1.5 font-medium">Search</th>
            <th className="pb-1.5 font-medium">Campaign</th>
            <th className="pb-1.5 text-right font-medium">Spent</th>
          </tr>
        </thead>
        <tbody>
          {WASTED.map(([term, campaign, cost]) => (
            <tr key={term} className="border-t border-slate-100">
              <td className="py-1.5 pr-2 font-medium text-slate-900">{term}</td>
              <td className="py-1.5 pr-2 text-slate-500">{campaign}</td>
              <td className="py-1.5 text-right tabular-nums text-slate-900">{usd(cost)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

const LINES: [string, string, number][] = [
  ['Google Search', 'People searching for what you sell', 2600],
  ['Meta · Facebook', 'Your best customers, and people like them', 1300],
  ['Meta · Instagram', 'The same audiences, in Reels and Stories', 1100],
]

export function PlanScene() {
  const total = LINES.reduce((sum, [, , v]) => sum + v, 0)
  return (
    <div className="text-left">
      <p className="text-[11px] uppercase tracking-wide text-slate-500">December plan · Goal: online sales</p>
      <ul className="mt-3 flex flex-col gap-2">
        {LINES.map(([channel, why, spend]) => (
          <li key={channel} className="flex items-center justify-between gap-3 rounded-lg border border-slate-200 bg-white px-3 py-2">
            <div>
              <p className="text-[13px] font-medium text-slate-900">{channel}</p>
              <p className="text-[11px] text-slate-500">{why}</p>
            </div>
            <p className="font-display text-base tabular-nums text-slate-900">{usd(spend)}</p>
          </li>
        ))}
      </ul>
      <div className="mt-3 flex items-center justify-between border-t border-slate-200 pt-3 text-[13px]">
        <span className="text-slate-600">Ads {usd(total)} · Halliard $399 flat</span>
        <span className="inline-flex items-center gap-1.5 rounded-full bg-primary px-3 py-1 text-[12px] font-medium text-white">
          <Check className="h-3.5 w-3.5" aria-hidden /> Approve and pay
        </span>
      </div>
    </div>
  )
}

const RECEIPTS: [string, string, string][] = [
  ['Dec 3', 'Blocked 91 searches that never converted', 'Approved by you'],
  ['Dec 6', 'Moved $200 from Instagram to Google Search', 'Logged: under your threshold'],
  ['Dec 9', 'Paused one ad with a cost per result 3x the rest', 'Approved by you'],
]

export function ReceiptsScene() {
  return (
    <ul className="flex flex-col gap-2 text-left">
      {RECEIPTS.map(([date, what, how]) => (
        <li key={what} className="flex items-start gap-3 rounded-lg border border-slate-200 bg-white px-3 py-2">
          <ScrollText className="mt-0.5 h-4 w-4 shrink-0 text-primary" aria-hidden />
          <div className="min-w-0">
            <p className="text-[13px] font-medium text-slate-900">{what}</p>
            <p className="text-[11px] text-slate-500">
              {date} · {how} · Google&rsquo;s reply kept
            </p>
          </div>
        </li>
      ))}
    </ul>
  )
}
