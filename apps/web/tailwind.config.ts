import type { Config } from "tailwindcss";

export default {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: "#17102B",
        plum: "#5B2E90",
        orchid: "#8B5CF6",
        lilac: "#C9B6F2",
        mist: "#EFEAF9",
        cream: "#FAF8FD",
      },
      fontFamily: {
        display: ["var(--font-display)", "serif"],
        sans: ["var(--font-sans)", "sans-serif"],
      },
      borderRadius: { card: "1.75rem", pill: "999px" },
      keyframes: {
        reveal: { "0%": { opacity: "0", transform: "translateY(40px)" }, "100%": { opacity: "1", transform: "translateY(0)" } },
        marquee: { "0%": { transform: "translateX(0)" }, "100%": { transform: "translateX(-50%)" } },
      },
      animation: {
        reveal: "reveal .9s cubic-bezier(.22,1,.36,1) both",
        marquee: "marquee 22s linear infinite",
      },
    },
  },
  plugins: [],
} satisfies Config;
