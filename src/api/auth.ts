import { Nullable } from "@/utils/nullable";
import { api } from "./client";

export interface PrefillCreateUser {
  name: Nullable<string>;
  nickname: Nullable<string>;
  profileImage: Nullable<string>;
}

export interface RegisteredAuthResponse {
  isRegistered: true;
  token: string;
}

export interface UnregisteredAuthResponse {
  isRegistered: false;
  registerToken: string;
  prefill: PrefillCreateUser;
}

type AuthResponse = RegisteredAuthResponse | UnregisteredAuthResponse;

export const authenticateKakao = (accessToken: string) =>
  api.post<AuthResponse>("auth/kakao", { json: { accessToken } }).json();
