import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Student from '@/models/Student';
import { verifyAdminToken } from '@/lib/middleware';

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const admin = verifyAdminToken(request);
    if (!admin) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { name, email, studentId, phone, course, year } = await request.json();
    const { id } = await params;

    if (!name) {
      return NextResponse.json({ error: 'Name is required' }, { status: 400 });
    }

    await connectDB();
    
    // Check if studentId already exists (only if provided and different from current)
    if (studentId && studentId.trim()) {
      const existingStudent = await Student.findOne({ 
        studentId: studentId.trim(), 
        isActive: true,
        _id: { $ne: id } // Exclude current student from check
      });
      if (existingStudent) {
        return NextResponse.json({ error: 'Student ID already exists' }, { status: 400 });
      }
    }
    
    const student = await Student.findByIdAndUpdate(
      id,
      { 
        name: name.trim(),
        email: email ? email.trim() : undefined,
        studentId: studentId && studentId.trim() ? studentId.trim() : undefined,
        phone: phone ? phone.trim() : undefined,
        course: course ? course.trim() : undefined,
        year: year ? year.trim() : undefined,
      },
      { new: true, runValidators: true }
    );

    if (!student) {
      return NextResponse.json({ error: 'Student not found' }, { status: 404 });
    }
    
    return NextResponse.json({ student, message: 'Student updated successfully' }, { status: 200 });
  } catch (error: any) {
    console.error('Update student error:', error);
    
    if (error.code === 11000) {
      const field = Object.keys(error.keyPattern)[0];
      return NextResponse.json({ 
        error: `${field === 'studentId' ? 'Student ID' : field} already exists` 
      }, { status: 400 });
    }
    
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const admin = verifyAdminToken(request);
    if (!admin) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { id } = await params;

    await connectDB();
    
    // Soft delete - mark as inactive instead of removing
    const student = await Student.findByIdAndUpdate(
      id,
      { isActive: false },
      { new: true }
    );

    if (!student) {
      return NextResponse.json({ error: 'Student not found' }, { status: 404 });
    }
    
    return NextResponse.json({ message: 'Student deleted successfully' }, { status: 200 });
  } catch (error) {
    console.error('Delete student error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}