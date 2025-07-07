import Head from 'next/head'
import React, { useState } from 'react'
// @ts-ignore – external hook package; ensure it's installed in project
import { useFormspark } from '@formspark/use-formspark'
import { Header } from '../components/mmm/Header'
import { Container } from '../components/mmm/Container'
import { Button } from '../components/mmm/Button'
import clsx from 'clsx'
import { Disclosure } from '@headlessui/react'

// -----------------------------------------------------------------------------
// Reusable Step Wrapper component (defined outside main page to keep identity)
// -----------------------------------------------------------------------------

interface StepWrapperProps {
  icon: string
  title: string
  subtitle?: string
  step: number
  totalSteps: number
  onBack: () => void
  onNext: () => void
  nextDisabled: boolean
  children: React.ReactNode
}

function StepWrapper({
  icon,
  title,
  subtitle,
  step,
  totalSteps,
  onBack,
  onNext,
  nextDisabled,
  children,
}: StepWrapperProps) {
  const renderProgress = () => (
    <div className="w-full bg-slate-200 h-2 rounded-full mt-6">
      <div
        className="bg-primary h-2 rounded-full transition-all"
        style={{ width: `${((step + 1) / totalSteps) * 100}%` }}
      />
    </div>
  )

  return (
    <section className="py-12">
      <Container className="max-w-2xl flex flex-col min-h-[70vh]">
        <h2 className="flex items-center font-display text-3xl font-medium tracking-tight text-slate-900">
          <span className="mr-3 text-4xl">{icon}</span>
          {title}
        </h2>
        {subtitle && <p className="mt-1 text-slate-600">{subtitle}</p>}
        {renderProgress()}
        <div className="mt-8 space-y-6 flex-1">{children}</div>
        <div className="mt-10 flex justify-between">
          {step > 0 && (
            <Button variant="outline" color="slate" className="" onClick={onBack}>
              Back
            </Button>
          )}
          <Button
            onClick={onNext}
            disabled={nextDisabled}
            className={clsx(
              'ml-auto',
              (nextDisabled) && 'opacity-50 cursor-not-allowed',
            )}
          >
            {step === totalSteps - 1 ? 'Get My Action Plan' : 'Next'}
          </Button>
        </div>
      </Container>
    </section>
  )
}

// -----------------------------------------------------------------------------
// 1. Constants & Types
// -----------------------------------------------------------------------------

const SPEND_OPTIONS = [
  { label: '< $50k / mo', value: '<50k', score: 5 },
  { label: '$50–250k / mo', value: '50-250k', score: 15 },
  { label: '$250k+ / mo', value: '250k+', score: 25 },
] as const

type SpendValue = (typeof SPEND_OPTIONS)[number]['value']

// -----------------------------------------------------------------------------
// Full channel taxonomy for channel selector
// -----------------------------------------------------------------------------

type ChannelItem = { label: string; icon: string }
type ChannelGroup = { group: string; icon: string; channels: ChannelItem[] }

const CHANNEL_GROUPS: ChannelGroup[] = [
  {
    group: 'Audio',
    icon: '🎶',
    channels: [
      { label: 'Streaming Audio', icon: '🎧' },
      { label: 'Radio', icon: '📻' },
      { label: 'Podcasts', icon: '🎙️' },
    ],
  },
  {
    group: 'Video',
    icon: '📺',
    channels: [
      { label: 'Streaming TV', icon: '📺' },
      { label: 'Linear TV', icon: '📺' },
      { label: 'Movie Theater', icon: '🍿' },
    ],
  },
  {
    group: 'Digital',
    icon: '💻',
    channels: [
      { label: 'Paid Social', icon: '📱' },
      { label: 'Online Video', icon: '🎬' },
      { label: 'Digital Display', icon: '🖥️' },
      { label: 'Paid Search', icon: '🔍' },
      { label: 'Digital Retail', icon: '🛒' },
      { label: 'Video Games', icon: '🎮' },
    ],
  },
  {
    group: 'Out-of-Home',
    icon: '🪧',
    channels: [
      { label: 'Billboards', icon: '🪧' },
      { label: 'Transit', icon: '🚇' },
      { label: 'Street Media', icon: '🚶‍♂️' },
      { label: 'Airport', icon: '✈️' },
      { label: 'Medical Facility', icon: '🏥' },
      { label: 'Gas Station', icon: '⛽' },
      { label: 'Gym', icon: '🏋️‍♀️' },
      { label: 'Mall', icon: '🏬' },
      { label: 'Sports Stadium', icon: '🏟️' },
    ],
  },
  {
    group: 'Print',
    icon: '📰',
    channels: [
      { label: 'Magazines', icon: '📚' },
      { label: 'Newspapers', icon: '📰' },
    ],
  },
] as const

