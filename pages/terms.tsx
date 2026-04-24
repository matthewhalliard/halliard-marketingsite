import Head from 'next/head'
import Link from 'next/link'
import { Container } from '../components/mmm/Container'

const EFFECTIVE_DATE = 'April 24, 2026'
const CONTACT_EMAIL = 'legal@halliardmedia.com'

function Hero() {
  return (
    <div className="relative overflow-hidden bg-white">
      <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse at 50% 0%, rgba(211,228,255,0.3) 0%, rgba(255,255,255,0.95) 70%, rgb(255,255,255) 100%)' }} />
      <Container className="relative pt-32 pb-12 text-center lg:pt-40">
        <div className="mx-auto max-w-3xl">
          <p className="inline-flex items-center gap-2 rounded-full bg-tint px-4 py-1.5 text-sm font-medium text-primary mb-6">
            <span>📜</span> Legal
          </p>
          <h1 className="font-display text-5xl font-medium tracking-tight text-slate-900 sm:text-6xl">
            Terms of Service
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
            These Terms of Service ("Terms") govern your access to and use of the websites, applications, and services provided by Halliard Media, LLC ("Halliard", "we", "us", or "our"), including <a href="https://halliardmedia.com" className="text-primary underline">halliardmedia.com</a> and <a href="https://app.halliardmedia.com" className="text-primary underline">app.halliardmedia.com</a> (collectively, the "Services"). By accessing or using the Services, you agree to be bound by these Terms.
          </p>

          <Section title="1. Your Account">
            <p>
              You must be at least 16 years old and able to form a binding contract to use the Services. You are responsible for maintaining the confidentiality of your account credentials and for all activity under your account. Notify us immediately at <a href={`mailto:${CONTACT_EMAIL}`} className="text-primary underline">{CONTACT_EMAIL}</a> of any unauthorized use.
            </p>
          </Section>

          <Section title="2. Acceptable Use">
            <p>When using the Services, you agree not to:</p>
            <ul className="list-disc pl-6 mt-3 space-y-2">
              <li>Violate any applicable law or regulation.</li>
              <li>Infringe the intellectual property or privacy rights of others.</li>
              <li>Upload malware, viruses, or harmful code.</li>
              <li>Attempt to gain unauthorized access to the Services, other accounts, or our infrastructure.</li>
              <li>Reverse-engineer, decompile, or scrape the Services except as permitted by law.</li>
              <li>Use the Services to send spam or unlawful commercial communications.</li>
              <li>Interfere with or disrupt the integrity or performance of the Services.</li>
            </ul>
          </Section>

          <Section title="3. Your Content">
            <p>
              You retain ownership of all data, plans, budgets, brand materials, measurement data, and other content you upload or create using the Services ("Your Content"). You grant Halliard a worldwide, non-exclusive, royalty-free license to host, process, display, and transmit Your Content solely as needed to provide the Services and to improve them (including training aggregated, de-identified models on usage patterns, never on identifiable content).
            </p>
            <p className="mt-3">
              You represent and warrant that you have all necessary rights to Your Content and that it does not violate any third-party rights or applicable law.
            </p>
          </Section>

          <Section title="4. Our Content and Intellectual Property">
            <p>
              The Services, including all software, designs, text, graphics, and the Halliard name and logos, are owned by Halliard or our licensors and are protected by intellectual property laws. We grant you a limited, non-exclusive, non-transferable, revocable license to access and use the Services in accordance with these Terms.
            </p>
          </Section>

          <Section title="5. Plans, Fees, and Billing">
            <p>
              Some features are free; others require a paid subscription or engagement fee. Fees are described on our <Link href="/pricing" className="text-primary underline">pricing page</Link> or in a signed order form. Unless otherwise stated:
            </p>
            <ul className="list-disc pl-6 mt-3 space-y-2">
              <li>Subscription fees are billed in advance on a monthly or annual basis.</li>
              <li>Fees are non-refundable except where required by law.</li>
              <li>You authorize us (or our payment processor) to charge the payment method on file for all applicable fees.</li>
              <li>We may change fees on 30 days' notice; changes take effect at the start of your next billing cycle.</li>
            </ul>
          </Section>

          <Section title="6. Cancellation and Termination">
            <p>
              You may cancel your paid subscription at any time. Access to paid features continues through the end of the current billing period. We may suspend or terminate your account if you breach these Terms, fail to pay fees, or create risk or legal exposure for Halliard. On termination, you may export Your Content for 30 days, after which we may delete it.
            </p>
          </Section>

          <Section title="7. Measurement and Advisory Services">
            <p>
              Measurement services (including Marketing Mix Modeling, Brand Lift studies, and Incrementality testing) are provided on a per-engagement basis as described in a signed statement of work. Deliverables are informational and do not constitute legal, financial, or investment advice. Actual campaign performance depends on factors outside Halliard's control.
            </p>
          </Section>

          <Section title="8. Third-Party Services">
            <p>
              The Services integrate with third-party platforms (including Google, Meta, Snowflake, BigQuery, Domo, and others). Your use of those platforms is governed by their own terms. Halliard is not responsible for third-party services, including their availability, accuracy, or security.
            </p>
          </Section>

          <Section title="9. Disclaimers">
            <p>
              THE SERVICES ARE PROVIDED "AS IS" AND "AS AVAILABLE" WITHOUT WARRANTIES OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, AND NON-INFRINGEMENT. HALLIARD DOES NOT WARRANT THAT THE SERVICES WILL BE UNINTERRUPTED, ERROR-FREE, OR SECURE, OR THAT ANY FORECAST, ATTRIBUTION, OR MEASUREMENT OUTPUT WILL BE ACCURATE.
            </p>
          </Section>

          <Section title="10. Limitation of Liability">
            <p>
              TO THE MAXIMUM EXTENT PERMITTED BY LAW, HALLIARD AND ITS AFFILIATES WILL NOT BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES, OR ANY LOSS OF PROFITS, REVENUE, DATA, OR GOODWILL, ARISING FROM OR RELATED TO THE SERVICES. OUR TOTAL LIABILITY FOR ANY CLAIM ARISING FROM OR RELATED TO THE SERVICES WILL NOT EXCEED THE AMOUNTS YOU PAID TO HALLIARD IN THE 12 MONTHS PRECEDING THE EVENT GIVING RISE TO THE CLAIM (OR $100, IF GREATER).
            </p>
          </Section>

          <Section title="11. Indemnification">
            <p>
              You agree to indemnify, defend, and hold harmless Halliard and its affiliates from any third-party claim, damage, or expense (including reasonable attorneys' fees) arising from your use of the Services, Your Content, or your breach of these Terms.
            </p>
          </Section>

          <Section title="12. Governing Law and Disputes">
            <p>
              These Terms are governed by the laws of the State of Delaware, without regard to its conflict-of-laws rules. Any dispute arising from or relating to these Terms or the Services will be resolved exclusively in the state or federal courts located in Delaware, and you consent to the personal jurisdiction of those courts.
            </p>
          </Section>

          <Section title="13. Changes to These Terms">
            <p>
              We may update these Terms from time to time. Material changes will be announced on this page with an updated effective date, and for significant changes we will notify account holders by email. Continued use of the Services after changes take effect constitutes acceptance.
            </p>
          </Section>

          <Section title="14. Contact">
            <p>
              Questions about these Terms? Contact <a href={`mailto:${CONTACT_EMAIL}`} className="text-primary underline">{CONTACT_EMAIL}</a>.
            </p>
            <p className="mt-3 text-sm text-slate-600">
              Halliard Media, LLC<br />
              Hoboken, NJ, USA
            </p>
          </Section>

          <p className="mt-12 text-sm text-slate-500">
            See also our <Link href="/privacy" className="text-primary underline">Privacy Policy</Link>.
          </p>
        </div>
      </Container>
    </section>
  )
}

export default function TermsPage() {
  return (
    <>
      <Head>
        <title>Terms of Service — Halliard</title>
        <meta name="description" content="The terms and conditions that govern your use of Halliard." />
      </Head>
      <main>
        <Hero />
        <Body />
      </main>
    </>
  )
}
