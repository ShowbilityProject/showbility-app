import {
  sqliteTable,
  index,
  integer,
  text,
  foreignKey,
  primaryKey,
  numeric,
  uniqueIndex,
} from "drizzle-orm/sqlite-core";
import { sql } from "drizzle-orm";

export const tags = sqliteTable(
  "tags",
  {
    id: integer().primaryKey().notNull(),
    name: text({ length: 20 }),
    section: text({ length: 20 }),
  },
  table => [index("ix_tags_id").on(table.id)],
);

export const category = sqliteTable(
  "category",
  {
    id: integer().primaryKey().notNull(),
    name: text({ length: 20 }).notNull(),
    imagePath: text(),
    order: integer(),
  },
  table => [index("ix_category_id").on(table.id)],
);

export const userTags = sqliteTable(
  "user_tags",
  {
    userId: integer()
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    tagId: integer()
      .notNull()
      .references(() => tags.id, { onDelete: "cascade" }),
  },
  table => [
    primaryKey({
      columns: [table.userId, table.tagId],
      name: "user_tags_user_id_tag_id_pk",
    }),
  ],
);

export const categoryTags = sqliteTable(
  "category_tags",
  {
    categoryId: integer()
      .notNull()
      .references(() => category.id),
    tagId: integer()
      .notNull()
      .references(() => tags.id),
  },
  table => [
    primaryKey({
      columns: [table.categoryId, table.tagId],
      name: "category_tags_category_id_tag_id_pk",
    }),
  ],
);

export const followersFollowing = sqliteTable(
  "followers_following",
  {
    followerId: integer()
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    followingId: integer()
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
  },
  table => [
    primaryKey({
      columns: [table.followerId, table.followingId],
      name: "followers_following_follower_id_following_id_pk",
    }),
  ],
);

export const content = sqliteTable(
  "content",
  {
    id: integer().primaryKey().notNull(),
    userId: integer()
      .notNull()
      .references(() => users.id),
    title: text({ length: 100 }).notNull(),
    detail: text(),
    views: integer(),
    shareCount: integer(),
    isDelete: numeric(),
    createdAt: numeric(),
    updatedAt: numeric(),
  },
  table => [index("ix_content_id").on(table.id)],
);

export const contentLikedUsers = sqliteTable(
  "content_liked_users",
  {
    contentId: integer()
      .notNull()
      .references(() => content.id),
    userId: integer()
      .notNull()
      .references(() => users.id),
  },
  table => [
    primaryKey({
      columns: [table.contentId, table.userId],
      name: "content_liked_users_content_id_user_id_pk",
    }),
  ],
);

export const contentTags = sqliteTable(
  "content_tags",
  {
    contentId: integer()
      .notNull()
      .references(() => content.id),
    tagId: integer()
      .notNull()
      .references(() => tags.id),
  },
  table => [
    primaryKey({
      columns: [table.contentId, table.tagId],
      name: "content_tags_content_id_tag_id_pk",
    }),
  ],
);

export const contentCategories = sqliteTable(
  "content_categories",
  {
    contentId: integer()
      .notNull()
      .references(() => content.id),
    categoryId: integer()
      .notNull()
      .references(() => category.id),
  },
  table => [
    primaryKey({
      columns: [table.contentId, table.categoryId],
      name: "content_categories_content_id_category_id_pk",
    }),
  ],
);

export const comment = sqliteTable(
  "comment",
  {
    id: integer().primaryKey().notNull(),
    authorId: integer()
      .notNull()
      .references(() => users.id),
    contentId: integer()
      .notNull()
      .references(() => content.id),
    parentId: integer(),
    detail: text().notNull(),
    isDelete: numeric(),
    depth: integer(),
    createdAt: numeric(),
    updatedAt: numeric(),
  },
  table => [
    index("ix_comment_id").on(table.id),
    foreignKey(() => ({
      columns: [table.parentId],
      foreignColumns: [table.id],
      name: "comment_parent_id_comment_id_fk",
    })),
  ],
);

export const image = sqliteTable(
  "image",
  {
    id: integer().primaryKey().notNull(),
    ownerId: integer().references(() => users.id),
    contentId: integer().references(() => content.id),
    width: integer(),
    height: integer(),
    originalImagePath: text().notNull(),
    orderInContent: integer(),
    middleImagePath: text(),
    middleWidth: integer(),
    middleHeight: integer(),
    smallImagePath: text(),
    smallWidth: integer(),
    smallHeight: integer(),
  },
  table => [index("ix_image_id").on(table.id)],
);

export const commentLikes = sqliteTable(
  "comment_likes",
  {
    userId: integer()
      .notNull()
      .references(() => users.id),
    commentId: integer()
      .notNull()
      .references(() => comment.id),
  },
  table => [
    primaryKey({
      columns: [table.userId, table.commentId],
      name: "comment_likes_user_id_comment_id_pk",
    }),
  ],
);

export const users = sqliteTable("users", {
  id: integer().primaryKey().notNull(),
  phoneNumber: text({ length: 13 }).notNull(),
  username: text({ length: 50 }).notNull(),
  url: text({ length: 500 }),
  description: text({ length: 1000 }),
  nickname: text({ length: 20 }).notNull(),
  agreeRule: numeric(),
  agreeMarketing: numeric(),
  createdAt: numeric().default(sql`(CURRENT_TIMESTAMP)`),
  updatedAt: numeric(),
  profileImage: text(),
  smallImage: text(),
});

export const withdrawUsers = sqliteTable(
  "withdraw_users",
  {
    id: integer().primaryKey().notNull(),
    oldId: integer().notNull(),
    username: text({ length: 50 }).notNull(),
    createdAt: numeric().default(sql`(CURRENT_TIMESTAMP)`),
    updatedAt: numeric(),
  },
  table => [index("ix_withdraw_users_id").on(table.id)],
);

export const userCategories = sqliteTable(
  "user_categories",
  {
    userId: integer()
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    categoryId: integer()
      .notNull()
      .references(() => category.id, { onDelete: "cascade" }),
  },
  table => [
    primaryKey({
      columns: [table.userId, table.categoryId],
      name: "user_categories_user_id_category_id_pk",
    }),
  ],
);
