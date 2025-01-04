import "dotenv/config";
import { z } from "zod";

export const env = z
  .object({
    DB_URL: z.string(),
    DB_AUTH_TOKEN: z.string().optional(),
    SECRET_KEY: z.string(),
  })
  .parse(process.env);
