import { config } from 'dotenv';
import { defineConfig } from 'drizzle-kit';

config({ path: '.env' });
export default defineConfig({
  schema: "./node_modules/@offcourse/db/src/schema.ts",
  out: './migrations',
  dialect: 'sqlite',
  driver: 'turso',
  dbCredentials: {
    url: "file:offcourse.db",
  },
});
