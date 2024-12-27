CREATE TABLE `category` (
	`id` integer PRIMARY KEY NOT NULL,
	`name` text(20) NOT NULL,
	`image_path` text,
	`order` integer
);
--> statement-breakpoint
CREATE INDEX `ix_category_id` ON `category` (`id`);--> statement-breakpoint
CREATE TABLE `category_tags` (
	`category_id` integer NOT NULL,
	`tag_id` integer NOT NULL,
	PRIMARY KEY(`category_id`, `tag_id`),
	FOREIGN KEY (`category_id`) REFERENCES `category`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`tag_id`) REFERENCES `tags`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `comment` (
	`id` integer PRIMARY KEY NOT NULL,
	`author_id` integer NOT NULL,
	`content_id` integer NOT NULL,
	`parent_id` integer,
	`detail` text NOT NULL,
	`is_delete` numeric,
	`depth` integer,
	`created_at` numeric,
	`updated_at` numeric,
	FOREIGN KEY (`author_id`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`content_id`) REFERENCES `content`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`parent_id`) REFERENCES `comment`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE INDEX `ix_comment_id` ON `comment` (`id`);--> statement-breakpoint
CREATE TABLE `comment_likes` (
	`user_id` integer NOT NULL,
	`comment_id` integer NOT NULL,
	PRIMARY KEY(`user_id`, `comment_id`),
	FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`comment_id`) REFERENCES `comment`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `content` (
	`id` integer PRIMARY KEY NOT NULL,
	`user_id` integer NOT NULL,
	`title` text(100) NOT NULL,
	`detail` text,
	`views` integer,
	`share_count` integer,
	`is_delete` numeric,
	`created_at` numeric,
	`updated_at` numeric,
	FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE INDEX `ix_content_id` ON `content` (`id`);--> statement-breakpoint
CREATE TABLE `content_categories` (
	`content_id` integer NOT NULL,
	`category_id` integer NOT NULL,
	PRIMARY KEY(`content_id`, `category_id`),
	FOREIGN KEY (`content_id`) REFERENCES `content`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`category_id`) REFERENCES `category`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `content_liked_users` (
	`content_id` integer NOT NULL,
	`user_id` integer NOT NULL,
	PRIMARY KEY(`content_id`, `user_id`),
	FOREIGN KEY (`content_id`) REFERENCES `content`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `content_tags` (
	`content_id` integer NOT NULL,
	`tag_id` integer NOT NULL,
	PRIMARY KEY(`content_id`, `tag_id`),
	FOREIGN KEY (`content_id`) REFERENCES `content`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`tag_id`) REFERENCES `tags`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `followers_following` (
	`follower_id` integer NOT NULL,
	`following_id` integer NOT NULL,
	PRIMARY KEY(`follower_id`, `following_id`),
	FOREIGN KEY (`follower_id`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE cascade,
	FOREIGN KEY (`following_id`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE TABLE `image` (
	`id` integer PRIMARY KEY NOT NULL,
	`owner_id` integer,
	`content_id` integer,
	`width` integer,
	`height` integer,
	`original_image_path` text NOT NULL,
	`order_in_content` integer,
	`middle_image_path` text,
	`middle_width` integer,
	`middle_height` integer,
	`small_image_path` text,
	`small_width` integer,
	`small_height` integer,
	FOREIGN KEY (`owner_id`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`content_id`) REFERENCES `content`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE INDEX `ix_image_id` ON `image` (`id`);--> statement-breakpoint
CREATE TABLE `signup_verification_codes` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`email` text NOT NULL,
	`code` text(6) NOT NULL,
	`created_at` numeric DEFAULT (CURRENT_TIMESTAMP),
	`expires_at` numeric NOT NULL,
	`is_valid` numeric DEFAULT '1'
);
--> statement-breakpoint
CREATE TABLE `tags` (
	`id` integer PRIMARY KEY NOT NULL,
	`name` text(20),
	`section` text(20)
);
--> statement-breakpoint
CREATE INDEX `ix_tags_id` ON `tags` (`id`);--> statement-breakpoint
CREATE TABLE `user_categories` (
	`user_id` integer NOT NULL,
	`category_id` integer NOT NULL,
	PRIMARY KEY(`user_id`, `category_id`),
	FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE cascade,
	FOREIGN KEY (`category_id`) REFERENCES `category`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE TABLE `user_tags` (
	`user_id` integer NOT NULL,
	`tag_id` integer NOT NULL,
	PRIMARY KEY(`user_id`, `tag_id`),
	FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE cascade,
	FOREIGN KEY (`tag_id`) REFERENCES `tags`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE TABLE `users` (
	`id` integer PRIMARY KEY NOT NULL,
	`phone_number` text(13) NOT NULL,
	`username` text(50) NOT NULL,
	`url` text(500),
	`description` text(1000),
	`nickname` text(20) NOT NULL,
	`email` text NOT NULL,
	`hashed_password` text NOT NULL,
	`agree_rule` numeric,
	`agree_marketing` numeric,
	`created_at` numeric DEFAULT (CURRENT_TIMESTAMP),
	`updated_at` numeric,
	`login_type` text(5),
	`profile_image` text,
	`small_image` text,
	`kakao_id` text,
	`apple_id` text
);
--> statement-breakpoint
CREATE UNIQUE INDEX `idx_apple_id` ON `users` (`apple_id`);--> statement-breakpoint
CREATE UNIQUE INDEX `idx_kakao_id` ON `users` (`kakao_id`);--> statement-breakpoint
CREATE TABLE `users_table` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`name` text NOT NULL,
	`age` integer NOT NULL,
	`email` text NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `users_table_email_unique` ON `users_table` (`email`);--> statement-breakpoint
CREATE TABLE `verification_codes` (
	`id` integer PRIMARY KEY NOT NULL,
	`user_id` integer NOT NULL,
	`code` text(6) NOT NULL,
	`created_at` numeric,
	`verified` numeric,
	`auth_hash` text(39),
	`is_valid` numeric,
	FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE INDEX `ix_verification_codes_id` ON `verification_codes` (`id`);--> statement-breakpoint
CREATE TABLE `withdraw_users` (
	`id` integer PRIMARY KEY NOT NULL,
	`old_id` integer NOT NULL,
	`username` text(50) NOT NULL,
	`created_at` numeric DEFAULT (CURRENT_TIMESTAMP),
	`updated_at` numeric
);
--> statement-breakpoint
CREATE INDEX `ix_withdraw_users_id` ON `withdraw_users` (`id`);