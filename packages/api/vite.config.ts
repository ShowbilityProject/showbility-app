import { defineConfig } from "vite";

import devServer from "@hono/vite-dev-server";
import nodeAdapter from "@hono/vite-dev-server/node";
import build from "@hono/vite-build/node";

import vercel from "vite-plugin-vercel";
import tsconfigPaths from "vite-tsconfig-paths";

const entry = "./src/index.ts";

export default defineConfig({
  build: {
    rollupOptions: { external: ["@libsql/client"] },
  },
  plugins: [
    tsconfigPaths(),
    devServer({ entry: "./src/dev.ts", adapter: nodeAdapter }),
    build({ entry }),
    vercel(),
  ],
});
