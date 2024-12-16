import "dotenv/config";
import { defineConfig } from "drizzle-kit";
import { env } from "./src/env.js";

export default defineConfig({
  out: "./migrations",
  schema: "./src/db/schema.ts",
  dialect: "turso",
  dbCredentials: {
    url: env.DB_URL,
    authToken: env.DB_AUTH_TOKEN,
  },
});
