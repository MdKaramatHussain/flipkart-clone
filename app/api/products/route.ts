import { NextRequest, NextResponse } from 'next/server';
import { productsApi } from '@/lib/api-service';
import type { FilterOptions } from '@/lib/types';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const query = searchParams.get('q') || '';
    const category = searchParams.get('category') || undefined;
    const brand = searchParams.get('brand') || undefined;
    const minPrice = searchParams.get('minPrice');
    const maxPrice = searchParams.get('maxPrice');
    const rating = searchParams.get('rating');
    const inStock = searchParams.get('inStock') === 'true';
    const sortBy = searchParams.get('sortBy') || 'relevance';
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '20');

    const options: FilterOptions = {
      category: category || undefined,
      brand: brand || undefined,
      priceRange:
        minPrice && maxPrice
          ? [parseInt(minPrice), parseInt(maxPrice)]
          : undefined,
      rating: rating ? parseInt(rating) : undefined,
      inStock,
      sortBy: sortBy as any,
      page,
      limit,
    };

    const result = await productsApi.search(query, options);
    return NextResponse.json(result);
  } catch (error) {
    console.error('Products API error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch products' },
      { status: 500 }
    );
  }
}
