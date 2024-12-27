import { Hono } from "hono";

import { auth } from "./auth.js";

const app = new Hono().basePath("/api").route("/auth", auth);

export { app };
