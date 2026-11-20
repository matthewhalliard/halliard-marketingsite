import React from 'react'
import { Accent } from '../../components/landing/kit'
import { ComparePage, type Comparison } from '../../components/compare/ComparePage'

// Everything said about MAI is from mai.co, its pricing page and its agency
// page, read on the date below. Re-check before each publish: its prices move.
const DATA: Comparison = {
  slug: 'mai',
  competitor: 'MAI',
  title: 'Halliard vs MAI: An MAI Alternative That Runs Your Ads for You',
  description:
    'MAI gives you an AI agent to run your Google and Meta ads yourself. Halliard plans, buys and measures them for you at a flat monthly fee. See which fits.',
  heading: (
    <>
      A tool you run, or a team that <Accent>runs it.</Accent>
    </>
  ),
  intro:
    'MAI gives you an AI agent to run your Google and Meta ads yourself. Halliard plans, buys and measures them for you, and nothing launches until you approve it. Here is where each one fits.',
  chooseThem: [
    'You have someone who runs your ads and wants an agent to help them.',
    'You buy on Microsoft Ads as well as Google and Meta.',
    'You would rather pay for usage in credits than a flat fee.',
  ],
  chooseUs: [
    'You want your ads run for you, not another tool to operate.',
    'You want one flat monthly price, never a cut of your spend.',
    'You want a receipt for every change, with Google and Meta’s replies kept.',
  ],
  groups: [
    {
      group: 'Who does the work',
      rows: [
        ['Running the ads', 'You, with MAI’s agent', 'Halliard, with your approval'],
        ['A person checking changes', 'On the custom managed tier', 'Every plan, before it launches'],
        ['Record of changes', 'Decision log', 'Every request and platform reply kept'],
      ],
    },
    {
      group: 'What you get',
      rows: [
        ['Free audit', 'Read-only audit', 'Read-only audit, wasted searches named'],
        ['Channels', 'Google, Meta, Microsoft', 'Google Search and Meta'],
        ['Proof it worked', 'MMM preview; full reports custom', 'MMM, geo tests and brand studies'],
        ['Agencies', 'Separate client workspaces', 'Many clients in one account'],
      ],
    },
    {
      group: 'Price',
      rows: [
        ['To start', '$99 in trial credits', 'Free audit and plan'],
        ['After that', 'Credit bundles; MAI OS from $199 a month', 'Flat $149 to $999 a month by budget'],
        ['Managed service', 'Custom', 'Included'],
      ],
    },
  ],
  both: {
    title: 'Switching from MAI, or from an agency?',
    body: 'Start with the free audit. Connect Google Ads read-only and see what the last 90 days wasted, then decide whether to have us run it.',
  },
  faq: [
    {
      q: 'Is Halliard an MAI alternative?',
      a: 'For a brand that wants its Google and Meta ads run for it, yes. MAI is software you operate; Halliard is the service that operates it for you, at a flat fee.',
    },
    {
      q: 'How much does MAI cost?',
      a: "MAI's pricing page offers $99 in trial credits, then credit bundles, with MAI OS from $199 a month. Its managed tier is priced on request.",
    },
    {
      q: 'How much does Halliard cost?',
      a: '$149 a month under $2,000 of ad budget, $399 up to $10,000 and $999 up to $30,000. Above that, we agree a fee. Your ad budget is billed by Google and Meta at cost.',
    },
    {
      q: 'Does Halliard change my ads without asking?',
      a: 'Nothing launches without your approval. Small budget moves within the limits you set run on their own, and each is logged with a receipt.',
    },
  ],
  sources: [
    { label: 'MAI', href: 'https://www.mai.co/' },
    { label: 'MAI pricing', href: 'https://www.mai.co/pricing' },
    { label: 'MAI for agencies', href: 'https://www.mai.co/use-cases/agencies' },
  ],
  checked: 'November 19, 2026',
  cta: 'Get your free audit',
}

export default function CompareMaiPage() {
  return <ComparePage data={DATA} />
}

;(CompareMaiPage as any).disableNavbar = true
;(CompareMaiPage as any).fullWidth = true
;(CompareMaiPage as any).siteBg = true
