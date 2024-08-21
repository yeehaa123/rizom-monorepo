import sharedConfig from "@rizom/tailwind-config";
const config = {
    content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
    presets: [sharedConfig]
};
export default config;
