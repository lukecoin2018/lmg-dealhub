'use client';

import React, { useState } from 'react';
import { ResponseOption } from '@/lib/negotiation/types';
import { CopyButton } from './CopyButton';

interface ResponseCardProps {
  option: ResponseOption;
  index: number;
}

export function ResponseCard({ option, index }: ResponseCardProps) {
  const [showFullEmail, setShowFullEmail] = useState(false);

  const strategyColors = {
    firm: 'border-brand-yellow',
    scope: 'border-brand-blue',
    compromise: 'border-brand-pink'
  };

  const strategyBgColors = {
    firm: 'bg-brand-yellow/10',
    scope: 'bg-brand-blue/10',
    compromise: 'bg-brand-pink/10'
  };

  const fullEmail = `Subject: ${option.email.subject}\n\n${option.email.body}`;

  return (
    <div className={`bg-bg-secondary rounded-lg border-2 ${strategyColors[option.strategy]} p-6 space-y-4`}>
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <h3 className="text-xl font-bold text-text-primary mb-1">
            {option.title}
          </h3>
          <p className="text-text-secondary text-sm">
            {option.subtitle}
          </p>
        </div>
        <div className={`px-3 py-1 rounded-full text-xs font-bold ${strategyBgColors[option.strategy]}`}>
          Option {String.fromCharCode(65 + index)}
        </div>
      </div>

      {/* When to use */}
      <div className={`p-4 rounded-lg ${strategyBgColors[option.strategy]}`}>
        <div className="text-sm font-semibold text-text-primary mb-1">
          When to use this:
        </div>
        <div className="text-sm text-text-secondary">
          {option.whenToUse}
        </div>
      </div>

      {/* Email preview */}
      <div className="bg-bg-tertiary rounded-lg p-4 border border-border-color">
        <div className="text-xs font-semibold text-text-secondary mb-2">
          EMAIL PREVIEW
        </div>
        <div className="text-sm text-text-primary mb-2">
          <span className="font-semibold">Subject:</span> {option.email.subject}
        </div>
        <div className="text-sm text-text-secondary whitespace-pre-wrap">
          {showFullEmail ? option.email.body : `${option.email.body.slice(0, 200)}...`}
        </div>
        {option.email.body.length > 200 && (
          <button
            onClick={() => setShowFullEmail(!showFullEmail)}
            className="text-sm text-brand-blue hover:underline mt-2"
          >
            {showFullEmail ? 'Show less' : 'Show full email'}
          </button>
        )}
      </div>

      {/* Pros & Cons */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <div className="text-sm font-semibold text-green-500 mb-2 flex items-center">
            <svg className="w-4 h-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Pros
          </div>
          <ul className="space-y-1">
            {option.pros.map((pro, idx) => (
              <li key={idx} className="text-sm text-text-secondary flex items-start">
                <span className="text-green-500 mr-2">•</span>
                <span>{pro}</span>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <div className="text-sm font-semibold text-yellow-500 mb-2 flex items-center">
            <svg className="w-4 h-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
            Cons
          </div>
          <ul className="space-y-1">
            {option.cons.map((con, idx) => (
              <li key={idx} className="text-sm text-text-secondary flex items-start">
                <span className="text-yellow-500 mr-2">•</span>
                <span>{con}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Copy button */}
      <div className="pt-4 border-t border-border-color">
        <CopyButton text={fullEmail} label={`Copy Option ${String.fromCharCode(65 + index)}`} />
      </div>
    </div>
  );
}