import React from 'react'
import { BarChart3, Building2, FileSpreadsheet, LayoutGrid, Percent, ScrollText } from 'lucide-react'
import { Accent } from '../components/landing/kit'
import { LisaQuote } from '../components/plan/proof'
import { ConnectorsStrip } from '../components/brand/scenes'
import { AudiencePage, type Audience } from '../components/solutions/AudiencePage'

// Halliard for agencies, the top-bar page now that the home sells to brands.
// Every claim here is already made on the planning, buying desk or pricing
// pages. Line for agencies worried about the brand pitch: brands that want
// more than Halliard runs are sent to agencies.
const DATA: Audience = {
  slug: 'agencies',
  path: '/agencies',
  icon: Building2,
  eyebrow: 'For agencies',
  title: 'Halliard for Agencies: Plan, Buy and Report for Every Client | Halliard',
  description:
    'Plan, buy and report for every client in one account: plans drafted from the brief, reach and frequency modelled, decks and Excel exports, and buys on Meta and PubMatic.',
  heading: (
    <>
      Plan, buy and report for every client, <Accent>in one place.</Accent>
    </>
  ),
  intro:
    'Halliard drafts the plan, the media mix and the client deck from the brief, buys it on Meta and streaming TV through PubMatic when you want, and reports what each client’s money earned.',
  addToAssistant: true,
  problemsTitle: 'What agencies get that tools for brands leave out',
  problems: [
    { icon: LayoutGrid, before: 'One workspace per client, nothing across them.', after: 'Every client in one account. Switch in one click.' },
    { icon: FileSpreadsheet, before: 'Client-ready output is built by hand.', after: 'Plans, Excel exports and decks per brief.' },
    { icon: Percent, before: 'Your margin is an afterthought.', after: 'Fees set per client, shown as gross, net or fee.' },
    { icon: BarChart3, before: 'Google and Meta only.', after: 'Streaming TV and the open web, with reach and frequency planned.' },
    { icon: ScrollText, before: 'The client asks who changed what.', after: 'Every action on the record.' },
  ],
  stepsTitle: 'Use as much of it as you need',
  steps: [
    {
      title: 'Plan every brief',
      body: 'Drop in the brief or RFP and Halliard drafts the audiences, strategies and plan, with reach and frequency modelled. Free for a team planning on its own.',
    },
    {
      title: 'Hand over the buys you choose',
      body: 'Buy the plan the way you do today, or hand it to Halliard, campaign by campaign. You approve every line before a dollar is spent.',
    },
    {
      title: 'Prove it worked',
      body: 'Delivery is checked every six hours, and every action is logged. Add a mix model, a geo test or a brand study when the client wants proof.',
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
  proof: (
    <>
      <p className="mb-3 text-center text-sm text-slate-500">Your clients connect their accounts by signing in</p>
      <ConnectorsStrip className="mb-12" />
      <LisaQuote />
    </>
  ),
  faq: [
    {
      q: 'Halliard runs ads for brands too. Will you compete with us?',
      a: 'Halliard runs Google and Meta for small brands at a flat fee. Brands that want more than that, we send to agencies.',
    },
    {
      q: 'Can we plan for several clients?',
      a: 'Yes. Agencies switch between every client in one login.',
    },
    {
      q: 'Do we have to buy through Halliard?',
      a: 'No. The plan is yours either way. Buy it the way you do today, or hand any plan to Halliard, campaign by campaign.',
    },
    {
      q: 'Where does Halliard buy?',
      a: 'On Meta and on streaming TV through PubMatic. A plan can include other channels, which you place yourselves.',
    },
  ],
  closing: { title: 'Send your next brief to Halliard.', subtitle: 'See the plan before you staff it.' },
}

export default function AgenciesPage() {
  return <AudiencePage data={DATA} />
}

;(AgenciesPage as any).disableNavbar = true
;(AgenciesPage as any).fullWidth = true
;(AgenciesPage as any).siteBg = true
