export function ProgressIndicator({ currentStep, totalSteps }) {
  const steps = [
    'Contact Info',
    'Current State',
    'Specific Needs',
    'Test Requirements'
  ]

  return (
    <div className="w-full py-6">
      <div className="flex items-center justify-between">
        {steps.map((step, index) => {
          const stepNumber = index + 1
          const isActive = stepNumber === currentStep
          const isCompleted = stepNumber < currentStep
          
          return (
            <div key={step} className="flex items-center">
              <div className="flex flex-col items-center">
                <div
                  className={`
                    w-10 h-10 rounded-full flex items-center justify-center text-sm font-semibold
                    ${isActive ? 'bg-[#1F3FFF] text-white' : ''}
                    ${isCompleted ? 'bg-green-500 text-white' : ''}
                    ${!isActive && !isCompleted ? 'bg-gray-200 text-gray-600' : ''}
                  `}
                >
                  {isCompleted ? '✓' : stepNumber}
                </div>
                <span className="mt-2 text-xs text-gray-600 text-center max-w-[80px]">
                  {step}
                </span>
              </div>
              {index < steps.length - 1 && (
                <div
                  className={`
                    h-1 w-full mx-2 sm:w-20 md:w-32
                    ${isCompleted ? 'bg-green-500' : 'bg-gray-200'}
                  `}
                />
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
} 