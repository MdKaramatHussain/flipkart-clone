import { NextRequest, NextResponse } from 'next/server';
import { ordersApi } from '@/lib/api-service';

export async function POST(request: NextRequest) {
  try {
    const orderData = await request.json();

    if (!orderData.userId || !orderData.items || orderData.items.length === 0) {
      return NextResponse.json(
        { success: false, error: 'Invalid order data' },
        { status: 400 }
      );
    }

    const result = await ordersApi.create(orderData);
    return NextResponse.json(result);
  } catch (error) {
    console.error('Order creation error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to create order' },
      { status: 500 }
    );
  }
}
