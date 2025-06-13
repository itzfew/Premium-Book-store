/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './public/**/*.{html,js}',
  ],
  theme: {
    extend: {
      colors: {
        'book-primary': '#2D3748',
        'book-accent': '#D97706',
      },
      fontFamily: {
        'merriweather': ['Merriweather', 'serif'],
        'inter': ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
