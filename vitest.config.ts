import { defineConfig } from "vitest/config";
import { fileURLToPath } from "node:url";
import { searchIndexPlugin } from "./search-index-plugin";

export default defineConfig({
  plugins: [searchIndexPlugin()],
  resolve: { alias: { "@": fileURLToPath(new URL("./src", import.meta.url)) } },
  test: { include: ["src/**/*.test.{ts,tsx}"], environment: "node" },
});
