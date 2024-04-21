/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        navy: '#070F2B',
        black: '#171717',
        grey: '#444444',
        midgrey: '#8c8c8c',
        babygrey: '#EDEDED',
        neonred: '#DA0037',
        darkneonred: '#AE002C'
      },
      backgroundImage: {
        'triangle': "url('/Users/christian/Desktop/GA/projects/Chore-Mate/frontend/chore-mate/src/assets/trianglez.png')",
      },
    },
  },
  plugins: [],
}

