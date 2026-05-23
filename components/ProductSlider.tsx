'use client';

import React, { useRef, useEffect, useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { ProductCard } from './ProductCard';
import type { Product } from '@/lib/types';

interface ProductSliderProps {
  products: Product[];
  title: string;
  description?: string;
  showArrows?: boolean;
  scrollAmount?: number;
}

/**
 * Horizontal Product Slider Component
 * Displays products in a scrollable carousel
 */
export const ProductSlider: React.FC<ProductSliderProps> = ({
  products,
  title,
  description,
  showArrows = true,
  scrollAmount = 300,
}) => {
  const sliderRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const checkScroll = () => {
    if (sliderRef.current) {
      setCanScrollLeft(sliderRef.current.scrollLeft > 0);
      setCanScrollRight(
        sliderRef.current.scrollLeft < sliderRef.current.scrollWidth - sliderRef.current.clientWidth - 10
      );
    }
  };

  useEffect(() => {
    checkScroll();
    const slider = sliderRef.current;
    if (slider) {
      slider.addEventListener('scroll', checkScroll);
      window.addEventListener('resize', checkScroll);
      return () => {
        slider.removeEventListener('scroll', checkScroll);
        window.removeEventListener('resize', checkScroll);
      };
    }
  }, []);

  const scroll = (direction: 'left' | 'right') => {
    if (sliderRef.current) {
      const scrollLeft = direction === 'left' ? -scrollAmount : scrollAmount;
      sliderRef.current.scrollBy({
        left: scrollLeft,
        behavior: 'smooth',
      });
    }
  };

  return (
    <div className="w-full bg-white rounded-lg shadow-sm border border-border p-4 sm:p-6">
      {/* Header */}
      <div className="mb-4">
        <h2 className="text-xl sm:text-2xl font-bold text-gray-900">{title}</h2>
        {description && <p className="text-sm text-gray-600 mt-1">{description}</p>}
      </div>

      {/* Slider Container */}
      <div className="relative group">
        {/* Left Arrow */}
        {showArrows && canScrollLeft && (
          <button
            onClick={() => scroll('left')}
            className="absolute -left-3 top-1/2 -translate-y-1/2 z-10 p-2 rounded-full bg-white shadow-lg hover:shadow-xl transition-shadow hidden group-hover:block"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
        )}

        {/* Right Arrow */}
        {showArrows && canScrollRight && (
          <button
            onClick={() => scroll('right')}
            className="absolute -right-3 top-1/2 -translate-y-1/2 z-10 p-2 rounded-full bg-white shadow-lg hover:shadow-xl transition-shadow hidden group-hover:block"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        )}

        {/* Products */}
        <div
          ref={sliderRef}
          className="flex gap-3 sm:gap-4 overflow-x-auto scrollbar-hide pb-2"
        >
          {products.map((product) => (
            <div key={product.id} className="flex-shrink-0 w-40 sm:w-48 lg:w-56">
              <ProductCard product={product} variant="compact" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

/**
 * Product Grid Component
 * Grid display of products
 */
export const ProductGrid: React.FC<{
  products: Product[];
  columns?: number;
  gap?: string;
}> = ({ products, columns = 4, gap = '4' }) => {
  return (
    <div className={`grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-${columns} gap-${gap}`}>
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
};
