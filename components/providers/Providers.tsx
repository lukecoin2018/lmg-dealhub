'use client';

import { ThemeProvider } from '@/contexts/ThemeContext';
import { ToastProvider } from '@/contexts/ToastContext';
import { WorkflowProvider } from '@/contexts/WorkflowContext';

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider>
      <ToastProvider>
        <WorkflowProvider>
          {children}
        </WorkflowProvider>
      </ToastProvider>
    </ThemeProvider>
  );
}