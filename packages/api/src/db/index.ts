import { drizzle } from "drizzle-orm/libsql/node";
import { env } from "../core/env.js";

export const db = drizzle({
  connection: {
    url: env.DB_URL,
    authToken: env.DB_AUTH_TOKEN,
  },
});
