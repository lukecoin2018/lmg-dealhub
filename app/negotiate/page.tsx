'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Button } from '@/components/ui/Button';
import { StepIndicator } from '@/components/negotiation/StepIndicator';
import { Step1Stage } from '@/components/negotiation/Step1Stage';
import { Step2Numbers } from '@/components/negotiation/Step2Numbers';
import { Step3Objection } from '@/components/negotiation/Step3Objection';
import { Step4Flexibility } from '@/components/negotiation/Step4Flexibility';
import { GapAnalysis } from '@/components/negotiation/GapAnalysis';
import { ResponseOptions } from '@/components/negotiation/ResponseOptions';
import { DecisionHelper } from '@/components/negotiation/DecisionHelper';
import { createClient } from '@/lib/supabase/client';
import {
  NegotiationStage,
  ObjectionType,
  FlexibilityLevel,
  NegotiationInput,
  ResponseOption,
  DecisionRecommendation
} from '@/lib/negotiation/types';
import { generateResponseOptions } from '@/lib/negotiation/templateMatcher';

type Step = 1 | 2 | 3 | 4 | 'results' | 'decision-helper';

export default function NegotiatePage() {
  const router = useRouter();
  const supabase = createClient();
  const [currentStep, setCurrentStep] = useState<Step>(1);
  const [showDecisionHelper, setShowDecisionHelper] = useState(false);
  const [recommendation, setRecommendation] = useState<DecisionRecommendation | null>(null);
  const [saving, setSaving] = useState(false);

  // Form data
  const [stage, setStage] = useState<NegotiationStage | null>(null);
  const [fairRate, setFairRate] = useState('');
  const [brandOffer, setBrandOffer] = useState('');
  const [deliverables, setDeliverables] = useState('');
  const [usageRights, setUsageRights] = useState('');
  const [exclusivity, setExclusivity] = useState('');
  const [objectionType, setObjectionType] = useState<ObjectionType | null>(null);
  const [customObjection, setCustomObjection] = useState('');
  const [flexibility, setFlexibility] = useState<FlexibilityLevel | null>(null);
  const [creatorName, setCreatorName] = useState('');
  const [brandName, setBrandName] = useState('');

  // Validation errors
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Generated responses
  const [responses, setResponses] = useState<ResponseOption[]>([]);

  // URL params pre-fill (from Rate Calculator)
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const rateParam = params.get('fairRate');
    const minRateParam = params.get('minRate');
    const maxRateParam = params.get('maxRate');
    const openingAskParam = params.get('openingAsk');

    if (rateParam) setFairRate(rateParam);
    if (openingAskParam) setFairRate(openingAskParam); // Use opening ask if available
  }, []);

  const handleFieldChange = (field: string, value: string) => {
    // Clear error when user types
    if (errors[field]) {
      setErrors({ ...errors, [field]: '' });
    }

    // Update appropriate state
    switch (field) {
      case 'fairRate':
        setFairRate(value);
        break;
      case 'brandOffer':
        setBrandOffer(value);
        break;
      case 'deliverables':
        setDeliverables(value);
        break;
      case 'usageRights':
        setUsageRights(value);
        break;
      case 'exclusivity':
        setExclusivity(value);
        break;
      case 'creatorName':
        setCreatorName(value);
        break;
      case 'brandName':
        setBrandName(value);
        break;
    }
  };

  const validateStep2 = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!fairRate || parseFloat(fairRate) <= 0) {
      newErrors.fairRate = 'Please enter your fair rate';
    }
    if (!brandOffer || parseFloat(brandOffer) <= 0) {
      newErrors.brandOffer = 'Please enter the brand\'s offer';
    }
    if (!deliverables.trim()) {
      newErrors.deliverables = 'Please describe the deliverables';
    }
    if (!usageRights.trim()) {
      newErrors.usageRights = 'Please specify usage rights';
    }
    if (!exclusivity.trim()) {
      newErrors.exclusivity = 'Please specify exclusivity terms';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    // Validation for each step
    if (currentStep === 1 && !stage) {
      alert('Please select a negotiation stage');
      return;
    }
    if (currentStep === 2 && !validateStep2()) {
      return;
    }
    if (currentStep === 3 && !objectionType) {
      alert('Please select an objection type');
      return;
    }
    if (currentStep === 4 && !flexibility) {
      alert('Please select your flexibility level');
      return;
    }

    // Move to next step
    if (currentStep === 4) {
      generateResponses();
    } else if (typeof currentStep === 'number') {
      setCurrentStep((currentStep + 1) as Step);
    }
  };

  const handleBack = () => {
    if (currentStep === 'results') {
      setCurrentStep(4);
    } else if (typeof currentStep === 'number' && currentStep > 1) {
      setCurrentStep((currentStep - 1) as Step);
    }
  };

  const generateResponses = () => {
    const input: NegotiationInput = {
      stage: stage!,
      fairRate: parseFloat(fairRate),
      brandOffer: parseFloat(brandOffer),
      deliverables,
      usageRights,
      exclusivity,
      objectionType: objectionType!,
      customObjection: objectionType === 'other' ? customObjection : undefined,
      flexibility: flexibility!,
      creatorName: creatorName || undefined,
      brandName: brandName || undefined
    };

    const generatedResponses = generateResponseOptions(input);
    setResponses(generatedResponses);
    setCurrentStep('results');
  };

  const handleSaveNegotiation = async () => {
    setSaving(true);
    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        alert("Please log in to save negotiations");
        return;
      }

      const { error } = await supabase.from("negotiations").insert({
        user_id: user.id,
        brand_name: brandName || 'Unknown Brand',
        brand_offer: parseFloat(brandOffer),
        fair_rate: parseFloat(fairRate),
        objection_type: objectionType,
        selected_response: recommendation?.recommendedStrategy || responses[0]?.strategy,
        negotiation_data: {
          stage,
          deliverables,
          usageRights,
          exclusivity,
          flexibility,
          responses,
          recommendation,
        },
      });

      if (error) throw error;

      alert("✅ Negotiation saved successfully!");
    } catch (error) {
      console.error("Error saving negotiation:", error);
      alert("Failed to save negotiation. Please try again.");
    } finally {
      setSaving(false);
    }
  };

  const handleShowDecisionHelper = () => {
    setShowDecisionHelper(true);
  };

  const handleRecommendation = (rec: DecisionRecommendation) => {
    setRecommendation(rec);
    setShowDecisionHelper(false);
  };

  const handleStartOver = () => {
    setCurrentStep(1);
    setStage(null);
    setFairRate('');
    setBrandOffer('');
    setDeliverables('');
    setUsageRights('');
    setExclusivity('');
    setObjectionType(null);
    setCustomObjection('');
    setFlexibility(null);
    setCreatorName('');
    setBrandName('');
    setErrors({});
    setResponses([]);
    setRecommendation(null);
    setShowDecisionHelper(false);
  };

  return (
    <DashboardLayout>
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        {currentStep !== 'results' && (
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-text-primary mb-2">
              Negotiation Assistant
            </h1>
            <p className="text-text-secondary">
              Get personalized, professional email responses for your brand negotiation
            </p>
          </div>
        )}

        {/* Progress indicator (only show on steps 1-4) */}
        {typeof currentStep === 'number' && (
          <StepIndicator currentStep={currentStep} totalSteps={4} />
        )}

        {/* Step content */}
        <div className="bg-bg-secondary border border-border-color rounded-xl p-8">
          {currentStep === 1 && (
            <Step1Stage selected={stage} onSelect={setStage} />
          )}

          {currentStep === 2 && (
            <>
              <Step2Numbers
                fairRate={fairRate}
                brandOffer={brandOffer}
                deliverables={deliverables}
                usageRights={usageRights}
                exclusivity={exclusivity}
                onChange={handleFieldChange}
                errors={errors}
              />
              
              {/* Show gap analysis if both rates are entered */}
              {fairRate && brandOffer && parseFloat(fairRate) > 0 && parseFloat(brandOffer) > 0 && (
                <GapAnalysis
                  fairRate={parseFloat(fairRate)}
                  brandOffer={parseFloat(brandOffer)}
                />
              )}
            </>
          )}

          {currentStep === 3 && (
            <Step3Objection
              selected={objectionType}
              customObjection={customObjection}
              onSelect={setObjectionType}
              onCustomChange={setCustomObjection}
            />
          )}

          {currentStep === 4 && (
            <Step4Flexibility selected={flexibility} onSelect={setFlexibility} />
          )}

          {/* Navigation buttons (only show on steps 1-4) */}
          {typeof currentStep === 'number' && (
            <div className="flex justify-between items-center mt-8 pt-6 border-t border-border-color">
              <Button
                variant="ghost"
                onClick={handleBack}
                disabled={currentStep === 1}
              >
                ← Back
              </Button>
              <Button variant="primary" onClick={handleNext}>
                {currentStep === 4 ? 'Generate Responses →' : 'Next →'}
              </Button>
            </div>
          )}
        </div>

        {/* Results view */}
        {currentStep === 'results' && !showDecisionHelper && (
          <>
            {/* Show recommendation if available */}
            {recommendation && (
              <div className="mb-8 bg-bg-tertiary border-2 border-brand-yellow rounded-lg p-6">
                <div className="flex items-start">
                  <div className="text-4xl mr-4">🎯</div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-text-primary mb-2">
                      Recommended: {getStrategyName(recommendation.recommendedStrategy)}
                    </h3>
                    <div className="mb-3">
                      <span className="text-sm font-semibold text-text-secondary">Confidence: </span>
                      <span className="text-lg font-bold text-brand-yellow">{recommendation.confidence}%</span>
                    </div>
                    <div className="space-y-1">
                      {recommendation.reasoning.map((reason, idx) => (
                        <div key={idx} className="text-sm text-text-secondary flex items-start">
                          <span className="text-brand-yellow mr-2">•</span>
                          <span>{reason}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            <ResponseOptions
              options={responses}
              onBack={handleStartOver}
              onShowDecisionHelper={handleShowDecisionHelper}
            />

            {/* Save & Generate Contract buttons */}
            <div className="mb-8 flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                onClick={handleSaveNegotiation}
                disabled={saving}
                variant="secondary"
              >
                {saving ? "Saving..." : "💾 Save Negotiation"}
              </Button>
              <Button
                onClick={() => {
                  const params = new URLSearchParams({
                    brandName: brandName || '',
                    amount: fairRate || '',
                    deliverables: deliverables || '',
                  });
                  router.push(`/contracts/generate?${params.toString()}`);
                }}
                variant="primary"
              >
                📄 Generate Contract
              </Button>
            </div>
          </>
        )}

        {/* Decision helper overlay */}
        {showDecisionHelper && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
            <div className="max-w-2xl w-full">
              <DecisionHelper
                onRecommendation={handleRecommendation}
                onClose={() => setShowDecisionHelper(false)}
              />
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}

function getStrategyName(strategy: string): string {
  switch (strategy) {
    case 'firm':
      return 'Option A: Stand Your Ground';
    case 'scope':
      return 'Option B: Adjust Scope';
    case 'compromise':
      return 'Option C: Meet in Middle';
    default:
      return '';
  }
}