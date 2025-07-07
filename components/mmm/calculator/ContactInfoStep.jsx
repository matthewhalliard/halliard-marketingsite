import { Button } from '../Button'

export function ContactInfoStep({ formData, updateFormData, onNext }) {
  const handleSubmit = (e) => {
    e.preventDefault()
    onNext()
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label htmlFor="companyName" className="block text-sm font-medium text-gray-700">
          Company Name *
        </label>
        <input
          type="text"
          id="companyName"
          required
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#1F3FFF] focus:ring-[#1F3FFF] sm:text-sm px-4 py-3 border"
          value={formData.companyName}
          onChange={(e) => updateFormData({ companyName: e.target.value })}
        />
      </div>

      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
          Work Email *
        </label>
        <input
          type="email"
          id="email"
          required
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#1F3FFF] focus:ring-[#1F3FFF] sm:text-sm px-4 py-3 border"
          value={formData.email}
          onChange={(e) => updateFormData({ email: e.target.value })}
        />
      </div>

      <div>
        <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
          Phone (Optional)
        </label>
        <input
          type="tel"
          id="phone"
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#1F3FFF] focus:ring-[#1F3FFF] sm:text-sm px-4 py-3 border"
          value={formData.phone}
          onChange={(e) => updateFormData({ phone: e.target.value })}
        />
      </div>

      <div>
        <label htmlFor="budgetRange" className="block text-sm font-medium text-gray-700">
          Annual Marketing Budget Range *
        </label>
        <select
          id="budgetRange"
          required
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#1F3FFF] focus:ring-[#1F3FFF] sm:text-sm px-4 py-3 border"
          value={formData.budgetRange}
          onChange={(e) => updateFormData({ budgetRange: e.target.value })}
        >
          <option value="">Select budget range</option>
          <option value="under-1m">Less than $1M</option>
          <option value="1m-5m">$1M - $5M</option>
          <option value="5m-10m">$5M - $10M</option>
          <option value="10m-50m">$10M - $50M</option>
          <option value="over-50m">$50M+</option>
        </select>
      </div>

      <div className="pt-6">
        <Button type="submit" className="w-full">
          Continue
        </Button>
      </div>
    </form>
  )
} 