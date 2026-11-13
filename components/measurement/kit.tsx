import React, { useState } from 'react'
import { ArrowRight, Check, type LucideIcon } from 'lucide-react'
import { Container } from '../mmm/Container'
import { Button } from '../mmm/Button'
import { Accent, HeroBackdrop, HeroVisual, IconBadge } from '../landing/kit'

/**
 * The pieces the measurement pages (/mmm, /brand-studies,
 * /incrementality-testing) share, in the planning pages' style. Measurement
 * is sold in a conversation, so every page's one call to action is a demo.
 */

export const DEMO_URL = '/demo'

/**
 * The hero: copy and the demo button on the left; on the right the product
 * scene, with the offer's key facts as a row under the points, or the facts
 * themselves when a page has no scene.
 */
export function MeasurementHero({
  icon: Icon,
  eyebrow,
  title,
  accent,
  body,
  points,
  facts,
  visual,
  onCta,
}: {
  icon: LucideIcon
  eyebrow: string
  title: string
  accent: string
  body: React.ReactNode
  points: string[]
  facts: { value: string; label: string }[]
  visual?: { label: string; Scene: () => React.JSX.Element }
  onCta: () => void
}) {
  return (
    <section className="relative">
      <HeroBackdrop />
      <Container className="relative max-w-6xl pt-32 pb-20 lg:pt-40 lg:pb-28">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)]">
          <div className="text-center lg:text-left">
            <p className="mb-6 inline-flex items-center gap-2 rounded-full bg-tint px-4 py-1.5 text-sm font-medium text-primary">
              <Icon className="h-4 w-4" aria-hidden />
              {eyebrow}
            </p>
            <h1 className="font-display text-5xl font-medium tracking-tight text-slate-900 sm:text-6xl">
              {title} <Accent>{accent}</Accent>
            </h1>
            <p className="mx-auto mt-6 max-w-xl text-lg tracking-tight text-slate-700 lg:mx-0">{body}</p>
            <div className="mt-10 flex justify-center lg:justify-start">
              <Button href={DEMO_URL} color="blue" className="px-6 py-3 text-base" onClick={onCta}>
                Book a demo
                <ArrowRight className="ml-2 h-4 w-4" aria-hidden />
              </Button>
            </div>
            <ul className="mx-auto mt-8 flex max-w-xl flex-col gap-3 text-left lg:mx-0">
              {points.map(p => (
                <li key={p} className="flex items-start gap-3 text-slate-700">
                  <Check className="mt-1 h-4 w-4 flex-shrink-0 text-primary" aria-hidden />
                  <span>{p}</span>
                </li>
              ))}
            </ul>
            {visual ? <FactsRow facts={facts} /> : null}
          </div>
          {visual ? (
            <HeroVisual label={visual.label}>
              <visual.Scene />
            </HeroVisual>
          ) : (
            <FactsPanel facts={facts} />
          )}
        </div>
      </Container>
    </section>
  )
}

/** The offer's numbers in one compact row, under the hero's points. */
function FactsRow({ facts }: { facts: { value: string; label: string }[] }) {
  return (
    <dl className="mx-auto mt-8 grid max-w-xl grid-cols-3 divide-x divide-tint rounded-2xl border border-tint bg-white/80 text-left shadow-sm lg:mx-0">
      {facts.map(f => (
        <div key={f.label} className="flex flex-col-reverse justify-end px-4 py-3">
          <dt className="mt-0.5 text-xs leading-snug text-slate-500">{f.label}</dt>
          <dd className="font-display text-xl font-medium tracking-tight text-primary">{f.value}</dd>
        </div>
      ))}
    </dl>
  )
}

/** The offer's numbers in a card sitting in the hero's blue glow. */
function FactsPanel({ facts }: { facts: { value: string; label: string }[] }) {
  return (
    <div className="relative min-w-0">
      <div
        className="absolute -inset-3 rounded-[2rem] blur-2xl sm:-inset-8"
        style={{ background: 'radial-gradient(ellipse at 60% 40%, rgba(26,106,180,0.18) 0%, rgba(211,228,255,0.35) 45%, transparent 75%)' }}
        aria-hidden
      />
      <dl className="relative grid grid-cols-1 divide-y divide-tint rounded-2xl border border-tint bg-white shadow-2xl shadow-primary/10">
        {facts.map(f => (
          <div key={f.label} className="px-8 py-6">
            <dt className="text-sm text-slate-500">{f.label}</dt>
            <dd className="mt-1 font-display text-3xl font-medium tracking-tight text-primary">{f.value}</dd>
          </div>
        ))}
      </dl>
    </div>
  )
}

