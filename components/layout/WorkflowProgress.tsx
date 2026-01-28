'use client';

import React from 'react';
import { useWorkflow } from '@/contexts/WorkflowContext';
import { Calculator, MessageSquare, FileText, Briefcase, Check } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export function WorkflowProgress() {
  const { calculatorData, negotiationData, contractData, dealData } = useWorkflow();
  const pathname = usePathname();

  const steps = [
    {
      name: 'Calculate Rate',
      href: '/calculator',
      icon: Calculator,
      completed: !!calculatorData,
    },
    {
      name: 'Negotiate',
      href: '/negotiate',
      icon: MessageSquare,
      completed: !!negotiationData,
    },
    {
      name: 'Contract',
      href: '/contracts/generate',
      icon: FileText,
      completed: !!contractData,
    },
    {
      name: 'Track Deal',
      href: '/deals',
      icon: Briefcase,
      completed: !!dealData,
    },
  ];

  // Don't show if we're on dashboard or if no workflow data exists
  const hasWorkflowData = calculatorData || negotiationData || contractData || dealData;
  if (pathname === '/dashboard' || !hasWorkflowData) {
    return null;
  }

  return (
    <div className="bg-surface border border-border rounded-xl p-4 mb-6">
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-sm font-semibold text-text-primary">Deal Workflow</h3>
        <span className="text-xs text-text-secondary">
          {steps.filter(s => s.completed).length} of {steps.length} complete
        </span>
      </div>
      
      <div className="flex items-center gap-2">
        {steps.map((step, index) => {
          const Icon = step.icon;
          const isActive = pathname.startsWith(step.href);
          const isCompleted = step.completed;

          return (
            <React.Fragment key={step.href}>
              <Link
                href={step.href}
                className={`
                  flex-1 flex items-center gap-2 p-3 rounded-lg
                  transition-all duration-200
                  ${
                    isActive
                      ? 'bg-brand-yellow/10 border-2 border-brand-yellow'
                      : isCompleted
                      ? 'bg-success/5 border-2 border-success/20 hover:bg-success/10'
                      : 'bg-surface-secondary border-2 border-transparent hover:border-border'
                  }
                `}
              >
                <div
                  className={`
                    w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0
                    ${
                      isActive
                        ? 'bg-brand-yellow text-gray-900'
                        : isCompleted
                        ? 'bg-success text-white'
                        : 'bg-surface border border-border text-text-tertiary'
                    }
                  `}
                >
                  {isCompleted && !isActive ? (
                    <Check className="w-4 h-4" />
                  ) : (
                    <Icon className="w-4 h-4" />
                  )}
                </div>
                <div className="flex-1 min-w-0 hidden sm:block">
                  <p
                    className={`
                      text-sm font-medium truncate
                      ${isActive ? 'text-brand-yellow' : 'text-text-primary'}
                    `}
                  >
                    {step.name}
                  </p>
                </div>
              </Link>

              {index < steps.length - 1 && (
                <div
                  className={`
                    h-0.5 w-4 flex-shrink-0
                    ${step.completed ? 'bg-success' : 'bg-border'}
                  `}
                />
              )}
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
}
