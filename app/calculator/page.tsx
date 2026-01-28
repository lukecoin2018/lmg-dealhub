"use client";

import { useState } from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { FormStepBasics } from "@/components/calculator/FormStepBasics";
import { FormStepContent } from "@/components/calculator/FormStepContent";
import { FormStepRights } from "@/components/calculator/FormStepRights";
import { FormStepFinal } from "@/components/calculator/FormStepFinal";
import { ResultsPage } from "@/components/calculator/ResultsPage";
import { CalculatorInput, Deliverable } from "@/lib/types/calculator";
import { calculateRate } from "@/lib/calculator-engine";

export default function CalculatorPage() {
  const [currentStep, setCurrentStep] = useState(1);
  const [showResults, setShowResults] = useState(false);
  
  const [formData, setFormData] = useState<CalculatorInput>({
    // Basics
    followers: 50000,
    engagementRate: 4.0,
    niche: "lifestyle",
    
    // Deliverables (NEW: array instead of single values)
    deliverables: [
      {
        id: "1",
        platform: "instagram",
        contentType: "reel-standard",
        quantity: 1,
      },
    ],
    
    // Rights
    usageType: "organic",
    usageDuration: 30,
    hasWhitelisting: false,
    exclusivityDays: 0,
    isLongTermPartnership: false,
    
    // Final
    hasPaymentTerms: true,
    revisionRounds: 2,
  });

  const handleChange = (field: string, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleDeliverablesChange = (deliverables: Deliverable[]) => {
    setFormData((prev) => ({ ...prev, deliverables }));
  };

  const handleNext = () => {
    if (currentStep < 4) {
      setCurrentStep(currentStep + 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      // Validate that we have at least one deliverable
      if (formData.deliverables.length === 0) {
        alert("Please add at least one deliverable before calculating.");
        return;
      }
      
      // Calculate and show results
      setShowResults(true);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handleBack = () => {
    if (showResults) {
      setShowResults(false);
    } else if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleStartOver = () => {
    setShowResults(false);
    setCurrentStep(1);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (showResults) {
    const result = calculateRate(formData);
    return (
      <DashboardLayout>
        <div className="max-w-5xl mx-auto">
        <ResultsPage result={result} formData={formData} onStartOver={handleStartOver} onBack={handleBack} />
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-text-primary mb-2">
            Rate Calculator
          </h1>
          <p className="text-text-secondary">
            Calculate what you're actually worth. No guesswork, just math.
          </p>
        </div>

        <ProgressBar currentStep={currentStep} totalSteps={4} />

        <div className="bg-bg-secondary border border-border-color rounded-xl p-8">
          {currentStep === 1 && (
            <FormStepBasics
              followers={formData.followers}
              engagementRate={formData.engagementRate}
              niche={formData.niche}
              onChange={handleChange}
            />
          )}

          {currentStep === 2 && (
            <FormStepContent
              deliverables={formData.deliverables}
              onChange={handleDeliverablesChange}
            />
          )}

          {currentStep === 3 && (
            <FormStepRights
              usageType={formData.usageType}
              usageDuration={formData.usageDuration}
              hasWhitelisting={formData.hasWhitelisting}
              exclusivityDays={formData.exclusivityDays}
              isLongTermPartnership={formData.isLongTermPartnership}
              onChange={handleChange}
            />
          )}

          {currentStep === 4 && (
            <FormStepFinal
              hasPaymentTerms={formData.hasPaymentTerms ?? true}
              revisionRounds={formData.revisionRounds ?? 2}
              onChange={handleChange}
            />
          )}

          {/* Navigation */}
          <div className="flex items-center justify-between mt-8 pt-6 border-t border-border-color">
            <button
              onClick={handleBack}
              disabled={currentStep === 1}
              className="px-6 py-3 bg-bg-primary text-text-primary border border-border-color rounded-lg font-medium hover:bg-bg-tertiary transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              ← Back
            </button>

            <button 
              onClick={handleNext} 
              className="px-6 py-3 bg-brand-yellow text-black rounded-lg font-semibold hover:opacity-90 transition-all"
            >
              {currentStep === 4 ? "Calculate My Rate 🚀" : "Next →"}
            </button>
          </div>
        </div>

        {/* Trust Indicators */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center">
            <div className="text-3xl font-bold text-brand-yellow">1,247+</div>
            <div className="text-sm text-text-secondary mt-1">Creator Deals Analyzed</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-brand-pink">$2.4M+</div>
            <div className="text-sm text-text-secondary mt-1">In Fair Rates Calculated</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-brand-blue">94%</div>
            <div className="text-sm text-text-secondary mt-1">Accuracy Rate</div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}