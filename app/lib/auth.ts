import { createHash, randomBytes } from 'node:crypto';
import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';
import { db } from './db';

export const sessionCookie = 'leyou_session';
const lifetimeSeconds = 7 * 24 * 60 * 60;
export const hashToken = (token: string) => createHash('sha256').update(token).digest('hex');
export const cookieOptions = {
  httpOnly: true, secure: process.env.NODE_ENV === 'production',
  sameSite: 'lax' as const, path: '/',
};

export function validOrigin(request: NextRequest) {
  const expected = process.env.APP_ORIGIN || new URL(request.url).origin;
  return request.headers.get('origin') === expected;
}

export async function startSession(userId: string, response: NextResponse, oldToken?: string) {
  const token = randomBytes(32).toString('hex');
  const expiresAt = new Date(Date.now() + lifetimeSeconds * 1000);
  await db.$transaction(async tx => {
    if (oldToken) await tx.session.deleteMany({ where: { tokenHash: hashToken(oldToken) } });
    await tx.session.create({ data: { userId, tokenHash: hashToken(token), expiresAt } });
  });
  response.cookies.set(sessionCookie, token, { ...cookieOptions, maxAge: lifetimeSeconds });
}

export async function getCurrentUser() {
  const token = (await cookies()).get(sessionCookie)?.value;
  if (!token || !/^[a-f0-9]{64}$/.test(token)) return null;
  const session = await db.session.findUnique({ where: { tokenHash: hashToken(token) }, include: { user: true } });
  if (!session || session.expiresAt <= new Date()) return null;
  return session.user;
}

// Persistent fixed-window throttling across server processes. Never store raw emails here.
export async function allowLogin(email: string, scope = 'login') {
  const window = Math.floor(Date.now() / (15 * 60 * 1000));
  const key = hashToken(scope + ':' + email + ':' + window);
  const attempt = await db.loginAttempt.upsert({
    where: { key }, create: { key, expiresAt: new Date((window + 1) * 15 * 60 * 1000) },
    update: { count: { increment: 1 } },
  });
  return attempt.count <= 10;
}
