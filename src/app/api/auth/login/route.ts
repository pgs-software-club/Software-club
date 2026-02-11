import { NextRequest, NextResponse } from 'next/server';
import { validateAdmin, generateToken, generateCSRFToken, isRateLimited } from '@/lib/auth';
import { sanitizeInput } from '@/lib/middleware';

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json();

    // Input validation
    if (!email || !password) {
      return NextResponse.json(
        { error: 'Email and password are required' },
        { status: 400 }
      );
    }

    // Sanitize inputs
    const sanitizedEmail = sanitizeInput(email, 254);
    const sanitizedPassword = sanitizeInput(password, 128);

    // Check rate limiting
    if (isRateLimited(sanitizedEmail)) {
      return NextResponse.json(
        { error: 'Too many login attempts. Please try again later.' },
        { status: 429 }
      );
    }

    const isValid = await validateAdmin(sanitizedEmail, sanitizedPassword);

    if (!isValid) {
      return NextResponse.json(
        { error: 'Invalid credentials' },
        { status: 401 }
      );
    }

    const token = generateToken({ email: sanitizedEmail, role: 'admin' });
    const csrfToken = generateCSRFToken();

    const response = NextResponse.json(
      { 
        message: 'Login successful', 
        token,
        csrfToken 
      },
      { status: 200 }
    );

    // Set secure HTTP-only cookie
    response.cookies.set('admin-token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 2 * 60 * 60, // 2 hours (matching token expiry)
      path: '/',
    });

    // Set CSRF token cookie (readable by client)
    response.cookies.set('csrf-token', csrfToken, {
      httpOnly: false,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 60 * 60, // 1 hour
      path: '/',
    });

    return response;
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}