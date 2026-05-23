'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Search, ShoppingCart, Heart, User, Menu, X } from 'lucide-react';
import clsx from 'clsx';
import { MAIN_ROUTES, HEADER_NAV_ITEMS } from '@/constants/navigation';
import { COLORS } from '@/constants/colors';
import Button from './ui/button-base';
import Input from './ui/input-base';

interface FlipkartHeaderProps {
  cartCount?: number;
  wishlistCount?: number;
  isLoggedIn?: boolean;
  onSearchChange?: (query: string) => void;
  onMenuClick?: () => void;
}

/**
 * Flipkart-inspired Header Component
 * Primary navigation bar with search, cart, and user menu
 */
const FlipkartHeader = React.forwardRef<HTMLDivElement, FlipkartHeaderProps>(
  (
    {
      cartCount = 0,
      wishlistCount = 0,
      isLoggedIn = false,
      onSearchChange,
      onMenuClick,
    },
    ref
  ) => {
    const [searchQuery, setSearchQuery] = useState('');
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const handleSearchChange = (query: string) => {
      setSearchQuery(query);
      onSearchChange?.(query);
    };

    return (
      <header
        ref={ref}
        className={clsx(
          'sticky top-0 z-50 w-full border-b border-border',
          'bg-primary text-primary-foreground shadow-md'
        )}
      >
        {/* Main Header */}
        <div className="px-4 py-3 lg:px-6">
          <div className="flex items-center justify-between gap-4">
            {/* Logo */}
            <Link
              href={MAIN_ROUTES.home}
              className="flex-shrink-0 font-bold text-xl lg:text-2xl hover:opacity-80 transition-opacity"
            >
              Flipkart
            </Link>

            {/* Search Bar - Desktop */}
            <div className="hidden md:flex flex-1 max-w-md mx-2">
              <div className="w-full relative">
                <Input
                  type="text"
                  placeholder="Search for products, brands and more"
                  value={searchQuery}
                  onChange={handleSearchChange}
                  variant="filled"
                  size="md"
                  className="w-full bg-white text-foreground placeholder:text-gray-400"
                />
                <button className="absolute right-2 top-1/2 -translate-y-1/2 text-foreground hover:opacity-80">
                  <Search size={20} />
                </button>
              </div>
            </div>

            {/* Right Actions */}
            <div className="flex items-center gap-2 lg:gap-4">
              {/* Seller Button - Desktop */}
              <Link
                href="#"
                className="hidden lg:flex items-center gap-2 px-4 py-2 rounded-md bg-primary-foreground text-primary hover:bg-primary/10 transition-all duration-200 font-medium text-sm"
              >
                Become a Seller
              </Link>

              {/* Account Menu */}
              <Link
                href={isLoggedIn ? MAIN_ROUTES.account : MAIN_ROUTES.login}
                className="hidden sm:flex items-center gap-2 px-3 py-2 rounded-md hover:bg-primary/80 transition-colors duration-200"
              >
                <User size={20} />
                <span className="text-sm font-medium hidden lg:inline">
                  {isLoggedIn ? 'Account' : 'Login'}
                </span>
              </Link>

              {/* Wishlist */}
              <Link
                href={MAIN_ROUTES.wishlist}
                className="relative p-2 hover:bg-primary/80 rounded-md transition-colors duration-200"
              >
                <Heart size={20} />
                {wishlistCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 bg-accent text-primary text-xs font-bold rounded-full flex items-center justify-center">
                    {wishlistCount > 99 ? '99+' : wishlistCount}
                  </span>
                )}
              </Link>

              {/* Cart */}
              <Link
                href={MAIN_ROUTES.cart}
                className="relative p-2 hover:bg-primary/80 rounded-md transition-colors duration-200"
              >
                <ShoppingCart size={20} />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 bg-accent text-primary text-xs font-bold rounded-full flex items-center justify-center">
                    {cartCount > 99 ? '99+' : cartCount}
                  </span>
                )}
              </Link>

              {/* Mobile Menu Toggle */}
              <button
                onClick={() => {
                  setIsMobileMenuOpen(!isMobileMenuOpen);
                  onMenuClick?.();
                }}
                className="lg:hidden p-2 hover:bg-primary/80 rounded-md transition-colors duration-200"
              >
                {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
              </button>
            </div>
          </div>
        </div>

        {/* Search Bar - Mobile */}
        <div className="block md:hidden px-4 py-2 border-t border-primary/20">
          <div className="relative">
            <Input
              type="text"
              placeholder="Search"
              value={searchQuery}
              onChange={handleSearchChange}
              variant="filled"
              size="md"
              className="w-full bg-white text-foreground"
            />
            <button className="absolute right-2 top-1/2 -translate-y-1/2 text-foreground hover:opacity-80">
              <Search size={18} />
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden border-t border-primary/20 bg-primary">
            <nav className="px-4 py-3 space-y-2">
              <Link
                href={MAIN_ROUTES.home}
                className="block px-3 py-2 rounded-md hover:bg-primary/80 transition-colors duration-200"
              >
                Home
              </Link>
              <Link
                href={MAIN_ROUTES.products}
                className="block px-3 py-2 rounded-md hover:bg-primary/80 transition-colors duration-200"
              >
                Products
              </Link>
              <Link
                href="#"
                className="block px-3 py-2 rounded-md hover:bg-primary/80 transition-colors duration-200"
              >
                Best Deals
              </Link>
              <Link
                href="#"
                className="block px-3 py-2 rounded-md hover:bg-primary/80 transition-colors duration-200"
              >
                Become a Seller
              </Link>
            </nav>
          </div>
        )}

        {/* Navigation Bar - Desktop */}
        <nav className="hidden lg:block px-4 lg:px-6 py-2 border-t border-primary/20 bg-primary/95 overflow-x-auto">
          <div className="flex gap-6">
            {HEADER_NAV_ITEMS.map((item) => (
              <Link
                key={item.id}
                href={item.path}
                className="text-sm font-medium px-3 py-2 hover:bg-primary/80 rounded-md transition-colors duration-200 whitespace-nowrap"
              >
                {item.label}
              </Link>
            ))}
          </div>
        </nav>
      </header>
    );
  }
);

FlipkartHeader.displayName = 'FlipkartHeader';

export default FlipkartHeader;
