'use client';

import { useState } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { ContractProvider, useContract } from '@/contexts/ContractContext';
import DealTypeSelector from '@/components/builder/DealTypeSelector';
import SectionSelector from '@/components/builder/SectionSelector';
import ClauseCustomizer from '@/components/builder/ClauseCustomizer';
import ContractPreview from '@/components/builder/ContractPreview';

type BuilderStep = 'deal-type' | 'sections' | 'customize' | 'preview';

function ContractBuilderContent() {
  const [currentStep, setCurrentStep] = useState<BuilderStep>('deal-type');
  const { contract } = useContract();

  const handleNext = () => {
    if (currentStep === 'deal-type') setCurrentStep('sections');
    else if (currentStep === 'sections') setCurrentStep('customize');
    else if (currentStep === 'customize') setCurrentStep('preview');
  };

  const handleBack = () => {
    if (currentStep === 'sections') setCurrentStep('deal-type');
    else if (currentStep === 'customize') setCurrentStep('sections');
    else if (currentStep === 'preview') setCurrentStep('customize');
  };

  return (
    <DashboardLayout>
      <div className="max-w-7xl mx-auto">
        {/* Header with Progress */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-text-primary mb-2">
            Contract Generator
          </h1>
          <p className="text-text-secondary mb-6">
            Build a professional influencer contract in minutes
          </p>

          {/* Progress Indicator */}
          <div className="flex items-center gap-2">
            <StepIndicator 
              step={1} 
              label="Deal Type" 
              active={currentStep === 'deal-type'} 
              completed={currentStep !== 'deal-type'} 
            />
            <div className="w-8 h-0.5 bg-border-color" />
            <StepIndicator 
              step={2} 
              label="Sections" 
              active={currentStep === 'sections'} 
              completed={currentStep === 'customize' || currentStep === 'preview'} 
            />
            <div className="w-8 h-0.5 bg-border-color" />
            <StepIndicator 
              step={3} 
              label="Customize" 
              active={currentStep === 'customize'} 
              completed={currentStep === 'preview'} 
            />
            <div className="w-8 h-0.5 bg-border-color" />
            <StepIndicator 
              step={4} 
              label="Preview" 
              active={currentStep === 'preview'} 
              completed={false} 
            />
          </div>
        </div>

        {/* Main Content */}
        <div>
          {currentStep === 'deal-type' && (
            <DealTypeSelector onNext={handleNext} />
          )}
          
          {currentStep === 'sections' && (
            <SectionSelector onNext={handleNext} onBack={handleBack} />
          )}
          
          {currentStep === 'customize' && (
            <ClauseCustomizer onNext={handleNext} onBack={handleBack} />
          )}
          
          {currentStep === 'preview' && (
            <ContractPreview onBack={handleBack} />
          )}
        </div>
      </div>
    </DashboardLayout>
  );
}

// Step Indicator Component
interface StepIndicatorProps {
  step: number;
  label: string;
  active: boolean;
  completed: boolean;
}

function StepIndicator({ step, label, active, completed }: StepIndicatorProps) {
  return (
    <div className="flex items-center gap-2">
      <div
        className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold transition-colors ${
          active
            ? 'bg-brand-yellow text-black'
            : completed
            ? 'bg-brand-blue text-white'
            : 'bg-bg-secondary border-2 border-border-color text-text-tertiary'
        }`}
      >
        {completed ? '✓' : step}
      </div>
      <span
        className={`text-sm font-medium hidden md:block ${
          active ? 'text-text-primary' : 'text-text-tertiary'
        }`}
      >
        {label}
      </span>
    </div>
  );
}

// Main export with Provider wrapper
export default function ContractBuilderPage() {
  return (
    <ContractProvider>
      <ContractBuilderContent />
    </ContractProvider>
  );
}