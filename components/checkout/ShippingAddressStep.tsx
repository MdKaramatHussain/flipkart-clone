'use client';

import React from 'react';
import { FormField } from './FormField';
import { COLORS } from '@/constants/colors';
import type { CheckoutShipping, FieldErrors } from '@/types/checkout';

interface ShippingAddressStepProps {
  shipping: CheckoutShipping;
  errors: FieldErrors<CheckoutShipping>;
  onChange: (data: Partial<CheckoutShipping>) => void;
  onFieldBlur: (field: keyof CheckoutShipping) => void;
  onClearError: (field: keyof CheckoutShipping) => void;
}

export function ShippingAddressStep({
  shipping,
  errors,
  onChange,
  onFieldBlur,
  onClearError,
}: ShippingAddressStepProps) {
  const handleChange = (field: keyof CheckoutShipping, value: string) => {
    onChange({ [field]: value });
    onClearError(field);
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6" style={{ color: COLORS.text.primary }}>
        Shipping Address
      </h2>

      <div className="space-y-4">
        <FormField
          label="Address Line"
          name="addressLine"
          value={shipping.addressLine}
          placeholder="House no., street, area"
          error={errors.addressLine}
          onChange={(value) => handleChange('addressLine', value)}
          onBlur={() => onFieldBlur('addressLine')}
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <FormField
            label="City"
            name="city"
            value={shipping.city}
            placeholder="Enter city"
            error={errors.city}
            onChange={(value) => handleChange('city', value)}
            onBlur={() => onFieldBlur('city')}
          />
          <FormField
            label="State"
            name="state"
            value={shipping.state}
            placeholder="Enter state"
            error={errors.state}
            onChange={(value) => handleChange('state', value)}
            onBlur={() => onFieldBlur('state')}
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <FormField
            label="Country"
            name="country"
            value={shipping.country}
            placeholder="Enter country"
            error={errors.country}
            onChange={(value) => handleChange('country', value)}
            onBlur={() => onFieldBlur('country')}
          />
          <FormField
            label="Postal Code"
            name="postalCode"
            value={shipping.postalCode}
            placeholder="Enter 6-digit PIN code"
            error={errors.postalCode}
            onChange={(value) => handleChange('postalCode', value)}
            onBlur={() => onFieldBlur('postalCode')}
          />
        </div>
      </div>
    </div>
  );
}
