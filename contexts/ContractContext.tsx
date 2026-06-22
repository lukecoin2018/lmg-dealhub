'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { ContractState, DealType, SelectedClause } from '@/lib/types/contract';

interface ContractContextType {
  contract: ContractState;
  updateDealType: (dealType: DealType) => void;
  updateParties: (parties: Partial<Pick<ContractState, 'creatorName' | 'creatorBusinessName' | 'brandName' | 'brandContactName'>>) => void;
  toggleSection: (sectionId: string) => void;
  updateClause: (clause: SelectedClause) => void;
  resetContract: () => void;
  loadDraft: (draft: ContractState) => void;
  saveDraft: () => void;
  saveToDatabase: () => Promise<void>;
}

const ContractContext = createContext<ContractContextType | undefined>(undefined);

const STORAGE_KEY = 'dealhub-contract-draft';

const initialContract: ContractState = {
  dealType: null,
  creatorName: '',
  creatorBusinessName: '',
  brandName: '',
  brandContactName: '',
  selectedSections: [],
  clauses: [],
  createdAt: new Date(),
  lastModified: new Date(),
};

export function ContractProvider({ children }: { children: ReactNode }) {
  const [contract, setContract] = useState<ContractState>(initialContract);

  // Load draft from localStorage on mount
  useEffect(() => {
    const savedDraft = localStorage.getItem(STORAGE_KEY);
    if (savedDraft) {
      try {
        const parsed = JSON.parse(savedDraft);
        // Convert date strings back to Date objects
        parsed.createdAt = new Date(parsed.createdAt);
        parsed.lastModified = new Date(parsed.lastModified);
        setContract(parsed);
      } catch (error) {
        console.error('Failed to load draft:', error);
      }
    }
  }, []);

  // Auto-save to localStorage whenever contract changes
  useEffect(() => {
    if (contract.dealType || contract.creatorName || contract.brandName) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(contract));
    }
  }, [contract]);

  const updateDealType = (dealType: DealType) => {
    setContract(prev => ({
      ...prev,
      dealType,
      lastModified: new Date(),
    }));
  };

  const updateParties = (parties: Partial<Pick<ContractState, 'creatorName' | 'creatorBusinessName' | 'brandName' | 'brandContactName'>>) => {
    setContract(prev => ({
      ...prev,
      ...parties,
      lastModified: new Date(),
    }));
  };

  const toggleSection = (sectionId: string) => {
    setContract(prev => {
      const isSelected = prev.selectedSections.includes(sectionId);
      
      if (isSelected) {
        // Remove section
        return {
          ...prev,
          selectedSections: prev.selectedSections.filter(id => id !== sectionId),
          clauses: prev.clauses.filter(c => c.sectionId !== sectionId),
          lastModified: new Date(),
        };
      } else {
        // Add section
        return {
          ...prev,
          selectedSections: [...prev.selectedSections, sectionId],
          lastModified: new Date(),
        };
      }
    });
  };

  const updateClause = (clause: SelectedClause) => {
    setContract(prev => {
      const existingIndex = prev.clauses.findIndex(c => c.sectionId === clause.sectionId);
      
      let newClauses;
      if (existingIndex >= 0) {
        // Update existing clause
        newClauses = [...prev.clauses];
        newClauses[existingIndex] = clause;
      } else {
        // Add new clause
        newClauses = [...prev.clauses, clause];
      }

      return {
        ...prev,
        clauses: newClauses,
        lastModified: new Date(),
      };
    });
  };

  const resetContract = () => {
    setContract(initialContract);
    localStorage.removeItem(STORAGE_KEY);
  };

  const loadDraft = (draft: ContractState) => {
    setContract(draft);
  };

  const saveDraft = () => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(contract));
  };

  const saveToDatabase = async () => {
    // No-op: database removed
  };

  return (
    <ContractContext.Provider
      value={{
        contract,
        updateDealType,
        updateParties,
        toggleSection,
        updateClause,
        resetContract,
        loadDraft,
        saveDraft,
        saveToDatabase,
      }}
    >
      {children}
    </ContractContext.Provider>
  );
}

export function useContract() {
  const context = useContext(ContractContext);
  if (context === undefined) {
    throw new Error('useContract must be used within a ContractProvider');
  }
  return context;
}