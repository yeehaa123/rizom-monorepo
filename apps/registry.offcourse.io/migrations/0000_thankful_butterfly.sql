CREATE TABLE `auth` (
	`login` text NOT NULL,
	`provider` text NOT NULL,
	`userName` text NOT NULL,
	FOREIGN KEY (`userName`) REFERENCES `curators`(`userName`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `curators` (
	`userName` text PRIMARY KEY NOT NULL,
	`repository` text NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `auth_provider_unique` ON `auth` (`provider`);--> statement-breakpoint
CREATE UNIQUE INDEX `curators_repository_unique` ON `curators` (`repository`);