'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { CheckCircle2, Mail } from 'lucide-react';
import { COLORS } from '@/constants/colors';
import { FormField } from '@/components/checkout/FormField';
import type { CheckoutCustomer, CheckoutShipping, CheckoutPayment, CheckoutOrder } from '@/types/checkout';

interface OrderConfirmationStepProps {
  customer: CheckoutCustomer;
  shipping: CheckoutShipping;
  payment: CheckoutPayment;
  order: CheckoutOrder;
  onContinueShopping?: () => void;
}

export function OrderConfirmationStep({
  customer,
  shipping,
  payment,
  order,
  onContinueShopping,
}: OrderConfirmationStepProps) {
  const { pricing } = order;
  const [email, setEmail] = useState(customer.email);
  const [emailError, setEmailError] = useState('');
  const [emailStatus, setEmailStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle');
  const [emailMessage, setEmailMessage] = useState('');

  const handleSendEmail = async () => {
    setEmailError('');
    setEmailMessage('');

    if (!email.trim()) {
      setEmailError('Email address is required');
      return;
    }

    setEmailStatus('sending');

    try {
      const response = await fetch('/api/checkout/send-order-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, customer, shipping, order }),
      });

      const result = await response.json();

      if (!response.ok || !result.success) {
        setEmailStatus('error');
        setEmailError(result.error || 'Failed to send email');
        return;
      }

      setEmailStatus('sent');
      setEmailMessage(result.message);
    } catch {
      setEmailStatus('error');
      setEmailError('Failed to send email. Please try again.');
    }
  };

  return (
    <div>
      <div className="text-center mb-8">
        <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-green-100 flex items-center justify-center">
          <CheckCircle2 className="w-10 h-10 text-green-600" />
        </div>
        <h2 className="text-2xl font-bold mb-2" style={{ color: COLORS.text.primary }}>
          Order Successfully Placed
        </h2>
        <p className="text-gray-600">Thank you for your purchase!</p>
      </div>

      <div className="space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4 bg-gray-50 rounded-lg">
          <div>
            <p className="text-xs text-gray-500 uppercase tracking-wide">Order ID</p>
            <p className="font-bold text-gray-900">{order.orderId}</p>
          </div>
          <div>
            <p className="text-xs text-gray-500 uppercase tracking-wide">Order Date</p>
            <p className="font-bold text-gray-900">
              {order.orderDate} at {order.orderTime}
            </p>
          </div>
          <div>
            <p className="text-xs text-gray-500 uppercase tracking-wide">Payment Status</p>
            <span className="inline-block mt-1 px-3 py-1 text-xs font-bold rounded-full bg-green-100 text-green-700 capitalize">
              {order.paymentStatus}
            </span>
          </div>
          <div>
            <p className="text-xs text-gray-500 uppercase tracking-wide">Order Status</p>
            <span className="inline-block mt-1 px-3 py-1 text-xs font-bold rounded-full bg-blue-100 text-blue-700 capitalize">
              {order.status}
            </span>
          </div>
        </div>

        <div className="p-4 border border-gray-200 rounded-lg">
          <h3 className="font-bold mb-3" style={{ color: COLORS.text.primary }}>
            Customer Details
          </h3>
          <p className="text-sm text-gray-700">
            {customer.firstName} {customer.lastName}
          </p>
          <p className="text-sm text-gray-600">{customer.email}</p>
          <p className="text-sm text-gray-600">{customer.phone}</p>
        </div>

        <div className="p-4 border border-gray-200 rounded-lg">
          <h3 className="font-bold mb-3" style={{ color: COLORS.text.primary }}>
            Delivery Address
          </h3>
          <p className="text-sm text-gray-700">{shipping.addressLine}</p>
          <p className="text-sm text-gray-600">
            {shipping.city}, {shipping.state} - {shipping.postalCode}
          </p>
          <p className="text-sm text-gray-600">{shipping.country}</p>
        </div>

        <div className="p-4 border border-gray-200 rounded-lg">
          <h3 className="font-bold mb-3" style={{ color: COLORS.text.primary }}>
            Payment Details
          </h3>
          <p className="text-sm text-gray-700 capitalize">Method: QR UPI</p>
          <p className="text-sm text-gray-600">UTR: {payment.utrNumber}</p>
        </div>

        <div className="p-4 border border-gray-200 rounded-lg">
          <h3 className="font-bold mb-4" style={{ color: COLORS.text.primary }}>
            Ordered Products
          </h3>
          <div className="space-y-3">
            {order.items.map((item) => (
              <div key={item.id} className="flex gap-3 items-center">
                {item.image && (
                  <div className="relative w-12 h-12 flex-shrink-0 bg-gray-100 rounded overflow-hidden">
                    <Image
                      src={item.image}
                      alt={item.productName}
                      fill
                      className="object-cover"
                      sizes="48px"
                    />
                  </div>
                )}
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 truncate">{item.productName}</p>
                  <p className="text-xs text-gray-500">Qty: {item.quantity}</p>
                </div>
                <p className="text-sm font-bold text-gray-900">
                  ₹{(item.price * item.quantity).toLocaleString('en-IN')}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="p-4 border border-gray-200 rounded-lg">
          <h3 className="font-bold mb-3 flex items-center gap-2" style={{ color: COLORS.text.primary }}>
            <Mail className="w-4 h-4" />
            Email Order Confirmation
          </h3>
          <div className="space-y-3">
            <FormField
              label="Email Address"
              name="confirmationEmail"
              type="email"
              value={email}
              placeholder="Enter email to receive order confirmation"
              error={emailError}
              onChange={(value) => {
                setEmail(value);
                setEmailError('');
                setEmailStatus('idle');
                setEmailMessage('');
              }}
            />
            <button
              type="button"
              onClick={handleSendEmail}
              disabled={emailStatus === 'sending'}
              className="w-full py-2.5 rounded-lg font-semibold text-white transition hover:opacity-90 disabled:opacity-60"
              style={{ backgroundColor: COLORS.primary.main }}
            >
              {emailStatus === 'sending' ? 'Sending...' : 'Send Confirmation Email'}
            </button>
            {emailStatus === 'sent' && emailMessage && (
              <p className="text-sm text-green-600">{emailMessage}</p>
            )}
          </div>
        </div>

        <div className="p-4 bg-blue-50 rounded-lg space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-gray-600">Total MRP</span>
            <span>₹{pricing.totalMrp.toLocaleString('en-IN')}</span>
          </div>
          {pricing.productDiscount > 0 && (
            <div className="flex justify-between text-green-600">
              <span>Product Discount</span>
              <span>-₹{pricing.productDiscount.toLocaleString('en-IN')}</span>
            </div>
          )}
          {pricing.couponDiscount > 0 && (
            <div className="flex justify-between text-green-600">
              <span>Coupon Discount</span>
              <span>-₹{pricing.couponDiscount.toLocaleString('en-IN')}</span>
            </div>
          )}
          <div className="flex justify-between">
            <span className="text-gray-600">Shipping</span>
            <span>{pricing.shippingCharges === 0 ? 'FREE' : `₹${pricing.shippingCharges.toLocaleString('en-IN')}`}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Tax</span>
            <span>₹{pricing.tax.toLocaleString('en-IN')}</span>
          </div>
          <div className="flex justify-between font-bold text-lg pt-2 border-t border-blue-200">
            <span>Total Paid</span>
            <span style={{ color: COLORS.primary.main }}>
              ₹{pricing.finalPayableAmount.toLocaleString('en-IN')}
            </span>
          </div>
        </div>

        <Link
          href="/"
          onClick={onContinueShopping}
          className="block w-full py-3 text-center rounded-lg font-bold text-white transition hover:opacity-90"
          style={{ backgroundColor: COLORS.primary.main }}
        >
          Continue Shopping
        </Link>
      </div>
    </div>
  );
}
