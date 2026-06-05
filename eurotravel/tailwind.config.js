/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        navy: {
          DEFAULT: '#0B1C3D',
          light: '#132952',
          dark: '#060E1F',
        },
        gold: {
          DEFAULT: '#D4A843',
          light: '#E4BE6A',
          dark: '#A87E2A',
        },
        slate: {
          DEFAULT: '#F4F6FA',
          dark: '#E8ECF4',
        },
        whatsapp: {
          DEFAULT: '#25D366',
          dark: '#1ebe5d',
        },
        viber: {
          DEFAULT: '#7360F2',
          dark: '#6250e0',
        },
      },
      fontFamily: {
        display: ['Playfair Display', 'serif'],
        body: ['DM Sans', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
