import { defineConfig, envField} from 'astro/config';
import vercel from "@astrojs/vercel/serverless";
import * as path from 'path';

export default defineConfig({
  site: 'https://auth.offcourse.io',
  env: { 
    schema: {
      PLATFORM_URL: envField.string({ context: "server", access: "secret" }),
      GITHUB_CLIENT_ID: envField.string({ context: "server", access: "secret" }),
      REPOSITORY_KEY: envField.string({ context: "server", access: "secret" }),
      GITHUB_CLIENT_SECRET: envField.string({ context: "server", access: "secret" }),
    }
  },
  integrations: [],
  server: { port: 6543},
  output: 'server',
  adapter: vercel({
    webAnalytics: {
      enabled: true,
    }
  })
});
