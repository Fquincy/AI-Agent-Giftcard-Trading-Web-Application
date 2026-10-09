import { NextRequest, NextResponse } from 'next/server';
import { db } from '../../lib/db';
import { hashToken, cookieOptions, sessionCookie, validOrigin } from '../../lib/auth';

export async function POST(request: NextRequest) {
  if (!validOrigin(request)) return NextResponse.json({ error: 'Request origin is not allowed' }, { status: 403 });
  try {
    const token = request.cookies.get(sessionCookie)?.value;
    if (token) await db.session.deleteMany({ where: { tokenHash: hashToken(token) } });
    const response = NextResponse.json({ message: 'Logged out' });
    response.cookies.set(sessionCookie, '', { ...cookieOptions, maxAge: 0 });
    return response;
  } catch {
    return NextResponse.json({ error: 'Unable to log out. Please try again.' }, { status: 503 });
  }
}
