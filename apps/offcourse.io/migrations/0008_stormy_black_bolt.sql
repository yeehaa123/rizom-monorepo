CREATE TABLE `oauth` (
	`login` text NOT NULL,
	`provider` text NOT NULL,
	`repository` text NOT NULL,
	PRIMARY KEY(`login`, `provider`),
	FOREIGN KEY (`repository`) REFERENCES `registry`(`repository`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
DROP TABLE `auth`;