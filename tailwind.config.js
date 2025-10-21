/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    screens: {
      'xs': '320px',
      'sm': '640px',
      'md': '768px',
      'lg': '1024px',
      'xl': '1280px',
      '2xl': '1536px',
    },
    extend: {
      colors: {
        // Custom space theme colors
        cyan: {
          50: '#E6FFFF',
          100: '#CCFFFF',
          200: '#99FFFF',
          300: '#66FFFF',
          400: '#33FFFF',
          500: '#00FFFF',
          600: '#00CCCC',
          700: '#009999',
          800: '#006666',
          900: '#003333',
          DEFAULT: '#00FFFF',
        },
        violet: {
          50: '#F5E6FF',
          100: '#EBCCFF',
          200: '#D799FF',
          300: '#C366FF',
          400: '#AF33FF',
          500: '#9D00FF',
          600: '#7D00CC',
          700: '#5E0099',
          800: '#3E0066',
          900: '#1F0033',
          DEFAULT: '#9D00FF',
        },
        // Additional space theme colors
        space: {
          black: '#000000',
          darkPurple: '#1a0033',
          deepBlue: '#0a0a2e',
        },
      },
      fontFamily: {
        // Custom space-themed fonts
        orbitron: ['Orbitron', 'sans-serif'],
        rajdhani: ['Rajdhani', 'sans-serif'],
        exo: ['Exo 2', 'sans-serif'],
        sans: ['Rajdhani', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        'xs': ['0.75rem', { lineHeight: '1rem' }],
        'sm': ['0.875rem', { lineHeight: '1.25rem' }],
        'base': ['1rem', { lineHeight: '1.5rem' }],
        'lg': ['1.125rem', { lineHeight: '1.75rem' }],
        'xl': ['1.25rem', { lineHeight: '1.75rem' }],
        '2xl': ['1.5rem', { lineHeight: '2rem' }],
        '3xl': ['1.875rem', { lineHeight: '2.25rem' }],
        '4xl': ['2.25rem', { lineHeight: '2.5rem' }],
        '5xl': ['3rem', { lineHeight: '1' }],
        '6xl': ['3.75rem', { lineHeight: '1' }],
        '7xl': ['4.5rem', { lineHeight: '1' }],
        '8xl': ['6rem', { lineHeight: '1' }],
      },
      spacing: {
        // Consistent spacing scale
        '18': '4.5rem',
        '88': '22rem',
        '100': '25rem',
        '112': '28rem',
        '128': '32rem',
      },
      backdropBlur: {
        xs: '2px',
      },
      boxShadow: {
        // Custom glow effects
        'glow-cyan': '0 0 20px rgba(0, 255, 255, 0.5)',
        'glow-cyan-lg': '0 0 30px rgba(0, 255, 255, 0.6)',
        'glow-violet': '0 0 20px rgba(157, 0, 255, 0.5)',
        'glow-violet-lg': '0 0 30px rgba(157, 0, 255, 0.6)',
      },
    },
  },
  plugins: [],
}
