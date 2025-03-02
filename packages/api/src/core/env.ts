import "dotenv/config";
import { z } from "zod";

export const env = z
  .object({
    DB_URL: z.string(),
    DB_AUTH_TOKEN: z.string().optional(),
  })
  .parse(process.env);
