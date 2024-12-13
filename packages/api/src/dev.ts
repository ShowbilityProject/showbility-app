import { serve } from "@hono/node-server";
import { app } from "./app";

import { migrate } from "drizzle-orm/libsql/migrator";
import { db } from "./db";

const port = 3000;

console.log(`Server is running on http://localhost:${port}`);

migrate(db, { migrationsFolder: `migrations` }).then(() =>
  serve({
    fetch: app.fetch,
    port,
  }),
);
