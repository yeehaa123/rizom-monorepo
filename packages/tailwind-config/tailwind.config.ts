import type { Config } from "tailwindcss";
import defaultTheme from 'tailwindcss/defaultTheme';
import twColors from 'tailwindcss/colors'
import { colorSchemes } from '@rizom/styles';
import animate from "tailwindcss-animate";
import containerQueries from '@tailwindcss/container-queries';
import typography from '@tailwindcss/typography'

const colors = colorSchemes.bambooCurtain;

const config: Omit<Config, "content"> = {
  darkMode: "class",
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      transitionProperty: {
        'height': 'height'
      },
      colors: {
        'pitch-black': twColors.black,
        'pure-white': twColors.white,
        ...colors,

      },
      fontFamily: {
        mono: ['Nitti', ...defaultTheme.fontFamily.sans],
        sans: ['GT Ultra Standard', ...defaultTheme.fontFamily.sans],
        serif: ['GT Ultra Median', ...defaultTheme.fontFamily.serif],
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [
    animate,
    containerQueries,
    typography
  ],
}

export default config;
