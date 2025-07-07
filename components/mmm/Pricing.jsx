import { Button } from './Button'
import { Container } from './Container'

export function Pricing() {
  const tiers = [
    {
      name: 'Starter',
      price: '$2,500',
      description: 'Perfect for brands testing MMM-driven optimization',
      icon: '[Icon: Rocket or startup symbol representing growth and beginning]',
      features: [
        'Up to 5 marketing channels',
        'Basic MMM integration',
        'Response curves & saturation points',
        'Monthly model updates',
        'Email support'
      ],
      cta: 'Start Free Trial'
    },
    {
      name: 'Growth',
      price: '$5,000',
      description: 'For teams running sophisticated marketing programs',
      icon: '[Icon: Growth chart or tree symbol representing scaling up]',
      features: [
        'Unlimited marketing channels',
        'Advanced MMM features',
        'Geo-lift test designer',
        'Weekly model updates',
        'Dedicated success manager',
        'Custom integrations'
      ],
      cta: 'Get Started',
      featured: true
    },
    {
      name: 'Enterprise',
      price: 'Custom',
      description: 'For large organizations with complex needs',
      icon: '[Icon: Building or enterprise symbol representing large scale]',
      features: [
        'Everything in Growth',
        'Multiple MMM models',
        'Real-time updates',
        'Advanced experimentation',
        'SLA & dedicated support',
        'Custom features'
      ],
      cta: 'Contact Sales'
    }
  ]

  return (
    <div className="bg-gray-50 py-20 sm:py-32">
      <Container>
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="font-display text-3xl tracking-tight text-slate-900 sm:text-4xl">
            Simple, Transparent Pricing
          </h2>
          <p className="mt-4 text-lg text-slate-600">
            Choose the plan that fits your MMM maturity and scale
          </p>
        </div>
        
        <div className="mx-auto mt-16 grid max-w-6xl grid-cols-1 gap-8 lg:grid-cols-3">
          {tiers.map((tier) => (
            <div
              key={tier.name}
              className={`rounded-2xl p-8 ${
                tier.featured
                  ? 'bg-blue-600 text-white shadow-xl scale-105'
                  : 'bg-white shadow-lg'
              }`}
            >
              {/* Tier Icon Placeholder */}
              <div className={`mb-6 h-16 w-16 rounded-xl border-2 border-dashed ${
                tier.featured ? 'border-blue-300 bg-blue-500' : 'border-gray-300 bg-gray-50'
              } p-3 flex items-center justify-center`}>
                <p className={`text-xs text-center ${
                  tier.featured ? 'text-blue-200' : 'text-gray-600'
                }`}>{tier.icon}</p>
              </div>
              
              <h3 className={`text-xl font-semibold ${
                tier.featured ? 'text-white' : 'text-slate-900'
              }`}>
                {tier.name}
              </h3>
              <p className={`mt-2 text-sm ${
                tier.featured ? 'text-blue-100' : 'text-slate-600'
              }`}>
                {tier.description}
              </p>
              <p className={`mt-6 flex items-baseline gap-x-1 ${
                tier.featured ? 'text-white' : 'text-slate-900'
              }`}>
                <span className="text-4xl font-bold">{tier.price}</span>
                {tier.price !== 'Custom' && <span className="text-sm">/month</span>}
              </p>
              
              <ul className="mt-8 space-y-3">
                {tier.features.map((feature) => (
                  <li key={feature} className="flex items-start">
                    <svg
                      className={`mr-3 h-5 w-5 flex-shrink-0 ${
                        tier.featured ? 'text-blue-200' : 'text-green-500'
                      }`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    <span className={`text-sm ${
                      tier.featured ? 'text-blue-100' : 'text-slate-600'
                    }`}>
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>
              
              <Button
                href="/demo"
                variant={tier.featured ? 'solid' : 'outline'}
                className={`mt-8 w-full ${
                  tier.featured
                    ? 'bg-white text-blue-600 hover:bg-gray-100'
                    : ''
                }`}
              >
                {tier.cta}
              </Button>
            </div>
          ))}
        </div>
        
        {/* Trust badges */}
        <div className="mt-16 border-t border-gray-200 pt-16">
          <div className="mx-auto max-w-4xl text-center">
            <p className="text-sm font-semibold text-slate-600 mb-8">
              Your data is secure with enterprise-grade protection
            </p>
            <div className="flex justify-center gap-8">
              {['SOC 2 Type II', 'GDPR Compliant', 'CCPA Compliant'].map((badge) => (
                <div key={badge} className="h-16 w-32 rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 p-3 flex items-center justify-center">
                  <p className="text-xs text-gray-600">[Badge: {badge}]</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </div>
  )
} 