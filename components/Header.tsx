'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { Search, ShoppingCart, Heart, User, Menu, X, ChevronDown } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { COLORS, withOpacity } from '@/constants/colors';
import { useAuthStore, useCartStore } from '@/store/useStore';
import Image from 'next/image';

interface SearchSuggestion {
  id: string;
  title: string;
  category?: string;
  type: 'product' | 'category' | 'recent';
}

/**
 * Enhanced Header Component - Flipkart style
 * Sticky navbar with search, navigation, and user menu
 */
export function Header() {
  const [searchQuery, setSearchQuery] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [suggestions, setSuggestions] = useState<SearchSuggestion[]>([]);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const { user, isLoggedIn, logout } = useAuthStore();
  const { cart } = useCartStore();

  // Mock search suggestions
  const mockSuggestions: SearchSuggestion[] = [
    { id: '1', title: 'iPhone 15 Pro', category: 'Electronics', type: 'product' },
    { id: '2', title: 'Wireless Earbuds', category: 'Electronics', type: 'product' },
    { id: '3', title: 'Gaming Laptop', category: 'Electronics', type: 'product' },
    { id: '4', title: 'Smart Watch', category: 'Electronics', type: 'product' },
    { id: '5', title: 'Electronics', type: 'category' },
    { id: '6', title: 'Fashion', type: 'category' },
  ];

  // Handle search input with suggestions
  const handleSearchChange = (value: string) => {
    setSearchQuery(value);
    if (value.length > 0) {
      const filtered = mockSuggestions.filter((s) =>
        s.title.toLowerCase().includes(value.toLowerCase())
      );
      setSuggestions(filtered);
      setShowSuggestions(true);
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
    }
  };

  // Handle suggestion click
  const handleSuggestionClick = (suggestion: SearchSuggestion) => {
    setSearchQuery(suggestion.title);
    setShowSuggestions(false);
    if (suggestion.type === 'product') {
      router.push(`/search?q=${encodeURIComponent(suggestion.title)}`);
    } else if (suggestion.type === 'category') {
      router.push(`/search?category=${encodeURIComponent(suggestion.title)}`);
    }
  };

  // Handle search submit
  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      setShowSuggestions(false);
      router.push(`/search?q=${encodeURIComponent(searchQuery)}`);
    }
  };

  // Close suggestions when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Mobile menu close on resize
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsMobileMenuOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const cartCount = cart?.items?.length || 0;

  const navLinkClass =
    'text-sm font-medium transition-all duration-200 hover:opacity-80 hover:underline underline-offset-4 decoration-white/60';
  const iconButtonClass =
    'relative p-2 rounded-lg transition-all duration-200 hover:bg-white/10';
  const searchInputClass =
    'w-full px-4 py-2 pr-10 border rounded-lg bg-white text-gray-900 placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-0';
  const searchButtonClass =
    'absolute right-3 top-1/2 -translate-y-1/2 transition-colors duration-200 text-gray-400 hover:text-primary';

  return (
    <header
      className="sticky top-0 z-50 w-full shadow-md"
      style={{ backgroundColor: COLORS.primary.main, color: COLORS.text.inverse }}
    >
      {/* Main Header */}
      <div className="border-b" style={{ borderColor: withOpacity(COLORS.text.inverse, 0.15) }}>
        <div className="max-w-full px-4 sm:px-6 lg:px-8 py-3">
          <div className="flex items-center justify-between gap-2 sm:gap-4">
            {/* Logo */}
            <Link href="/" className="flex-shrink-0 outline-none">
              <div className="flex items-center gap-1 border-1">
                <Image
                  src="/logo.jfif"
                  alt="Logo"
                  width={1800}
                  height={60}
                  className="object-contain h-12 w-auto border-1"
                  // className="object-contain h-12 w-auto brightness-0 invert"
                  priority
                />
              </div>
            </Link>

            {/* Search Bar - Hidden on mobile, shown on tablet+ */}
            <div ref={searchRef} className="hidden sm:flex flex-1 max-w-md lg:max-w-xl relative">
              <form onSubmit={handleSearchSubmit} className="w-full">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search for products, brands and more"
                    value={searchQuery}
                    onChange={(e) => handleSearchChange(e.target.value)}
                    onFocus={() => searchQuery && setShowSuggestions(true)}
                    className={searchInputClass}
                    style={{ borderColor: COLORS.border.default, '--tw-ring-color': COLORS.primary.main } as React.CSSProperties}
                  />
                  <button
                    type="submit"
                    className={searchButtonClass}
                    aria-label="Search"
                  >
                    <Search className="w-5 h-5" />
                  </button>

                  {/* Search Suggestions Dropdown */}
                  {showSuggestions && suggestions.length > 0 && (
                    <div
                      className="absolute top-full left-0 right-0 mt-1 bg-white border rounded-lg shadow-lg z-50 overflow-hidden"
                      style={{ borderColor: COLORS.border.default }}
                    >
                      {suggestions.map((suggestion) => (
                        <button
                          key={suggestion.id}
                          onClick={() => handleSuggestionClick(suggestion)}
                          className="w-full px-4 py-2 text-left flex items-center justify-between hover:bg-gray-50 border-b last:border-b-0 transition-colors"
                          style={{ borderColor: COLORS.border.light }}
                        >
                          <div>
                            <div className="text-sm font-medium text-gray-900">{suggestion.title}</div>
                            {suggestion.category && (
                              <div className="text-xs text-gray-500">{suggestion.category}</div>
                            )}
                          </div>
                          <Search className="w-4 h-4 text-gray-400" />
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </form>
            </div>

            {/* Header Actions - Right Side */}
            <div className="flex items-center gap-2 sm:gap-4">
              {/* Seller link - Hidden on mobile */}
              <Link
                href="/sellers"
                className={`hidden sm:inline-block ${navLinkClass}`}
                style={{ color: COLORS.text.inverse }}
              >
                Become a Seller
              </Link>

              {/* Wishlist */}
              <Link
                href="/wishlist"
                className={iconButtonClass}
              >
                <Heart className="w-6 h-6" style={{ color: COLORS.text.inverse }} />
              </Link>

              {/* Cart */}
              <Link
                href="/cart"
                className={iconButtonClass}
              >
                <ShoppingCart className="w-6 h-6" style={{ color: COLORS.text.inverse }} />
                {cartCount > 0 && (
                  <span
                    className="absolute -top-1 -right-1 text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center"
                    style={{ backgroundColor: COLORS.accent.yellow, color: COLORS.text.primary }}
                  >
                    {cartCount}
                  </span>
                )}
              </Link>

              {/* User Menu */}
              <div className="relative hidden sm:block">
                <button
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className={`flex items-center gap-1 ${iconButtonClass}`}
                >
                  <User className="w-6 h-6" style={{ color: COLORS.text.inverse }} />
                  <ChevronDown className="w-4 h-4" style={{ color: COLORS.text.inverse }} />
                </button>

                {isDropdownOpen && (
                  <div
                    className="absolute right-0 mt-1 w-48 bg-white border rounded-lg shadow-lg z-50 overflow-hidden"
                    style={{ borderColor: COLORS.border.default }}
                  >
                    {isLoggedIn ? (
                      <>
                        <Link
                          href="/profile"
                          className="block px-4 py-2 text-sm hover:bg-gray-50 border-b"
                          style={{ borderColor: COLORS.border.light }}
                        >
                          My Profile
                        </Link>
                        <Link
                          href="/orders"
                          className="block px-4 py-2 text-sm hover:bg-gray-50 border-b"
                          style={{ borderColor: COLORS.border.light }}
                        >
                          My Orders
                        </Link>
                        <Link
                          href="/wishlist"
                          className="block px-4 py-2 text-sm hover:bg-gray-50 border-b"
                          style={{ borderColor: COLORS.border.light }}
                        >
                          Wishlist
                        </Link>
                        <button
                          onClick={() => {
                            logout();
                            router.push('/');
                            setIsDropdownOpen(false);
                          }}
                          className="w-full text-left px-4 py-2 text-sm hover:bg-gray-50 text-red-600 font-medium"
                        >
                          Logout
                        </button>
                      </>
                    ) : (
                      <>
                        <Link
                          href="/login"
                          className="block px-4 py-3 text-center font-medium border-b"
                          style={{ color: COLORS.primary.main, borderColor: COLORS.border.light }}
                        >
                          Login
                        </Link>
                        <Link
                          href="/signup"
                          className="block px-4 py-3 text-center font-medium text-gray-700"
                        >
                          Sign Up
                        </Link>
                      </>
                    )}
                  </div>
                )}
              </div>

              {/* Mobile Menu Button */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className={`sm:hidden ${iconButtonClass}`}
                aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
              >
                {isMobileMenuOpen ? (
                  <X className="w-6 h-6" style={{ color: COLORS.text.inverse }} />
                ) : (
                  <Menu className="w-6 h-6" style={{ color: COLORS.text.inverse }} />
                )}
              </button>
            </div>
          </div>

          {/* Mobile Search - Shown below header on mobile */}
          <div ref={searchRef} className="sm:hidden mt-3">
            <form onSubmit={handleSearchSubmit} className="w-full">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search products"
                  value={searchQuery}
                  onChange={(e) => handleSearchChange(e.target.value)}
                  onFocus={() => searchQuery && setShowSuggestions(true)}
                  className={searchInputClass}
                  style={{ borderColor: COLORS.border.default, '--tw-ring-color': COLORS.primary.main } as React.CSSProperties}
                />
                <button
                  type="submit"
                  className={searchButtonClass}
                  aria-label="Search"
                >
                  <Search className="w-5 h-5" />
                </button>

                {/* Mobile Search Suggestions */}
                {showSuggestions && suggestions.length > 0 && (
                  <div
                    className="absolute top-full left-0 right-0 mt-1 bg-white border rounded-lg shadow-lg z-50 max-h-48 overflow-y-auto"
                    style={{ borderColor: COLORS.border.default }}
                  >
                    {suggestions.map((suggestion) => (
                      <button
                        key={suggestion.id}
                        onClick={() => handleSuggestionClick(suggestion)}
                        className="w-full px-4 py-2 text-left text-sm hover:bg-gray-50 border-b"
                        style={{ borderColor: COLORS.border.light }}
                      >
                        {suggestion.title}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </form>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div
          className="sm:hidden border-t border-white/20"
          style={{ backgroundColor: COLORS.primary.main }}
        >
          <div className="px-4 py-4 space-y-4">
            <Link
              href="/sellers"
              className={`block ${navLinkClass}`}
              style={{ color: COLORS.text.inverse }}
            >
              Become a Seller
            </Link>
            {isLoggedIn ? (
              <>
                <Link
                  href="/profile"
                  className={`block ${navLinkClass}`}
                  style={{ color: COLORS.text.inverse }}
                >
                  My Profile
                </Link>
                <Link
                  href="/orders"
                  className={`block ${navLinkClass}`}
                  style={{ color: COLORS.text.inverse }}
                >
                  My Orders
                </Link>
                <button
                  onClick={() => {
                    logout();
                    router.push('/');
                    setIsMobileMenuOpen(false);
                  }}
                  className="w-full text-left text-sm font-medium transition-opacity duration-200 hover:opacity-80"
                  style={{ color: COLORS.accent.yellow }}
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  href="/login"
                  className={`block ${navLinkClass}`}
                  style={{ color: COLORS.text.inverse }}
                >
                  Login
                </Link>
                <Link
                  href="/signup"
                  className={`block ${navLinkClass}`}
                  style={{ color: COLORS.text.inverse }}
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
