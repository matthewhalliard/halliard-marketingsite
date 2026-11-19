import Head from 'next/head'
import Link from 'next/link'
import { LifeBuoy } from 'lucide-react'
import { Container } from '../components/mmm/Container'
import { HeroBackdrop, LandingHeader, SIGN_UP_URL } from '../components/landing/kit'

// Linked as the support URL from Halliard's listings in the ChatGPT and Claude
// directories. Keep pricing and "free" claims off this page.
const SUPPORT_EMAIL = 'support@halliardmedia.com'
const PRIVACY_EMAIL = 'privacy@halliardmedia.com'

function Hero() {
  return (
    <section className="relative">
      <HeroBackdrop />
      <Container className="relative pt-32 pb-12 text-center lg:pt-40">
        <div className="mx-auto max-w-3xl">
          <p className="inline-flex items-center gap-2 rounded-full bg-tint px-4 py-1.5 text-sm font-medium text-primary mb-6">
            <LifeBuoy className="h-4 w-4" aria-hidden />
            Help
          </p>
          <h1 className="font-display text-5xl font-medium tracking-tight text-slate-900 sm:text-6xl">
            Support
          </h1>
          <p className="mt-4 text-lg text-slate-600">
            How to reach us, disconnect Halliard from an AI assistant, or report a problem.
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

function Mail({ to }: { to: string }) {
  return <a href={`mailto:${to}`} className="text-primary underline">{to}</a>
}

function Body() {
  return (
    <section className="pb-20 sm:pb-28">
      <Container className="">
        <div className="mx-auto max-w-3xl rounded-2xl border border-tint bg-white p-6 shadow-lg shadow-primary/5 sm:p-12">
          <Section id="contact" title="Get help">
            <p>
              Email <Mail to={SUPPORT_EMAIL} />. Tell us what you were doing and what went wrong. If it happened in ChatGPT or Claude, say which one. A person on the Halliard team will reply.
            </p>
          </Section>

          <Section id="disconnect" title="Disconnect Halliard from ChatGPT or Claude">
            <p>You can disconnect at any time. Your Halliard account and plans stay in place.</p>
            <ul className="list-disc pl-6 mt-3 space-y-2">
              <li><strong>ChatGPT:</strong> open Settings, then Apps (or Plugins). Choose Halliard, then Disconnect.</li>
              <li><strong>Claude:</strong> open Settings, then Connectors. Choose Halliard, then Disconnect.</li>
            </ul>
            <p className="mt-3">
              To delete your Halliard account and its data, email <Mail to={PRIVACY_EMAIL} />.
            </p>
          </Section>

          <Section id="security" title="Report a security or privacy problem">
            <p>
              Email <Mail to={PRIVACY_EMAIL} />. Include what you found and how to reproduce it. We read every report and will confirm we received it.
            </p>
          </Section>

          <Section id="more" title="More">
            <ul className="list-disc pl-6 space-y-2">
              <li><Link href="/docs/chatgpt-claude" className="text-primary underline">Halliard in ChatGPT and Claude</Link>: what it does, how to connect, and troubleshooting.</li>
              <li><Link href="/privacy" className="text-primary underline">Privacy Policy</Link></li>
              <li><Link href="/terms" className="text-primary underline">Terms of Service</Link></li>
            </ul>
          </Section>
        </div>
      </Container>
    </section>
  )
}

function SupportPage() {
  return (
    <>
      <Head>
        <title>Support — Halliard</title>
        <meta name="description" content="Get help with Halliard, disconnect it from ChatGPT or Claude, or report a security or privacy problem." />
        <link rel="canonical" href="https://www.halliardmedia.com/support" />
      </Head>
      <LandingHeader href={SIGN_UP_URL} cta="Get started" />
      <main>
        <Hero />
        <Body />
      </main>
    </>
  )
}

Object.assign(SupportPage, { disableNavbar: true, fullWidth: true, siteBg: true })

export default SupportPage
