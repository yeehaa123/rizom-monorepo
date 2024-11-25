// @ts-check
import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import react from "@astrojs/react";
import sitemap from "@astrojs/sitemap";
import vercel from "@astrojs/vercel";

// https://astro.build/config
export default defineConfig({
  site: 'https://rizom.ai/',
  integrations: [tailwind({
    applyBaseStyles: false
  }), sitemap()],
  server: { port: 6543},
  adapter: vercel({
    webAnalytics: {
      enabled: true,
    }
  })
});
