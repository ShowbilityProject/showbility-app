import { int, sqliteTable, text, uniqueIndex } from "drizzle-orm/sqlite-core";
import { users } from "./generated/schema.js";

export const userAuth = sqliteTable(
  "user_auth_providers",
  {
    id: int().primaryKey({ autoIncrement: true }),
    verifiedEmail: text().unique(),
    kakaoId: text().unique(),
    appleId: text().unique(),
    userId: int().references(() => users.id),
  },
  table => [
    uniqueIndex("email_idx").on(table.verifiedEmail),
    uniqueIndex("kakao_idx").on(table.kakaoId),
    uniqueIndex("apple_idx").on(table.appleId),
  ],
);
