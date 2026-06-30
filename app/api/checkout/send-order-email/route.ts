import { NextRequest, NextResponse } from 'next/server';
import { sendEmail } from '@/lib/email/sendEmail';
import { buildOrderConfirmationText } from '@/lib/email/buildOrderConfirmationText';
import { validateEmail } from '@/lib/validation/checkoutValidation';
import type { CheckoutCustomer, CheckoutOrder, CheckoutShipping } from '@/types/checkout';

export async function POST(request: NextRequest) {
  try {
    const { email, customer, shipping, order } = await request.json();

    const emailError = validateEmail(email);
    if (emailError) {
      return NextResponse.json({ success: false, error: emailError }, { status: 400 });
    }

    if (!order?.orderId || !customer || !shipping) {
      return NextResponse.json(
        { success: false, error: 'Order details are required' },
        { status: 400 }
      );
    }

    const text = buildOrderConfirmationText(
      customer as CheckoutCustomer,
      shipping as CheckoutShipping,
      order as CheckoutOrder
    );

    await sendEmail({
      to: email.trim(),
      subject: `Order Confirmation - ${order.orderId}`,
      text,
    });

    return NextResponse.json({
      success: true,
      message: 'Order confirmation email sent successfully',
    });
  } catch (error) {
    console.error('Order email error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to send order confirmation email' },
      { status: 500 }
    );
  }
}
