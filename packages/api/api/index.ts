import { app } from "../src/app";
import { handle } from "hono/vercel";

export default handle(app);
