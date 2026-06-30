import type { Cart } from '@/lib/types';
import type { Product } from '@/lib/types';
import type { OrderPricing } from '@/types/checkout';
import { CHECKOUT_CONFIG } from '@/lib/constants/checkout';

export function calculateOrderPricing(
  cart: Cart,
  getProduct: (productId: string) => Product | undefined
): OrderPricing {
  let totalMrp = 0;
  let totalSellingPrice = 0;

  for (const item of cart.items) {
    const product = getProduct(item.productId);
    const mrp = product?.originalPrice ?? item.price;
    totalMrp += mrp * item.quantity;
    totalSellingPrice += item.price * item.quantity;
  }

  const productDiscount = Math.max(0, totalMrp - totalSellingPrice);
  const couponDiscount = cart.couponDiscount ?? 0;
  const taxableAmount = Math.max(0, totalSellingPrice - couponDiscount);
  const shippingCharges =
    totalSellingPrice >= CHECKOUT_CONFIG.FREE_SHIPPING_THRESHOLD
      ? 0
      : CHECKOUT_CONFIG.SHIPPING_FEE;
  const tax = Math.round(taxableAmount * CHECKOUT_CONFIG.TAX_RATE);
  const finalPayableAmount = taxableAmount + shippingCharges + tax;

  return {
    totalMrp,
    totalSellingPrice,
    productDiscount,
    shippingCharges,
    tax,
    couponDiscount,
    finalPayableAmount,
  };
}
