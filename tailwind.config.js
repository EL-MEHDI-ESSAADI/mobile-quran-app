const { colors } = require("./src/styles/index.cjs");

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
      colors,
    },
  },
  plugins: [],
};
