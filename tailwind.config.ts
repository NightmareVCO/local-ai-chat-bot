import type { Config } from "tailwindcss";

import { nextui } from "@nextui-org/react";
import { default as flattenColorPalette } from "tailwindcss/lib/util/flattenColorPalette";

/** @type {import('tailwindcss').Config} */
const config: Config = {
  content: [
    "./src/ui/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      animation: {
        aurora: "aurora 60s linear infinite",
      },
      keyframes: {
        aurora: {
          from: {
            backgroundPosition: "50% 50%, 50% 50%",
          },
          to: {
            backgroundPosition: "350% 50%, 350% 50%",
          },
        },
      },
    },
  },
  darkMode: "class",
  plugins: [
    addVariablesForColors,
    nextui({
      themes: {
        dark: {
          colors: {
            primary: {
              DEFAULT: "#a76abe",
              50: "#fbf8fc",
              100: "#f5eef9",
              200: "#eee0f4",
              300: "#e0c7eb",
              400: "#cca3dd",
              500: "#b77fcd",
              600: "#a76abe",
              700: "#8c4ea2",
              800: "#5f386b",
              900: "#411f4c",
            },
            secondary: {
              DEFAULT: "#d03560",
              50: "#fcf3f6",
              100: "#fbe8f0",
              200: "#f8d2e2",
              300: "#f4adc8",
              400: "#ec7aa3",
              500: "#e15381",
              600: "#d03560",
              700: "#b32347",
              800: "#7c1f34",
              900: "#4b0c1a",
            },
          },
        },
      },
    }),
  ],
};
export default config;

// This plugin adds each Tailwind color as a global CSS variable, e.g. var(--gray-200).
function addVariablesForColors({ addBase, theme }: any) {
  const allColors = flattenColorPalette(theme("colors"));
  const newVariables = Object.fromEntries(
    Object.entries(allColors).map(([key, value]) => [`--${key}`, value]),
  );

  addBase({
    ":root": newVariables,
  });
}
