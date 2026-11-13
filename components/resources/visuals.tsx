import React from 'react'
import { BarChart3, Check, FileSpreadsheet, Ghost, Mail, MapPin, Mic, Radio, Search, Signpost, Smartphone, Target, Tv, Users } from 'lucide-react'
import { appear, prog, useTimeline } from '../plan/motion'

/**
 * Visuals for the resource pages (templates and the guide), in the same
 * language as the plan pages' scenes: light product mock-ups, looping build
 * animations that run only on screen and hold their finished frame under
 * reduced motion. Illustrative numbers, not a client's data.
 */

/** A channel: a logo from /plan-grid when there is one, otherwise an icon. */
export interface Channel {
  name: string
  logo?: string
  icon?: React.ComponentType<{ className?: string }>
}

function ChannelMark({ channel, size = 14 }: { channel: Channel; size?: number }) {
  if (channel.logo) {
    return (
      <img
        src={`/plan-grid/${channel.logo}.png`}
        alt=""
        width={size}
        height={size}
        className="shrink-0 rounded-[3px]"
        style={{ width: size, height: size }}
      />
    )
  }
  const Icon = channel.icon ?? BarChart3
  return (
    <span
      className="inline-flex shrink-0 items-center justify-center rounded-[3px] bg-tint text-primary"
      style={{ width: size, height: size }}
    >
      <Icon className="h-[70%] w-[70%]" />
    </span>
  )
}

const WEEKS = 8

/** Rows of the spreadsheet template, filled in one by one. `on` is the weeks the line runs. */
const SHEET_ROWS: { channel: Channel; type: string; budget: number; impressions: string; on: number[] }[] = [
  { channel: { name: 'Paramount+', logo: 'paramount-plus' }, type: 'CTV', budget: 42000, impressions: '1.4M', on: [0, 1, 2, 3, 4, 5, 6, 7] },
  { channel: { name: 'YouTube', logo: 'youtube' }, type: 'Online video', budget: 28000, impressions: '3.1M', on: [0, 1, 2, 3, 6, 7] },
  { channel: { name: 'Instagram', logo: 'instagram' }, type: 'Social', budget: 24000, impressions: '4.6M', on: [0, 1, 4, 5, 6, 7] },
  { channel: { name: 'Spotify', logo: 'spotify' }, type: 'Streaming audio', budget: 16000, impressions: '1.9M', on: [2, 3, 4, 5] },
  { channel: { name: 'Billboards', icon: Signpost }, type: 'OOH', budget: 20000, impressions: '2.2M', on: [0, 1, 2, 3] },
]

const usd = (v: number) => `$${Math.round(v).toLocaleString('en-US')}`

