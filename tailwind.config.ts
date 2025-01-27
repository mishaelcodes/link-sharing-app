import { instrument_sans } from "@/utils/fonts";
import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      boxShadow: {
        activeShadow: "0 0 32px 0 hsl(252, 100%, 62%)",
      },
      colors: {
        purple: "hsl(252, 100%, 62%)",
        lightPurple: "hsl(252, 100%, 84%)",
        fadedPurple: "hsl(252, 100%, 96%)",
        darkGrey: "hsl(0, 0%, 20%)",
        grey: "hsl(0, 0%, 45%)",
        lightGrey: "hsl(0, 0%, 85%)",
        almostWhte: "hsl(0, 0%, 98%)",
        white: "hsl(0, 0%, 100%)",
        red: "hsl(0, 100%, 61%)",
      },
      fontFamily: {
        instrument_sans: ["var(--font-instrument_sans)"],
      },
      flex: {
        "1": "1 0 0",
      },
      lineHeight: {
        normal: "150%",
      },
    },
  },
  plugins: [],
};
export default config;
