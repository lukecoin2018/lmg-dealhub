'use client';

import { useContract } from '@/contexts/ContractContext';
import { DealType } from '@/lib/types/contract';

const dealTypes: Array<{
  id: DealType;
  title: string;
  description: string;
  icon: string;
}> = [
  {
    id: 'single-post',
    title: 'Single Post',
    description: 'One-time content creation (Instagram post, TikTok, YouTube video)',
    icon: '📱',
  },
  {
    id: 'multi-post-campaign',
    title: 'Multi-Post Campaign',
    description: 'Multiple deliverables over a set period (3-5 posts, product launch)',
    icon: '📊',
  },
  {
    id: 'long-term-partnership',
    title: 'Long-term Partnership',
    description: 'Ongoing collaboration (brand ambassador, monthly content)',
    icon: '🤝',
  },
  {
    id: 'brand-ambassador',
    title: 'Brand Ambassador',
    description: 'Official representative role with exclusive partnership',
    icon: '⭐',
  },
  {
    id: 'product-review',
    title: 'Product Review',
    description: 'Honest review and feature of brand products',
    icon: '✍️',
  },
  {
    id: 'event-coverage',
    title: 'Event Coverage',
    description: 'Live or post-event content creation and promotion',
    icon: '🎉',
  },
  {
    id: 'content-licensing',
    title: 'Content Licensing',
    description: 'Licensing existing content for brand use',
    icon: '📸',
  },
];

interface DealTypeSelectorProps {
  onNext: () => void;
}

export default function DealTypeSelector({ onNext }: DealTypeSelectorProps) {
  const { contract, updateDealType } = useContract();

  const handleSelectDealType = (dealType: DealType) => {
    updateDealType(dealType);
  };

  const canProceed = contract.dealType !== null;

  return (
    <div className="max-w-6xl mx-auto">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-text-primary mb-2">Choose Your Deal Type</h2>
        <p className="text-text-secondary">
          Select the type of collaboration to get recommended contract sections
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {dealTypes.map((type) => (
          <button
            key={type.id}
            onClick={() => handleSelectDealType(type.id)}
            className={`p-6 rounded-xl border-2 transition-all text-left ${
              contract.dealType === type.id
                ? 'border-brand-yellow bg-brand-yellow/10'
                : 'border-border-color bg-bg-secondary hover:border-brand-yellow/50'
            }`}
          >
            <div className="flex flex-col items-center text-center gap-3">
              <span className="text-5xl">{type.icon}</span>
              <div>
                <h3 className="text-lg font-semibold mb-2 text-text-primary">
                  {type.title}
                </h3>
                <p className="text-sm text-text-tertiary">
                  {type.description}
                </p>
              </div>
              {contract.dealType === type.id && (
                <span className="text-brand-yellow text-2xl mt-2">✓</span>
              )}
            </div>
          </button>
        ))}
      </div>

      <div className="flex justify-end">
        <button
          onClick={onNext}
          disabled={!canProceed}
          className={`px-8 py-3 rounded-lg font-semibold text-lg transition-all ${
            canProceed
              ? 'bg-brand-yellow text-black hover:opacity-90'
              : 'bg-bg-tertiary text-text-tertiary cursor-not-allowed'
          }`}
        >
          Continue to Section Selection →
        </button>
      </div>
    </div>
  );
}