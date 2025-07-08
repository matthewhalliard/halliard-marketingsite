import Head from 'next/head'
import { Header } from '../../components/unmeasurable/Header'
import { Hero } from '../../components/unmeasurable/Hero'
import { ProblemSection } from '../../components/unmeasurable/ProblemSection'
import { SolutionSection } from '../../components/unmeasurable/SolutionSection'
import { FeaturesSection } from '../../components/unmeasurable/FeaturesSection'
import { ChannelBenefits } from '../../components/unmeasurable/ChannelBenefits'
import { TestimonialsSection } from '../../components/unmeasurable/TestimonialsSection'
import { FAQSection } from '../../components/unmeasurable/FAQSection'
import { CallToAction } from '../../components/unmeasurable/CallToAction'

export default function UnmeasurablePage() {
  return (
    <>
      <Head>
        <title>Measure Podcasts, CTV & OOH with Geo-Lift | Halliard</title>
        <meta
          name="description"
          content="Prove the real impact of hard-to-measure channels like podcasts and streaming TV using scientific geo-lift testing."
        />
      </Head>
      <Header />
      <main>
        <Hero />
        <ProblemSection />
        <SolutionSection />
        <FeaturesSection />
        <ChannelBenefits />
        <TestimonialsSection />
        <FAQSection />
        <CallToAction />
      </main>
    </>
  )
} 