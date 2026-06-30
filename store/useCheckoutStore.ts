import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type {
  CheckoutCustomer,
  CheckoutShipping,
  CheckoutPayment,
  CheckoutOrder,
  CheckoutStep,
  CheckoutData,
} from '@/types/checkout';
import { CHECKOUT_CONFIG } from '@/lib/constants/checkout';

const initialCustomer: CheckoutCustomer = {
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
};

const initialShipping: CheckoutShipping = {
  addressLine: '',
  city: '',
  state: '',
  country: CHECKOUT_CONFIG.DEFAULT_COUNTRY,
  postalCode: '',
};

const initialPayment: CheckoutPayment = {
  method: 'qr_upi',
  utrNumber: '',
  status: 'pending',
  upiId: CHECKOUT_CONFIG.UPI_ID,
};

interface CheckoutStore extends CheckoutData {
  updateCustomer: (data: Partial<CheckoutCustomer>) => void;
  updateShipping: (data: Partial<CheckoutShipping>) => void;
  updatePayment: (data: Partial<CheckoutPayment>) => void;
  setStep: (step: CheckoutStep) => void;
  setOrder: (order: CheckoutOrder) => void;
  completePayment: (utrNumber: string) => void;
  resetCheckout: () => void;
  getCheckoutData: () => CheckoutData;
}

const initialState: CheckoutData = {
  customer: initialCustomer,
  shipping: initialShipping,
  payment: initialPayment,
  order: null,
  currentStep: 1,
};

export const useCheckoutStore = create<CheckoutStore>()(
  persist(
    (set, get) => ({
      ...initialState,

      updateCustomer: (data) =>
        set((state) => ({
          customer: { ...state.customer, ...data },
        })),

      updateShipping: (data) =>
        set((state) => ({
          shipping: { ...state.shipping, ...data },
        })),

      updatePayment: (data) =>
        set((state) => ({
          payment: { ...state.payment, ...data },
        })),

      setStep: (step) => set({ currentStep: step }),

      setOrder: (order) => set({ order }),

      completePayment: (utrNumber) =>
        set((state) => ({
          payment: {
            ...state.payment,
            utrNumber,
            status: 'completed',
          },
        })),

      resetCheckout: () => set({ ...initialState }),

      getCheckoutData: () => {
        const { customer, shipping, payment, order, currentStep } = get();
        return { customer, shipping, payment, order, currentStep };
      },
    }),
    {
      name: 'checkout-store',
      partialize: (state) => ({
        customer: state.customer,
        shipping: state.shipping,
        payment: state.payment,
        order: state.order,
        currentStep: state.currentStep,
      }),
    }
  )
);
