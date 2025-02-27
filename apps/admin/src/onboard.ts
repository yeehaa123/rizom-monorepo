import { generateSecurePassword, hashPassword } from "./password"
import { saveUser } from "./db";
import { createMailbox, sendWelcomeEmail } from "./mail"
import { createMatrixUser } from "./matrix"

export interface OnboardUserConfig {
  username: string;
  personalEmail: string;
}

export async function onboardUser(config: OnboardUserConfig) {
  try {
    console.log(`Starting onboarding process for ${config.username}...`);

    // Generate single password for both accounts
    const password = generateSecurePassword();
    const passwordHash = hashPassword(password);

    // Create Migadu mailbox
    console.log('Creating email account...');
    await createMailbox(
      config.username,
      password,
      process.env.MIGADU_API_KEY!
    );

    // Create Matrix account
    console.log('Creating Matrix account...');
    await createMatrixUser(
      config.username,
      password,
      process.env.MATRIX_ADMIN_TOKEN!
    );

    // Store user in database
    const rizomEmail = `${config.username}@rizom.ai`;
    const matrixId = `@${config.username}:rizom.ai`;

    console.log('Storing user data in database...');
    await saveUser({
      username: config.username,
      personalEmail: config.personalEmail,
      rizomEmail,
      matrixId,
      passwordHash,
    });

    // Send welcome email
    console.log('Sending welcome email to personal address...');
    await sendWelcomeEmail({
      personalEmail: config.personalEmail,
      rizomEmail,
      username: config.username,
      password,
    });

    console.log('\nOnboarding completed successfully!');
    console.log(password);
    console.log(`Rizom Email: ${rizomEmail}`);
    console.log(`Matrix ID: ${matrixId}`);

  } catch (error) {
    console.error('\nError during onboarding:');
    console.error(error instanceof Error ? error.message : error);
    process.exit(1);
  }
}

