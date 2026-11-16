import React from 'react'
import { BarChart3, CircleDollarSign, Clock, Megaphone, Receipt, ShieldCheck, Users } from 'lucide-react'
import { Accent } from '../../components/landing/kit'
import { AudiencePage, type Audience } from '../../components/solutions/AudiencePage'

const DATA: Audience = {
  slug: 'in-house',
  icon: Users,
  eyebrow: 'For in-house marketing teams',
  title: 'Media Planning Tool for In-House Marketing Teams | Halliard',
  description:
    'Plan and buy media in-house without an agency retainer: a plan from your brief with reach modelled, bought for a fee per campaign, with every action logged.',
  heading: (
    <>
      Run media in-house, without building a <Accent>media department.</Accent>
    </>
  ),
  intro:
    'Paste your brief and Halliard drafts the plan, with reach and frequency modelled. If you want it bought, Halliard buys it for a fee per campaign, and you approve every line first.',
  problemsTitle: 'What an in-house team runs into',
  problems: [
    { icon: Receipt, before: 'A retainer or a cut of spend, busy month or not.', after: 'A fee per campaign, shown first.' },
    { icon: CircleDollarSign, before: 'Is this budget enough? We guess.', after: 'Every budget checked against its job.' },
    { icon: BarChart3, before: 'The plan is a channel list finance won’t back.', after: 'Reach modelled, line by line.' },
    { icon: Clock, before: 'Nobody watches the account between check-ins.', after: 'Delivery checked every six hours.' },
    { icon: ShieldCheck, before: 'You can’t let software spend unsupervised.', after: 'You approve every line first.' },
    { icon: Megaphone, before: 'Did awareness move? Nobody knows.', after: 'A brand study from $5,500.' },
  ],
  stepsTitle: 'Three ways to use it',
  steps: [
    {
      title: 'Plan it yourselves',
      body: 'Paste a brief and get audiences, strategy and a channel plan in about six minutes. Edit any line. Free for a team planning on its own.',
    },
    {
      title: 'Have it bought',
      body: 'Hand the approved plan to Halliard. It builds the campaigns on Meta and PubMatic and keeps them pacing. Or take the plan to the buyers you already use.',
    },
    {
      title: 'Find out what worked',
      body: 'Brand studies, mix models and incrementality tests are priced per project, so you can check what the spend did.',
    },
  ],
  priceTitle: 'You pay when something runs',
  prices: [
    { what: 'Planning', price: 'Free' },
    { what: 'Buying, per campaign', price: '30% of a freelance buyer' },
    { what: 'Brand study', price: 'From $5,500' },
    { what: 'Marketing mix model', price: '$25,000' },
  ],
  priceNote: 'No retainer. The fee is shown before you approve.',
  faq: [
    {
      q: 'Do we need a media buyer on staff?',
      a: 'Not to start. Halliard drafts the plan and can buy it on Meta and PubMatic. You approve every line before money is spent.',
    },
    {
      q: 'How is the buying fee worked out?',
      a: 'Halliard estimates the hours a freelance media buyer would spend on the campaign and charges 30% of that cost. The fee is shown before you approve.',
    },
    {
      q: 'Can it change our campaigns without asking?',
      a: 'Bigger changes wait for your approval. Small budget adjustments run on their own and are logged.',
    },
    {
      q: 'Can we keep our agency for some channels?',
      a: 'Yes. A plan can include channels Halliard does not buy, and the plan is yours to hand to anyone.',
    },
  ],
  closing: { title: 'Try it on a campaign you already ran.', subtitle: 'See the plan before you commit.' },
}

export default function InHousePage() {
  return <AudiencePage data={DATA} />
}

;(InHousePage as any).disableNavbar = true
;(InHousePage as any).fullWidth = true
;(InHousePage as any).siteBg = true
