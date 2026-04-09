// ─────────────────────────────────────────────────────────
// Astro Configuration
// ─────────────────────────────────────────────────────────

import { defineConfig } from "astro/config";
import tailwind from "@astrojs/tailwind";
import sitemap from "@astrojs/sitemap";
import react from "@astrojs/react";

export default defineConfig({
  site: "https://ronijjungle.github.io",
  integrations: [
    tailwind(),
    sitemap(),
    react(),
  ],
});
