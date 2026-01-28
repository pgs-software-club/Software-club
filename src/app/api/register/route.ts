import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Student from '@/models/Student';

export async function POST(request: NextRequest) {
  try {
    const { name, email, githubUsername, year, areaOfStudy } = await request.json();

    // Validation
    if (!name || !email || !githubUsername || !year || !areaOfStudy) {
      return NextResponse.json({ error: 'All fields are required' }, { status: 400 });
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json({ error: 'Invalid email format' }, { status: 400 });
    }

    // GitHub username validation
    if (githubUsername.includes(' ') || githubUsername.includes('@')) {
      return NextResponse.json({ error: 'Invalid GitHub username format' }, { status: 400 });
    }

    await connectDB();
    
    // Check if email already exists
    const existingEmailStudent = await Student.findOne({ 
      email: email.toLowerCase().trim(),
      isActive: true 
    });
    if (existingEmailStudent) {
      return NextResponse.json({ error: 'A student with this email already exists' }, { status: 400 });
    }

    // Check if GitHub username already exists
    const existingGithubStudent = await Student.findOne({ 
      githubUsername: githubUsername.trim(),
      isActive: true 
    });
    if (existingGithubStudent) {
      return NextResponse.json({ error: 'A student with this GitHub username already exists' }, { status: 400 });
    }
    
    const student = new Student({
      name: name.trim(),
      email: email.toLowerCase().trim(),
      githubUsername: githubUsername.trim(),
      year: year.trim(),
      areaOfStudy: areaOfStudy.trim(),
      isVerified: false,
      registrationType: 'self',
    });

    await student.save();
    
    return NextResponse.json({ 
      message: 'Registration submitted successfully. Pending admin verification.',
      student: {
        name: student.name,
        email: student.email,
        githubUsername: student.githubUsername,
        year: student.year,
        areaOfStudy: student.areaOfStudy,
      }
    }, { status: 201 });
  } catch (error: any) {
    console.error('Registration error:', error);
    
    if (error.code === 11000) {
      // Handle duplicate key error
      const field = Object.keys(error.keyPattern)[0];
      return NextResponse.json({ 
        error: `A student with this ${field === 'email' ? 'email' : field} already exists` 
      }, { status: 400 });
    }
    
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}