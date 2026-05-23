'use client';

import React from 'react';
import { Search, ShoppingCart, Heart, User, MapPin, SlidersHorizontal } from 'lucide-react';

export default function ProductsPage() {
  const [scrolled, setScrolled] = React.useState(false);
  const [sortBy, setSortBy] = React.useState('relevance');
  const [selectedFilters, setSelectedFilters] = React.useState({
    category: null,
    priceRange: null,
    rating: null,
    brand: null,
  });
  const [showFilters, setShowFilters] = React.useState(true);

  React.useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const categories = ['Electronics', 'Fashion', 'Home & Living', 'Sports', 'Books', 'Beauty', 'Toys', 'Grocery'];
  const priceRanges = [
    { label: 'Under ₹500', min: 0, max: 500 },
    { label: '₹500 - ₹1000', min: 500, max: 1000 },
    { label: '₹1000 - ₹5000', min: 1000, max: 5000 },
    { label: '₹5000 - ₹10000', min: 5000, max: 10000 },
    { label: 'Above ₹10000', min: 10000, max: Infinity },
  ];
  const brands = ['Brand A', 'Brand B', 'Brand C', 'Brand D', 'Brand E', 'Brand F'];
  const ratings = ['4★ & above', '3★ & above', '2★ & above', '1★ & above'];
  const productImages = ['/product-1.jpg', '/product-2.jpg', '/product-3.jpg', '/product-4.jpg', '/product-5.jpg'];

  const products = Array.from({ length: 48 }).map((_, i) => ({
    id: i + 1,
    name: `Product ${i + 1}`,
    price: Math.floor(Math.random() * 50000) + 1000,
    originalPrice: Math.floor(Math.random() * 80000) + 5000,
    discount: Math.floor(Math.random() * 70) + 10,
    rating: (Math.random() * 2 + 3.5).toFixed(1),
    reviews: Math.floor(Math.random() * 10000) + 100,
    brand: brands[Math.floor(Math.random() * brands.length)],
    category: categories[Math.floor(Math.random() * categories.length)],
    image: productImages[i % productImages.length],
  }));

  const handleFilterChange = (filterType, value) => {
    setSelectedFilters(prev => ({
      ...prev,
      [filterType]: prev[filterType] === value ? null : value,
    }));
  };

  const clearFilters = () => {
    setSelectedFilters({ category: null, priceRange: null, rating: null, brand: null });
  };

  return (
    <div className="bg-white">
      {/* Header */}
      <header 
        className={`fixed top-0 left-0 right-0 z-50 transition-shadow duration-200 ${scrolled ? 'shadow-lg' : ''}`}
        style={{ backgroundColor: '#2874f0' }}
      >
        <div className="px-4 py-3">
          <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
            <div className="flex items-center gap-1 flex-shrink-0">
              <div className="w-28 h-7 bg-white rounded flex items-center justify-center">
                <span className="font-bold text-xl" style={{ color: '#2874f0' }}>Flipkart</span>
              </div>
              <span className="text-white text-xs font-light italic">Explore <span className="font-bold">Plus</span></span>
            </div>

            <div className="flex-1 max-w-lg">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search for products, brands and more"
                  className="w-full px-4 py-2 rounded text-sm placeholder-gray-600 focus:outline-none"
                />
                <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              </div>
            </div>

            <div className="flex items-center gap-6 text-white">
              <button className="flex items-center gap-1 text-sm font-medium hover:opacity-80 transition">
                <User className="w-5 h-5" />
                <span>Login</span>
              </button>
              <button className="flex items-center gap-1 text-sm font-medium hover:opacity-80 transition">
                <Heart className="w-5 h-5" />
                <span>Wishlist</span>
              </button>
              <button className="flex items-center gap-1 text-sm font-medium hover:opacity-80 transition">
                <ShoppingCart className="w-5 h-5" />
                <span>Cart</span>
              </button>
            </div>
          </div>
        </div>

        <div className="bg-white text-gray-700 px-4 py-2">
          <div className="max-w-7xl mx-auto flex items-center gap-8 text-xs font-medium">
            <button className="flex items-center gap-1 hover:text-blue-600 transition py-1">
              <MapPin className="w-3 h-3" />
              <span>Delivery to</span>
            </button>
            {categories.map((item) => (
              <button key={item} className="hover:text-blue-600 transition py-1">{item}</button>
            ))}
          </div>
        </div>
      </header>

      <main className="pt-32">
        <div className="max-w-7xl mx-auto px-4 py-6">
          {/* Filters and Sort Bar */}
          <div className="flex items-center justify-between gap-4 mb-6 pb-4 border-b border-gray-200">
            <div className="flex items-center gap-4">
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded hover:bg-gray-50 transition"
              >
                <SlidersHorizontal className="w-4 h-4" />
                <span className="text-sm font-medium">Filters</span>
              </button>
              {Object.values(selectedFilters).some(v => v) && (
                <button
                  onClick={clearFilters}
                  className="text-sm text-blue-600 hover:underline font-medium"
                >
                  Clear all
                </button>
              )}
            </div>

            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-600">Sort by:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-3 py-1 border border-gray-300 rounded text-sm focus:outline-none"
              >
                <option value="relevance">Relevance</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Highest Rating</option>
                <option value="newest">Newest First</option>
              </select>
            </div>
          </div>

          <div className="flex gap-6">
            {/* Sidebar Filters */}
            {showFilters && (
              <div className="w-64 flex-shrink-0">
                <div className="bg-white border border-gray-200 rounded p-4 sticky top-32 space-y-6">
                  {/* Category Filter */}
                  <div>
                    <h3 className="font-bold text-sm mb-3" style={{ color: '#212121' }}>Category</h3>
                    <div className="space-y-2">
                      {categories.map((cat) => (
                        <label key={cat} className="flex items-center gap-2 cursor-pointer hover:text-blue-600">
                          <input
                            type="checkbox"
                            checked={selectedFilters.category === cat}
                            onChange={() => handleFilterChange('category', cat)}
                            className="w-4 h-4 accent-blue-600"
                          />
                          <span className="text-sm text-gray-700">{cat}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Price Filter */}
                  <div className="border-t pt-4">
                    <h3 className="font-bold text-sm mb-3" style={{ color: '#212121' }}>Price</h3>
                    <div className="space-y-2">
                      {priceRanges.map((range) => (
                        <label key={range.label} className="flex items-center gap-2 cursor-pointer hover:text-blue-600">
                          <input
                            type="checkbox"
                            checked={selectedFilters.priceRange === range.label}
                            onChange={() => handleFilterChange('priceRange', range.label)}
                            className="w-4 h-4 accent-blue-600"
                          />
                          <span className="text-sm text-gray-700">{range.label}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Brand Filter */}
                  <div className="border-t pt-4">
                    <h3 className="font-bold text-sm mb-3" style={{ color: '#212121' }}>Brand</h3>
                    <div className="space-y-2">
                      {brands.map((brand) => (
                        <label key={brand} className="flex items-center gap-2 cursor-pointer hover:text-blue-600">
                          <input
                            type="checkbox"
                            checked={selectedFilters.brand === brand}
                            onChange={() => handleFilterChange('brand', brand)}
                            className="w-4 h-4 accent-blue-600"
                          />
                          <span className="text-sm text-gray-700">{brand}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Rating Filter */}
                  <div className="border-t pt-4">
                    <h3 className="font-bold text-sm mb-3" style={{ color: '#212121' }}>Rating</h3>
                    <div className="space-y-2">
                      {ratings.map((rating) => (
                        <label key={rating} className="flex items-center gap-2 cursor-pointer hover:text-blue-600">
                          <input
                            type="checkbox"
                            checked={selectedFilters.rating === rating}
                            onChange={() => handleFilterChange('rating', rating)}
                            className="w-4 h-4 accent-blue-600"
                          />
                          <span className="text-sm text-gray-700">{rating}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Products Grid */}
            <div className="flex-1">
              <div className="mb-4 text-sm text-gray-600">
                Showing <strong>{products.length}</strong> products
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                {products.map((product) => (
                  <div
                    key={product.id}
                    className="bg-white border border-gray-200 rounded cursor-pointer hover:shadow-xl transition-shadow duration-200 group overflow-hidden"
                  >
                    <div className="aspect-square bg-gray-100 flex items-center justify-center relative overflow-hidden">
                      <img src={product.image} alt={product.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200" />
                      {product.discount > 0 && (
                        <div className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded text-xs font-bold">
                          {product.discount}% off
                        </div>
                      )}
                    </div>
                    <div className="p-3">
                      <h3 className="font-medium text-sm text-gray-800 line-clamp-2 h-9 group-hover:text-blue-600">
                        {product.name}
                      </h3>
                      <div className="flex items-center gap-1 mt-1">
                        <span className="text-yellow-500 text-sm font-medium">{product.rating} ★</span>
                        <span className="text-gray-500 text-xs">({product.reviews})</span>
                      </div>
                      <div className="flex items-baseline gap-2 mt-3">
                        <span className="font-bold text-lg" style={{ color: '#212121' }}>
                          ₹{product.price.toLocaleString()}
                        </span>
                        <span className="text-gray-500 line-through text-xs">
                          ₹{product.originalPrice.toLocaleString()}
                        </span>
                      </div>
                      <button className="w-full mt-3 py-1.5 bg-blue-50 text-blue-600 font-medium text-sm rounded hover:bg-blue-100 transition">
                        Add to Cart
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer style={{ backgroundColor: '#172337' }} className="text-white mt-12">
        <div className="max-w-7xl mx-auto px-4 py-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-8">
            {['About', 'Help', 'Policy', 'Social'].map((section) => (
              <div key={section}>
                <h3 className="font-bold text-sm mb-4">{section}</h3>
                <ul className="space-y-2">
                  {['Link 1', 'Link 2', 'Link 3'].map((link) => (
                    <li key={link}>
                      <a href="#" className="text-gray-400 hover:text-white text-xs transition">
                        {link}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div className="border-t border-gray-700 pt-8 text-center text-gray-400 text-xs">
            <p>&copy; 2024 Flipkart.com. All Rights Reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
