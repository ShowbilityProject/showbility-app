import { compilerOptions } from "../tsconfig.json";
import { register } from "tsconfig-paths";

register({
  baseUrl: compilerOptions.baseUrl,
  paths: compilerOptions.paths,
});

import { app } from "@/app.js";
import { handle } from "hono/vercel";

export default handle(app);
