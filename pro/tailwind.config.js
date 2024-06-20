/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-to-r-custom': 'linear-gradient(90deg, #247B7B 0%, #3B247B 100%)',
      },
    },
  },
  plugins: [],
}

