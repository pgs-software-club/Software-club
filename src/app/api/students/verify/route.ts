import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Student from '@/models/Student';
import { verifyAdminToken } from '@/lib/middleware';

export async function POST(request: NextRequest) {
  try {
    const admin = verifyAdminToken(request);
    if (!admin) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { studentId, action, studentIdToAssign } = await request.json();

    if (!studentId || !action) {
      return NextResponse.json({ error: 'Student ID and action are required' }, { status: 400 });
    }

    if (!['approve', 'reject'].includes(action)) {
      return NextResponse.json({ error: 'Invalid action. Must be approve or reject' }, { status: 400 });
    }

    await connectDB();
    
    const student = await Student.findById(studentId);
    if (!student) {
      return NextResponse.json({ error: 'Student not found' }, { status: 404 });
    }

    if (action === 'approve') {
      // Check if studentIdToAssign is provided and unique
      if (studentIdToAssign && studentIdToAssign.trim()) {
        const existingStudent = await Student.findOne({ 
          studentId: studentIdToAssign.trim(), 
          isActive: true,
          _id: { $ne: studentId }
        });
        if (existingStudent) {
          return NextResponse.json({ error: 'Student ID already exists' }, { status: 400 });
        }
        student.studentId = studentIdToAssign.trim();
      }

      student.isVerified = true;
      await student.save();
      
      return NextResponse.json({ 
        message: 'Student approved successfully',
        student 
      }, { status: 200 });
    } else {
      // Reject - soft delete by setting isActive to false
      student.isActive = false;
      await student.save();
      
      return NextResponse.json({ 
        message: 'Student registration rejected',
      }, { status: 200 });
    }
  } catch (error: any) {
    console.error('Verify student error:', error);
    
    if (error.code === 11000) {
      return NextResponse.json({ 
        error: 'Student ID already exists' 
      }, { status: 400 });
    }
    
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}