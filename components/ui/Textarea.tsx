import React from 'react';

interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  helperText?: string;
}

export function Textarea({ 
  label, 
  error, 
  helperText, 
  className = '',
  ...props 
}: TextareaProps) {
  return (
    <div className="space-y-2">
      {label && (
        <label className="block text-sm font-medium text-text-primary">
          {label}
        </label>
      )}
      <textarea
        className={`w-full px-4 py-3 bg-bg-secondary border rounded-lg text-text-primary placeholder-text-tertiary focus:outline-none focus:ring-2 focus:ring-brand-yellow transition-all resize-none ${
          error ? 'border-red-500' : 'border-border-color'
        } ${className}`}
        {...props}
      />
      {error && (
        <p className="text-sm text-red-500">{error}</p>
      )}
      {helperText && !error && (
        <p className="text-sm text-text-secondary">{helperText}</p>
      )}
    </div>
  );
}