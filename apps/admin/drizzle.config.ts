import type { Config } from 'drizzle-kit';

export default {
  dialect: "sqlite",
  schema: "./src/schema.ts",
  out: "./drizzle",
  dbCredentials: {
    url: './users.sqlite'
  },
  verbose: true,
  strict: true
} satisfies Config;
