import { NextRequest, NextResponse } from 'next/server';
import { productsApi } from '@/lib/api-service';

export async function GET(request: NextRequest) {
  try {
    const limit = parseInt(request.nextUrl.searchParams.get('limit') || '8');
    const result = await productsApi.getFeatured(limit);
    return NextResponse.json(result);
  } catch (error) {
    console.error('Featured API error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch featured products' },
      { status: 500 }
    );
  }
}
