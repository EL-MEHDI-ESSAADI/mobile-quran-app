const { colors, fonts } = require("./src/styles/index.cjs");

/** @type {import('tailwindcss').Config} */

module.exports = {
  content: [
    "./App.{js,jsx,ts,tsx}",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: fonts,
      colors,
    },
  },
  plugins: [],
};
