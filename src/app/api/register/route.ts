import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Student from '@/models/Student';
import { validateEmail, validateGithubUsername, sanitizeInput } from '@/lib/middleware';

// Rate limiting for registration (prevent spam)
const registrationAttempts = new Map<string, { count: number; lastAttempt: number }>();
const MAX_REGISTRATION_ATTEMPTS = 3;
const REGISTRATION_COOLDOWN = 60 * 60 * 1000; // 1 hour

function isRegistrationRateLimited(ip: string): boolean {
  const attempts = registrationAttempts.get(ip);
  if (!attempts) return false;
  
  const now = Date.now();
  if (now - attempts.lastAttempt > REGISTRATION_COOLDOWN) {
    registrationAttempts.delete(ip);
    return false;
  }
  
  return attempts.count >= MAX_REGISTRATION_ATTEMPTS;
}

function recordRegistrationAttempt(ip: string): void {
  const now = Date.now();
  const attempts = registrationAttempts.get(ip) || { count: 0, lastAttempt: now };
  attempts.count += 1;
  attempts.lastAttempt = now;
  registrationAttempts.set(ip, attempts);
}

export async function POST(request: NextRequest) {
  try {
    const clientIP = request.headers.get('x-forwarded-for') || 
                     request.headers.get('x-real-ip') || 
                     'unknown';
    
    // Check rate limiting
    if (isRegistrationRateLimited(clientIP)) {
      return NextResponse.json(
        { error: 'Too many registration attempts. Please try again later.' },
        { status: 429 }
      );
    }

    const body = await request.json();
    console.log('Registration request body:', JSON.stringify(body, null, 2));
    
    const { name, email, personalEmail, githubUsername, year, areaOfStudy, viberNumber, technicalInterests, otherInterest } = body;

    // Input validation
    if (!name || !email || !githubUsername || !year || !areaOfStudy || !technicalInterests || technicalInterests.length === 0) {
      recordRegistrationAttempt(clientIP);
      return NextResponse.json({ error: 'All required fields must be filled, including at least one technical interest' }, { status: 400 });
    }

    // Sanitize inputs
    const sanitizedName = sanitizeInput(name, 100);
    const sanitizedEmail = sanitizeInput(email.toLowerCase(), 254);
    const sanitizedGithubUsername = sanitizeInput(githubUsername, 39);
    const sanitizedYear = sanitizeInput(year, 20);
    const sanitizedAreaOfStudy = sanitizeInput(areaOfStudy, 100);
    const sanitizedPersonalEmail = personalEmail ? sanitizeInput(personalEmail.toLowerCase(), 254) : undefined;
    const sanitizedViberNumber = viberNumber ? sanitizeInput(viberNumber, 20) : undefined;
    const sanitizedTechnicalInterests = Array.isArray(technicalInterests) 
      ? technicalInterests.map(interest => sanitizeInput(interest, 50)).slice(0, 10)
      : [];
    const sanitizedOtherInterest = otherInterest ? sanitizeInput(otherInterest, 200) : undefined;

    // Validate inputs
    if (!validateEmail(sanitizedEmail)) {
      recordRegistrationAttempt(clientIP);
      return NextResponse.json({ error: 'Invalid email format' }, { status: 400 });
    }

    // Validate personal email if provided
    if (sanitizedPersonalEmail && !validateEmail(sanitizedPersonalEmail)) {
      recordRegistrationAttempt(clientIP);
      return NextResponse.json({ error: 'Invalid personal email format' }, { status: 400 });
    }

    if (!validateGithubUsername(sanitizedGithubUsername)) {
      recordRegistrationAttempt(clientIP);
      return NextResponse.json({ error: 'Invalid GitHub username format' }, { status: 400 });
    }

    // Additional validation
    if (sanitizedName.length < 2) {
      recordRegistrationAttempt(clientIP);
      return NextResponse.json({ error: 'Name must be at least 2 characters long' }, { status: 400 });
    }

    // Validate technical interests
    if (sanitizedTechnicalInterests.length === 0) {
      recordRegistrationAttempt(clientIP);
      return NextResponse.json({ error: 'At least one technical interest must be selected' }, { status: 400 });
    }

    await connectDB();
    
    // Check if email already exists
    const existingEmailStudent = await Student.findOne({ 
      email: sanitizedEmail,
      isActive: true
    });

    if (existingEmailStudent) {
      console.log(`Registration failed: Email ${sanitizedEmail} already exists (Student ID: ${existingEmailStudent._id})`);
      recordRegistrationAttempt(clientIP);
      return NextResponse.json({ 
        error: 'This email is already registered. If you need to update your information, please contact an administrator.' 
      }, { status: 400 });
    }

    // Check if GitHub username already exists (case-insensitive)
    const existingGithubStudent = await Student.findOne({ 
      githubUsername: { $regex: new RegExp(`^${sanitizedGithubUsername}$`, 'i') },
      isActive: true
    });

    if (existingGithubStudent) {
      console.log(`Registration failed: GitHub username ${sanitizedGithubUsername} already exists (Student ID: ${existingGithubStudent._id})`);
      recordRegistrationAttempt(clientIP);
      return NextResponse.json({ 
        error: 'This GitHub username is already registered. If you need to update your information, please contact an administrator.' 
      }, { status: 400 });
    }

    // Create new student
    const student = new Student({
      name: sanitizedName,
      email: sanitizedEmail,
      personalEmail: sanitizedPersonalEmail,
      githubUsername: sanitizedGithubUsername,
      year: sanitizedYear,
      areaOfStudy: sanitizedAreaOfStudy,
      viberNumber: sanitizedViberNumber,
      technicalInterests: sanitizedTechnicalInterests,
      otherInterest: sanitizedOtherInterest,
      isActive: true,
      isVerified: false,
      registrationIP: clientIP,
      registrationDate: new Date()
    });

    await student.save();
    
    return NextResponse.json(
      { 
        message: 'Registration successful! Your application is pending approval.',
        studentId: student._id
      },
      { status: 201 }
    );
  } catch (error: any) {
    // Handle duplicate key errors
    if (error.code === 11000) {
      const field = Object.keys(error.keyPattern || {})[0];
      const fieldName = field === 'githubUsername' ? 'GitHub username' : 
                       field === 'email' ? 'Email' : field;
      return NextResponse.json({ 
        error: `${fieldName} is already registered` 
      }, { status: 400 });
    }
    
    console.error('Registration error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
