import "tsconfig-paths/register.js";

import { app } from "@/app.js";
import { handle } from "hono/vercel";

export default handle(app);
