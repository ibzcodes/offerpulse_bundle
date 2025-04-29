/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#1D4ED8',
        'primary-hover': '#2563EB',
        secondary: '#9333EA',
        'secondary-hover': '#7E22CE',
        accent: '#EAB308', // new accent color
        background: '#0F172A',
        surface: '#1E293B',
        text: '#F1F5F9',
      },
      fontFamily: {
        sans: ['Montserrat', 'sans-serif'],
        display: ['"Montserrat Alternates"', 'sans-serif']
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' }
        }
      },
      animation: {
        fadeIn: 'fadeIn 0.8s ease-out forwards'
      }
    }
  },
  plugins: []
};
