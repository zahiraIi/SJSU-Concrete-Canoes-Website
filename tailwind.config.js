/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#0055A2', // SJSU Blue
        secondary: '#E5A823', // SJSU Gold/Yellow
        sjsuBlue: {
          light: '#0077CC',
          DEFAULT: '#0055A2',
          dark: '#003C73'
        },
        sjsuYellow: {
          light: '#F9C55D',
          DEFAULT: '#E5A823',
          dark: '#C78C00'
        },
        bronze: {
          light: '#f5d981',
          DEFAULT: '#b96424',
          dark: '#7d2801'
        },
        gold: {
          light: '#f9d769',
          DEFAULT: '#d0a646',
          dark: '#7a4505'
        },
        platinum: {
          light: '#bdcee0',
          DEFAULT: '#7597b5',
          dark: '#394b5a'
        },
        white: '#ffffff',
        black: '#000000',
        gray: {
          50: '#f9fafb',
          100: '#f3f4f6',
          200: '#e5e7eb',
          300: '#d1d5db',
          400: '#9ca3af',
          500: '#6b7280',
          600: '#4b5563',
          700: '#374151',
          800: '#1f2937',
          900: '#111827',
        },
      },
      fontFamily: {
        montserrat: ['Montserrat', 'sans-serif'],
        inter: ['Inter', 'sans-serif'],
        droid: ['Droid Serif', 'serif'],
        'montserrat-alt': ['Montserrat Alternates', 'sans-serif'],
        'hand': ['Caveat', 'cursive'], // Hand-drawn font
        'sketch': ['Architects Daughter', 'cursive'], // Sketch-like font
      },
      animation: {
        'bounce-slow': 'bounce 3s infinite',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 6s ease-in-out infinite',
        'wiggle': 'wiggle 1s ease-in-out infinite',
        'wave': 'wave 3s linear infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        wiggle: {
          '0%, 100%': { transform: 'rotate(-3deg)' },
          '50%': { transform: 'rotate(3deg)' },
        },
        wave: {
          '0%': { backgroundPosition: '0% 50%' },
          '100%': { backgroundPosition: '100% 50%' },
        }
      },
      backgroundImage: {
        'sketch-border': "url('data:image/svg+xml;utf8,<svg viewBox=\"0 0 120 120\" xmlns=\"http://www.w3.org/2000/svg\"><path d=\"M10,10 C20,5 40,5 50,10 C60,15 70,15 80,10 C90,5 100,5 110,10\" stroke=\"black\" fill=\"none\" stroke-width=\"2\" stroke-linecap=\"round\" /></svg>')",
      },
      boxShadow: {
        'hand-drawn': '2px 2px 0 rgba(0, 0, 0, 0.5)',
      }
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
} 