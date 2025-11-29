'use client';

import React from 'react';
import Icon from './AppIcon';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'accent' | 'outline' | 'ghost' | 'destructive';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  isLoading?: boolean;
  leftIcon?: string;
  rightIcon?: string;
  fullWidth?: boolean;
  children: React.ReactNode;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = 'primary',
      size = 'md',
      isLoading = false,
      leftIcon,
      rightIcon,
      fullWidth = false,
      className = '',
      disabled,
      children,
      ...props
    },
    ref
  ) => {
    const baseStyles = 'inline-flex items-center justify-center font-medium transition-all duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:pointer-events-none rounded-lg';

    const variantStyles = {
      primary: 'bg-primary text-primary-foreground hover:bg-primary/90 active:bg-primary/80 focus:ring-primary shadow-sm hover:shadow-md active:scale-[0.98]',
      secondary: 'bg-secondary text-secondary-foreground hover:bg-secondary/90 active:bg-secondary/80 focus:ring-secondary shadow-sm hover:shadow-md active:scale-[0.98]',
      accent: 'bg-accent text-accent-foreground hover:bg-accent/90 active:bg-accent/80 focus:ring-accent shadow-sm hover:shadow-md active:scale-[0.98]',
      outline: 'border-2 border-primary text-primary bg-transparent hover:bg-primary hover:text-primary-foreground active:bg-primary/90 focus:ring-primary active:scale-[0.98]',
      ghost: 'text-primary bg-transparent hover:bg-primary/10 active:bg-primary/20 focus:ring-primary',
      destructive: 'bg-destructive text-destructive-foreground hover:bg-destructive/90 active:bg-destructive/80 focus:ring-destructive shadow-sm hover:shadow-md active:scale-[0.98]',
    };

    const sizeStyles = {
      sm: 'text-sm px-3 py-1.5 gap-1.5',
      md: 'text-base px-4 py-2 gap-2',
      lg: 'text-lg px-6 py-3 gap-2.5',
      xl: 'text-xl px-8 py-4 gap-3',
    };

    const iconSizes = {
      sm: 16,
      md: 20,
      lg: 24,
      xl: 28,
    };

    return (
      <button
        ref={ref}
        className={`
          ${baseStyles}
          ${variantStyles[variant]}
          ${sizeStyles[size]}
          ${fullWidth ? 'w-full' : ''}
          ${className}
        `}
        disabled={disabled || isLoading}
        {...props}
      >
        {isLoading ? (
          <>
            <svg
              className="animate-spin"
              width={iconSizes[size]}
              height={iconSizes[size]}
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              />
            </svg>
            <span>Lädt...</span>
          </>
        ) : (
          <>
            {leftIcon && <Icon name={leftIcon} size={iconSizes[size]} />}
            {children}
            {rightIcon && <Icon name={rightIcon} size={iconSizes[size]} />}
          </>
        )}
      </button>
    );
  }
);

Button.displayName = 'Button';

export default Button;

