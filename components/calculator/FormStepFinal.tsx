"use client";

import { InfoIcon } from "@/components/ui/InfoIcon";

interface FormStepFinalProps {
  hasPaymentTerms: boolean;
  revisionRounds: number;
  onChange: (field: string, value: any) => void;
}

export function FormStepFinal({
  hasPaymentTerms,
  revisionRounds,
  onChange,
}: FormStepFinalProps) {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold mb-2 text-text-primary">Final details</h2>
        <p className="text-text-secondary">
          These help us identify potential red flags in the deal.
        </p>
      </div>

      {/* Payment Terms */}
      <div>
        <label className="flex items-start cursor-pointer group">
          <input
            type="checkbox"
            checked={hasPaymentTerms}
            onChange={(e) => onChange("hasPaymentTerms", e.target.checked)}
            className="mt-1 w-5 h-5 rounded border-border-color bg-bg-secondary text-brand-yellow focus:ring-brand-yellow"
          />
          <div className="ml-3">
            <div className="font-medium group-hover:text-brand-yellow transition-colors text-text-primary">
              Clear payment terms established
              <InfoIcon content="Standard is 50% upfront, 50% on delivery. Never work without a contract and payment terms. This protects you." />
            </div>
            <div className="text-sm text-text-secondary mt-1">
              Contract specifies payment schedule and method
            </div>
          </div>
        </label>
      </div>

      {/* Revision Rounds */}
      <div>
        <label className="block text-sm font-medium mb-2 text-text-primary">
          How many revision rounds?
          <InfoIcon content="1-2 rounds is standard. More than that should cost extra (15-20% per additional round). Unlimited revisions = unlimited unpaid work." />
        </label>
        <div className="grid grid-cols-4 gap-3">
          {[1, 2, 3, 4].map((num) => (
            <button
              key={num}
              type="button"
              onClick={() => onChange("revisionRounds", num)}
              className={`py-3 px-4 rounded-lg font-medium transition-all duration-200 ${
                revisionRounds === num
                  ? "bg-brand-yellow text-black"
                  : "bg-bg-secondary text-text-primary hover:bg-bg-tertiary border border-border-color"
              } ${num > 2 ? "border-brand-pink" : ""}`}
            >
              {num} {num > 2 ? "🚩" : ""}
            </button>
          ))}
        </div>
        {revisionRounds > 2 && (
          <p className="text-xs text-brand-pink mt-2">
            ⚠️ More than 2 revision rounds is excessive. Charge 15-20% extra per additional round.
          </p>
        )}
      </div>

      {/* Summary Box */}
      <div className="bg-bg-secondary border border-border-color rounded-lg p-6 mt-8">
        <h3 className="font-semibold text-brand-yellow mb-3">Quick Tips Before You Calculate</h3>
        <ul className="space-y-2 text-sm text-text-secondary">
          <li className="flex items-start">
            <span className="text-brand-yellow mr-2">•</span>
            <span>Always ask for 50% upfront payment</span>
          </li>
          <li className="flex items-start">
            <span className="text-brand-pink mr-2">•</span>
            <span>Usage rights = extra money. Don't give them away.</span>
          </li>
          <li className="flex items-start">
            <span className="text-brand-blue mr-2">•</span>
            <span>Start negotiations 10-15% above your target rate</span>
          </li>
          <li className="flex items-start">
            <span className="text-brand-yellow mr-2">•</span>
            <span>Never accept "exposure" as payment</span>
          </li>
        </ul>
      </div>
    </div>
  );
}