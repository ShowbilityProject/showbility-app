import { sqliteTable, AnySQLiteColumn, index, integer, text, foreignKey, primaryKey, numeric, uniqueIndex } from "drizzle-orm/sqlite-core"
  import { sql } from "drizzle-orm"

export const tags = sqliteTable("tags", {
	id: integer().primaryKey().notNull(),
	name: text({ length: 20 }),
	section: text({ length: 20 }),
},
(table) => [
	index("ix_tags_id").on(table.id),
]);

export const category = sqliteTable("category", {
	id: integer().primaryKey().notNull(),
	name: text({ length: 20 }).notNull(),
	imagePath: text("image_path"),
	order: integer(),
},
(table) => [
	index("ix_category_id").on(table.id),
]);

export const userTags = sqliteTable("user_tags", {
	userId: integer("user_id").notNull().references(() => users.id, { onDelete: "cascade" } ),
	tagId: integer("tag_id").notNull().references(() => tags.id, { onDelete: "cascade" } ),
},
(table) => [
	primaryKey({ columns: [table.userId, table.tagId], name: "user_tags_user_id_tag_id_pk"})
]);

export const categoryTags = sqliteTable("category_tags", {
	categoryId: integer("category_id").notNull().references(() => category.id),
	tagId: integer("tag_id").notNull().references(() => tags.id),
},
(table) => [
	primaryKey({ columns: [table.categoryId, table.tagId], name: "category_tags_category_id_tag_id_pk"})
]);

export const followersFollowing = sqliteTable("followers_following", {
	followerId: integer("follower_id").notNull().references(() => users.id, { onDelete: "cascade" } ),
	followingId: integer("following_id").notNull().references(() => users.id, { onDelete: "cascade" } ),
},
(table) => [
	primaryKey({ columns: [table.followerId, table.followingId], name: "followers_following_follower_id_following_id_pk"})
]);

export const verificationCodes = sqliteTable("verification_codes", {
	id: integer().primaryKey().notNull(),
	userId: integer("user_id").notNull().references(() => users.id, { onDelete: "cascade" } ),
	code: text({ length: 6 }).notNull(),
	createdAt: numeric("created_at"),
	verified: numeric(),
	authHash: text("auth_hash", { length: 39 }),
	isValid: numeric("is_valid"),
},
(table) => [
	index("ix_verification_codes_id").on(table.id),
]);

export const content = sqliteTable("content", {
	id: integer().primaryKey().notNull(),
	userId: integer("user_id").notNull().references(() => users.id),
	title: text({ length: 100 }).notNull(),
	detail: text(),
	views: integer(),
	shareCount: integer("share_count"),
	isDelete: numeric("is_delete"),
	createdAt: numeric("created_at"),
	updatedAt: numeric("updated_at"),
},
(table) => [
	index("ix_content_id").on(table.id),
]);

export const contentLikedUsers = sqliteTable("content_liked_users", {
	contentId: integer("content_id").notNull().references(() => content.id),
	userId: integer("user_id").notNull().references(() => users.id),
},
(table) => [
	primaryKey({ columns: [table.contentId, table.userId], name: "content_liked_users_content_id_user_id_pk"})
]);

export const contentTags = sqliteTable("content_tags", {
	contentId: integer("content_id").notNull().references(() => content.id),
	tagId: integer("tag_id").notNull().references(() => tags.id),
},
(table) => [
	primaryKey({ columns: [table.contentId, table.tagId], name: "content_tags_content_id_tag_id_pk"})
]);

export const contentCategories = sqliteTable("content_categories", {
	contentId: integer("content_id").notNull().references(() => content.id),
	categoryId: integer("category_id").notNull().references(() => category.id),
},
(table) => [
	primaryKey({ columns: [table.contentId, table.categoryId], name: "content_categories_content_id_category_id_pk"})
]);

