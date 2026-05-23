'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Trash2, Plus, Minus, Heart, AlertCircle, Truck, Shield } from 'lucide-react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { useCartStore } from '@/store/useStore';
import { COLORS } from '@/constants/colors';

/**
 * Shopping Cart Page
 * Display and manage cart items with checkout options
 */
export default function CartPage() {
  const { cart, removeFromCart, updateQuantity } = useCartStore();
  const [appliedCoupon, setAppliedCoupon] = useState<string | null>(null);
  const [couponInput, setCouponInput] = useState('');
  const [loading, setLoading] = useState(false);

  // Mock coupons
  const validCoupons: { [key: string]: number } = {
    'SAVE10': 10,
    'SAVE20': 20,
    'FLIPKART50': 50,
  };

  const handleApplyCoupon = () => {
    if (couponInput && validCoupons[couponInput]) {
      setAppliedCoupon(couponInput);
      setCouponInput('');
    } else {
      alert('Invalid coupon code');
    }
  };

  const items = cart?.items || [];
  const subtotal = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const couponDiscount = appliedCoupon ? validCoupons[appliedCoupon] : 0;
  const discountAmount = (subtotal * couponDiscount) / 100;
  const shippingCost = subtotal > 500 ? 0 : 40;
  const tax = Math.round((subtotal - discountAmount) * 0.05);
  const total = subtotal - discountAmount + shippingCost + tax;

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col">
        <Header cartCount={0} />

        <main className="flex-1">
          <div className="max-w-full px-4 sm:px-6 lg:px-8 py-20">
            <div className="text-center">
              <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-gray-200 flex items-center justify-center">
                <span role="img" aria-label="empty cart" className="text-4xl">
                  🛒
                </span>
              </div>
              <h1 className="text-3xl font-bold mb-2" style={{ color: COLORS.text.primary }}>
                Your Cart is Empty
              </h1>
              <p className="text-gray-600 mb-8">
                Add items to your cart to proceed with checkout
              </p>
              <Link
                href="/"
                className="inline-block px-8 py-3 rounded-lg font-semibold text-white transition-transform hover:scale-105"
                style={{ backgroundColor: COLORS.primary.main }}
              >
                Continue Shopping
              </Link>
            </div>
          </div>
        </main>

        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header cartCount={items.length} />

      <main className="flex-1">
        <div className="max-w-full px-4 sm:px-6 lg:px-8 py-8">
          <h1 className="text-2xl sm:text-3xl font-bold mb-8" style={{ color: COLORS.text.primary }}>
            Shopping Cart ({items.length} {items.length === 1 ? 'item' : 'items'})
          </h1>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-4">
              <div className="bg-white rounded-lg shadow-sm">
                {items.map((item, idx) => (
                  <div
                    key={item.id}
                    className={`flex gap-4 p-4 sm:p-6 border-b last:border-b-0 ${idx > 0 ? 'border-t' : ''}`}
                    style={{ borderColor: COLORS.border.light }}
                  >
                    {/* Product Image */}
                    <div className="w-20 h-20 sm:w-28 sm:h-28 bg-gray-100 rounded-lg flex-shrink-0 overflow-hidden">
                      <div className="w-full h-full flex items-center justify-center text-2xl">
                        📦
                      </div>
                    </div>

                    {/* Product Details */}
                    <div className="flex-1 flex flex-col">
                      <Link
                        href={`/products/${item.productId}`}
                        className="text-sm sm:text-base font-medium hover:text-blue-600 transition"
                        style={{ color: COLORS.text.primary }}
                      >
                        Product {item.productId}
                      </Link>
                      <p className="text-sm mt-1" style={{ color: COLORS.text.secondary }}>
                        Sold by Flipkart
                      </p>

                      {/* Price */}
                      <div className="flex items-center gap-2 mt-2">
                        <span className="font-bold text-lg" style={{ color: COLORS.primary.main }}>
                          ₹{item.price.toLocaleString()}
                        </span>
                        <span className="text-xs line-through" style={{ color: COLORS.text.secondary }}>
                          ₹{Math.round(item.price * 1.5).toLocaleString()}
                        </span>
                      </div>

                      {/* Quantity and Actions */}
                      <div className="flex items-center gap-4 mt-4">
                        <div className="flex items-center border rounded" style={{ borderColor: COLORS.border.default }}>
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="px-2 py-1 hover:bg-gray-100"
                          >
                            <Minus className="w-4 h-4" />
                          </button>
                          <span className="px-4 py-1 font-medium min-w-[2.5rem] text-center">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="px-2 py-1 hover:bg-gray-100"
                          >
                            <Plus className="w-4 h-4" />
                          </button>
                        </div>

                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="text-red-600 hover:text-red-700 text-sm font-medium flex items-center gap-1"
                        >
                          <Trash2 className="w-4 h-4" />
                          Remove
                        </button>

                        <button className="text-blue-600 hover:text-blue-700 text-sm font-medium flex items-center gap-1 ml-auto">
                          <Heart className="w-4 h-4" />
                          Save for Later
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Coupon Section */}
              <div className="bg-white rounded-lg shadow-sm p-4 sm:p-6">
                <h3 className="font-bold mb-4" style={{ color: COLORS.text.primary }}>
                  Have a promo code?
                </h3>
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Enter coupon code"
                    value={couponInput}
                    onChange={(e) => setCouponInput(e.target.value.toUpperCase())}
                    className="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2"
                    style={{ borderColor: COLORS.border.default, '--tw-ring-color': COLORS.primary.light } as React.CSSProperties}
                  />
                  <button
                    onClick={handleApplyCoupon}
                    className="px-6 py-2 rounded-lg font-semibold text-white transition"
                    style={{ backgroundColor: COLORS.primary.main }}
                  >
                    Apply
                  </button>
                </div>
                {appliedCoupon && (
                  <p className="text-sm text-green-600 mt-2 flex items-center gap-2">
                    ✓ Coupon <strong>{appliedCoupon}</strong> applied successfully
                  </p>
                )}
              </div>
            </div>

            {/* Price Summary */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-lg shadow-sm p-4 sm:p-6 sticky top-24">
                <h3 className="text-lg font-bold mb-6" style={{ color: COLORS.text.primary }}>
                  Price Summary
                </h3>

                <div className="space-y-4 pb-4 border-b" style={{ borderColor: COLORS.border.light }}>
                  <div className="flex justify-between">
                    <span style={{ color: COLORS.text.secondary }}>Subtotal</span>
                    <span className="font-medium">₹{subtotal.toLocaleString()}</span>
                  </div>

                  {appliedCoupon && (
                    <div className="flex justify-between">
                      <span style={{ color: COLORS.text.secondary }}>
                        Coupon Discount ({couponDiscount}%)
                      </span>
                      <span className="font-medium text-green-600">
                        −₹{discountAmount.toLocaleString()}
                      </span>
                    </div>
                  )}

                  <div className="flex justify-between">
                    <span style={{ color: COLORS.text.secondary }}>Shipping Cost</span>
                    <span className="font-medium">
                      {shippingCost === 0 ? (
                        <span className="text-green-600">Free</span>
                      ) : (
                        `₹${shippingCost}`
                      )}
                    </span>
                  </div>

                  <div className="flex justify-between">
                    <span style={{ color: COLORS.text.secondary }}>Tax</span>
                    <span className="font-medium">₹{tax.toLocaleString()}</span>
                  </div>
                </div>

                <div className="flex justify-between py-4 text-lg font-bold" style={{ color: COLORS.primary.main }}>
                  <span>Total</span>
                  <span>₹{total.toLocaleString()}</span>
                </div>

                {/* Trust Badges */}
                <div className="space-y-3 mb-6 pt-4 border-t" style={{ borderColor: COLORS.border.light }}>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Shield className="w-4 h-4" style={{ color: COLORS.primary.main }} />
                    Secure payments
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Truck className="w-4 h-4" style={{ color: COLORS.primary.main }} />
                    Fast delivery
                  </div>
                </div>

                {/* Checkout Button */}
                <Link
                  href="/checkout"
                  className="w-full py-3 rounded-lg font-bold text-white text-center transition-transform hover:scale-105 block"
                  style={{ backgroundColor: COLORS.primary.main }}
                >
                  Proceed to Checkout
                </Link>

                {/* Continue Shopping */}
                <Link
                  href="/"
                  className="w-full mt-3 py-3 rounded-lg font-bold text-center transition border-2"
                  style={{ borderColor: COLORS.border.default, color: COLORS.text.primary }}
                >
                  Continue Shopping
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