export interface Card {
  icon: LucideIcon
  title: string
  body: string
}

/** A row of icon cards: the problem, or what each part of the offer does. */
export function CardGrid({ cards, columns = 3 }: { cards: Card[]; columns?: 2 | 3 | 4 }) {
  const cols = { 2: 'md:grid-cols-2', 3: 'md:grid-cols-3', 4: 'sm:grid-cols-2 lg:grid-cols-4' }[columns]
  return (
    <div className={`mt-14 grid grid-cols-1 gap-8 ${cols}`}>
      {cards.map(c => (
        <div key={c.title} className="rounded-2xl border border-tint bg-white p-7 shadow-lg">
          <IconBadge icon={c.icon} />
          <h3 className="mt-5 font-display text-lg text-slate-900">{c.title}</h3>
          <p className="mt-2 text-sm leading-relaxed text-slate-600">{c.body}</p>
        </div>
      ))}
    </div>
  )
}

/** Numbered steps, for a process that has no product scene to show. */
export function NumberedSteps({ steps }: { steps: { title: string; body: string }[] }) {
  return (
    <ol className={`mx-auto mt-14 grid max-w-5xl grid-cols-1 gap-8 ${steps.length === 4 ? 'sm:grid-cols-2 lg:grid-cols-4' : 'md:grid-cols-3'}`}>
      {steps.map((s, i) => (
        <li key={s.title} className="rounded-2xl border border-tint bg-white p-7 shadow-sm">
          <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-primary font-display text-white">
            {i + 1}
          </span>
          <h3 className="mt-5 font-display text-lg text-slate-900">{s.title}</h3>
          <p className="mt-2 text-sm leading-relaxed text-slate-600">{s.body}</p>
        </li>
      ))}
    </ol>
  )
}

/** The price, what it includes, and the demo button. */
export function PriceCard({
  from = false,
  price,
  unit,
  note,
  items,
  onCta,
}: {
  from?: boolean
  price: string
  unit: string
  note?: string
  items: string[]
  onCta: () => void
}) {
  return (
    <div className="mx-auto mt-14 max-w-lg rounded-2xl border-2 border-primary bg-white p-8 text-center shadow-xl shadow-primary/10 sm:p-10">
      {from ? <p className="text-sm text-slate-500">From</p> : null}
      <p className="font-display text-5xl font-medium tracking-tight text-slate-900">{price}</p>
      <p className="mt-2 text-slate-600">{unit}</p>
      {note ? <p className="mt-1 text-sm text-slate-500">{note}</p> : null}
      <ul className="mt-8 flex flex-col gap-3 border-t border-tint pt-6 text-left">
        {items.map(item => (
          <li key={item} className="flex gap-3 text-sm text-slate-700">
            <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" aria-hidden />
            {item}
          </li>
        ))}
      </ul>
      <Button href={DEMO_URL} color="blue" className="mt-8 w-full py-3 text-base" onClick={onCta}>
        Book a demo
        <ArrowRight className="ml-2 h-4 w-4" aria-hidden />
      </Button>
    </div>
  )
}

/** Short questions and answers. */
export function Faq({ items }: { items: { q: string; a: string }[] }) {
  return (
    <dl className="mx-auto mt-12 grid max-w-4xl grid-cols-1 gap-6 md:grid-cols-2">
      {items.map(f => (
        <div key={f.q} className="rounded-2xl border border-tint bg-white p-6">
          <dt className="font-display text-lg text-slate-900">{f.q}</dt>
          <dd className="mt-2 text-sm leading-relaxed text-slate-600">{f.a}</dd>
        </div>
      ))}
    </dl>
  )
}

/**
 * A request for a free analysis, posted to /api/lead like the forms it
 * replaces, with the same Google Ads conversion and PostHog event.
 */
