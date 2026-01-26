'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/Button';
import { DecisionHelperQuiz, DecisionRecommendation, StrategyType } from '@/lib/negotiation/types';

interface DecisionHelperProps {
  onRecommendation: (recommendation: DecisionRecommendation) => void;
  onClose: () => void;
}

export function DecisionHelper({ onRecommendation, onClose }: DecisionHelperProps) {
  const [quiz, setQuiz] = useState<Partial<DecisionHelperQuiz>>({});
  const [currentQuestion, setCurrentQuestion] = useState(1);

  const handleAnswer = (field: keyof DecisionHelperQuiz, value: string) => {
    const updatedQuiz = { ...quiz, [field]: value };
    setQuiz(updatedQuiz);

    if (currentQuestion < 3) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      // Calculate recommendation
      const recommendation = calculateRecommendation(updatedQuiz as DecisionHelperQuiz);
      onRecommendation(recommendation);
    }
  };

  return (
    <div className="bg-bg-secondary rounded-lg border-2 border-brand-blue p-8 max-w-2xl mx-auto">
      {/* Header */}
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-text-primary mb-2">
          Decision Helper
        </h2>
        <p className="text-text-secondary">
          Question {currentQuestion} of 3
        </p>
        <div className="mt-4 w-full bg-bg-tertiary h-2 rounded-full">
          <div
            className="bg-brand-blue h-2 rounded-full transition-all duration-300"
            style={{ width: `${(currentQuestion / 3) * 100}%` }}
          />
        </div>
      </div>

      {/* Questions */}
      <div className="space-y-6">
        {currentQuestion === 1 && (
          <QuestionCard
            question="Is this brand prestigious or well-known?"
            description="Well-known brands add credibility to your portfolio"
            options={[
              { value: 'high', label: 'Yes, very prestigious', emoji: '⭐' },
              { value: 'medium', label: 'Somewhat known', emoji: '👍' },
              { value: 'low', label: 'Small/unknown brand', emoji: '🏢' }
            ]}
            onSelect={(value) => handleAnswer('brandPrestige', value)}
          />
        )}

        {currentQuestion === 2 && (
          <QuestionCard
            question="How badly do you need this income?"
            description="Be honest - there's no shame in needing the work"
            options={[
              { value: 'urgent', label: 'Urgently need it', emoji: '🚨' },
              { value: 'moderate', label: 'Would help but not critical', emoji: '💼' },
              { value: 'flexible', label: 'Don\'t really need it', emoji: '✨' }
            ]}
            onSelect={(value) => handleAnswer('financialNeed', value)}
          />
        )}

        {currentQuestion === 3 && (
          <QuestionCard
            question="Do you think they have more budget?"
            description="Based on their responses and company size"
            options={[
              { value: 'yes', label: 'Yes, likely testing me', emoji: '💰' },
              { value: 'maybe', label: 'Maybe, not sure', emoji: '🤔' },
              { value: 'no', label: 'No, this seems real', emoji: '📊' }
            ]}
            onSelect={(value) => handleAnswer('budgetLikelihood', value)}
          />
        )}
      </div>

      {/* Back button */}
      {currentQuestion > 1 && (
        <div className="mt-6 text-center">
          <Button
            variant="ghost"
            onClick={() => setCurrentQuestion(currentQuestion - 1)}
          >
            ← Back
          </Button>
        </div>
      )}

      {/* Close button */}
      <div className="mt-6 text-center">
        <button
          onClick={onClose}
          className="text-sm text-text-secondary hover:text-text-primary"
        >
          Cancel
        </button>
      </div>
    </div>
  );
}

interface QuestionCardProps {
  question: string;
  description: string;
  options: { value: string; label: string; emoji: string }[];
  onSelect: (value: string) => void;
}

