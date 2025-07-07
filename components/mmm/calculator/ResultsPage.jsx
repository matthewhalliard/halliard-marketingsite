import { Button } from '../Button'
import { Container } from '../Container'
import { CheckCircleIcon, ExclamationTriangleIcon, InformationCircleIcon } from '@heroicons/react/24/solid'

export function ResultsPage({ formData }) {
  // Calculate feasibility score based on form data
  const calculateFeasibilityScore = () => {
    let score = 0
    
    // Data history scoring
    if (formData.dataHistory === 'over-3y') score += 25
    else if (formData.dataHistory === '2y-3y') score += 20
    else if (formData.dataHistory === '1y-2y') score += 15
    else if (formData.dataHistory === '6m-1y') score += 10
    else score += 5
    
    // Channel diversity
    const channelCount = formData.selectedChannels.length
    if (channelCount >= 10) score += 25
    else if (channelCount >= 7) score += 20
    else if (channelCount >= 5) score += 15
    else score += 10
    
    // Data granularity
    if (formData.dataGranularity === 'daily') score += 25
    else if (formData.dataGranularity === 'weekly') score += 20
    else score += 10
    
    // Current measurement approach
    if (formData.measurementApproach === 'mmm' || formData.measurementApproach === 'incrementality') score += 25
    else if (formData.measurementApproach === 'multi-touch') score += 20
    else score += 10
    
    return Math.min(100, score)
  }

  const score = calculateFeasibilityScore()
  const isReady = score >= 70

  // Generate recommendations based on the score and inputs
  const getRecommendations = () => {
    const recs = []
    
    if (formData.dataHistory === 'less-6m' || formData.dataHistory === '6m-1y') {
      recs.push({
        type: 'warning',
        title: 'Limited Historical Data',
        description: 'You\'ll need at least 12 months of data for reliable MMM results. We can help with interim solutions.'
      })
    }
    
    if (formData.selectedChannels.length < 5) {
      recs.push({
        type: 'warning',
        title: 'Low Channel Diversity',
        description: 'More channels provide better statistical power. Consider expanding your channel mix.'
      })
    }
    
    if (formData.dataGranularity === 'monthly') {
      recs.push({
        type: 'info',
        title: 'Data Granularity',
        description: 'Weekly or daily data provides more accurate results. We can work with monthly but recommend increasing frequency.'
      })
    }
    
    if (score >= 70) {
      recs.push({
        type: 'success',
        title: 'You\'re Ready!',
        description: 'Your data foundations are strong enough for reliable marketing measurement.'
      })
    }
    
    return recs
  }

  const recommendations = getRecommendations()

  // Generate test requirements
  const getTestRequirements = () => {
    const budget = formData.testBudget
    const timeline = formData.testTimeline
    
    let minBudget = '$50K'
    let recBudget = '$100K'
    let duration = '4-6 weeks'
    
    if (formData.referrerType === 'incrementality') {
      minBudget = '$75K'
      recBudget = '$150K'
      duration = '6-8 weeks'
    } else if (formData.referrerType === 'unmeasurable') {
      minBudget = '$100K'
      recBudget = '$200K'
      duration = '8-12 weeks'
    }
    
    return { minBudget, recBudget, duration }
  }

  const testReqs = getTestRequirements()

  return (
    <div className="bg-white">
      <Container>
        <div className="mx-auto max-w-4xl">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
              Your Marketing Measurement Requirements
            </h1>
            <p className="mt-4 text-lg text-gray-600">
              Here's exactly what you need to get reliable results — no BS, just data
            </p>
          </div>

          {/* Feasibility Score */}
          <div className="bg-gray-50 rounded-2xl p-8 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Your Measurement Readiness Score
            </h2>
            <div className="mb-6">
              <div className="flex items-center justify-between mb-2">
                <span className="text-3xl font-bold text-gray-900">{score}/100</span>
                <span className={`text-lg font-medium ${isReady ? 'text-green-600' : 'text-yellow-600'}`}>
                  {isReady ? 'Ready to roll' : 'Some prep needed'}
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-4">
                <div 
                  className={`h-4 rounded-full ${score >= 80 ? 'bg-green-500' : score >= 60 ? 'bg-yellow-500' : 'bg-red-500'}`}
                  style={{ width: `${score}%` }}
                />
              </div>
            </div>
            
            {/* Score breakdown */}
            <div className="grid grid-cols-2 gap-4 mt-6">
              <div className="flex items-center">
                <CheckCircleIcon className="h-5 w-5 text-green-500 mr-2" />
                <span className="text-sm text-gray-700">
                  {formData.dataHistory === 'over-3y' ? '3+ years' : formData.dataHistory.replace('-', ' to ')} of data
                </span>
              </div>
              <div className="flex items-center">
                <CheckCircleIcon className="h-5 w-5 text-green-500 mr-2" />
                <span className="text-sm text-gray-700">
                  {formData.selectedChannels.length} marketing channels
                </span>
              </div>
              <div className="flex items-center">
                {formData.dataGranularity === 'daily' ? (
                  <CheckCircleIcon className="h-5 w-5 text-green-500 mr-2" />
                ) : (
                  <ExclamationTriangleIcon className="h-5 w-5 text-yellow-500 mr-2" />
                )}
                <span className="text-sm text-gray-700">
                  {formData.dataGranularity} data granularity
                </span>
              </div>
              <div className="flex items-center">
                <CheckCircleIcon className="h-5 w-5 text-green-500 mr-2" />
                <span className="text-sm text-gray-700">
                  {formData.measurementApproach.replace('-', ' ')} measurement
                </span>
              </div>
            </div>
          </div>

          {/* Recommendations */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Key Recommendations
            </h2>
            <div className="space-y-4">
              {recommendations.map((rec, index) => (
                <div 
                  key={index}
                  className={`rounded-lg p-4 border ${
                    rec.type === 'success' ? 'bg-green-50 border-green-200' :
                    rec.type === 'warning' ? 'bg-yellow-50 border-yellow-200' :
                    'bg-blue-50 border-blue-200'
                  }`}
                >
                  <div className="flex">
                    {rec.type === 'success' && <CheckCircleIcon className="h-5 w-5 text-green-600 mt-0.5 mr-3" />}
                    {rec.type === 'warning' && <ExclamationTriangleIcon className="h-5 w-5 text-yellow-600 mt-0.5 mr-3" />}
                    {rec.type === 'info' && <InformationCircleIcon className="h-5 w-5 text-blue-600 mt-0.5 mr-3" />}
                    <div>
                      <h3 className="font-semibold text-gray-900">{rec.title}</h3>
                      <p className="text-sm text-gray-700 mt-1">{rec.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Test Requirements */}
          <div className="bg-[#1F3FFF] text-white rounded-2xl p-8 mb-8">
            <h2 className="text-2xl font-bold mb-6">
              Your Personalized Test Requirements
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white/10 rounded-lg p-4">
                <p className="text-sm text-white/80 mb-1">Minimum Budget</p>
                <p className="text-2xl font-bold">{testReqs.minBudget}</p>
              </div>
              <div className="bg-white/10 rounded-lg p-4">
                <p className="text-sm text-white/80 mb-1">Recommended Budget</p>
                <p className="text-2xl font-bold">{testReqs.recBudget}</p>
              </div>
              <div className="bg-white/10 rounded-lg p-4">
                <p className="text-sm text-white/80 mb-1">Test Duration</p>
                <p className="text-2xl font-bold">{testReqs.duration}</p>
              </div>
            </div>
          </div>

          {/* Next Steps CTA */}
          <div className="bg-gray-50 rounded-2xl p-8 text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Ready to Get Started?
            </h2>
            <p className="text-lg text-gray-600 mb-6">
              Let's discuss your specific requirements and build a custom measurement plan that actually works.
            </p>
            
            <div className="space-y-4">
              <Button
                href="https://calendly.com/your-link"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto"
              >
                Schedule Your Strategy Session
              </Button>
              
              <p className="text-sm text-gray-500">
                30-minute call • No sales pitch • Just honest advice
              </p>
            </div>
            
            <div className="mt-8 pt-8 border-t border-gray-200">
              <p className="text-sm text-gray-600 mb-4">
                Prefer to explore on your own first?
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  href="/demo"
                  variant="outline"
                  color="slate"
                  className="w-full sm:w-auto"
                >
                  Watch Product Demo
                </Button>
                <Button
                  href="/case-studies"
                  variant="outline"
                  color="slate"
                  className="w-full sm:w-auto"
                >
                  Read Case Studies
                </Button>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </div>
  )
} 