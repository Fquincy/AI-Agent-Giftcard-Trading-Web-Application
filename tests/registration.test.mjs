import test from 'node:test';
import assert from 'node:assert/strict';
import { validateRegistration } from '../app/lib/registration.ts';

const valid = {
  name: 'Demo User', email: 'demo@example.com', phone: '+2348012345678',
  address: 'Demo address', password: 'Example123!', country: 'nigeria',
};

test('accepts valid fictional details for either supported country', () => {
  assert.deepEqual(validateRegistration(valid), {});
  assert.deepEqual(validateRegistration({ ...valid, country: 'ghana', phone: '+233201234567' }), {});
});

test('rejects malformed request shapes without throwing', () => {
  for (const input of [null, [], 'text', 42, true]) {
    assert.ok(validateRegistration(input).form);
  }
});

test('rejects absent, blank, and non-string required fields', () => {
  for (const field of ['name', 'email', 'phone', 'address', 'password']) {
    for (const value of [undefined, null, 123, {}, '   ']) {
      assert.ok(validateRegistration({ ...valid, [field]: value })[field], field);
    }
  }
});

test('rejects invalid email and unsupported countries', () => {
  assert.ok(validateRegistration({ ...valid, email: 'invalid@' }).email);
  for (const country of [null, 'other', 'toString', {}]) {
    assert.ok(validateRegistration({ ...valid, country }).country);
  }
});

test('rejects missing password complexity and excessive length', () => {
  for (const password of ['A1!', 'lowercase123!', 'UPPERCASE123!', 'NoNumbers!', 'NoSymbols123', 'Aa1!' + 'a'.repeat(125)]) {
    assert.ok(validateRegistration({ ...valid, password }).password);
  }
});

test('rejects mismatched, malformed, and excessively long phone numbers', () => {
  for (const phone of ['+233201234567', '08012345678', '+234letters', '+234' + '1'.repeat(20)]) {
    assert.ok(validateRegistration({ ...valid, phone }).phone);
  }
});

test('enforces text length limits', () => {
  assert.ok(validateRegistration({ ...valid, name: 'a'.repeat(121) }).name);
  assert.ok(validateRegistration({ ...valid, address: 'a'.repeat(501) }).address);
  assert.ok(validateRegistration({ ...valid, email: 'a'.repeat(250) + '@example.com' }).email);
});

test('rejects passwords bcrypt would silently truncate, including Unicode', () => {
  assert.ok(validateRegistration({ ...valid, password: 'Aa1!' + 'a'.repeat(69) }).password);
  assert.ok(validateRegistration({ ...valid, password: 'Aa1!' + '你'.repeat(24) }).password);
  assert.deepEqual(validateRegistration({ ...valid, password: 'Aa1!' + 'a'.repeat(68) }), {});
});
