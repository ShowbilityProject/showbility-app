import { sign, verify } from "hono/jwt";
import { env } from "./env.js";
import { z } from "zod";
import { HTTPException } from "hono/http-exception";

const timestamp = () => Math.floor(Date.now() / 1000);

const signToken = <T>(payload: T, expiry: number) =>
  sign(
    {
      ...payload,
      exp: timestamp() + expiry,
    },
    env.SECRET_KEY,
    "HS256",
  );

export const createEmailValidationToken = (email: string) =>
  signToken({ email, type: "email" }, 60 * 5);

export const createRegisterToken = (authId: number) =>
  signToken({ authId, type: "register" }, 60 * 5);

export const createUserToken = (userId: number) =>
  signToken({ sub: userId }, 60 * 60 * 24 * 30 * 3);

export const verifyEmailValidationToken = async (emailToken: string) => {
  try {
    const parsed = await verify(emailToken, env.SECRET_KEY, "HS256");

    const { exp, email } = await z
      .object({
        type: z.literal("email"),
        exp: z.number(),
        email: z.string().email(),
      })
      .parseAsync(parsed);

    if (exp < timestamp()) throw new Error("Token expired");
    return email;
  } catch {
    throw new HTTPException(401, { message: "Unauthorized" });
  }
};

export const verifyRegisterToken = async (registerToken: string) => {
  try {
    const parsed = await verify(registerToken, env.SECRET_KEY, "HS256");

    const { exp, authId } = await z
      .object({
        type: z.literal("register"),
        exp: z.number(),
        authId: z.coerce.number(),
      })
      .parseAsync(parsed);

    if (exp < timestamp()) throw new Error("Token expired");
    return authId;
  } catch {
    throw new HTTPException(401, { message: "Unauthorized" });
  }
};

export const verifyUserToken = async (userToken: string) => {
  try {
    const parsed = await verify(userToken, env.SECRET_KEY, "HS256");

    const { exp, sub: userId } = await z
      .object({
        exp: z.coerce.number(),
        sub: z.string(),
      })
      .parseAsync(parsed);

    if (exp < timestamp()) throw new Error("Token expired");
    return userId;
  } catch {
    throw new HTTPException(401, { message: "Unauthorized" });
  }
};
