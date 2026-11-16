import React from 'react'
import { ClipboardPaste, Database, FileSpreadsheet, Gauge, Rows3, Unplug, Users } from 'lucide-react'
import { Accent } from '../../components/landing/kit'
import { AudiencePage, type Audience } from '../../components/solutions/AudiencePage'

// Bringing a research-tool audience into planning. The details are the
// product's own: the import sheet on the Audience tab.
const DATA: Audience = {
  slug: 'import-audience',
  path: '/plan/import-audience',
  icon: Database,
  eyebrow: 'Bring your own audience',
  title: 'Use Your GWI or Scarborough Audience in a Media Plan | Halliard',
  description:
    'Paste a column from your GWI, Scarborough or Resonate export into Halliard, and plan reach and frequency against the audience you already defined.',
  heading: (
    <>
      Your research tool knows the audience. Now your plan <Accent>does too.</Accent>
    </>
  ),
  intro:
    'Paste a column from your GWI, Scarborough or Resonate export into Halliard. Reach and frequency are then modelled against the audience you already defined.',
  problemsTitle: 'The gap between research and the plan',
  problems: [
    { icon: Unplug, before: 'The audience lives in one tool, the plan in another.', after: 'Paste the column into Halliard.' },
    { icon: FileSpreadsheet, before: 'Indexes retyped into a spreadsheet.', after: 'Numbers read as you paste them.' },
    { icon: Users, before: 'The plan ignores the audience you paid for.', after: 'Reach modelled on your numbers.' },
    { icon: Rows3, before: 'Your export doesn’t cover every channel.', after: 'Blank rows keep Halliard’s panel.' },
    { icon: Gauge, before: 'One runaway index skews the plan.', after: 'Indexes are held at 300.' },
    { icon: ClipboardPaste, before: 'No research tool at all?', after: 'Halliard’s panel sizes it for you.' },
  ],
  stepsTitle: 'Three steps on the Audience tab',
  steps: [
    {
      title: 'Paste your column',
      body: 'Copy the column from your tool’s export and paste it beside Halliard’s list of channels and properties. A label column in front is fine.',
    },
    {
      title: 'Say what the numbers are',
      body: 'An index against your tool’s base, or the share of the audience using each place in the past week or month. Add the audience’s size if you have it.',
    },
    {
      title: 'Apply it',
      body: 'The audience is fitted to what you gave. Every plan built for it afterwards reads your numbers.',
    },
  ],
  priceTitle: 'Included with planning',
  prices: [
    { what: 'Planning, on your own', price: 'Free' },
    { what: 'Importing your audience', price: 'Included' },
    { what: 'Planning, across an agency', price: '$13,000 a year' },
  ],
  priceNote: 'You bring your own licence for the research tool.',
  questionsTitle: 'What planners ask about importing',
  faq: [
    {
      q: 'Which tools can I import from?',
      a: 'Any tool that exports a column of numbers by channel or property. Halliard’s import names GWI, Scarborough and Resonate.',
    },
    {
      q: 'What numbers does it accept?',
      a: 'An index against your tool’s base, or the percentage of the audience using each channel in the past week or the past month.',
    },
    {
      q: 'What if my export misses some channels?',
      a: 'Leave those rows blank. They keep the figures from Halliard’s own panel.',
    },
    {
      q: 'Do I need a research tool to use Halliard?',
      a: 'No. Without one, audiences are sized from Halliard’s own survey panel.',
    },
  ],
  closing: { title: 'Bring the audience you already built.', subtitle: 'See the plan it produces.' },
}

export default function ImportAudiencePage() {
  return <AudiencePage data={DATA} />
}

;(ImportAudiencePage as any).disableNavbar = true
;(ImportAudiencePage as any).fullWidth = true
;(ImportAudiencePage as any).siteBg = true
