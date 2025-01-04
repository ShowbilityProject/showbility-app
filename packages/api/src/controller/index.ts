import { Hono } from "hono";

import { authController } from "./auth.js";
import { userController } from "./user.js";

const app = new Hono()
  .basePath("/api")
  .get("/", c => c.json({ hello: "world" }))
  .route("/auth", authController)
  .route("/user", userController);

export { app };
