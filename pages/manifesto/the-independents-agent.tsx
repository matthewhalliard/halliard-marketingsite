import Head from 'next/head'
import Link from 'next/link'
import React from 'react'
import { Container } from '../../components/mmm/Container'
import { Button } from '../../components/mmm/Button'

// =============================================================================
// /manifesto/the-independents-agent
// The anchor flag-planting post for Halliard's 2026 agentic-buying positioning.
// Published 2026-05 alongside the LinkedIn campaign launch.
// Voice: Halliard-brand (never founder). Plant-the-flag, not promotional.
// =============================================================================

function MinimalHeader() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-sm border-b border-gray-100">
      <Container className="">
        <nav className="relative flex justify-between items-center py-5">
          <Link href="/" className="flex items-center">
            <img
              src="https://framerusercontent.com/images/s97qQgHpRGf1STgb6vDMgqYNU4.png?scale-down-to=512"
              alt="Halliard"
              className="h-8 w-auto"
            />
          </Link>
          <Link
            href="/agentic"
            className="hidden sm:inline-flex items-center text-sm font-medium text-primary hover:text-primary/80 transition-colors"
          >
            See the buying agent →
          </Link>
        </nav>
      </Container>
    </header>
  )
}

function Eyebrow() {
  return (
    <div className="flex items-center justify-center gap-3 mb-6 text-sm">
      <span className="inline-flex items-center gap-1.5 rounded-full bg-tint px-3 py-1 font-medium text-primary">
        🚩 Halliard editorial
      </span>
      <span className="text-slate-500">May 2026 · 6 min read</span>
    </div>
  )
}

function Hero() {
  return (
    <div className="relative overflow-hidden">
      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse at 50% 0%, rgba(211,228,255,0.4) 0%, rgba(255,255,255,0.95) 60%, rgb(255,255,255) 100%)',
        }}
      />
      <Container className="relative pt-28 pb-12 lg:pt-32">
        <div className="mx-auto max-w-3xl text-center">
          <Eyebrow />
          <h1 className="font-display text-4xl font-medium tracking-tight text-slate-900 sm:text-5xl lg:text-[56px] lg:leading-[1.08]">
            The Independents&rsquo; Agent
          </h1>
          <p className="mx-auto mt-7 max-w-2xl text-lg sm:text-xl tracking-tight text-slate-700 leading-relaxed">
            The biggest media-buying decision your agency makes in 2026 is not
            which DSP. It&rsquo;s which agent buys for you.
          </p>
        </div>
      </Container>
    </div>
  )
}

// Wrapper for the long-form article body. Uses prose classes for typography.
function Article({ children }: { children: React.ReactNode }) {
  return (
    <Container className="py-8 lg:py-12">
      <article className="mx-auto max-w-2xl prose prose-slate prose-lg prose-headings:font-display prose-headings:font-medium prose-headings:tracking-tight prose-h2:mt-14 prose-h2:mb-5 prose-h2:text-3xl sm:prose-h2:text-4xl prose-p:leading-relaxed prose-p:text-slate-700 prose-strong:text-slate-900 prose-a:text-primary prose-a:no-underline hover:prose-a:underline prose-blockquote:border-l-4 prose-blockquote:border-primary prose-blockquote:bg-tint/40 prose-blockquote:py-1 prose-blockquote:px-6 prose-blockquote:not-italic prose-blockquote:font-medium prose-blockquote:text-slate-900 prose-li:text-slate-700 prose-li:my-2">
        {children}
      </article>
    </Container>
  )
}

function PullQuote() {
  return (
    <div className="my-12">
      <blockquote className="border-l-4 border-primary bg-tint/40 px-8 py-6">
        <p className="font-display text-2xl sm:text-3xl font-medium tracking-tight text-slate-900 leading-snug not-italic">
          &ldquo;Independents don&rsquo;t need a platform&rsquo;s agent. They
          need their own.&rdquo;
        </p>
      </blockquote>
    </div>
  )
}

function CtaSection() {
  return (
    <div className="relative overflow-hidden border-t border-gray-200 bg-slate-50">
      <Container className="relative py-20">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="font-display text-3xl sm:text-4xl font-medium tracking-tight text-slate-900">
            Join the 2026 pilot cohort.
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-lg text-slate-700 leading-relaxed">
            If you run media at an independent agency between thirty and three
            hundred people, and the platform-agent question is on your desk
            right now, we&rsquo;d like to talk.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row justify-center gap-4">
            <Button className="" color="blue" href="/agentic">
              See the buying agent →
            </Button>
          </div>
          <p className="mt-5 text-sm text-slate-500">
            No deck. No follow-up unless you ask. Halliard replies in
            twenty-four hours.
          </p>
        </div>
      </Container>
    </div>
  )
}

