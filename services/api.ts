import type {
  Product,
  Category,
  Order,
  Review,
  Coupon,
  Banner,
  DashboardStats,
  ChartData,
} from '@/types';
import {
  PRODUCTS,
  CATEGORIES,
  BANNERS,
  COUPONS,
  MOCK_REVENUE_DATA,
  MOCK_CATEGORY_SALES,
  MOCK_TOP_PRODUCTS,
} from '@/constants/data';

const API_DELAY = 500; // Simulate network delay

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

// Product Services
export const productService = {
  async getProducts(filters?: any): Promise<Product[]> {
    await delay(API_DELAY);
    let products = [...PRODUCTS];

    if (filters?.category) {
      products = products.filter((p) => p.categoryId === filters.category);
    }

    if (filters?.search) {
      const searchLower = filters.search.toLowerCase();
      products = products.filter(
        (p) => p.name.toLowerCase().includes(searchLower) || p.description.toLowerCase().includes(searchLower)
      );
    }

    if (filters?.priceRange) {
      const [min, max] = filters.priceRange;
      products = products.filter((p) => p.price >= min && p.price <= max);
    }

    if (filters?.brand) {
      products = products.filter((p) => p.brand === filters.brand);
    }

    return products;
  },

  async getProductById(id: string): Promise<Product | null> {
    await delay(API_DELAY);
    return PRODUCTS.find((p) => p.id === id) || null;
  },

  async getFeaturedProducts(): Promise<Product[]> {
    await delay(API_DELAY);
    return PRODUCTS.filter((p) => p.isFeatured);
  },

  async createProduct(product: Omit<Product, 'id' | 'createdAt'>): Promise<Product> {
    await delay(API_DELAY);
    const newProduct: Product = {
      ...product,
      id: Math.random().toString(36).substr(2, 9),
      createdAt: new Date(),
    };
    PRODUCTS.push(newProduct);
    return newProduct;
  },

  async updateProduct(id: string, updates: Partial<Product>): Promise<Product | null> {
    await delay(API_DELAY);
    const product = PRODUCTS.find((p) => p.id === id);
    if (product) {
      Object.assign(product, updates);
      return product;
    }
    return null;
  },

  async deleteProduct(id: string): Promise<boolean> {
    await delay(API_DELAY);
    const index = PRODUCTS.findIndex((p) => p.id === id);
    if (index > -1) {
      PRODUCTS.splice(index, 1);
      return true;
    }
    return false;
  },
};

// Category Services
export const categoryService = {
  async getCategories(): Promise<Category[]> {
    await delay(API_DELAY);
    return CATEGORIES;
  },

  async getCategoryById(id: string): Promise<Category | null> {
    await delay(API_DELAY);
    return CATEGORIES.find((c) => c.id === id) || null;
  },
};

// Order Services
export const orderService = {
  async getOrders(userId?: string): Promise<Order[]> {
    await delay(API_DELAY);
    // Mock implementation
    return [];
  },

  async getOrderById(id: string): Promise<Order | null> {
    await delay(API_DELAY);
    return null;
  },

  async createOrder(order: Omit<Order, 'id' | 'createdAt' | 'updatedAt'>): Promise<Order> {
    await delay(API_DELAY);
    const newOrder: Order = {
      ...order,
      id: `ORD-${Date.now()}`,
      status: 'pending',
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    return newOrder;
  },

  async updateOrderStatus(orderId: string, status: Order['status']): Promise<Order | null> {
    await delay(API_DELAY);
    return null;
  },
};

// Review Services
export const reviewService = {
  async getProductReviews(productId: string): Promise<Review[]> {
    await delay(API_DELAY);
    // Mock implementation
    return [
      {
        id: '1',
        productId,
        userId: 'user1',
        userName: 'John Doe',
        rating: 5,
        title: 'Excellent Product',
        comment: 'Really happy with this purchase. Great quality and fast delivery.',
        verified: true,
        helpful: 24,
        createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
      },
      {
        id: '2',
        productId,
        userId: 'user2',
        userName: 'Jane Smith',
        rating: 4,
        title: 'Good Value',
        comment: 'Good product, could have been better packaging.',
        verified: true,
        helpful: 12,
        createdAt: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000),
      },
    ];
  },

  async createReview(review: Omit<Review, 'id' | 'createdAt'>): Promise<Review> {
    await delay(API_DELAY);
    return {
      ...review,
      id: Math.random().toString(36).substr(2, 9),
      createdAt: new Date(),
    };
  },
};