/** The Excel template filling in: channels, budget, impressions and a flight strip by week. */
export function TemplateSheetScene() {
  const { ref, t, opacity } = useTimeline(10000)
  const ROW_AT = (i: number) => 500 + i * 900
  const total = SHEET_ROWS.reduce((sum, r, i) => sum + r.budget * prog(t, ROW_AT(i) + 300, 500), 0)
  return (
    <div ref={ref} className="p-3 text-[11.5px] text-slate-700 sm:p-4" aria-hidden>
      <div style={{ opacity }}>
        <div className="flex items-center justify-between">
          <span className="inline-flex items-center gap-1.5 font-semibold text-slate-900">
            <FileSpreadsheet className="h-4 w-4 text-primary" aria-hidden />
            Spring launch · Media plan
          </span>
          <span className="rounded-full bg-tint px-2 py-0.5 text-[10.5px] font-medium text-primary">8-week flight</span>
        </div>
        <div className="mt-3 overflow-hidden rounded-lg ring-1 ring-slate-200">
          <div className="grid grid-cols-[minmax(0,1.6fr)_minmax(0,0.9fr)_minmax(0,0.7fr)_minmax(0,2fr)] bg-slate-50 text-[10px] font-semibold uppercase tracking-wide text-slate-500">
            <span className="px-2 py-1.5">Channel</span>
            <span className="px-2 py-1.5 text-right">Budget</span>
            <span className="px-2 py-1.5 text-right">Impr.</span>
            <span className="grid grid-cols-8 gap-0.5 px-2 py-1.5 text-center">
              {Array.from({ length: WEEKS }, (_, w) => (
                <span key={w}>W{w + 1}</span>
              ))}
            </span>
          </div>
          {SHEET_ROWS.map((r, i) => {
            const at = ROW_AT(i)
            return (
              <div
                key={r.channel.name}
                className="grid grid-cols-[minmax(0,1.6fr)_minmax(0,0.9fr)_minmax(0,0.7fr)_minmax(0,2fr)] items-center border-t border-slate-100 bg-white"
                style={appear(t, at)}
              >
                <span className="flex min-w-0 items-center gap-1.5 px-2 py-1.5">
                  <ChannelMark channel={r.channel} />
                  <span className="min-w-0">
                    <span className="block truncate font-medium text-slate-900">{r.channel.name}</span>
                    <span className="block truncate text-[10px] text-slate-400">{r.type}</span>
                  </span>
                </span>
                <span className="px-2 py-1.5 text-right tabular-nums">{t > at + 300 ? usd(r.budget) : ''}</span>
                <span className="px-2 py-1.5 text-right tabular-nums text-slate-500">{t > at + 450 ? r.impressions : ''}</span>
                <span className="grid grid-cols-8 gap-0.5 px-2 py-1.5">
                  {Array.from({ length: WEEKS }, (_, w) => {
                    const lit = r.on.includes(w) && t > at + 500 + w * 60
                    return (
                      <span
                        key={w}
                        className={`h-2.5 rounded-sm transition-colors duration-300 ${lit ? 'bg-primary/80' : 'bg-slate-100'}`}
                      />
                    )
                  })}
                </span>
              </div>
            )
          })}
          <div className="grid grid-cols-[minmax(0,1.6fr)_minmax(0,0.9fr)_minmax(0,0.7fr)_minmax(0,2fr)] border-t border-slate-200 bg-tint/40 font-semibold text-slate-900">
            <span className="px-2 py-1.5">Total</span>
            <span className="px-2 py-1.5 text-right tabular-nums">{usd(total)}</span>
            <span className="px-2 py-1.5 text-right tabular-nums">{t > ROW_AT(SHEET_ROWS.length) ? '13.2M' : ''}</span>
            <span className="px-2 py-1.5 text-right text-[10.5px] font-medium text-primary" style={appear(t, ROW_AT(SHEET_ROWS.length) + 200)}>
              Budget, flight and actuals in one sheet
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}

/** A goal template's channel mix: a share bar and the channels that make it up. */
export interface Mix {
  channel: Channel
  share: number
}

const MIX_SHADES = ['bg-primary', 'bg-primary/60', 'bg-primary/35', 'bg-primary/20']

/** A small static preview of the plan a goal template starts from. */
export function GoalPreview({ mix }: { mix: Mix[] }) {
  return (
    <div className="mt-4 rounded-xl border border-tint bg-gradient-to-b from-tint/30 to-white p-3" aria-hidden>
      <div className="flex h-2 overflow-hidden rounded-full bg-slate-100">
        {mix.map((m, i) => (
          <span key={m.channel.name} className={MIX_SHADES[i % MIX_SHADES.length]} style={{ width: `${m.share}%` }} />
        ))}
      </div>
      <ul className="mt-2.5 flex flex-wrap gap-1.5">
        {mix.map((m, i) => (
          <li
            key={m.channel.name}
            className="inline-flex items-center gap-1.5 rounded-full bg-white px-2 py-0.5 text-[11px] text-slate-700 ring-1 ring-slate-200"
          >
            <span className={`h-1.5 w-1.5 rounded-full ${MIX_SHADES[i % MIX_SHADES.length]}`} />
            <ChannelMark channel={m.channel} size={12} />
            {m.channel.name}
            <span className="tabular-nums text-slate-400">{m.share}%</span>
          </li>
        ))}
      </ul>
    </div>
  )
}

/** Channels used by the goal templates' previews. */
export const CH = {
  tiktok: { name: 'TikTok', icon: Smartphone },
  snapchat: { name: 'Snapchat', icon: Ghost },
  youtube: { name: 'YouTube', logo: 'youtube' },
  instagram: { name: 'Instagram', logo: 'instagram' },
  facebook: { name: 'Facebook', logo: 'facebook' },
  meta: { name: 'Meta', logo: 'meta' },
  spotify: { name: 'Spotify', logo: 'spotify' },
  pandora: { name: 'Pandora', logo: 'pandora' },
  hulu: { name: 'Hulu', logo: 'hulu' },
  peacock: { name: 'Peacock', logo: 'peacock' },
  paramount: { name: 'Paramount+', logo: 'paramount-plus' },
  pluto: { name: 'Pluto TV', logo: 'pluto' },
  search: { name: 'Search', icon: Search },
  localSearch: { name: 'Local search', icon: MapPin },
  ooh: { name: 'OOH', icon: Signpost },
  radio: { name: 'Radio', icon: Radio },
  podcasts: { name: 'Podcasts', icon: Mic },
  email: { name: 'Email', icon: Mail },
} satisfies Record<string, Channel>

/** The guide's process, one step lighting after another, each with what it produces. */
const FLOW: { label: string; icon: React.ComponentType<{ className?: string }>; detail: React.ReactNode }[] = [
  {
    label: 'Objective',
    icon: Target,
    detail: (
      <>
        <span className="font-semibold text-slate-900">Goal:</span> 15% more store visits in 8 weeks
      </>
    ),
  },
  {
    label: 'Audience',
    icon: Users,
    detail: (
      <>
        <span className="font-semibold text-slate-900">Adults 25–54</span> · Dallas–Fort Worth · 1.2M people
      </>
    ),
  },
  {
    label: 'Channels',
    icon: Tv,
    detail: (
      <span className="flex flex-wrap items-center gap-1.5">
        {[CH.paramount, CH.instagram, CH.ooh, CH.localSearch].map(c => (
          <span key={c.name} className="inline-flex items-center gap-1 rounded-full bg-white px-2 py-0.5 ring-1 ring-slate-200">
            <ChannelMark channel={c} size={12} />
            {c.name}
          </span>
        ))}
      </span>
    ),
  },
  {
    label: 'Flighting',
    icon: BarChart3,
    detail: (
      <span className="flex items-center gap-2">
        <span className="font-semibold text-slate-900">Flighted:</span>
        <span className="grid w-36 grid-cols-8 gap-0.5">
          {[1, 1, 1, 0, 0, 1, 1, 1].map((on, w) => (
            <span key={w} className={`h-2.5 rounded-sm ${on ? 'bg-primary/80' : 'bg-slate-200'}`} />
          ))}
        </span>
      </span>
    ),
  },
  {
    label: 'Measure',
    icon: Check,
    detail: (
      <>
        <span className="font-semibold text-slate-900">Store visits +17%</span> against the control markets
      </>
    ),
  },
]

export function GuideFlowScene() {
  const STEP_MS = 1500
  const { ref, t, opacity } = useTimeline(STEP_MS * FLOW.length + 2200)
  const active = Math.min(FLOW.length - 1, Math.floor(Math.max(0, t - 300) / STEP_MS))
  return (
    <div ref={ref} className="p-4 text-[11.5px] text-slate-700 sm:p-5" aria-hidden>
      <div style={{ opacity }}>
        <p className="font-semibold text-slate-900">How to create a media plan</p>
        <ol className="mt-4 grid grid-cols-5 gap-1.5">
          {FLOW.map((s, i) => {
            const done = i < active || (i === active && t > 300 + i * STEP_MS + 900)
            const on = i <= active
            return (
              <li key={s.label} className="flex flex-col items-center gap-1.5 text-center">
                <span
                  className={`relative inline-flex h-9 w-9 items-center justify-center rounded-xl transition-colors duration-300 ${
                    on ? 'bg-primary text-white shadow-md shadow-primary/20' : 'bg-tint/60 text-primary/60'
                  }`}
                >
                  <s.icon className="h-4 w-4" />
                  {done ? (
                    <span className="absolute -right-1 -top-1 inline-flex h-3.5 w-3.5 items-center justify-center rounded-full bg-white text-primary ring-1 ring-primary">
                      <Check className="h-2.5 w-2.5" />
                    </span>
                  ) : null}
                </span>
                <span className={`text-[10.5px] font-medium ${on ? 'text-slate-900' : 'text-slate-400'}`}>{s.label}</span>
              </li>
            )
          })}
        </ol>
        <div className="relative mt-1 h-1 rounded-full bg-tint/50">
          <span
            className="absolute inset-y-0 left-0 rounded-full bg-primary/70 transition-[width] duration-500"
            style={{ width: `${((active + 1) / FLOW.length) * 100}%` }}
          />
        </div>
        <ul className="mt-4 flex flex-col gap-1.5">
          {FLOW.map((s, i) =>
            i <= active ? (
              <li
                key={s.label}
                className={`flex items-center gap-2 rounded-lg px-2.5 py-1.5 ring-1 ${
                  i === active ? 'bg-white ring-primary/30' : 'bg-white/70 ring-slate-100'
                }`}
                style={appear(t, 300 + i * STEP_MS)}
              >
                <span className="w-16 shrink-0 text-[10.5px] font-medium uppercase tracking-wide text-slate-400">{s.label}</span>
                <span className="min-w-0 flex-1">{s.detail}</span>
              </li>
            ) : null,
          )}
        </ul>
      </div>
    </div>
  )
}

/** A figure in the guide's article, captioned. */
function Figure({ caption, children }: { caption: string; children: React.ReactNode }) {
  return (
    <figure className="my-8 rounded-2xl border border-tint bg-gradient-to-b from-tint/30 to-white p-5 sm:p-6">
      {children}
      <figcaption className="mt-4 text-sm text-slate-500">{caption}</figcaption>
    </figure>
  )
}

const JOURNEY: { stage: string; job: string; channels: Channel[] }[] = [
  { stage: 'Awareness', job: 'Get in front of many people', channels: [CH.paramount, CH.radio, CH.ooh] },
  { stage: 'Engagement', job: 'Give them a reason to look', channels: [CH.instagram, CH.youtube, CH.podcasts] },
  { stage: 'Conversion', job: 'Be there when they act', channels: [CH.search, CH.meta, CH.localSearch] },
  { stage: 'Loyalty', job: 'Bring them back', channels: [CH.email, CH.facebook] },
]

/** The consumer journey, with the channels each stage usually leans on. */
export function JourneyFigure() {
  return (
    <Figure caption="A consumer journey map, with the channels each stage typically leans on. Your own research decides the real mix.">
      <ol className="grid grid-cols-1 gap-3 sm:grid-cols-4">
        {JOURNEY.map((s, i) => (
          <li key={s.stage} className="relative rounded-xl bg-white p-3 ring-1 ring-slate-200">
            <span className="text-[11px] font-semibold uppercase tracking-wide text-primary">
              {i + 1}. {s.stage}
            </span>
            <p className="mt-1 text-sm text-slate-700">{s.job}</p>
            <ul className="mt-3 flex flex-col gap-1.5">
              {s.channels.map(c => (
                <li key={c.name} className="flex items-center gap-1.5 text-xs text-slate-600">
                  <ChannelMark channel={c} size={14} />
                  {c.name}
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ol>
    </Figure>
  )
}

const PATTERNS: { name: string; note: string; weeks: number[] }[] = [
  { name: 'Continuity', note: 'Steady all campaign', weeks: [3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3] },
  { name: 'Flighting', note: 'On, then off, then on', weeks: [4, 4, 4, 0, 0, 0, 4, 4, 4, 0, 0, 0] },
  { name: 'Pulsing', note: 'Always on, with bursts', weeks: [5, 5, 2, 2, 2, 5, 5, 2, 2, 2, 5, 5] },
]

/** The three frequency approaches as weekly weight over a 12-week campaign. */
export function FrequencyFigure() {
  return (
    <Figure caption="The same budget run three ways over a 12-week campaign. Bar height is weekly weight.">
      <div className="flex flex-col gap-4">
        {PATTERNS.map(p => (
          <div key={p.name} className="grid grid-cols-[6.5rem_minmax(0,1fr)] items-end gap-4">
            <div>
              <p className="text-sm font-medium text-slate-900">{p.name}</p>
              <p className="text-xs text-slate-500">{p.note}</p>
            </div>
            <div className="grid h-12 grid-cols-12 items-end gap-1 border-b border-slate-200">
              {p.weeks.map((w, i) => (
                <span
                  key={i}
                  className={`rounded-t-sm ${w ? 'bg-primary/75' : ''}`}
                  style={{ height: `${(w / 5) * 100}%` }}
                />
              ))}
            </div>
          </div>
        ))}
        <div className="grid grid-cols-[6.5rem_minmax(0,1fr)] gap-4 text-[11px] text-slate-400">
          <span />
          <span className="flex justify-between">
            <span>Week 1</span>
            <span>Week 12</span>
          </span>
        </div>
      </div>
    </Figure>
  )
}
