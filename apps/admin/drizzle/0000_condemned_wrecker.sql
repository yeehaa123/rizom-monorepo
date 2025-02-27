CREATE TABLE `users` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`username` text,
	`personal_email` text NOT NULL,
	`rizom_email` text NOT NULL,
	`matrix_id` text NOT NULL,
	`password_hash` text NOT NULL,
	`created_at` integer DEFAULT CURRENT_TIMESTAMP NOT NULL,
	`last_modified` integer DEFAULT CURRENT_TIMESTAMP NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `users_username_unique` ON `users` (`username`);--> statement-breakpoint
CREATE UNIQUE INDEX `users_rizom_email_unique` ON `users` (`rizom_email`);--> statement-breakpoint
CREATE UNIQUE INDEX `users_matrix_id_unique` ON `users` (`matrix_id`);--> statement-breakpoint
CREATE UNIQUE INDEX `username_idx` ON `users` (`username`);--> statement-breakpoint
CREATE UNIQUE INDEX `email_idx` ON `users` (`personal_email`);