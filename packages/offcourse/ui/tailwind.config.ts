import type { Config } from "tailwindcss";
import sharedConfig from "@rizom/tailwind-config";

const config: Pick<Config, "content" | "presets"> = {
 	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  presets: [sharedConfig]
};

export default config;
