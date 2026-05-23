import { NextRequest, NextResponse } from 'next/server';
import { couponsApi } from '@/lib/api-service';

export async function POST(request: NextRequest) {
  try {
    const { code, orderValue } = await request.json();
    
    if (!code || !orderValue) {
      return NextResponse.json(
        { success: false, error: 'Code and orderValue are required' },
        { status: 400 }
      );
    }

    const result = await couponsApi.validate(code, orderValue);
    return NextResponse.json(result);
  } catch (error) {
    console.error('Coupon validation error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to validate coupon' },
      { status: 500 }
    );
  }
}
