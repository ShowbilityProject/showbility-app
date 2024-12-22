import { drizzle } from "drizzle-orm/libsql/node";
import { env } from "@/env";
import { createClient } from "@libsql/client/web";

const client = createClient({
  url: env.DB_URL,
  authToken: env.DB_AUTH_TOKEN,
});

export const db = drizzle(client);
