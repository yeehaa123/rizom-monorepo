CREATE TABLE `keystore` (
	`keyId` text PRIMARY KEY NOT NULL,
	`publicKey` text NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `keystore_publicKey_unique` ON `keystore` (`publicKey`);