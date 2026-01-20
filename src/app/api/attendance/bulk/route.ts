import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Attendance from '@/models/Attendance';
import Student from '@/models/Student';
import { verifyAdminToken } from '@/lib/middleware';

export async function POST(request: NextRequest) {
  try {
    const admin = verifyAdminToken(request);
    if (!admin) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { date, attendanceRecords } = await request.json();

    if (!date || !attendanceRecords || !Array.isArray(attendanceRecords)) {
      return NextResponse.json(
        { error: 'Date and attendance records array are required' },
        { status: 400 }
      );
    }

    await connectDB();

    const results = [];
    const errors = [];

    for (const record of attendanceRecords) {
      try {
        const { studentId, status, notes } = record;

        if (!studentId || !status) {
          errors.push({ studentId, error: 'Student ID and status are required' });
          continue;
        }

        if (!['present', 'absent', 'late'].includes(status)) {
          errors.push({ studentId, error: 'Invalid status' });
          continue;
        }

        // Check if student exists
        const student = await Student.findById(studentId);
        if (!student) {
          errors.push({ studentId, error: 'Student not found' });
          continue;
        }

        // Create or update attendance record
        const attendance = await Attendance.findOneAndUpdate(
          { studentId, date: new Date(date) },
          { status, notes, markedBy: admin.email },
          { upsert: true, new: true, runValidators: true }
        ).populate('studentId', 'name email studentId');

        results.push(attendance);
      } catch (error) {
        errors.push({ studentId: record.studentId, error: 'Failed to record attendance' });
      }
    }
    
    return NextResponse.json(
      { 
        message: 'Bulk attendance processing completed',
        successful: results.length,
        failed: errors.length,
        results,
        errors
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Bulk attendance error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}