import { app } from "../src/app.js";
import { handle } from "hono/vercel";

export default handle(app);
