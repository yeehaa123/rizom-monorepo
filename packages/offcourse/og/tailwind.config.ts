import type { Config } from "tailwindcss";
import sharedConfig from "@rizom/tailwind-config";

const config: Pick<Config, "content" | "presets"> = {
  content: ['./src/**/*.{ts,tsx}'],
  presets: [sharedConfig]
};

export default config;
