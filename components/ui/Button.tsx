import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'outline';
  children: React.ReactNode;
}

export function Button({ 
  variant = 'primary', 
  children, 
  className = '',
  ...props 
}: ButtonProps) {
  const baseStyles = "px-6 py-3 rounded-lg font-semibold transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed";
  
  const variants = {
    primary: "bg-brand-yellow text-black hover:opacity-90",
    secondary: "bg-bg-secondary text-text-primary border border-border-color hover:bg-bg-tertiary",
    ghost: "text-text-primary hover:bg-bg-secondary",
    outline: "border-2 border-brand-blue text-brand-blue hover:bg-brand-blue/10"
  };

  return (
    <button 
      className={`${baseStyles} ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}