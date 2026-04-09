import Head from 'next/head'
import Link from 'next/link'
import { Button } from '../../components/mmm/Button'
import { Container } from '../../components/mmm/Container'
import {
  ExclamationTriangleIcon,
  CurrencyDollarIcon,
  QuestionMarkCircleIcon,
} from '@heroicons/react/24/outline'


const PLUS_PATTERN = "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%231a6ab4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")"

function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/70 backdrop-blur-sm border-b border-gray-100">
      <Container className="">
        <nav className="relative flex justify-between items-center py-5">
          <Link href="/" aria-label="Home">
            <img
              src="https://framerusercontent.com/images/s97qQgHpRGf1STgb6vDMgqYNU4.png?scale-down-to=512"
              alt="Halliard"
              className="h-8 w-auto"
            />
          </Link>
          <div className="flex items-center gap-x-4">
            <Link
              href="/trytoday"
              className="hidden sm:inline text-sm text-slate-600 hover:text-slate-900"
            >
              Schedule a Demo
            </Link>
          </div>
        </nav>
      </Container>
    </header>
  )
}

function Hero() {
  return (
    <div className="relative overflow-hidden">
      <div className="absolute inset-0 opacity-[0.07]" style={{ backgroundImage: PLUS_PATTERN, backgroundSize: '18px 18px' }} />
      <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse at 50% 0%, rgba(211,228,255,0.3) 0%, rgba(255,255,255,0.95) 70%, rgb(255,255,255) 100%)' }} />
      <Container className="relative pt-32 pb-16 text-center lg:pt-40">
        <div className="mx-auto max-w-3xl">
          <p className="inline-flex items-center gap-2 rounded-full bg-tint px-4 py-1.5 text-sm font-medium text-primary mb-6">
            <span>📊</span> Measurement for independent agencies
          </p>
          <h1 className="font-display text-5xl font-medium tracking-tight text-slate-900 sm:text-6xl lg:text-7xl">
            Marketing Mix Modeling at{' '}
            <span className="relative text-primary">
              <svg
                aria-hidden="true"
                viewBox="0 0 418 42"
                className="absolute left-0 top-2/3 h-[0.58em] w-full fill-primary/30"
                preserveAspectRatio="none"
              >
                <path d="M203.371.916c-26.013-2.078-76.686 1.963-124.73 9.946L67.3 12.749C35.421 18.062 18.2 21.766 6.004 25.934 1.244 27.561.828 27.778.874 28.61c.07 1.214.828 1.121 9.595-1.176 9.072-2.377 17.15-3.92 39.246-7.496C123.565 7.986 157.869 4.492 195.942 5.046c7.461.108 19.25 1.696 19.17 2.582-.107 1.183-7.874 4.31-25.75 10.366-21.992 7.45-35.43 12.534-36.701 13.884-2.173 2.308-.202 4.407 4.442 4.734 2.654.187 3.263.157 15.593-.78 35.401-2.686 57.944-3.488 88.365-3.143 46.327.526 75.721 2.23 130.788 7.584 19.787 1.924 20.814 1.98 24.557 1.332l.066-.011c1.201-.203 1.53-1.825.399-2.335-2.911-1.31-4.893-1.604-22.048-3.261-57.509-5.556-87.871-7.36-132.059-7.842-23.239-.254-33.617-.116-50.627.674-11.629.54-42.371 2.494-46.696 2.967-2.359.259 8.133-3.625 26.504-9.81 23.239-7.825 27.934-10.149 28.304-14.005.417-4.348-3.529-6-16.878-7.066Z" />
              </svg>
              <span className="relative">1/10th the Cost</span>
            </span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg tracking-tight text-slate-700">
            Traditional MMM costs $50-250K. Halliard delivers the same insights for $25K — built for
            independent agencies, not just Fortune 500s.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row justify-center gap-4">
            <Button href="/trytoday" color="blue" className="">
              Schedule a Demo
            </Button>
          </div>

          {/* Product screenshot */}
          <div className="mx-auto mt-16 max-w-5xl">
            <div className="rounded-xl border border-tint shadow-2xl overflow-hidden">
              <img
                src="/images/product/response-curves.webp"
                alt="Halliard response curves showing diminishing returns by channel"
                className="w-full"
              />
            </div>
          </div>
        </div>
      </Container>
    </div>
  )
}

