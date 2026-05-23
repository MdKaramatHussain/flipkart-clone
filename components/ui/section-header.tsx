'use client';

import React from 'react';
import clsx from 'clsx';

interface SectionHeaderProps {
  title: string;
  subtitle?: string;
  action?: {
    label: string;
    onClick?: () => void;
    href?: string;
  };
  alignment?: 'left' | 'center';
  className?: string;
}

/**
 * Section Header Component
 * Displays section titles with optional action
 */
const SectionHeader: React.FC<SectionHeaderProps> = ({
  title,
  subtitle,
  action,
  alignment = 'left',
  className,
}) => {
  const alignmentStyles = {
    left: 'text-left',
    center: 'text-center',
  };

  return (
    <div
      className={clsx(
        'flex items-start justify-between mb-6',
        alignment === 'center' && 'flex-col items-center',
        className
      )}
    >
      {/* Title & Subtitle */}
      <div>
        <h2 className={clsx('text-2xl font-bold text-foreground', alignmentStyles[alignment])}>
          {title}
        </h2>
        {subtitle && (
          <p className={clsx('mt-1 text-sm text-muted-foreground', alignmentStyles[alignment])}>
            {subtitle}
          </p>
        )}
      </div>

      {/* Action */}
      {action && (
        <a
          href={action.href || '#'}
          onClick={(e) => {
            if (!action.href && action.onClick) {
              e.preventDefault();
              action.onClick();
            }
          }}
          className="mt-2 lg:mt-0 text-sm font-medium text-primary hover:underline transition-colors duration-200"
        >
          {action.label} →
        </a>
      )}
    </div>
  );
};

export default SectionHeader;
