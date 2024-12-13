import { Hono } from "hono";
import { db } from "./db.js";
import { users } from "@/db/schema.js";

import { migrate } from "drizzle-orm/libsql/migrator";

export const config = {
  runtime: "edge",
};

const app = new Hono().basePath("/api");

app.get("/", async c => {
  const result = await db.select().from(users);

  return c.json({ message: "Hello Hono!", result });
});

export { app };
