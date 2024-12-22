import { Hono } from "hono";
import { db } from "@/server/db";

import { auth } from "@/server/db/schema/auth";

const app = new Hono().basePath("/api");

app.get("/", async c => {
  const result = await db.select().from(auth);

  return c.json({ message: "Hello Hono!", result });
});

export { app };
