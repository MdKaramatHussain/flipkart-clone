'use client';

import React from 'react';
import { COLORS } from '@/constants/colors';
import type { CheckoutStep } from '@/types/checkout';

const STEPS = [
  { num: 1 as CheckoutStep, label: 'Customer Info' },
  { num: 2 as CheckoutStep, label: 'Shipping' },
  { num: 3 as CheckoutStep, label: 'Payment' },
  { num: 4 as CheckoutStep, label: 'Confirm' },
];

interface CheckoutStepIndicatorProps {
  currentStep: CheckoutStep;
}

export function CheckoutStepIndicator({ currentStep }: CheckoutStepIndicatorProps) {
  return (
    <div className="mb-8">
      <div className="flex items-center justify-between max-w-2xl">
        {STEPS.map((step) => (
          <React.Fragment key={step.num}>
            <div className="flex flex-col items-center gap-2 flex-1">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-white transition ${
                  step.num === currentStep ? 'ring-2 ring-offset-2' : ''
                }`}
                style={{
                  backgroundColor:
                    step.num === currentStep
                      ? COLORS.primary.main
                      : step.num < currentStep
                      ? '#22c55e'
                      : '#d1d5db',
                }}
              >
                {step.num < currentStep ? '✓' : step.num}
              </div>
              <span className="text-sm font-medium text-center hidden sm:block">{step.label}</span>
            </div>
            {step.num < 4 && (
              <div
                className="flex-1 h-1 mx-2 mb-8"
                style={{ backgroundColor: step.num < currentStep ? '#22c55e' : COLORS.border.light }}
              />
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}
