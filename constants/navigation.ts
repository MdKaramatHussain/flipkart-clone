/**
 * Navigation Configuration
 * Routes, menu items, and navigation structure
 */

import {
  Home,
  ShoppingCart,
  User,
  Package,
  Heart,
  LogOut,
  Settings,
  Bell,
  Search,
  Menu,
  X,
  ChevronDown,
  BarChart3,
  Users,
  Package2,
  Tag,
  TrendingUp,
  Grid3X3,
} from 'lucide-react';

// Main Navigation Routes
export const MAIN_ROUTES = {
  home: '/',
  products: '/products',
  search: '/search',
  cart: '/cart',
  checkout: '/checkout',
  orders: '/orders',
  account: '/account',
  profile: '/profile',
  wishlist: '/wishlist',
  login: '/login',
  signup: '/signup',
  admin: '/admin',
} as const;

// Category Navigation Items
export const CATEGORIES = [
  {
    id: 'electronics',
    name: 'Electronics',
    slug: 'electronics',
    icon: '📱',
    subcategories: [
      'Mobiles',
      'Laptops',
      'Tablets',
      'Headphones',
      'Cameras',
      'Smartwatches',
      'Gaming',
      'Accessories',
    ],
  },
  {
    id: 'fashion',
    name: 'Fashion',
    slug: 'fashion',
    icon: '👕',
    subcategories: ['Men', 'Women', 'Kids', 'Footwear', 'Accessories', 'Sports Wear'],
  },
  {
    id: 'home-living',
    name: 'Home & Living',
    slug: 'home-living',
    icon: '🏠',
    subcategories: ['Furniture', 'Decor', 'Bedding', 'Kitchenware', 'Lighting', 'Plants'],
  },
  {
    id: 'sports',
    name: 'Sports',
    slug: 'sports',
    icon: '⚽',
    subcategories: ['Fitness', 'Outdoor', 'Team Sports', 'Water Sports', 'Cycling'],
  },
  {
    id: 'books',
    name: 'Books',
    slug: 'books',
    icon: '📚',
    subcategories: ['Fiction', 'Non-Fiction', 'Educational', 'Comics', 'Magazines'],
  },
  {
    id: 'beauty',
    name: 'Beauty',
    slug: 'beauty',
    icon: '💄',
    subcategories: ['Skincare', 'Makeup', 'Hair Care', 'Personal Care', 'Fragrances'],
  },
  {
    id: 'toys',
    name: 'Toys',
    slug: 'toys',
    icon: '🧸',
    subcategories: ['Dolls', 'Action Figures', 'Puzzles', 'Board Games', 'Building Sets'],
  },
  {
    id: 'grocery',
    name: 'Grocery',
    slug: 'grocery',
    icon: '🛒',
    subcategories: ['Vegetables', 'Fruits', 'Dairy', 'Snacks', 'Beverages', 'Pantry'],
  },
] as const;

// User Account Menu Items
export const ACCOUNT_MENU_ITEMS = [
  {
    id: 'profile',
    name: 'My Profile',
    path: '/account/profile',
    icon: User,
  },
  {
    id: 'addresses',
    name: 'My Addresses',
    path: '/account/addresses',
    icon: Package,
  },
  {
    id: 'orders',
    name: 'My Orders',
    path: '/orders',
    icon: Package2,
  },
  {
    id: 'wishlist',
    name: 'My Wishlist',
    path: '/wishlist',
    icon: Heart,
  },
  {
    id: 'notifications',
    name: 'Notifications',
    path: '/account/notifications',
    icon: Bell,
  },
  {
    id: 'settings',
    name: 'Settings',
    path: '/account/settings',
    icon: Settings,
  },
  {
    id: 'logout',
    name: 'Logout',
    path: '/logout',
    icon: LogOut,
    isDangerous: true,
  },
] as const;

// Admin Navigation Items
export const ADMIN_MENU_ITEMS = [
  {
    id: 'dashboard',
    name: 'Dashboard',
    path: '/admin',
    icon: BarChart3,
  },
  {
    id: 'products',
    name: 'Products',
    path: '/admin/products',
    icon: Package2,
  },
  {
    id: 'orders',
    name: 'Orders',
    path: '/admin/orders',
    icon: Grid3X3,
  },
  {
    id: 'customers',
    name: 'Customers',
    path: '/admin/customers',
    icon: Users,
  },
  {
    id: 'analytics',
    name: 'Analytics',
    path: '/admin/analytics',
    icon: TrendingUp,
  },
  {
    id: 'coupons',
    name: 'Coupons',
    path: '/admin/coupons',
    icon: Tag,
  },
  {
    id: 'banners',
    name: 'Banners',
    path: '/admin/banners',
    icon: TrendingUp,
  },
  {
    id: 'settings',
    name: 'Settings',
    path: '/admin/settings',
    icon: Settings,
  },
] as const;

// Header Navigation (Top Bar Items)
export const HEADER_NAV_ITEMS = [
  {
    id: 'home',
    label: 'Home',
    path: '/',
  },
  {
    id: 'categories',
    label: 'Categories',
    path: '/categories',
    hasDropdown: true,
  },
  {
    id: 'deals',
    label: 'Best Deals',
    path: '/deals',
  },
  {
    id: 'seller',
    label: 'Become a Seller',
    path: '/seller',
  },
] as const;

// Footer Links
export const FOOTER_LINKS = {
  about: [
    { label: 'About Us', href: '/about' },
    { label: 'Careers', href: '/careers' },
    { label: 'Press', href: '/press' },
    { label: 'Blog', href: '/blog' },
  ],
  help: [
    { label: 'Help Center', href: '/help' },
    { label: 'Contact Us', href: '/contact' },
    { label: 'Report Issue', href: '/report-issue' },
    { label: 'Feedback', href: '/feedback' },
  ],
  policy: [
    { label: 'Privacy Policy', href: '/privacy' },
    { label: 'Terms & Conditions', href: '/terms' },
    { label: 'Returns & Refunds', href: '/returns' },
    { label: 'Shipping Policy', href: '/shipping' },
  ],
  social: [
    { label: 'Facebook', href: 'https://facebook.com' },
    { label: 'Twitter', href: 'https://twitter.com' },
    { label: 'Instagram', href: 'https://instagram.com' },
    { label: 'LinkedIn', href: 'https://linkedin.com' },
  ],
} as const;

/**
 * Navigation Utility Functions
 */
export const getCategoryBySlug = (slug: string) => {
  return CATEGORIES.find((cat) => cat.slug === slug);
};

export const getCategoryById = (id: string) => {
  return CATEGORIES.find((cat) => cat.id === id);
};

export const getAccountMenuItem = (id: string) => {
  return ACCOUNT_MENU_ITEMS.find((item) => item.id === id);
};

export const getAdminMenuItem = (id: string) => {
  return ADMIN_MENU_ITEMS.find((item) => item.id === id);
};
