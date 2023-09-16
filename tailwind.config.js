/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    // all content that will return TW classes
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./utils/**/*.js",
  ],
  theme: {
    extend: {
      fontFamily: {
        // extended TW classes, font-heading font-body
        heading: ["Aboreto", "cursive"],
        body: ["Poppins", "sans-serif"],
      },
    },
  },
  plugins: [],
};
