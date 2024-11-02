import { config } from 'dotenv';
import { defineConfig } from 'drizzle-kit';
config({ path: '.env' });

export default defineConfig({
  schema: './node_modules/@offcourse/db/src/schema.ts',
  out: './migrations',
  dialect: 'sqlite',
  driver: 'turso',
  // @ts-ignore
  dbCredentials: {
    url: process.env.TURSO_DATABASE_URL!,
    authToken: process.env.TURSO_AUTH_TOKEN,
  },
});

