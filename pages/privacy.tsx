import Head from 'next/head'
import Link from 'next/link'
import { Container } from '../components/mmm/Container'

const EFFECTIVE_DATE = 'April 24, 2026'
const CONTACT_EMAIL = 'privacy@halliardmedia.com'

function Hero() {
  return (
    <div className="relative overflow-hidden bg-white">
      <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse at 50% 0%, rgba(211,228,255,0.3) 0%, rgba(255,255,255,0.95) 70%, rgb(255,255,255) 100%)' }} />
      <Container className="relative pt-32 pb-12 text-center lg:pt-40">
        <div className="mx-auto max-w-3xl">
          <p className="inline-flex items-center gap-2 rounded-full bg-tint px-4 py-1.5 text-sm font-medium text-primary mb-6">
            <span>🔒</span> Legal
          </p>
          <h1 className="font-display text-5xl font-medium tracking-tight text-slate-900 sm:text-6xl">
            Privacy Policy
          </h1>
          <p className="mt-4 text-sm text-slate-500">
            Effective {EFFECTIVE_DATE}
          </p>
        </div>
      </Container>
    </div>
  )
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mt-10">
      <h2 className="font-display text-2xl font-medium text-slate-900 mb-3">{title}</h2>
      <div className="prose prose-slate max-w-none text-slate-700 leading-relaxed">
        {children}
      </div>
    </section>
  )
}

