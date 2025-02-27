#!/usr/bin/env bun
import { program } from 'commander';
import { migrate } from 'drizzle-orm/bun-sqlite/migrator';
import { createInterface } from 'readline';
import { db } from "./db";
import { onboardUser } from "./onboard";
import { deleteUser } from "./delete";
import type { OnboardUserConfig } from "./onboard"

function confirm(message: string): Promise<boolean> {
  const rl = createInterface({
    input: process.stdin,
    output: process.stdout
  });

  return new Promise(resolve => {
    rl.question(`${message} (y/N): `, answer => {
      rl.close();
      resolve(answer.toLowerCase() === 'y');
    });
  });
}

// Validate environment variables
function checkEnvVars() {
  const requiredEnvVars = ['MIGADU_API_KEY', 'MATRIX_ADMIN_TOKEN', 'RESEND_API_KEY'];
  for (const envVar of requiredEnvVars) {
    if (!process.env[envVar]) {
      console.error(`Error: ${envVar} environment variable is required`);
      process.exit(1);
    }
  }
}

// Initialize Commander
program
  .name('cli')
  .description('Administration CLI tool')
  .version('1.0.0');

// Onboard command
program
  .command('onboard')
  .description('Onboard a new user to the system')
  .requiredOption('-u, --username <username>', 'username for the new user')
  .requiredOption('-e, --email <email>', 'personal email address')
  .action(async (options) => {
    checkEnvVars();
    const config: OnboardUserConfig = {
      username: options.username,
      personalEmail: options.email
    };
    await onboardUser(config);
  });

// Delete user command
program
  .command('delete')
  .description('Delete a user from the system')
  .requiredOption('-u, --username <username>', 'username of the user to delete')
  .option('-f, --force', 'skip confirmation prompt')
  .action(async (options) => {
    checkEnvVars();

    const confirmed = await confirm(`Are you sure you want to delete user "${options.username}"? This cannot be undone.`);

    // Add confirmation unless force flag is used

    if (!confirmed) {
      console.log('Operation cancelled.');
      return;
    }

    await deleteUser({ username: options.username });
  });

// Migrate command
program
  .command('migrate')
  .description('Run database migrations')
  .action(async () => {
    console.log('Running migrations...');
    await migrate(db, { migrationsFolder: './drizzle' });
    console.log('Migrations complete');
  });

// Parse arguments and execute the appropriate command
program.parse();
