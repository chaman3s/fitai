/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        border: "oklch(var(--border))",
        background: "oklch(var(--background))",
        foreground: "oklch(var(--foreground))",
      },
    },
  },
  plugins: [
     require("tw-animate-css"),
  ],
};
