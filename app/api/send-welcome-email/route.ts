import { NextResponse } from 'next/server';

// Email will be triggered by successful server-side registration once configured.
// Never accept or include a user's password in welcome emails.
export async function POST() {
  return NextResponse.json(
    { error: 'Welcome emails are not available yet.' },
    { status: 501 }
  );
}
