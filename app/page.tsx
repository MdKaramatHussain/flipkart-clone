'use client';

import Link from 'next/link';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import CategoryNavigation from '@/components/CategoryNavigation';
import { HeroBannerCarousel, PromoBanner } from '@/components/HeroBannerCarousel';
import { SaleIsLive } from '@/components/home/SaleIsLive';
import { ProductSlider } from '@/components/ProductSlider';
import { ProductCard } from '@/components/ProductCard';
import { COLORS } from '@/constants/colors';
import { Zap, Package, Shield, Truck } from 'lucide-react';
import {
  useFeaturedProducts,
  useTrendingProducts,
} from '@/hooks/useProducts';

export default function Home() {
  // Get products from global store
  const featuredProducts = useFeaturedProducts();
  const trendingProducts = useTrendingProducts();

  // Mock banner data
  const heroBanners = [
    {
      id: '1',
      image: 'https://www.paisawapas.com/shoptalk/wp-content/uploads/2025/09/Flipkart-Big-Billion-Days-Offers-On-iPhone-17.png',
      title: 'Big Billion Days Sale',
      description: 'Get up to 50% off on premium smartphones',
      alt: 'Big Billion Days Banner',
      cta: { text: 'Shop Now', href: '/search?category=electronics' },
    },
    {
      id: '2',
      image: 'https://www.paisawapas.com/static/flipkart-sale-landing-page-mob-banner.png',
      title: 'Sale is Live',
      description: 'Get the latest iPhone models at unbeatable prices',
      alt: 'sale is live',
      cta: { text: 'sale', href: '/search?category=electronics' },
    },
    {
      id: '3',
      image: 'https://discover.zestmoney.in/wp-content/uploads/2020/11/Landing-page-banner-scaled.jpg',
      title: 'Diwali Sale',
      description: 'Diwali is here! Celebrate with amazing deals on electronics and more',
      alt: 'Diwali Sale Banner',
      cta: { text: 'Diwali Sale', href: '/search?category=electronics' },
    },
  ];

  // Top categories for quick access
  const topCategories = [
    { name: 'Mobiles', icon: '📱', href: '/search?category=electronics' },
    { name: 'Fashion', icon: '👕', href: '/search?category=fashion' },
    { name: 'Groceries', icon: '🛒', href: '/search?category=groceries' },
    { name: 'Home', icon: '🏠', href: '/search?category=furniture' },
    { name: 'Books', icon: '📚', href: '/search?category=sports' },
    { name: 'Beauty', icon: '💄', href: '/search?category=beauty' },
    { name: 'Sports', icon: '⚽', href: '/search?category=sports' },
    { name: 'Toys', icon: '🎮', href: '/search?category=toys' },
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header cartCount={0} wishlistCount={0} />
      <CategoryNavigation variant="horizontal" />

      <main className="flex-1 w-full">
        {/* Hero Banner Carousel */}
        <section className="bg-white">
          <div className="max-w-full px-4 sm:px-6 lg:px-8 py-4">
            <HeroBannerCarousel slides={heroBanners} autoplay autoplayInterval={5000} />
          </div>
        </section>

        <SaleIsLive />

        {/* Top Categories Section 
        <section className="bg-white border-b border-gray-200 py-6">
          <div className="max-w-full px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-4 sm:grid-cols-4 md:grid-cols-8 gap-4">
              {topCategories.map((category, idx) => (
                <Link key={idx} href={category.href}>
                  <div className="flex flex-col items-center gap-2 p-4 rounded-lg hover:bg-gray-50 transition-colors text-center">
                    <div className="text-4xl sm:text-5xl">{category.icon}</div>
                    <p className="text-xs sm:text-sm font-medium text-gray-900 line-clamp-2">
                      {category.name}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
        */}

        {/* Best Deals Section */}
        {featuredProducts.length > 0 && (
          <section className="bg-white border-b border-gray-200 py-8">
            <div className="max-w-full px-4 sm:px-6 lg:px-8">
              <div className="flex items-center gap-2 mb-6">
                <Zap className="w-6 h-6" style={{ color: COLORS.accent.yellow }} />
                <h2 className="text-2xl font-bold" style={{ color: COLORS.text.primary }}>
                  Deals of the Day
                </h2>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
                {featuredProducts.slice(0, 10).map((product) => (
                  <ProductCard key={product.id} product={product} variant="compact" />
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Promotional Banners */}
        {/* <section className="bg-white border-b border-gray-200 py-8">
          <div className="max-w-full px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <PromoBanner
                image="https://images.unsplash.com/photo-1516062423079-7ca13cdc7f5a?w=800&h=400&fit=crop"
                alt="Summer Sale"
                href="/search?sale=summer"
              />
              <PromoBanner
                image="https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=800&h=400&fit=crop"
                alt="Electronics"
                href="/search?category=electronics"
              />
            </div>
          </div>
        </section> */}

        {/* Featured Products Slider */}
        {featuredProducts.length > 0 && (
          <section className="bg-white border-b border-gray-200 py-8">
            <div className="max-w-full px-4 sm:px-6 lg:px-8">
              <ProductSlider
                products={featuredProducts}
                title="Featured Products"
                description="Curated collection just for you"
              />
            </div>
          </section>
        )}

        {/* Trending Products Section */}
        {trendingProducts.length > 0 && (
          <section className="bg-gray-50 border-b border-gray-200 py-8">
            <div className="max-w-full px-4 sm:px-6 lg:px-8">
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h2 className="text-2xl font-bold mb-2" style={{ color: COLORS.text.primary }}>
                  Trending Products
                </h2>
                <p className="text-sm text-gray-600 mb-6">
                  What's hot and selling fast right now
                </p>
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                  {trendingProducts.map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Brand Showcase Section */}
        <section className="bg-white border-b border-gray-200 py-8">
          <div className="max-w-full px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-bold mb-6" style={{ color: COLORS.text.primary }}>
              Shop by Brand
            </h2>
            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-4">
              {['Apple', 'Samsung', 'Sony', 'Nike', 'Adidas', 'Puma'].map((brand) => (
                <Link key={brand} href={`/search?brand=${brand}`}>
                  <div
                    className="flex items-center justify-center p-4 rounded-lg border-2 hover:shadow-md transition-shadow cursor-pointer text-center font-medium"
                    style={{ borderColor: COLORS.border.light }}
                  >
                    {brand}
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Trust Badges Section */}
        <section className="bg-gray-50 border-b border-gray-200 py-8">
          <div className="max-w-full px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <div className="flex flex-col items-center gap-3 text-center">
                <Truck className="w-8 h-8" style={{ color: COLORS.primary.main }} />
                <div>
                  <h3 className="font-semibold text-sm">Fast Delivery</h3>
                  <p className="text-xs text-gray-600">Quick and reliable shipping</p>
                </div>
              </div>
              <div className="flex flex-col items-center gap-3 text-center">
                <Shield className="w-8 h-8" style={{ color: COLORS.primary.main }} />
                <div>
                  <h3 className="font-semibold text-sm">Secure Payments</h3>
                  <p className="text-xs text-gray-600">100% safe transactions</p>
                </div>
              </div>
              <div className="flex flex-col items-center gap-3 text-center">
                <Package className="w-8 h-8" style={{ color: COLORS.primary.main }} />
                <div>
                  <h3 className="font-semibold text-sm">Easy Returns</h3>
                  <p className="text-xs text-gray-600">Hassle-free returns</p>
                </div>
              </div>
              <div className="flex flex-col items-center gap-3 text-center">
                <Zap className="w-8 h-8" style={{ color: COLORS.primary.main }} />
                <div>
                  <h3 className="font-semibold text-sm">Original Products</h3>
                  <p className="text-xs text-gray-600">100% authentic items</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Recently Viewed (placeholder) */}
        <section className="bg-white border-b border-gray-200 py-8">
          <div className="max-w-full px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-bold mb-4" style={{ color: COLORS.text.primary }}>
              Recommended for You
            </h2>
            {featuredProducts.length > 0 ? (
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                {featuredProducts.slice(0, 8).map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-gray-600">No recommendations available yet</p>
              </div>
            )}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
{ /* --- IGNORE --- *
        {/* Hero Banner *
        <div className="bg-gray-100 py-6">
          <div className="max-w-7xl mx-auto px-4">
            <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg overflow-hidden h-64 flex items-center justify-center text-white">
              <div className="text-center">
                <h1 className="text-4xl font-bold mb-2">Welcome to Flipkart</h1>
                <p className="text-lg">Discover amazing products at unbeatable prices</p>
              </div>
            </div>
          </div>
        </div>

        {/* Featured Products *
        <div className="bg-gray-100 py-8">
          <div className="max-w-7xl mx-auto px-4">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-900">Best Offers for You</h2>
              <Link href="/products">
                <button className="text-blue-600 hover:text-blue-700 font-medium">View All</button>
              </Link>
            </div>

            {loading ? (
              <div className="text-center py-8 bg-white rounded">
                <p className="text-gray-600">Loading products...</p>
              </div>
            ) : featuredProducts.length > 0 ? (
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
                {featuredProducts.slice(0, 10).map((product) => (
                  <div
                    key={product.id}
                  //  href={`/products/${product.id}`}
                  >
                    <ProductCard product={product} />
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 bg-white rounded">
                <p className="text-gray-600">No products available</p>
              </div>
            )}
          </div>
        </div>

        {/* Trending Products *
        <div className="bg-white py-8">
          <div className="max-w-7xl mx-auto px-4">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-900">Trending Now</h2>
              <Link href="/products">
                <button className="text-blue-600 hover:text-blue-700 font-medium">View All</button>
              </Link>
            </div>

            {trendingProducts.length > 0 ? (
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
                {trendingProducts.slice(0, 10).map((product) => (
                  <div key={product.id} 
                  // href={`/products/${product.id}`}
                  >
                    <ProductCard product={product} />
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <p className="text-gray-600">No trending products available</p>
              </div>
            )}
          </div>
        </div>

        {/* Categories Section *
        <div className="bg-gray-100 py-8">
          <div className="max-w-7xl mx-auto px-4">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Shop by Category</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
              {['Electronics', 'Fashion', 'Home', 'Sports', 'Books', 'Beauty'].map((category) => (
                <Link key={category} href={`/products?category=${category.toLowerCase()}`}>
                  <div className="bg-white rounded-lg p-6 text-center hover:shadow-lg transition cursor-pointer">
                    <div className="w-16 h-16 bg-gray-100 rounded-full mx-auto mb-3 flex items-center justify-center">
                      <span className="text-2xl">📦</span>
                    </div>
                    <h3 className="font-bold text-gray-900 text-sm">{category}</h3>
                    <p className="text-xs text-gray-600 mt-1">Shop Now</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
  */}
