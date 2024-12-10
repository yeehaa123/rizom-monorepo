// @ts-check
import { defineConfig, envField} from 'astro/config';
import tailwind from '@astrojs/tailwind';
import sitemap from "@astrojs/sitemap";
import vercel from "@astrojs/vercel";
import section from '@hbsnow/rehype-sectionize';
import classNames from 'rehype-class-names';
import slug from 'rehype-slug';
import unwrapImages from 'remark-unwrap-images';
import remarkGfm from 'remark-gfm';
import offcourse from "@offcourse/astro"
import react from '@astrojs/react';

// https://astro.build/config
export default defineConfig({
  site: 'https://rizom.ai/',
  experimental: {
    svg: true,
  },
  env: {
    schema: {
      PUBLIC_RESEND_API_KEY: envField.string({ context: "server", access: "public"}),
    }
  },
  markdown: {
    remarkPlugins: [unwrapImages, remarkGfm],
    rehypePlugins: [[classNames, {
      'h1 + p': 'lead'
    }], slug, section]
  },
  integrations: [
    offcourse(),
    tailwind({
      applyBaseStyles: false
    }), sitemap(), react()],
  server: { port: 6543},
  adapter: vercel({
    webAnalytics: {
      enabled: true,
    }
  })
});
