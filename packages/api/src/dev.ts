import { serve } from "@hono/node-server";
import { app } from "./app.js";

import { migrate } from "drizzle-orm/libsql/migrator";
import { db } from "./db.js";

const port = 3000;

console.log(`Server is running on http://localhost:${port}`);

migrate(db, { migrationsFolder: `migrations` }).then(() =>
  serve({
    fetch: app.fetch,
    port,
  }),
);
