/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        middleGray: "#EEEEEE",
        fadeGray: "#9A9A9A",
        hoverGray: "#727272",
        middleGreen: "#D9F8BF",
        lightGray: "#CBCBCB",
        hoverBtn: "#B8F18F",
        middleRed: "#D08080",
        middleBlack: "#555555",
        bgWhite: "#FCFCFC",
      },
    },
  },
  plugins: [],
};
