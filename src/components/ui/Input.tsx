'use client';

import React, { forwardRef } from 'react';
import Icon from './AppIcon';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
  leftIcon?: string;
  rightIcon?: string;
  fullWidth?: boolean;
  variant?: 'default' | 'official';
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      label,
      error,
      helperText,
      leftIcon,
      rightIcon,
      fullWidth = false,
      variant = 'default',
      className = '',
      id,
      ...props
    },
    ref
  ) => {
    const inputId = id || `input-${Math.random().toString(36).substr(2, 9)}`;

    const baseStyles = 'w-full px-4 py-2.5 text-base border rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-1 disabled:opacity-50 disabled:cursor-not-allowed disabled:bg-slate-50';
    
    const variantStyles = {
      default: error
        ? 'border-error focus:border-error focus:ring-error/20 text-error'
        : 'border-border focus:border-primary focus:ring-primary/20 text-text-primary bg-white hover:border-primary/50',
      official: error
        ? 'border-l-4 border-error focus:border-l-8 focus:border-error focus:ring-error/20 text-error'
        : 'border-l-4 border-brand-primary focus:border-l-8 focus:border-brand-secondary focus:ring-brand-secondary/20 text-text-primary bg-white hover:border-brand-secondary',
    };

    return (
      <div className={`${fullWidth ? 'w-full' : ''}`}>
        {label && (
          <label
            htmlFor={inputId}
            className="block text-sm font-medium text-text-primary mb-1.5"
          >
            {label}
            {props.required && <span className="text-error ml-1">*</span>}
          </label>
        )}
        
        <div className="relative">
          {leftIcon && (
            <div className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none">
              <Icon name={leftIcon} size={20} className="text-text-secondary" />
            </div>
          )}
          
          <input
            ref={ref}
            id={inputId}
            className={`
              ${baseStyles}
              ${variantStyles[variant]}
              ${leftIcon ? 'pl-11' : ''}
              ${rightIcon ? 'pr-11' : ''}
              ${className}
            `}
            aria-invalid={error ? 'true' : 'false'}
            aria-describedby={error ? `${inputId}-error` : helperText ? `${inputId}-helper` : undefined}
            {...props}
          />
          
          {rightIcon && (
            <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
              <Icon name={rightIcon} size={20} className="text-text-secondary" />
            </div>
          )}
          
          {error && (
            <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
              <Icon name="ExclamationCircleIcon" size={20} className="text-error" />
            </div>
          )}
        </div>
        
        {error && (
          <p id={`${inputId}-error`} className="mt-1.5 text-sm text-error flex items-center gap-1">
            <Icon name="ExclamationCircleIcon" size={16} />
            {error}
          </p>
        )}
        
        {!error && helperText && (
          <p id={`${inputId}-helper`} className="mt-1.5 text-sm text-text-secondary">
            {helperText}
          </p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';

export default Input;

