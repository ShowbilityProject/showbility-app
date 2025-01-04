import { zValidator } from "@hono/zod-validator";
import { Hono } from "hono";
import { z } from "zod";
import { db } from "../db/index.js";
import { userAuth } from "../db/schema/auth.js";
import {
  createEmailValidationToken,
  createRegisterToken,
  createUserToken,
  verifyEmailValidationToken,
} from "../core/auth.js";
import { validator } from "hono/validator";

type AuthResponse =
  | { isRegistered: true; token: string }
  | { isRegistered: false; registerToken: string; prefill: { name?: string } };

const authController = new Hono()
  .post(
    "/test/nothing",

    async c => {
      console.log(await c.req.text());
      return c.json({ message: "test" });
    },
  )
  .post(
    "/test/plain",
    validator("json", (value, c) => {
      console.log("validator", value);
      return value;
    }),
    c => c.json({ message: "test" }),
  )
  .post("/test", zValidator("json", z.object({ email: z.string() })), c =>
    c.json({ message: "test" }),
  )
  .post(
    "/email/send",
    zValidator("json", z.object({ email: z.string().email() })),
    async c => {
      console.log("email/send");
      const { email } = c.req.valid("json");

      console.log({ email });
      const emailToken = await createEmailValidationToken(email);
      console.log({ emailToken });

      return c.json({ token: emailToken });
    },
  )
  /**
   * 이메일 로그인
   */
  .post(
    "/email",
    zValidator("json", z.object({ token: z.string() })),
    async c => {
      const { token } = c.req.valid("json");

      const verifiedEmail = await verifyEmailValidationToken(token);

      const auth = await db
        .insert(userAuth)
        .values({
          verifiedEmail,
        })
        .onConflictDoUpdate({
          target: [userAuth.verifiedEmail],
          set: { verifiedEmail },
        })
        .returning()
        .get();

      if (auth.userId === null) {
        return c.json<AuthResponse>({
          isRegistered: false,
          registerToken: await createRegisterToken(auth.id),
          prefill: {},
        });
      }

      return c.json<AuthResponse>({
        isRegistered: true,
        token: await createUserToken(auth.userId),
      });
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

export { authController };