export function LeadForm({
  source,
  subject,
  heading,
  intro,
  spendField,
  spendLabel,
  spendOptions,
  extra,
  submitLabel,
  done,
}: {
  source: string
  subject: string
  heading: string
  intro: string
  spendField: string
  spendLabel: string
  spendOptions: { value: string; label: string }[]
  extra?: { field: string; label: string; placeholder: string }
  submitLabel: string
  done: string
}) {
  const [submitted, setSubmitted] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [form, setForm] = useState<Record<string, string>>({ name: '', email: '', company: '', [spendField]: '' })
  const set = (k: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => setForm({ ...form, [k]: e.target.value })

  const submit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitting(true)
    try {
      await fetch('/api/lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, source, _subject: `${subject}: ${form.company}` }),
      })
      const w = window as any
      w.gtag?.('event', 'conversion', { send_to: 'AW-672346912/qEmHCJ6L_pgcEKDmzMAC', value: 200.0, currency: 'USD' })
      w.posthog?.capture?.('demo_request_submitted', { ...form, source })
      setSubmitted(true)
    } catch {
      alert('Something went wrong. Please try again.')
    } finally {
      setSubmitting(false)
    }
  }

  const input =
    'w-full rounded-lg border border-tint bg-white px-4 py-3 text-slate-900 placeholder-slate-400 focus:border-primary focus:ring-1 focus:ring-primary'
  const label = 'mb-1.5 block text-sm font-medium text-slate-700'

  return (
    <div className="rounded-2xl border border-tint bg-white p-8 shadow-xl shadow-primary/10 sm:p-10">
      {submitted ? (
        <div className="py-8 text-center">
          <span className="mx-auto inline-flex h-14 w-14 items-center justify-center rounded-full bg-tint text-primary">
            <Check className="h-7 w-7" aria-hidden />
          </span>
          <h3 className="mt-6 font-display text-2xl text-slate-900">We&rsquo;re on it.</h3>
          <p className="mt-3 text-slate-600">{done}</p>
        </div>
      ) : (
        <>
          <h3 className="font-display text-2xl text-slate-900">{heading}</h3>
          <p className="mt-2 text-sm text-slate-600">{intro}</p>
          <form onSubmit={submit} className="mt-8 space-y-5">
            <div>
              <label htmlFor={`${source}-name`} className={label}>Name</label>
              <input id={`${source}-name`} type="text" required value={form.name} onChange={set('name')} className={input} placeholder="Jane Smith" />
            </div>
            <div>
              <label htmlFor={`${source}-email`} className={label}>Work email</label>
              <input id={`${source}-email`} type="email" required value={form.email} onChange={set('email')} className={input} placeholder="jane@agency.com" />
            </div>
            <div>
              <label htmlFor={`${source}-company`} className={label}>Company</label>
              <input id={`${source}-company`} type="text" required value={form.company} onChange={set('company')} className={input} placeholder="Acme Media" />
            </div>
            <div>
              <label htmlFor={`${source}-spend`} className={label}>{spendLabel}</label>
              <select id={`${source}-spend`} required value={form[spendField]} onChange={set(spendField)} className={input}>
                <option value="" disabled>Select range</option>
                {spendOptions.map(o => (
                  <option key={o.value} value={o.value}>{o.label}</option>
                ))}
              </select>
            </div>
            {extra ? (
              <div>
                <label htmlFor={`${source}-${extra.field}`} className={label}>{extra.label}</label>
                <input
                  id={`${source}-${extra.field}`}
                  type="text"
                  value={form[extra.field] ?? ''}
                  onChange={set(extra.field)}
                  className={input}
                  placeholder={extra.placeholder}
                />
              </div>
            ) : null}
            <button
              type="submit"
              disabled={submitting}
              className="w-full rounded-full bg-primary px-4 py-3.5 text-sm font-semibold text-white hover:bg-primary/90 disabled:opacity-50"
            >
              {submitting ? 'Sending…' : submitLabel}
            </button>
            <p className="text-center text-xs text-slate-500">No spam. We&rsquo;ll reply within 48 hours.</p>
          </form>
        </>
      )}
    </div>
  )
}
