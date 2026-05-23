// User Types
export interface User {
  id: string;
  email: string;
  name: string;
  phone: string;
  addresses: Address[];
  createdAt: Date;
  avatar?: string;
  isVerified?: boolean;
}

export interface Address {
  id: string;
  type: 'home' | 'work' | 'other';
  name: string;
  phone: string;
  street: string;
  city: string;
  state: string;
  pincode: string;
  isDefault: boolean;
}

// Product Types
export interface Product {
  id: string;
  name: string;
  description: string;
  category: string;
  subcategory: string;
  brand: string;
  price: number;
  originalPrice: number;
  discount: number;
  rating: number;
  reviews: number;
  stock: number;
  image: string[];
  thumbnail?: string;
  specs: Record<string, string>;
  warranty: string;
  delivery: string;
  
  // Flipkart-inspired fields
  seller: {
    id: string;
    name: string;
    verified: boolean;
    rating?: number;
  };
  isFeatured?: boolean;
  isTrending?: boolean;
  isNewArrival?: boolean;
  fastDelivery?: boolean;
  badges?: string[]; // e.g., ['Best Seller', 'Great Value']
  color?: string;
  size?: string;
  sku?: string;
}

export interface CartItem {
  id: string;
  productId: string;
  quantity: number;
  price: number;
  addedAt: Date;
  product?: Product;
}

export interface Cart {
  items: CartItem[];
  subtotal: number;
  discount: number;
  tax: number;
  shipping: number;
  total: number;
  couponCode?: string;
  couponDiscount: number;
}

// Order Types
export enum OrderStatus {
  PENDING = 'pending',
  CONFIRMED = 'confirmed',
  SHIPPED = 'shipped',
  DELIVERED = 'delivered',
  CANCELLED = 'cancelled',
}

export interface OrderItem {
  productId: string;
  productName: string;
  quantity: number;
  price: number;
  image: string;
}

export interface Order {
  id: string;
  userId: string;
  items: OrderItem[];
  shippingAddress: Address;
  billingAddress: Address;
  subtotal: number;
  discount: number;
  tax: number;
  shipping: number;
  total: number;
  status: OrderStatus;
  paymentMethod: string;
  createdAt: Date;
  estimatedDelivery: Date;
}

// Coupon Types
export interface Coupon {
  id: string;
  code: string;
  discountType: 'percentage' | 'fixed';
  discountValue: number;
  minOrderValue: number;
  maxDiscount?: number;
  expiryDate: Date;
  usageLimit: number;
  used: number;
  isActive: boolean;
}

// Wishlist Types
export interface WishlistItem {
  id: string;
  productId: string;
  addedAt: Date;
}

export interface Wishlist {
  items: WishlistItem[];
}

// Review Types
export interface Review {
  id: string;
  productId: string;
  userId: string;
  userName: string;
  rating: number;
  title: string;
  comment: string;
  helpful: number;
  images: string[];
  createdAt: Date;
}

// Notification Types
export interface Notification {
  id: string;
  userId: string;
  type: 'order' | 'offer' | 'message' | 'system';
  title: string;
  message: string;
  read: boolean;
  link?: string;
  createdAt: Date;
}

// API Response Types
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface PaginatedResponse<T> {
  items: T[];
  total: number;
  page: number;
  limit: number;
  hasMore: boolean;
}

// Filter Types
export interface FilterOptions {
  category?: string;
  brand?: string;
  priceRange?: [number, number];
  rating?: number;
  inStock?: boolean;
  sortBy?: 'relevance' | 'price-low' | 'price-high' | 'rating' | 'newest';
  page?: number;
  limit?: number;
}

// Banner Types (for Flipkart-style carousels)
export interface Banner {
  id: string;
  title: string;
  description?: string;
  image: string;
  link?: string;
  order: number;
  active: boolean;
  type: 'hero' | 'category' | 'deal' | 'promo';
}

// Category Types
export interface Category {
  id: string;
  name: string;
  slug: string;
  icon?: string;
  image?: string;
  description?: string;
  subcategories?: Category[];
}

// Seller Types
export interface Seller {
  id: string;
  name: string;
  description?: string;
  logo?: string;
  verified: boolean;
  rating: number;
  totalProducts: number;
  responseTime?: number; // in hours
}

// Badge Types
export interface ProductBadge {
  id: string;
  text: string;
  type: 'bestseller' | 'discount' | 'new' | 'featured' | 'verified' | 'fastDelivery';
  backgroundColor?: string;
  textColor?: string;
}

// Search History Type
export interface SearchHistory {
  id: string;
  userId: string;
  query: string;
  timestamp: Date;
}

// Brand Types
export interface Brand {
  id: string;
  name: string;
  logo?: string;
  description?: string;
  verified?: boolean;
}

// Component Types (for UI Props)
export interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'ghost' | 'outline' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
  loading?: boolean;
  disabled?: boolean;
  onClick?: () => void;
}

export interface InputProps {
  variant?: 'default' | 'outlined' | 'filled';
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
  disabled?: boolean;
  error?: string;
  placeholder?: string;
  value?: string;
  onChange?: (value: string) => void;
}

export interface BadgeProps {
  variant?: 'primary' | 'secondary' | 'success' | 'error' | 'warning' | 'info';
  size?: 'sm' | 'md' | 'lg';
  text: string;
}

export interface CardProps {
  variant?: 'default' | 'elevated' | 'outlined';
  padding?: 'sm' | 'md' | 'lg';
  hoverable?: boolean;
  onClick?: () => void;
}
