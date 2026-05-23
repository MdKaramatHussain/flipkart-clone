'use client';

import React from 'react';
import clsx from 'clsx';

interface PriceDisplayProps {
  originalPrice?: number;
  salePrice: number;
  showDiscount?: boolean;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

/**
 * Flipkart-inspired Price Display Component
 * Shows sale price, original price, and discount percentage
 */
const PriceDisplay: React.FC<PriceDisplayProps> = ({
  originalPrice,
  salePrice,
  showDiscount = true,
  size = 'md',
  className,
}) => {
  const discount = originalPrice
    ? Math.round(((originalPrice - salePrice) / originalPrice) * 100)
    : 0;

  const sizeStyles = {
    sm: {
      price: 'text-sm',
      originalPrice: 'text-xs',
      discount: 'text-xs',
    },
    md: {
      price: 'text-lg',
      originalPrice: 'text-sm',
      discount: 'text-sm',
    },
    lg: {
      price: 'text-2xl',
      originalPrice: 'text-lg',
      discount: 'text-base',
    },
  };

  return (
    <div className={clsx('flex items-center gap-2', className)}>
      {/* Sale Price */}
      <span className={clsx('font-bold text-primary', sizeStyles[size].price)}>
        ₹{salePrice.toLocaleString('en-IN')}
      </span>

      {/* Original Price */}
      {originalPrice && (
        <span className={clsx('text-muted-foreground line-through', sizeStyles[size].originalPrice)}>
          ₹{originalPrice.toLocaleString('en-IN')}
        </span>
      )}

      {/* Discount Badge */}
      {showDiscount && discount > 0 && (
        <span className={clsx('font-semibold text-discount', sizeStyles[size].discount)}>
          {discount}% off
        </span>
      )}
    </div>
  );
};

export default PriceDisplay;
