import { NextRequest, NextResponse } from 'next/server';
import { sendEmail } from '@/lib/email/sendEmail';

export async function POST(request: NextRequest) {
  try {
    const { name, email, password, phone } = await request.json();

    await new Promise((resolve) => setTimeout(resolve, 1000));

    if (!name || !email || !password) {
      return NextResponse.json(
        { success: false, error: 'Name, email, and password are required' },
        { status: 400 }
      );
    }

    if (password.length < 6) {
      return NextResponse.json(
        { success: false, error: 'Password must be at least 6 characters' },
        { status: 400 }
      );
    }

    const newUser = {
      id: `user_${Date.now()}`,
      name,
      email,
      phone: phone || '',
      addresses: [],
    };

    const message = `Hi ${name}!\nWelcome to our team\nRegards\nTeam flipkart`;

    try {
      await sendEmail({
        to: email,
        subject: 'Signup in Flipkart App',
        text: message,
      });

      return NextResponse.json({
        success: true,
        data: newUser,
        message: 'Account created successfully',
      });
    } catch {
      return NextResponse.json({
        success: false,
        data: newUser,
        message: 'Account created but welcome email could not be sent',
      });
    }
  } catch (error) {
    console.error('Signup error:', error);
    return NextResponse.json({ success: false, error: 'Signup failed' }, { status: 500 });
  }
}
