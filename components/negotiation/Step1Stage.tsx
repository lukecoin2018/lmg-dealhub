'use client';

import React from 'react';
import { NegotiationStage } from '@/lib/negotiation/types';

interface Step1StageProps {
  selected: NegotiationStage | null;
  onSelect: (stage: NegotiationStage) => void;
}

const stages: { value: NegotiationStage; label: string; description: string }[] = [
  {
    value: 'initial-offer',
    label: 'First response to brand\'s initial offer',
    description: 'Brand reached out and you\'re responding with your rate'
  },
  {
    value: 'after-counter',
    label: 'Brand countered after my response',
    description: 'You sent your rate, they came back with a different number'
  },
  {
    value: 'objection',
    label: 'Brand raised objection/pushback',
    description: 'They\'re questioning your rate or pushing back on price'
  },
  {
    value: 'stalled',
    label: 'Negotiation is stalled',
    description: 'No response in several days, need to follow up'
  }
];

export function Step1Stage({ selected, onSelect }: Step1StageProps) {
  return (
    <div className="space-y-4">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-text-primary mb-2">
          What stage are you at?
        </h2>
        <p className="text-text-secondary">
          This helps us craft the right tone and approach for your response.
        </p>
      </div>

      <div className="space-y-3">
        {stages.map((stage) => (
          <button
            key={stage.value}
            onClick={() => onSelect(stage.value)}
            className={`
              w-full text-left p-5 rounded-lg border-2 transition-all duration-200
              ${
                selected === stage.value
                  ? 'border-brand-yellow bg-brand-yellow/10'
                  : 'border-border-color bg-bg-secondary hover:border-brand-yellow/50 hover:bg-bg-tertiary'
              }
            `}
          >
            <div className="flex items-start">
              <div
                className={`
                  w-6 h-6 rounded-full border-2 flex items-center justify-center mt-0.5 mr-4 flex-shrink-0
                  ${
                    selected === stage.value
                      ? 'border-brand-yellow bg-brand-yellow'
                      : 'border-border-color'
                  }
                `}
              >
                {selected === stage.value && (
                  <svg className="w-4 h-4 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                  </svg>
                )}
              </div>
              <div>
                <div className="font-semibold text-text-primary mb-1">
                  {stage.label}
                </div>
                <div className="text-sm text-text-secondary">
                  {stage.description}
                </div>
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}