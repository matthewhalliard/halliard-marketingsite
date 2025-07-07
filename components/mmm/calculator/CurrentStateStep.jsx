import { Button } from '../Button'
import { ChannelSelector } from './ChannelSelector'

export function CurrentStateStep({ formData, updateFormData, onNext, onPrev }) {
  const handleSubmit = (e) => {
    e.preventDefault()
    onNext()
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Quick check on your marketing data foundations
        </h2>
        <p className="text-gray-600">
          This helps us calculate realistic test requirements based on your actual data availability
        </p>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-3">
          How many marketing channels do you currently use? *
        </label>
        <ChannelSelector
          selected={formData.selectedChannels}
          onChange={(channels) => updateFormData({ selectedChannels: channels })}
        />
      </div>

      <div>
        <label htmlFor="dataHistory" className="block text-sm font-medium text-gray-700">
          Years of historical data available *
        </label>
        <select
          id="dataHistory"
          required
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#1F3FFF] focus:ring-[#1F3FFF] sm:text-sm px-4 py-3 border"
          value={formData.dataHistory}
          onChange={(e) => updateFormData({ dataHistory: e.target.value })}
        >
          <option value="">Select time range</option>
          <option value="less-6m">Less than 6 months</option>
          <option value="6m-1y">6-12 months</option>
          <option value="1y-2y">1-2 years</option>
          <option value="2y-3y">2-3 years</option>
          <option value="over-3y">3+ years</option>
        </select>
      </div>

      <div>
        <label htmlFor="dataGranularity" className="block text-sm font-medium text-gray-700">
          Data granularity *
        </label>
        <select
          id="dataGranularity"
          required
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#1F3FFF] focus:ring-[#1F3FFF] sm:text-sm px-4 py-3 border"
          value={formData.dataGranularity}
          onChange={(e) => updateFormData({ dataGranularity: e.target.value })}
        >
          <option value="">Select granularity</option>
          <option value="daily">Daily</option>
          <option value="weekly">Weekly</option>
          <option value="monthly">Monthly</option>
        </select>
      </div>

      <div>
        <label htmlFor="measurementApproach" className="block text-sm font-medium text-gray-700">
          Current measurement approach *
        </label>
        <select
          id="measurementApproach"
          required
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#1F3FFF] focus:ring-[#1F3FFF] sm:text-sm px-4 py-3 border"
          value={formData.measurementApproach}
          onChange={(e) => updateFormData({ measurementApproach: e.target.value })}
        >
          <option value="">Select approach</option>
          <option value="last-click">Last-click attribution only</option>
          <option value="multi-touch">Multi-touch attribution</option>
          <option value="mmm">Marketing Mix Model</option>
          <option value="incrementality">Incrementality testing</option>
          <option value="mixed">Mixed/Other</option>
        </select>
      </div>

      <div className="pt-6 flex gap-4">
        <Button type="button" variant="outline" onClick={onPrev} className="flex-1">
          Back
        </Button>
        <Button type="submit" className="flex-1">
          Continue
        </Button>
      </div>
    </form>
  )
} 