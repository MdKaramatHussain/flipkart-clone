import { NextRequest, NextResponse } from 'next/server';
import { productsApi } from '@/lib/api-service';

export async function GET(request: NextRequest) {
  try {
    const limit = parseInt(request.nextUrl.searchParams.get('limit') || '10');
    const result = await productsApi.getTrending(limit);
    return NextResponse.json(result);
  } catch (error) {
    console.error('Trending API error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch trending products' },
      { status: 500 }
    );
  }
}
