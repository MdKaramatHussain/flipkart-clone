'use client';

import { useMemo } from 'react';
import { useCartStore, useProductStore } from '@/lib/store';
import { calculateOrderPricing } from '@/lib/pricing/calculateOrderPricing';
import type { OrderPricing } from '@/types/checkout';

export function useCartPricing(): OrderPricing {
  const cart = useCartStore((state) => state.cart);
  const getProductById = useProductStore((state) => state.getProductById);

  return useMemo(
    () => calculateOrderPricing(cart, getProductById),
    [cart, getProductById]
  );
}

export function useCartItemCount(): number {
  const items = useCartStore((state) => state.cart.items);
  return items.reduce((sum, item) => sum + item.quantity, 0);
}
