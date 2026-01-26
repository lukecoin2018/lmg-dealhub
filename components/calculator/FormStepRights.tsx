"use client";

import { InfoIcon } from "@/components/ui/InfoIcon";

interface FormStepRightsProps {
  usageType: "organic" | "paid";
  usageDuration: 30 | 90 | 365 | 9999;
  hasWhitelisting: boolean;
  exclusivityDays: 0 | 30 | 60 | 90;
  isLongTermPartnership: boolean;
  onChange: (field: string, value: any) => void;
}

export function FormStepRights({
  usageType,
  usageDuration,
  hasWhitelisting,
  exclusivityDays,
  isLongTermPartnership,
  onChange,
}: FormStepRightsProps) {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold mb-2 text-text-primary">Usage rights & terms</h2>
        <p className="text-text-secondary">
          This is where most creators undervalue themselves. Usage rights = $$$.
        </p>
      </div>

      {/* Usage Type */}
      <div>
        <label className="block text-sm font-medium mb-2 text-text-primary">
          How will the brand use your content?
          <InfoIcon content="Organic = posted on your account only. Paid = they'll run it as ads. Paid usage should ALWAYS cost more." />
        </label>
        <div className="grid grid-cols-2 gap-3">
          <button
            type="button"
            onClick={() => onChange("usageType", "organic")}
            className={`py-4 px-4 rounded-lg font-medium transition-all duration-200 text-left ${
              usageType === "organic"
                ? "bg-brand-blue text-white"
                : "bg-bg-secondary text-text-primary hover:bg-bg-tertiary border border-border-color"
            }`}
          >
            <div className="font-semibold">Organic Only</div>
            <div className="text-xs mt-1 opacity-80">Posted on your account</div>
          </button>
          <button
            type="button"
            onClick={() => onChange("usageType", "paid")}
            className={`py-4 px-4 rounded-lg font-medium transition-all duration-200 text-left ${
              usageType === "paid"
                ? "bg-brand-pink text-white"
                : "bg-bg-secondary text-text-primary hover:bg-bg-tertiary border border-border-color"
            }`}
          >
            <div className="font-semibold">Paid Advertising</div>
            <div className="text-xs mt-1 opacity-80">They'll boost it as ads</div>
          </button>
        </div>
      </div>

      {/* Usage Duration */}
      <div>
        <label className="block text-sm font-medium mb-2 text-text-primary">
          How long can they use it?
          <InfoIcon content="Longer usage = higher rates. Your content is an asset. Don't give away perpetual rights cheaply." />
        </label>
        <div className="grid grid-cols-2 gap-3">
          <button
            type="button"
            onClick={() => onChange("usageDuration", 30)}
            className={`py-3 px-4 rounded-lg font-medium transition-all duration-200 ${
              usageDuration === 30
                ? "bg-brand-yellow text-black"
                : "bg-bg-secondary text-text-primary hover:bg-bg-tertiary border border-border-color"
            }`}
          >
            30 Days
          </button>
          <button
            type="button"
            onClick={() => onChange("usageDuration", 90)}
            className={`py-3 px-4 rounded-lg font-medium transition-all duration-200 ${
              usageDuration === 90
                ? "bg-brand-yellow text-black"
                : "bg-bg-secondary text-text-primary hover:bg-bg-tertiary border border-border-color"
            }`}
          >
            90 Days
          </button>
          <button
            type="button"
            onClick={() => onChange("usageDuration", 365)}
            className={`py-3 px-4 rounded-lg font-medium transition-all duration-200 ${
              usageDuration === 365
                ? "bg-brand-yellow text-black"
                : "bg-bg-secondary text-text-primary hover:bg-bg-tertiary border border-border-color"
            }`}
          >
            1 Year
          </button>
          <button
            type="button"
            onClick={() => onChange("usageDuration", 9999)}
            className={`py-3 px-4 rounded-lg font-medium transition-all duration-200 ${
              usageDuration === 9999
                ? "bg-brand-yellow text-black"
                : "bg-bg-secondary text-text-primary hover:bg-bg-tertiary border border-border-color"
            }`}
          >
            Perpetual 🚩
          </button>
        </div>
      </div>

      {/* Whitelisting */}
      <div>
        <label className="flex items-start cursor-pointer group">
          <input
            type="checkbox"
            checked={hasWhitelisting}
            onChange={(e) => onChange("hasWhitelisting", e.target.checked)}
            className="mt-1 w-5 h-5 rounded border-border-color bg-bg-secondary text-brand-yellow focus:ring-brand-yellow"
          />
          <div className="ml-3">
            <div className="font-medium group-hover:text-brand-yellow transition-colors text-text-primary">
              Whitelisting / Spark Ads
              <InfoIcon content="They run ads FROM YOUR ACCOUNT using your handle and credibility. This is worth 30% more because it uses your authentic relationship with your audience." />
            </div>
            <div className="text-sm text-text-secondary mt-1">
              Brand will run ads from your account (+30%)
            </div>
          </div>
        </label>
      </div>

      {/* Exclusivity */}
      <div>
        <label className="block text-sm font-medium mb-2 text-text-primary">
          Exclusivity period
          <InfoIcon content="Can't work with competitors during this time. This limits your earning potential, so charge accordingly." />
        </label>
        <div className="grid grid-cols-4 gap-3">
          {[
            { value: 0, label: "None" },
            { value: 30, label: "30 Days" },
            { value: 60, label: "60 Days" },
            { value: 90, label: "90 Days" },
          ].map((option) => (
            <button
              key={option.value}
              type="button"
              onClick={() => onChange("exclusivityDays", option.value)}
              className={`py-3 px-4 rounded-lg font-medium transition-all duration-200 ${
                exclusivityDays === option.value
                  ? "bg-brand-yellow text-black"
                  : "bg-bg-secondary text-text-primary hover:bg-bg-tertiary border border-border-color"
              }`}
            >
              {option.label}
            </button>
          ))}
        </div>
      </div>

      {/* Long-term Partnership */}
      <div>
        <label className="flex items-start cursor-pointer group">
          <input
            type="checkbox"
            checked={isLongTermPartnership}
            onChange={(e) => onChange("isLongTermPartnership", e.target.checked)}
            className="mt-1 w-5 h-5 rounded border-border-color bg-bg-secondary text-brand-blue focus:ring-brand-blue"
          />
          <div className="ml-3">
            <div className="font-medium group-hover:text-brand-blue transition-colors text-text-primary">
              Long-term partnership (3+ months)
              <InfoIcon content="Ongoing relationship with consistent work. You can offer 20% discount for steady income vs one-off deals." />
            </div>
            <div className="text-sm text-text-secondary mt-1">
              Multi-month agreement with consistent deliverables
            </div>
          </div>
        </label>
      </div>
    </div>
  );
}