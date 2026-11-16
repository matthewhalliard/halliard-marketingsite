import React from 'react'
import { Accent } from '../../components/landing/kit'
import { ComparePage, type Comparison } from '../../components/compare/ComparePage'

// Everything said about Camphouse is from camphouse.io and its rename
// announcement, read on the date below.
const DATA: Comparison = {
  slug: 'camphouse',
  competitor: 'Camphouse',
  title: 'Halliard vs Camphouse (Mediatool): A Planning Alternative',
  description:
    'Camphouse, formerly Mediatool, gives large media teams one home for plans, approvals and budgets. Halliard drafts the plan from a brief, free to start.',
  heading: (
    <>
      Halliard or Camphouse? Depends on <Accent>your size.</Accent>
    </>
  ),
  intro:
    'Camphouse, formerly Mediatool, gives a large media team one place for its plans, approvals and budgets. Halliard writes the plan itself from a brief, with reach and frequency modelled. Here is where each one fits.',
  chooseThem: [
    'You run media across several markets or brands and need one home for every plan.',
    'You manage $10 million or more in media a year.',
    'You want planned spend set against actual spend across your ad accounts.',
  ],
  chooseUs: [
    'You want the first draft of the plan written for you from the brief.',
    'You want reach and frequency modelled across the whole plan.',
    'You want to start today, free, without a sales call.',
  ],
  groups: [
    {
      group: 'Planning',
      rows: [
        ['Starting point', 'Your team builds plans together in the tool', 'Paste a brief and Halliard drafts it'],
        ['Reach and frequency', 'Forecasting, on the Enterprise plan', 'Modelled for the whole plan'],
        ['Approvals', 'Approval workflows across teams', 'You approve every line before it is bought'],
      ],
    },
    {
      group: 'Running campaigns',
      rows: [
        ['Ad platforms', 'Google Ads, Meta, LinkedIn, TikTok, Amazon Ads', 'Meta and PubMatic'],
        ['Launching', 'Pushes approved plans to your ad accounts', 'Halliard builds the campaigns'],
        ['Reporting', 'Reports and dashboards across channels', 'Delivery checked every six hours when Halliard buys'],
      ],
    },
    {
      group: 'Price and setup',
      rows: [
        ['To start', 'Contact sales', 'Free to plan on your own'],
        ['Published prices', 'No. Custom on all three plans', 'Yes'],
        ['Built for', 'Teams managing $10M to $500M+ in media', 'Independent agencies and in-house teams'],
        ['Setup', 'A few weeks for most teams', 'Sign up and paste a brief'],
      ],
    },
  ],
  both: {
    title: 'They can sit side by side.',
    body: 'Camphouse keeps a large team’s plans, approvals and budgets in one place. Halliard writes the plan. A plan drafted in Halliard exports to Excel and is yours to take anywhere.',
  },
  faq: [
    {
      q: 'Is Camphouse the same as Mediatool?',
      a: 'Yes. Mediatool announced on February 27, 2025 that it was renaming itself Camphouse.',
    },
    {
      q: 'How much does Camphouse cost?',
      a: "Camphouse does not publish prices. Its pricing page lists three plans, Pro, Plus and Enterprise, each marked custom, and says it does not charge per seat.",
    },
    {
      q: 'How much does Halliard cost?',
      a: 'Planning is free for a team planning on its own, with no credit card. An agency putting a whole planning team on it pays $13,000 a year. Buying is a fee per campaign.',
    },
    {
      q: 'Is Halliard a replacement for Camphouse?',
      a: 'Not for a large team that needs one system for plans, approvals and budgets across markets. Halliard drafts and models the plan, and can buy it on Meta and PubMatic.',
    },
    {
      q: 'Which suits a small agency?',
      a: "Camphouse's pricing page says its plans are for teams managing $10 million to $500 million or more in media. Halliard is free to start and has no minimum.",
    },
    {
      q: 'Does Halliard connect to my ad accounts?',
      a: 'When Halliard buys a plan, it runs the campaigns on Meta and PubMatic. Other channels in the plan are bought by you.',
    },
  ],
  sources: [
    { label: 'Camphouse', href: 'https://camphouse.io/' },
    { label: 'Camphouse pricing', href: 'https://camphouse.io/pricing' },
    {
      label: 'the rename announcement',
      href: 'https://www.prnewswire.com/news-releases/mediatool-becomes-camphouse--pivoting-to-be-the-obvious-home-for-media-campaigns-302387602.html',
    },
  ],
  checked: 'November 16, 2026',
}

export default function CompareCamphousePage() {
  return <ComparePage data={DATA} />
}

;(CompareCamphousePage as any).disableNavbar = true
;(CompareCamphousePage as any).fullWidth = true
;(CompareCamphousePage as any).siteBg = true
