'use client';

import React from 'react';
import { Star } from 'lucide-react';
import clsx from 'clsx';

interface RatingStarsProps {
  rating: number;
  totalReviews?: number;
  size?: 'sm' | 'md' | 'lg';
  interactive?: boolean;
  onRating?: (rating: number) => void;
  showText?: boolean;
  className?: string;
}

/**
 * Flipkart-inspired Rating/Stars Component
 * Displays product rating with visual stars
 */
const RatingStars: React.FC<RatingStarsProps> = ({
  rating,
  totalReviews,
  size = 'md',
  interactive = false,
  onRating,
  showText = true,
  className,
}) => {
  const [hoverRating, setHoverRating] = React.useState<number | null>(null);

  const sizeStyles = {
    sm: { star: 'w-3 h-3', text: 'text-xs' },
    md: { star: 'w-4 h-4', text: 'text-sm' },
    lg: { star: 'w-5 h-5', text: 'text-base' },
  };

  const displayRating = hoverRating ?? rating;

  return (
    <div className={clsx('flex items-center gap-2', className)}>
      <div className="flex gap-0.5">
        {[1, 2, 3, 4, 5].map((star) => {
          const isFilled = star <= Math.floor(displayRating);
          const isHalf = star === Math.ceil(displayRating) && displayRating % 1 !== 0;

          return (
            <button
              key={star}
              type="button"
              disabled={!interactive}
              onMouseEnter={() => interactive && setHoverRating(star)}
              onMouseLeave={() => interactive && setHoverRating(null)}
              onClick={() => interactive && onRating?.(star)}
              className={clsx(
                sizeStyles[size].star,
                'transition-colors duration-200',
                interactive && 'cursor-pointer hover:scale-110',
                isFilled || isHalf ? 'text-accent' : 'text-gray-300'
              )}
            >
              <Star
                fill={isFilled ? 'currentColor' : isHalf ? 'currentColor' : 'none'}
                className="w-full h-full"
              />
            </button>
          );
        })}
      </div>

      {showText && (
        <div className={clsx('flex items-center gap-1', sizeStyles[size].text)}>
          <span className="font-semibold text-foreground">
            {displayRating.toFixed(1)}
          </span>
          {totalReviews && (
            <span className="text-muted-foreground">
              ({totalReviews.toLocaleString('en-IN')})
            </span>
          )}
        </div>
      )}
    </div>
  );
};

export default RatingStars;
