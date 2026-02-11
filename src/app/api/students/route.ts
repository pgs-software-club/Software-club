import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Student from '@/models/Student';
import { verifyAdminToken } from '@/lib/middleware';
import { validateCSRFToken } from '@/lib/auth';

export async function GET(request: NextRequest) {
  try {
    const admin = verifyAdminToken(request);
    if (!admin) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    await connectDB();
    
    // Get query parameters with validation
    const { searchParams } = new URL(request.url);
    const includeUnverified = searchParams.get('includeUnverified') === 'true';
    const page = Math.max(1, parseInt(searchParams.get('page') || '1'));
    const limit = Math.min(100, Math.max(1, parseInt(searchParams.get('limit') || '50')));
    const search = searchParams.get('search')?.trim();
    
    // Build query
    const query: any = { isActive: true };
    if (!includeUnverified) {
      query.isVerified = true;
    }
    
    // Add search functionality
    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } },
        { githubUsername: { $regex: search, $options: 'i' } },
        { studentId: { $regex: search, $options: 'i' } }
      ];
    }
    
    // Execute query with pagination
    const skip = (page - 1) * limit;
    const [students, total] = await Promise.all([
      Student.find(query)
        .select('-registrationIP -__v') // Exclude sensitive fields
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit),
      Student.countDocuments(query)
    ]);
    
    return NextResponse.json({ 
      students,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit)
      }
    }, { status: 200 });
  } catch (error) {
    console.error('Get students error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const admin = verifyAdminToken(request);
    if (!admin) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // CSRF protection for state-changing operations
    const csrfToken = request.headers.get('x-csrf-token');
    if (!csrfToken || !validateCSRFToken(csrfToken)) {
      return NextResponse.json({ error: 'Invalid CSRF token' }, { status: 403 });
    }

    // This endpoint is typically not needed as students register themselves
    // But keeping it for admin-created students
    return NextResponse.json({ error: 'Use registration endpoint for new students' }, { status: 400 });
  } catch (error) {
    console.error('Create student error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}