-- Create new passwords table
CREATE TABLE `user_passwords` (
    `username` text PRIMARY KEY NOT NULL,
    `password_hash` text NOT NULL,
    `created_at` integer DEFAULT CURRENT_TIMESTAMP NOT NULL,
    `last_modified` integer DEFAULT CURRENT_TIMESTAMP NOT NULL,
    FOREIGN KEY (`username`) REFERENCES `users`(`username`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
-- Create temporary table to store passwords
CREATE TABLE `temp_passwords` AS 
SELECT username, password_hash, created_at, last_modified 
FROM users;
--> statement-breakpoint
PRAGMA foreign_keys=OFF;
--> statement-breakpoint
CREATE TABLE `__new_users` (
    `username` text PRIMARY KEY NOT NULL,
    `personal_email` text NOT NULL,
    `rizom_email` text NOT NULL,
    `matrix_id` text NOT NULL,
    `created_at` integer DEFAULT CURRENT_TIMESTAMP NOT NULL,
    `last_modified` integer DEFAULT CURRENT_TIMESTAMP NOT NULL
);
--> statement-breakpoint
INSERT INTO `__new_users`("username", "personal_email", "rizom_email", "matrix_id", "created_at", "last_modified") 
SELECT "username", "personal_email", "rizom_email", "matrix_id", "created_at", "last_modified" 
FROM `users`;
--> statement-breakpoint
-- Copy passwords to new table
INSERT INTO `user_passwords` ("username", "password_hash", "created_at", "last_modified")
SELECT "username", "password_hash", "created_at", "last_modified"
FROM temp_passwords;
--> statement-breakpoint
DROP TABLE temp_passwords;
--> statement-breakpoint
DROP TABLE `users`;
--> statement-breakpoint
ALTER TABLE `__new_users` RENAME TO `users`;
--> statement-breakpoint
PRAGMA foreign_keys=ON;
--> statement-breakpoint
CREATE UNIQUE INDEX `users_rizom_email_unique` ON `users` (`rizom_email`);
--> statement-breakpoint
CREATE UNIQUE INDEX `users_matrix_id_unique` ON `users` (`matrix_id`);
--> statement-breakpoint
CREATE UNIQUE INDEX `username_idx` ON `users` (`username`);
--> statement-breakpoint
CREATE UNIQUE INDEX `email_idx` ON `users` (`personal_email`);
