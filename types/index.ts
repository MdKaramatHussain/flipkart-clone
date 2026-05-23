// User Types
export interface User {
  id: string;
  email: string;
  name: string;
  phone?: string;
  avatar?: string;
  addresses: Address[];
  createdAt: Date;
}

export interface Address {
  id: string;
  street: string;
  city: string;
  state: string;
  pincode: string;
  country: string;
  isDefault: boolean;
  type: 'home' | 'office';
}

// Product Types
export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  originalPrice: number;
  rating: number;
  reviews: number;
  image: string;
  images: string[];
  category: string;
  categoryId: string;
  brand: string;
  stock: number;
  specifications: Specification[];
  variants: ProductVariant[];
  discount: number;
  isFeatured: boolean;
  createdAt: Date;
}

export interface ProductVariant {
  id: string;
  name: string;
  value: string;
  price: number;
  stock: number;
}

export interface Specification {
  key: string;
  value: string;
}

export interface Category {
  id: string;
  name: string;
  icon: string;
  image: string;
  description: string;
}

// Cart Types
export interface CartItem {
  productId: string;
  variantId?: string;
  quantity: number;
  price: number;
}

export interface Cart {
  items: CartItem[];
  total: number;
  subtotal: number;
  tax: number;
  shipping: number;
  discount: number;
  couponCode?: string;
}

// Order Types
export interface Order {
  id: string;
  userId: string;
  items: OrderItem[];
  shippingAddress: Address;
  billingAddress: Address;
  paymentMethod: 'card' | 'upi' | 'wallet' | 'cod';
  status: 'pending' | 'confirmed' | 'shipped' | 'delivered' | 'cancelled' | 'returned';
  subtotal: number;
  tax: number;
  shipping: number;
  discount: number;
  total: number;
  couponCode?: string;
  trackingId?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface OrderItem {
  productId: string;
  name: string;
  image: string;
  price: number;
  quantity: number;
  variantId?: string;
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
  verified: boolean;
  helpful: number;
  createdAt: Date;
}

// Coupon Types
export interface Coupon {
  id: string;
  code: string;
  discount: number;
  discountType: 'percentage' | 'fixed';
  minOrderValue: number;
  maxDiscount: number;
  expiryDate: Date;
  usageLimit: number;
  usedCount: number;
  active: boolean;
}

// Banner Types
export interface Banner {
  id: string;
  image: string;
  title: string;
  description: string;
  link: string;
  active: boolean;
  position: number;
  createdAt: Date;
}

// Notification Types
export interface Notification {
  id: string;
  userId: string;
  title: string;
  message: string;
  type: 'order' | 'promotion' | 'system';
  read: boolean;
  link?: string;
  createdAt: Date;
}

// Analytics Types
export interface DashboardStats {
  totalOrders: number;
  totalRevenue: number;
  totalCustomers: number;
  totalProducts: number;
  orderGrowth: number;
  revenueGrowth: number;
}

export interface ChartData {
  name: string;
  value: number;
  revenue?: number;
  orders?: number;
  percentage?: number;
}

// Auth Types
export interface AuthState {
  user: User | null;
  isLoggedIn: boolean;
  isLoading: boolean;
  error?: string;
}

// Filter Types
export interface FilterOptions {
  categories: string[];
  priceRange: [number, number];
  ratings: number[];
  brands: string[];
  inStock: boolean;
}
