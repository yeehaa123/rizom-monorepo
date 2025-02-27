// src/schema.ts
import { sql } from 'drizzle-orm';
import { sqliteTable, text, integer, uniqueIndex } from 'drizzle-orm/sqlite-core';

export const users = sqliteTable(
  'users',
  {
    username: text('username').primaryKey(),
    personalEmail: text('personal_email').notNull(),
    rizomEmail: text('rizom_email').notNull().unique(),
    matrixId: text('matrix_id').notNull().unique(),
    createdAt: integer('created_at', { mode: 'timestamp' })
      .notNull()
      .default(sql`CURRENT_TIMESTAMP`),
    lastModified: integer('last_modified', { mode: 'timestamp' })
      .notNull()
      .default(sql`CURRENT_TIMESTAMP`),
  },
  (table) => [
    uniqueIndex('username_idx').on(table.username),
    uniqueIndex('email_idx').on(table.personalEmail),
  ]
);

export const auth = sqliteTable(
  'auth',
  {
    username: text('username').primaryKey().references(() => users.username, { onDelete: 'cascade' }),
    passwordHash: text('password_hash').notNull(),
    createdAt: integer('created_at', { mode: 'timestamp' })
      .notNull()
      .default(sql`CURRENT_TIMESTAMP`),
    lastModified: integer('last_modified', { mode: 'timestamp' })
      .notNull()
      .default(sql`CURRENT_TIMESTAMP`),
  }
);
