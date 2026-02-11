import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Student from '@/models/Student';
import { verifyAdminToken, validateStudentId, sanitizeInput } from '@/lib/middleware';
import { validateCSRFToken } from '@/lib/auth';

export async function POST(request: NextRequest) {
  try {
    const admin = verifyAdminToken(request);
    if (!admin) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // CSRF protection
    const csrfToken = request.headers.get('x-csrf-token');
    console.log('Received CSRF token:', csrfToken ? 'present' : 'missing');
    
    if (!csrfToken) {
      console.log('CSRF token missing from request headers');
      return NextResponse.json({ error: 'CSRF token is required' }, { status: 403 });
    }
    
    const isValid = validateCSRFToken(csrfToken);
    console.log('CSRF token validation result:', isValid);
    
    if (!isValid) {
      console.log('CSRF token validation failed');
      return NextResponse.json({ error: 'Invalid or expired CSRF token' }, { status: 403 });
    }

    const { studentId, action, studentIdToAssign } = await request.json();

    // Input validation
    if (!studentId || !action) {
      return NextResponse.json({ error: 'Student ID and action are required' }, { status: 400 });
    }

    if (!['approve', 'reject'].includes(action)) {
      return NextResponse.json({ error: 'Invalid action. Must be approve or reject' }, { status: 400 });
    }

    // Validate MongoDB ObjectId format
    if (!studentId.match(/^[0-9a-fA-F]{24}$/)) {
      return NextResponse.json({ error: 'Invalid student ID format' }, { status: 400 });
    }

    await connectDB();
    
    const student = await Student.findById(studentId);
    if (!student || !student.isActive) {
      return NextResponse.json({ error: 'Student not found' }, { status: 404 });
    }

    // Check if student is already verified
    if (student.isVerified && action === 'approve') {
      return NextResponse.json({ error: 'Student is already verified' }, { status: 400 });
    }

    if (action === 'approve') {
      // Validate and sanitize student ID to assign
      if (studentIdToAssign) {
        const sanitizedStudentId = sanitizeInput(studentIdToAssign, 20);
        
        if (!validateStudentId(sanitizedStudentId)) {
          return NextResponse.json({ error: 'Invalid student ID format' }, { status: 400 });
        }

        // Check if this student already has this exact studentId
        if (student.studentId === sanitizedStudentId) {
          console.log(`Student ${studentId} already has studentId ${sanitizedStudentId}, skipping assignment`);
        } else {
          // Check if studentIdToAssign is unique (used by another student)
          const existingStudent = await Student.findOne({ 
            studentId: sanitizedStudentId, 
            isActive: true,
            _id: { $ne: studentId }
          });
          
          if (existingStudent) {
            console.log(`Student ID ${sanitizedStudentId} already exists for student ${existingStudent._id}`);
            return NextResponse.json({ 
              error: `Student ID ${sanitizedStudentId} is already assigned to another student` 
            }, { status: 400 });
          }
          
          student.studentId = sanitizedStudentId;
        }
      } else if (!student.studentId) {
        // If no studentId provided and student doesn't have one, require it
        return NextResponse.json({ 
          error: 'Student ID is required for verification' 
        }, { status: 400 });
      }

      student.isVerified = true;
      student.modifiedBy = admin.email;
      
      console.log(`Verifying student ${studentId} with studentId: ${student.studentId}`);
      await student.save();
      
      return NextResponse.json({ 
        message: 'Student approved successfully',
        student: {
          _id: student._id,
          name: student.name,
          email: student.email,
          githubUsername: student.githubUsername,
          studentId: student.studentId,
          isVerified: student.isVerified
        }
      }, { status: 200 });
    } else {
      // Reject - soft delete by setting isActive to false
      student.isActive = false;
      student.modifiedBy = admin.email;
      await student.save();
      
      return NextResponse.json({ 
        message: 'Student registration rejected',
      }, { status: 200 });
    }
  } catch (error: any) {
    console.error('Verify student error:', error);
    
    if (error.code === 11000) {
      const duplicateKey = error.keyValue?.studentId || 'unknown';
      console.error(`Duplicate key error: studentId ${duplicateKey} already exists`);
      return NextResponse.json({ 
        error: `Student ID ${duplicateKey} is already assigned to another student. Please use a different ID.` 
      }, { status: 400 });
    }
    
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}