// Chip component
function Chip({ label, icon, onRemove }: { label: string; icon?: string; onRemove: () => void }) {
  return (
    <span className="inline-flex items-center bg-primary/10 text-primary px-2 py-1 rounded-full text-sm mr-2 mt-2">
      {icon && <span className="mr-1">{icon}</span>}
      {label}
      <button
        type="button"
        onClick={onRemove}
        className="ml-2 text-xs hover:text-primary/70"
      >
        ×
      </button>
    </span>
  )
}

function ChannelMultiSelect({
  selected,
  onChange,
}: {
  selected: string[]
  onChange: (newList: string[]) => void
}) {
  const [open, setOpen] = React.useState(false)
  const containerRef = React.useRef<HTMLDivElement>(null)

  const toggleChannel = (label: string) => {
    const exists = selected.includes(label)
    onChange(exists ? selected.filter((c) => c !== label) : [...selected, label])
  }

  // Close on click outside
  React.useEffect(() => {
    if (!open) return
    function handleClick(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [open])

  return (
    <div className="relative" ref={containerRef}>
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="w-full border rounded-md px-4 py-2 flex justify-between items-center"
      >
        <span>
          {selected.length === 0 ? 'Select channels…' : `${selected.length} channel${selected.length > 1 ? 's' : ''} selected`}
        </span>
        <span className={clsx('transition-transform', open ? 'rotate-180' : 'rotate-0')}>▼</span>
      </button>

      {open && (
        <div className="absolute z-10 mt-2 w-full max-h-64 overflow-y-auto bg-white border rounded-md shadow-lg p-4 space-y-4">
          {CHANNEL_GROUPS.map((grp) => (
            <div key={grp.group}>
              <p className="font-semibold text-slate-800 mb-2 flex items-center gap-2">
                <span>{grp.icon}</span>
                {grp.group}
              </p>
              <div className="grid grid-cols-2 gap-2 ml-4">
                {grp.channels.map((ch) => (
                  <label key={ch.label} className="flex items-center space-x-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={selected.includes(ch.label)}
                      onChange={() => toggleChannel(ch.label)}
                    />
                    <span>{ch.icon}</span>
                    <span>{ch.label}</span>
                  </label>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Chips */}
      {selected.length > 0 && (
        <div className="mt-3 flex flex-wrap">
          {selected.map((c) => {
            const icon = CHANNEL_GROUPS.flatMap((g) => g.channels).find((ch) => ch.label === c)?.icon
            return <Chip key={c} label={c} icon={icon} onRemove={() => toggleChannel(c)} />
          })}
        </div>
      )}
    </div>
  )
}

type MeasurementValue =
  | 'ad-platform'
  | 'mta'
  | 'mmm'
  | 'mmm-holdout' | 'uplift' | 'brand-study'

interface MeasurementOption {
  label: string
  value: MeasurementValue
  score: number
  icon: string
  sub: string
}

const MEASUREMENT_OPTIONS: MeasurementOption[] = [
  {
    label: 'Ad Platform',
    value: 'ad-platform',
    score: 5,
    icon: '📉',
    sub: 'Rely mainly on Meta / Google dashboards',
  },
  {
    label: 'Multi-Touch Attribution',
    value: 'mta',
    score: 15,
    icon: '🔗',
    sub: 'Third-party attribution tool in place',
  },
  {
    label: 'Media Mix Modelling',
    value: 'mmm',
    score: 20,
    icon: '📈',
    sub: 'Run or receive MMM reports',
  },
  {
    label: 'Geo / Hold-out',
    value: 'mmm-holdout',
    score: 25,
    icon: '🧪',
    sub: 'Incrementality testing via geo splits',
  },
  {
    label: 'Search / Social Mention Uplift',
    value: 'uplift',
    score: 10,
    icon: '🔍',
    sub: 'Track brand lift in search or social chatter',
  },
  {
    label: 'Brand Studies',
    value: 'brand-study',
    score: 10,
    icon: '📊',
    sub: 'Survey-based brand lift studies',
  },
]

const TIMELINE_OPTIONS = [
  { label: '6+ months', value: '6+', score: 5 },
  { label: '3–6 months', value: '3-6', score: 15 },
  { label: 'ASAP / < 3 months', value: 'asap', score: 25 },
] as const

// -----------------------------------------------------------------------------
// 1.1 Step metadata for icons & subtitles
// -----------------------------------------------------------------------------

const STEP_META = [
  { icon: '👋', title: "Let's get acquainted" },
  { icon: '💸', title: 'How Much & Where You Spend' },
  { icon: '📐', title: 'Your Current Measurement Stack' },
  { icon: '⏱️', title: 'Goals & Timeline' },
  { icon: '✉️', title: 'Just a few details to see your plan' },
] as const

const ENTITY_OPTIONS = [
  {
    label: 'Brand / Advertiser',
    value: false,
    icon: '🏢',
    sub: 'We spend our own money on advertising',
  },
  {
    label: 'Agency / Consultant',
    value: true,
    icon: '🤝',
    sub: 'We manage spend on behalf of advertisers',
  },
] as const

// -----------------------------------------------------------------------------
// 2. Types & Helpers
// -----------------------------------------------------------------------------

interface FormState {
  isAgency: null | boolean
  monthlySpend: SpendValue | null
  channels: string[]
  measurementStack: MeasurementValue[]
  goal: string
  timeline: (typeof TIMELINE_OPTIONS)[number]['value'] | null
  name: string
  email: string
  company: string
  marketingOptIn: boolean
  maturityScore?: number
}

function initialState(): FormState {
  return {
    isAgency: null,
    monthlySpend: null,
    channels: [],
    measurementStack: [],
    goal: '',
    timeline: null,
    name: '',
    email: '',
    company: '',
    marketingOptIn: false,
  }
}

function computeScore(state: FormState): number {
  // Spend
  const spendScore = SPEND_OPTIONS.find((o) => o.value === state.monthlySpend)?.score ?? 0

  // Channel diversification
  const channelCount = state.channels.length
  let channelScore = 0
  if (channelCount >= 6) channelScore = 25
  else if (channelCount >= 3) channelScore = 15
  else if (channelCount >= 1) channelScore = 5

  // Measurement stack
  const measurementScores = MEASUREMENT_OPTIONS.filter((o) => state.measurementStack.includes(o.value)).map((o) => o.score)
  const measurementScore = measurementScores.length ? Math.max(...measurementScores) : 0

  // Timeline urgency
  const timelineScore = TIMELINE_OPTIONS.find((o) => o.value === state.timeline)?.score ?? 0

  return spendScore + channelScore + measurementScore + timelineScore
}

function getBand(score: number): { band: string; label: string; prescription: string } {
  if (score < 40)
    return {
      band: 'Foundational',
      label: 'Early Stage',
      prescription: 'Focus on clean tracking & basic attribution hygiene.',
    }
  if (score < 70)
    return {
      band: 'Progressing',
      label: 'Building',
      prescription: 'Optimise channels & pilot MMM.',
    }
  return {
    band: 'Advanced',
    label: 'Maturity',
    prescription: 'Deploy full MMM + incrementality programme.',
  }
}

// submitToFs from use-formspark handles posting; no custom fetch needed

// -----------------------------------------------------------------------------
// 3. Stepper Component
// -----------------------------------------------------------------------------

export default function ActionPlanPage() {
  const [step, setStep] = useState(0)
  const [formState, setFormState] = useState<FormState>(initialState)
  const [submitting, setSubmitting] = useState(false)
  const [submitToFs, submittingFs] = useFormspark({ formId: 'phcmKSgAi' })
  const [submitted, setSubmitted] = useState(false)

  const totalSteps = 5


  // ---------------------------------------------------------------------------
  // Validation helpers
  // ---------------------------------------------------------------------------

  const isStepValid = (currentStep: number): boolean => {
    switch (currentStep) {
      case 0:
        return formState.isAgency !== null
      case 1:
        return formState.monthlySpend !== null && formState.channels.length > 0
      case 2:
        return formState.measurementStack.length > 0
      case 3:
        return formState.goal.trim().length > 0 && formState.timeline !== null
      case 4:
        const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/i.test(formState.email)
        const isCompanyEmail = emailValid && !/(gmail\.com|yahoo\.com|outlook\.com)$/i.test(formState.email)
        return (
          formState.name.trim().length > 0 &&
          isCompanyEmail &&
          formState.email.trim().length > 0 &&
          formState.company.trim().length > 0
        )
      default:
        return true
    }
  }

  const handleNext = async () => {
    if (step === totalSteps - 1) {
      // Final step → compute score & submit
      const score = computeScore(formState)
      const finalState = { ...formState, maturityScore: score }
      setSubmitting(true)
      try {
        await submitToFs(finalState)
      } catch (err) {
        console.warn('Formspark error', err)
      }
      setSubmitting(false)
      setFormState(finalState)
      setSubmitted(true)
    } else {
      setStep((s) => s + 1)
    }
  }

  const handleBack = () => setStep((s) => Math.max(0, s - 1))

  // Input handlers
  const update = <K extends keyof FormState>(key: K, value: FormState[K]) =>
    setFormState((prev) => ({ ...prev, [key]: value }))

  // ---------------------------------------------------------------------------
  // Rendering helpers
  // ---------------------------------------------------------------------------

  // Step components
  const stepComponents = [
    <StepWrapper {...STEP_META[0]} key={0} step={step} totalSteps={totalSteps} onBack={handleBack} onNext={handleNext} nextDisabled={submitting || !isStepValid(step)}>
      <div className="grid grid-cols-2 gap-4">
        {ENTITY_OPTIONS.map((opt) => {
          const selected = formState.isAgency === opt.value
          return (
            <button
              type="button"
              key={opt.label}
              onClick={() => update('isAgency', opt.value)}
              className={clsx(
                'flex flex-col items-center justify-center border rounded-lg p-6 transition-colors',
                selected
                  ? 'border-primary bg-primary/10 text-slate-900'
                  : 'border-slate-300 hover:border-primary',
              )}
            >
              <span className="text-4xl mb-3">{opt.icon}</span>
              <span className="font-medium">{opt.label}</span>
              {opt.sub && (
                <span className="mt-2 text-sm text-slate-600 text-center">{opt.sub}</span>
              )}
            </button>
          )
        })}
      </div>
    </StepWrapper>,
    <StepWrapper {...STEP_META[1]} key={1} step={step} totalSteps={totalSteps} onBack={handleBack} onNext={handleNext} nextDisabled={submitting || !isStepValid(step)}>
      <div>
        <p className="font-medium mb-2">What’s your average monthly paid media spend?</p>
        <div className="space-y-2">
          {SPEND_OPTIONS.map((opt) => (
            <label key={opt.value} className="flex items-center space-x-2">
              <input
                type="radio"
                name="monthlySpend"
                checked={formState.monthlySpend === opt.value}
                onChange={() => update('monthlySpend', opt.value)}
              />
              <span>{opt.label}</span>
            </label>
          ))}
        </div>
      </div>
      <div>
        <p className="font-medium mb-2 mt-6">Which primary marketing channels do you invest in?</p>
        <ChannelMultiSelect
          selected={formState.channels}
          onChange={(list) => update('channels', list)}
        />
      </div>
    </StepWrapper>,
    <StepWrapper {...STEP_META[2]} key={2} step={step} totalSteps={totalSteps} onBack={handleBack} onNext={handleNext} nextDisabled={submitting || !isStepValid(step)}>
      <div className="grid md:grid-cols-2 gap-4">
        {MEASUREMENT_OPTIONS.map((opt) => {
          const selected = formState.measurementStack.includes(opt.value)
          return (
            <button
              type="button"
              key={opt.value}
              onClick={() => {
                const already = formState.measurementStack.includes(opt.value)
                update(
                  'measurementStack',
                  already
                    ? formState.measurementStack.filter((v) => v !== opt.value)
                    : [...formState.measurementStack, opt.value],
                )
              }}
              className={clsx(
                'flex flex-col items-start border rounded-lg p-6 text-left transition-colors',
                selected
                  ? 'border-primary bg-primary/10'
                  : 'border-slate-300 hover:border-primary',
              )}
            >
              <span className="text-3xl mb-3">{opt.icon}</span>
              <span className="font-medium">{opt.label}</span>
              <span className="mt-1 text-sm text-slate-600">{opt.sub}</span>
            </button>
          )
        })}
      </div>
    </StepWrapper>,
    <StepWrapper {...STEP_META[3]} key={3} step={step} totalSteps={totalSteps} onBack={handleBack} onNext={handleNext} nextDisabled={submitting || !isStepValid(step)}>
      <div>
        <p className="font-medium mb-2">Primary goal for the next 6 months?</p>
        <textarea
          rows={3}
          className="w-full border border-slate-300 rounded-md px-3 py-2"
          maxLength={200}
          value={formState.goal}
          onChange={(e) => update('goal', e.target.value)}
          placeholder="e.g. Lower CAC, scale spend, prove channel value…"
        />
      </div>
      <div>
        <p className="font-medium mb-2 mt-6">Desired timeline to solve?</p>
        <div className="space-y-2">
          {TIMELINE_OPTIONS.map((opt) => (
            <label key={opt.value} className="flex items-center space-x-2">
              <input
                type="radio"
                name="timeline"
                checked={formState.timeline === opt.value}
                onChange={() => update('timeline', opt.value)}
              />
              <span>{opt.label}</span>
            </label>
          ))}
        </div>
      </div>
    </StepWrapper>,
    <StepWrapper {...STEP_META[4]} key={4} step={step} totalSteps={totalSteps} onBack={handleBack} onNext={handleNext} nextDisabled={submitting || !isStepValid(step)}>
      <div className="space-y-4">
        <input
          type="text"
          className="w-full border border-slate-300 rounded-md px-3 py-2"
          placeholder="Your name"
          value={formState.name}
          onChange={(e) => update('name', e.target.value)}
        />
        <input
          type="email"
          className="w-full border border-slate-300 rounded-md px-3 py-2"
          placeholder="Work email"
          value={formState.email}
          onChange={(e) => update('email', e.target.value)}
          required
        />
        <input
          type="text"
          className="w-full border border-slate-300 rounded-md px-3 py-2"
          placeholder="Company"
          value={formState.company}
          onChange={(e) => update('company', e.target.value)}
        />
        <p className="text-sm text-slate-600">Your details will only be used by our founder to follow up with more information.</p>
      </div>
    </StepWrapper>,
  ]

  // Results screen
  const renderResults = () => {
    if (!submitted || formState.maturityScore == null) return null
    const { band, label, prescription } = getBand(formState.maturityScore)
    return (
      <section className="py-16">
        <Container className="max-w-2xl text-center">
          <h2 className="font-display text-4xl font-semibold text-slate-900">
            Your Measurement Maturity Score: {formState.maturityScore} ({band})
          </h2>
          <p className="mt-4 text-lg text-slate-700">
            {prescription}
          </p>

          <div className="mt-10 space-y-4 text-left">
            <h3 className="font-semibold text-xl">Top Priorities for the Next 30 Days</h3>
            <ul className="list-disc list-inside space-y-2">
              {band === 'Foundational' && (
                <>
                  <li>Implement server-side tracking for Meta & Google Ads.</li>
                  <li>Consolidate events into a single analytics schema.</li>
                  <li>Deploy UTM hygiene audit.</li>
                </>
              )}
              {band === 'Progressing' && (
                <>
                  <li>Begin media mix modelling pilot.</li>
                  <li>Set up weekly incrementality tests.</li>
                  <li>Automate channel cost data ingestion.</li>
                </>
              )}
              {band === 'Advanced' && (
                <>
                  <li>Scale MMM to include offline & emerging channels.</li>
                  <li>Run always-on incrementality programme.</li>
                  <li>Integrate MMM insights into weekly optimisation workflow.</li>
                </>
              )}
            </ul>
          </div>

          <Button href="/schedule-demo" className="mt-10">
            Schedule a Demo
          </Button>
        </Container>
      </section>
    )
  }

  return (
    <>
      <Head>
        <title>Marketing Measurement Action Plan | Halliard</title>
        <meta
          name="description"
          content="Answer 5 quick questions to get your marketing measurement maturity score and a tailored action plan."
        />
      </Head>
      <Header hideLinks />
      <main className="pt-32 flex flex-col min-h-screen">
        {!submitted ? stepComponents[step] : renderResults()}
      </main>
    </>
  )
}

// Tell the custom _app/layout to hide site navbar and use full width for this page
;(ActionPlanPage as any).disableNavbar = true
;(ActionPlanPage as any).fullWidth = true
;(ActionPlanPage as any).siteBg = true 