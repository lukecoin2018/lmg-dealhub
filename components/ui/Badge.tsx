'use client';

import React from 'react';

export interface BadgeProps {
  children: React.ReactNode;
  variant?: 'default' | 'success' | 'warning' | 'error' | 'info' | 'brand';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export function Badge({ 
  children, 
  variant = 'default',
  size = 'md',
  className = '' 
}: BadgeProps) {
  const baseStyles = 'inline-flex items-center justify-center font-medium rounded-full';
  
  const variants = {
    default: 'bg-surface-secondary text-text-secondary border border-border',
    success: 'bg-success/10 text-success',
    warning: 'bg-warning/10 text-warning',
    error: 'bg-error/10 text-error',
    info: 'bg-info/10 text-info',
    brand: 'bg-brand-yellow/10 text-brand-yellow',
  };
  
  const sizes = {
    sm: 'px-2 py-0.5 text-xs',
    md: 'px-3 py-1 text-sm',
    lg: 'px-4 py-1.5 text-base',
  };

  return (
    <span className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}>
      {children}
    </span>
  );
}

export interface StatusBadgeProps {
  status: 'lead' | 'negotiating' | 'closed' | 'paid';
  className?: string;
}

export function StatusBadge({ status, className = '' }: StatusBadgeProps) {
  const statusConfig = {
    lead: {
      label: 'Lead',
      color: 'bg-blue-500/10 text-blue-500',
      dot: 'bg-blue-500',
    },
    negotiating: {
      label: 'Negotiating',
      color: 'bg-warning/10 text-warning',
      dot: 'bg-warning',
    },
    closed: {
      label: 'Closed',
      color: 'bg-success/10 text-success',
      dot: 'bg-success',
    },
    paid: {
      label: 'Paid',
      color: 'bg-brand-pink/10 text-brand-pink',
      dot: 'bg-brand-pink',
    },
  };

  const config = statusConfig[status];

  return (
    <span className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium ${config.color} ${className}`}>
      <span className={`w-2 h-2 rounded-full ${config.dot}`} />
      {config.label}
    </span>
  );
}
