'use client';

import { useCallback, useState } from 'react';
import type {
  CheckoutCustomer,
  CheckoutShipping,
  CheckoutPayment,
  CheckoutStep,
  FieldErrors,
} from '@/types/checkout';
import {
  validateCustomer,
  validateShipping,
  validatePayment,
  hasErrors,
  scrollToFirstError,
  getFirstErrorField,
} from '@/lib/validation/checkoutValidation';

type StepErrors = {
  customer: FieldErrors<CheckoutCustomer>;
  shipping: FieldErrors<CheckoutShipping>;
  payment: FieldErrors<CheckoutPayment>;
};

const emptyErrors: StepErrors = {
  customer: {},
  shipping: {},
  payment: {},
};

export function useCheckoutValidation() {
  const [errors, setErrors] = useState<StepErrors>(emptyErrors);
  const [touched, setTouched] = useState<Record<string, boolean>>({});

  const markTouched = useCallback((field: string) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
  }, []);

  const clearFieldError = useCallback(
    (step: keyof StepErrors, field: string) => {
      setErrors((prev) => {
        const stepErrors = { ...prev[step] };
        delete stepErrors[field as keyof typeof stepErrors];
        return { ...prev, [step]: stepErrors };
      });
    },
    []
  );

  const validateStep = useCallback(
    (
      step: CheckoutStep,
      data: {
        customer: CheckoutCustomer;
        shipping: CheckoutShipping;
        payment: CheckoutPayment;
      }
    ): boolean => {
      let stepErrors: StepErrors[keyof StepErrors] = {};

      if (step === 1) {
        stepErrors = validateCustomer(data.customer);
        setErrors((prev) => ({ ...prev, customer: stepErrors as FieldErrors<CheckoutCustomer> }));
        if (hasErrors(stepErrors)) {
          const firstField = getFirstErrorField(stepErrors as FieldErrors<CheckoutCustomer>);
          if (firstField) scrollToFirstError([String(firstField)]);
          return false;
        }
      }

      if (step === 2) {
        stepErrors = validateShipping(data.shipping);
        setErrors((prev) => ({ ...prev, shipping: stepErrors as FieldErrors<CheckoutShipping> }));
        if (hasErrors(stepErrors)) {
          const firstField = getFirstErrorField(stepErrors as FieldErrors<CheckoutShipping>);
          if (firstField) scrollToFirstError([String(firstField)]);
          return false;
        }
      }

      if (step === 3) {
        stepErrors = validatePayment(data.payment);
        setErrors((prev) => ({ ...prev, payment: stepErrors as FieldErrors<CheckoutPayment> }));
        if (hasErrors(stepErrors)) {
          const firstField = getFirstErrorField(stepErrors as FieldErrors<CheckoutPayment>);
          if (firstField) scrollToFirstError([String(firstField)]);
          return false;
        }
      }

      return true;
    },
    []
  );

  const resetValidation = useCallback(() => {
    setErrors(emptyErrors);
    setTouched({});
  }, []);

  return {
    errors,
    touched,
    markTouched,
    clearFieldError,
    validateStep,
    resetValidation,
  };
}
