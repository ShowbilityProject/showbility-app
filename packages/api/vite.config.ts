import { defineConfig } from "vite";

import devServer from "@hono/vite-dev-server";
import nodeAdapter from "@hono/vite-dev-server/node";
import build from "@hono/vite-build/node";

import vercel from "vite-plugin-vercel";

const entry = "./src/index.ts";

export default defineConfig({
  plugins: [
    devServer({ entry: "./src/dev.ts", adapter: nodeAdapter }),
    build({ entry }),
    vercel(),
  ],
});
