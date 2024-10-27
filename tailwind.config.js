/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./entrypoints/**/*.{html,js,jsx,ts,tsx}", // Include all React components
    "./.wxt/**/*.{html,js,jsx,ts,tsx}", // WXT Framework paths
    "./public/**/*.{html,js}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
