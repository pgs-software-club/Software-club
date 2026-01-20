import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Attendance from '@/models/Attendance';
import Student from '@/models/Student';
import { verifyAdminToken } from '@/lib/middleware';

export async function GET(request: NextRequest) {
  try {
    const admin = verifyAdminToken(request);
    if (!admin) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const date = searchParams.get('date');
    const studentId = searchParams.get('studentId');

    await connectDB();

    let query: any = {};
    
    if (date) {
      const startDate = new Date(date);
      const endDate = new Date(date);
      endDate.setDate(endDate.getDate() + 1);
      query.date = { $gte: startDate, $lt: endDate };
    }
    
    if (studentId) {
      query.studentId = studentId;
    }

    const attendance = await Attendance.find(query)
      .populate('studentId', 'name email studentId')
      .sort({ date: -1, createdAt: -1 });
    
    return NextResponse.json({ attendance }, { status: 200 });
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

    const { studentId, date, status, notes } = await request.json();

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

    await connectDB();

    // Check if student exists
    const student = await Student.findById(studentId);
    if (!student) {
      return NextResponse.json({ error: 'Student not found' }, { status: 404 });
    }

    // Create or update attendance record
    const attendance = await Attendance.findOneAndUpdate(
      { studentId, date: new Date(date) },
      { status, notes, markedBy: admin.email },
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