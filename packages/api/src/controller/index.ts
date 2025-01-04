import { Hono } from "hono";

import { authController } from "./auth.js";
import { userController } from "./user.js";

const app = new Hono()
  .basePath("/api")
  .route("/auth", authController)
  .route("/user", userController);

export { app };
