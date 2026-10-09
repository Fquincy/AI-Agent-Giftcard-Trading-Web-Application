import { NextRequest, NextResponse } from 'next/server';
import { validateRegistration } from '../../lib/registration';
import { Prisma } from '@prisma/client';
import { hash } from 'bcryptjs';
import { db } from '../../lib/db';
import { allowLogin, validOrigin } from '../../lib/auth';

export async function POST(request: NextRequest) {
  if (!validOrigin(request)) return NextResponse.json({ error: 'Request origin is not allowed' }, { status: 403 });
  let data: unknown;
  try {
    data = await request.json();
  } catch {
    return NextResponse.json({ error: 'Request must contain valid JSON' }, { status: 400 });
  }

  const errors = validateRegistration(data);
  if (Object.keys(errors).length) {
    return NextResponse.json({ error: 'Please correct the registration details', errors }, { status: 400 });
  }

  const details = data as { name: string; email: string; phone: string; address: string; password: string; country: string };
  try {
    const email = details.email.trim().toLowerCase();
    if (!await allowLogin(email, 'register')) return NextResponse.json({ error: 'Too many registration attempts. Try again in 15 minutes.' }, { status: 429 });
    const passwordHash = await hash(details.password, 12);
    await db.user.create({ data: {
      name: details.name.trim(), email, phone: details.phone,
      address: details.address.trim(), country: details.country, passwordHash,
    } });
    return NextResponse.json({ message: 'Account created. You can now log in.' }, { status: 201 });
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2002') {
      return NextResponse.json({ error: 'An account with this email already exists.' }, { status: 409 });
    }
    return NextResponse.json({ error: 'Account creation is temporarily unavailable. Please try again.' }, { status: 503 });
  }
}
