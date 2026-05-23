'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ChevronRight, Filter } from 'lucide-react';
import { COLORS } from '@/constants/colors';

interface Category {
  id: string;
  name: string;
  slug: string;
  subcategories?: string[];
}

interface CategoryNavigationProps {
  variant?: 'horizontal' | 'vertical';
  showSubcategories?: boolean;
}

const CATEGORIES: Category[] = [
  { id: '1', name: 'Electronics', slug: 'electronics', subcategories: ['Mobile Phones', 'Laptops', 'Tablets', 'Wearables', 'Audio'] },
  { id: '2', name: 'Fashion', slug: 'fashion', subcategories: ['Men', 'Women', 'Kids', 'Shoes', 'Accessories'] },
  { id: '3', name: 'Home & Furniture', slug: 'furniture', subcategories: ['Sofas', 'Beds', 'Chairs', 'Decor', 'Lighting'] },
  { id: '4', name: 'Sports & Books', slug: 'sports', subcategories: ['Sports Wear', 'Books', 'Gaming', 'Sports Equipment'] },
  { id: '5', name: 'Groceries', slug: 'groceries', subcategories: ['Vegetables', 'Fruits', 'Dairy', 'Snacks', 'Spices'] },
  { id: '6', name: 'Beauty', slug: 'beauty', subcategories: ['Skincare', 'Makeup', 'Hair Care', 'Bath & Body'] },
  { id: '7', name: 'Toys & Games', slug: 'toys', subcategories: ['Action Figures', 'Board Games', 'Puzzles', 'Baby Toys'] },
  { id: '8', name: 'Automotive', slug: 'automotive', subcategories: ['Accessories', 'Tools', 'Care Products', 'Parts'] },
];

/**
 * Enhanced Category Navigation Component
 */
const CategoryNavigation = React.forwardRef<HTMLDivElement, CategoryNavigationProps>(
  ({ variant = 'vertical', showSubcategories = true }, ref) => {
    const [expandedCategory, setExpandedCategory] = useState<string | null>(null);

    if (variant === 'horizontal') {
      return (
        <div
          ref={ref}
          className="bg-white shadow-sm border-b sticky top-16 z-40"
          style={{ borderColor: COLORS.border.light }}
        >
          <div className="max-w-full px-4 sm:px-6 lg:px-8">
            <div className="flex overflow-x-auto scrollbar-hide gap-1 py-0">
              {CATEGORIES.map((category) => (
                <div
                  key={category.id}
                  className="relative group flex-shrink-0"
                  onMouseEnter={() => setExpandedCategory(category.id)}
                  onMouseLeave={() => setExpandedCategory(null)}
                >
                  <Link
                    href={`/search?category=${category.slug}`}
                    className="px-3 sm:px-4 py-3 text-sm font-medium whitespace-nowrap transition-colors hover:text-blue-600 block"
                    style={{ color: COLORS.text.primary }}
                  >
                    {category.name}
                  </Link>

                  {showSubcategories && expandedCategory === category.id && category.subcategories && (
                    <div 
                      className="absolute top-full left-0 bg-white border rounded-lg shadow-lg z-50 min-w-max"
                      style={{ borderColor: COLORS.border.default }}
                    >
                      {category.subcategories.map((subcategory, idx) => (
                        <Link
                          key={idx}
                          href={`/search?category=${category.slug}&sub=${subcategory.toLowerCase()}`}
                          className="block px-4 py-2 text-sm hover:bg-gray-50 border-b last:border-b-0 whitespace-nowrap"
                          style={{ borderColor: COLORS.border.light }}
                        >
                          {subcategory}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      );
    }

    // Vertical variant (sidebar)
    return (
      <div
        ref={ref}
        className="bg-white rounded-lg shadow-sm border"
        style={{ borderColor: COLORS.border.light }}
      >
        <div className="flex items-center gap-2 p-4 border-b" style={{ borderColor: COLORS.border.light }}>
          <Filter size={20} style={{ color: COLORS.primary.main }} />
          <h3 className="font-bold text-lg" style={{ color: COLORS.text.primary }}>
            Categories
          </h3>
        </div>

        <nav className="divide-y" style={{ borderColor: COLORS.border.light }}>
          {CATEGORIES.map((category) => (
            <div
              key={category.id}
              onMouseEnter={() => setExpandedCategory(category.id)}
              onMouseLeave={() => setExpandedCategory(null)}
              className="relative"
            >
              <Link
                href={`/search?category=${category.slug}`}
                className="w-full flex items-center justify-between px-4 py-3 text-left font-medium transition-colors hover:bg-gray-50"
                style={{ color: expandedCategory === category.id ? COLORS.primary.main : COLORS.text.primary }}
              >
                <span className="text-sm">{category.name}</span>
                <ChevronRight
                  size={16}
                  className={`transition-transform ${expandedCategory === category.id ? 'rotate-90' : ''}`}
                />
              </Link>

              {showSubcategories && expandedCategory === category.id && category.subcategories && (
                <div className="bg-gray-50 px-4 py-2 space-y-1 border-t" style={{ borderColor: COLORS.border.light }}>
                  {category.subcategories.map((sub) => (
                    <Link
                      key={sub}
                      href={`/search?category=${category.slug}&sub=${sub.toLowerCase()}`}
                      className="block px-2 py-2 text-xs rounded hover:bg-white transition-colors"
                      style={{ color: COLORS.text.secondary }}
                    >
                      → {sub}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}
        </nav>
      </div>
    );
  }
);

CategoryNavigation.displayName = 'CategoryNavigation';

export default CategoryNavigation;
