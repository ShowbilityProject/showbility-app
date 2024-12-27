import { defineConfig } from "drizzle-kit";
import { env } from "./src/core/env";

export default defineConfig({
  out: "./migrations",
  schema: "./src/db/schema/*",
  dialect: "turso",
  casing: "snake_case",
  dbCredentials: {
    url: env.DB_URL,
    authToken: env.DB_AUTH_TOKEN,
  },
});
