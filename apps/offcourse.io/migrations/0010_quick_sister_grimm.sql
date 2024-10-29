CREATE TABLE `curated` (
	`courseId` text PRIMARY KEY NOT NULL,
	`bookmarked_at` integer NOT NULL
);
--> statement-breakpoint
DROP INDEX IF EXISTS `bookmark_courseId_unique`;