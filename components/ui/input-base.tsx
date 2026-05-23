'use client';

import React from 'react';
import { InputProps } from '@/lib/types';
import clsx from 'clsx';

interface BaseInputProps extends InputProps {
  type?: string;
  className?: string;
}

/**
 * Flipkart-inspired Input Component
 * Reusable text input with variants and error states
 */
const Input = React.forwardRef<HTMLInputElement, BaseInputProps>(
  (
    {
      variant = 'default',
      size = 'md',
      fullWidth = false,
      disabled = false,
      error,
      placeholder,
      value,
      onChange,
      type = 'text',
      className,
      ...rest
    },
    ref
  ) => {
    const baseStyles =
      'rounded-md border bg-input text-foreground placeholder:text-muted-foreground transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50';

    const variantStyles = {
      default:
        'border-border hover:border-border/80 focus-visible:border-primary',
      outlined:
        'border-2 border-border hover:border-primary/50 focus-visible:border-primary',
      filled: 'border-b border-border bg-secondary hover:bg-secondary/80 rounded-b-md rounded-t-none focus-visible:border-primary',
    };

    const sizeStyles = {
      sm: 'px-2.5 py-1.5 text-sm h-8',
      md: 'px-3 py-2 text-base h-10',
      lg: 'px-4 py-3 text-lg h-12',
    };

    const inputClasses = clsx(
      baseStyles,
      variantStyles[variant],
      sizeStyles[size],
      error && 'border-destructive focus-visible:ring-destructive',
      fullWidth && 'w-full',
      className
    );

    return (
      <div className={fullWidth ? 'w-full' : ''}>
        <input
          ref={ref}
          type={type}
          disabled={disabled}
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange?.(e.target.value)}
          className={inputClasses}
          {...rest}
        />
        {error && (
          <p className="mt-1 text-xs text-destructive">{error}</p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';

export default Input;
