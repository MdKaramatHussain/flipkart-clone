'use client';

import React from 'react';
import { ButtonProps } from '@/lib/types';
import clsx from 'clsx';

interface BaseButtonProps extends ButtonProps {
  children: React.ReactNode;
  className?: string;
  type?: 'button' | 'submit' | 'reset';
  href?: string;
}

/**
 * Flipkart-inspired Button Component
 * Follows the design system with multiple variants and sizes
 */
const Button = React.forwardRef<HTMLButtonElement, BaseButtonProps>(
  (
    {
      variant = 'primary',
      size = 'md',
      fullWidth = false,
      loading = false,
      disabled = false,
      children,
      className,
      type = 'button',
      onClick,
      ...rest
    },
    ref
  ) => {
    const baseStyles = 'inline-flex items-center justify-center font-medium transition-all duration-200 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap';

    const variantStyles = {
      primary:
        'bg-primary text-primary-foreground hover:bg-primary/90 active:bg-primary/80 focus-visible:ring-primary',
      secondary:
        'bg-secondary text-secondary-foreground hover:bg-secondary/80 active:bg-secondary/70 focus-visible:ring-secondary',
      ghost:
        'text-primary hover:bg-primary/10 active:bg-primary/20 focus-visible:ring-primary',
      outline:
        'border border-border bg-background hover:bg-muted focus-visible:ring-primary',
      danger:
        'bg-destructive text-destructive-foreground hover:bg-destructive/90 active:bg-destructive/80 focus-visible:ring-destructive',
    };

    const sizeStyles = {
      sm: 'px-3 py-1.5 text-sm rounded-md',
      md: 'px-4 py-2 text-base rounded-md',
      lg: 'px-6 py-3 text-lg rounded-lg',
    };

    const buttonClasses = clsx(
      baseStyles,
      variantStyles[variant],
      sizeStyles[size],
      fullWidth && 'w-full',
      className
    );

    return (
      <button
        ref={ref}
        type={type}
        disabled={disabled || loading}
        onClick={onClick}
        className={buttonClasses}
        {...rest}
      >
        {loading && (
          <svg
            className="w-4 h-4 mr-2 animate-spin"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
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
        )}
        {children}
      </button>
    );
  }
);

Button.displayName = 'Button';

export default Button;
