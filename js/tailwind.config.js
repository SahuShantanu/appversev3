tailwind.config = {
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        darkbg: {
          900: '#070a13',
          800: '#0c1122',
          700: '#161d33'
        },
        brand: {
          50: '#ecfdf5',
          100: '#d1fae5',
          200: '#a7f3d0',
          300: '#6ee7b7',
          400: '#34d399',
          500: '#10b981',
          600: '#059669',
          700: '#047857',
          800: '#065f46',
          900: '#064e3b'
        },
        accent: {
          cyan: '#06b6d4',
          blue: '#3b82f6',
          violet: '#8b5cf6',
          pink: '#ec4899'
        }
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'sans-serif']
      },
      boxShadow: {
        'glass': '0 8px 32px 0 rgba(31, 38, 135, 0.08)',
        'glass-dark': '0 8px 32px 0 rgba(0, 0, 0, 0.37)'
      }
    }
  }
}
