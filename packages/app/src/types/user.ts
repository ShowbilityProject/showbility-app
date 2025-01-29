import { Nullable } from "@/utils/nullable";
import { Brand } from "ts-brand";

export type UserId = Brand<number, "userId">;

export type Gender = "male" | "female" | "other";

export interface UserBase {
  name: string;
  /** @max 1000 */
  description: Nullable<string>;
  /** @max 20 */
  nickname: string;
  profileImage: Nullable<string>;
}

export interface CreateUser extends UserBase {
  agreeRule: boolean;
  agreeMarketing: boolean;
  birth: string; // ISO date string format (to match Python's `date`)
  gender: Gender; // Assuming Gender is defined elsewhere
}

export interface User extends UserBase {
  id: UserId;
}

export type UserSelf = User;

export interface UserSelfWithToken extends UserSelf {
  token: string;
}
