import { int, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const auth = sqliteTable("users_table", {
  id: int().primaryKey({ autoIncrement: true }),
  email: text().unique(),
  kakaoId: text().unique(),
  appleId: text().unique(),
});
