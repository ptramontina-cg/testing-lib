import { defineConfig } from "tsup";

export default defineConfig([
  // Frontend build
  {
    entry: ["src/frontend.ts"],
    format: ["esm"],
    outDir: "dist",
    dts: true,
    clean: true,
    minify: true,
    platform: "browser",
  },
  // Test build
  {
    entry: ["src/iife.ts"],
    format: ["iife"],
    outDir: "dist/global",
    dts: true,
    clean: true,
    minify: true,
    platform: "browser",
  },
  // Backend build
  {
    entry: ["src/backend.ts"],
    format: ["cjs"],
    outDir: "dist",
    dts: true,
    minify: true,
    platform: "node",
    external: ["path", "fluent-ffmpeg"], // Exclude Node.js-only dependencies
  },
]);
