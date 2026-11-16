import React from 'react'
import { BarChart3, Building2, FileText, History, LayoutGrid, RefreshCw, UserPlus } from 'lucide-react'
import { Accent } from '../../components/landing/kit'
import { LisaQuote } from '../../components/plan/proof'
import { AudiencePage, type Audience } from '../../components/solutions/AudiencePage'

const DATA: Audience = {
  slug: 'independent-agencies',
  icon: Building2,
  eyebrow: 'For independent agencies',
  title: 'Media Planning Software for Independent Agencies | Halliard',
  description:
    'Plan for every client in one login: drop in the RFP, get a plan with reach and frequency modelled, and have it bought when you are short a buyer.',
  heading: (
    <>
      A holding-company toolkit, without the <Accent>holding company.</Accent>
    </>
  ),
  intro:
    'Drop in the RFP and Halliard drafts the plan, with reach and frequency modelled. When you are short a buyer, it buys the plan too, with every fee shown to you and your client.',
  problemsTitle: 'The work that eats an independent agency’s week',
  problems: [
    { icon: FileText, before: 'The RFP arrives as a PDF and someone retypes it.', after: 'Drop it in. The plan is drafted.' },
    { icon: BarChart3, before: 'Reach and frequency lives in an old spreadsheet.', after: 'Modelled for the whole plan.' },
    { icon: RefreshCw, before: 'The client moves one number. Rebuild the plan.', after: 'Change one line and it rebalances.' },
    { icon: LayoutGrid, before: 'Every client in a different sheet and inbox.', after: 'Every client in one login.' },
    { icon: UserPlus, before: 'A new account means hiring a buyer.', after: 'Halliard buys it, per campaign.' },
    { icon: History, before: 'The client asks who changed what, and why.', after: 'Every action on the record.' },
  ],
  stepsTitle: 'Use as much of it as you need',
  steps: [
    {
      title: 'Plan every brief',
      body: 'Audiences sized to the ZIP, each budget checked against its job, and a plan you can read line by line. Free for a team planning on its own.',
    },
    {
      title: 'Hand over the buys you choose',
      body: 'Buy the plan the way you do today, or hand it to Halliard. It runs on Meta and PubMatic, and you approve every line before a dollar is spent.',
    },
    {
      title: 'Show the client the record',
      body: 'Delivery is checked every six hours. What was bought, why, and what the platform said back is logged for you to show.',
    },
  ],
  priceTitle: 'Priced so you can bill it through',
  prices: [
    { what: 'Planning, on your own', price: 'Free' },
    { what: 'Planning, across the agency', price: '$13,000 a year' },
    { what: 'Buying, per campaign', price: '30% of a freelance buyer' },
    { what: 'Brand study', price: 'From $5,500' },
  ],
  priceNote: 'Buying and measurement are client costs, so you can bill them through.',
  proof: <LisaQuote />,
  faq: [
    {
      q: 'Can we plan for several clients?',
      a: 'Yes. Agencies switch between every client in one login.',
    },
    {
      q: 'Do we have to buy through Halliard?',
      a: 'No. The plan is yours either way. Buy it the way you do today, or hand any plan to Halliard, campaign by campaign.',
    },
    {
      q: 'What does the buying fee come to?',
      a: 'Halliard estimates the hours a freelance media buyer would spend on the campaign and charges 30% of that cost. The fee is shown on the campaign before you approve it.',
    },
    {
      q: 'Where does Halliard buy?',
      a: 'On Meta and PubMatic. A plan can include other channels, which you place yourselves.',
    },
  ],
  closing: { title: 'Send your next RFP to Halliard.', subtitle: 'See the plan before you staff it.' },
}

export default function IndependentAgenciesPage() {
  return <AudiencePage data={DATA} />
}

;(IndependentAgenciesPage as any).disableNavbar = true
;(IndependentAgenciesPage as any).fullWidth = true
;(IndependentAgenciesPage as any).siteBg = true
