import type {
  CheckoutCustomer,
  CheckoutShipping,
  CheckoutPayment,
  FieldErrors,
} from '@/types/checkout';
import { CHECKOUT_CONFIG } from '@/lib/constants/checkout';

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_REGEX = /^[6-9]\d{9}$/;
const POSTAL_CODE_REGEX = /^[1-9][0-9]{5}$/;

export function validateEmail(email: string): string | undefined {
  const trimmed = email.trim();
  if (!trimmed) return 'Email is required';
  if (!EMAIL_REGEX.test(trimmed)) return 'Enter a valid email address';
  return undefined;
}

export function validatePhone(phone: string): string | undefined {
  const digits = phone.replace(/\D/g, '');
  if (!digits) return 'Phone number is required';
  if (!PHONE_REGEX.test(digits)) return 'Enter a valid 10-digit phone number';
  return undefined;
}

export function validatePostalCode(postalCode: string): string | undefined {
  const trimmed = postalCode.trim();
  if (!trimmed) return 'Postal code is required';
  if (!POSTAL_CODE_REGEX.test(trimmed)) return 'Enter a valid 6-digit postal code';
  return undefined;
}

export function validateRequired(value: string, label: string): string | undefined {
  if (!value.trim()) return `${label} is required`;
  return undefined;
}

export function validateCustomer(customer: CheckoutCustomer): FieldErrors<CheckoutCustomer> {
  const errors: FieldErrors<CheckoutCustomer> = {};

  const firstNameError = validateRequired(customer.firstName, 'First name');
  if (firstNameError) errors.firstName = firstNameError;

  const lastNameError = validateRequired(customer.lastName, 'Last name');
  if (lastNameError) errors.lastName = lastNameError;

  const emailError = validateEmail(customer.email);
  if (emailError) errors.email = emailError;

  const phoneError = validatePhone(customer.phone);
  if (phoneError) errors.phone = phoneError;

  return errors;
}

export function validateShipping(shipping: CheckoutShipping): FieldErrors<CheckoutShipping> {
  const errors: FieldErrors<CheckoutShipping> = {};

  const addressError = validateRequired(shipping.addressLine, 'Address');
  if (addressError) errors.addressLine = addressError;

  const cityError = validateRequired(shipping.city, 'City');
  if (cityError) errors.city = cityError;

  const stateError = validateRequired(shipping.state, 'State');
  if (stateError) errors.state = stateError;

  const countryError = validateRequired(shipping.country, 'Country');
  if (countryError) errors.country = countryError;

  const postalError = validatePostalCode(shipping.postalCode);
  if (postalError) errors.postalCode = postalError;

  return errors;
}

export function validatePayment(payment: CheckoutPayment): FieldErrors<CheckoutPayment> {
  const errors: FieldErrors<CheckoutPayment> = {};
  const utr = payment.utrNumber.trim();

  if (!utr) {
    errors.utrNumber = 'UTR number is required';
  } else if (utr.length < CHECKOUT_CONFIG.UTR_MIN_LENGTH) {
    errors.utrNumber = `UTR must be at least ${CHECKOUT_CONFIG.UTR_MIN_LENGTH} characters`;
  }

  return errors;
}

export function hasErrors<T extends object>(errors: FieldErrors<T>): boolean {
  return Object.keys(errors).length > 0;
}

export function scrollToFirstError(fieldNames: string[]): void {
  for (const name of fieldNames) {
    const element = document.querySelector<HTMLElement>(`[data-field="${name}"]`);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'center' });
      const input = element.querySelector<HTMLInputElement | HTMLTextAreaElement>('input, textarea, select');
      input?.focus();
      break;
    }
  }
}

export function getFirstErrorField<T extends object>(errors: FieldErrors<T>): (keyof T) | undefined {
  const keys = Object.keys(errors) as (keyof T)[];
  return keys[0];
}
