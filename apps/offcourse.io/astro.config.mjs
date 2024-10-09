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

import offcourse from "@offcourse/astro"

const OUTPUT_BASE = './src/content';
const INPUT_BASE = './offcourse';
const CONTENT_CONFIG = "./contentConfig.ts.template"
const CMS_PATH = path.join("./CMS");

const cmsConfig = {
  input_base: INPUT_BASE, 
  output_base: OUTPUT_BASE, 
  cms_path: CMS_PATH,
  content_config: CONTENT_CONFIG
};

export default defineConfig({
  site: 'https://offcourse.io',
  env: {
    schema: {
      AUTH_URL: envField.string({ context: "server", access: "secret" }),
      REPOSITORY_KEY: envField.string({ context: "server", access: "secret" }),
    }
  },
  markdown: {
    remarkPlugins: [unwrapImages, remarkGfm],
    rehypePlugins: [[classNames, {
      'h1 + p': 'lead'
    }], slug, section]
  },
  integrations: [addCMS(cmsConfig), tailwind({
    applyBaseStyles: false
  }), offcourse(), mdx(), react(), sitemap()],
  server: { port: 8765},
  adapter: vercel({
    webAnalytics: {
      enabled: true,
    }
  })
});
