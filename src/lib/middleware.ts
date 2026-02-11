import { NextRequest } from 'next/server';
import { verifyToken, AdminPayload } from './auth';

export function getTokenFromRequest(request: NextRequest): string | null {
  // Try to get token from cookie first (more secure)
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

  // Verify token validity and expiration
  return verifyToken(token);
}

// Input validation utilities
export function validateEmail(email: string): boolean {
  // More robust email validation
  const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
  return emailRegex.test(email) && email.length <= 254;
}

export function validateGithubUsername(username: string): boolean {
  // GitHub username validation: alphanumeric, hyphens, max 39 chars
  const githubRegex = /^[a-zA-Z0-9]([a-zA-Z0-9-]){0,38}$/;
  return githubRegex.test(username);
}

export function sanitizeInput(input: string, maxLength: number = 255): string {
  if (!input) return '';
  return input.trim().substring(0, maxLength);
}

export function validateStudentId(studentId: string): boolean {
  // Student ID should be alphanumeric with possible hyphens/underscores
  const studentIdRegex = /^[a-zA-Z0-9_-]{1,20}$/;
  return studentIdRegex.test(studentId);
}