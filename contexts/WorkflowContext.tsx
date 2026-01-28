'use client';

import React, { createContext, useContext, useState, useCallback } from 'react';

export interface CalculatorData {
  followers: number;
  engagement: number;
  niche: string;
  recommendedRate: number;
  minRate: number;
  maxRate: number;
}

export interface NegotiationData {
  brandName: string;
  agreedRate: number;
  deliverables: string[];
  negotiationStage: 'initial' | 'counter' | 'objection' | 'stalled';
  emailTemplate?: string;
}

export interface ContractData {
  brandName: string;
  dealValue: number;
  deliverables: string[];
  deadline?: string;
  paymentTerms?: string;
  contractText?: string;
}

export interface DealData {
  brandName: string;
  dealValue: number;
  deliverables: string;
  deadline?: string;
  status: 'lead' | 'negotiating' | 'closed' | 'paid';
  notes?: string;
}

interface WorkflowContextType {
  // Calculator data
  calculatorData: CalculatorData | null;
  setCalculatorData: (data: CalculatorData) => void;
  
  // Negotiation data
  negotiationData: NegotiationData | null;
  setNegotiationData: (data: NegotiationData) => void;
  
  // Contract data
  contractData: ContractData | null;
  setContractData: (data: ContractData) => void;
  
  // Deal data
  dealData: DealData | null;
  setDealData: (data: DealData) => void;
  
  // Reset workflow
  resetWorkflow: () => void;
  
  // Get workflow completion percentage
  getWorkflowProgress: () => number;
}

const WorkflowContext = createContext<WorkflowContextType | undefined>(undefined);

export function WorkflowProvider({ children }: { children: React.ReactNode }) {
  const [calculatorData, setCalculatorDataState] = useState<CalculatorData | null>(null);
  const [negotiationData, setNegotiationDataState] = useState<NegotiationData | null>(null);
  const [contractData, setContractDataState] = useState<ContractData | null>(null);
  const [dealData, setDealDataState] = useState<DealData | null>(null);

  const setCalculatorData = useCallback((data: CalculatorData) => {
    setCalculatorDataState(data);
    // Persist to localStorage
    localStorage.setItem('dealhub-calculator', JSON.stringify(data));
  }, []);

  const setNegotiationData = useCallback((data: NegotiationData) => {
    setNegotiationDataState(data);
    localStorage.setItem('dealhub-negotiation', JSON.stringify(data));
  }, []);

  const setContractData = useCallback((data: ContractData) => {
    setContractDataState(data);
    localStorage.setItem('dealhub-contract', JSON.stringify(data));
  }, []);

  const setDealData = useCallback((data: DealData) => {
    setDealDataState(data);
    localStorage.setItem('dealhub-deal', JSON.stringify(data));
  }, []);

  const resetWorkflow = useCallback(() => {
    setCalculatorDataState(null);
    setNegotiationDataState(null);
    setContractDataState(null);
    setDealDataState(null);
    localStorage.removeItem('dealhub-calculator');
    localStorage.removeItem('dealhub-negotiation');
    localStorage.removeItem('dealhub-contract');
    localStorage.removeItem('dealhub-deal');
  }, []);

  const getWorkflowProgress = useCallback(() => {
    let completed = 0;
    if (calculatorData) completed += 25;
    if (negotiationData) completed += 25;
    if (contractData) completed += 25;
    if (dealData) completed += 25;
    return completed;
  }, [calculatorData, negotiationData, contractData, dealData]);

  // Load from localStorage on mount
  React.useEffect(() => {
    const loadWorkflowData = () => {
      try {
        const calculator = localStorage.getItem('dealhub-calculator');
        const negotiation = localStorage.getItem('dealhub-negotiation');
        const contract = localStorage.getItem('dealhub-contract');
        const deal = localStorage.getItem('dealhub-deal');

        if (calculator) setCalculatorDataState(JSON.parse(calculator));
        if (negotiation) setNegotiationDataState(JSON.parse(negotiation));
        if (contract) setContractDataState(JSON.parse(contract));
        if (deal) setDealDataState(JSON.parse(deal));
      } catch (error) {
        console.error('Error loading workflow data:', error);
      }
    };

    loadWorkflowData();
  }, []);

  return (
    <WorkflowContext.Provider
      value={{
        calculatorData,
        setCalculatorData,
        negotiationData,
        setNegotiationData,
        contractData,
        setContractData,
        dealData,
        setDealData,
        resetWorkflow,
        getWorkflowProgress,
      }}
    >
      {children}
    </WorkflowContext.Provider>
  );
}

export function useWorkflow() {
  const context = useContext(WorkflowContext);
  if (context === undefined) {
    throw new Error('useWorkflow must be used within a WorkflowProvider');
  }
  return context;
}
