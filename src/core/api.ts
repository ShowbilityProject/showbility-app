import ky from "ky";

export const api = ky.extend({
  prefixUrl: "https://dev.showbility.vercel.app",
});
