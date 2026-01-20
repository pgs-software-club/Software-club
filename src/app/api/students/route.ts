import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Student from '@/models/Student';
import { verifyAdminToken } from '@/lib/middleware';

export async function GET(request: NextRequest) {
  try {
    const admin = verifyAdminToken(request);
    if (!admin) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    await connectDB();
    const students = await Student.find({ isActive: true }).sort({ createdAt: -1 });
    
    return NextResponse.json({ students }, { status: 200 });
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

    const { name, email, studentId, phone, course, year } = await request.json();

    if (!name) {
      return NextResponse.json({ error: 'Name is required' }, { status: 400 });
    }

    await connectDB();
    
    // Check if studentId already exists (only if provided)
    if (studentId && studentId.trim()) {
      const existingStudent = await Student.findOne({ 
        studentId: studentId.trim(), 
        isActive: true 
      });
      if (existingStudent) {
        return NextResponse.json({ error: 'Student ID already exists' }, { status: 400 });
      }
    }
    
    const student = new Student({
      name: name.trim(),
      email: email ? email.trim() : undefined,
      studentId: studentId && studentId.trim() ? studentId.trim() : undefined,
      phone: phone ? phone.trim() : undefined,
      course: course ? course.trim() : undefined,
      year: year ? year.trim() : undefined,
    });

    await student.save();
    
    return NextResponse.json({ student, message: 'Student created successfully' }, { status: 201 });
  } catch (error: any) {
    console.error('Create student error:', error);
    
    if (error.code === 11000) {
      // Handle duplicate key error
      const field = Object.keys(error.keyPattern)[0];
      return NextResponse.json({ 
        error: `${field === 'studentId' ? 'Student ID' : field} already exists` 
      }, { status: 400 });
    }
    
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}