function QuestionCard({ question, description, options, onSelect }: QuestionCardProps) {
  return (
    <div>
      <h3 className="text-xl font-bold text-text-primary mb-2">
        {question}
      </h3>
      <p className="text-sm text-text-secondary mb-6">
        {description}
      </p>

      <div className="space-y-3">
        {options.map((option) => (
          <button
            key={option.value}
            onClick={() => onSelect(option.value)}
            className="w-full p-4 rounded-lg border-2 border-border-color bg-bg-secondary hover:border-brand-blue hover:bg-brand-blue/10 transition-all duration-200 text-left"
          >
            <div className="flex items-center">
              <span className="text-3xl mr-4">{option.emoji}</span>
              <span className="font-medium text-text-primary">{option.label}</span>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}

// Recommendation calculation logic
function calculateRecommendation(quiz: DecisionHelperQuiz): DecisionRecommendation {
  let firmScore = 0;
  let scopeScore = 0;
  let compromiseScore = 0;

  // Brand prestige scoring (30% weight)
  if (quiz.brandPrestige === 'high') {
    compromiseScore += 30;
    scopeScore += 20;
  } else if (quiz.brandPrestige === 'medium') {
    scopeScore += 25;
    compromiseScore += 20;
    firmScore += 15;
  } else {
    firmScore += 30;
    scopeScore += 15;
  }

  // Financial need scoring (40% weight)
  if (quiz.financialNeed === 'urgent') {
    compromiseScore += 40;
    scopeScore += 30;
  } else if (quiz.financialNeed === 'moderate') {
    scopeScore += 35;
    compromiseScore += 25;
    firmScore += 20;
  } else {
    firmScore += 40;
    scopeScore += 25;
    compromiseScore += 15;
  }

  // Budget likelihood scoring (30% weight)
  if (quiz.budgetLikelihood === 'yes') {
    firmScore += 30;
    scopeScore += 20;
  } else if (quiz.budgetLikelihood === 'maybe') {
    scopeScore += 25;
    firmScore += 20;
    compromiseScore += 15;
  } else {
    compromiseScore += 30;
    scopeScore += 20;
    firmScore += 10;
  }

  // Determine winner
  const scores = [
    { strategy: 'firm' as StrategyType, score: firmScore },
    { strategy: 'scope' as StrategyType, score: scopeScore },
    { strategy: 'compromise' as StrategyType, score: compromiseScore }
  ].sort((a, b) => b.score - a.score);

  const winner = scores[0];
  const reasoning = getRecommendationReasoning(winner.strategy, quiz);

  return {
    recommendedStrategy: winner.strategy,
    confidence: Math.min(winner.score, 95),
    reasoning,
    alternativeScores: scores.slice(1).map(s => ({
      strategy: s.strategy,
      score: s.score,
      reason: getAlternativeReason(s.strategy, quiz)
    }))
  };
}

function getRecommendationReasoning(strategy: StrategyType, quiz: DecisionHelperQuiz): string[] {
  const reasons: string[] = [];

  if (strategy === 'firm') {
    reasons.push('Stand your ground - your value is worth it');
    if (quiz.brandPrestige === 'low') reasons.push('Brand is small/unknown (not worth compromising for)');
    if (quiz.financialNeed === 'flexible') reasons.push('You don\'t urgently need income (can afford to stand firm)');
    if (quiz.budgetLikelihood === 'yes') reasons.push('They likely have more budget (testing if you\'ll accept low offer)');
    reasons.push('If they counter higher → Great! If not → You avoided undervaluing yourself');
  } else if (strategy === 'scope') {
    reasons.push('Adjust deliverables while maintaining your rate');
    if (quiz.brandPrestige === 'medium') reasons.push('Decent brand credibility (worth finding middle ground)');
    if (quiz.financialNeed === 'moderate') reasons.push('You want the deal but shouldn\'t devalue yourself');
    reasons.push('This shows flexibility without lowering your per-content rate');
  } else {
    reasons.push('Meet them in the middle to close the deal');
    if (quiz.brandPrestige === 'high') reasons.push('Prestigious brand (good for your portfolio)');
    if (quiz.financialNeed === 'urgent') reasons.push('You need this income (worth compromising)');
    if (quiz.budgetLikelihood === 'no') reasons.push('Their budget constraint seems real');
    reasons.push('This is most likely to result in a deal');
  }

  return reasons;
}

function getAlternativeReason(strategy: StrategyType, quiz: DecisionHelperQuiz): string {
  if (strategy === 'firm') return 'Less likely to close but maintains your full rate';
  if (strategy === 'scope') return 'Good middle ground if compromise feels too low';
  return 'Most flexible option if you really need to close';
}