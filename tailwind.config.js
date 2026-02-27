/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./lib/**/*.{ts}", "./pages/**/*.{ts,tsx}"] ,
  theme: {
    extend: {
      colors: {
        neutral: {
          50: '#fafafa',
          100: '#f5f5f5',
          200: '#e5e7eb',
          800: '#1f2937'
        }
      },
      fontFamily: {
        body: ['Inter', 'ui-sans-serif', 'system-ui'],
        hero: ['InstrumentSerif', 'Georgia', 'serif']
      },
      borderRadius: {
        '2xl': '1rem',
        '3xl': '1.5rem'
      },
      transitionProperty: {
        'transform': 'transform'
      }
    }
  },
  plugins: []
}
