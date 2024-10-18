import { db } from "../";
import { registryEntry } from "@offcourse/schema";
import type { RepositoryEntry } from "@offcourse/schema";
import { keystoreTable, registryTable, oauthTable } from "../schema"
import { eq, and } from "drizzle-orm";
import {
  generateSafeHash,
} from "@offcourse/crypto";

export const insertRepositoryEntry = async ({
  publicKey,
  userName,
  repository,
  login,
  authProvider
}: RepositoryEntry) => {
  const keyId = generateSafeHash(userName, repository);
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

export const getRepositoryEntry = async ({
  authProvider,
  login
}: { authProvider: string, login: string }) => {
  try {
    const authEntries = await db.select({
      userName: registryTable.userName,
      repository: registryTable.repository
    }).
      from(oauthTable)
      .where(
        and(
          eq(oauthTable.login, login),
          eq(oauthTable.provider, authProvider)
        )
      )
      .leftJoin(
        registryTable, eq(oauthTable.repository, registryTable.repository)
      );
    console.log("Registered User", authEntries);
    return registryEntry.parse(authEntries[0]);
  }
  catch (e) {
    console.log(e);
  }
}
