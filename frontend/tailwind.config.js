/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        space: {
          50: '#0a0a0f',
          100: '#111117',
          200: '#1a1a24',
          300: '#242438',
          400: '#2d2d4a',
          500: '#36365c',
          600: '#4a4a7a',
          700: '#5d5d98',
          800: '#7171b6',
          900: '#8484d4',
        },
        nebula: {
          purple: '#6366f1',
          blue: '#3b82f6',
          cyan: '#06b6d4',
          pink: '#ec4899',
        }
      },
      backgroundImage: {
        'stars': "radial-gradient(2px 2px at 20px 30px, #eee, transparent), radial-gradient(2px 2px at 40px 70px, rgba(255,255,255,0.8), transparent), radial-gradient(1px 1px at 90px 40px, #fff, transparent), radial-gradient(1px 1px at 130px 80px, rgba(255,255,255,0.6), transparent), radial-gradient(2px 2px at 160px 30px, #ddd, transparent)",
        'space-gradient': 'radial-gradient(ellipse at center, rgba(29, 39, 54, 0.16) 0%, rgba(1, 4, 9, 1) 100%)',
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'pulse-glow': 'pulse-glow 2s ease-in-out infinite alternate',
        'twinkle': 'twinkle 4s linear infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        'pulse-glow': {
          from: { boxShadow: '0 0 5px rgba(99, 102, 241, 0.5)' },
          to: { boxShadow: '0 0 20px rgba(99, 102, 241, 0.8)' },
        },
        twinkle: {
          '0%, 100%': { opacity: '0.3' },
          '50%': { opacity: '1' },
        },
      },
      backdropBlur: {
        xs: '2px',
      },
    },
  },
  plugins: [],
};
