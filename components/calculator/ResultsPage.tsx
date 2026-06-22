"use client";

import { CalculatorResult, CalculatorInput } from "@/lib/types/calculator"; // ADD CalculatorInput
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useWorkflow } from "@/contexts/WorkflowContext";

interface ResultsPageProps {
  result: CalculatorResult;
  formData: CalculatorInput; // ADD THIS LINE
  onStartOver: () => void;
  onBack: () => void;
}

export function ResultsPage({ result, formData, onStartOver, onBack }: ResultsPageProps) {
  const [copiedSection, setCopiedSection] = useState<string | null>(null);
  const router = useRouter();
  const { setCalculatorData, setNegotiationData } = useWorkflow();

  const copyToClipboard = (text: string, section: string) => {
    navigator.clipboard.writeText(text);
    setCopiedSection(section);
    setTimeout(() => setCopiedSection(null), 2000);
  };

  const handleNegotiateThisRate = () => {
    // Format deliverables for transfer
    const deliverablesText = result.deliverableBreakdowns
      .map(d => d.label)
      .join(', ');
  
    // Save calculator data to workflow context
    setCalculatorData({
      followers: formData.followers,
      engagement: formData.engagementRate,
      niche: formData.niche,
      recommendedRate: result.recommendedRate,
      minRate: result.minRate,
      maxRate: result.maxRate,
    });
  
    // Also save initial negotiation data with deliverables
    setNegotiationData({
      brandName: '', // Will be filled in negotiate page
      agreedRate: result.maxRate, // Start with the high end
      deliverables: result.deliverableBreakdowns.map(d => d.label),
      negotiationStage: 'initial',
    });
  
    // Navigate to negotiate page
    router.push('/negotiate');
  };

  const confidenceColors = {
    high: "text-brand-yellow",
    medium: "text-brand-blue",
    low: "text-brand-pink",
  };

  return (
    <div className="space-y-8">
      {/* Main Rate Display */}
      <div className="bg-bg-secondary border border-border-color rounded-xl p-8 text-center">
        <div className="mb-4">
          <span className="text-sm font-medium text-text-secondary uppercase tracking-wide">
            Total Package Rate
          </span>
        </div>
        <div className="text-6xl font-bold mb-2 text-brand-yellow">
          ${result.minRate.toLocaleString()} - ${result.maxRate.toLocaleString()}
        </div>
        <div className="text-xl text-text-secondary mb-6">
          Recommended: <span className="text-brand-yellow font-semibold">${result.recommendedRate.toLocaleString()}</span>
        </div>
        <div className="flex items-center justify-center gap-2">
          <div className={`px-4 py-2 rounded-full bg-bg-tertiary ${confidenceColors[result.confidence]}`}>
            <span className="font-medium capitalize">{result.confidence} Confidence</span>
          </div>
          <div className="px-4 py-2 rounded-full bg-bg-tertiary text-text-secondary">
            {result.marketPosition}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
          <button
            onClick={handleNegotiateThisRate}
            className="px-6 py-3 bg-brand-pink text-white rounded-lg font-semibold hover:opacity-90 transition-all"
          >
            💬 Negotiate This Rate
          </button>
        </div>
      </div>

      {/* Red Flags (if any) */}
      {result.redFlags.length > 0 && (
        <div className="bg-bg-secondary border-2 border-brand-pink rounded-xl p-6">
          <div className="flex items-start gap-3 mb-4">
            <span className="text-2xl">🚩</span>
            <div>
              <h2 className="text-xl font-bold text-brand-pink">Red Flags Detected</h2>
              <p className="text-text-secondary text-sm mt-1">
                We found {result.redFlags.length} potential issue{result.redFlags.length > 1 ? "s" : ""} with this deal
              </p>
            </div>
          </div>
          <div className="space-y-4">
            {result.redFlags.map((flag, index) => (
              <div
                key={index}
                className={`p-4 rounded-lg ${
                  flag.severity === "danger"
                    ? "bg-red-950/20 border border-red-900/30"
                    : "bg-yellow-950/20 border border-yellow-900/30"
                }`}
              >
                <div className="flex items-start gap-2">
                  <span className="text-lg">{flag.severity === "danger" ? "⛔" : "⚠️"}</span>
                  <div className="flex-1">
                    <div className="font-semibold text-text-primary">{flag.message}</div>
                    <div className="text-sm text-text-secondary mt-1">{flag.suggestion}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Deliverables Breakdown */}
      {result.deliverableBreakdowns.length > 0 && (
        <div className="bg-bg-secondary border border-border-color rounded-xl p-6">
          <h2 className="text-2xl font-bold mb-6 text-text-primary">Deliverables Breakdown</h2>
          <div className="space-y-3">
            {result.deliverableBreakdowns.map((deliverable, index) => (
              <div
                key={deliverable.id}
                className="flex items-center justify-between p-4 bg-bg-primary rounded-lg"
              >
                <div className="flex-1">
                  <div className="font-medium text-text-primary">{deliverable.label}</div>
                  <div className="text-sm text-text-secondary mt-1">
                    ${Math.round(deliverable.ratePerItem).toLocaleString()} each
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-semibold text-brand-yellow">
                    ${Math.round(deliverable.subtotal).toLocaleString()}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Calculation Breakdown */}
      <div className="bg-bg-secondary border border-border-color rounded-xl p-6">
        <h2 className="text-2xl font-bold mb-6 text-text-primary">How We Calculated This</h2>
        
        {/* Starting Point */}
        <div className="mb-6 p-4 bg-bg-primary rounded-lg">
          <div className="flex items-center justify-between mb-2">
            <span className="text-text-secondary">Your Engaged Audience</span>
            <span className="font-semibold text-text-primary">{result.engagedFollowers.toLocaleString()} people</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-text-secondary">Base Rate per Post ({result.creatorTier} tier)</span>
            <span className="font-semibold text-brand-yellow">${result.baseRate.toLocaleString()}</span>
          </div>
        </div>

        {/* Step-by-step breakdown */}
        <div className="space-y-3">
          {result.steps.map((step, index) => (
            <div
              key={index}
              className="flex items-center justify-between p-4 bg-bg-primary rounded-lg hover:bg-bg-tertiary transition-colors"
            >
              <div className="flex-1">
                <div className="font-medium text-text-primary">{step.label}</div>
                <div className="text-sm text-text-secondary mt-1">{step.explanation}</div>
              </div>
              <div className="text-right ml-4">
                {step.multiplier && (
                  <div className="text-sm text-brand-blue mb-1">
                    ×{step.multiplier.toFixed(2)}
                  </div>
                )}
                <div className="font-semibold text-text-primary">${Math.round(step.value).toLocaleString()}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Negotiation Strategy */}
      <div className="bg-bg-secondary border border-border-color rounded-xl p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-text-primary">Negotiation Strategy</h2>
          <button
            onClick={() =>
              copyToClipboard(
                result.negotiation.strategy.join("\n"),
                "strategy"
              )
            }
            className="text-sm text-brand-blue hover:text-brand-pink transition-colors"
          >
            {copiedSection === "strategy" ? "✓ Copied!" : "Copy Tips"}
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="p-4 bg-bg-primary rounded-lg">
            <div className="text-sm text-text-secondary mb-1">Opening Ask</div>
            <div className="text-2xl font-bold text-brand-yellow">
              ${result.negotiation.openingAsk.toLocaleString()}
            </div>
            <div className="text-xs text-text-tertiary mt-1">Start here</div>
          </div>
          <div className="p-4 bg-bg-primary rounded-lg">
            <div className="text-sm text-text-secondary mb-1">Acceptable Minimum</div>
            <div className="text-2xl font-bold text-brand-blue">
              ${result.negotiation.acceptableMin.toLocaleString()}
            </div>
            <div className="text-xs text-text-tertiary mt-1">Don't go below</div>
          </div>
          <div className="p-4 bg-bg-primary rounded-lg">
            <div className="text-sm text-text-secondary mb-1">Walk-Away Point</div>
            <div className="text-2xl font-bold text-brand-pink">
              ${result.negotiation.walkAwayPoint.toLocaleString()}
            </div>
            <div className="text-xs text-text-tertiary mt-1">Know your worth</div>
          </div>
        </div>

        <div className="space-y-3">
          {result.negotiation.strategy.map((tip, index) => (
            <div key={index} className="flex items-start gap-3 p-3 bg-bg-primary rounded-lg">
              <span className="text-brand-yellow font-bold">{index + 1}.</span>
              <span className="text-text-secondary">{tip}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Email Template */}
      <div className="bg-bg-secondary border border-border-color rounded-xl p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-text-primary">Email Template</h2>
          <button
            onClick={() => copyToClipboard(getEmailTemplate(result), "email")}
            className="text-sm text-brand-blue hover:text-brand-pink transition-colors"
          >
            {copiedSection === "email" ? "✓ Copied!" : "Copy Template"}
          </button>
        </div>

        <div className="p-6 bg-bg-primary rounded-lg font-mono text-sm">
          <pre className="whitespace-pre-wrap text-text-secondary">
            {getEmailTemplate(result)}
          </pre>
        </div>
      </div>

      {/* Bottom Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <button 
          onClick={onBack}
          className="px-6 py-3 bg-bg-secondary text-text-primary border border-border-color rounded-lg font-medium hover:bg-bg-tertiary transition-all"
        >
          ← Edit Details
        </button>
        <button 
          onClick={onStartOver} 
          className="px-6 py-3 bg-brand-yellow text-black rounded-lg font-semibold hover:opacity-90 transition-all"
        >
          Calculate Another Rate
        </button>
      </div>

      {/* Disclaimer */}
      <div className="mt-12 p-6 bg-bg-secondary rounded-lg text-center text-sm text-text-tertiary border border-border-color">
        <p>
          💡 This calculator provides estimated rates based on industry data and market analysis.
          Actual rates may vary based on your specific audience, content quality, and brand relationships.
          Always do your own research and trust your instincts.
        </p>
        <p className="mt-2 text-xs">
          {result.dataSourceNote}
        </p>
      </div>
    </div>
  );
}

// Helper function
function getEmailTemplate(result: CalculatorResult): string {
  // Get deliverables list
  const deliverablesList = result.deliverableBreakdowns
    .map(d => `• ${d.quantity} x ${d.label}`)
    .join('\n');
  
  return `Subject: Partnership Rate for [Brand Name]

Hi [Brand Contact],

Thank you for your interest in partnering with me!

I'd love to work together on this campaign. Based on the scope you outlined, my total rate for this partnership package is $${result.negotiation.openingAsk.toLocaleString()}.

This complete package includes:
${deliverablesList}
- [Specify usage rights and duration]
- Up to 2 rounds of revisions per deliverable

My standard terms are 50% upfront ($${Math.round(result.negotiation.openingAsk * 0.5).toLocaleString()}) and 50% upon delivery, with payment via [preferred method].

I'm happy to discuss the scope and find something that works for both of us. Do you have a budget range in mind?

Looking forward to collaborating!

Best,
[Your Name]`;
}