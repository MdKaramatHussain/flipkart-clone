import { NextRequest, NextResponse } from 'next/server';
import { ProductImportService } from '@/services/import';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { url, action = 'import' } = body;

    if (!url || typeof url !== 'string') {
      return NextResponse.json(
        {
          success: false,
          error: 'Product URL is required',
        },
        { status: 400 }
      );
    }

    // Validate URL format
    try {
      new URL(url);
    } catch {
      return NextResponse.json(
        {
          success: false,
          error: 'Invalid URL format',
        },
        { status: 400 }
      );
    }

    // Handle different actions
    if (action === 'validate') {
      const validation = ProductImportService.validateURL(url);
      return NextResponse.json(validation);
    }

    if (action === 'preview' || action === 'import') {
      const result = await ProductImportService.previewImport(url);
      return NextResponse.json(result);
    }

    return NextResponse.json(
      {
        success: false,
        error: 'Invalid action',
      },
      { status: 400 }
    );
  } catch (error) {
    console.error('Product import API error:', error);

    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Internal server error',
      },
      { status: 500 }
    );
  }
}

/**
 * Optional: Add GET endpoint to check import status or history
 */
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const action = searchParams.get('action');
    const url = searchParams.get('url');

    if (action === 'validate' && url) {
      const validation = ProductImportService.validateURL(url);
      return NextResponse.json(validation);
    }

    return NextResponse.json(
      {
        success: false,
        error: 'Invalid request',
      },
      { status: 400 }
    );
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        error: 'Internal server error',
      },
      { status: 500 }
    );
  }
}
