import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { User, Cart, CartItem, Notification } from '@/types';

interface AuthStore {
  user: User | null;
  isLoggedIn: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  signup: (email: string, name: string, password: string) => Promise<void>;
  setUser: (user: User | null) => void;
}

interface CartStore {
  cart: Cart;
  addToCart: (item: CartItem) => void;
  removeFromCart: (productId: string) => void;
  updateCartItem: (productId: string, quantity: number) => void;
  clearCart: () => void;
  applyCoupon: (code: string) => void;
  removeCoupon: () => void;
}

interface WishlistStore {
  wishlist: string[];
  addToWishlist: (productId: string) => void;
  removeFromWishlist: (productId: string) => void;
  isInWishlist: (productId: string) => boolean;
}

interface NotificationStore {
  notifications: Notification[];
  addNotification: (notification: Notification) => void;
  removeNotification: (id: string) => void;
  markAsRead: (id: string) => void;
}

interface UIStore {
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
  toggleSidebar: () => void;
  darkMode: boolean;
  setDarkMode: (dark: boolean) => void;
}

// Auth Store
export const useAuthStore = create<AuthStore>()(
  persist(
    (set) => ({
      user: null,
      isLoggedIn: false,
      login: async (email: string, password: string) => {
        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 500));
        const mockUser: User = {
          id: '1',
          email,
          name: email.split('@')[0],
          addresses: [],
          createdAt: new Date(),
        };
        set({ user: mockUser, isLoggedIn: true });
      },
      logout: () => {
        set({ user: null, isLoggedIn: false });
      },
      signup: async (email: string, name: string, password: string) => {
        // Simulate API call d
        await new Promise((resolve) => setTimeout(resolve, 500));
        const mockUser: User = {
          id: Math.random().toString(36).substr(2, 9),
          email,
          name,
          addresses: [],
          createdAt: new Date(),
        };
        set({ user: mockUser, isLoggedIn: true });
      },
      setUser: (user) => {
        set({ user, isLoggedIn: !!user });
      },
    }),
    {
      name: 'auth-store',
    }
  )
);

// Cart Store
export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      cart: {
        items: [],
        total: 0,
        subtotal: 0,
        tax: 0,
        shipping: 50,
        discount: 0,
      },
      addToCart: (item) => {
        const { cart } = get();
        const existingItem = cart.items.find((i) => i.productId === item.productId);

        if (existingItem) {
          existingItem.quantity += item.quantity;
        } else {
          cart.items.push(item);
        }

        // Recalculate totals
        const subtotal = cart.items.reduce((sum, item) => sum + item.price * item.quantity, 0);
        const tax = Math.round(subtotal * 0.18); // 18% GST
        const total = subtotal + tax + cart.shipping - cart.discount;

        set({
          cart: {
            ...cart,
            subtotal,
            tax,
            total,
          },
        });
      },
      removeFromCart: (productId) => {
        const { cart } = get();
        cart.items = cart.items.filter((item) => item.productId !== productId);

        const subtotal = cart.items.reduce((sum, item) => sum + item.price * item.quantity, 0);
        const tax = Math.round(subtotal * 0.18);
        const total = subtotal + tax + cart.shipping - cart.discount;

        set({
          cart: {
            ...cart,
            subtotal,
            tax,
            total,
          },
        });
      },
      updateCartItem: (productId, quantity) => {
        const { cart } = get();
        const item = cart.items.find((i) => i.productId === productId);
        if (item) {
          item.quantity = quantity;
        }

        const subtotal = cart.items.reduce((sum, item) => sum + item.price * item.quantity, 0);
        const tax = Math.round(subtotal * 0.18);
        const total = subtotal + tax + cart.shipping - cart.discount;

        set({
          cart: {
            ...cart,
            subtotal,
            tax,
            total,
          },
        });
      },
      clearCart: () => {
        set({
          cart: {
            items: [],
            total: 0,
            subtotal: 0,
            tax: 0,
            shipping: 50,
            discount: 0,
          },
        });
      },
      applyCoupon: (code) => {
        const { cart } = get();
        // Mock coupon logic
        const discount = Math.round(cart.subtotal * 0.1); // 10% off
        const total = cart.subtotal + cart.tax + cart.shipping - discount;

        set({
          cart: {
            ...cart,
            discount,
            couponCode: code,
            total,
          },
        });
      },
      removeCoupon: () => {
        const { cart } = get();
        const subtotal = cart.items.reduce((sum, item) => sum + item.price * item.quantity, 0);
        const tax = Math.round(subtotal * 0.18);
        const total = subtotal + tax + cart.shipping;

        set({
          cart: {
            ...cart,
            discount: 0,
            couponCode: undefined,
            total,
          },
        });
      },
    }),
    {
      name: 'cart-store',
    }
  )
);

// Wishlist Store
export const useWishlistStore = create<WishlistStore>()(
  persist(
    (set, get) => ({
      wishlist: [],
      addToWishlist: (productId) => {
        const { wishlist } = get();
        if (!wishlist.includes(productId)) {
          set({ wishlist: [...wishlist, productId] });
        }
      },
      removeFromWishlist: (productId) => {
        const { wishlist } = get();
        set({ wishlist: wishlist.filter((id) => id !== productId) });
      },
      isInWishlist: (productId) => {
        const { wishlist } = get();
        return wishlist.includes(productId);
      },
    }),
    {
      name: 'wishlist-store',
    }
  )
);

// Notification Store
export const useNotificationStore = create<NotificationStore>((set) => ({
  notifications: [],
  addNotification: (notification) => {
    set((state) => ({
      notifications: [notification, ...state.notifications],
    }));
    // Auto-remove after 5 seconds
    setTimeout(() => {
      set((state) => ({
        notifications: state.notifications.filter((n) => n.id !== notification.id),
      }));
    }, 5000);
  },
  removeNotification: (id) => {
    set((state) => ({
      notifications: state.notifications.filter((n) => n.id !== id),
    }));
  },
  markAsRead: (id) => {
    set((state) => ({
      notifications: state.notifications.map((n) =>
        n.id === id ? { ...n, read: true } : n
      ),
    }));
  },
}));

// UI Store
export const useUIStore = create<UIStore>()(
  persist(
    (set) => ({
      sidebarOpen: true,
      setSidebarOpen: (open) => set({ sidebarOpen: open }),
      toggleSidebar: () => set((state) => ({ sidebarOpen: !state.sidebarOpen })),
      darkMode: false,
      setDarkMode: (dark) => set({ darkMode: dark }),
    }),
    {
      name: 'ui-store',
    }
  )
);
