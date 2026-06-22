import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";
import UnoCSS from "unocss/astro";
import mdx from "@astrojs/mdx";
import react from "@astrojs/react";

import cloudflare from "@astrojs/cloudflare";

export default defineConfig({
  output: "server",
  adapter: cloudflare(),
  site: "https://www.storyofstrategy.com/",
  trailingSlash: "ignore",
  integrations: [sitemap(), UnoCSS({ injectReset: true }), mdx(), react()],
  vite: {
    ssr: {
      external: ['@resvg/resvg-js'],
    },
    optimizeDeps: {
      exclude: ["@resvg/resvg-js"],
    },
  },
});
