import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(request: NextRequest) {
  try {
    const { name, email, password, phone } = await request.json();

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));

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
    let transport = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.PASS
      }
    })
    const message = "Hi " + name + " ! \nWelcome to our team\n Regards \n Team flipkart"
    let option = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Signup in Flipkart App",
      text: message
    }
    transport.sendMail(option, function (err, info) {
      if (err) {
        return NextResponse.json({
          success: false,
          data: newUser,
          message: 'Account created was unsuccessfully',
        });
      }
      else {
        return NextResponse.json({
          success: true,
          data: newUser,
          message: 'Account created successfully',
        });
      }
    })
    // mail()
    return NextResponse.json({
      success: true,
      data: newUser,
      message: 'Account created successfully',
    });
  } catch (error) {
    console.error('Signup error:', error);
    return NextResponse.json(
      { success: false, error: 'Signup failed' },
      { status: 500 }
    );
  }
}
