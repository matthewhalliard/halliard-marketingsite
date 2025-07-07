import { Button } from '../Button'

export function SpecificNeedsStep({ formData, updateFormData, onNext, onPrev }) {
  const handleSubmit = (e) => {
    e.preventDefault()
    onNext()
  }

  // For now, we default to MMM. In production, this would be set based on referrer or query param
  const referrerType = formData.referrerType || 'mmm'

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          {referrerType === 'mmm' && 'Tell us about your MMM needs'}
          {referrerType === 'unmeasurable' && 'Which channels do you need to measure?'}
          {referrerType === 'incrementality' && 'What do you want to test?'}
        </h2>
      </div>

      {referrerType === 'mmm' && (
        <>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Do you already have an MMM? *
            </label>
            <div className="space-y-2">
              <label className="flex items-center">
                <input
                  type="radio"
                  name="hasExistingMMM"
                  value="yes"
                  className="h-4 w-4 text-[#1F3FFF] focus:ring-[#1F3FFF] border-gray-300"
                  checked={formData.mmm.hasExistingMMM === true}
                  onChange={() => updateFormData({ 
                    mmm: { ...formData.mmm, hasExistingMMM: true } 
                  })}
                />
                <span className="ml-2 text-gray-700">Yes, we have one</span>
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  name="hasExistingMMM"
                  value="no"
                  className="h-4 w-4 text-[#1F3FFF] focus:ring-[#1F3FFF] border-gray-300"
                  checked={formData.mmm.hasExistingMMM === false}
                  onChange={() => updateFormData({ 
                    mmm: { ...formData.mmm, hasExistingMMM: false } 
                  })}
                />
                <span className="ml-2 text-gray-700">No, we need one</span>
              </label>
            </div>
          </div>

          {formData.mmm.hasExistingMMM && (
            <div>
              <label htmlFor="mmmProvider" className="block text-sm font-medium text-gray-700">
                Which MMM provider?
              </label>
              <select
                id="mmmProvider"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#1F3FFF] focus:ring-[#1F3FFF] sm:text-sm px-4 py-3 border"
                value={formData.mmm.mmmProvider}
                onChange={(e) => updateFormData({ 
                  mmm: { ...formData.mmm, mmmProvider: e.target.value } 
                })}
              >
                <option value="">Select provider</option>
                <option value="neustar">Neustar</option>
                <option value="nielsen">Nielsen</option>
                <option value="google">Google (Meridian)</option>
                <option value="meta">Meta (Robyn)</option>
                <option value="custom">Custom/In-house</option>
                <option value="other">Other</option>
              </select>
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              What are your main goals? (Select all that apply)
            </label>
            {[
              { id: 'validate', label: 'Validate our current MMM' },
              { id: 'incrementality', label: 'Run incrementality tests' },
              { id: 'unmeasurable', label: 'Measure "unmeasurable" channels' },
              { id: 'optimize', label: 'Optimize budget allocation' },
              { id: 'forecast', label: 'Improve forecasting accuracy' }
            ].map(goal => (
              <label key={goal.id} className="flex items-start mb-2">
                <input
                  type="checkbox"
                  className="h-4 w-4 text-[#1F3FFF] focus:ring-[#1F3FFF] border-gray-300 rounded mt-0.5"
                  checked={formData.mmm.mmmGoals.includes(goal.id)}
                  onChange={(e) => {
                    const goals = e.target.checked
                      ? [...formData.mmm.mmmGoals, goal.id]
                      : formData.mmm.mmmGoals.filter(g => g !== goal.id)
                    updateFormData({ 
                      mmm: { ...formData.mmm, mmmGoals: goals } 
                    })
                  }}
                />
                <span className="ml-2 text-gray-700">{goal.label}</span>
              </label>
            ))}
          </div>
        </>
      )}

      {referrerType === 'unmeasurable' && (
        <>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Which "unmeasurable" channels do you want to test? *
            </label>
            {[
              { id: 'direct_mail', label: 'Direct Mail' },
              { id: 'ooh', label: 'Out of Home (Billboards, Transit, etc.)' },
              { id: 'podcasts', label: 'Podcasts' },
              { id: 'radio', label: 'Radio' },
              { id: 'cinema', label: 'Cinema/Movie Theater' },
              { id: 'influencer', label: 'Influencer Marketing' }
            ].map(channel => (
              <label key={channel.id} className="flex items-start mb-2">
                <input
                  type="checkbox"
                  className="h-4 w-4 text-[#1F3FFF] focus:ring-[#1F3FFF] border-gray-300 rounded mt-0.5"
                  checked={formData.unmeasurable.targetChannels.includes(channel.id)}
                  onChange={(e) => {
                    const channels = e.target.checked
                      ? [...formData.unmeasurable.targetChannels, channel.id]
                      : formData.unmeasurable.targetChannels.filter(c => c !== channel.id)
                    updateFormData({ 
                      unmeasurable: { ...formData.unmeasurable, targetChannels: channels } 
                    })
                  }}
                />
                <span className="ml-2 text-gray-700">{channel.label}</span>
              </label>
            ))}
          </div>

          <div>
            <label htmlFor="biggestChallenge" className="block text-sm font-medium text-gray-700">
              What's your biggest challenge with these channels?
            </label>
            <textarea
              id="biggestChallenge"
              rows={3}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#1F3FFF] focus:ring-[#1F3FFF] sm:text-sm px-4 py-3 border"
              value={formData.unmeasurable.biggestChallenge}
              onChange={(e) => updateFormData({ 
                unmeasurable: { ...formData.unmeasurable, biggestChallenge: e.target.value } 
              })}
              placeholder="e.g., Can't track conversions, no unique identifiers, delayed impact..."
            />
          </div>
        </>
      )}

      {referrerType === 'incrementality' && (
        <>
          <div>
            <label htmlFor="targetChannel" className="block text-sm font-medium text-gray-700">
              Which channel do you want to test first? *
            </label>
            <select
              id="targetChannel"
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#1F3FFF] focus:ring-[#1F3FFF] sm:text-sm px-4 py-3 border"
              value={formData.incrementality.targetChannel}
              onChange={(e) => updateFormData({ 
                incrementality: { ...formData.incrementality, targetChannel: e.target.value } 
              })}
            >
              <option value="">Select channel</option>
              <option value="facebook">Facebook</option>
              <option value="google">Google Ads</option>
              <option value="youtube">YouTube</option>
              <option value="tv">TV (Linear/CTV)</option>
              <option value="audio">Audio (Spotify/Podcasts)</option>
              <option value="ooh">Out of Home</option>
              <option value="other">Other</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Experience with incrementality testing? *
            </label>
            <div className="space-y-2">
              {[
                { value: 'none', label: "We've never run one" },
                { value: 'some', label: "We've run a few manually" },
                { value: 'regular', label: "We run them regularly" }
              ].map(option => (
                <label key={option.value} className="flex items-center">
                  <input
                    type="radio"
                    name="testExperience"
                    value={option.value}
                    className="h-4 w-4 text-[#1F3FFF] focus:ring-[#1F3FFF] border-gray-300"
                    checked={formData.incrementality.testExperience === option.value}
                    onChange={(e) => updateFormData({ 
                      incrementality: { ...formData.incrementality, testExperience: e.target.value } 
                    })}
                  />
                  <span className="ml-2 text-gray-700">{option.label}</span>
                </label>
              ))}
            </div>
          </div>

          <div>
            <label htmlFor="testGoal" className="block text-sm font-medium text-gray-700">
              What's your main goal for this test?
            </label>
            <textarea
              id="testGoal"
              rows={2}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#1F3FFF] focus:ring-[#1F3FFF] sm:text-sm px-4 py-3 border"
              value={formData.incrementality.testGoal}
              onChange={(e) => updateFormData({ 
                incrementality: { ...formData.incrementality, testGoal: e.target.value } 
              })}
              placeholder="e.g., Validate channel efficiency, justify budget increase..."
            />
          </div>
        </>
      )}

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