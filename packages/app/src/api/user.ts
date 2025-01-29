import { queryOptions } from "@tanstack/react-query";
import { api } from "./client";
import { CreateUser, UserSelf, UserSelfWithToken, Status } from "@/types";

export const loginStatus = queryOptions({
  queryKey: ["user", "token"],
  queryFn: () => api.get<boolean>("users/me/token-valid").json(),
});

export const meQuery = queryOptions({
  queryKey: ["users", "me"],
  queryFn: () => api.get<UserSelf>("users/me").json(),
});

export const registerUser = (body: {
  registerToken: string;
  user: CreateUser;
}) => api.post<UserSelfWithToken>("users/", { json: body }).json();
