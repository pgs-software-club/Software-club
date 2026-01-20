import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

const JWT_SECRET = process.env.JWT_SECRET!;
const ADMIN_EMAIL = process.env.ADMIN_EMAIL!;
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD!;

if (!JWT_SECRET || !ADMIN_EMAIL || !ADMIN_PASSWORD) {
  throw new Error('Missing required environment variables for authentication');
}

export interface AdminPayload {
  email: string;
  role: 'admin';
  iat?: number;
  exp?: number;
}

export function generateToken(payload: Omit<AdminPayload, 'iat' | 'exp'>): string {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: '24h' });
}

export function verifyToken(token: string): AdminPayload | null {
  try {
    return jwt.verify(token, JWT_SECRET) as AdminPayload;
  } catch (error) {
    return null;
  }
}

export async function validateAdmin(email: string, password: string): Promise<boolean> {
  if (email !== ADMIN_EMAIL) {
    return false;
  }
  
  // For simplicity, we're doing plain text comparison
  // In production, you should hash the admin password
  return password === ADMIN_PASSWORD;
}

export function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, 12);
}

export function comparePassword(password: string, hashedPassword: string): Promise<boolean> {
  return bcrypt.compare(password, hashedPassword);
}