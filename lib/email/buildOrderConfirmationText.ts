import type { CheckoutCustomer, CheckoutOrder, CheckoutShipping } from '@/types/checkout';

export function buildOrderConfirmationText(
  customer: CheckoutCustomer,
  shipping: CheckoutShipping,
  order: CheckoutOrder
): string {
  const { pricing } = order;
  const itemsList = order.items
    .map(
      (item) =>
        `- ${item.productName} (Qty: ${item.quantity}) - ₹${(item.price * item.quantity).toLocaleString('en-IN')}`
    )
    .join('\n');

  return `Hi ${customer.firstName} ${customer.lastName},

Thank you for your order on Flipkart!

Order ID: ${order.orderId}
Order Date: ${order.orderDate} at ${order.orderTime}
Status: ${order.status}
Payment Status: ${order.paymentStatus}

Delivery Address:
${shipping.addressLine}
${shipping.city}, ${shipping.state} - ${shipping.postalCode}
${shipping.country}

Ordered Products:
${itemsList}

Order Summary:
Total MRP: ₹${pricing.totalMrp.toLocaleString('en-IN')}
${pricing.productDiscount > 0 ? `Product Discount: -₹${pricing.productDiscount.toLocaleString('en-IN')}\n` : ''}${pricing.couponDiscount > 0 ? `Coupon Discount: -₹${pricing.couponDiscount.toLocaleString('en-IN')}\n` : ''}Shipping: ${pricing.shippingCharges === 0 ? 'FREE' : `₹${pricing.shippingCharges.toLocaleString('en-IN')}`}
Tax: ₹${pricing.tax.toLocaleString('en-IN')}
Total Paid: ₹${pricing.finalPayableAmount.toLocaleString('en-IN')}

Regards,
Team Flipkart`;
}
