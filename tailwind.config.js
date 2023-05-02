/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Colors
        "primary": "#29384E",
        "secondary": "#062C30",
        "button": "#8D5EA3",
        // Background
        "main-bg": "#F8F8F8"
      }
    },
  },
  plugins: [],
}