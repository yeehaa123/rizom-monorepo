import { migrate } from 'drizzle-orm/bun-sqlite/migrator';
import { db } from "./db";

async function runMigrations() {
  try {
    console.log('Running migrations...');
    await migrate(db, {
      migrationsFolder: './drizzle',
      migrateOnStartup: true
    });
    console.log('Migrations completed successfully');
  } catch (error) {
    console.error('Migration failed:', error);
    process.exit(1);
  }
}

runMigrations();
