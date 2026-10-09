import assert from 'node:assert/strict';
import { spawn } from 'node:child_process';
import { createRequire } from 'node:module';
import { createHash, randomUUID } from 'node:crypto';
import { PrismaClient } from '@prisma/client';
import { compare } from 'bcryptjs';

const require = createRequire(import.meta.url);
const db = new PrismaClient();
const origin = 'http://localhost:3108';
const prefix = 'integration-' + randomUUID();
const emails = [prefix + '-a@example.com', prefix + '-b@example.com'];
const password = 'Fictional123!';
const cardId = prefix + '-card';
const server = spawn(process.execPath, [require.resolve('next/dist/bin/next'), 'start', '--port', '3108'], {
  env: { ...process.env, APP_ORIGIN: origin }, windowsHide: true, stdio: ['ignore', 'pipe', 'pipe'],
});
let output = '';
server.stdout.on('data', chunk => { output = (output + chunk).slice(-4000); });
server.stderr.on('data', chunk => { output = (output + chunk).slice(-4000); });
let serverError;
server.on('error', error => { serverError = error; });
const tokenHash = token => createHash('sha256').update(token).digest('hex');
async function request(path, { method = 'GET', body, cookie, originHeader = origin } = {}) {
  const headers = { Origin: originHeader };
  if (cookie) headers.Cookie = cookie;
  if (body !== undefined) headers['Content-Type'] = 'application/json';
  return fetch(origin + path, { method, headers, body: body === undefined ? undefined : JSON.stringify(body), redirect: 'manual' });
}
async function login(email, suppliedPassword = password) {
  return request('/api/login', { method: 'POST', body: { email, password: suppliedPassword } });
}
function cookieFrom(response) {
  const cookie = response.headers.get('set-cookie');
  assert.match(cookie, /HttpOnly/i);
  assert.match(cookie, /SameSite=lax/i);
  assert.match(cookie, /Secure/i);
  return cookie.split(';')[0];
}
try {
  let ready = false;
  for (let i = 0; i < 60; i++) {
    if (serverError) throw serverError;
    if (server.exitCode !== null) throw new Error('Test server exited: ' + output);
    try { ready = (await fetch(origin + '/login')).ok; } catch { /* wait for startup */ }
    if (ready) break;
    await new Promise(resolve => setTimeout(resolve, 500));
  }
  assert.ok(ready, 'Test server must start');
  assert.equal((await request('/api/me')).status, 401);
  assert.equal((await request('/api/trades')).status, 401);
  const protectedPage = await request('/dashboard');
  assert.equal(protectedPage.status, 307);
  assert.equal(protectedPage.headers.get('location'), '/login');
  console.log('PASS: unauthenticated API access and dashboard blocked');

  for (const email of emails) {
    const body = { name: 'Fictional User', email, password, phone: '+2348012345678', address: 'Sample address', country: 'nigeria' };
    assert.equal((await request('/api/register', { method: 'POST', body, originHeader: 'https://untrusted.example' })).status, 403);
    assert.equal((await request('/api/register', { method: 'POST', body: { ...body, password: 42 } })).status, 400);
    assert.equal((await request('/api/register', { method: 'POST', body })).status, 201);
    assert.equal((await request('/api/register', { method: 'POST', body: { ...body, email: email.toUpperCase() } })).status, 409);
    const user = await db.user.findUniqueOrThrow({ where: { email } });
    assert.notEqual(user.passwordHash, password);
    assert.ok(await compare(password, user.passwordHash));
  }
  console.log('PASS: persisted registration, validation, duplicate normalization, hashed passwords, and origin protection');
  assert.equal((await request('/api/login', { method: 'POST', originHeader: 'https://untrusted.example', body: { email: emails[0], password } })).status, 403);
  assert.equal((await login(emails[0], 'Wrong123!')).status, 401);
  assert.equal((await login(prefix + '-missing@example.com', 'Wrong123!')).status, 401);
  const responseA = await login(emails[0].toUpperCase());
  const responseB = await login(emails[1]);
  assert.equal(responseA.status, 200);
  assert.equal(responseB.status, 200);
  let cookieA = cookieFrom(responseA);
  const cookieB = cookieFrom(responseB);
  const profile = await (await request('/api/me', { cookie: cookieA })).json();
  assert.equal(profile.user.email, emails[0]);
  assert.ok(!JSON.stringify(profile).includes('password'));
  const userA = await db.user.findUniqueOrThrow({ where: { email: emails[0] } });
  const userB = await db.user.findUniqueOrThrow({ where: { email: emails[1] } });
  const card = await db.giftCardType.upsert({ where: { id: cardId }, create: { id: cardId, name: 'Fictional Card' }, update: {} });
  const tradeA = await db.trade.create({ data: { userId: userA.id, cardTypeId: card.id, amountMinor: 10000, currency: 'USD' } });
  const tradeB = await db.trade.create({ data: { userId: userB.id, cardTypeId: card.id, amountMinor: 5000, currency: 'USD' } });
  const own = await request('/api/trades?id=' + tradeA.id, { cookie: cookieA });
  assert.equal(own.status, 200);
  const list = await (await request('/api/trades?userId=' + userB.id, { cookie: cookieA })).json();
  assert.equal(list.trades.length, 1);
  assert.equal(list.trades[0].id, tradeA.id);
  assert.equal((await request('/api/trades?id=' + tradeB.id, { cookie: cookieA })).status, 404);
  const dashboard = await request('/dashboard', { cookie: cookieA });
  assert.equal(dashboard.status, 200);
  assert.ok((await dashboard.text()).includes('Fictional Card'));
  console.log('PASS: secure cookies, current-user profile, dashboard, and isolation between users');

  const tokenA = cookieA.split('=')[1];
  assert.ok(await db.session.findUnique({ where: { tokenHash: tokenHash(tokenA) } }));
  assert.equal(await db.session.count({ where: { tokenHash: tokenA } }), 0);
  await db.session.update({ where: { tokenHash: tokenHash(tokenA) }, data: { expiresAt: new Date(Date.now() - 1000) } });
  assert.equal((await request('/api/me', { cookie: cookieA })).status, 401);
  const renewed = await request('/api/login', { method: 'POST', cookie: cookieA, body: { email: emails[0], password } });
  assert.equal(renewed.status, 200);
  cookieA = cookieFrom(renewed);
  assert.equal(await db.session.count({ where: { tokenHash: tokenHash(tokenA) } }), 0);
  assert.equal((await request('/api/logout', { method: 'POST', cookie: cookieA, originHeader: 'https://untrusted.example' })).status, 403);
  assert.equal((await request('/api/me', { cookie: cookieA })).status, 200);
  assert.equal((await request('/api/logout', { method: 'POST', cookie: cookieA })).status, 200);
  assert.equal((await request('/api/me', { cookie: cookieA })).status, 401);
  assert.equal((await request('/api/me', { cookie: cookieB })).status, 200);
  assert.equal((await request('/api/me', { cookie: 'leyou_session=invalid' })).status, 401);
  console.log('PASS: hashed tokens, expiry, session rotation, logout revocation, and independent sessions');
  const throttleEmail = prefix + '-throttle@example.com';
  for (let i = 0; i < 10; i++) assert.equal((await login(throttleEmail, 'Wrong123!')).status, 401);
  assert.equal((await login(throttleEmail, 'Wrong123!')).status, 429);
  console.log('PASS: persistent login attempt limit');
} finally {
  server.kill();
  await db.user.deleteMany({ where: { email: { in: emails } } });
  await db.giftCardType.deleteMany({ where: { id: cardId } });
  await db.loginAttempt.deleteMany({ where: { expiresAt: { lt: new Date() } } });
  for (const email of [...emails, prefix + '-missing@example.com', prefix + '-throttle@example.com']) {
    for (const scope of ['login','register']) {
      for (const window of [Math.floor(Date.now() / 900000), Math.floor(Date.now() / 900000) - 1]) {
        await db.loginAttempt.deleteMany({ where: { key: tokenHash(scope + ':' + email + ':' + window) } });
      }
    }
  }
  await db.$disconnect();
}
