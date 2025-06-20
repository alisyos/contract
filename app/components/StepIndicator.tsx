'use client'

interface Step {
  id: number
  title: string
  component: string
}

interface StepIndicatorProps {
  steps: Step[]
  currentStep: number
}

export default function StepIndicator({ steps, currentStep }: StepIndicatorProps) {
  return (
    <div className="mb-6">
      <div className="flex items-center justify-center space-x-4">
        {steps.map((step, index) => (
          <div key={step.id} className="flex items-center">
            <div
              className={`step-indicator ${
                step.id < currentStep
                  ? 'step-completed'
                  : step.id === currentStep
                  ? 'step-active'
                  : 'step-pending'
              }`}
            >
              {step.id < currentStep ? (
                <span className="text-sm">✓</span>
              ) : (
                step.id
              )}
            </div>
            {index < steps.length - 1 && (
              <div
                className={`w-8 h-0.5 ml-4 ${
                  step.id < currentStep ? 'bg-green-500' : 'bg-gray-200'
                }`}
              />
            )}
          </div>
        ))}
      </div>
      <div className="mt-4">
        <div className="flex items-center space-x-3">
          <span className="bg-blue-600 text-white px-3 py-1 rounded text-sm font-medium">
            {currentStep}단계
          </span>
          <h3 className="text-lg font-semibold text-gray-900">
            {steps[currentStep - 1]?.title.replace(/^\d+단계\s/, '')}
          </h3>
        </div>
      </div>
    </div>
  )
} 