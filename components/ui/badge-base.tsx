'use client';

import React from 'react';
import { BadgeProps } from '@/lib/types';
import clsx from 'clsx';

interface BaseBadgeProps extends BadgeProps {
  className?: string;
}

/**
 * Flipkart-inspired Badge Component
 * For labels, tags, and status indicators
 */
const Badge = React.forwardRef<HTMLDivElement, BaseBadgeProps>(
  ({ variant = 'primary', size = 'md', text, className, ...rest }, ref) => {
    const baseStyles = 'inline-flex items-center justify-center rounded-full font-medium whitespace-nowrap';

    const variantStyles = {
      primary: 'bg-primary text-primary-foreground',
      secondary: 'bg-secondary text-secondary-foreground',
      success: 'bg-success-light text-success',
      error: 'bg-error-light text-error',
      warning: 'bg-warning-light text-warning',
      info: 'bg-info-light text-info',
    };

    const sizeStyles = {
      sm: 'px-2 py-0.5 text-xs',
      md: 'px-2.5 py-1 text-sm',
      lg: 'px-3 py-1.5 text-base',
    };

    const badgeClasses = clsx(
      baseStyles,
      variantStyles[variant],
      sizeStyles[size],
      className
    );

    return (
      <div ref={ref} className={badgeClasses} {...rest}>
        {text}
      </div>
    );
  }
);

Badge.displayName = 'Badge';

export default Badge;
