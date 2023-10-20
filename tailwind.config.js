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
        "poppins-medium": "Poppins_500Medium",
        "poppins-bold": "Poppins_700Bold",
        amiri: "Amiri_400Regular",
        "amiri-bold": "Amiri_700Bold",
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
        border: {
          DEFAULT: "#7B80AD59",
        },
      },
    },
  },
  plugins: [],
};
