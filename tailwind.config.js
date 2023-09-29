/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./App.{js,jsx,ts,tsx}",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        poppins: "Poppins_400Regular",
        amiri: "Amiri_400Regular",
      },
      colors: {
        background: "#040C23",
        foreground: "#ffffff",
        primary: {
          DEFAULT: "#A44AFF",
        },
        secondary: {
          DEFAULT: "#121931",
        },
        muted: {
          DEFAULT: "#A19CC5",
        },
      },
    },
  },
  plugins: [],
};
