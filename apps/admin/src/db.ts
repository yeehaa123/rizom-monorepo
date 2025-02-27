import { drizzle } from 'drizzle-orm/bun-sqlite';
import { users, auth } from './schema';
import { Database } from 'bun:sqlite';
import { eq, sql } from 'drizzle-orm';

const sqlite = new Database('users.sqlite');
export const db = drizzle(sqlite);

export async function saveUser({
  username,
  personalEmail,
  rizomEmail,
  matrixId,
  passwordHash,
}: {
  username: string;
  personalEmail: string;
  rizomEmail: string;
  matrixId: string;
  passwordHash: string;
}): Promise<void> {
  await db.transaction(async (tx) => {
    // Insert or update user
    await tx
      .insert(users)
      .values({
        username,
        personalEmail,
        rizomEmail,
        matrixId,
      })
      .onConflictDoUpdate({
        target: users.username,
        set: {
          personalEmail,
          rizomEmail,
          matrixId,
          lastModified: sql`CURRENT_TIMESTAMP`,
        },
      });

    // Insert or update password
    await tx
      .insert(auth)
      .values({
        username,
        passwordHash,
      })
      .onConflictDoUpdate({
        target: auth.username,
        set: {
          passwordHash,
          lastModified: sql`CURRENT_TIMESTAMP`,
        },
      });
  });
}

export async function deleteUser({
  username
}: { username: string }): Promise<void> {
  await db.transaction(async (tx) => {
    // Delete from auth table first (foreign key reference)
    console.log('Removing user from auth table...');
    await tx.delete(auth).where(eq(auth.username, username));

    // Delete from users table
    console.log('Removing user from users table...');
    await tx.delete(users).where(eq(users.username, username));
  });
}

