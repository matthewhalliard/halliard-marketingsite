import React from 'react'
import { Accent } from '../../components/landing/kit'
import { ComparePage, type Comparison } from '../../components/compare/ComparePage'

// Everything said about Nielsen Media Impact is from nielsen.com pages, read
// on the date below.
const DATA: Comparison = {
  slug: 'nielsen-media-impact',
  competitor: 'Nielsen Media Impact',
  title: 'Nielsen Media Impact Alternative for Reach Planning | Halliard',
  description:
    'Nielsen Media Impact plans reach and frequency from Nielsen panel data. Halliard drafts the whole plan from a brief with reach modelled, free to start.',
  heading: (
    <>
      A Nielsen Media Impact alternative <Accent>that writes the plan.</Accent>
    </>
  ),
  intro:
    'Nielsen Media Impact is an analyst’s tool for reach and frequency, built on Nielsen’s panel. Halliard drafts the whole plan from a brief and models its reach. Here is where each one fits.',
  chooseThem: [
    'Your clients expect Nielsen numbers behind the plan.',
    'You have analysts trained to build targets and scenarios.',
    'Most of your planning is national TV and audio.',
  ],
  chooseUs: [
    'You want the first draft of the plan written for you from the brief.',
    'You do not have a research licence or an analyst to run one.',
    'You want the plan bought as well as planned.',
  ],
  groups: [
    {
      group: 'Planning',
      rows: [
        ['Starting point', 'An analyst builds targets, media groups and a plan', 'Paste a brief and Halliard drafts it'],
        ['Reach and frequency', 'Yes, from Nielsen panel data', 'Yes, modelled for the whole plan'],
        ['Scenarios', 'Compared side by side', 'Edit any line and the plan rebalances'],
        ['Channels', 'TV, streaming, digital, audio', 'TV, streaming, social, outdoor'],
      ],
    },
    {
      group: 'Getting started',
      rows: [
        ['Software', 'An application you install', 'Runs in the browser'],
        ['Training', 'Courses and three certification levels', 'Paste a brief to start'],
      ],
    },
    {
      group: 'Price and buying',
      rows: [
        ['Price', 'Not published', 'Free to plan on your own'],
        ['Buying', 'Planning only', 'Optional. Halliard can buy the plan'],
      ],
    },
  ],
  both: {
    title: 'Some teams will want both.',
    body: 'If a client requires Nielsen numbers, use Nielsen for those plans. Use Halliard for the first draft, and for the plans where no one is asking for a research licence.',
  },
  faq: [
    {
      q: 'Is Halliard’s reach data the same as Nielsen’s?',
      a: 'No. Nielsen Media Impact uses Nielsen’s own panel. Halliard models reach and frequency itself. If a client requires Nielsen numbers, use Nielsen.',
    },
    {
      q: 'How much does Nielsen Media Impact cost?',
      a: 'Nielsen does not publish a price for it.',
    },
    {
      q: 'How much does Halliard cost?',
      a: 'Planning is free for a team planning on its own, with no credit card. An agency putting a whole planning team on it pays $13,000 a year. Buying is a fee per campaign.',
    },
    {
      q: 'What does Nielsen Media Impact do?',
      a: 'Nielsen describes it as a cross-media planning platform: build and compare plans across TV, streaming, digital and audio, and adjust reach, frequency and budget.',
    },
    {
      q: 'Do I need training to use Halliard?',
      a: 'No. You paste a brief or drop in an RFP, and Halliard drafts the audiences, strategy and channel plan. You can edit any line.',
    },
    {
      q: 'Can Halliard buy the plan too?',
      a: 'Yes, if you want. Halliard buys on Meta and PubMatic for a fee per campaign. Or take the plan and buy it yourself.',
    },
  ],
  sources: [
    { label: 'Nielsen Media Impact', href: 'https://www.nielsen.com/solutions/media-planning/media-impact/' },
    { label: 'Nielsen Media Impact training', href: 'https://learning.nielsen.com/page/nielsen-media-impact-nmi' },
    { label: 'the installer page', href: 'https://media-impact.planning.nielsen.com/us/prod/media-impact/index.html' },
  ],
  checked: 'November 16, 2026',
}

export default function CompareNielsenPage() {
  return <ComparePage data={DATA} />
}

;(CompareNielsenPage as any).disableNavbar = true
;(CompareNielsenPage as any).fullWidth = true
;(CompareNielsenPage as any).siteBg = true
