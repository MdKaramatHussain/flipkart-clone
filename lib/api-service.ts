import type { Product, PaginatedResponse, ApiResponse, FilterOptions, Order } from './types';
import { PRODUCTS, COUPONS } from './constants';

// Simulate API delays
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// Products API
export const productsApi = {
  search: async (query: string, options?: FilterOptions): Promise<PaginatedResponse<Product>> => {
    await delay(500);
    
    let filtered = PRODUCTS.filter(p =>
      p.name.toLowerCase().includes(query.toLowerCase()) ||
      p.brand.toLowerCase().includes(query.toLowerCase()) ||
      p.description.toLowerCase().includes(query.toLowerCase())
    );

    // Apply filters
    if (options?.category) {
      filtered = filtered.filter(p => p.category === options.category);
    }
    if (options?.brand) {
      filtered = filtered.filter(p => p.brand === options.brand);
    }
    if (options?.priceRange) {
      filtered = filtered.filter(
        p => p.price >= options.priceRange![0] && p.price <= options.priceRange![1]
      );
    }
    if (options?.rating) {
      filtered = filtered.filter(p => p.rating >= options.rating!);
    }
    if (options?.inStock) {
      filtered = filtered.filter(p => p.stock > 0);
    }

    // Apply sorting
    switch (options?.sortBy) {
      case 'price-low':
        filtered.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        filtered.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        filtered.sort((a, b) => b.rating - a.rating);
        break;
      case 'newest':
        filtered.sort((a, b) => b.id.localeCompare(a.id));
        break;
      default:
        filtered.sort((a, b) => b.reviews - a.reviews);
    }

    // Pagination
    const page = options?.page || 1;
    const limit = options?.limit || 20;
    const start = (page - 1) * limit;
    const items = filtered.slice(start, start + limit);
    const total = filtered.length;

    return {
      items,
      total,
      page,
      limit,
      hasMore: start + limit < total,
    };
  },

  getById: async (id: string): Promise<ApiResponse<Product>> => {
    await delay(300);
    const product = PRODUCTS.find(p => p.id === id);
    if (!product) {
      return { success: false, error: 'Product not found' };
    }
    return { success: true, data: product };
  },

  getByCategory: async (category: string, limit: number = 10): Promise<ApiResponse<Product[]>> => {
    await delay(400);
    const products = PRODUCTS.filter(p => p.category === category).slice(0, limit);
    return { success: true, data: products };
  },

  getSimilar: async (productId: string, limit: number = 5): Promise<ApiResponse<Product[]>> => {
    await delay(350);
    const product = PRODUCTS.find(p => p.id === productId);
    if (!product) {
      return { success: false, error: 'Product not found' };
    }
    const similar = PRODUCTS.filter(
      p => p.category === product.category && p.id !== productId
    ).slice(0, limit);
    return { success: true, data: similar };
  },

  getTrending: async (limit: number = 10): Promise<ApiResponse<Product[]>> => {
    await delay(400);
    const trending = PRODUCTS.filter(p => p.discount > 30)
      .sort((a, b) => b.reviews - a.reviews)
      .slice(0, limit);
    return { success: true, data: trending };
  },

  getFeatured: async (limit: number = 8): Promise<ApiResponse<Product[]>> => {
    await delay(350);
    const featured = PRODUCTS.filter(p => p.rating > 4.5)
      .sort((a, b) => b.rating - a.rating)
      .slice(0, limit);
    return { success: true, data: featured };
  },
};

// Coupons API
export const couponsApi = {
  validate: async (code: string, orderValue: number): Promise<ApiResponse<any>> => {
    await delay(400);
    
    const coupon = COUPONS.find(c => c.code === code);
    
    if (!coupon) {
      return { success: false, error: 'Invalid coupon code' };
    }
    
    if (!coupon.isActive) {
      return { success: false, error: 'Coupon has expired' };
    }
    
    if (orderValue < coupon.minOrderValue) {
      return {
        success: false,
        error: `Minimum order value of ₹${coupon.minOrderValue} required`,
      };
    }
    
    if (coupon.used >= coupon.usageLimit) {
      return { success: false, error: 'Coupon limit exceeded' };
    }

    let discount = 0;
    if (coupon.discountType === 'percentage') {
      discount = Math.round((orderValue * coupon.discountValue) / 100);
      if (coupon.maxDiscount) {
        discount = Math.min(discount, coupon.maxDiscount);
      }
    } else {
      discount = coupon.discountValue;
    }

    return {
      success: true,
      data: {
        couponId: coupon.id,
        code: coupon.code,
        discount,
        discountType: coupon.discountType,
      },
    };
  },

  getAll: async (): Promise<ApiResponse<any[]>> => {
    await delay(300);
    return { success: true, data: COUPONS.filter(c => c.isActive) };
  },
};

// Orders API
export const ordersApi = {
  create: async (orderData: any): Promise<ApiResponse<Order>> => {
    await delay(1000);
    
    const orderId = `ORD-${Date.now()}`;
    const order: Order = {
      id: orderId,
      userId: orderData.userId,
      items: orderData.items,
      shippingAddress: orderData.shippingAddress,
      billingAddress: orderData.billingAddress,
      subtotal: orderData.subtotal,
      discount: orderData.discount,
      tax: orderData.tax,
      shipping: orderData.shipping,
      total: orderData.total,
      status: 'pending',
      paymentMethod: orderData.paymentMethod,
      createdAt: new Date(),
      estimatedDelivery: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
    };

    return { success: true, data: order };
  },

  getById: async (orderId: string): Promise<ApiResponse<Order>> => {
    await delay(300);
    // In real app, fetch from database
    return {
      success: false,
      error: 'Order not found',
    };
  },

  getAll: async (userId: string, limit: number = 10): Promise<ApiResponse<Order[]>> => {
    await delay(400);
    // In real app, fetch from database
    return { success: true, data: [] };
  },
};

// Search API
export const searchApi = {
  getAutocomplete: async (query: string): Promise<ApiResponse<string[]>> => {
    await delay(200);
    
    const matches = new Set<string>();
    const q = query.toLowerCase();
    
    PRODUCTS.forEach(p => {
      if (p.name.toLowerCase().includes(q)) matches.add(p.name);
      if (p.brand.toLowerCase().includes(q)) matches.add(p.brand);
      if (p.category.toLowerCase().includes(q)) matches.add(p.category);
    });

    return { success: true, data: Array.from(matches).slice(0, 5) };
  },
};

// User API
export const userApi = {
  getProfile: async (userId: string): Promise<ApiResponse<any>> => {
    await delay(300);
    // In real app, fetch from database
    return {
      success: false,
      error: 'User not found',
    };
  },

  updateProfile: async (userId: string, data: any): Promise<ApiResponse<any>> => {
    await delay(400);
    return { success: true, data };
  },

  addAddress: async (userId: string, address: any): Promise<ApiResponse<any>> => {
    await delay(300);
    return { success: true, data: { id: `addr-${Date.now()}`, ...address } };
  },
};

// Cart API (for server-side operations)
export const cartApi = {
  validateCartItems: async (items: any[]): Promise<ApiResponse<any[]>> => {
    await delay(400);
    
    const validated = items.map(item => {
      const product = PRODUCTS.find(p => p.id === item.productId);
      if (!product) {
        return { ...item, error: 'Product not found' };
      }
      if (product.stock < item.quantity) {
        return { ...item, error: 'Insufficient stock' };
      }
      return { ...item, valid: true };
    });

    return { success: true, data: validated };
  },
};
