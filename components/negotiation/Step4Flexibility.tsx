'use client';

import React from 'react';
import { FlexibilityLevel } from '@/lib/negotiation/types';

interface Step4FlexibilityProps {
  selected: FlexibilityLevel | null;
  onSelect: (flexibility: FlexibilityLevel) => void;
}

const flexibilityLevels: {
  value: FlexibilityLevel;
  label: string;
  description: string;
  icon: string;
}[] = [
  {
    value: 'firm',
    label: 'Stand firm',
    description: 'Won\'t go below fair rate - this is my minimum',
    icon: '🛡️'
  },
  {
    value: 'somewhat-flexible',
    label: 'Somewhat flexible',
    description: 'Could meet in middle if it closes the deal',
    icon: '🤝'
  },
  {
    value: 'very-flexible',
    label: 'Very flexible',
    description: 'Really need this deal, willing to compromise',
    icon: '🙏'
  },
  {
    value: 'unsure',
    label: 'Not sure, show me options',
    description: 'Help me decide the best approach',
    icon: '🤔'
  }
];

export function Step4Flexibility({ selected, onSelect }: Step4FlexibilityProps) {
  return (
    <div className="space-y-4">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-text-primary mb-2">
          How flexible are you on price?
        </h2>
        <p className="text-text-secondary">
          Be honest - this helps us recommend the right strategy.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {flexibilityLevels.map((level) => (
          <button
            key={level.value}
            onClick={() => onSelect(level.value)}
            className={`
              text-left p-6 rounded-lg border-2 transition-all duration-200
              ${
                selected === level.value
                  ? 'border-brand-blue bg-brand-blue/10 ring-2 ring-brand-blue/30'
                  : 'border-border-color bg-bg-secondary hover:border-brand-blue/50 hover:bg-bg-tertiary'
              }
            `}
          >
            <div className="text-4xl mb-3">{level.icon}</div>
            <div className="font-semibold text-text-primary mb-2 text-lg">
              {level.label}
            </div>
            <div className="text-sm text-text-secondary">
              {level.description}
            </div>
          </button>
        ))}
      </div>

      <div className="mt-6 p-4 bg-bg-tertiary rounded-lg border border-border-color">
        <p className="text-sm text-text-secondary">
          💡 <span className="font-medium text-text-primary">Pro tip:</span> Being honest about your flexibility helps us recommend the strategy most likely to succeed. There's no shame in being flexible when you need the work!
        </p>
      </div>
    </div>
  );
}