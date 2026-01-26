'use client';

import React from 'react';
import { ResponseOption } from '@/lib/negotiation/types';
import { ResponseCard } from './ResponseCard';
import { Button } from '@/components/ui/Button';

interface ResponseOptionsProps {
  options: ResponseOption[];
  onBack: () => void;
  onShowDecisionHelper: () => void;
}

export function ResponseOptions({ options, onBack, onShowDecisionHelper }: ResponseOptionsProps) {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-text-primary mb-3">
          Your Personalized Response Options
        </h1>
        <p className="text-text-secondary text-lg max-w-2xl mx-auto">
          We've generated 3 professional email responses based on your situation. 
          Pick the one that matches your strategy, or let us help you decide.
        </p>
      </div>

      {/* Decision helper CTA */}
      <div className="bg-bg-tertiary border-2 border-brand-blue rounded-lg p-6 text-center">
        <h3 className="text-lg font-bold text-text-primary mb-2">
          Not sure which option to choose?
        </h3>
        <p className="text-text-secondary mb-4">
          Answer 3 quick questions and we'll recommend the best approach for your situation.
        </p>
        <Button variant="outline" onClick={onShowDecisionHelper}>
          Help Me Decide
        </Button>
      </div>

      {/* Response cards */}
      <div className="space-y-6">
        {options.map((option, index) => (
          <ResponseCard key={option.strategy} option={option} index={index} />
        ))}
      </div>

      {/* Pro tips */}
      <div className="bg-bg-tertiary rounded-lg p-6 border border-border-color">
        <h3 className="text-lg font-bold text-text-primary mb-3 flex items-center">
          <span className="text-2xl mr-2">💡</span>
          Pro Tips Before Sending
        </h3>
        <ul className="space-y-2 text-sm text-text-secondary">
          <li className="flex items-start">
            <span className="text-brand-yellow mr-2">→</span>
            <span>Personalize the greeting with their actual name if you have it</span>
          </li>
          <li className="flex items-start">
            <span className="text-brand-yellow mr-2">→</span>
            <span>Review placeholders like [X deliverables] and fill in specific numbers</span>
          </li>
          <li className="flex items-start">
            <span className="text-brand-yellow mr-2">→</span>
            <span>Read it out loud to make sure it sounds like you</span>
          </li>
          <li className="flex items-start">
            <span className="text-brand-yellow mr-2">→</span>
            <span>Wait a few hours before sending if you're feeling emotional</span>
          </li>
        </ul>
      </div>

      {/* Navigation */}
      <div className="flex justify-center pt-4">
        <Button variant="ghost" onClick={onBack}>
          ← Start Over
        </Button>
      </div>
    </div>
  );
}