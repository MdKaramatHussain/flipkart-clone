'use client';

import React from 'react';
import Image from 'next/image';
import { FormField } from './FormField';
import { COLORS } from '@/constants/colors';
import { CHECKOUT_CONFIG, PAYMENT_INSTRUCTIONS } from '@/lib/constants/checkout';
import type { CheckoutPayment, FieldErrors } from '@/types/checkout';
import type { OrderPricing } from '@/types/checkout';

interface PaymentStepProps {
  payment: CheckoutPayment;
  pricing: OrderPricing;
  errors: FieldErrors<CheckoutPayment>;
  onChange: (data: Partial<CheckoutPayment>) => void;
  onFieldBlur: (field: keyof CheckoutPayment) => void;
  onClearError: (field: keyof CheckoutPayment) => void;
}

export function PaymentStep({
  payment,
  pricing,
  errors,
  onChange,
  onFieldBlur,
  onClearError,
}: PaymentStepProps) {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-6" style={{ color: COLORS.text.primary }}>
        Payment
      </h2>

      <div className="space-y-6">
        <div className="p-4 bg-blue-50 rounded-lg border border-blue-100">
          <p className="text-sm font-medium text-gray-800 mb-2">Amount to Pay</p>
          <p className="text-3xl font-bold" style={{ color: COLORS.primary.main }}>
            ₹{pricing.finalPayableAmount.toLocaleString('en-IN')}
          </p>
          {payment.upiId && (
            <p className="text-sm text-gray-600 mt-2">
              UPI ID: <span className="font-medium">{payment.upiId}</span>
            </p>
          )}
        </div>

        <div>
          <h3 className="font-bold mb-3" style={{ color: COLORS.text.primary }}>
            Payment Instructions
          </h3>
          <ol className="list-decimal list-inside space-y-2 text-sm text-gray-700">
            {PAYMENT_INSTRUCTIONS.map((instruction, index) => (
              <li key={index}>{instruction}</li>
            ))}
          </ol>
        </div>

        <div className="flex flex-col items-center p-6 bg-gray-50 rounded-lg border border-gray-200">
          <p className="text-sm font-medium text-gray-700 mb-4">Scan QR Code to Pay</p>
          <div className="relative w-56 h-56 bg-white rounded-lg border border-gray-200 overflow-hidden">
            <Image
              src="/paymetQR.jpeg"
              alt="Payment QR Code"
              fill
              className="object-contain p-2"
              priority
            />
          </div>
        </div>

        <FormField
          label="Enter UTR Number"
          name="utrNumber"
          value={payment.utrNumber}
          placeholder={`Enter UTR (min ${CHECKOUT_CONFIG.UTR_MIN_LENGTH} characters)`}
          error={errors.utrNumber}
          onChange={(value) => {
            onChange({ utrNumber: value });
            onClearError('utrNumber');
          }}
          onBlur={() => onFieldBlur('utrNumber')}
        />
      </div>
    </div>
  );
}
