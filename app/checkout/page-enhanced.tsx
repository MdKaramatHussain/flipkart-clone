'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ChevronRight, MapPin, Truck, Shield, Clock, AlertCircle } from 'lucide-react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { useCartStore } from '@/store/useStore';
import { COLORS } from '@/constants/colors';

interface Address {
  id: string;
  type: 'home' | 'work' | 'other';
  name: string;
  phone: string;
  street: string;
  city: string;
  state: string;
  pincode: string;
  isDefault: boolean;
}

/**
 * Checkout Page
 * Multi-step checkout flow for order placement
 */
export default function CheckoutPage() {
  const { cart } = useCartStore();
  const [step, setStep] = useState<1 | 2 | 3 | 4>(1);
  const [selectedAddress, setSelectedAddress] = useState<string | null>(null);
  const [selectedPayment, setSelectedPayment] = useState<'card' | 'upi' | 'netbanking' | 'wallet'>('card');
  const [orderPlaced, setOrderPlaced] = useState(false);

  // Mock addresses
  const addresses: Address[] = [
    {
      id: '1',
      type: 'home',
      name: 'Home',
      phone: '9876543210',
      street: '123 Main Street',
      city: 'Delhi',
      state: 'Delhi',
      pincode: '110001',
      isDefault: true,
    },
    {
      id: '2',
      type: 'work',
      name: 'Work',
      phone: '9876543210',
      street: '456 Business Park',
      city: 'Gurgaon',
      state: 'Haryana',
      pincode: '122001',
      isDefault: false,
    },
  ];

  const items = cart?.items || [];
  const subtotal = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const shipping = 0;
  const tax = Math.round(subtotal * 0.05);
  const total = subtotal + shipping + tax;

  const handlePlaceOrder = () => {
    if (step === 4) {
      setOrderPlaced(true);
      setTimeout(() => {
        // Redirect to order confirmation
      }, 2000);
    } else {
      setStep((step + 1) as any);
    }
  };

  if (orderPlaced) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col">
        <Header />

        <main className="flex-1 flex items-center justify-center px-4">
          <div className="text-center">
            <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-green-100 flex items-center justify-center">
              <span className="text-4xl">✓</span>
            </div>
            <h1 className="text-3xl font-bold mb-2" style={{ color: COLORS.text.primary }}>
              Order Placed Successfully!
            </h1>
            <p className="text-gray-600 mb-8">
              Thank you for your purchase. You will receive a confirmation email shortly.
            </p>
            <Link
              href="/"
              className="inline-block px-8 py-3 rounded-lg font-semibold text-white"
              style={{ backgroundColor: COLORS.primary.main }}
            >
              Continue Shopping
            </Link>
          </div>
        </main>

        <Footer />
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col">
        <Header />

        <main className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">Your cart is empty</h1>
            <Link href="/" className="text-blue-600 hover:underline">
              Return to shopping
            </Link>
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
          {/* Steps Indicator */}
          <div className="mb-8">
            <div className="flex items-center justify-between max-w-2xl">
              {[
                { num: 1, label: 'Address' },
                { num: 2, label: 'Payment' },
                { num: 3, label: 'Review' },
                { num: 4, label: 'Confirm' },
              ].map((s) => (
                <React.Fragment key={s.num}>
                  <div className="flex flex-col items-center gap-2 flex-1">
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-white transition ${
                        s.num === step
                          ? 'ring-2 ring-offset-2'
                          : s.num < step
                          ? 'bg-green-600'
                          : 'bg-gray-300'
                      }`}
                      style={{
                        backgroundColor:
                          s.num === step
                            ? COLORS.primary.main
                            : s.num < step
                            ? '#22c55e'
                            : undefined,
                      }}
                    >
                      {s.num < step ? '✓' : s.num}
                    </div>
                    <span className="text-sm font-medium text-center">{s.label}</span>
                  </div>
                  {s.num < 4 && (
                    <div className="flex-1 h-1 mx-2 mb-8" style={{ backgroundColor: s.num < step ? '#22c55e' : COLORS.border.light }} />
                  )}
                </React.Fragment>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-lg shadow-sm p-6 sm:p-8">
                {/* Step 1: Address */}
                {step === 1 && (
                  <div>
                    <h2 className="text-2xl font-bold mb-6" style={{ color: COLORS.text.primary }}>
                      Select Delivery Address
                    </h2>

                    <div className="space-y-4">
                      {addresses.map((addr) => (
                        <label key={addr.id} className="flex items-start gap-4 p-4 border-2 rounded-lg cursor-pointer transition" style={{ borderColor: selectedAddress === addr.id ? COLORS.primary.main : COLORS.border.light }}>
                          <input
                            type="radio"
                            name="address"
                            value={addr.id}
                            checked={selectedAddress === addr.id}
                            onChange={(e) => setSelectedAddress(e.target.value)}
                            className="mt-1"
                          />
                          <div className="flex-1">
                            <div className="flex items-center gap-2">
                              <h3 className="font-bold">{addr.name}</h3>
                              {addr.isDefault && (
                                <span className="text-xs font-bold px-2 py-1 rounded" style={{ backgroundColor: COLORS.semantic.featured }}>
                                  Default
                                </span>
                              )}
                            </div>
                            <p className="text-sm text-gray-600 mt-1">
                              {addr.street}, {addr.city}, {addr.state} {addr.pincode}
                            </p>
                            <p className="text-sm text-gray-600">Phone: {addr.phone}</p>
                          </div>
                        </label>
                      ))}
                    </div>

                    <button className="mt-6 text-blue-600 hover:text-blue-700 font-medium flex items-center gap-2">
                      <ChevronRight className="w-4 h-4" />
                      Add New Address
                    </button>
                  </div>
                )}

                {/* Step 2: Payment */}
                {step === 2 && (
                  <div>
                    <h2 className="text-2xl font-bold mb-6" style={{ color: COLORS.text.primary }}>
                      Select Payment Method
                    </h2>

                    <div className="space-y-4">
                      {[
                        { id: 'card', label: 'Credit/Debit Card', icon: '💳' },
                        { id: 'upi', label: 'UPI', icon: '📱' },
                        { id: 'netbanking', label: 'Net Banking', icon: '🏦' },
                        { id: 'wallet', label: 'Flipkart Pay', icon: '👝' },
                      ].map((method) => (
                        <label
                          key={method.id}
                          className="flex items-center gap-4 p-4 border-2 rounded-lg cursor-pointer transition"
                          style={{
                            borderColor: selectedPayment === method.id ? COLORS.primary.main : COLORS.border.light,
                          }}
                        >
                          <input
                            type="radio"
                            name="payment"
                            value={method.id}
                            checked={selectedPayment === method.id}
                            onChange={(e) => setSelectedPayment(e.target.value as any)}
                          />
                          <span className="text-2xl">{method.icon}</span>
                          <span className="font-medium">{method.label}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                )}

                {/* Step 3: Review */}
                {step === 3 && (
                  <div>
                    <h2 className="text-2xl font-bold mb-6" style={{ color: COLORS.text.primary }}>
                      Review Order
                    </h2>

                    <div className="space-y-6">
                      {/* Address Summary */}
                      <div>
                        <h3 className="font-bold mb-3">Delivery Address</h3>
                        {addresses.find((a) => a.id === selectedAddress) && (
                          <div className="p-4 bg-gray-50 rounded-lg">
                            <p className="font-medium">
                              {addresses.find((a) => a.id === selectedAddress)?.name}
                            </p>
                            <p className="text-sm text-gray-600 mt-1">
                              {addresses.find((a) => a.id === selectedAddress)?.street}
                            </p>
                          </div>
                        )}
                      </div>

                      {/* Payment Summary */}
                      <div>
                        <h3 className="font-bold mb-3">Payment Method</h3>
                        <p className="text-sm text-gray-600 capitalize">
                          {selectedPayment.replace('-', ' ')}
                        </p>
                      </div>

                      {/* Items Summary */}
                      <div>
                        <h3 className="font-bold mb-3">Order Items</h3>
                        <div className="space-y-2">
                          {items.map((item) => (
                            <div key={item.id} className="flex justify-between text-sm">
                              <span>Product {item.productId} x {item.quantity}</span>
                              <span className="font-medium">₹{(item.price * item.quantity).toLocaleString()}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Step 4: Confirmation */}
                {step === 4 && (
                  <div>
                    <h2 className="text-2xl font-bold mb-6" style={{ color: COLORS.text.primary }}>
                      Confirm & Place Order
                    </h2>

                    <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 flex gap-3 mb-6">
                      <AlertCircle className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" />
                      <div>
                        <h3 className="font-bold text-yellow-900">Review before placing order</h3>
                        <p className="text-sm text-yellow-800 mt-1">
                          Please verify all details are correct before confirming your order.
                        </p>
                      </div>
                    </div>

                    <div className="space-y-4 p-4 bg-gray-50 rounded-lg">
                      <div className="flex justify-between">
                        <span>Address:</span>
                        <span className="font-medium text-sm">
                          {addresses.find((a) => a.id === selectedAddress)?.name}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span>Payment:</span>
                        <span className="font-medium text-sm capitalize">
                          {selectedPayment.replace('-', ' ')}
                        </span>
                      </div>
                      <div className="flex justify-between font-bold text-lg">
                        <span>Total Amount:</span>
                        <span style={{ color: COLORS.primary.main }}>₹{total.toLocaleString()}</span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Order Summary Sidebar */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-lg shadow-sm p-6 sticky top-24">
                <h3 className="font-bold mb-4" style={{ color: COLORS.text.primary }}>
                  Order Summary
                </h3>

                <div className="space-y-2 pb-4 border-b" style={{ borderColor: COLORS.border.light }}>
                  <div className="flex justify-between text-sm">
                    <span>Subtotal</span>
                    <span>₹{subtotal.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Shipping</span>
                    <span className="text-green-600">Free</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Tax</span>
                    <span>₹{tax.toLocaleString()}</span>
                  </div>
                </div>

                <div className="flex justify-between font-bold text-lg py-4" style={{ color: COLORS.primary.main }}>
                  <span>Total</span>
                  <span>₹{total.toLocaleString()}</span>
                </div>

                {/* Benefits */}
                <div className="space-y-3 mb-6 pt-4 border-t" style={{ borderColor: COLORS.border.light }}>
                  <div className="flex items-center gap-2 text-sm">
                    <Truck className="w-4 h-4" style={{ color: COLORS.primary.main }} />
                    <span>Free Delivery</span>
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

                {/* Navigation Buttons */}
                <div className="space-y-3">
                  <button
                    onClick={handlePlaceOrder}
                    disabled={
                      (step === 1 && !selectedAddress) ||
                      (step === 2 && !selectedPayment)
                    }
                    className="w-full py-3 rounded-lg font-bold text-white transition disabled:opacity-50 disabled:cursor-not-allowed"
                    style={{ backgroundColor: COLORS.primary.main }}
                  >
                    {step === 4 ? 'Place Order' : 'Continue'}
                  </button>

                  {step > 1 && (
                    <button
                      onClick={() => setStep((step - 1) as any)}
                      className="w-full py-3 rounded-lg font-bold border-2 transition"
                      style={{ borderColor: COLORS.border.default, color: COLORS.text.primary }}
                    >
                      Back
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
