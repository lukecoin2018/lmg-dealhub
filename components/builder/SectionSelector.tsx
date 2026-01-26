'use client';

import { useContract } from '@/contexts/ContractContext';
import { CLAUSE_LIBRARY } from '@/data/clauseLibrary';
import { DEAL_TYPE_PRESETS } from '@/data/dealTypes';

interface SectionSelectorProps {
  onNext: () => void;
  onBack: () => void;
}

export default function SectionSelector({ onNext, onBack }: SectionSelectorProps) {
  const { contract, toggleSection } = useContract();

  // Get recommended sections for selected deal type
  const dealTypePreset = DEAL_TYPE_PRESETS.find(p => p.id === contract.dealType);
  const recommendedSectionIds = dealTypePreset?.recommendedSections || [];
  const optionalSectionIds = dealTypePreset?.optionalSections || [];

  // Sections sorted by order
  const sortedSections = [...CLAUSE_LIBRARY].sort((a, b) => a.order - b.order);

  const handleToggleSection = (sectionId: string) => {
    toggleSection(sectionId);
  };

  const canProceed = contract.selectedSections.length > 0;

  return (
    <div className="max-w-5xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-text-primary mb-2">
          Choose Your Contract Sections
        </h2>
        <p className="text-text-secondary">
          We've pre-selected recommended sections for a <span className="text-brand-yellow">{dealTypePreset?.name}</span>. 
          Add or remove sections as needed.
        </p>
      </div>

      {/* Sections List */}
      <div className="space-y-4 mb-8">
        {sortedSections.map((section) => {
          const isSelected = contract.selectedSections.includes(section.id);
          const isRecommended = recommendedSectionIds.includes(section.id);
          const isOptional = optionalSectionIds.includes(section.id);
          const isRequired = section.required;

          return (
            <div
              key={section.id}
              className={`p-6 rounded-xl border-2 transition-all ${
                isSelected
                  ? 'border-brand-yellow bg-brand-yellow/5'
                  : 'border-border-color bg-bg-secondary hover:border-brand-yellow/50'
              }`}
            >
              <div className="flex items-start gap-4">
                {/* Checkbox */}
                <button
                  onClick={() => handleToggleSection(section.id)}
                  className={`mt-1 w-6 h-6 rounded border-2 flex items-center justify-center transition-colors ${
                    isSelected
                      ? 'bg-brand-yellow border-brand-yellow'
                      : 'bg-transparent border-border-color hover:border-brand-yellow'
                  }`}
                >
                  {isSelected && <span className="text-black text-xl font-bold">✓</span>}
                </button>

                {/* Content */}
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <h3 className="text-xl font-semibold text-text-primary">
                      {section.order}. {section.title}
                    </h3>
                    
                    {/* Badges */}
                    {isRequired && (
                      <span className="px-2 py-1 text-xs font-semibold bg-brand-pink/20 text-brand-pink rounded border border-brand-pink/30">
                        Required
                      </span>
                    )}
                    {isRecommended && !isRequired && (
                      <span className="px-2 py-1 text-xs font-semibold bg-brand-yellow/20 text-brand-yellow rounded border border-brand-yellow/30">
                        Recommended
                      </span>
                    )}
                    {isOptional && (
                      <span className="px-2 py-1 text-xs font-semibold bg-brand-blue/20 text-brand-blue rounded border border-brand-blue/30">
                        Optional
                      </span>
                    )}
                  </div>
                  
                  <p className="text-text-secondary mb-2">
                    {section.description}
                  </p>

                  {/* Explanation */}
                  {isSelected && (
                    <div className="mt-3 p-3 bg-bg-tertiary rounded-lg border border-brand-yellow/20">
                      <p className="text-sm text-text-secondary">
                        <span className="font-semibold text-brand-yellow">💡 Why this matters:</span> {section.explanation}
                      </p>
                    </div>
                  )}

                  {/* Variation count */}
                  <p className="text-sm text-text-tertiary mt-2">
                    {section.variations.length} variation{section.variations.length !== 1 ? 's' : ''} available
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Navigation */}
      <div className="flex justify-between items-center">
        <button
          onClick={onBack}
          className="px-6 py-3 rounded-lg font-semibold border-2 border-border-color text-text-primary hover:border-brand-yellow transition-colors"
        >
          ← Back to Deal Type
        </button>

        <button
          onClick={onNext}
          disabled={!canProceed}
          className={`px-8 py-3 rounded-lg font-semibold transition-all ${
            canProceed
              ? 'bg-brand-yellow text-black hover:opacity-90'
              : 'bg-bg-tertiary text-text-tertiary cursor-not-allowed'
          }`}
        >
          Continue to Customize Clauses →
        </button>
      </div>

      {/* Selected Count */}
      <div className="text-center mt-6">
        <p className="text-text-secondary">
          {contract.selectedSections.length} section{contract.selectedSections.length !== 1 ? 's' : ''} selected
        </p>
      </div>
    </div>
  );
}