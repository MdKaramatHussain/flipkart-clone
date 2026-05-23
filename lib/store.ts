import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { User, CartItem, Cart, Wishlist, WishlistItem, Order } from './types';
import { PRODUCTS } from './constants';

// Cart Store
interface CartStore {
  cart: Cart;
  addToCart: (productId: string, quantity: number) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  applyCoupon: (code: string) => void;
  removeCoupon: () => void;
}

const calculateCartTotals = (items: CartItem[]): Omit<Cart, 'items' | 'couponCode' | 'couponDiscount'> => {
  const subtotal = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const tax = Math.round(subtotal * 0.05);
  const shipping = subtotal > 500 ? 0 : 50;
  
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
        subtotal: 0,
        discount: 0,
        tax: 0,
        shipping: 0,
        total: 0,
        couponDiscount: 0,
      },
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