function PainSection() {
  const pains = [
    {
      Icon: ExclamationTriangleIcon,
      title: 'Platform Metrics Lie',
      description:
        'Meta reported 2,000 conversions. MMM showed zero business impact. One agency reallocated $200K to channels that actually moved the needle.',
    },
    {
      Icon: CurrencyDollarIcon,
      title: 'Too Expensive for Most Clients',
      description:
        'Only 2 out of 200+ clients use MMM (Nunn Media). Traditional providers charge $50-250K. Your mid-market clients deserve real measurement too.',
    },
    {
      Icon: QuestionMarkCircleIcon,
      title: 'Gut Feel Planning',
      description:
        'Without MMM, you\'re guessing which channels work. Response curves show you exactly where diminishing returns kick in — and where your next dollar has the most impact.',
    },
  ]

  return (
    <section className="py-16 sm:py-24 bg-white">
      <Container className="">
        <div className="mx-auto max-w-2xl text-center mb-16">
          <h2 className="font-display text-3xl tracking-tight text-slate-900 sm:text-4xl">
            You can&rsquo;t optimize what you can&rsquo;t measure
          </h2>
          <p className="mt-4 text-lg text-slate-600">
            Most agencies rely on platform metrics that double-count conversions. MMM cuts through the noise — but until now, it was only for the biggest spenders.
          </p>
        </div>
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-3">
          {pains.map((pain) => (
            <div key={pain.title} className="rounded-2xl border border-red-100 bg-red-50/50 p-8">
              <pain.Icon className="w-8 h-8 text-red-400 mb-4" />
              <h3 className="text-lg font-semibold text-slate-900 mb-2">{pain.title}</h3>
              <p className="text-slate-600">{pain.description}</p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  )
}

function FeaturesSection() {
  const features = [
    {
      title: 'Channel Response Curves',
      image: '/images/product/response-curves.webp',
      description:
        'See the diminishing returns curve for every channel. Know exactly where to increase spend and where to stop.',
    },
    {
      title: 'Measurement Dashboard',
      image: '/images/product/measurement.webp',
      description:
        'Connect Snowflake, BigQuery, or Domo. See platform metrics vs. MMM-attributed revenue side by side.',
    },
    {
      title: 'Connected to Your Plan',
      image: '/images/product/flighting.webp',
      description:
        'Your MMM results feed directly into the planning tool. Response curves appear alongside your media flowchart.',
    },
  ]

  return (
    <section className="py-16 sm:py-24 bg-slate-50">
      <Container className="">
        <div className="mx-auto max-w-2xl text-center mb-16">
          <h2 className="font-display text-3xl tracking-tight text-slate-900 sm:text-4xl">
            MMM that actually connects to your workflow
          </h2>
          <p className="mt-4 text-lg text-slate-600">
            Response curves, attribution dashboards, and planning tools — all in one platform. No more exporting CSVs between systems.
          </p>
        </div>
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          {features.map((feature) => (
            <div key={feature.title} className="rounded-2xl bg-white p-8 shadow-lg border border-tint">
              <div className="mb-6 rounded-lg border border-tint overflow-hidden shadow-sm">
                <img src={feature.image} alt={feature.title} className="w-full" />
              </div>
              <h3 className="text-xl font-semibold text-slate-900 mb-3">{feature.title}</h3>
              <p className="text-slate-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  )
}

function TestimonialSection() {
  return (
    <section className="py-16 sm:py-24 bg-white">
      <Container className="">
        <div className="mx-auto max-w-3xl">
          <div className="rounded-2xl bg-white p-8 sm:p-12 shadow-lg border border-tint">
            <div className="flex items-center gap-4 mb-8">
              <img
                src="/images/testimonials/lewis-media-logo.png"
                alt="Lewis Media Partners"
                className="h-8 w-auto"
              />
            </div>
            <blockquote className="text-xl sm:text-2xl font-medium text-slate-800 leading-relaxed">
              &ldquo;Halliard gave our planners a better way to build media plans and our clients a clearer
              picture of what their spend is doing. That&rsquo;s been really valuable for us.&rdquo;
            </blockquote>
            <div className="mt-8 flex items-center gap-4">
              <img
                src="/images/testimonials/lisa-matulis.jpg"
                alt="Lisa Matulis"
                className="w-12 h-12 rounded-full object-cover"
              />
              <div>
                <p className="text-sm font-semibold text-slate-900">Lisa Matulis</p>
                <p className="text-sm text-slate-500">Group Client Lead, Lewis Media Partners</p>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  )
}

function PricingSection() {
  return (
    <section className="py-16 sm:py-24 bg-slate-50">
      <Container className="">
        <div className="mx-auto max-w-2xl text-center mb-12">
          <h2 className="font-display text-3xl tracking-tight text-slate-900 sm:text-4xl">
            Simple, transparent pricing
          </h2>
        </div>
        <div className="mx-auto max-w-lg">
          <div className="rounded-2xl bg-white p-8 sm:p-12 shadow-lg border border-tint text-center">
            <p className="font-display text-5xl font-bold text-primary">$25,000</p>
            <p className="mt-2 text-lg font-semibold text-slate-900">per model</p>
            <div className="mt-6 border-t border-slate-100 pt-6">
              <ul className="space-y-3 text-left">
                {[
                  'Full model build & calibration',
                  'Channel response curves',
                  'Spend reallocation recommendations',
                  'Integration with Halliard planning tool',
                  'Reruns available at reduced cost',
                ].map((item) => (
                  <li key={item} className="flex items-center gap-2 text-sm text-slate-700">
                    <svg className="h-4 w-4 flex-shrink-0 text-primary" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="mt-8">
              <Button href="/trytoday" color="blue" className="w-full">
                Schedule a Demo
              </Button>
            </div>
          </div>
        </div>
      </Container>
    </section>
  )
}

function CTAFooter() {
  return (
    <section className="relative overflow-hidden bg-primary py-20">
      <div className="absolute inset-0 bg-gradient-to-br from-primary to-secondary" />
      <div className="absolute inset-0 opacity-[0.15]" style={{ backgroundImage: PLUS_PATTERN, backgroundSize: '18px 18px' }} />
      <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse at 50% 50%, rgba(255,255,255,0.08) 0%, transparent 70%)' }} />
      <Container className="relative">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="font-display text-3xl tracking-tight text-white sm:text-4xl">
            Your clients spend millions on media.
          </h2>
          <p className="mt-2 font-display text-3xl tracking-tight text-white/80 sm:text-4xl">
            Show them what it&rsquo;s actually doing.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
            <Button href="/trytoday" variant="solid" color="white" className="">
              Schedule a Demo
            </Button>
          </div>
        </div>
      </Container>
    </section>
  )
}

export default function MMMPage() {
  return (
    <>
      <Head>
        <title>Marketing Mix Modeling for Agencies | Affordable MMM | Halliard</title>
        <meta
          name="description"
          content="Marketing mix modeling at 1/10th the cost. Traditional MMM costs $50-250K — Halliard delivers the same insights for $25K. Built for independent agencies."
        />
        <meta property="og:title" content="Marketing Mix Modeling for Agencies | Affordable MMM | Halliard" />
        <meta property="og:description" content="Traditional MMM costs $50-250K. Halliard delivers the same insights for $25K — built for independent agencies, not just Fortune 500s." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://halliardmedia.com/mmm" />
        <meta property="og:image" content="/images/product/response-curves.webp" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Marketing Mix Modeling for Agencies | Affordable MMM | Halliard" />
        <meta name="twitter:description" content="Traditional MMM costs $50-250K. Halliard delivers the same insights for $25K — built for independent agencies." />
        <meta name="twitter:image" content="/images/product/response-curves.webp" />
        <link rel="canonical" href="https://halliardmedia.com/mmm" />
      </Head>
      <Header />
      <main>
        <Hero />
        <PainSection />
        <FeaturesSection />
        <TestimonialSection />
        <PricingSection />
        <CTAFooter />
      </main>
    </>
  )
}

MMMPage.disableNavbar = true
MMMPage.fullWidth = true
MMMPage.siteBg = true
