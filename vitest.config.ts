import { defineConfig } from "vitest/config";

// Separate from vite.config.ts: the Cloudflare plugin there boots a Workers
// dev server, which vitest doesn't need for these unit tests.
export default defineConfig({ test: { include: ["**/*.test.ts"], exclude: ["node_modules/**"] } });
