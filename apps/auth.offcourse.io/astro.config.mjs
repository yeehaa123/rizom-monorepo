import { defineConfig, envField} from 'astro/config';
import tailwind from '@astrojs/tailwind';
import react from "@astrojs/react";
import vercel from "@astrojs/vercel/serverless";
import * as path from 'path';

export default defineConfig({
  site: 'https://auth.offcourse.io',
  experimental: {
  env: {
    schema: {
      GITHUB_CLIENT_ID: envField.string({ context: "server", access: "secret" }),
      GITHUB_CLIENT_SECRET: envField.string({ context: "server", access: "secret" }),
    }
  },
  },
  integrations: [
    tailwind({
    applyBaseStyles: false
  }), react()
  ],
  server: { port: 6543},
  output: 'hybrid',
  adapter: vercel({
    webAnalytics: {
      enabled: true,
    }
  })
});
