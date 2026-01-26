'use client';

import React from 'react';
import { Input } from '@/components/ui/Input';

interface Step2NumbersProps {
  fairRate: string;
  brandOffer: string;
  deliverables: string;
  usageRights: string;
  exclusivity: string;
  onChange: (field: string, value: string) => void;
  errors?: Partial<Record<string, string>>;
}

export function Step2Numbers({
  fairRate,
  brandOffer,
  deliverables,
  usageRights,
  exclusivity,
  onChange,
  errors = {}
}: Step2NumbersProps) {
  return (
    <div className="space-y-6">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-text-primary mb-2">
          Tell us about the deal
        </h2>
        <p className="text-text-secondary">
          We'll use these numbers to personalize your response.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Input
          type="number"
          label="Your Fair Rate"
          placeholder="3500"
          value={fairRate}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => onChange('fairRate', e.target.value)}
          error={errors.fairRate}
          helperText="The rate you calculated as fair (from Rate Calculator)"
        />

        <Input
          type="number"
          label="Brand's Current Offer"
          placeholder="1820"
          value={brandOffer}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => onChange('brandOffer', e.target.value)}
          error={errors.brandOffer}
          helperText="What they're currently offering to pay"
        />
      </div>

      <Input
        type="text"
        label="Deliverables"
        placeholder="3 Instagram Reels"
        value={deliverables}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => onChange('deliverables', e.target.value)}
        error={errors.deliverables}
        helperText="What content you'll create (e.g., '3 Instagram Reels', '1 YouTube video + 2 TikToks')"
      />

      <Input
        type="text"
        label="Usage Rights"
        placeholder="90-day organic + paid promotion"
        value={usageRights}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => onChange('usageRights', e.target.value)}
        error={errors.usageRights}
        helperText="How long and where they can use your content"
      />

      <Input
        type="text"
        label="Exclusivity"
        placeholder="30-day category exclusivity"
        value={exclusivity}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => onChange('exclusivity', e.target.value)}
        error={errors.exclusivity}
        helperText="If you can't work with competitors during/after campaign"
      />
    </div>
  );
}