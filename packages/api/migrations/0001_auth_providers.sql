CREATE TABLE `user_auth_providers` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`verified_email` text,
	`kakao_id` text,
	`apple_id` text,
	`user_id` integer,
	FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE UNIQUE INDEX `user_auth_providers_verifiedEmail_unique` ON `user_auth_providers` (`verified_email`);--> statement-breakpoint
CREATE UNIQUE INDEX `user_auth_providers_kakaoId_unique` ON `user_auth_providers` (`kakao_id`);--> statement-breakpoint
CREATE UNIQUE INDEX `user_auth_providers_appleId_unique` ON `user_auth_providers` (`apple_id`);--> statement-breakpoint
CREATE UNIQUE INDEX `email_idx` ON `user_auth_providers` (`verified_email`);--> statement-breakpoint
CREATE UNIQUE INDEX `kakao_idx` ON `user_auth_providers` (`kakao_id`);--> statement-breakpoint
CREATE UNIQUE INDEX `apple_idx` ON `user_auth_providers` (`apple_id`);--> statement-breakpoint
DROP TABLE `signup_verification_codes`;--> statement-breakpoint
DROP TABLE `users_table`;--> statement-breakpoint
DROP TABLE `verification_codes`;--> statement-breakpoint
DROP INDEX `idx_apple_id`;--> statement-breakpoint
DROP INDEX `idx_kakao_id`;--> statement-breakpoint
ALTER TABLE `users` DROP COLUMN `email`;--> statement-breakpoint
ALTER TABLE `users` DROP COLUMN `hashed_password`;--> statement-breakpoint
ALTER TABLE `users` DROP COLUMN `login_type`;--> statement-breakpoint
ALTER TABLE `users` DROP COLUMN `kakao_id`;--> statement-breakpoint
ALTER TABLE `users` DROP COLUMN `apple_id`;