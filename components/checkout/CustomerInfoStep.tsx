'use client';

import React from 'react';
import { FormField } from './FormField';
import { COLORS } from '@/constants/colors';
import type { CheckoutCustomer, FieldErrors } from '@/types/checkout';

interface CustomerInfoStepProps {
  customer: CheckoutCustomer;
  errors: FieldErrors<CheckoutCustomer>;
  onChange: (data: Partial<CheckoutCustomer>) => void;
  onFieldBlur: (field: keyof CheckoutCustomer) => void;
  onClearError: (field: keyof CheckoutCustomer) => void;
}

export function CustomerInfoStep({
  customer,
  errors,
  onChange,
  onFieldBlur,
  onClearError,
}: CustomerInfoStepProps) {
  const handleChange = (field: keyof CheckoutCustomer, value: string) => {
    onChange({ [field]: value });
    onClearError(field);
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6" style={{ color: COLORS.text.primary }}>
        Customer Information
      </h2>

      <div className="space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <FormField
            label="First Name"
            name="firstName"
            value={customer.firstName}
            placeholder="Enter first name"
            error={errors.firstName}
            onChange={(value) => handleChange('firstName', value)}
            onBlur={() => onFieldBlur('firstName')}
          />
          <FormField
            label="Last Name"
            name="lastName"
            value={customer.lastName}
            placeholder="Enter last name"
            error={errors.lastName}
            onChange={(value) => handleChange('lastName', value)}
            onBlur={() => onFieldBlur('lastName')}
          />
        </div>

        <FormField
          label="Email"
          name="email"
          type="email"
          value={customer.email}
          placeholder="Enter email address"
          error={errors.email}
          onChange={(value) => handleChange('email', value)}
          onBlur={() => onFieldBlur('email')}
        />

        <FormField
          label="Phone Number"
          name="phone"
          type="tel"
          value={customer.phone}
          placeholder="Enter 10-digit phone number"
          error={errors.phone}
          onChange={(value) => handleChange('phone', value)}
          onBlur={() => onFieldBlur('phone')}
        />
      </div>
    </div>
  );
}
