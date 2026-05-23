import { NextRequest, NextResponse } from 'next/server';

const MOCK_USER = {
  id: 'user_001',
  email: 'user@example.com',
  name: 'John Doe',
  phone: '9876543210',
};

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json();

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 800));

    if (!email || !password) {
      return NextResponse.json(
        { success: false, error: 'Email and password are required' },
        { status: 400 }
      );
    }

    // Mock validation
    if (password.length < 6) {
      return NextResponse.json(
        { success: false, error: 'Invalid credentials' },
        { status: 401 }
      );
    }

    return NextResponse.json({
      success: true,
      data: { ...MOCK_USER, email },
      message: 'Login successful',
    });
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json(
      { success: false, error: 'Login failed' },
      { status: 500 }
    );
  }
}
