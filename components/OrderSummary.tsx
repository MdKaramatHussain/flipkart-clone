'use client';

import { useCartStore } from '@/lib/store';

interface OrderSummaryProps {
  showApplyCoupon?: boolean;
  onApplyCoupon?: (code: string) => void;
}

export function OrderSummary({ showApplyCoupon = false, onApplyCoupon }: OrderSummaryProps) {
  const { cart } = useCartStore();

  return (
    <div className="bg-white border border-gray-200 rounded p-6">
      <h2 className="text-lg font-bold text-gray-900 mb-6">Order Summary</h2>

      <div className="space-y-4 mb-6">
        <div className="flex justify-between text-gray-700">
          <span>Subtotal</span>
          <span>₹{cart.subtotal.toLocaleString()}</span>
        </div>

        {cart.couponDiscount > 0 && (
          <div className="flex justify-between text-green-600 font-medium">
            <span>Coupon Discount</span>
            <span>-₹{cart.couponDiscount.toLocaleString()}</span>
          </div>
        )}

        <div className="flex justify-between text-gray-700">
          <span>Shipping</span>
          <span className={cart.shipping === 0 ? 'text-green-600 font-medium' : ''}>
            {cart.shipping === 0 ? 'FREE' : `₹${cart.shipping.toLocaleString()}`}
          </span>
        </div>

        <div className="flex justify-between text-gray-700">
          <span>Tax</span>
          <span>₹{cart.tax.toLocaleString()}</span>
        </div>

        <div className="border-t border-gray-200 pt-4 flex justify-between text-lg font-bold text-gray-900">
          <span>Total Amount</span>
          <span>₹{cart.total.toLocaleString()}</span>
        </div>
      </div>

      {showApplyCoupon && (
        <div className="border-t border-gray-200 pt-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Apply Coupon Code
          </label>
          <form onSubmit={(e) => {
            e.preventDefault();
            const code = new FormData(e.currentTarget).get('coupon') as string;
            onApplyCoupon?.(code);
            e.currentTarget.reset();
          }} className="flex gap-2">
            <input
              type="text"
              name="coupon"
              placeholder="Enter coupon code"
              className="flex-grow px-3 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:border-blue-500"
            />
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded hover:bg-blue-700"
            >
              Apply
            </button>
          </form>
        </div>
      )}
    </div>
  );
}
