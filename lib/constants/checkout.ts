export const CHECKOUT_CONFIG = {
  TAX_RATE: 0,
  FREE_SHIPPING_THRESHOLD: 0,
  SHIPPING_FEE: 0,
  UPI_ID: 'flipkart@upi',
  UTR_MIN_LENGTH: 12,
  DEFAULT_COUNTRY: 'India',
} as const;

export const PAYMENT_INSTRUCTIONS = [
  'Open your UPI app (Google Pay, PhonePe, Paytm, etc.)',
  'Scan the QR code shown below',
  'Enter the exact amount displayed',
  'Complete the payment',
  'Copy the UTR / Transaction Reference number',
  'Enter the UTR number below to confirm your payment',
] as const;
