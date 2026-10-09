export const countryCodes = { nigeria: '+234', ghana: '+233' } as const;
export type Country = keyof typeof countryCodes;

export function isCountry(value: unknown): value is Country {
  return value === 'nigeria' || value === 'ghana';
}

export function passwordError(value: string): string | undefined {
  if (value.length < 8 || value.length > 128) return 'Password must be between 8 and 128 characters';
  if (new TextEncoder().encode(value).length > 72) return 'Password must not exceed 72 UTF-8 bytes';
  if (!/[A-Z]/.test(value)) return 'Password must contain at least one uppercase letter';
  if (!/[a-z]/.test(value)) return 'Password must contain at least one lowercase letter';
  if (!/[0-9]/.test(value)) return 'Password must contain at least one number';
  if (!/[!@#$%^&*()_+\-=\[\]{};\x27\x22\\|,.<>\/?]/.test(value)) return 'Password must contain at least one special character';
}

// Accept unknown because HTTP callers can bypass the browser form entirely.
export function validateRegistration(input: unknown): Record<string, string> {
  if (!input || typeof input !== 'object' || Array.isArray(input)) {
    return { form: 'Request must contain a JSON object' };
  }
  const data = input as Record<string, unknown>;
  const errors: Record<string, string> = {};
  for (const field of ['name', 'email', 'phone', 'address', 'password']) {
    if (typeof data[field] !== 'string' || !(data[field] as string).trim()) {
      errors[field] = `${field[0].toUpperCase()}${field.slice(1)} is required`;
    }
  }
  if (typeof data.name === 'string' && data.name.length > 120) errors.name = 'Name is too long';
  if (typeof data.address === 'string' && data.address.length > 500) errors.address = 'Address is too long';
  if (typeof data.email === 'string' &&
      (data.email.length > 254 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email))) {
    errors.email = 'Please enter a valid email address';
  }
  if (!isCountry(data.country)) {
    errors.country = 'Please select Nigeria or Ghana';
  } else if (typeof data.phone === 'string' &&
      (!/^\+[1-9]\d{6,14}$/.test(data.phone) || !data.phone.startsWith(countryCodes[data.country]))) {
    errors.phone = 'Enter a valid phone number for your selected country';
  }
  if (typeof data.password === 'string' && !errors.password) {
    const message = passwordError(data.password);
    if (message) errors.password = message;
  }
  return errors;
}
