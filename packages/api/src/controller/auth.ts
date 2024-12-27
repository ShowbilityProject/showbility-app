import { zValidator } from "@hono/zod-validator";
import { Hono } from "hono";
import { z } from "zod";
import { db } from "../db/index.js";
import { userAuth, users } from "../db/schema/users.js";
import { eq } from "drizzle-orm";

type AuthResponse =
  | { isRegistered: true; token: string }
  | { isRegistered: false; registerToken: string; prefill: { name?: string } };

const auth = new Hono()
  /**
   * 이메일 로그인
   */
  .post(
    "/email",
    zValidator("json", z.object({ token: z.string() })),
    async c => {
      const email = "";

      const user = await db
        .insert(userAuth)
        .values({
          email,
        })
        .onConflictDoUpdate({ target: [userAuth.email], set: { email } })
        .returning();

      // const user = await db
      //   .select()
      //   .from(userAuth)
      //   .where(eq(userAuth.email, ""))
      //   .leftJoin(users, eq(userAuth.id, users.authId))
      //   .get();

      return c.json<AuthResponse>({ isRegistered: true, token: "qwer" });
    },
  )

  /**
   * 카카오 로그인
   * */
  .post("/kakao", async c => {
    return c.json({});
  })

  /**
   * 애플 로그인
   */
  .post("/apple", async c => {
    return c.json({});
  });

export { auth };
