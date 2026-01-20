import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import { verifyAdminToken } from '@/lib/middleware';
import { generateNextStudentId } from '@/lib/studentUtils';

export async function GET(request: NextRequest) {
  try {
    const admin = verifyAdminToken(request);
    if (!admin) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    await connectDB();
    const nextId = await generateNextStudentId();
    
    return NextResponse.json({ nextId }, { status: 200 });
  } catch (error) {
    console.error('Get next student ID error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}