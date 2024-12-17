import { drizzle } from "drizzle-orm/libsql";
import { env } from "./env.js";

export const db = drizzle({
  connection: {
    url: env.DB_URL,
    authToken: env.DB_AUTH_TOKEN,
  },
});
