import { NextRequest, NextResponse } from 'next/server';
import { cartApi } from '@/lib/api-service';

export async function POST(request: NextRequest) {
  try {
    const { items } = await request.json();

    if (!Array.isArray(items)) {
      return NextResponse.json(
        { success: false, error: 'Items must be an array' },
        { status: 400 }
      );
    }

    const result = await cartApi.validateCartItems(items);
    return NextResponse.json(result);
  } catch (error) {
    console.error('Cart validation error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to validate cart' },
      { status: 500 }
    );
  }
}