// Coupon Services
export const couponService = {
  async getCoupons(): Promise<Coupon[]> {
    await delay(API_DELAY);
    return COUPONS;
  },

  async validateCoupon(code: string): Promise<Coupon | null> {
    await delay(API_DELAY);
    const coupon = COUPONS.find((c) => c.code === code && c.active);
    return coupon || null;
  },

  async applyCoupon(code: string): Promise<{ success: boolean; discount: number; message: string }> {
    await delay(API_DELAY);
    const coupon = COUPONS.find((c) => c.code === code);

    if (!coupon) {
      return { success: false, discount: 0, message: 'Invalid coupon code' };
    }

    if (!coupon.active) {
      return { success: false, discount: 0, message: 'Coupon expired' };
    }

    if (coupon.usedCount >= coupon.usageLimit) {
      return { success: false, discount: 0, message: 'Coupon usage limit exceeded' };
    }

    return { success: true, discount: coupon.discount, message: 'Coupon applied successfully' };
  },
};

// Banner Services
export const bannerService = {
  async getBanners(): Promise<Banner[]> {
    await delay(API_DELAY);
    return BANNERS.filter((b) => b.active);
  },
};

// Dashboard Services
export const dashboardService = {
  async getDashboardStats(): Promise<DashboardStats> {
    await delay(API_DELAY);
    return {
      totalOrders: 1245,
      totalRevenue: 4850000,
      totalCustomers: 892,
      totalProducts: PRODUCTS.length,
      orderGrowth: 12.5,
      revenueGrowth: 18.3,
    };
  },

  async getRevenueData(): Promise<ChartData[]> {
    await delay(API_DELAY);
    return MOCK_REVENUE_DATA;
  },

  async getCategorySalesData(): Promise<ChartData[]> {
    await delay(API_DELAY);
    return MOCK_CATEGORY_SALES;
  },

  async getTopProducts(): Promise<ChartData[]> {
    await delay(API_DELAY);
    return MOCK_TOP_PRODUCTS;
  },

  async getInventoryStats(): Promise<any> {
    await delay(API_DELAY);
    return {
      totalStock: PRODUCTS.reduce((sum, p) => sum + p.stock, 0),
      lowStock: PRODUCTS.filter((p) => p.stock < 20).length,
      outOfStock: PRODUCTS.filter((p) => p.stock === 0).length,
    };
  },
};

// Search Service
export const searchService = {
  async searchProducts(query: string): Promise<Product[]> {
    await delay(API_DELAY);
    const lowerQuery = query.toLowerCase();
    return PRODUCTS.filter(
      (p) =>
        p.name.toLowerCase().includes(lowerQuery) ||
        p.description.toLowerCase().includes(lowerQuery) ||
        p.brand.toLowerCase().includes(lowerQuery) ||
        p.category.toLowerCase().includes(lowerQuery)
    );
  },

  async getSearchSuggestions(query: string): Promise<string[]> {
    await delay(200);
    const lowerQuery = query.toLowerCase();
    const suggestions = new Set<string>();

    PRODUCTS.forEach((p) => {
      if (p.name.toLowerCase().includes(lowerQuery)) {
        suggestions.add(p.name);
      }
      if (p.brand.toLowerCase().includes(lowerQuery)) {
        suggestions.add(p.brand);
      }
      if (p.category.toLowerCase().includes(lowerQuery)) {
        suggestions.add(p.category);
      }
    });

    return Array.from(suggestions).slice(0, 5);
  },
};
