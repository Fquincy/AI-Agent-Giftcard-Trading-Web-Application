import { NextRequest, NextResponse } from 'next/server';

/**
 * API Route for user registration
 * 
 * NOTE: This is a template. You need to implement actual user registration.
 * Steps:
 * 1. Validate the registration data
 * 2. Hash the password (use bcrypt or similar)
 * 3. Store user in database
 * 4. Return success response
 * 
 * Example with Prisma:
 * npm install @prisma/client bcrypt
 */

export async function POST(request: NextRequest) {
  try {
    const { name, email, phone, address, password, country } = await request.json();

    // Validate required fields
    if (!name || !email || !phone || !address || !password || !country) {
      return NextResponse.json(
        { error: 'All fields are required' },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      );
    }

    // Validate password strength
    if (password.length < 8) {
      return NextResponse.json(
        { error: 'Password must be at least 8 characters' },
        { status: 400 }
      );
    }

    // TODO: Implement actual user registration
    // Example with Prisma and bcrypt:
    /*
    import { PrismaClient } from '@prisma/client';
    import bcrypt from 'bcrypt';
    
    const prisma = new PrismaClient();
    
    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });
    
    if (existingUser) {
      return NextResponse.json(
        { error: 'User with this email already exists' },
        { status: 409 }
      );
    }
    
    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);
    
    // Create user
    const user = await prisma.user.create({
      data: {
        name,
        email,
        phone,
        address,
        password: hashedPassword,
        country,
      },
    });
    
    // Don't return password in response
    const { password: _, ...userWithoutPassword } = user;
    */

    // For now, just log (remove in production)
    console.log('User registration:', {
      name,
      email,
      phone,
      address,
      country,
      passwordLength: password.length,
    });

    return NextResponse.json(
      { 
        message: 'Registration successful',
        // user: userWithoutPassword, // Uncomment when using Prisma
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Registration error:', error);
    return NextResponse.json(
      { error: 'Registration failed. Please try again.' },
      { status: 500 }
    );
  }
}

