'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Heart, ShoppingCart, Zap } from 'lucide-react';
import clsx from 'clsx';
import { Product } from '@/lib/types';
import Button from './ui/button-base';
import PriceDisplay from './ui/price-display';
import RatingStars from './ui/rating-stars';
import Badge from './ui/badge-base';

interface FlipkartProductCardProps {
  product: Product;
  variant?: 'grid' | 'list' | 'compact';
  onClick?: () => void;
  onAddToCart?: () => void;
  onWishlist?: () => void;
  isWishlisted?: boolean;
  isLoading?: boolean;
}

/**
 * Flipkart-inspired Product Card
 * Used across product grid, listing, and carousel displays
 */
const FlipkartProductCard = React.forwardRef<HTMLDivElement, FlipkartProductCardProps>(
  (
    {
      product,
      variant = 'grid',
      onClick,
      onAddToCart,
      onWishlist,
      isWishlisted = false,
      isLoading = false,
    },
    ref
  ) => {
    const [imageLoading, setImageLoading] = useState(true);
    const [imageError, setImageError] = useState(false);

    const image = product.image?.[0] || product.thumbnail || '/placeholder.png';
    const discount = product.discount || 0;

    if (variant === 'compact') {
      return (
        <Link href={`/products/${product.id}`}>
          <div
            ref={ref}
            className={clsx(
              'rounded-lg bg-card overflow-hidden shadow-card hover:shadow-hover transition-all duration-200 cursor-pointer',
              'hover:scale-105 transform'
            )}
          >
            {/* Image */}
            <div className="relative aspect-square bg-gray-100 dark:bg-gray-800 overflow-hidden">
              {imageLoading && !imageError && (
                <div className="absolute inset-0 bg-gradient-to-br from-gray-200 to-gray-300 dark:from-gray-700 dark:to-gray-800 animate-pulse" />
              )}
              {!imageError && (
                <Image
                  src={image}
                  alt={product.name}
                  fill
                  className={clsx(
                    'object-cover group-hover:scale-110 transition-transform duration-300',
                    imageLoading ? 'opacity-0' : 'opacity-100'
                  )}
                  onLoadingComplete={() => setImageLoading(false)}
                  onError={() => {
                    setImageError(true);
                    setImageLoading(false);
                  }}
                />
              )}

              {/* Discount Badge */}
              {discount > 0 && (
                <div className="absolute top-2 right-2">
                  <Badge
                    variant="error"
                    size="sm"
                    text={`${discount}%`}
                  />
                </div>
              )}

              {/* Wishlist Button */}
              <button
                onClick={(e) => {
                  e.preventDefault();
                  onWishlist?.();
                }}
                className={clsx(
                  'absolute top-2 left-2 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-200',
                  isWishlisted
                    ? 'bg-error text-white'
                    : 'bg-white/80 hover:bg-white text-foreground'
                )}
              >
                <Heart
                  size={18}
                  fill={isWishlisted ? 'currentColor' : 'none'}
                />
              </button>

              {/* Fast Delivery Badge */}
              {product.fastDelivery && (
                <div className="absolute bottom-2 left-2">
                  <Badge variant="success" size="sm" text="⚡ Fast" />
                </div>
              )}
            </div>

            {/* Content */}
            <div className="p-2">
              <h3 className="text-xs font-medium text-foreground truncate-lines-2 mb-1">
                {product.name}
              </h3>
              <PriceDisplay
                originalPrice={product.originalPrice}
                salePrice={product.price}
                size="sm"
                showDiscount={true}
              />
            </div>
          </div>
        </Link>
      );
    }

    if (variant === 'list') {
      return (
        <Link href={`/products/${product.id}`}>
          <div
            ref={ref}
            className={clsx(
              'flex gap-4 p-4 rounded-lg bg-card border border-border shadow-card',
              'hover:shadow-hover transition-all duration-200 cursor-pointer'
            )}
          >
            {/* Image */}
            <div className="relative w-32 h-32 flex-shrink-0 bg-gray-100 dark:bg-gray-800 rounded-lg overflow-hidden">
              {imageLoading && !imageError && (
                <div className="absolute inset-0 bg-gradient-to-br from-gray-200 to-gray-300 dark:from-gray-700 dark:to-gray-800 animate-pulse" />
              )}
              {!imageError && (
                <Image
                  src={image}
                  alt={product.name}
                  fill
                  className={clsx(
                    'object-cover transition-transform duration-300 hover:scale-110',
                    imageLoading ? 'opacity-0' : 'opacity-100'
                  )}
                  onLoadingComplete={() => setImageLoading(false)}
                  onError={() => {
                    setImageError(true);
                    setImageLoading(false);
                  }}
                />
              )}
            </div>

            {/* Content */}
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between gap-2 mb-2">
                <div className="flex-1 min-w-0">
                  <h3 className="font-medium text-base text-foreground truncate-lines-2">
                    {product.name}
                  </h3>
                  <p className="text-sm text-muted-foreground mt-1 truncate">
                    By {product.brand}
                  </p>
                </div>
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    onWishlist?.();
                  }}
                  className="flex-shrink-0 p-2 hover:bg-muted rounded-full transition-colors duration-200"
                >
                  <Heart
                    size={20}
                    className={clsx(
                      'transition-colors duration-200',
                      isWishlisted
                        ? 'fill-error text-error'
                        : 'text-muted-foreground hover:text-foreground'
                    )}
                  />
                </button>
              </div>

              {/* Rating */}
              <div className="mb-3">
                <RatingStars
                  rating={product.rating}
                  totalReviews={product.reviews}
                  size="sm"
                  showText={true}
                />
              </div>

              {/* Description */}
              <p className="text-sm text-muted-foreground mb-3 truncate-lines-2">
                {product.description}
              </p>

              {/* Price & Action */}
              <div className="flex items-center justify-between">
                <PriceDisplay
                  originalPrice={product.originalPrice}
                  salePrice={product.price}
                  size="md"
                  showDiscount={true}
                />
                <Button
                  variant="primary"
                  size="md"
                  loading={isLoading}
                  onClick={(e) => {
                    e.preventDefault();
                    onAddToCart?.();
                  }}
                >
                  <ShoppingCart size={16} className="mr-2" />
                  Add
                </Button>
              </div>
            </div>
          </div>
        </Link>
      );
    }

    // Default Grid Variant
    return (
      <Link href={`/products/${product.id}`}>
        <div
          ref={ref}
          onClick={onClick}
          className={clsx(
            'rounded-lg bg-card overflow-hidden shadow-card',
            'hover:shadow-hover transition-all duration-200 cursor-pointer',
            'hover:scale-[1.02] transform'
          )}
        >
          {/* Image Container */}
          <div className="relative aspect-square bg-gray-100 dark:bg-gray-800 overflow-hidden group">
            {imageLoading && !imageError && (
              <div className="absolute inset-0 bg-gradient-to-br from-gray-200 to-gray-300 dark:from-gray-700 dark:to-gray-800 animate-pulse" />
            )}

            {!imageError && (
              <Image
                src={image}
                alt={product.name}
                fill
                className={clsx(
                  'object-cover transition-transform duration-300 group-hover:scale-110',
                  imageLoading ? 'opacity-0' : 'opacity-100'
                )}
                onLoadingComplete={() => setImageLoading(false)}
                onError={() => {
                  setImageError(true);
                  setImageLoading(false);
                }}
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              />
            )}

            {/* Overlay Actions on Hover */}
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-200 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200">
              <Button
                variant="primary"
                size="md"
                loading={isLoading}
                onClick={(e) => {
                  e.preventDefault();
                  onAddToCart?.();
                }}
                className="gap-2"
              >
                <ShoppingCart size={18} />
                Quick Add
              </Button>
            </div>

            {/* Badges */}
            <div className="absolute top-3 right-3 flex flex-col gap-2">
              {/* Discount Badge */}
              {discount > 0 && (
                <Badge variant="error" size="md" text={`${discount}% off`} />
              )}

              {/* Featured Badge */}
              {product.isFeatured && (
                <Badge variant="primary" size="md" text="Featured" />
              )}

              {/* New Arrival Badge */}
              {product.isNewArrival && (
                <Badge variant="info" size="md" text="New" />
              )}
            </div>

            {/* Fast Delivery Badge */}
            {product.fastDelivery && (
              <div className="absolute bottom-3 left-3 flex items-center gap-1 bg-success text-white px-2.5 py-1.5 rounded-md text-xs font-medium">
                <Zap size={14} />
                Fast Delivery
              </div>
            )}

            {/* Wishlist Button */}
            <button
              onClick={(e) => {
                e.preventDefault();
                onWishlist?.();
              }}
              className={clsx(
                'absolute top-3 left-3 w-9 h-9 rounded-full flex items-center justify-center transition-all duration-200 shadow-md',
                isWishlisted
                  ? 'bg-error text-white hover:bg-error/90'
                  : 'bg-white/90 hover:bg-white text-foreground'
              )}
              title={isWishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
            >
              <Heart
                size={20}
                fill={isWishlisted ? 'currentColor' : 'none'}
              />
            </button>

            {/* Seller Badge */}
            {product.seller?.verified && (
              <div className="absolute bottom-3 right-3">
                <Badge variant="success" size="sm" text="✓ Verified" />
              </div>
            )}
          </div>

          {/* Content */}
          <div className="p-3">
            {/* Brand */}
            <p className="text-xs text-muted-foreground font-medium mb-1">
              {product.brand}
            </p>

            {/* Title */}
            <h3 className="font-medium text-sm text-foreground mb-2 truncate-lines-2">
              {product.name}
            </h3>

            {/* Rating */}
            <div className="mb-2">
              <RatingStars
                rating={product.rating}
                totalReviews={product.reviews}
                size="sm"
                showText={true}
              />
            </div>

            {/* Price */}
            <div className="mb-3">
              <PriceDisplay
                originalPrice={product.originalPrice}
                salePrice={product.price}
                size="md"
                showDiscount={true}
              />
            </div>

            {/* Delivery Info */}
            {product.delivery && (
              <p className="text-xs text-muted-foreground mb-3">
                📦 {product.delivery}
              </p>
            )}

            {/* Custom Badges */}
            {product.badges && product.badges.length > 0 && (
              <div className="flex flex-wrap gap-1 mb-3">
                {product.badges.slice(0, 2).map((badge) => (
                  <Badge
                    key={badge}
                    variant="secondary"
                    size="sm"
                    text={badge}
                  />
                ))}
              </div>
            )}

            {/* Add to Cart Button */}
            <Button
              variant="outline"
              size="sm"
              fullWidth
              loading={isLoading}
              onClick={(e) => {
                e.preventDefault();
                onAddToCart?.();
              }}
              className="gap-2"
            >
              <ShoppingCart size={16} />
              Add to Cart
            </Button>
          </div>
        </div>
      </Link>
    );
  }
);

FlipkartProductCard.displayName = 'FlipkartProductCard';

export default FlipkartProductCard;
