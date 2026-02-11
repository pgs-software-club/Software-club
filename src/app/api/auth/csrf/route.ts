import { NextRequest, NextResponse } from 'next/server';
import { generateCSRFToken } from '@/lib/auth';
import { verifyAdminToken } from '@/lib/middleware';

export async function GET(request: NextRequest) {
  try {
    // Verify admin is authenticated
    const admin = verifyAdminToken(request);
    if (!admin) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Generate and return CSRF token
    const csrfToken = generateCSRFToken();
    
    return NextResponse.json({ csrfToken }, { status: 200 });
  } catch (error) {
    console.error('CSRF token generation error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
