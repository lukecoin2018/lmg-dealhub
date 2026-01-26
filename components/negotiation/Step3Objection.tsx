'use client';

import React from 'react';
import { ObjectionType } from '@/lib/negotiation/types';
import { Textarea } from '@/components/ui/Textarea';

interface Step3ObjectionProps {
  selected: ObjectionType | null;
  customObjection: string;
  onSelect: (objection: ObjectionType) => void;
  onCustomChange: (value: string) => void;
}

const objections: { value: ObjectionType; label: string }[] = [
  { value: 'budget-constraints', label: '"That\'s above our budget"' },
  { value: 'other-creators-cheaper', label: '"Other creators charge way less"' },
  { value: 'maximum-offer', label: '"We can only do $X maximum"' },
  { value: 'flexibility-request', label: '"Can you be flexible on price?"' },
  { value: 'exposure-offer', label: '"We\'re offering great exposure"' },
  { value: 'standard-rate', label: '"This is our standard rate, take it or leave it"' },
  { value: 'no-objection', label: 'No objection yet (responding to initial offer)' },
  { value: 'other', label: 'Other (I\'ll describe it)' }
];

export function Step3Objection({
  selected,
  customObjection,
  onSelect,
  onCustomChange
}: Step3ObjectionProps) {
  return (
    <div className="space-y-4">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-text-primary mb-2">
          What's the brand's response or objection?
        </h2>
        <p className="text-text-secondary">
          Select what they said or are likely to say.
        </p>
      </div>

      <div className="space-y-3">
        {objections.map((objection) => (
          <button
            key={objection.value}
            onClick={() => onSelect(objection.value)}
            className={`
              w-full text-left p-4 rounded-lg border-2 transition-all duration-200
              ${
                selected === objection.value
                  ? 'border-brand-pink bg-brand-pink/10'
                  : 'border-border-color bg-bg-secondary hover:border-brand-pink/50 hover:bg-bg-tertiary'
              }
            `}
          >
            <div className="flex items-center">
              <div
                className={`
                  w-5 h-5 rounded-full border-2 flex items-center justify-center mr-3 flex-shrink-0
                  ${
                    selected === objection.value
                      ? 'border-brand-pink bg-brand-pink'
                      : 'border-border-color'
                  }
                `}
              >
                {selected === objection.value && (
                  <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                  </svg>
                )}
              </div>
              <span className="font-medium text-text-primary">
                {objection.label}
              </span>
            </div>
          </button>
        ))}
      </div>

      {selected === 'other' && (
        <div className="mt-6">
          <Textarea
            label="Describe the objection or response"
            placeholder="Example: 'We love your content but our Q1 budget is locked. Can we discuss this for Q2?'"
            value={customObjection}
            onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => onCustomChange(e.target.value)}
            rows={4}
            helperText="Be specific so we can tailor the response"
          />
        </div>
      )}
    </div>
  );
}