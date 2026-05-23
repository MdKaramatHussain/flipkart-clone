'use client';

import React from 'react';
import { AlertCircle, Search } from 'lucide-react';
import clsx from 'clsx';

interface EmptyStateProps {
  type?: 'search' | 'error' | 'no-data' | 'no-items';
  title: string;
  description?: string;
  icon?: React.ReactNode;
  action?: {
    label: string;
    onClick: () => void;
  };
  className?: string;
}

/**
 * Empty State Component
 * Shows when there are no results or items to display
 */
const EmptyState: React.FC<EmptyStateProps> = ({
  type = 'no-data',
  title,
  description,
  icon,
  action,
  className,
}) => {
  const defaultIcons = {
    search: <Search className="w-16 h-16 text-muted-foreground" />,
    error: <AlertCircle className="w-16 h-16 text-destructive" />,
    'no-data': <AlertCircle className="w-16 h-16 text-muted-foreground" />,
    'no-items': <Search className="w-16 h-16 text-muted-foreground" />,
  };

  return (
    <div
      className={clsx(
        'flex flex-col items-center justify-center py-12 px-4 text-center',
        className
      )}
    >
      {/* Icon */}
      <div className="mb-4">
        {icon || defaultIcons[type]}
      </div>

      {/* Title */}
      <h3 className="mb-2 text-lg font-semibold text-foreground">
        {title}
      </h3>

      {/* Description */}
      {description && (
        <p className="mb-6 text-sm text-muted-foreground max-w-md">
          {description}
        </p>
      )}

      {/* Action Button */}
      {action && (
        <button
          onClick={action.onClick}
          className="px-4 py-2 text-sm font-medium text-primary hover:bg-primary/10 rounded-md transition-colors duration-200"
        >
          {action.label}
        </button>
      )}
    </div>
  );
};

export default EmptyState;
