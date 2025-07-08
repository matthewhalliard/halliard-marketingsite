import Head from 'next/head'
import { Header } from '../../components/incrementality-testing/Header'
import { Hero } from '../../components/incrementality-testing/Hero'
import { ProblemSection } from '../../components/incrementality-testing/ProblemSection'
import { SolutionSection } from '../../components/incrementality-testing/SolutionSection'
import { FeaturesSection } from '../../components/incrementality-testing/FeaturesSection'
import { TestimonialsSection } from '../../components/incrementality-testing/TestimonialsSection'
import { UseCasesSection } from '../../components/incrementality-testing/UseCasesSection'
import { MethodologySection } from '../../components/incrementality-testing/MethodologySection'
import { FAQSection } from '../../components/incrementality-testing/FAQSection'
import { CallToAction } from '../../components/incrementality-testing/CallToAction'

function IncrementalityTestingLanding() {
  return (
    <>
      <Head>
        <title>Incrementality Testing Software | Geo-Lift Experiments - Halliard</title>
        <meta
          name="description"
          content="Design geo-lift tests, measure true incremental impact, and stop wasting budget on correlation theater."
        />
      </Head>
      <Header />
      <main>
        <Hero />
        <ProblemSection />
        <SolutionSection />
        <FeaturesSection />
        <UseCasesSection />
        <TestimonialsSection />
        <MethodologySection />
        <FAQSection />
        <CallToAction />
      </main>
    </>
  )
}

(IncrementalityTestingLanding as any).disableNavbar = true;
(IncrementalityTestingLanding as any).fullWidth = true;
(IncrementalityTestingLanding as any).siteBg = true;

export default IncrementalityTestingLanding; 