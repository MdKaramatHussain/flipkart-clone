import type { CartItem } from '@/lib/types';

export type CheckoutStep = 1 | 2 | 3 | 4;

export type PaymentStatus = 'pending' | 'completed' | 'failed';
export type OrderStatus = 'pending' | 'confirmed' | 'processing' | 'shipped' | 'delivered' | 'cancelled';

export interface CheckoutCustomer {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
}

export interface CheckoutShipping {
  addressLine: string;
  city: string;
  state: string;
  country: string;
  postalCode: string;
}

export interface CheckoutPayment {
  method: 'qr_upi';
  utrNumber: string;
  status: PaymentStatus;
  upiId?: string;
}

export interface CheckoutOrderItem extends CartItem {
  productName: string;
  image: string;
  mrp: number;
}

export interface OrderPricing {
  totalMrp: number;
  totalSellingPrice: number;
  productDiscount: number;
  shippingCharges: number;
  tax: number;
  couponDiscount: number;
  finalPayableAmount: number;
}

export interface CheckoutOrder {
  orderId: string;
  orderDate: string;
  orderTime: string;
  status: OrderStatus;
  paymentStatus: PaymentStatus;
  items: CheckoutOrderItem[];
  pricing: OrderPricing;
}

export interface CheckoutData {
  customer: CheckoutCustomer;
  shipping: CheckoutShipping;
  payment: CheckoutPayment;
  order: CheckoutOrder | null;
  currentStep: CheckoutStep;
}

export type FieldErrors<T> = Partial<Record<keyof T, string>>;
