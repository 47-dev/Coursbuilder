/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"], 
  components: ["./src/**/*.{html,js}"], 
  
  theme: {
    extend: {
      fontFamily: {
        'avenir': ['"Avenir Next"', 'sans-serif'],
      },
    },
  },
  plugins: [],
}