'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Heart, ShoppingCart, Star, Zap, TrendingUp, Award } from 'lucide-react';
import { useCartStore } from '@/store/useStore';
import { useWishlistStore } from '@/store/useStore';
import { COLORS } from '@/constants/colors';
import type { Product } from '@/lib/types';

interface ProductCardProps {
  product: Product;
  variant?: 'default' | 'compact';
}

/**
 * Enhanced Product Card Component
 * Displays product with Flipkart-style layout and interactions
 */
export function ProductCard({ product, variant = 'default' }: ProductCardProps) {
  const [isAdding, setIsAdding] = useState(false);
  const [showQuickView, setShowQuickView] = useState(false);
  const addToCart = useCartStore((state) => state.addToCart);
  const { isInWishlist, addToWishlist, removeFromWishlist } = useWishlistStore();

  const handleAddToCart = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsAdding(true);
    await new Promise((resolve) => setTimeout(resolve, 300));
    addToCart({
      productId: product.id,
      quantity: 1,
      price: product.price,
    });
    setIsAdding(false);
  };

  const handleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (isInWishlist(product.id)) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist(product.id);
    }
  };

  const inWishlist = isInWishlist(product.id);
  const imageUrl = Array.isArray(product.image) ? product.image[0] : product.image;
  const discount = product.originalPrice > 0 
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  if (variant === 'compact') {
    return (
      <Link href={`/products/${product.id}`}>
        <div 
          className="group rounded-lg border bg-white hover:shadow-md transition-shadow duration-200 overflow-hidden h-full flex flex-col"
          style={{ borderColor: COLORS.border.light }}
        >
          {/* Image Section */}
          <div className="relative aspect-square bg-gray-100 overflow-hidden">
            <Image
              src={imageUrl}
              alt={product.name}
              fill
              className="object-cover group-hover:scale-110 transition-transform duration-300"
              sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
            />
            
            {/* Discount Badge */}
            {discount > 0 && (
              <div 
                className="absolute top-2 right-2 text-white text-xs font-bold px-2 py-1 rounded"
                style={{ backgroundColor: COLORS.semantic.discount }}
              >
                {discount}% OFF
              </div>
            )}

            {/* Badges */}
            {product.isFeatured && (
              <div className="absolute top-2 left-2 flex items-center gap-1 bg-yellow-400 text-xs font-bold px-2 py-1 rounded">
                <Zap className="w-3 h-3" /> Featured
              </div>
            )}
          </div>

          {/* Content Section */}
          <div className="p-3 flex-1 flex flex-col">
            <h3 className="font-medium text-sm line-clamp-2" style={{ color: COLORS.text.primary }}>
              {product.name}
            </h3>

            {/* Rating */}
            <div className="flex items-center gap-1 mt-2">
              <div className="flex items-center">
                {[...Array(Math.floor(product.rating))].map((_, i) => (
                  <Star key={i} className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
              <span className="text-xs" style={{ color: COLORS.text.secondary }}>
                ({product.reviews})
              </span>
            </div>

            {/* Price */}
            <div className="mt-auto pt-2 flex gap-2 items-baseline">
              <span className="text-sm font-bold" style={{ color: COLORS.primary.main }}>
                ₹{product.price.toLocaleString()}
              </span>
              <span className="text-xs line-through" style={{ color: COLORS.text.secondary }}>
                ₹{product.originalPrice.toLocaleString()}
              </span>
            </div>

            {/* Stock Status */}
            {product.stock === 0 && (
              <p className="text-xs text-red-600 mt-1 font-medium">Out of Stock</p>
            )}
            {product.fastDelivery && (
              <p className="text-xs text-green-600 mt-1 font-medium flex items-center gap-1">
                <Zap className="w-3 h-3" /> Fast Delivery
              </p>
            )}
          </div>
        </div>
      </Link>
    );
  }

  // Default variant - Full featured card
  return (
    <Link href={`/products/${product.id}`}>
      <div 
        className="group rounded-lg border bg-white hover:shadow-lg transition-all duration-200 overflow-hidden h-full flex flex-col"
        style={{ borderColor: COLORS.border.light }}
      >
        {/* Image Section */}
        <div className="relative aspect-square bg-gray-100 overflow-hidden">
          <Image
            src={imageUrl}
            alt={product.name}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />

          {/* Badges Container */}
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-200" />

          {/* Top Badges */}
          <div className="absolute top-3 left-3 right-3 flex flex-wrap gap-2">
            {discount > 0 && (
              <div 
                className="text-white text-xs font-bold px-2 py-1 rounded-full"
                style={{ backgroundColor: COLORS.semantic.discount }}
              >
                {discount}% OFF
              </div>
            )}
            {product.isFeatured && (
              <div className="flex items-center gap-1 bg-yellow-400 text-xs font-bold px-2 py-1 rounded-full">
                <Star className="w-3 h-3" /> Featured
              </div>
            )}
            {product.isTrending && (
              <div className="flex items-center gap-1 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                <TrendingUp className="w-3 h-3" /> Trending
              </div>
            )}
            {product.isNewArrival && (
              <div className="flex items-center gap-1 bg-blue-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                <Award className="w-3 h-3" /> New
              </div>
            )}
          </div>

          {/* Add to Cart Button - Shows on hover */}
          <div className="absolute bottom-0 left-0 right-0 p-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200 transform translate-y-4 group-hover:translate-y-0 transition-transform">
            <button
              onClick={handleAddToCart}
              disabled={isAdding || product.stock === 0}
              className="w-full py-2 rounded-lg font-semibold text-white transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              style={{ backgroundColor: COLORS.primary.main }}
            >
              <ShoppingCart className="w-4 h-4" />
              {isAdding ? 'Adding...' : 'Add to Cart'}
            </button>
          </div>

          {/* Wishlist Button */}
          <button
            onClick={handleWishlist}
            className="absolute top-3 right-3 p-2 rounded-full bg-white/90 hover:bg-white shadow-md transition-all hover:scale-110 z-10"
          >
            <Heart
              className={`w-5 h-5 transition-all ${
                inWishlist ? 'fill-red-500 text-red-500' : 'text-gray-600'
              }`}
            />
          </button>
        </div>

        {/* Content Section */}
        <div className="p-4 flex-1 flex flex-col">
          {/* Brand */}
          {product.seller && (
            <p className="text-xs font-medium" style={{ color: COLORS.text.secondary }}>
              {product.seller.name}
            </p>
          )}

          {/* Title */}
          <h3 className="font-semibold text-sm line-clamp-2 mt-1" style={{ color: COLORS.text.primary }}>
            {product.name}
          </h3>

          {/* Description */}
          <p className="text-xs mt-1 line-clamp-1" style={{ color: COLORS.text.secondary }}>
            {product.description}
          </p>

          {/* Rating and Reviews */}
          <div className="flex items-center gap-2 mt-2">
            <div className="flex items-center">
              {[...Array(Math.floor(product.rating))].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
              ))}
            </div>
            <span className="text-xs font-medium" style={{ color: COLORS.text.secondary }}>
              {product.rating}
            </span>
            <span className="text-xs" style={{ color: COLORS.text.secondary }}>
              ({product.reviews} reviews)
            </span>
          </div>

          {/* Offers */}
          {product.badges && product.badges.length > 0 && (
            <div className="flex flex-wrap gap-1 mt-2">
              {product.badges.slice(0, 2).map((badge, idx) => (
                <span
                  key={idx}
                  className="text-xs font-medium px-2 py-1 rounded"
                  style={{ backgroundColor: COLORS.semantic.featured, color: '#000' }}
                >
                  {badge}
                </span>
              ))}
            </div>
          )}

          {/* Price Section - Push to bottom */}
          <div className="mt-auto pt-3 space-y-2">
            <div className="flex gap-2 items-baseline">
              <span className="text-lg font-bold" style={{ color: COLORS.primary.main }}>
                ₹{product.price.toLocaleString()}
              </span>
              <span className="text-sm line-through" style={{ color: COLORS.text.secondary }}>
                ₹{product.originalPrice.toLocaleString()}
              </span>
            </div>

            {/* Stock and Delivery */}
            <div className="space-y-1 text-xs">
              {product.stock === 0 ? (
                <p className="text-red-600 font-medium">Out of Stock</p>
              ) : product.stock < 10 ? (
                <p className="text-orange-600 font-medium">Only {product.stock} left</p>
              ) : (
                <p className="text-green-600 font-medium">In Stock</p>
              )}

              {product.fastDelivery && (
                <p className="text-green-600 font-medium flex items-center gap-1">
                  <Zap className="w-3 h-3" /> Free Fast Delivery
                </p>
              )}

              {product.delivery && (
                <p style={{ color: COLORS.text.secondary }}>{product.delivery}</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