function Body() {
  return (
    <section className="py-16 bg-white">
      <Container className="">
        <div className="mx-auto max-w-3xl">
          <p className="text-slate-700 leading-relaxed">
            Halliard Media, LLC ("Halliard", "we", "us", or "our") operates <a href="https://halliardmedia.com" className="text-primary underline">halliardmedia.com</a>, <a href="https://app.halliardmedia.com" className="text-primary underline">app.halliardmedia.com</a>, and related services (the "Services"). This Privacy Policy explains what information we collect, how we use it, and your choices.
          </p>

          <Section title="1. Information We Collect">
            <p>We collect the following categories of information:</p>
            <ul className="list-disc pl-6 mt-3 space-y-2">
              <li><strong>Account information</strong> — name, email, company, job title, and password (handled via our authentication provider, Clerk).</li>
              <li><strong>Plan & campaign content</strong> — media plans, budgets, scenarios, brand information, and measurement data you create or upload into the platform.</li>
              <li><strong>Usage data</strong> — pages visited, features used, clicks, session duration, referrer, browser, device, and IP address. Collected via PostHog and standard web logs.</li>
              <li><strong>Marketing attribution</strong> — UTM parameters, Google click IDs (gclid), and ad-platform identifiers when you arrive from a paid campaign.</li>
              <li><strong>Communications</strong> — emails, messages, and meeting notes you exchange with us, including any feedback or support requests.</li>
              <li><strong>Cookies & similar technologies</strong> — used for authentication, analytics, and marketing attribution. See Section 6.</li>
            </ul>
          </Section>

          <Section title="2. How We Use Information">
            <p>We use the information we collect to:</p>
            <ul className="list-disc pl-6 mt-3 space-y-2">
              <li>Provide, operate, and improve the Services.</li>
              <li>Authenticate users and secure accounts.</li>
              <li>Process media plans, scenarios, and measurement data on your behalf.</li>
              <li>Send transactional emails (account, billing, security) and, where permitted, product and marketing communications.</li>
              <li>Analyze usage, diagnose issues, and improve the product.</li>
              <li>Measure and optimize marketing campaigns (including paid search and paid social attribution).</li>
              <li>Comply with legal obligations and enforce our Terms of Service.</li>
            </ul>
          </Section>

          <Section title="3. How We Share Information">
            <p>We do not sell your personal information. We share information with:</p>
            <ul className="list-disc pl-6 mt-3 space-y-2">
              <li><strong>Service providers</strong> — including Clerk (authentication), Vercel (hosting), PostHog (product analytics), Resend (transactional email), Stripe (billing), Google Workspace (email/calendar), and Anthropic / OpenAI (AI features). These providers process data only under contract and on our instructions.</li>
              <li><strong>Advertising partners</strong> — aggregated or hashed identifiers may be shared with Meta, Google, and other ad platforms to measure and optimize campaigns.</li>
              <li><strong>Legal and safety</strong> — when required by law, legal process, or to protect the rights, property, or safety of Halliard, our users, or the public.</li>
              <li><strong>Business transfers</strong> — in connection with a merger, acquisition, financing, or sale of assets, subject to standard confidentiality protections.</li>
            </ul>
          </Section>

          <Section title="4. Data Retention">
            <p>
              We retain account and plan data for as long as your account is active, and for a reasonable period afterward to meet legal, tax, and audit obligations. You can request deletion of your account at any time by emailing <a href={`mailto:${CONTACT_EMAIL}`} className="text-primary underline">{CONTACT_EMAIL}</a>. Backup copies may persist for up to 90 days after deletion.
            </p>
          </Section>

          <Section title="5. Security">
            <p>
              We use industry-standard security practices including TLS in transit, encryption at rest for sensitive fields, access controls, and least-privilege internal access. No system is 100% secure; if you believe your account has been compromised, contact us immediately.
            </p>
          </Section>

          <Section title="6. Cookies and Tracking">
            <p>
              We use first-party and third-party cookies for authentication, analytics, and advertising. Specifically:
            </p>
            <ul className="list-disc pl-6 mt-3 space-y-2">
              <li><strong>Essential</strong> — session and CSRF cookies set by Clerk and our app.</li>
              <li><strong>Analytics</strong> — PostHog for product usage analytics.</li>
              <li><strong>Marketing</strong> — Meta Pixel, Google Ads conversion tracking, and LinkedIn Insight Tag where enabled.</li>
            </ul>
            <p className="mt-3">
              You can control cookies through your browser settings. Disabling essential cookies will prevent the Services from working.
            </p>
          </Section>

          <Section title="7. Your Rights">
            <p>
              Depending on your location, you may have rights to access, correct, delete, port, or restrict processing of your personal information. California residents have rights under the CCPA/CPRA, and EU/UK residents have rights under the GDPR/UK GDPR. To exercise these rights, email <a href={`mailto:${CONTACT_EMAIL}`} className="text-primary underline">{CONTACT_EMAIL}</a>. We will respond within the legally required timeframe.
            </p>
          </Section>

          <Section title="8. International Data Transfers">
            <p>
              Halliard is based in the United States, and your information will be processed in the U.S. If you access the Services from outside the U.S., you consent to this transfer. Where required, we use standard contractual clauses or other lawful transfer mechanisms.
            </p>
          </Section>

          <Section title="9. Children's Privacy">
            <p>
              The Services are not directed to children under 16. We do not knowingly collect personal information from children under 16. If you believe we have, contact us and we will delete it.
            </p>
          </Section>

          <Section title="10. Changes to This Policy">
            <p>
              We may update this Privacy Policy from time to time. Material changes will be announced on this page with an updated effective date, and for significant changes we will notify account holders by email.
            </p>
          </Section>

          <Section title="11. Contact Us">
            <p>
              Questions or requests? Contact us at <a href={`mailto:${CONTACT_EMAIL}`} className="text-primary underline">{CONTACT_EMAIL}</a>.
            </p>
            <p className="mt-3 text-sm text-slate-600">
              Halliard Media, LLC<br />
              Hoboken, NJ, USA
            </p>
          </Section>

          <p className="mt-12 text-sm text-slate-500">
            See also our <Link href="/terms" className="text-primary underline">Terms of Service</Link>.
          </p>
        </div>
      </Container>
    </section>
  )
}

export default function PrivacyPage() {
  return (
    <>
      <Head>
        <title>Privacy Policy — Halliard</title>
        <meta name="description" content="How Halliard collects, uses, and protects your information." />
      </Head>
      <main>
        <Hero />
        <Body />
      </main>
    </>
  )
}
