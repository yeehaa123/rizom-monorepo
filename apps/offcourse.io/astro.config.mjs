import { defineConfig, envField} from 'astro/config';
import { addCMS } from "@rizom/cms";
import { visit } from 'unist-util-visit';
import section from '@hbsnow/rehype-sectionize';
import classNames from 'rehype-class-names';
import slug from 'rehype-slug';
import unwrapImages from 'remark-unwrap-images';
import remarkGfm from 'remark-gfm';
import mdx from '@astrojs/mdx';
import tailwind from '@astrojs/tailwind';
import react from "@astrojs/react";
import sitemap from "@astrojs/sitemap";
import vercel from "@astrojs/vercel/serverless";
import * as path from 'path';

const OUTPUT_BASE = './src/content';
const INPUT_BASE = './offcourse';
const CONTENT_CONFIG = "./contentConfig.ts.template"
const CMS_PATH = path.join("./CMS");

export default defineConfig({
  site: 'https://offcourse.io',
  experimental: {
  env: {
    schema: {
      GITHUB_CLIENT_ID: envField.string({ context: "client", access: "public" }),
      GITHUB_CLIENT_ID: envField.string({ context: "server", access: "secret" }),
      GITHUB_CLIENT_SECRET: envField.string({ context: "server", access: "secret" }),
    }
  },
  },
  markdown: {
    remarkPlugins: [unwrapImages, remarkGfm],
    rehypePlugins: [[classNames, {
      'h1 + p': 'lead'
    }], slug, section]
  },
  integrations: [addCMS({
    input_base: INPUT_BASE, 
    output_base: OUTPUT_BASE, 
    cms_path: CMS_PATH,
    content_config: CONTENT_CONFIG
  }), tailwind({
    applyBaseStyles: false
  }), mdx(), react(), sitemap()],
  server: { port: 8765},
  output: 'hybrid',
  adapter: vercel({
    webAnalytics: {
      enabled: true,
    }
  })
});
