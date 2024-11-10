/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#E85C33', // Orange/red from the design
          dark: '#CC4422',
          light: '#FF6E44',
        },
        secondary: {
          DEFAULT: '#1A1A1A', // Dark background
          light: '#2A2A2A',
          dark: '#111111',
        },
        accent: {
          DEFAULT: '#FF8C42', // Secondary orange
          dark: '#E67A33',
        }
      },
      backgroundImage: {
        'gradient-diagonal': 'linear-gradient(135deg, var(--tw-gradient-stops))',
        'texture': 'url("/texture-dark.png")',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        display: ['Oswald', 'sans-serif'],
      },
      scale: {
        '102': '1.02',
      },
    },
  },
  plugins: [],
}