export const comment = sqliteTable("comment", {
	id: integer().primaryKey().notNull(),
	authorId: integer("author_id").notNull().references(() => users.id),
	contentId: integer("content_id").notNull().references(() => content.id),
	parentId: integer("parent_id"),
	detail: text().notNull(),
	isDelete: numeric("is_delete"),
	depth: integer(),
	createdAt: numeric("created_at"),
	updatedAt: numeric("updated_at"),
},
(table) => [
	index("ix_comment_id").on(table.id),
	foreignKey(() => ({
			columns: [table.parentId],
			foreignColumns: [table.id],
			name: "comment_parent_id_comment_id_fk"
		})),
]);

export const image = sqliteTable("image", {
	id: integer().primaryKey().notNull(),
	ownerId: integer("owner_id").references(() => users.id),
	contentId: integer("content_id").references(() => content.id),
	width: integer(),
	height: integer(),
	originalImagePath: text("original_image_path").notNull(),
	orderInContent: integer("order_in_content"),
	middleImagePath: text("middle_image_path"),
	middleWidth: integer("middle_width"),
	middleHeight: integer("middle_height"),
	smallImagePath: text("small_image_path"),
	smallWidth: integer("small_width"),
	smallHeight: integer("small_height"),
},
(table) => [
	index("ix_image_id").on(table.id),
]);

export const commentLikes = sqliteTable("comment_likes", {
	userId: integer("user_id").notNull().references(() => users.id),
	commentId: integer("comment_id").notNull().references(() => comment.id),
},
(table) => [
	primaryKey({ columns: [table.userId, table.commentId], name: "comment_likes_user_id_comment_id_pk"})
]);

export const users = sqliteTable("users", {
	id: integer().primaryKey().notNull(),
	phoneNumber: text("phone_number", { length: 13 }).notNull(),
	username: text({ length: 50 }).notNull(),
	url: text({ length: 500 }),
	description: text({ length: 1000 }),
	nickname: text({ length: 20 }).notNull(),
	email: text().notNull(),
	hashedPassword: text("hashed_password").notNull(),
	agreeRule: numeric("agree_rule"),
	agreeMarketing: numeric("agree_marketing"),
	createdAt: numeric("created_at").default(sql`(CURRENT_TIMESTAMP)`),
	updatedAt: numeric("updated_at"),
	loginType: text("login_type", { length: 5 }),
	profileImage: text("profile_image"),
	smallImage: text("small_image"),
	kakaoId: text("kakao_id"),
	appleId: text("apple_id"),
},
(table) => [
	uniqueIndex("idx_apple_id").on(table.appleId),
	uniqueIndex("idx_kakao_id").on(table.kakaoId),
]);

export const withdrawUsers = sqliteTable("withdraw_users", {
	id: integer().primaryKey().notNull(),
	oldId: integer("old_id").notNull(),
	username: text({ length: 50 }).notNull(),
	createdAt: numeric("created_at").default(sql`(CURRENT_TIMESTAMP)`),
	updatedAt: numeric("updated_at"),
},
(table) => [
	index("ix_withdraw_users_id").on(table.id),
]);

export const userCategories = sqliteTable("user_categories", {
	userId: integer("user_id").notNull().references(() => users.id, { onDelete: "cascade" } ),
	categoryId: integer("category_id").notNull().references(() => category.id, { onDelete: "cascade" } ),
},
(table) => [
	primaryKey({ columns: [table.userId, table.categoryId], name: "user_categories_user_id_category_id_pk"})
]);

export const signupVerificationCodes = sqliteTable("signup_verification_codes", {
	id: integer().primaryKey({ autoIncrement: true }),
	email: text().notNull(),
	code: text({ length: 6 }).notNull(),
	createdAt: numeric("created_at").default(sql`(CURRENT_TIMESTAMP)`),
	expiresAt: numeric("expires_at").notNull(),
	isValid: numeric("is_valid").default(1),
});

export const usersTable = sqliteTable("users_table", {
	id: integer().primaryKey({ autoIncrement: true }).notNull(),
	name: text().notNull(),
	age: integer().notNull(),
	email: text().notNull(),
},
(table) => [
	uniqueIndex("users_table_email_unique").on(table.email),
]);

export const drizzleMigrations = sqliteTable("__drizzle_migrations", {
});

