import { serve } from "@hono/node-server";
import { app } from "./app.js";

import { migrate } from "drizzle-orm/libsql/migrator";
import { db } from "./db/index.js";

const PORT = 3000;

migrate(db, { migrationsFolder: `migrations` }).then(() => {
  console.log(
    `Server is running on \x1b[4m\x1b[34mhttp://localhost:${PORT}\x1b[0m`,
  );

  serve({ fetch: app.fetch, port: PORT });
});
