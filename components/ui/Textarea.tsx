import React from 'react';

interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  helperText?: string;
  required?: boolean;
  showCharCount?: boolean;
  maxLength?: number;
}

export function Textarea({ 
  label, 
  error, 
  helperText,
  required,
  showCharCount = false,
  maxLength,
  className = '',
  value,
  ...props 
}: TextareaProps) {
  const currentLength = typeof value === 'string' ? value.length : 0;

  return (
    <div className="space-y-2">
      {label && (
        <label className="block text-sm font-medium text-[var(--color-text-primary)]">
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}
      
      <textarea
        className={`w-full px-4 py-3 bg-[var(--color-bg-secondary)] border rounded-lg text-[var(--color-text-primary)] placeholder-[var(--color-text-tertiary)] focus:outline-none focus:ring-2 focus:ring-brand-yellow transition-all resize-none disabled:opacity-60 disabled:cursor-not-allowed ${
          error ? 'border-red-500 focus:ring-red-500' : 'border-[var(--color-border)]'
        } ${className}`}
        required={required}
        maxLength={maxLength}
        value={value}
        {...props}
      />
      
      {(showCharCount && maxLength) && (
        <div className="flex justify-end">
          <span className={`text-xs ${
            currentLength > maxLength * 0.9 ? 'text-red-500' : 'text-[var(--color-text-tertiary)]'
          }`}>
            {currentLength} / {maxLength}
          </span>
        </div>
      )}
      
      {error && (
        <p className="text-sm text-red-500 flex items-center gap-1">
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
          </svg>
          {error}
        </p>
      )}
      
      {helperText && !error && (
        <p className="text-sm text-[var(--color-text-secondary)] flex items-center gap-1">
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
          </svg>
          {helperText}
        </p>
      )}
    </div>
  );
}