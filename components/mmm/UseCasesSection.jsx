import { Container } from './Container'

export function UseCasesSection() {
  const useCases = {
    brands: [
      {
        title: "In-House Teams Without Data Scientists",
        description: "Take control of your measurement without hiring a data science team:",
        features: [
          "Historical data ingestion from all your platforms",
          "Custom MMM development by our experts",
          "Monthly model refreshes included",
          "Full transparency into methodology"
        ]
      },
      {
        title: "Brands Working With Agencies",
        description: "Validate your agency's recommendations with confidence:",
        features: [
          "Independent measurement verification",
          "Side-by-side comparison of platform vs incremental metrics",
          "Test agency strategies before full rollout",
          "Unified dashboard for all stakeholders"
        ]
      },
      {
        title: "Multi-Brand Enterprises",
        description: "Manage measurement across your portfolio:",
        features: [
          "Sub-brand switching and comparison",
          "Consolidated reporting across brands",
          "Shared learnings from incrementality tests",
          "Enterprise-grade data security"
        ]
      }
    ],
    agencies: [
      {
        title: "Agencies Without Data Scientists",
        description: "Compete with the big shops:",
        features: [
          "Build custom MMMs for any client",
          "White label the entire platform",
          "Win pitches with sophisticated measurement"
        ]
      },
      {
        title: "Agencies With Existing MMMs",
        description: "Enhance your current capabilities:",
        features: [
          "One-click integration via CSV or API",
          "Layer on incrementality testing",
          "Prove your strategies work"
        ]
      },
      {
        title: "For New Business Pitches",
        description: "Win more clients with data:",
        features: [
          "Show measurement confidence for every channel",
          "Design test roadmaps for unproven channels",
          "Demonstrate clear KPI trade-offs"
        ]
      }
    ]
  }

  return (
    <section
      id="use-cases"
      aria-label="Use cases"
      className="pt-20 pb-14 sm:pt-32 sm:pb-20 lg:pb-32 bg-gray-50"
    >
      <Container>
        <div className="mx-auto max-w-2xl md:text-center">
          <h2 className="font-display text-3xl tracking-tight text-[#1F1F1F] sm:text-4xl">
            Built for How You Work
          </h2>
        </div>

        <div className="mt-16">
          {/* For Brands */}
          <div className="mb-16">
            <h3 className="text-2xl font-bold text-[#1F1F1F] mb-8 text-center">For Brands</h3>
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-3">
              {useCases.brands.map((useCase, index) => (
                <div key={index} className="rounded-2xl bg-white p-8 shadow-lg">
                  <h4 className="text-lg font-semibold text-[#1F1F1F] mb-2">{useCase.title}</h4>
                  <p className="text-sm text-[#4B4B4B] mb-4">{useCase.description}</p>
                  <ul className="space-y-2">
                    {useCase.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-start">
                        <svg className="h-5 w-5 text-[#1F3FFF] mr-2 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                        </svg>
                        <span className="text-sm text-[#4B4B4B]">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          {/* For Agencies */}
          <div>
            <h3 className="text-2xl font-bold text-[#1F1F1F] mb-8 text-center">For Agencies</h3>
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-3">
              {useCases.agencies.map((useCase, index) => (
                <div key={index} className="rounded-2xl bg-white p-8 shadow-lg">
                  <h4 className="text-lg font-semibold text-[#1F1F1F] mb-2">{useCase.title}</h4>
                  <p className="text-sm text-[#4B4B4B] mb-4">{useCase.description}</p>
                  <ul className="space-y-2">
                    {useCase.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-start">
                        <svg className="h-5 w-5 text-[#1F3FFF] mr-2 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                        </svg>
                        <span className="text-sm text-[#4B4B4B]">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </section>
  )
} 