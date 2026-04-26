/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'duch-bg': '#f7f5f0',
        'duch-black': '#1a1a1a',
        'duch-casual': '#e6e1d6',
        'duch-formal': '#b9a9cc',
      },
      fontFamily: {
        'display': ['"Space Grotesk"', 'sans-serif'],
        'body': ['"Outfit"', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
