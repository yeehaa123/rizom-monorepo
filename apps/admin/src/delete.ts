import { deleteMailbox } from "./mail"
import { deleteMatrixUser } from "./matrix"
import { deleteUser as deleteUserDB } from "./db";

export interface DeleteUserConfig {
  username: string;
}

export async function deleteUser(config: DeleteUserConfig) {
  try {
    console.log(`Starting deletion process for ${config.username}...`);

    // Delete Matrix account
    console.log('Deleting Matrix account...');
    await deleteMatrixUser(
      config.username,
      process.env.MATRIX_ADMIN_TOKEN!
    );

    // Delete Migadu mailbox
    console.log('Deleting email account...');
    await deleteMailbox(
      config.username,
      process.env.MIGADU_API_KEY!
    );

    // Delete user from database
    console.log('Removing user from database...');
    await deleteUserDB({ username: config.username })

    console.log('\nUser deletion completed successfully!');
    console.log(`Removed user: ${config.username}`);

  } catch (error) {
    console.error('\nError during user deletion:');
    console.error(error instanceof Error ? error.message : error);
    process.exit(1);
  }
}