function Footer() {
  return (
    <footer className="border-t border-gray-100 bg-white">
      <Container className="py-10">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-slate-500">
          <div className="flex items-center gap-3">
            <img
              src="https://framerusercontent.com/images/s97qQgHpRGf1STgb6vDMgqYNU4.png?scale-down-to=512"
              alt="Halliard"
              className="h-6 w-auto opacity-70"
            />
            <span>© 2026 Halliard Media</span>
          </div>
          <div className="flex items-center gap-6">
            <Link href="/agentic" className="hover:text-slate-700 transition-colors">
              Agentic buying
            </Link>
            <Link href="/" className="hover:text-slate-700 transition-colors">
              Halliard
            </Link>
            <Link href="/legal/privacy" className="hover:text-slate-700 transition-colors">
              Privacy
            </Link>
          </div>
        </div>
      </Container>
    </footer>
  )
}

function ManifestoPage() {
  return (
    <>
      <Head>
        <title>The Independents&apos; Agent | Halliard</title>
        <meta
          name="description"
          content="The biggest media-buying decision your agency makes in 2026 is not which DSP. It's which agent buys for you."
        />
        <meta name="robots" content="index,follow" />
        <link
          rel="canonical"
          href="https://www.halliardmedia.com/manifesto/the-independents-agent"
        />
        <meta
          property="og:title"
          content="The Independents' Agent | Halliard"
        />
        <meta
          property="og:description"
          content="Holdcos are building their own agents. Platforms are biased toward their own inventory. Independents need their own."
        />
        <meta property="og:type" content="article" />
        <meta
          property="og:url"
          content="https://www.halliardmedia.com/manifesto/the-independents-agent"
        />
        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:title"
          content="The Independents' Agent | Halliard"
        />
        <meta
          name="twitter:description"
          content="The biggest media-buying decision your agency makes in 2026 is not which DSP. It's which agent buys for you."
        />
      </Head>
      <MinimalHeader />
      <main className="pt-4">
        <Hero />

        <Article>
          <p>
            That is the sentence we keep coming back to. It is the sentence
            the holdcos already know. It is the sentence the platforms are
            quietly betting you won&rsquo;t say out loud until it&rsquo;s too
            late to do anything about it.
          </p>

          <PullQuote />

          <h2>The moment</h2>

          <p>Look at what shipped in the last twelve months.</p>

          <p>
            Amazon Ads launched its agentic buyer inside the DSP. Google
            rolled agentic placements into Performance Max. The Trade Desk
            leaned harder into Koa and Kokai as decision layers, not just
            optimization knobs. Meta turned Advantage+ from a campaign type
            into a default. As of May 2026, every walled-garden and major DSP
            either has an agent in market or has one announced.
          </p>

          <p>
            Every one of those agents is biased toward the inventory the
            company that built it sells. That isn&rsquo;t a moral failing.
            It&rsquo;s a business model. Amazon&rsquo;s agent will spend more
            on Amazon. Google&rsquo;s agent will spend more on YouTube and
            Google-owned placements. TTD&rsquo;s agent will lean into
            TTD-curated supply paths. Meta&rsquo;s agent will not, under any
            condition, send a dollar to TikTok.
          </p>

          <p>
            At the same time, the holdcos are not standing still. Omnicom
            announced its agentic stack. Publicis is building inside Epsilon.
            WPP is making its third attempt at a unified intelligence layer.
            IPG, Dentsu, Havas, Stagwell &mdash; every one of them has a
            press release and a roadmap.{' '}
            <strong>
              By 2028, the majority of holdco clients will be bought by a
              holdco-owned agent.
            </strong>
          </p>

          <p>
            Twelve months ago, none of this was real in production. Agents
            were demos at IAB. Today every major buyer in the market has at
            least one in market, in beta, or shipping next quarter. That is
            the speed of the shift. Anyone telling you it&rsquo;s a
            multi-year decision is selling you on a multi-year decision.
          </p>

          <p>So where does that leave the independent agency?</p>

          <h2>The trap</h2>

          <p>Two doors. Both are bad.</p>

          <p>
            <strong>Door one:</strong> adopt the platforms&rsquo; agents. You
            become a frontend on someone else&rsquo;s biased stack. Your
            client&rsquo;s media plan is shaped by whichever platform&rsquo;s
            agent gets the most weight in your workflow. You can&rsquo;t
            honestly tell that client you&rsquo;re independent anymore
            &mdash; you&rsquo;re just the integrator.
          </p>

          <p>
            <strong>Door two:</strong> do nothing. Keep buying the way
            you&rsquo;ve bought for the last five years. You watch a holdco
            pitch your account with a five-minute demo of an agent that
            auto-builds a plan, auto-buys against it, and auto-reports on it.
            You lose the pitch on operational sophistication, not strategy.
          </p>

          <p>
            Neither door ends well for an independent agency that wants to
            still be independent in 2028.
          </p>

          <p>
            There is a third door. It is the one the holdcos and the
            platforms would prefer you don&rsquo;t notice yet.
          </p>

          <h2>The third path</h2>

          <p>
            Independents don&rsquo;t need a platform&rsquo;s agent. They need
            their own.
          </p>

          <p>
            An agent built around what makes your agency yours. Your channel
            strategies. Your definition of premium media. Your brand-safety
            rules. Your audience playbook. Your frequency and pacing logic.
            Your performance history per client.
          </p>

          <p>Codified once. Executed on every impression. Owned by you.</p>

          <p>
            This is not theoretical. The components are all here. Open
            exchanges are still open. SSPs still take direct connections.
            Curation deals are easier to set up than they&rsquo;ve ever been.
            The work that used to take a 12-person trading desk now takes an
            agent that has read your playbook and is authorized to buy
            against it, with a human on the approval line for anything that
            matters.
          </p>

          <p>
            The only thing missing has been the tool that lets a 30-person
            agency stand up that kind of agent without writing the software
            themselves. That&rsquo;s the gap we built into.
          </p>

          <h2>What this looks like in practice</h2>

          <p>
            The shift is more boring than the headlines make it sound, and
            that is the point.
          </p>

          <p>
            A senior planner sits down on Monday with a client brief. The
            agent has already ingested the agency&rsquo;s playbook: the
            channels this client has historically bought, the publishers on
            the premium list, the categories on the block list, the frequency
            caps, the dayparting, the negative-keyword themes, the segments
            the agency has built up over years. The planner doesn&rsquo;t
            re-explain any of that. The planner explains the client&rsquo;s
            quarterly goal and the budget.
          </p>

          <p>
            The agent proposes a media plan. The planner reviews, edits,
            approves. The agent buys against it across whichever exchanges
            and curation deals fit the premium definition, with rules that
            the agency wrote, not rules that the DSP shipped. The planner
            sees the next decision queue in the morning &mdash; bid changes,
            creative rotations, pacing adjustments &mdash; and approves what
            should ship.
          </p>

          <p>
            Nothing the agent does is invisible. Nothing the agent does is
            locked in by a vendor whose margin depends on it. The agency
            keeps the relationship, keeps the data, and keeps the upside.
          </p>

          <p>
            The ten-person trading desks the holdcos used to run are now
            eight-person trading desks. The thirty-person trading desks the
            holdcos used to run are now ten-person trading desks. The
            independent agency that wires this up correctly runs a similar
            plan with a planner-and-a-half and a smarter tool. That is the
            structural shift. That is the year independents catch up on
            operations and pull ahead on incentive alignment.
          </p>

          <h2>What Halliard is doing</h2>

          <p>
            Halliard is the buying agent built for independent agencies.
          </p>

          <p>
            Not a DSP. Not a holdco product. Not a retrofit of a SaaS tool
            that used to do something else. An agent that you train on your
            agency&rsquo;s playbook and point at the open market on your
            client&rsquo;s behalf.
          </p>

          <p>A few things that matter:</p>

          <ul>
            <li>
              <strong>Flat take rate.</strong> No share of media. No hidden
              curation cut. The agent is on your side because we&rsquo;re
              paid by you, not by the supply path. An early agency partner
              has been running on this model since their pilot &mdash; they
              tell the story better than we can, and more of it will be
              published later this year.
            </li>
            <li>
              <strong>Open market.</strong> No house DSP. No preferred SSP.
              The agent shops the exchanges that match your premium-media
              definition for the client in front of it.
            </li>
            <li>
              <strong>Your playbook, not ours.</strong> We don&rsquo;t tell
              you what &ldquo;premium&rdquo; means. You tell the agent. We
              give you the surface to codify it once and re-use it across
              clients.
            </li>
            <li>
              <strong>Human-in-the-loop.</strong> Every meaningful buy
              decision flows past a human. Pilots stand up in weeks, not
              quarters, and the kill switch is yours.
            </li>
          </ul>

          <p>
            We are onboarding a small pilot cohort of independent agencies
            through the back half of 2026. The cohort is small on purpose. We
            want the early agencies to shape what the agent ingests and how
            it reports, because they&rsquo;re the ones who will be running it
            for the next decade.
          </p>

          <h2>The choice</h2>

          <p>
            Every independent CEO in this country is making this decision
            right now, whether they realize it or not. The agent question is
            the next strategic-vendor question, on the scale of &ldquo;which
            DSP did you bet on in 2015.&rdquo; Get it right and your shop has
            a structural advantage going into every pitch for the next three
            years. Get it wrong, or wait too long, and your shop becomes a UI
            on someone else&rsquo;s economics.
          </p>

          <p>
            We think this is the moment independents lead. Not because they
            have to. Because they&rsquo;re the only group of agencies in the
            market whose incentives are still aligned with the client&rsquo;s.
            The holdcos have principal margin to defend. The platforms have
            inventory to sell. The independents have the client. That is the
            asset.
          </p>

          <p>The agent should reflect that.</p>
        </Article>

        <CtaSection />
        <Footer />
      </main>
    </>
  )
}

;(ManifestoPage as any).disableNavbar = true
;(ManifestoPage as any).fullWidth = true
;(ManifestoPage as any).siteBg = true

export default ManifestoPage
