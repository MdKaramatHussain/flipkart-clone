'use client';

/**
 * Example: Refactored Home Page using Flipkart Design System
 * 
 * This is a reference implementation showing how to:
 * - Use design system components
 * - Apply responsive design
 * - Handle loading states
 * - Use proper spacing and colors
 * - Structure a feature-rich ecommerce page
 * 
 * USAGE:
 * Import and use this as template for refactoring other pages
 */

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, Zap } from 'lucide-react';
import clsx from 'clsx';

// Design System Imports
import {
  Button,
  FlipkartProductCard,
  FlipkartHeader,
  CategoryNavigation,
  SectionHeader,
  SkeletonLoader,
  EmptyState,
} from '@/components';

import { COLORS } from '@/constants/colors';
import { SPACING } from '@/constants/layout';
import { MAIN_ROUTES } from '@/constants/navigation';
import { getTailwindClass } from '@/constants/typography';

import type { Product } from '@/lib/types';

// ============================================================================
// HOME PAGE EXAMPLE
// ============================================================================

interface ExampleHomePageProps {
  // Add props if needed
}

const ExampleHomePage: React.FC<ExampleHomePageProps> = () => {
  // State Management
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([]);
  const [trendingProducts, setTrendingProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [cartCount, setCartCount] = useState(0);
  const [wishlistCount, setWishlistCount] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  // Simulate data fetching
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 1000));
        
        // Mock data - replace with actual API calls
        setFeaturedProducts([
          // ... featured products
        ]);
        setTrendingProducts([
          // ... trending products
        ]);
      } catch (error) {
        console.error('Failed to fetch products:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Event Handlers
  const handleAddToCart = (productId: string) => {
    console.log('Added to cart:', productId);
    setCartCount((prev) => prev + 1);
  };

  const handleWishlist = (productId: string) => {
    console.log('Wishlisted:', productId);
    setWishlistCount((prev) => prev + 1);
  };

  const handleSearch = (query: string) => {
    console.log('Search:', query);
    // Navigate to search results
  };

  // =========================================================================
  // RENDER
  // =========================================================================

  return (
    <div className="min-h-screen bg-background">
      {/* HEADER */}
      <FlipkartHeader
        cartCount={cartCount}
        wishlistCount={wishlistCount}
        isLoggedIn={false}
        onSearchChange={handleSearch}
      />

      {/* MAIN CONTENT */}
      <main className="max-w-7xl mx-auto px-4 lg:px-6 py-6 lg:py-8">
        {/* ===== HERO SECTION ===== */}
        <section className="mb-10">
          <HeroSection />
        </section>

        {/* ===== FEATURED DEALS BANNER ===== */}
        <section className="mb-10">
          <FeaturedDealsBanner />
        </section>

        {/* ===== CATEGORIES SECTION ===== */}
        <section className="mb-10">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            {/* Sidebar - Desktop */}
            <div className="hidden lg:block">
              <CategoryNavigation
                selectedCategory={selectedCategory}
                onCategorySelect={(catId) => setSelectedCategory(catId)}
              />
            </div>

            {/* Main Content Area */}
            <div className="lg:col-span-3">
              {/* Featured Products */}
              <FeaturedProductsSection
                products={featuredProducts}
                loading={loading}
                onAddToCart={handleAddToCart}
                onWishlist={handleWishlist}
              />
            </div>
          </div>
        </section>

        {/* ===== TRENDING PRODUCTS SECTION ===== */}
        <section className="mb-10">
          <TrendingProductsSection
            products={trendingProducts}
            loading={loading}
            onAddToCart={handleAddToCart}
            onWishlist={handleWishlist}
          />
        </section>

        {/* ===== PROMO SECTIONS ===== */}
        <section className="mb-10">
          <PromoSections />
        </section>
      </main>

      {/* FOOTER */}
      <Footer />
    </div>
  );
};

// ============================================================================
// SUB-COMPONENTS (Examples)
// ============================================================================

/**
 * Hero Section Component
 */
const HeroSection: React.FC = () => {
  return (
    <div
      className={clsx(
        'rounded-lg overflow-hidden shadow-lg',
        'bg-gradient-to-r from-primary to-primary/80'
      )}
      style={{
        backgroundImage: `linear-gradient(135deg, ${COLORS.primary.main} 0%, ${COLORS.primary.hover} 100%)`,
      }}
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6 md:p-12">
        {/* Content */}
        <div className="flex flex-col justify-center">
          <h1 className={clsx(getTailwindClass('h1'), 'text-white mb-4')}>
            Welcome to Flipkart
          </h1>
          <p className={clsx(getTailwindClass('body'), 'text-white/90 mb-6')}>
            Discover millions of products at unbeatable prices. Shop electronics, fashion,
            home & living, and much more!
          </p>
          <div className="flex gap-4">
            <Button variant="secondary" size="lg">
              Shop Now
            </Button>
            <Button variant="ghost" size="lg" className="text-white hover:bg-white/20">
              Learn More
            </Button>
          </div>
        </div>

        {/* Image - Optional */}
        <div className="hidden md:flex items-center justify-center">
          <div
            className="w-full h-64 rounded-lg bg-white/10 flex items-center justify-center text-white text-center"
          >
            <p>Hero Image Placeholder</p>
          </div>
        </div>
      </div>
    </div>
  );
};

/**
 * Featured Deals Banner
 */
const FeaturedDealsBanner: React.FC = () => {
  return (
    <div className="bg-accent rounded-lg p-6 shadow-lg">
      <div className="flex items-center justify-between">
        <div>
          <h3 className={clsx(getTailwindClass('h3'), 'text-primary mb-2')}>
            Flash Sale - Limited Time!
          </h3>
          <p className={clsx(getTailwindClass('body'), 'text-primary/80')}>
            Up to 70% off on selected items. Hurry, offer ends soon!
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Zap className="w-6 h-6 text-primary" />
          <Button variant="primary" size="md">
            View Deals
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </div>
      </div>
    </div>
  );
};

/**
 * Featured Products Section
 */
interface FeaturedProductsSectionProps {
  products: Product[];
  loading: boolean;
  onAddToCart: (productId: string) => void;
  onWishlist: (productId: string) => void;
}

const FeaturedProductsSection: React.FC<FeaturedProductsSectionProps> = ({
  products,
  loading,
  onAddToCart,
  onWishlist,
}) => {
  return (
    <div>
      <SectionHeader
        title="Featured Products"
        subtitle="Handpicked bestsellers and top recommendations"
        action={{
          label: 'View All',
          href: MAIN_ROUTES.products,
        }}
      />

      {/* Loading State */}
      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[...Array(6)].map((_, i) => (
            <SkeletonLoader
              key={i}
              variant="rect"
              height={300}
              spacing="md"
            />
          ))}
        </div>
      ) : products.length === 0 ? (
        /* Empty State */
        <EmptyState
          type="no-data"
          title="No featured products available"
          description="Check back soon for our latest picks!"
        />
      ) : (
        /* Product Grid */
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {products.map((product) => (
            <FlipkartProductCard
              key={product.id}
              product={product}
              variant="grid"
              onAddToCart={() => onAddToCart(product.id)}
              onWishlist={() => onWishlist(product.id)}
            />
          ))}
        </div>
      )}
    </div>
  );
};

