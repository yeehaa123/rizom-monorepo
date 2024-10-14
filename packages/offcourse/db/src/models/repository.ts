import { db } from "../";
import type { RepositoryEntry } from "@offcourse/schema";
import { keystoreTable, registryTable, oauthTable } from "../schema"

export const insertRepositoryEntry = async ({
  keyId,
  publicKey,
  userName,
  repository,
  login,
  authProvider
}: RepositoryEntry) => {
  try {
    await db.batch([
      db.insert(registryTable).values({ userName, repository }).onConflictDoNothing(),
      db.insert(keystoreTable).values({ keyId, publicKey }).onConflictDoNothing(),
      db.insert(oauthTable).values({ login, provider: authProvider, repository }).onConflictDoNothing()
    ]);
    return keyId
  }
  catch (e) {
    console.log(e);
  }
}
