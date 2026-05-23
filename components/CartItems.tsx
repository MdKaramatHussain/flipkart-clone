'use client';

import { Trash2, Plus, Minus } from 'lucide-react';
import { useCartStore } from '@/lib/store';
import { PRODUCTS } from '@/lib/constants';

export function CartItems() {
  const { cart, removeFromCart, updateQuantity } = useCartStore();

  if (cart.items.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500 mb-4">Your cart is empty</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {cart.items.map((item) => {
        const product = PRODUCTS.find(p => p.id === item.productId);
        if (!product) return null;

        return (
          <div
            key={item.id}
            className="flex gap-4 p-4 bg-white border border-gray-200 rounded"
          >
            {/* Product Image */}
            <div className="w-20 h-20 bg-gray-100 rounded overflow-hidden flex-shrink-0">
              <img
                src={product.images[0]}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Product Details */}
            <div className="flex-grow">
              <h3 className="font-medium text-gray-900">{product.name}</h3>
              <p className="text-sm text-gray-500 mt-1">{product.brand}</p>
              <div className="text-sm font-semibold text-gray-900 mt-2">
                ₹{item.price.toLocaleString()}
              </div>
            </div>

            {/* Quantity Controls */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => updateQuantity(product.id, item.quantity - 1)}
                className="p-1 hover:bg-gray-100 rounded"
                disabled={item.quantity === 1}
              >
                <Minus className="w-4 h-4" />
              </button>
              <span className="w-8 text-center font-medium">{item.quantity}</span>
              <button
                onClick={() => updateQuantity(product.id, item.quantity + 1)}
                className="p-1 hover:bg-gray-100 rounded"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>

            {/* Remove Button */}
            <button
              onClick={() => removeFromCart(product.id)}
              className="p-2 hover:bg-red-50 rounded text-red-600"
            >
              <Trash2 className="w-5 h-5" />
            </button>
          </div>
        );
      })}
    </div>
  );
}
