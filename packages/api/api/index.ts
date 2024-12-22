import { app } from "@/app";
import { handle } from "@hono/node-server/vercel";

export default handle(app);
