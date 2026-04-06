import Head from 'next/head'
import Script from 'next/script'
import { Header } from '../components/media-planning-tool/Header'
import { Hero } from '../components/media-planning-tool/Hero'
import { ProblemSection } from '../components/media-planning-tool/ProblemSection'
import { SolutionSection } from '../components/media-planning-tool/SolutionSection'
import { FeaturesSection } from '../components/media-planning-tool/FeaturesSection'
import { TestimonialsSection } from '../components/media-planning-tool/TestimonialsSection'
import { FAQSection } from '../components/media-planning-tool/FAQSection'
import { CallToAction } from '../components/media-planning-tool/CallToAction'
import { Footer } from '../components/media-planning-tool/Footer'

// Google Ads conversion tracking
function fireSignupConversion(url) {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'conversion', {
      send_to: 'AW-672346912/d-VaCIzdx-waEKDmzMAC',
      value: 100.0,
      currency: 'USD',
      event_callback: function () {
        if (typeof url !== 'undefined') {
          window.location = url
        }
      },
    })
    return false
  }
  // Fallback if gtag not loaded
  if (typeof url !== 'undefined') {
    window.location = url
  }
  return true
}

export default function MediaPlanningToolPage() {
  return (
    <>
      <Head>
        <title>Media Planning Tool for Independent Agencies | Halliard</title>
        <meta
          name="description"
          content="Plan media, track spend, and prove results in one platform. Halliard replaces your Excel flowcharts and patchwork reporting. Free to start."
        />
        <meta
          property="og:title"
          content="Media Planning Tool for Independent Agencies | Halliard"
        />
        <meta
          property="og:description"
          content="Your clients are asking 'did this work?' Stop planning in spreadsheets. Build flowcharts, track spend, and prove results — all in one platform."
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://halliardmedia.com/media-planning-tool" />
        <meta
          property="og:image"
          content="https://framerusercontent.com/images/LYy1CcqUUqNr3V5tUBdRBX8Tc.png"
        />
        <link rel="canonical" href="https://halliardmedia.com/media-planning-tool" />
      </Head>

      {/* Google Ads gtag */}
      <Script
        src="https://www.googletagmanager.com/gtag/js?id=AW-672346912"
        strategy="afterInteractive"
      />
      <Script id="mpt-gtag-init" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'AW-672346912');
        `}
      </Script>
      <Script id="mpt-conversion" strategy="afterInteractive">
        {`
          function gtag_report_conversion(url) {
            var callback = function () {
              if (typeof(url) != 'undefined') { window.location = url; }
            };
            gtag('event', 'conversion', {
              'send_to': 'AW-672346912/d-VaCIzdx-waEKDmzMAC',
              'value': 100.0,
              'currency': 'USD',
              'event_callback': callback
            });
            return false;
          }
        `}
      </Script>

      <div className="bg-site min-h-screen">
        <Header onSignupClick={fireSignupConversion} />
        <main>
          <Hero onSignupClick={fireSignupConversion} />
          <ProblemSection />
          <SolutionSection />
          <FeaturesSection />
          <TestimonialsSection />
          <FAQSection />
          <CallToAction onSignupClick={fireSignupConversion} />
        </main>
        <Footer />
      </div>
    </>
  )
}

MediaPlanningToolPage.disableNavbar = true
MediaPlanningToolPage.fullWidth = true
MediaPlanningToolPage.siteBg = true
