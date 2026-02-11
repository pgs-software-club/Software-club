import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  // Only apply middleware to admin routes (except login)
  if (request.nextUrl.pathname.startsWith('/admin') && 
      !request.nextUrl.pathname.startsWith('/admin/login')) {
    
    // Check for admin token in cookies
    const token = request.cookies.get('admin-token')?.value;
    
    if (!token) {
      // Redirect to login if no token
      return NextResponse.redirect(new URL('/admin/login', request.url));
    }

    // Token verification will be done in API routes (Node.js runtime)
    // Middleware just checks for token presence
  }

  // Add security headers
  const response = NextResponse.next();
  
  // Security headers
  response.headers.set('X-Frame-Options', 'DENY');
  response.headers.set('X-Content-Type-Options', 'nosniff');
  response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');
  response.headers.set('X-XSS-Protection', '1; mode=block');
  
  // CSP header
  response.headers.set(
    'Content-Security-Policy',
    "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval'; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:; font-src 'self' data:; connect-src 'self' https://api.github.com;"
  );

  return response;
}

export const config = {
  matcher: '/admin/:path*',
};