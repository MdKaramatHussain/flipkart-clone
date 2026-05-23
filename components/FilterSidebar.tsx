'use client';

import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { CATEGORIES, PRICE_RANGES, BRANDS, RATING_FILTERS } from '@/lib/constants';
import type { FilterOptions } from '@/lib/types';

interface FilterSidebarProps {
  onFilterChange: (filters: FilterOptions) => void;
  selectedFilters?: FilterOptions;
}

export function FilterSidebar({ onFilterChange, selectedFilters }: FilterSidebarProps) {
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({
    category: true,
    price: true,
    brand: true,
    rating: true,
  });

  const toggleSection = (section: string) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  const handleCategoryChange = (category: string) => {
    onFilterChange({
      ...selectedFilters,
      category: selectedFilters?.category === category ? undefined : category,
      page: 1,
    });
  };

  const handlePriceChange = (min: number, max: number) => {
    onFilterChange({
      ...selectedFilters,
      priceRange: [min, max],
      page: 1,
    });
  };

  const handleBrandChange = (brand: string) => {
    onFilterChange({
      ...selectedFilters,
      brand: selectedFilters?.brand === brand ? undefined : brand,
      page: 1,
    });
  };

  const handleRatingChange = (rating: number) => {
    onFilterChange({
      ...selectedFilters,
      rating: selectedFilters?.rating === rating ? undefined : rating,
      page: 1,
    });
  };

  return (
    <div className="space-y-4">
      {/* Category Filter */}
      <div className="bg-white border border-gray-200 rounded">
        <button
          onClick={() => toggleSection('category')}
          className="w-full flex items-center justify-between p-4 font-medium text-gray-900"
        >
          Category
          <ChevronDown
            className={`w-5 h-5 transition-transform ${expandedSections.category ? 'rotate-180' : ''}`}
          />
        </button>
        {expandedSections.category && (
          <div className="px-4 pb-4 space-y-2 border-t border-gray-200">
            {CATEGORIES.map(category => (
              <label key={category} className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={selectedFilters?.category === category}
                  onChange={() => handleCategoryChange(category)}
                  className="w-4 h-4"
                />
                <span className="text-sm text-gray-700">{category}</span>
              </label>
            ))}
          </div>
        )}
      </div>

      {/* Price Filter */}
      <div className="bg-white border border-gray-200 rounded">
        <button
          onClick={() => toggleSection('price')}
          className="w-full flex items-center justify-between p-4 font-medium text-gray-900"
        >
          Price Range
          <ChevronDown
            className={`w-5 h-5 transition-transform ${expandedSections.price ? 'rotate-180' : ''}`}
          />
        </button>
        {expandedSections.price && (
          <div className="px-4 pb-4 space-y-2 border-t border-gray-200">
            {PRICE_RANGES.map((range, idx) => (
              <label key={idx} className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={
                    selectedFilters?.priceRange?.[0] === range.min &&
                    selectedFilters?.priceRange?.[1] === range.max
                  }
                  onChange={() => handlePriceChange(range.min, range.max)}
                  className="w-4 h-4"
                />
                <span className="text-sm text-gray-700">{range.label}</span>
              </label>
            ))}
          </div>
        )}
      </div>

      {/* Brand Filter */}
      <div className="bg-white border border-gray-200 rounded">
        <button
          onClick={() => toggleSection('brand')}
          className="w-full flex items-center justify-between p-4 font-medium text-gray-900"
        >
          Brand
          <ChevronDown
            className={`w-5 h-5 transition-transform ${expandedSections.brand ? 'rotate-180' : ''}`}
          />
        </button>
        {expandedSections.brand && (
          <div className="px-4 pb-4 space-y-2 border-t border-gray-200 max-h-48 overflow-y-auto">
            {BRANDS.slice(0, 15).map(brand => (
              <label key={brand} className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={selectedFilters?.brand === brand}
                  onChange={() => handleBrandChange(brand)}
                  className="w-4 h-4"
                />
                <span className="text-sm text-gray-700">{brand}</span>
              </label>
            ))}
          </div>
        )}
      </div>

      {/* Rating Filter */}
      <div className="bg-white border border-gray-200 rounded">
        <button
          onClick={() => toggleSection('rating')}
          className="w-full flex items-center justify-between p-4 font-medium text-gray-900"
        >
          Rating
          <ChevronDown
            className={`w-5 h-5 transition-transform ${expandedSections.rating ? 'rotate-180' : ''}`}
          />
        </button>
        {expandedSections.rating && (
          <div className="px-4 pb-4 space-y-2 border-t border-gray-200">
            {RATING_FILTERS.map(filter => (
              <label key={filter.label} className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={selectedFilters?.rating === filter.min}
                  onChange={() => handleRatingChange(filter.min)}
                  className="w-4 h-4"
                />
                <span className="text-sm text-gray-700">{filter.label}</span>
              </label>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
