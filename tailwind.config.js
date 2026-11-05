/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        forest: {
          950: '#050a07',
          900: '#070e0a',
          850: '#0a140f',
          800: '#0f1f17',
          700: '#172e23',
          600: '#224032',
        },
        gold: {
          100: '#fdf9ed',
          200: '#f9f0d3',
          300: '#f3e1a6',
          400: '#e7cc71',
          500: '#d4af37',
          600: '#b89228',
          700: '#8f6e1b',
        },
        champagne: {
          50: '#fdfcf9',
          100: '#faf6ee',
          200: '#f6ecd7',
          300: '#eedab7',
          400: '#e3c490',
        },
        earth: {
          950: '#0e0b08',
          900: '#17110d',
          800: '#261b14',
          700: '#3d2b20',
        },
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'sans-serif'],
        cinzel: ['"Cinzel"', 'serif'],
        serif: ['"Playfair Display"', 'serif'],
        cormorant: ['"Cormorant Garamond"', 'serif'],
        script: ['"Great Vibes"', 'cursive'],
        brush: ['"Alex Brush"', 'cursive'],
        handwritten: ['"Caveat"', 'cursive'],
      },
      animation: {
        'float-slow': 'float 7s ease-in-out infinite',
        'float-reverse': 'floatReverse 8s ease-in-out infinite',
        'pulse-glow': 'pulseGlow 3s ease-in-out infinite alternate',
        'shimmer': 'shimmer 2.5s linear infinite',
        'flutter-left': 'flutterLeft 0.25s ease-in-out infinite alternate',
        'flutter-right': 'flutterRight 0.25s ease-in-out infinite alternate',
        'zoom-slow': 'slowZoom 22s ease-in-out infinite alternate',
        'fade-in': 'fadeIn 1s cubic-bezier(0.16, 1, 0.3, 1) forwards',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
          '50%': { transform: 'translateY(-12px) rotate(1deg)' },
        },
        floatReverse: {
          '0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
          '50%': { transform: 'translateY(12px) rotate(-1deg)' },
        },
        pulseGlow: {
          '0%': { opacity: '0.45', filter: 'drop-shadow(0 0 15px rgba(212,175,55,0.4))' },
          '100%': { opacity: '0.9', filter: 'drop-shadow(0 0 35px rgba(212,175,55,0.85))' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        flutterLeft: {
          '0%': { transform: 'rotateY(0deg) scaleX(1)' },
          '100%': { transform: 'rotateY(65deg) scaleX(0.4)' },
        },
        flutterRight: {
          '0%': { transform: 'rotateY(0deg) scaleX(1)' },
          '100%': { transform: 'rotateY(-65deg) scaleX(0.4)' },
        },
        slowZoom: {
          '0%': { transform: 'scale(1)' },
          '100%': { transform: 'scale(1.08)' },
        },
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [],
}
