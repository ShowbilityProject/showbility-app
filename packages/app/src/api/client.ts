import ky from "ky";
import { tokenStore } from "@/utils/tokenStore";

export const api = ky.create({
  prefixUrl: "https://dev.showbility.vercel.app/",
  hooks: {
    beforeRequest: [
      async req => {
        const authToken = await tokenStore.getToken();
        if (authToken) {
          req.headers.set("X-Auth-Token", authToken);
        }
      },
    ],
  },
});
