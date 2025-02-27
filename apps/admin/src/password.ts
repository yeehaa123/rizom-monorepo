import { randomBytes, createHash } from 'crypto';
// import { users } from './schema';
// import { eq } from 'drizzle-orm';
// import { db } from "./db";

export function generateSecurePassword(length: number = 16): string {
  const charset = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*';
  const bytes = randomBytes(length);
  let password = '';

  for (let i = 0; i < length; i++) {
    password += charset[bytes[i] % charset.length];
  }

  const requirements = [
    { regex: /[a-z]/, chars: 'abcdefghijklmnopqrstuvwxyz' },
    { regex: /[A-Z]/, chars: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ' },
    { regex: /[0-9]/, chars: '0123456789' },
    { regex: /[!@#$%^&*]/, chars: '!@#$%^&*' }
  ];

  requirements.forEach((req, index) => {
    if (!req.regex.test(password)) {
      const pos = index;
      password = password.slice(0, pos) +
        req.chars[randomBytes(1)[0] % req.chars.length] +
        password.slice(pos + 1);
    }
  });

  return password;
}

export function hashPassword(password: string): string {
  const salt = randomBytes(16).toString('hex');
  const hash = createHash('sha256').update(password + salt).digest('hex');
  return `${salt}:${hash}`;
}

export function validatePassword(password: string, storedHash: string): boolean {
  const [salt, hash] = storedHash.split(':');
  const testHash = createHash('sha256').update(password + salt).digest('hex');
  return testHash === hash;
}

// async function verifyUserCredentials(username: string, password: string): Promise<boolean> {
//   const result = await db.select({ passwordHash: users.passwordHash })
//     .from(users)
//     .where(eq(users.username, username))
//     .get();
//
//   if (!result) {
//     return false;
//   }
//
//   return validatePassword(password, result.passwordHash);
// }
