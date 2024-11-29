/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{html,js,jsx}"],

  theme: {
    extend: {
      colors: {
        'custom-blue-bg': '#E9F2FF',
        'custom-blue-text': '#405FF2',
      },

      borderRadius: {
        '4xl': '2rem', // You can customize this value
        '5xl': '2.5rem', // Add another custom size if needed
        '6xl': '3rem',
        '7xl': '4rem',
      },
    },
  },
  plugins: [],
}

