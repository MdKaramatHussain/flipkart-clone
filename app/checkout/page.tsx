'use client';

import React, { useCallback, useEffect } from 'react';
import Link from 'next/link';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { CheckoutStepIndicator } from '@/components/checkout/CheckoutStepIndicator';
import { CustomerInfoStep } from '@/components/checkout/CustomerInfoStep';
import { ShippingAddressStep } from '@/components/checkout/ShippingAddressStep';
import { PaymentStep } from '@/components/checkout/PaymentStep';
import { OrderConfirmationStep } from '@/components/checkout/OrderConfirmationStep';
import { CheckoutOrderSummary } from '@/components/checkout/CheckoutOrderSummary';
import { useCartStore, useProductStore, useOrdersStore } from '@/lib/store';
import { useAuthStore } from '@/store/useStore';
import { useCheckoutStore } from '@/store/useCheckoutStore';
import { useCartPricing } from '@/hooks/useCartPricing';
import { useCheckoutValidation } from '@/hooks/useCheckoutValidation';
import { createCheckoutOrder, createPersistedOrder } from '@/lib/order/generateOrder';
import { COLORS } from '@/constants/colors';
import type { CheckoutStep } from '@/types/checkout';

export default function CheckoutPage() {
  const { cart, clearCart } = useCartStore();
  const getProductById = useProductStore((state) => state.getProductById);
  const addOrder = useOrdersStore((state) => state.addOrder);
  const user = useAuthStore((state) => state.user);

  const {
    customer,
    shipping,
    payment,
    order,
    currentStep,
    updateCustomer,
    updateShipping,
    updatePayment,
    setStep,
    setOrder,
    completePayment,
    resetCheckout,
  } = useCheckoutStore();

  const pricing = useCartPricing();
  const { errors, validateStep, clearFieldError } = useCheckoutValidation();

  const items = cart.items;

  useEffect(() => {
    if (items.length > 0 && currentStep === 4) {
      resetCheckout();
    }
  }, [items.length, currentStep, resetCheckout]);

  const handleContinue = useCallback(() => {
    if (currentStep === 4) return;

    const isValid = validateStep(currentStep, { customer, shipping, payment });
    if (!isValid) return;

    if (currentStep === 3) {
      completePayment(payment.utrNumber.trim());
      const checkoutOrder = createCheckoutOrder(
        cart,
        customer,
        shipping,
        { ...payment, utrNumber: payment.utrNumber.trim(), status: 'completed' },
        getProductById
      );
      setOrder(checkoutOrder);

      const persistedOrder = createPersistedOrder(
        checkoutOrder,
        customer,
        shipping,
        user?.id ?? 'guest'
      );
      addOrder(persistedOrder);
      clearCart();
      setStep(4);
      return;
    }

    setStep((currentStep + 1) as CheckoutStep);
  }, [
    currentStep,
    validateStep,
    customer,
    shipping,
    payment,
    cart,
    getProductById,
    completePayment,
    setOrder,
    addOrder,
    user,
    clearCart,
    setStep,
  ]);

  const handleBack = useCallback(() => {
    if (currentStep > 1 && currentStep < 4) {
      setStep((currentStep - 1) as CheckoutStep);
    }
  }, [currentStep, setStep]);

  if (items.length === 0 && currentStep < 4) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col">
        <Header />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4" style={{ color: COLORS.text.primary }}>
              Your cart is empty
            </h1>
            <p className="text-gray-600 mb-6">Add products to proceed with checkout</p>
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

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header />

      <main className="flex-1">
        <div className="max-w-full px-4 sm:px-6 lg:px-8 py-8">
          <h1 className="text-2xl font-bold mb-6" style={{ color: COLORS.text.primary }}>
            Checkout
          </h1>

          <CheckoutStepIndicator currentStep={currentStep} />

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <div className="bg-white rounded-lg shadow-sm p-6 sm:p-8">
                {currentStep === 1 && (
                  <CustomerInfoStep
                    customer={customer}
                    errors={errors.customer}
                    onChange={updateCustomer}
                    onFieldBlur={() => {}}
                    onClearError={(field) => clearFieldError('customer', field)}
                  />
                )}

                {currentStep === 2 && (
                  <ShippingAddressStep
                    shipping={shipping}
                    errors={errors.shipping}
                    onChange={updateShipping}
                    onFieldBlur={() => {}}
                    onClearError={(field) => clearFieldError('shipping', field)}
                  />
                )}

                {currentStep === 3 && (
                  <PaymentStep
                    payment={payment}
                    pricing={pricing}
                    errors={errors.payment}
                    onChange={updatePayment}
                    onFieldBlur={() => {}}
                    onClearError={(field) => clearFieldError('payment', field)}
                  />
                )}

                {currentStep === 4 && order && (
                  <OrderConfirmationStep
                    customer={customer}
                    shipping={shipping}
                    payment={{ ...payment, status: 'completed' }}
                    order={order}
                    onContinueShopping={resetCheckout}
                  />
                )}
              </div>
            </div>

            {currentStep < 4 && (
              <div className="lg:col-span-1">
                <CheckoutOrderSummary
                  step={currentStep}
                  onContinue={handleContinue}
                  onBack={handleBack}
                />
              </div>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
