import { app } from "@/app";
import { handle } from "hono/vercel";

export default handle(app);
