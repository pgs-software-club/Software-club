import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import crypto from 'crypto';
import Admin from '@/models/Admin';
import connectDB from './mongodb';

const JWT_SECRET = process.env.JWT_SECRET || '';
const ADMIN_EMAIL = process.env.ADMIN_EMAIL || '';

function checkEnvVars() {
  if (!JWT_SECRET || !ADMIN_EMAIL) {
    throw new Error('Missing required environment variables for authentication');
  }
}

export interface AdminPayload {
  email: string;
  role: 'admin';
  iat?: number;
  exp?: number;
}

// Rate limiting store (in production, use Redis)
const loginAttempts = new Map<string, { count: number; lastAttempt: number }>();
const MAX_LOGIN_ATTEMPTS = 5;
const LOCKOUT_DURATION = 15 * 60 * 1000; // 15 minutes

export function generateToken(payload: Omit<AdminPayload, 'iat' | 'exp'>): string {
  checkEnvVars();
  return jwt.sign(payload, JWT_SECRET, { expiresIn: '2h' }); // Reduced from 24h
}

export function verifyToken(token: string): AdminPayload | null {
  checkEnvVars();
  try {
    return jwt.verify(token, JWT_SECRET) as AdminPayload;
  } catch (error) {
    return null;
  }
}

export function isRateLimited(email: string): boolean {
  const attempts = loginAttempts.get(email);
  if (!attempts) return false;

  const now = Date.now();
  if (now - attempts.lastAttempt > LOCKOUT_DURATION) {
    loginAttempts.delete(email);
    return false;
  }

  return attempts.count >= MAX_LOGIN_ATTEMPTS;
}

export function recordLoginAttempt(email: string, success: boolean): void {
  const now = Date.now();
  const attempts = loginAttempts.get(email) || { count: 0, lastAttempt: now };

  if (success) {
    loginAttempts.delete(email);
  } else {
    attempts.count += 1;
    attempts.lastAttempt = now;
    loginAttempts.set(email, attempts);
  }
}

export async function validateAdmin(email: string, password: string): Promise<boolean> {
  checkEnvVars();
  await connectDB();

  const normalizedEmail = email.toLowerCase().trim();

  try {
    const admin = await Admin.findOne({ email: normalizedEmail });
    if (!admin) return false;

    if (isRateLimited(normalizedEmail)) return false;

    const isValid = await bcrypt.compare(password, admin.password);

    if (isValid) {
      admin.lastLogin = new Date();
      await admin.save();
    }

    recordLoginAttempt(normalizedEmail, isValid);
    return isValid;
  } catch (error) {
    recordLoginAttempt(normalizedEmail, false);
    return false;
  }
}

// CSRF token generation and validation using HMAC (stateless)
const CSRF_SECRET = process.env.CSRF_SECRET || process.env.JWT_SECRET || '';

export function generateCSRFToken(): string {
  const timestamp = Date.now().toString();
  const randomBytes = crypto.randomBytes(16).toString('hex');
  const payload = `${timestamp}:${randomBytes}`;

  const hmac = crypto.createHmac('sha256', CSRF_SECRET);
  hmac.update(payload);
  const signature = hmac.digest('hex');

  const token = Buffer.from(`${payload}:${signature}`).toString('base64');
  console.log(`Generated CSRF token (timestamp: ${new Date(parseInt(timestamp)).toISOString()})`);
  return token;
}

export function validateCSRFToken(token: string): boolean {
  try {
    console.log(`Validating CSRF token...`);

    const decoded = Buffer.from(token, 'base64').toString('utf-8');
    const parts = decoded.split(':');

    if (parts.length !== 3) {
      console.log('CSRF token has invalid format');
      return false;
    }

    const [timestamp, randomBytes, signature] = parts;
    const payload = `${timestamp}:${randomBytes}`;

    // Verify signature
    const hmac = crypto.createHmac('sha256', CSRF_SECRET);
    hmac.update(payload);
    const expectedSignature = hmac.digest('hex');

    if (signature !== expectedSignature) {
      console.log('CSRF token signature mismatch');
      return false;
    }

    // Check expiry (1 hour)
    const tokenTime = parseInt(timestamp);
    const now = Date.now();
    const maxAge = 60 * 60 * 1000; // 1 hour

    if (now - tokenTime > maxAge) {
      console.log(`CSRF token expired (age: ${Math.round((now - tokenTime) / 1000 / 60)} minutes)`);
      return false;
    }

    console.log('CSRF token is valid');
    return true;
  } catch (error) {
    console.log('CSRF token validation error:', error);
    return false;
  }
}

// Utility functions for password hashing
export function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, 12);
}

export function comparePassword(password: string, hashedPassword: string): Promise<boolean> {
  return bcrypt.compare(password, hashedPassword);
}