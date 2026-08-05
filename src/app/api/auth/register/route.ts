import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();

    if (!email || !password) {
      return NextResponse.json(
        { error: 'Email and password are required' },
        { status: 400 }
      );
    }

    // In a real application, you would:
    // 1. Check if user already exists in DB
    // 2. Hash the password
    // 3. Save to DB

    console.log('Mock user registered:', email);

    return NextResponse.json(
      { message: 'User registered successfully', user: { email } },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
