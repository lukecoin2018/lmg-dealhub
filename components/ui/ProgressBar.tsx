interface ProgressBarProps {
    currentStep: number;
    totalSteps: number;
  }
  
  export function ProgressBar({ currentStep, totalSteps }: ProgressBarProps) {
    const progress = (currentStep / totalSteps) * 100;
  
    return (
      <div className="w-full mb-8">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm text-text-secondary">
            Step {currentStep} of {totalSteps}
          </span>
          <span className="text-sm text-brand-blue font-medium">
            {Math.round(progress)}% Complete
          </span>
        </div>
        <div className="w-full h-2 bg-bg-secondary rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-brand-yellow via-brand-pink to-brand-blue transition-all duration-300 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
    );
  }