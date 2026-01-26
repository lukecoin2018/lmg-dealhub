'use client';

import React from 'react';

interface StepIndicatorProps {
  currentStep: number;
  totalSteps: number;
}

export function StepIndicator({ currentStep, totalSteps }: StepIndicatorProps) {
  return (
    <div className="w-full mb-8">
      {/* Progress bar */}
      <div className="relative">
        <div className="overflow-hidden h-2 mb-4 text-xs flex rounded-full bg-bg-secondary">
          <div
            style={{ width: `${(currentStep / totalSteps) * 100}%` }}
            className="transition-all duration-500 ease-out flex flex-col text-center whitespace-nowrap text-white justify-center bg-brand-yellow"
          />
        </div>
      </div>

      {/* Step indicators */}
      <div className="flex justify-between">
        {Array.from({ length: totalSteps }, (_, i) => i + 1).map((step) => (
          <div key={step} className="flex flex-col items-center">
            <div
              className={`
                w-10 h-10 rounded-full flex items-center justify-center font-semibold text-sm
                transition-all duration-300
                ${
                  step < currentStep
                    ? 'bg-brand-yellow text-black'
                    : step === currentStep
                    ? 'bg-brand-yellow text-black ring-4 ring-yellow-400/30'
                    : 'bg-bg-secondary text-text-secondary border-2 border-border-color'
                }
              `}
            >
              {step < currentStep ? '✓' : step}
            </div>
            <span
              className={`
                mt-2 text-xs font-medium
                ${step === currentStep ? 'text-brand-yellow' : 'text-text-secondary'}
              `}
            >
              {getStepLabel(step)}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

function getStepLabel(step: number): string {
  switch (step) {
    case 1:
      return 'Stage';
    case 2:
      return 'Numbers';
    case 3:
      return 'Objection';
    case 4:
      return 'Flexibility';
    default:
      return '';
  }
}