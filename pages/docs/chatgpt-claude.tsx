import Head from 'next/head'
import Link from 'next/link'
import { BookOpen } from 'lucide-react'
import { Container } from '../../components/mmm/Container'
import { HeroBackdrop, LandingHeader, SIGN_UP_URL } from '../../components/landing/kit'
import { CLAUDE_LISTING_URL } from '../../components/plan/add-to-assistant'

// Public documentation for Halliard's connector in the Claude (and, once listed, ChatGPT)
// directories. Keep pricing and "free" claims off this page, and say "market"
// rather than naming audience data vendors.
const SERVER_URL = 'https://client.halliardmedia.com/mcp'
const PORTAL_URL = 'https://client.halliardmedia.com'
const SUPPORT_EMAIL = 'support@halliardmedia.com'

const PROMPTS = [
  'Plan a $50,000 awareness campaign for my brand in Denver this spring',
  'Show the reach curve for my latest media plan',
  'Give me the plan as an Excel file',
  'How is my live campaign pacing?',
]

function Hero() {
  return (
    <section className="relative">
      <HeroBackdrop />
      <Container className="relative pt-32 pb-12 text-center lg:pt-40">
        <div className="mx-auto max-w-3xl">
          <p className="inline-flex items-center gap-2 rounded-full bg-tint px-4 py-1.5 text-sm font-medium text-primary mb-6">
            <BookOpen className="h-4 w-4" aria-hidden />
            Docs
          </p>
          <h1 className="font-display text-5xl font-medium tracking-tight text-slate-900 sm:text-6xl">
            Halliard in Claude
          </h1>
          <p className="mt-4 text-lg text-slate-600">
            Plan paid media and check on live campaigns from Claude.
          </p>
        </div>
      </Container>
    </section>
  )
}

function Section({ title, id, children }: { title: string; id?: string; children: React.ReactNode }) {
  return (
    <section id={id} className="mt-10 first:mt-0 scroll-mt-24">
      <h2 className="font-display text-2xl font-medium text-slate-900 mb-3">{title}</h2>
      <div className="prose prose-slate max-w-none text-slate-700 leading-relaxed">
        {children}
      </div>
    </section>
  )
}

function Body() {
  return (
    <section className="pb-20 sm:pb-28">
      <Container className="">
        <div className="mx-auto max-w-3xl rounded-2xl border border-tint bg-white p-6 shadow-lg shadow-primary/5 sm:p-12">
          <Section id="what-it-is" title="What it is">
            <p>Halliard is a media planning and buying service. Connected to Claude, it lets you:</p>
            <ul className="list-disc pl-6 mt-3 space-y-2">
              <li><strong>Plan paid media from a brief.</strong> Halliard drafts audiences and strategies, simulates a reach and frequency estimate from market audience data, builds a media plan, and exports it to Excel.</li>
              <li><strong>Read live campaigns.</strong> See settings and results for your live Meta and Google campaigns.</li>
              <li><strong>Ask the buying agent.</strong> Ask questions about a campaign, such as pacing or what is working.</li>
              <li><strong>Propose changes.</strong> Suggest a change to a live campaign for the Halliard team to review.</li>
            </ul>
          </Section>

          <Section id="connect" title="How to connect">
            <p>
              <a href={CLAUDE_LISTING_URL} className="text-primary underline" target="_blank" rel="noopener noreferrer">Open Halliard in Claude&apos;s connector directory</a> and connect it.
            </p>
            <p className="mt-3">
              To add it by URL instead, open Settings in Claude, then Connectors, then Add custom connector, and paste the server URL:
            </p>
            <pre className="mt-3 overflow-x-auto rounded-lg bg-slate-50 px-4 py-3 text-sm text-slate-900"><code>{SERVER_URL}</code></pre>
            <p className="mt-3">
              Connecting opens Halliard&apos;s sign-in. If you are new, you can sign up there. You name your company and first brand, and accept the terms. Then you return to Claude.
            </p>
          </Section>

          <Section id="examples" title="Example prompts">
            <ul className="list-disc pl-6 space-y-2">
              {PROMPTS.map(p => <li key={p}>&ldquo;{p}&rdquo;</li>)}
            </ul>
          </Section>

          <Section id="team" title="What needs Halliard's team">
            <p>
              Changes to live campaigns are only proposed from the chat. The Halliard team approves them. Nothing moves without a person. Halliard never moves money, and it doesn&apos;t launch campaigns from the chat.
            </p>
          </Section>

          <Section id="privacy" title="Privacy">
            <p>
              Claude sends Halliard only what each Halliard tool needs, such as the text of a brief, a question for a campaign&apos;s agent, or a proposed change. We store those in your Halliard account and note that they came from Claude. We also record tool calls, including what Claude sent, in our product analytics to improve Halliard. We don&apos;t receive the rest of your conversation, Claude&apos;s memory, or your files. Read the full <Link href="/privacy#ai-assistants" className="text-primary underline">Privacy Policy</Link>.
            </p>
          </Section>

          <Section id="troubleshooting" title="Troubleshooting">
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>A tool says you&apos;re not set up for a company.</strong> Finish setup at <a href={PORTAL_URL} className="text-primary underline">client.halliardmedia.com</a>, then try again.</li>
              <li><strong>Drafting seems slow.</strong> Drafting audiences, strategies, or a plan takes a minute or more. Give it time before asking again.</li>
              <li><strong>Something isn&apos;t working after you connected.</strong> Disconnect Halliard in Claude&apos;s settings, then connect again.</li>
              <li><strong>An export link stopped working.</strong> Export links last one hour. Ask for the plan again to get a new link.</li>
            </ul>
            <p className="mt-3">
              Still stuck? Email <a href={`mailto:${SUPPORT_EMAIL}`} className="text-primary underline">{SUPPORT_EMAIL}</a> or see <Link href="/support" className="text-primary underline">Support</Link>.
            </p>
          </Section>
        </div>
      </Container>
    </section>
  )
}

function DocsPage() {
  return (
    <>
      <Head>
        <title>Halliard in Claude — Halliard</title>
        <meta name="description" content="Connect Halliard to Claude to plan paid media from a brief, read live Meta and Google campaigns, and propose changes for the Halliard team to approve." />
        <link rel="canonical" href="https://www.halliardmedia.com/docs/chatgpt-claude" />
      </Head>
      <LandingHeader href={SIGN_UP_URL} cta="Get started" />
      <main>
        <Hero />
        <Body />
      </main>
    </>
  )
}

Object.assign(DocsPage, { disableNavbar: true, fullWidth: true, siteBg: true })

export default DocsPage
