'use client';

import React from 'react';
import { Truck, Shield, Clock } from 'lucide-react';
import { COLORS } from '@/constants/colors';
import { useCartStore } from '@/lib/store';
import { useCartPricing } from '@/hooks/useCartPricing';
import type { CheckoutStep } from '@/types/checkout';

interface CheckoutOrderSummaryProps {
  step: CheckoutStep;
  onContinue: () => void;
  onBack: () => void;
}

export function CheckoutOrderSummary({
  step,
  onContinue,
  onBack,
}: CheckoutOrderSummaryProps) {
  const { cart, applyCoupon, removeCoupon } = useCartStore();
  const pricing = useCartPricing();
  const [couponInput, setCouponInput] = React.useState('');

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (couponInput.trim()) {
      applyCoupon(couponInput.trim().toUpperCase());
      setCouponInput('');
    }
  };

  const continueLabel =
    step === 3 ? 'Confirm Payment' : step === 4 ? 'Order Placed' : 'Continue';

  return (
    <div className="bg-white rounded-lg shadow-sm p-6 sticky top-24">
      <h3 className="font-bold mb-4" style={{ color: COLORS.text.primary }}>
        Order Summary
      </h3>

      <div className="space-y-2 pb-4 border-b" style={{ borderColor: COLORS.border.light }}>
        <div className="flex justify-between text-sm">
          <span className="text-gray-600">Total MRP</span>
          <span>₹{pricing.totalMrp.toLocaleString('en-IN')}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-gray-600">Selling Price</span>
          <span>₹{pricing.totalSellingPrice.toLocaleString('en-IN')}</span>
        </div>
        {pricing.productDiscount > 0 && (
          <div className="flex justify-between text-sm text-green-600">
            <span>Product Discount</span>
            <span>-₹{pricing.productDiscount.toLocaleString('en-IN')}</span>
          </div>
        )}
        {pricing.couponDiscount > 0 && (
          <div className="flex justify-between text-sm text-green-600">
            <span>Coupon Discount</span>
            <span>-₹{pricing.couponDiscount.toLocaleString('en-IN')}</span>
          </div>
        )}
        <div className="flex justify-between text-sm">
          <span className="text-gray-600">Shipping</span>
          <span className={pricing.shippingCharges === 0 ? 'text-green-600 font-medium' : ''}>
            {pricing.shippingCharges === 0
              ? 'FREE'
              : `₹${pricing.shippingCharges.toLocaleString('en-IN')}`}
          </span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-gray-600">Tax</span>
          <span>₹{pricing.tax.toLocaleString('en-IN')}</span>
        </div>
      </div>

      <div
        className="flex justify-between font-bold text-lg py-4"
        style={{ color: COLORS.primary.main }}
      >
        <span>Final Payable</span>
        <span>₹{pricing.finalPayableAmount.toLocaleString('en-IN')}</span>
      </div>

      {step < 4 && (
        <div className="border-t pt-4 mb-4" style={{ borderColor: COLORS.border.light }}>
          {cart.couponCode ? (
            <div className="flex items-center justify-between text-sm">
              <span className="text-green-600 font-medium">Coupon: {cart.couponCode}</span>
              <button
                type="button"
                onClick={removeCoupon}
                className="text-red-600 text-xs font-medium hover:underline"
              >
                Remove
              </button>
            </div>
          ) : (
            <form onSubmit={handleApplyCoupon} className="flex gap-2">
              <input
                type="text"
                value={couponInput}
                onChange={(e) => setCouponInput(e.target.value)}
                placeholder="Coupon code"
                className="flex-1 px-3 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:border-blue-500"
              />
              <button
                type="submit"
                className="px-3 py-2 text-sm font-medium text-white rounded"
                style={{ backgroundColor: COLORS.primary.main }}
              >
                Apply
              </button>
            </form>
          )}
        </div>
      )}

      <div className="space-y-3 mb-6 pt-4 border-t" style={{ borderColor: COLORS.border.light }}>
        <div className="flex items-center gap-2 text-sm">
          <Truck className="w-4 h-4" style={{ color: COLORS.primary.main }} />
          <span>{pricing.shippingCharges === 0 ? 'Free Delivery' : 'Standard Delivery'}</span>
        </div>
        <div className="flex items-center gap-2 text-sm">
          <Shield className="w-4 h-4" style={{ color: COLORS.primary.main }} />
          <span>Secure Payments</span>
        </div>
        <div className="flex items-center gap-2 text-sm">
          <Clock className="w-4 h-4" style={{ color: COLORS.primary.main }} />
          <span>Easy Returns</span>
        </div>
      </div>

      {step < 4 && (
        <div className="space-y-3">
          <button
            type="button"
            onClick={onContinue}
            className="w-full py-3 rounded-lg font-bold text-white transition"
            style={{ backgroundColor: COLORS.primary.main }}
          >
            {continueLabel}
          </button>

          {step > 1 && (
            <button
              type="button"
              onClick={onBack}
              className="w-full py-3 rounded-lg font-bold border-2 transition"
              style={{ borderColor: COLORS.border.default, color: COLORS.text.primary }}
            >
              Back
            </button>
          )}
        </div>
      )}
    </div>
  );
}
