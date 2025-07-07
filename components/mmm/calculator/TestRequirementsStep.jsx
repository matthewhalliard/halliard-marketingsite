import { Button } from '../Button'

export function TestRequirementsStep({ formData, updateFormData, onNext, onPrev }) {
  const handleSubmit = (e) => {
    e.preventDefault()
    onNext()
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Last few details for accurate calculations
        </h2>
        <p className="text-gray-600">
          This helps us provide realistic timelines and requirements
        </p>
      </div>

      <div>
        <label htmlFor="testBudget" className="block text-sm font-medium text-gray-700">
          Test budget availability *
        </label>
        <select
          id="testBudget"
          required
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#1F3FFF] focus:ring-[#1F3FFF] sm:text-sm px-4 py-3 border"
          value={formData.testBudget}
          onChange={(e) => updateFormData({ testBudget: e.target.value })}
        >
          <option value="">Select budget range</option>
          <option value="under-50k">Less than $50K</option>
          <option value="50k-100k">$50K - $100K</option>
          <option value="100k-250k">$100K - $250K</option>
          <option value="250k-500k">$250K - $500K</option>
          <option value="over-500k">$500K+</option>
        </select>
      </div>

      <div>
        <label htmlFor="testTimeline" className="block text-sm font-medium text-gray-700">
          When do you need results? *
        </label>
        <select
          id="testTimeline"
          required
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#1F3FFF] focus:ring-[#1F3FFF] sm:text-sm px-4 py-3 border"
          value={formData.testTimeline}
          onChange={(e) => updateFormData({ testTimeline: e.target.value })}
        >
          <option value="">Select timeline</option>
          <option value="asap">ASAP</option>
          <option value="1-month">Within 1 month</option>
          <option value="3-months">Within 3 months</option>
          <option value="6-months">Within 6 months</option>
          <option value="planning">Just planning ahead</option>
        </select>
      </div>

      <div>
        <label htmlFor="decisionMakers" className="block text-sm font-medium text-gray-700">
          Who needs to approve this? *
        </label>
        <select
          id="decisionMakers"
          required
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#1F3FFF] focus:ring-[#1F3FFF] sm:text-sm px-4 py-3 border"
          value={formData.decisionMakers}
          onChange={(e) => updateFormData({ decisionMakers: e.target.value })}
        >
          <option value="">Select decision level</option>
          <option value="self">I can decide</option>
          <option value="team">My team decides</option>
          <option value="director">Director level</option>
          <option value="vp">VP level</option>
          <option value="c-suite">C-Suite</option>
        </select>
      </div>

      <div>
        <label htmlFor="additionalContext" className="block text-sm font-medium text-gray-700">
          Anything else we should know? (Optional)
        </label>
        <textarea
          id="additionalContext"
          rows={3}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#1F3FFF] focus:ring-[#1F3FFF] sm:text-sm px-4 py-3 border"
          value={formData.additionalContext}
          onChange={(e) => updateFormData({ additionalContext: e.target.value })}
          placeholder="Special requirements, constraints, or context that would help us provide better recommendations..."
        />
      </div>

      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <p className="text-sm text-blue-900">
          <strong>What happens next:</strong> We'll calculate your personalized requirements and show you exactly what you need to get reliable results.
        </p>
      </div>

      <div className="pt-6 flex gap-4">
        <Button type="button" variant="outline" onClick={onPrev} className="flex-1">
          Back
        </Button>
        <Button type="submit" className="flex-1">
          Calculate My Requirements
        </Button>
      </div>
    </form>
  )
} 