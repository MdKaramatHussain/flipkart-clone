'use client';

import React from 'react';
import clsx from 'clsx';

interface SkeletonLoaderProps {
  width?: string | number;
  height?: string | number;
  borderRadius?: string;
  count?: number;
  className?: string;
  variant?: 'rect' | 'circle' | 'text';
  spacing?: 'sm' | 'md' | 'lg';
}

/**
 * Skeleton Loading Component
 * For showing loading state while content is being fetched
 */
const SkeletonLoader: React.FC<SkeletonLoaderProps> = ({
  width = '100%',
  height = '20px',
  borderRadius = '6px',
  count = 1,
  className,
  variant = 'rect',
  spacing = 'md',
}) => {
  const variantStyles = {
    rect: 'rounded-md',
    circle: 'rounded-full',
    text: 'rounded-sm',
  };

  const spacingStyles = {
    sm: 'gap-2 mb-2',
    md: 'gap-3 mb-3',
    lg: 'gap-4 mb-4',
  };

  const skeletonItem = clsx(
    'bg-gray-200 dark:bg-gray-700 animate-pulse',
    variantStyles[variant],
    className
  );

  if (variant === 'circle') {
    return (
      <div className={clsx('flex gap-2', spacingStyles[spacing])}>
        {Array.from({ length: count }).map((_, i) => (
          <div
            key={i}
            className={skeletonItem}
            style={{
              width: typeof width === 'number' ? `${width}px` : width,
              height: typeof height === 'number' ? `${height}px` : height,
              borderRadius: '50%',
            }}
          />
        ))}
      </div>
    );
  }

  if (variant === 'text') {
    return (
      <div className={clsx('flex flex-col', spacingStyles[spacing])}>
        {Array.from({ length: count }).map((_, i) => {
          const randomWidth = Math.random() * 40 + 60; // 60-100%
          return (
            <div
              key={i}
              className={skeletonItem}
              style={{
                width: `${randomWidth}%`,
                height: typeof height === 'number' ? `${height}px` : height,
              }}
            />
          );
        })}
      </div>
    );
  }

  return (
    <div className={clsx('flex flex-col', spacingStyles[spacing])}>
      {Array.from({ length: count }).map((_, i) => (
        <div
          key={i}
          className={skeletonItem}
          style={{
            width: typeof width === 'number' ? `${width}px` : width,
            height: typeof height === 'number' ? `${height}px` : height,
          }}
        />
      ))}
    </div>
  );
};

export default SkeletonLoader;
