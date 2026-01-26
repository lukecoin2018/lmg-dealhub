'use client';

import React from 'react';
import { calculateGapAnalysis, formatCurrency } from '@/lib/negotiation/calculations';

interface GapAnalysisProps {
  fairRate: number;
  brandOffer: number;
}

export function GapAnalysis({ fairRate, brandOffer }: GapAnalysisProps) {
  const analysis = calculateGapAnalysis(fairRate, brandOffer);
  
  return (
    <div className="my-8 p-6 bg-bg-tertiary rounded-lg border-2" style={{ borderColor: analysis.warningColor }}>
      {/* Warning badge */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center">
          <div
            className="px-4 py-2 rounded-full font-bold text-sm"
            style={{ 
              backgroundColor: `${analysis.warningColor}20`,
              color: analysis.warningColor 
            }}
          >
            {analysis.warningMessage}
          </div>
        </div>
      </div>

      {/* Numbers breakdown */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
        <div className="bg-bg-secondary p-4 rounded-lg">
          <div className="text-text-secondary text-sm mb-1">Your Fair Rate</div>
          <div className="text-2xl font-bold text-text-primary">
            {formatCurrency(fairRate)}
          </div>
        </div>

        <div className="bg-bg-secondary p-4 rounded-lg">
          <div className="text-text-secondary text-sm mb-1">Their Offer</div>
          <div className="text-2xl font-bold text-text-primary">
            {formatCurrency(brandOffer)}
          </div>
        </div>

        <div className="bg-bg-secondary p-4 rounded-lg">
          <div className="text-text-secondary text-sm mb-1">Gap</div>
          <div className="text-2xl font-bold" style={{ color: analysis.warningColor }}>
            {formatCurrency(analysis.dollarGap)}
          </div>
          <div className="text-sm text-text-secondary mt-1">
            ({analysis.percentGap}% under)
          </div>
        </div>
      </div>

      {/* Contextual message */}
      <div className="text-sm text-text-secondary">
        {getContextualMessage(analysis.warningLevel, analysis.percentGap)}
      </div>
    </div>
  );
}

function getContextualMessage(level: string, percentGap: number): string {
  switch (level) {
    case 'severe':
      return '⚠️ This offer is severely undervalued. Consider if this partnership is worth your time and effort. You may want to politely decline or firmly hold your rate.';
    case 'significant':
      return '⚠️ This offer is significantly below market rate. Stand firm on your value or consider adjusting scope rather than dropping your rate.';
    case 'below':
      return 'This offer is below your fair rate but within negotiation range. You have room to negotiate up or adjust scope.';
    case 'fair':
      return '✅ This is a fair offer! You can accept with confidence or negotiate minor adjustments.';
    case 'above':
      return '🎉 Congratulations! This offer exceeds your fair rate. This brand clearly values your work.';
    default:
      return '';
  }
}