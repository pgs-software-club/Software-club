import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Student from '@/models/Student';
import { verifyAdminToken, validateEmail, validateGithubUsername, validateStudentId, sanitizeInput } from '@/lib/middleware';
import { validateCSRFToken } from '@/lib/auth';

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
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

    const { name, email, githubUsername, studentId, phone, course, year, areaOfStudy } = await request.json();
    const { id } = await params;

    // Validate MongoDB ObjectId format
    if (!id.match(/^[0-9a-fA-F]{24}$/)) {
      return NextResponse.json({ error: 'Invalid student ID format' }, { status: 400 });
    }

    // Input validation
    if (!name || name.trim().length < 2) {
      return NextResponse.json({ error: 'Name is required and must be at least 2 characters' }, { status: 400 });
    }

    // Sanitize inputs
    const sanitizedData: any = {
      name: sanitizeInput(name, 100),
      modifiedBy: admin.email
    };

    if (email) {
      const sanitizedEmail = sanitizeInput(email.toLowerCase(), 254);
      if (!validateEmail(sanitizedEmail)) {
        return NextResponse.json({ error: 'Invalid email format' }, { status: 400 });
      }
      sanitizedData.email = sanitizedEmail;
    }

    if (githubUsername) {
      const sanitizedGithub = sanitizeInput(githubUsername, 39);
      if (!validateGithubUsername(sanitizedGithub)) {
        return NextResponse.json({ error: 'Invalid GitHub username format' }, { status: 400 });
      }
      sanitizedData.githubUsername = sanitizedGithub;
    }

    if (studentId) {
      const sanitizedStudentId = sanitizeInput(studentId, 20);
      if (!validateStudentId(sanitizedStudentId)) {
        return NextResponse.json({ error: 'Invalid student ID format' }, { status: 400 });
      }
      sanitizedData.studentId = sanitizedStudentId;
    }

    if (phone) {
      sanitizedData.phone = sanitizeInput(phone, 20);
    }

    if (course) {
      sanitizedData.course = sanitizeInput(course, 100);
    }

    if (year) {
      sanitizedData.year = sanitizeInput(year, 20);
    }

    if (areaOfStudy) {
      sanitizedData.areaOfStudy = sanitizeInput(areaOfStudy, 100);
    }

    await connectDB();
    
    // Check for duplicate email (if provided)
    if (sanitizedData.email) {
      const existingEmailStudent = await Student.findOne({ 
        email: sanitizedData.email,
        isActive: true,
        _id: { $ne: id }
      });
      if (existingEmailStudent) {
        return NextResponse.json({ error: 'Email already exists' }, { status: 400 });
      }
    }

    // Check for duplicate GitHub username (if provided)
    if (sanitizedData.githubUsername) {
      const existingGithubStudent = await Student.findOne({ 
        githubUsername: { $regex: new RegExp(`^${sanitizedData.githubUsername}$`, 'i') },
        isActive: true,
        _id: { $ne: id }
      });
      if (existingGithubStudent) {
        return NextResponse.json({ error: 'GitHub username already exists' }, { status: 400 });
      }
    }
    
    // Check for duplicate student ID (if provided)
    if (sanitizedData.studentId) {
      const existingStudent = await Student.findOne({ 
        studentId: sanitizedData.studentId, 
        isActive: true,
        _id: { $ne: id }
      });
      if (existingStudent) {
        return NextResponse.json({ error: 'Student ID already exists' }, { status: 400 });
      }
    }
    
    const student = await Student.findByIdAndUpdate(
      id,
      sanitizedData,
      { new: true, runValidators: true }
    ).select('-registrationIP -__v');

    if (!student) {
      return NextResponse.json({ error: 'Student not found' }, { status: 404 });
    }
    
    return NextResponse.json({ student, message: 'Student updated successfully' }, { status: 200 });
  } catch (error: any) {
    console.error('Update student error:', error);
    
    if (error.code === 11000) {
      const field = Object.keys(error.keyPattern || {})[0];
      return NextResponse.json({ 
        error: `${field === 'studentId' ? 'Student ID' : field === 'githubUsername' ? 'GitHub username' : field} already exists` 
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

    // CSRF protection
    const csrfToken = request.headers.get('x-csrf-token');
    if (!csrfToken || !validateCSRFToken(csrfToken)) {
      return NextResponse.json({ error: 'Invalid CSRF token' }, { status: 403 });
    }

    const { id } = await params;

    // Validate MongoDB ObjectId format
    if (!id.match(/^[0-9a-fA-F]{24}$/)) {
      return NextResponse.json({ error: 'Invalid student ID format' }, { status: 400 });
    }

    await connectDB();
    
    // Soft delete - mark as inactive instead of removing
    const student = await Student.findByIdAndUpdate(
      id,
      { 
        isActive: false,
        modifiedBy: admin.email
      },
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