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
        middleGreen: "#D9F8BF",
      },
    },
  },
  plugins: [],
};
