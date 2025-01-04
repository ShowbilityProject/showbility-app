import { Hono } from "hono";

import { authController } from "./auth.js";
import { userController } from "./user.js";
import { logger } from "hono/logger";

const app = new Hono()
  .use(logger())
  .basePath("/api")
  .get("/", c => c.json({ hello: "world" }))
  .route("/auth", authController)
  .route("/user", userController);

export { app };
