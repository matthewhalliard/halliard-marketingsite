import Head from 'next/head'
import { Header } from '../../components/mmm/Header'
import { Hero } from '../../components/mmm/Hero'
import { ProblemSection } from '../../components/mmm/ProblemSection'
import { SolutionSection } from '../../components/mmm/SolutionSection'
import { FeaturesSection } from '../../components/mmm/FeaturesSection'
import { TestimonialsSection } from '../../components/mmm/TestimonialsSection'
import { UseCasesSection } from '../../components/mmm/UseCasesSection'
import { FAQSection } from '../../components/mmm/FAQSection'
import { CallToAction } from '../../components/mmm/CallToAction'

export const disableNavbar = true;
export const fullWidth = true;

export default function MMMLandingPage() {
  return (
    <>
      <Head>
        <title>Marketing Mix Modeling Software | MMM Platform & Incrementality Testing - Halliard</title>
        <meta
          name="description"
          content="For brands and agencies. Connect your MMM or let us build one. Design geo-lift tests, see measured vs unmeasured channels, and make confident budget decisions."
        />
      </Head>
      <Header />
      <main>
        <Hero />
        <ProblemSection />
        <SolutionSection />
        <FeaturesSection />
        <TestimonialsSection />
        <UseCasesSection />
        <FAQSection />
        <CallToAction />
      </main>
    </>
  )
} 