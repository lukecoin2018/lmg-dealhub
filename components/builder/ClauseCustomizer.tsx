'use client';

import { useState, useEffect, useRef } from 'react';
import { useContract } from '@/contexts/ContractContext';
import { useWorkflow } from '@/contexts/WorkflowContext'; // ADD THIS
import { CLAUSE_LIBRARY } from '@/data/clauseLibrary';
import { ClauseVariable } from '@/lib/types/contract';

interface ClauseCustomizerProps {
  onNext: () => void;
  onBack: () => void;
}

export default function ClauseCustomizer({ onNext, onBack }: ClauseCustomizerProps) {
  const { contract, updateClause } = useContract();

  // Get selected sections from clause library
  const selectedSections = CLAUSE_LIBRARY
    .filter(section => contract.selectedSections.includes(section.id))
    .sort((a, b) => a.order - b.order);

  // State for current section being edited
  const [currentSectionIndex, setCurrentSectionIndex] = useState(0);
  const currentSection = selectedSections[currentSectionIndex];

  // State for selected variation per section
  const [selectedVariations, setSelectedVariations] = useState<Record<string, string>>(() => {
    const initial: Record<string, string> = {};
    selectedSections.forEach(section => {
      initial[section.id] = section.defaultVariationId;
    });
    return initial;
  });

  // State for variable values
  const [variableValues, setVariableValues] = useState<Record<string, Record<string, any>>>(() => {
    const initial: Record<string, Record<string, any>> = {};
    selectedSections.forEach(section => {
      const variation = section.variations.find((v: any) => v.id === section.defaultVariationId);
      if (variation) {
        initial[section.id] = {};
        variation.variables.forEach((variable: any) => {
          if (!variable.calculated) {
            initial[section.id][variable.id] = variable.defaultValue;
          }
        });
      }
    });
    return initial;
  });

  const handleVariationChange = (sectionId: string, variationId: string) => {
    setSelectedVariations(prev => ({ ...prev, [sectionId]: variationId }));
    
    // Reset variables for this section with new variation's defaults
    const section = CLAUSE_LIBRARY.find(s => s.id === sectionId);
    const variation = section?.variations.find((v: any) => v.id === variationId);
    if (variation) {
      const newValues: Record<string, any> = {};
      variation.variables.forEach((variable: any) => {
        if (!variable.calculated) {
          newValues[variable.id] = variable.defaultValue;
        }
      });
      setVariableValues(prev => ({ ...prev, [sectionId]: newValues }));
    }
  };
  
  const { contractData } = useWorkflow();

  // Pre-fill variables from workflow context when data arrives
  useEffect(() => {
    console.log('🔍 Debug - contractData:', contractData);
    console.log('🔍 Debug - contract.selectedSections:', contract.selectedSections);
    
    if (!contractData || contract.selectedSections.length === 0) {
      console.log('⏭️ Skipping - no data or no sections selected');
      return;
    }

    console.log('✅ Pre-filling data now!');
    
    const newValues: Record<string, Record<string, any>> = { ...variableValues };
    let hasChanges = false;
    
    // Pre-fill amount and deliverables in relevant sections
    CLAUSE_LIBRARY.forEach(section => {
      if (contract.selectedSections.includes(section.id)) {
        console.log('🔍 Debug - Processing section:', section.id);
        const variation = section.variations.find((v: any) => v.id === selectedVariations[section.id]);
        if (variation) {
          console.log('🔍 Debug - Found variation, variables:', variation.variables.map((v: any) => v.id));
          
          variation.variables.forEach((variable: any) => {
            // Only set if not already set
            const currentValue = newValues[section.id]?.[variable.id];
            
            if (variable.id === 'totalAmount' && contractData.dealValue && !currentValue) {
              if (!newValues[section.id]) newValues[section.id] = {};
              newValues[section.id][variable.id] = contractData.dealValue;
              hasChanges = true;
              console.log('✅ Set totalAmount:', contractData.dealValue);
            }
            if (variable.id === 'deliverables' && contractData.deliverables && !currentValue) {
              if (!newValues[section.id]) newValues[section.id] = {};
              newValues[section.id][variable.id] = contractData.deliverables.join(', ');
              hasChanges = true;
              console.log('✅ Set deliverables:', contractData.deliverables);
            }
            if (variable.id === 'brandName' && contractData.brandName && !currentValue) {
              if (!newValues[section.id]) newValues[section.id] = {};
              newValues[section.id][variable.id] = contractData.brandName;
              hasChanges = true;
              console.log('✅ Set brandName:', contractData.brandName);
            }
          });
        }
      }
    });
    
    if (hasChanges) {
      console.log('📝 Updating variableValues with:', newValues);
      setVariableValues(newValues);
    }
  }, [contractData, contract.selectedSections, selectedVariations]);

  const handleVariableChange = (sectionId: string, variableId: string, value: any) => {
    setVariableValues(prev => ({
      ...prev,
      [sectionId]: {
        ...prev[sectionId],
        [variableId]: value,
      },
    }));
  };

  const handleNext = () => {
    // Save current section's clause
    const variation = currentSection.variations.find(
      (v: any) => v.id === selectedVariations[currentSection.id]
    );
    
    if (variation) {
      updateClause({
        sectionId: currentSection.id,
        variationId: variation.id,
        variableValues: variableValues[currentSection.id] || {},
      });
    }

    // Move to next section or final step
    if (currentSectionIndex < selectedSections.length - 1) {
      setCurrentSectionIndex(prev => prev + 1);
    } else {
      // All sections completed, go to preview
      onNext();
    }
  };

  const handlePrevious = () => {
    if (currentSectionIndex > 0) {
      setCurrentSectionIndex(prev => prev - 1);
    } else {
      onBack();
    }
  };

  if (!currentSection) {
    return (
      <div className="max-w-5xl mx-auto text-center">
        <p className="text-text-tertiary mb-8">No sections selected</p>
        <button 
          onClick={onBack} 
          className="px-6 py-3 rounded-lg border-2 border-border-color text-text-primary hover:border-brand-yellow transition-colors"
        >
          ← Back to Section Selection
        </button>
      </div>
    );
  }

  const currentVariation = currentSection.variations.find(
    (v: any) => v.id === selectedVariations[currentSection.id]
  );

  const progress = ((currentSectionIndex + 1) / selectedSections.length) * 100;

  return (
    <div className="max-w-4xl mx-auto">
      {/* Progress */}
      <div className="mb-8">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm text-text-tertiary">
            Section {currentSectionIndex + 1} of {selectedSections.length}
          </span>
          <span className="text-sm text-text-tertiary">
            {Math.round(progress)}% Complete
          </span>
        </div>
        <div className="w-full bg-bg-tertiary rounded-full h-2">
          <div
            className="bg-brand-yellow h-2 rounded-full transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Section Header */}
      <div className="mb-8">
        <h2 className="text-3xl font-bold mb-2 text-text-primary">
          {currentSection.order}. {currentSection.title}
        </h2>
        <p className="text-xl text-text-tertiary mb-4">{currentSection.description}</p>
        
        {/* Explanation */}
        <div className="p-4 bg-brand-blue/10 border border-brand-blue/30 rounded-lg">
          <p className="text-sm text-text-secondary">
            <span className="font-semibold text-brand-blue">💡 Why this matters:</span>{' '}
            {currentSection.explanation}
          </p>
        </div>
      </div>

      {/* Variation Selector */}
      {currentSection.variations.length > 1 && (
        <div className="mb-8">
          <label className="block text-sm font-semibold mb-3 text-text-primary">
            Choose Your {currentSection.title} Option:
          </label>
          <div className="space-y-3">
          {currentSection.variations.map((variation: any) => (
              <button
                key={variation.id}
                onClick={() => handleVariationChange(currentSection.id, variation.id)}
                className={`w-full text-left p-4 rounded-lg border-2 transition-all ${
                  selectedVariations[currentSection.id] === variation.id
                    ? 'border-brand-yellow bg-brand-yellow/10'
                    : 'border-border-color bg-bg-secondary hover:border-brand-yellow/50'
                }`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h4 className="font-semibold text-text-primary mb-1">{variation.name}</h4>
                    <p className="text-sm text-text-tertiary">{variation.description}</p>
                  </div>
                  {selectedVariations[currentSection.id] === variation.id && (
                    <span className="text-brand-yellow text-xl ml-4">✓</span>
                  )}
                </div>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Variable Input Fields */}
      {currentVariation && (
        <div className="mb-8">
          <h3 className="text-lg font-semibold mb-4 text-text-primary">Fill in the Details:</h3>
          <div className="space-y-6">
            {currentVariation.variables
              .filter((v: any) => !v.calculated)
              .map((variable: any) => (
                <VariableInput
                  key={variable.id}
                  variable={variable}
                  value={variableValues[currentSection.id]?.[variable.id]}
                  onChange={(value) => handleVariableChange(currentSection.id, variable.id, value)}
                />
              ))}
          </div>
        </div>
      )}

      {/* Navigation */}
      <div className="flex justify-between items-center pt-8 border-t border-border-color">
        <button
          onClick={handlePrevious}
          className="px-6 py-3 rounded-lg font-semibold border-2 border-border-color text-text-primary hover:border-brand-yellow transition-colors"
        >
          ← {currentSectionIndex === 0 ? 'Back to Sections' : 'Previous Section'}
        </button>

        <button
          onClick={handleNext}
          className="px-8 py-3 rounded-lg font-semibold bg-brand-yellow text-black hover:opacity-90 transition-opacity"
        >
          {currentSectionIndex === selectedSections.length - 1
            ? 'Continue to Preview →'
            : 'Next Section →'}
        </button>
      </div>
    </div>
  );
}

// Variable Input Component
interface VariableInputProps {
  variable: ClauseVariable;
  value: any;
  onChange: (value: any) => void;
}

function VariableInput({ variable, value, onChange }: VariableInputProps) {
  const renderInput = () => {
    switch (variable.type) {
      case 'text':
        return (
          <input
            type="text"
            value={value || ''}
            onChange={(e) => onChange(e.target.value)}
            placeholder={variable.placeholder}
            className="w-full px-4 py-3 bg-bg-secondary border border-border-color rounded-lg text-text-primary placeholder-text-tertiary focus:border-brand-yellow focus:outline-none"
            required={variable.validation?.required}
          />
        );

      case 'number':
        return (
          <input
            type="number"
            value={value || ''}
            onChange={(e) => onChange(parseFloat(e.target.value) || 0)}
            placeholder={variable.placeholder}
            min={variable.validation?.min}
            max={variable.validation?.max}
            className="w-full px-4 py-3 bg-bg-secondary border border-border-color rounded-lg text-text-primary placeholder-text-tertiary focus:border-brand-yellow focus:outline-none"
            required={variable.validation?.required}
          />
        );

      case 'date':
        return (
          <input
            type="date"
            value={value || ''}
            onChange={(e) => onChange(e.target.value)}
            className="w-full px-4 py-3 bg-bg-secondary border border-border-color rounded-lg text-text-primary focus:border-brand-yellow focus:outline-none"
            required={variable.validation?.required}
          />
        );

      case 'select':
        return (
          <select
            value={value || ''}
            onChange={(e) => onChange(e.target.value)}
            className="w-full px-4 py-3 bg-bg-secondary border border-border-color rounded-lg text-text-primary focus:border-brand-yellow focus:outline-none"
            required={variable.validation?.required}
          >
            {variable.options?.map(option => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        );

      case 'textarea':
        return (
          <textarea
            value={value || ''}
            onChange={(e) => onChange(e.target.value)}
            placeholder={variable.placeholder}
            rows={4}
            className="w-full px-4 py-3 bg-bg-secondary border border-border-color rounded-lg text-text-primary placeholder-text-tertiary focus:border-brand-yellow focus:outline-none resize-none"
            required={variable.validation?.required}
          />
        );

      default:
        return null;
    }
  };

  return (
    <div>
      <label className="block text-sm font-medium mb-2 text-text-primary">
        {variable.label}
        {variable.validation?.required && (
          <span className="text-red-400 ml-1">*</span>
        )}
      </label>
      {renderInput()}
      {variable.helpText && (
        <p className="mt-1 text-sm text-text-tertiary">{variable.helpText}</p>
      )}
    </div>
  );
}