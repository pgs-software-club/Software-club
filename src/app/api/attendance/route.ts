import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Attendance from '@/models/Attendance';
import Student from '@/models/Student';
import { verifyAdminToken, sanitizeInput } from '@/lib/middleware';
import { validateCSRFToken } from '@/lib/auth';

export async function GET(request: NextRequest) {
  try {
    const admin = verifyAdminToken(request);
    if (!admin) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const date = searchParams.get('date');
    const studentId = searchParams.get('studentId');
    const page = Math.max(1, parseInt(searchParams.get('page') || '1'));
    const limit = Math.min(100, Math.max(1, parseInt(searchParams.get('limit') || '50')));

    await connectDB();

    let query: any = {};
    
    // Validate and sanitize date parameter
    if (date) {
      const dateObj = new Date(date);
      if (isNaN(dateObj.getTime())) {
        return NextResponse.json({ error: 'Invalid date format' }, { status: 400 });
      }
      
      const startDate = new Date(date);
      startDate.setHours(0, 0, 0, 0);
      const endDate = new Date(date);
      endDate.setHours(23, 59, 59, 999);
      
      query.date = { $gte: startDate, $lte: endDate };
    }
    
    // Validate student ID parameter
    if (studentId) {
      if (!studentId.match(/^[0-9a-fA-F]{24}$/)) {
        return NextResponse.json({ error: 'Invalid student ID format' }, { status: 400 });
      }
      query.studentId = studentId;
    }

    const skip = (page - 1) * limit;
    const [attendance, total] = await Promise.all([
      Attendance.find(query)
        .populate('studentId', 'name email studentId')
        .sort({ date: -1, createdAt: -1 })
        .skip(skip)
        .limit(limit),
      Attendance.countDocuments(query)
    ]);
    
    return NextResponse.json({ 
      attendance,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit)
      }
    }, { status: 200 });
  } catch (error) {
    console.error('Get attendance error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const admin = verifyAdminToken(request);
    if (!admin) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // CSRF protection
    const csrfToken = request.headers.get('x-csrf-token');
    if (!csrfToken || !validateCSRFToken(csrfToken)) {
      return NextResponse.json({ error: 'Invalid CSRF token' }, { status: 403 });
    }

    const { studentId, date, status, notes } = await request.json();

    // Input validation
    if (!studentId || !date || !status) {
      return NextResponse.json(
        { error: 'Student ID, date, and status are required' },
        { status: 400 }
      );
    }

    if (!['present', 'absent', 'late'].includes(status)) {
      return NextResponse.json(
        { error: 'Status must be present, absent, or late' },
        { status: 400 }
      );
    }

    // Validate MongoDB ObjectId format
    if (!studentId.match(/^[0-9a-fA-F]{24}$/)) {
      return NextResponse.json({ error: 'Invalid student ID format' }, { status: 400 });
    }

    // Validate date
    const dateObj = new Date(date);
    if (isNaN(dateObj.getTime())) {
      return NextResponse.json({ error: 'Invalid date format' }, { status: 400 });
    }

    // Sanitize notes
    const sanitizedNotes = notes ? sanitizeInput(notes, 500) : '';

    await connectDB();

    // Check if student exists and is active
    const student = await Student.findOne({ _id: studentId, isActive: true });
    if (!student) {
      return NextResponse.json({ error: 'Student not found' }, { status: 404 });
    }

    // Create or update attendance record
    const attendance = await Attendance.findOneAndUpdate(
      { studentId, date: dateObj },
      { 
        status, 
        notes: sanitizedNotes, 
        markedBy: admin.email,
        lastModified: new Date()
      },
      { upsert: true, new: true, runValidators: true }
    ).populate('studentId', 'name email studentId');
    
    return NextResponse.json(
      { attendance, message: 'Attendance recorded successfully' },
      { status: 201 }
    );
  } catch (error: any) {
    console.error('Record attendance error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}