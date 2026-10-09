import { NextRequest, NextResponse } from 'next/server';
import { compare, hashSync } from 'bcryptjs';
import { db } from '../../lib/db';
import { allowLogin, startSession, sessionCookie, validOrigin } from '../../lib/auth';

const dummyHash = hashSync('NotAnAccountPassword!', 12);
export async function POST(request: NextRequest) {
  if (!validOrigin(request)) return NextResponse.json({ error: 'Request origin is not allowed' }, { status: 403 });
  let data;
  try { data = await request.json(); } catch {
    return NextResponse.json({ error: 'Request must contain valid JSON' }, { status: 400 });
  }
  if (!data || typeof data.email !== 'string' || typeof data.password !== 'string' ||
      !data.email.trim() || data.email.length > 254 || !data.password || new TextEncoder().encode(data.password).length > 72) {
    return NextResponse.json({ error: 'Enter a valid email and password' }, { status: 400 });
  }
  const email = data.email.trim().toLowerCase();
  try {
    if (!await allowLogin(email)) return NextResponse.json({ error: 'Too many login attempts. Try again in 15 minutes.' }, { status: 429 });
    const user = await db.user.findUnique({ where: { email } });
    const matches = await compare(data.password, user?.passwordHash ?? dummyHash);
    if (!user || !matches) return NextResponse.json({ error: 'Email or password is incorrect' }, { status: 401 });
    const response = NextResponse.json({ message: 'Logged in' });
    await startSession(user.id, response, request.cookies.get(sessionCookie)?.value);
    return response;
  } catch {
    return NextResponse.json({ error: 'Login is temporarily unavailable. Please try again.' }, { status: 503 });
  }
}
