import type { Config } from "tailwindcss";
import twColors from 'tailwindcss/colors'
import sharedConfig from "@rizom/tailwind-config";

const config: Pick<Config, "content" | "presets" | "theme"> = {
  theme: {
    ...sharedConfig.theme,
    extend: {
      ...sharedConfig.theme.extend,
      colors: {
        'black': twColors.black,
        'white': twColors.white,
        'primary-dark': '#2E007D',
        'primary': '#3921D7',
        'primary-light': '#A8C4FF',
        'secondary': '#E7640A',
        'secondary-light': '#FCE5C6',
        'secondary-lightest': "#FFFCF6"
      },
      fontFamily: {
        ...sharedConfig.theme.extend.fontFamily,
        sans: ['Kobe', ...sharedConfig.theme.extend.fontFamily.sans],
      },
    },
  },
  content: [
    './src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}',
    "../../packages/offcourse/ui/src/**/*.{ts,tsx}",
    "../../packages/ui/src/**/*.{ts,tsx}"
  ],
  presets: [sharedConfig]
};

export default config;