/**
 * Trending Products Section
 */
interface TrendingProductsSectionProps {
  products: Product[];
  loading: boolean;
  onAddToCart: (productId: string) => void;
  onWishlist: (productId: string) => void;
}

const TrendingProductsSection: React.FC<TrendingProductsSectionProps> = ({
  products,
  loading,
  onAddToCart,
  onWishlist,
}) => {
  return (
    <div>
      <SectionHeader
        title="Trending Now"
        subtitle="What's hot this season"
        action={{
          label: 'See Trending',
          href: `${MAIN_ROUTES.products}?sort=trending`,
        }}
      />

      {/* Loading State */}
      {loading ? (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
          {[...Array(8)].map((_, i) => (
            <SkeletonLoader
              key={i}
              variant="rect"
              height={250}
              spacing="md"
            />
          ))}
        </div>
      ) : products.length === 0 ? (
        <EmptyState
          type="no-data"
          title="No trending products"
          description="Check back later!"
        />
      ) : (
        /* Product Grid - Compact Variant */
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
          {products.map((product) => (
            <FlipkartProductCard
              key={product.id}
              product={product}
              variant="compact"
              onAddToCart={() => onAddToCart(product.id)}
              onWishlist={() => onWishlist(product.id)}
            />
          ))}
        </div>
      )}
    </div>
  );
};

/**
 * Promo Sections
 */
