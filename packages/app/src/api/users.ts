import { api } from "@/core/api";
import { queryOptions } from "@tanstack/react-query";
import { Brand } from "ts-brand";

export type UserId = Brand<number, "userId">;

export interface Me {
  id: UserId;
  phone_number: string;
  username: string;
  nickname: string;
  email: string;
  profile_image: string;
  agree_rule: boolean;
  agree_marketing: boolean;
  categories: {
    name: string;
    order: number;
    id: number;
    image_path: string;
    tags: [];
  }[];
  small_image: string;
  created_at: string;
  updated_at: string;
}

export const meQuery = queryOptions({
  queryKey: ["me"],
  queryFn: () => api.get("/my"),
});
