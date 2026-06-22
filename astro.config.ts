import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";
import UnoCSS from "unocss/astro";
import mdx from "@astrojs/mdx";
import react from "@astrojs/react";

import cloudflare from "@astrojs/cloudflare";

export default defineConfig({
  output: "server",
  adapter: cloudflare(),
  // used to generate images
  site:
    process.env.CF_PAGES_URL
      ? process.env.CF_PAGES_URL
      : process.env.VERCEL_URL
        ? `https://${process.env.VERCEL_URL}/`
        : "https://storyofstrategy.co/",
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
