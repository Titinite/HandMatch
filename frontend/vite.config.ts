import { fileURLToPath, URL } from "node:url";

import vue from "@vitejs/plugin-vue";
import { defineConfig } from "vitest/config";

export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: { "@": fileURLToPath(new URL("./src", import.meta.url)) },
  },
  server: {
    host: "0.0.0.0",
    port: 5173,
    strictPort: true,
    // En développement (Docker), les appels /api sont relayés vers le service backend.
    proxy: { "/api": { target: "http://backend:3000", changeOrigin: true } },
  },
  test: {
    environment: "jsdom",
    include: ["src/**/*.test.ts"],
  },
});
