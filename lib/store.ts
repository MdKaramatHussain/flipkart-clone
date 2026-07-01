import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { User, CartItem, Cart, Wishlist, WishlistItem, Order, Product } from './types';
import { PRODUCTS } from './constants';

// ==================== PRODUCT STORE ====================

interface ProductStore {
  products: Product[];
  isLoading: boolean;
  error: string | null;
  
  // Product Management
  addProduct: (product: Product) => void;
  updateProduct: (id: string, updates: Partial<Product>) => void;
  deleteProduct: (id: string) => void;
  setProducts: (products: Product[]) => void;
  
  // Product Queries
  getProductById: (id: string) => Product | undefined;
  getProductsByCategory: (category: string) => Product[];
  getProductsByBrand: (brand: string) => Product[];
  getFeaturedProducts: () => Product[];
  getTrendingProducts: () => Product[];
  getNewArrivals: () => Product[];
  searchProducts: (query: string) => Product[];
  filterProducts: (filters: {
    category?: string;
    priceRange?: { min: number; max: number };
    rating?: number;
    brand?: string;
  }) => Product[];
}

export const useProductStore = create<ProductStore>()(
  persist(
    (set, get) => ({
      products: PRODUCTS,
      isLoading: false,
      error: null,

      addProduct: (product: Product) => {
        set((state) => {
          // Check if product already exists
          if (state.products.some((p) => p.id === product.id)) {
            return state;
          }
          return {
            products: [product, ...state.products],
          };
        });
      },

      updateProduct: (id: string, updates: Partial<Product>) => {
        set((state) => ({
          products: state.products.map((product) =>
            product.id === id ? { ...product, ...updates } : product
          ),
        }));
      },

      deleteProduct: (id: string) => {
        set((state) => ({
          products: state.products.filter((product) => product.id !== id),
        }));
      },

      setProducts: (products: Product[]) => {
        set({ products });
      },

      getProductById: (id: string) => {
        return get().products.find((product) => product.id === id);
      },

      getProductsByCategory: (category: string) => {
        return get().products.filter(
          (product) =>
            product.category.toLowerCase() === category.toLowerCase()
        );
      },

      getProductsByBrand: (brand: string) => {
        return get().products.filter(
          (product) =>
            product.brand.toLowerCase() === brand.toLowerCase()
        );
      },

      getFeaturedProducts: () => {
        return get()
          .products.filter((product) => product.isFeatured)
          .slice(0, 12);
      },

      getTrendingProducts: () => {
        return get()
          .products.filter((product) => product.isTrending)
          .slice(0, 12);
      },

      getNewArrivals: () => {
        return get()
          .products.filter((product) => product.isNewArrival)
          .slice(0, 12);
      },

      searchProducts: (query: string) => {
        const lowerQuery = query.toLowerCase();
        return get().products.filter(
          (product) =>
            product.name.toLowerCase().includes(lowerQuery) ||
            product.description.toLowerCase().includes(lowerQuery) ||
            product.brand.toLowerCase().includes(lowerQuery) ||
            product.category.toLowerCase().includes(lowerQuery)
        );
      },

      filterProducts: (filters) => {
        let filtered = [...get().products];

        if (filters.category) {
          filtered = filtered.filter(
            (product) =>
              product.category.toLowerCase() === filters.category!.toLowerCase()
          );
        }

        if (filters.priceRange) {
          filtered = filtered.filter(
            (product) =>
              product.price >= filters.priceRange!.min &&
              product.price <= filters.priceRange!.max
          );
        }

        if (filters.rating) {
          filtered = filtered.filter(
            (product) => product.rating >= filters.rating!
          );
        }

        if (filters.brand) {
          filtered = filtered.filter(
            (product) =>
              product.brand.toLowerCase() === filters.brand!.toLowerCase()
          );
        }

        return filtered;
      },
    }),
    {
      name: 'product-store',
      version: 1,
    }
  )
);

// Cart Store
interface CartStore {
  cart: Cart;
  addToCart: (productId: string, quantity: number) => void;
  addToCartBuyNow: (productId: string, quantity: number) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  applyCoupon: (code: string) => void;
  removeCoupon: () => void;
}

const calculateCartTotals = (items: CartItem[]): Omit<Cart, 'items' | 'couponCode' | 'couponDiscount' | 'selectBuyNow' | 'buyNowItem'> => {
  const subtotal = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const tax = 0 // Math.round(subtotal * 0.05);
  const shipping = 0 // subtotal > 500 ? 0 : 50;
  
  return {
    subtotal,
    tax,
    shipping,
    discount: 0,
    total: subtotal + tax + shipping,
  };
};

