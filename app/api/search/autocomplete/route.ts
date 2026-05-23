import { NextRequest, NextResponse } from 'next/server';
import { searchApi } from '@/lib/api-service';

export async function GET(request: NextRequest) {
  try {
    const query = request.nextUrl.searchParams.get('q') || '';

    if (!query || query.length < 2) {
      return NextResponse.json(
        { success: true, data: [] }
      );
    }

    const result = await searchApi.getAutocomplete(query);
    return NextResponse.json(result);
  } catch (error) {
    console.error('Autocomplete error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to get suggestions' },
      { status: 500 }
    );
  }
}
