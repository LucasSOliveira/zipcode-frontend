/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{ts,tsx}",],
  theme: {
    colors: {
      'color-primary': '#003558',
      'color-secondary': '#FFE01F',
      'ui-white': "#FFF",
      'ui-black': "#222222",
      'bg-default': '#FFFDEE',
    },
    fontFamily: {
      'family-01': ['Poppins', 'sans-serif'],
      'family-02': ['Ubuntu', 'sans-serif'],
    },
    fontSize: {
      '5xl': ['1.5rem', {
        lineHeight: '2rem',
        fontWeight: '400',
      }],
      '6xl': ['2.25rem', {
        lineHeight: '2.8rem',
        fontWeight: '400',
      }],
      '7xl': ['4rem', {
        lineHeight: '4rem',
        fontWeight: '500',
      }],
      '8xl': ['6rem', {
        lineHeight: '6rem',
        fontWeight: '500',
      }],
    },
    extend: {
      spacing: {
        '8xl': '96rem',
        '9xl': '128rem',
      },
      borderRadius: {
        'sm': '4px',
        'md': '8px',
      },
      boxShadow: {
        'primary': '4px 4px 14px rgba(0, 0, 0, 0.1)',
      }
    },
    container: {
      center: true,
      padding: {
        DEFAULT: '1rem',
      },
      screens : {
        md: '576px',
        lg: '768px',
        xl: '960px',
        '2xl': '1080px',
      }
    }
  },
  plugins: [],
}
