/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    // all content that will return TW classes
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./utils/**/*.js",
  ],
  theme: {
    extend: {
      fontFamily: {
        // extended TW classes, font-heading font-body
        heading: "var(--font-aboreto)",
        body: "var(--font-poppins)",
      },
    },
  },
  plugins: [],
};
