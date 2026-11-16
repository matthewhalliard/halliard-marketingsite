import React from 'react'
import { Accent } from '../../components/landing/kit'
import { ComparePage, type Comparison } from '../../components/compare/ComparePage'

// Everything said about Bionic is from bionic-ads.com, read on the date below.
const DATA: Comparison = {
  slug: 'bionic',
  competitor: 'Bionic',
  title: 'Halliard vs Bionic: A Bionic Alternative for Media Planning',
  description:
    'Bionic runs the agency workflow from RFP to bill reconciliation. Halliard drafts the plan from a brief with reach modelled, free to start. See which fits.',
  heading: (
    <>
      Halliard or Bionic? <Accent>They do different jobs.</Accent>
    </>
  ),
  intro:
    'Bionic runs the paperwork of a media buy: RFPs, insertion orders, trafficking and bills. Halliard drafts the plan itself from a brief, with reach and frequency modelled. Here is where each one fits.',
  chooseThem: [
    'You need RFPs, insertion orders, trafficking and vendor bill reconciliation in one tool.',
    'You want flowcharts and client dashboards built in.',
    'You have five or more people who will use it.',
  ],
  chooseUs: [
    'You want the first draft of the plan written for you from the brief.',
    'You want reach and frequency modelled across the whole plan.',
    'You want to start free, or have someone buy the plan for you.',
  ],
  groups: [
    {
      group: 'Planning',
      rows: [
        ['Starting point', 'You build the plan in the tool', 'Paste a brief and Halliard drafts it'],
        ['Reach and frequency', 'KPI forecasting', 'Modelled for the whole plan'],
        ['Flowcharts', 'Yes', 'No. Plans export to Excel'],
        ['Channels', 'Digital, TV, radio, print, outdoor', 'TV, streaming, social, outdoor'],
      ],
    },
    {
      group: 'Buying and operations',
      rows: [
        ['RFPs and insertion orders', 'Yes', 'No'],
        ['Setting up campaigns', 'Ad server trafficking', 'Halliard builds them on Meta and PubMatic'],
        ['Pacing', 'Delivery pacing monitored', 'Checked every six hours when Halliard buys'],
        ['Vendor bill reconciliation', 'Yes', 'No'],
      ],
    },
    {
      group: 'Price',
      rows: [
        ['To start', 'From $199 a user each month', 'Free to plan on your own'],
        ['Minimum', '5 users: $995 a month', 'None'],
        ['Whole agency', 'Volume discounts', '$13,000 a year'],
        ['Free trial', 'No. Money back if you cancel', 'Free, no credit card'],
        ['Buying', 'You place the buys', 'Optional. A fee per campaign'],
      ],
    },
  ],
  both: {
    title: 'You can use both.',
    body: 'Draft the plan in Halliard, then run RFPs, insertion orders and billing in Bionic. The plan exports to Excel, and it is yours whether or not Halliard buys it.',
  },
  faq: [
    {
      q: 'Is Halliard a replacement for Bionic?',
      a: 'Not fully. Halliard drafts and models the plan, and can buy it on Meta and PubMatic. It does not send insertion orders or reconcile vendor bills, which Bionic does.',
    },
    {
      q: 'How much does Bionic cost?',
      a: "Bionic's pricing page says pricing starts at $199 per user per month with a five-unit minimum, so $995 a month for five users. Volume discounts are available.",
    },
    {
      q: 'Does Bionic have a free trial?',
      a: "Bionic's pricing page says technically no. It offers a satisfaction guarantee instead: if you cancel, it refunds what you paid.",
    },
    {
      q: 'How much does Halliard cost?',
      a: 'Planning is free for a team planning on its own, with no credit card. An agency putting a whole planning team on it pays $13,000 a year. Buying is a fee per campaign.',
    },
    {
      q: 'Which is better for a small agency?',
      a: 'It depends on the job. If the slow part is building and defending the plan, start with Halliard, which is free. If the slow part is orders, trafficking and billing, Bionic covers those.',
    },
    {
      q: 'Does Halliard model reach and frequency?',
      a: 'Yes. Reach and frequency are modelled for every strategy in a plan, down to the channel and the property.',
    },
  ],
  sources: [
    { label: 'Bionic media planning software', href: 'https://www.bionic-ads.com/planner/' },
    { label: 'Bionic pricing', href: 'https://www.bionic-ads.com/planner/pricing/' },
  ],
  checked: 'November 16, 2026',
}

export default function CompareBionicPage() {
  return <ComparePage data={DATA} />
}

;(CompareBionicPage as any).disableNavbar = true
;(CompareBionicPage as any).fullWidth = true
;(CompareBionicPage as any).siteBg = true
