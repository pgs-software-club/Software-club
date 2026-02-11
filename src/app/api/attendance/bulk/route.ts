import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Attendance from '@/models/Attendance';
import Student from '@/models/Student';
import { verifyAdminToken, sanitizeInput } from '@/lib/middleware';
import { validateCSRFToken } from '@/lib/auth';

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

    const { date, attendanceRecords } = await request.json();

    // Input validation
    if (!date || !attendanceRecords || !Array.isArray(attendanceRecords)) {
      return NextResponse.json(
        { error: 'Date and attendance records array are required' },
        { status: 400 }
      );
    }

    // Validate date
    const dateObj = new Date(date);
    if (isNaN(dateObj.getTime())) {
      return NextResponse.json({ error: 'Invalid date format' }, { status: 400 });
    }

    // Limit bulk operation size
    if (attendanceRecords.length > 100) {
      return NextResponse.json(
        { error: 'Bulk operation limited to 100 records at a time' },
        { status: 400 }
      );
    }

    await connectDB();

    const results = [];
    const errors = [];
    const processedStudentIds = new Set();

    // Pre-validate all student IDs to avoid partial failures
    const studentIds = attendanceRecords.map(record => record.studentId).filter(Boolean);
    const validStudents = await Student.find({ 
      _id: { $in: studentIds }, 
      isActive: true 
    }).select('_id');
    const validStudentIds = new Set(validStudents.map(s => s._id.toString()));

    for (const record of attendanceRecords) {
      try {
        const { studentId, status, notes } = record;

        // Input validation
        if (!studentId || !status) {
          errors.push({ studentId, error: 'Student ID and status are required' });
          continue;
        }

        // Validate MongoDB ObjectId format
        if (!studentId.match(/^[0-9a-fA-F]{24}$/)) {
          errors.push({ studentId, error: 'Invalid student ID format' });
          continue;
        }

        if (!['present', 'absent', 'late'].includes(status)) {
          errors.push({ studentId, error: 'Invalid status' });
          continue;
        }

        // Check for duplicate student IDs in the same batch
        if (processedStudentIds.has(studentId)) {
          errors.push({ studentId, error: 'Duplicate student ID in batch' });
          continue;
        }
        processedStudentIds.add(studentId);

        // Check if student exists and is active
        if (!validStudentIds.has(studentId)) {
          errors.push({ studentId, error: 'Student not found or inactive' });
          continue;
        }

        // Sanitize notes
        const sanitizedNotes = notes ? sanitizeInput(notes, 500) : '';

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

        results.push(attendance);
      } catch (error) {
        console.error('Bulk attendance record error:', error);
        errors.push({ studentId: record.studentId, error: 'Failed to record attendance' });
      }
    }
    
    return NextResponse.json(
      { 
        message: 'Bulk attendance processing completed',
        successful: results.length,
        failed: errors.length,
        results,
        errors: errors.slice(0, 10) // Limit error details to prevent large responses
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Bulk attendance error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}