/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'morocco-red': '#c1272d',
        'can-green': '#006233',
        'gold': '#FFD700',
      },
    },
  },
  plugins: [],
}

