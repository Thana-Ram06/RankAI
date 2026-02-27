/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './lib/**/*.{js,ts,jsx,tsx,mdx}'
  ],
  theme: {
    container: {
      center: true,
      padding: '1.5rem',
      screens: {
        '2xl': '1100px'
      }
    },
    extend: {
      colors: {
        background: {
          DEFAULT: '#ffffff',
          dark: '#171717'
        },
        border: {
          light: '#e5e5e5',
          dark: '#262626'
        }
      },
      borderRadius: {
        '2xl': '1rem'
      },
      transitionDuration: {
        DEFAULT: '200ms'
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
        serif: ['var(--font-instrument-serif)', 'serif']
      },
      boxShadow: {
        soft: '0 18px 45px rgba(15, 23, 42, 0.08)'
      },
      scale: {
        '102': '1.02'
      }
    }
  },
  plugins: []
};

