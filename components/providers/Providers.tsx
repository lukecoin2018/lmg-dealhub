'use client';

import { ThemeProvider } from '@/contexts/ThemeContext';
import { ToastProvider } from '@/contexts/ToastContext';
import { WorkflowProvider } from '@/contexts/WorkflowContext';
import { SidebarProvider } from '@/contexts/SidebarContext';

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider>
      <SidebarProvider>
        <ToastProvider>
          <WorkflowProvider>
            {children}
          </WorkflowProvider>
        </ToastProvider>
      </SidebarProvider>
    </ThemeProvider>
  );
}