import { NextRequest } from 'next/server';
import { verifyToken, AdminPayload } from './auth';

export function getTokenFromRequest(request: NextRequest): string | null {
  // Try to get token from cookie first
  const cookieToken = request.cookies.get('admin-token')?.value;
  if (cookieToken) {
    return cookieToken;
  }

  // Fallback to Authorization header
  const authHeader = request.headers.get('authorization');
  if (authHeader && authHeader.startsWith('Bearer ')) {
    return authHeader.substring(7);
  }

  return null;
}

export function verifyAdminToken(request: NextRequest): AdminPayload | null {
  const token = getTokenFromRequest(request);
  if (!token) {
    return null;
  }

  return verifyToken(token);
}