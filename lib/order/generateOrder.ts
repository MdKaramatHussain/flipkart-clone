import type { Cart, Product } from '@/lib/types';
import { OrderStatus } from '@/lib/types';
import type {
  CheckoutCustomer,
  CheckoutShipping,
  CheckoutPayment,
  CheckoutOrder,
  CheckoutOrderItem,
  OrderPricing,
} from '@/types/checkout';
import { calculateOrderPricing } from '@/lib/pricing/calculateOrderPricing';

export function generateOrderId(): string {
  const timestamp = Date.now().toString(36).toUpperCase();
  const random = Math.random().toString(36).substring(2, 8).toUpperCase();
  return `FLK-${timestamp}-${random}`;
}

export function formatOrderDate(date: Date): { orderDate: string; orderTime: string } {
  return {
    orderDate: date.toLocaleDateString('en-IN', {
      day: '2-digit',
      month: 'long',
      year: 'numeric',
    }),
    orderTime: date.toLocaleTimeString('en-IN', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
    }),
  };
}

export function buildOrderItems(
  cart: Cart,
  getProduct: (productId: string) => Product | undefined
): CheckoutOrderItem[] {
  return cart.items.map((item) => {
    const product = getProduct(item.productId);
    return {
      ...item,
      productName: product?.name ?? `Product ${item.productId}`,
      image: product?.image ?? product?.images?.[0] ?? '',
      mrp: product?.originalPrice ?? item.price,
    };
  });
}

export function createCheckoutOrder(
  cart: Cart,
  customer: CheckoutCustomer,
  shipping: CheckoutShipping,
  payment: CheckoutPayment,
  getProduct: (productId: string) => Product | undefined
): CheckoutOrder {
  const now = new Date();
  const { orderDate, orderTime } = formatOrderDate(now);
  const pricing = calculateOrderPricing(cart, getProduct);
  const items = buildOrderItems(cart, getProduct);

  return {
    orderId: generateOrderId(),
    orderDate,
    orderTime,
    status: 'confirmed',
    paymentStatus: payment.status === 'completed' ? 'completed' : 'pending',
    items,
    pricing,
  };
}

export function createPersistedOrder(
  checkoutOrder: CheckoutOrder,
  customer: CheckoutCustomer,
  shipping: CheckoutShipping,
  userId: string
) {
  const now = new Date();
  return {
    id: checkoutOrder.orderId,
    userId,
    items: checkoutOrder.items.map((item) => ({
      productId: item.productId,
      productName: item.productName,
      quantity: item.quantity,
      price: item.price,
      image: item.image,
    })),
    shippingAddress: {
      id: `addr-${checkoutOrder.orderId}`,
      type: 'home' as const,
      name: `${customer.firstName} ${customer.lastName}`,
      phone: customer.phone,
      street: shipping.addressLine,
      city: shipping.city,
      state: shipping.state,
      pincode: shipping.postalCode,
      isDefault: false,
    },
    billingAddress: {
      id: `bill-${checkoutOrder.orderId}`,
      type: 'home' as const,
      name: `${customer.firstName} ${customer.lastName}`,
      phone: customer.phone,
      street: shipping.addressLine,
      city: shipping.city,
      state: shipping.state,
      pincode: shipping.postalCode,
      isDefault: false,
    },
    subtotal: checkoutOrder.pricing.totalSellingPrice,
    discount: checkoutOrder.pricing.productDiscount + checkoutOrder.pricing.couponDiscount,
    tax: checkoutOrder.pricing.tax,
    shipping: checkoutOrder.pricing.shippingCharges,
    total: checkoutOrder.pricing.finalPayableAmount,
    status: OrderStatus.CONFIRMED,
    paymentMethod: 'qr_upi',
    createdAt: now,
    estimatedDelivery: new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000),
  };
}
