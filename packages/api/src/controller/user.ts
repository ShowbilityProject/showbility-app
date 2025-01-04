import { zValidator } from "@hono/zod-validator";
import { Hono } from "hono";
import { users } from "../db/schema/generated/schema.js";
import { z } from "zod";
import { createUserToken, verifyRegisterToken } from "../core/auth.js";
import { db } from "../db/index.js";
import { userAuth } from "../db/schema/auth.js";
import { eq } from "drizzle-orm";

const userController = new Hono().post(
  "/register",
  zValidator(
    "json",
    z.object({
      registerToken: z.string(),
      user: z.object({
        phoneNumber: z.string().max(13),
        username: z.string().max(50),
        url: z.string().max(500).optional(),
        description: z.string().max(5000).optional(),
        nickname: z.string().max(20),
        agreeRule: z.boolean().transform(v => (v ? "1" : "0")),
        agreeMarketing: z.boolean().transform(v => (v ? "1" : "0")),
        profileImage: z.string().optional(),
        smallImage: z.string().optional(),
      }),
    }),
  ),
  async c => {
    const { user, registerToken } = c.req.valid("json");

    const authId = await verifyRegisterToken(registerToken);

    const userId = await db.transaction(async tx => {
      const { userId } = await tx
        .insert(users)
        .values(user)
        .returning({ userId: users.id })
        .get();
      await tx.update(userAuth).set({ userId }).where(eq(userAuth.id, authId));
      return userId;
    });

    return c.json({ token: await createUserToken(userId) });
  },
);

export { userController };