const PromoSections: React.FC = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {/* Promo Card 1 */}
      <div className="rounded-lg overflow-hidden shadow-card hover:shadow-hover transition-shadow duration-200 cursor-pointer group">
        <div
          className="relative h-48 bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center"
        >
          <div className="text-center">
            <h3 className={clsx(getTailwindClass('h4'), 'text-foreground mb-2')}>
              Electronics Sale
            </h3>
            <p className={clsx(getTailwindClass('body'), 'text-muted-foreground mb-4')}>
              Up to 50% off
            </p>
            <Button variant="primary" size="sm">
              Shop Now
            </Button>
          </div>
        </div>
      </div>

      {/* Promo Card 2 */}
      <div className="rounded-lg overflow-hidden shadow-card hover:shadow-hover transition-shadow duration-200 cursor-pointer group">
        <div className="relative h-48 bg-gradient-to-br from-accent/20 to-accent/5 flex items-center justify-center">
          <div className="text-center">
            <h3 className={clsx(getTailwindClass('h4'), 'text-foreground mb-2')}>
              Fashion Collection
            </h3>
            <p className={clsx(getTailwindClass('body'), 'text-muted-foreground mb-4')}>
              New Arrivals
            </p>
            <Button variant="primary" size="sm">
              Explore
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

/**
 * Footer Component
 */
const Footer: React.FC = () => {
  return (
    <footer className="bg-card border-t border-border mt-20">
      <div className="max-w-7xl mx-auto px-4 lg:px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div>
            <h4 className={clsx(getTailwindClass('h6'), 'mb-4')}>About</h4>
            <ul className="space-y-2 text-sm text-muted-foreground hover:text-foreground transition-colors">
              <li><a href="#">About Us</a></li>
              <li><a href="#">Careers</a></li>
              <li><a href="#">Press</a></li>
            </ul>
          </div>
          <div>
            <h4 className={clsx(getTailwindClass('h6'), 'mb-4')}>Help</h4>
            <ul className="space-y-2 text-sm text-muted-foreground hover:text-foreground transition-colors">
              <li><a href="#">Contact Us</a></li>
              <li><a href="#">FAQ</a></li>
              <li><a href="#">Support</a></li>
            </ul>
          </div>
          <div>
            <h4 className={clsx(getTailwindClass('h6'), 'mb-4')}>Policy</h4>
            <ul className="space-y-2 text-sm text-muted-foreground hover:text-foreground transition-colors">
              <li><a href="#">Privacy</a></li>
              <li><a href="#">Terms</a></li>
              <li><a href="#">Returns</a></li>
            </ul>
          </div>
          <div>
            <h4 className={clsx(getTailwindClass('h6'), 'mb-4')}>Follow</h4>
            <ul className="space-y-2 text-sm text-muted-foreground hover:text-foreground transition-colors">
              <li><a href="#">Facebook</a></li>
              <li><a href="#">Twitter</a></li>
              <li><a href="#">Instagram</a></li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-border pt-8 flex justify-between items-center">
          <p className="text-sm text-muted-foreground">
            © 2024 Flipkart Clone. All rights reserved.
          </p>
          <p className="text-sm text-muted-foreground">
            Designed with ❤️ using Flipkart Design System
          </p>
        </div>
      </div>
    </footer>
  );
};

export default ExampleHomePage;

/**
 * KEY TAKEAWAYS FROM THIS EXAMPLE:
 * 
 * 1. DESIGN TOKENS
 *    - Used COLORS, SPACING, and typography constants
 *    - No hardcoded values
 * 
 * 2. COMPONENTS
 *    - Used FlipkartHeader, FlipkartProductCard, SectionHeader, etc.
 *    - Proper variant usage
 * 
 * 3. RESPONSIVE DESIGN
 *    - Mobile-first classes (default mobile)
 *    - md: and lg: for larger screens
 *    - Grid layouts that adapt
 * 
 * 4. LOADING STATES
 *    - SkeletonLoader for loading
 *    - Proper state management
 * 
 * 5. EMPTY STATES
 *    - EmptyState component for no data
 *    - User-friendly messages
 * 
 * 6. ACCESSIBILITY
 *    - Semantic HTML
 *    - Proper heading hierarchy
 *    - Good color contrast
 * 
 * 7. ANIMATIONS
 *    - Smooth transitions
 *    - Hover effects
 *    - Duration classes
 * 
 * 8. STRUCTURE
 *    - Clear sections
 *    - Reusable sub-components
 *    - Props drilling properly
 * 
 * Use this as a template for refactoring other pages!
 */
