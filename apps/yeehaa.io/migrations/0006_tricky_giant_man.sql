CREATE TABLE `keystore` (
	`keyId` text PRIMARY KEY NOT NULL,
	`publicKey` text NOT NULL
);
--> statement-breakpoint
CREATE TABLE `oauth` (
	`login` text NOT NULL,
	`provider` text NOT NULL,
	`repository` text NOT NULL,
	PRIMARY KEY(`login`, `provider`),
	FOREIGN KEY (`repository`) REFERENCES `registry`(`repository`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `registry` (
	`repository` text PRIMARY KEY NOT NULL,
	`userName` text
);
--> statement-breakpoint
CREATE UNIQUE INDEX `keystore_publicKey_unique` ON `keystore` (`publicKey`);--> statement-breakpoint
CREATE UNIQUE INDEX `registry_userName_unique` ON `registry` (`userName`);