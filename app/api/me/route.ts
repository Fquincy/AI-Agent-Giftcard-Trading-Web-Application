import { NextResponse } from 'next/server';
import { getCurrentUser } from '../../lib/auth';
export async function GET() {
  try {
    const user = await getCurrentUser();
    if (!user) return NextResponse.json({ error: 'Please log in' }, { status: 401 });
    return NextResponse.json({ user: { id: user.id, name: user.name, email: user.email, country: user.country } }, { headers: { 'Cache-Control': 'no-store' } });
  } catch {
    return NextResponse.json({ error: 'Account information is temporarily unavailable' }, { status: 503 });
  }
}
