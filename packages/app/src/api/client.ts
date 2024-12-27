import { hc } from "hono/client";
import { AppType } from "@showbility/api";

export const { api } = hc<AppType>("https://localhost:3000");