export const useCartStore = create<CartStore>()(
  persist(
    (set) => ({
      cart: {
        items: [],
        selectBuyNow: false,
        buyNowItem: null,
        subtotal: 0,
        discount: 0,
        tax: 0,
        shipping: 0,
        total: 0,
        couponDiscount: 0,
      },
      addToCartBuyNow: (productId: string, quantity: number) =>
        set((state) => {
          const product = PRODUCTS.find(p => p.id === productId);
          const id= `${productId}-${Date.now()}`
          if (!product) return state;
          return {
            cart: { ...state.cart, selectBuyNow: true, buyNowItem: { id, productId, quantity, price: product.price, addedAt: new Date() } },
          };
        }),
      addToCart: (productId: string, quantity: number) =>
        set((state) => {
          const product = PRODUCTS.find(p => p.id === productId);
          if (!product) return state;

          const existingItem = state.cart.items.find(item => item.productId === productId);
          let newItems: CartItem[];

          if (existingItem) {
            newItems = state.cart.items.map(item =>
              item.productId === productId
                ? { ...item, quantity: item.quantity + quantity }
                : item
            );
          } else {
            newItems = [
              ...state.cart.items,
              {
                id: `${productId}-${Date.now()}`,
                productId,
                quantity,
                price: product.price,
                addedAt: new Date(),
              },
            ];
          }

          const totals = calculateCartTotals(newItems);
          return {
            cart: { ...state.cart, items: newItems, ...totals },
          };
        }),

      removeFromCart: (productId: string) =>
        set((state) => {
          const newItems = state.cart.items.filter(item => item.productId !== productId);
          const totals = calculateCartTotals(newItems);
          return {
            cart: { ...state.cart, items: newItems, ...totals },
          };
        }),

      updateQuantity: (productId: string, quantity: number) =>
        set((state) => {
          if (quantity <= 0) return state;

          const newItems = state.cart.items.map(item =>
            item.productId === productId ? { ...item, quantity } : item
          );

          const totals = calculateCartTotals(newItems);
          return {
            cart: { ...state.cart, items: newItems, ...totals },
          };
        }),

      clearCart: () =>
        set({
          cart: {
            items: [],
            selectBuyNow: false,
            buyNowItem: null,
            subtotal: 0,
            discount: 0,
            tax: 0,
            shipping: 0,
            total: 0,
            couponDiscount: 0,
          },
        }),

      applyCoupon: (code: string) =>
        set((state) => {
          // Simplified coupon logic - in production, validate against backend
          const discountPercent = code === 'WELCOME50' ? 10 : code === 'FLAT500' ? 250 : 0;
          const couponDiscount = Math.min(discountPercent, state.cart.subtotal * 0.5);

          return {
            cart: {
              ...state.cart,
              couponCode: code,
              couponDiscount,
              discount: couponDiscount,
              total: state.cart.subtotal + state.cart.tax + state.cart.shipping - couponDiscount,
            },
          };
        }),

      removeCoupon: () =>
        set((state) => {
          const totals = calculateCartTotals(state.cart.items);
          return {
            cart: {
              ...state.cart,
              ...totals,
              couponCode: undefined,
              couponDiscount: 0,
            },
          };
        }),
    }),
    {
      name: 'cart-store',
    }
  )
);

// Wishlist Store
interface WishlistStore {
  wishlist: Wishlist;
  addToWishlist: (productId: string) => void;
  removeFromWishlist: (productId: string) => void;
  isInWishlist: (productId: string) => boolean;
}

export const useWishlistStore = create<WishlistStore>()(
  persist(
    (set, get) => ({
      wishlist: { items: [] },
      addToWishlist: (productId: string) =>
        set((state) => {
          if (state.wishlist.items.some(item => item.productId === productId)) {
            return state;
          }
          return {
            wishlist: {
              items: [
                ...state.wishlist.items,
                {
                  id: `${productId}-${Date.now()}`,
                  productId,
                  addedAt: new Date(),
                },
              ],
            },
          };
        }),
      removeFromWishlist: (productId: string) =>
        set((state) => ({
          wishlist: {
            items: state.wishlist.items.filter(item => item.productId !== productId),
          },
        })),
      isInWishlist: (productId: string) =>
        get().wishlist.items.some(item => item.productId === productId),
    }),
    {
      name: 'wishlist-store',
    }
  )
);

// Auth Store
interface AuthStore {
  user: User | null;
  isLoggedIn: boolean;
  login: (email: string, password: string) => Promise<void>;
  signup: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
  updateProfile: (user: User) => void;
}

const MOCK_USER: User = {
  id: 'user_001',
  email: 'user@example.com',
  name: 'John Doe',
  phone: '9876543210',
  addresses: [
    {
      id: 'addr_001',
      type: 'home',
      name: 'Home',
      phone: '9876543210',
      street: '123 Main Street',
      city: 'Mumbai',
      state: 'Maharashtra',
      pincode: '400001',
      isDefault: true,
    },
  ],
  createdAt: new Date(),
};

export const useAuthStore = create<AuthStore>()(
  persist(
    (set) => ({
      user: null,
      isLoggedIn: false,
      login: async (email: string, password: string) => {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 800));
        if (email && password) {
          set({ user: { ...MOCK_USER, email }, isLoggedIn: true });
        }
      },
      signup: async (name: string, email: string, password: string) => {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        if (name && email && password) {
          set({ user: { ...MOCK_USER, name, email }, isLoggedIn: true });
        }
      },
      logout: () => {
        set({ user: null, isLoggedIn: false });
      },
      updateProfile: (user: User) => {
        set({ user });
      },
    }),
    {
      name: 'auth-store',
    }
  )
);

// Orders Store
interface OrdersStore {
  orders: Order[];
  addOrder: (order: Order) => void;
  getOrderById: (orderId: string) => Order | undefined;
}

export const useOrdersStore = create<OrdersStore>((set, get) => ({
  orders: [],
  addOrder: (order: Order) =>
    set((state) => ({
      orders: [order, ...state.orders],
    })),
  getOrderById: (orderId: string) =>
    get().orders.find(order => order.id === orderId),
}));
