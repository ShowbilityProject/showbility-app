import { Hono } from "hono";
import { db } from "@/db";

import { migrate } from "drizzle-orm/libsql/migrator";
import { auth } from "./db/schema/auth.js";

const app = new Hono().basePath("/api");

app.get("/", async c => {
  const result = await db.select().from(auth);

  return c.json({ message: "Hello Hono!", result });
});

export { app };
