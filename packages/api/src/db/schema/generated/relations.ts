import { relations } from "drizzle-orm/relations";
import { tags, userTags, users, categoryTags, category, followersFollowing, verificationCodes, content, contentLikedUsers, contentTags, contentCategories, comment, image, commentLikes, userCategories } from "./schema";

export const userTagsRelations = relations(userTags, ({one}) => ({
	tag: one(tags, {
		fields: [userTags.tagId],
		references: [tags.id]
	}),
	user: one(users, {
		fields: [userTags.userId],
		references: [users.id]
	}),
}));

export const tagsRelations = relations(tags, ({many}) => ({
	userTags: many(userTags),
	categoryTags: many(categoryTags),
	contentTags: many(contentTags),
}));

export const usersRelations = relations(users, ({many}) => ({
	userTags: many(userTags),
	followersFollowings_followingId: many(followersFollowing, {
		relationName: "followersFollowing_followingId_users_id"
	}),
	followersFollowings_followerId: many(followersFollowing, {
		relationName: "followersFollowing_followerId_users_id"
	}),
	verificationCodes: many(verificationCodes),
	contents: many(content),
	contentLikedUsers: many(contentLikedUsers),
	comments: many(comment),
	images: many(image),
	commentLikes: many(commentLikes),
	userCategories: many(userCategories),
}));

export const categoryTagsRelations = relations(categoryTags, ({one}) => ({
	tag: one(tags, {
		fields: [categoryTags.tagId],
		references: [tags.id]
	}),
	category: one(category, {
		fields: [categoryTags.categoryId],
		references: [category.id]
	}),
}));

export const categoryRelations = relations(category, ({many}) => ({
	categoryTags: many(categoryTags),
	contentCategories: many(contentCategories),
	userCategories: many(userCategories),
}));

export const followersFollowingRelations = relations(followersFollowing, ({one}) => ({
	user_followingId: one(users, {
		fields: [followersFollowing.followingId],
		references: [users.id],
		relationName: "followersFollowing_followingId_users_id"
	}),
	user_followerId: one(users, {
		fields: [followersFollowing.followerId],
		references: [users.id],
		relationName: "followersFollowing_followerId_users_id"
	}),
}));

export const verificationCodesRelations = relations(verificationCodes, ({one}) => ({
	user: one(users, {
		fields: [verificationCodes.userId],
		references: [users.id]
	}),
}));

export const contentRelations = relations(content, ({one, many}) => ({
	user: one(users, {
		fields: [content.userId],
		references: [users.id]
	}),
	contentLikedUsers: many(contentLikedUsers),
	contentTags: many(contentTags),
	contentCategories: many(contentCategories),
	comments: many(comment),
	images: many(image),
}));

export const contentLikedUsersRelations = relations(contentLikedUsers, ({one}) => ({
	user: one(users, {
		fields: [contentLikedUsers.userId],
		references: [users.id]
	}),
	content: one(content, {
		fields: [contentLikedUsers.contentId],
		references: [content.id]
	}),
}));

export const contentTagsRelations = relations(contentTags, ({one}) => ({
	tag: one(tags, {
		fields: [contentTags.tagId],
		references: [tags.id]
	}),
	content: one(content, {
		fields: [contentTags.contentId],
		references: [content.id]
	}),
}));

export const contentCategoriesRelations = relations(contentCategories, ({one}) => ({
	category: one(category, {
		fields: [contentCategories.categoryId],
		references: [category.id]
	}),
	content: one(content, {
		fields: [contentCategories.contentId],
		references: [content.id]
	}),
}));

export const commentRelations = relations(comment, ({one, many}) => ({
	comment: one(comment, {
		fields: [comment.parentId],
		references: [comment.id],
		relationName: "comment_parentId_comment_id"
	}),
	comments: many(comment, {
		relationName: "comment_parentId_comment_id"
	}),
	content: one(content, {
		fields: [comment.contentId],
		references: [content.id]
	}),
	user: one(users, {
		fields: [comment.authorId],
		references: [users.id]
	}),
	commentLikes: many(commentLikes),
}));

export const imageRelations = relations(image, ({one}) => ({
	content: one(content, {
		fields: [image.contentId],
		references: [content.id]
	}),
	user: one(users, {
		fields: [image.ownerId],
		references: [users.id]
	}),
}));

export const commentLikesRelations = relations(commentLikes, ({one}) => ({
	comment: one(comment, {
		fields: [commentLikes.commentId],
		references: [comment.id]
	}),
	user: one(users, {
		fields: [commentLikes.userId],
		references: [users.id]
	}),
}));

export const userCategoriesRelations = relations(userCategories, ({one}) => ({
	category: one(category, {
		fields: [userCategories.categoryId],
		references: [category.id]
	}),
	user: one(users, {
		fields: [userCategories.userId],
		references: [users.id]
	}),
}));