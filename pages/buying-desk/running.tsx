import React from 'react'
import { Activity, CalendarClock, History, Lightbulb, SlidersHorizontal, ToggleLeft, TrendingDown } from 'lucide-react'
import { Accent } from '../../components/landing/kit'
import { AudiencePage, type Audience } from '../../components/solutions/AudiencePage'

// What happens after launch. Every claim is already on /buying-desk or
// /buying-desk/how-it-works.
const DATA: Audience = {
  slug: 'running',
  path: '/buying-desk/running',
  cta: { label: 'Get a free plan', href: '/buying-desk#get-plan' },
  icon: Activity,
  eyebrow: 'After launch',
  title: 'Campaign Pacing and Monitoring After Launch | Halliard',
  description:
    'Once a campaign is live, Halliard checks delivery every six hours, drafts the changes worth making, and waits for your approval on the bigger ones.',
  heading: (
    <>
      Launch is the easy part. Then someone has to <Accent>watch it.</Accent>
    </>
  ),
  intro:
    'Once a campaign is live, Halliard reads its delivery every six hours, drafts the changes worth making, and waits for you on the bigger ones. Every change lands on one record.',
  problemsTitle: 'What goes wrong between check-ins',
  problems: [
    { icon: TrendingDown, before: 'A line stalls and you find out in the last week.', after: 'Delivery checked every six hours.' },
    { icon: CalendarClock, before: 'Nobody looks at the account over the weekend.', after: 'Checked every day of the week.' },
    { icon: Lightbulb, before: 'Ideas nobody has time to make.', after: 'Drafted for you: approve and it’s done.' },
    { icon: ToggleLeft, before: 'The platform switches on its own automation.', after: 'Automation off by default.' },
    { icon: SlidersHorizontal, before: 'Approve every $5 change, or none of them.', after: 'Small moves run. Bigger ones wait for you.' },
    { icon: History, before: 'Who changed the budget, and why?', after: 'Every change on one record.' },
  ],
  stepsTitle: 'What happens once it is live',
  steps: [
    {
      title: 'It watches',
      body: 'Every six hours Halliard reads delivery on Meta and PubMatic and compares it with the plan you approved.',
    },
    {
      title: 'It asks before the big moves',
      body: 'Budget moves over your threshold (10% or $50 by default), new ads, targeting changes, pauses and resumes wait for your approval. Smaller budget adjustments run on their own.',
    },
    {
      title: 'It writes everything down',
      body: 'What was changed, why, and what the platform said back. Read it yourself or show your client.',
    },
  ],
  priceTitle: 'Watching the campaign is in the fee',
  prices: [
    { what: 'Buying, per campaign', price: '30% of a freelance buyer' },
    { what: 'Set-up, launch, monitoring and reporting', price: 'Included' },
  ],
  priceNote: 'The fee is shown on the campaign before you approve it.',
  questionsTitle: 'What people ask about a live campaign',
  faq: [
    {
      q: 'How often does Halliard check a live campaign?',
      a: 'Every six hours, every day.',
    },
    {
      q: 'Can it change my campaign without asking?',
      a: 'Only small budget adjustments, which are logged. Budget moves over your threshold (10% or $50 by default), new ads, targeting changes, pauses and resumes wait for your approval.',
    },
    {
      q: 'Does it turn on the platforms’ own automation?',
      a: 'No. Platform automation is off by default on the campaigns Halliard builds.',
    },
    {
      q: 'Can my client see what was done?',
      a: 'Yes. Every action is on one record: what was bought or changed, why, and what the platform said back.',
    },
  ],
  closing: { title: 'Send your next brief.', subtitle: 'We buy it and keep it pacing.' },
}

export default function BuyingDeskRunningPage() {
  return <AudiencePage data={DATA} />
}

;(BuyingDeskRunningPage as any).disableNavbar = true
;(BuyingDeskRunningPage as any).fullWidth = true
;(BuyingDeskRunningPage as any).siteBg = true
