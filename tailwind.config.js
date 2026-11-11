/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        ice: {
          50: '#f4f9ff',
          100: '#e6f2fe',
          200: '#c5e2fe',
          300: '#90cbfa',
          400: '#52aff6',
          500: '#2b92ee',
          600: '#1973d0',
        },
        royal: {
          700: '#1d487d',
          800: '#13335c',
          900: '#0d2444',
          950: '#07162b',
        },
        gold: {
          100: '#fcf8ea',
          200: '#f8efcb',
          300: '#efdf9a',
          400: '#e4ca67',
          500: '#cca53a',
          600: '#aa8228',
          700: '#835f1e',
        }
      },
      fontFamily: {
        script: ['"Great Vibes"', 'cursive'],
        serif: ['"Playfair Display"', 'serif'],
        cinzel: ['"Cinzel"', 'serif'],
        sans: ['"Montserrat"', 'sans-serif'],
      },
      backgroundImage: {
        'sparkle-radial': 'radial-gradient(circle at 50% 30%, rgba(255,255,255,0.9) 0%, rgba(224,242,254,0.7) 45%, rgba(186,224,253,0.5) 100%)',
      },
      animation: {
        'float-slow': 'float 6s ease-in-out infinite',
        'pulse-subtle': 'pulseSubtle 3s ease-in-out infinite',
        'shimmer': 'shimmer 2.5s infinite linear',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        pulseSubtle: {
          '0%, 100%': { opacity: '1', transform: 'scale(1)' },
          '50%': { opacity: '0.88', transform: 'scale(1.02)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        }
      }
    },
  },
  plugins: [],
}

