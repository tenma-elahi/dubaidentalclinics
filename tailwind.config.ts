import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Warm Teal - Per Dubai Listings Playbook
        brand: {
          50: '#effefb',
          100: '#c9fef4',
          200: '#93fce9',
          300: '#56f2db',
          400: '#22decc',
          500: '#09c2b2', // Primary brand
          600: '#049d92',
          700: '#087d76',
          800: '#0c635f',
          900: '#0f524f',
        },
        // Coral accent
        coral: {
          400: '#ff8a72',
          500: '#f86545',
          600: '#e54a28',
        },
        // Sunny yellow for ratings
        sunny: {
          300: '#fde047',
          400: '#facc15',
          600: '#ca8a04',
        },
        // Warm neutrals - NOT pure white
        warm: {
          50: '#fdfbf7',
          100: '#faf6f0',
          200: '#f5ede0',
          300: '#ebe0cb',
        },
        // Keep primary/accent as aliases
        primary: {
          50: '#effefb',
          100: '#c9fef4',
          200: '#93fce9',
          300: '#56f2db',
          400: '#22decc',
          500: '#09c2b2',
          600: '#049d92',
          700: '#087d76',
          800: '#0c635f',
          900: '#0f524f',
        },
      },
      backgroundImage: {
        'gradient-dental': 'linear-gradient(135deg, #087d76 0%, #09c2b2 50%, #22decc 100%)',
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-subtle': 'linear-gradient(to bottom, #fdfbf7, #faf6f0)',
      },
      boxShadow: {
        'glass': '0 8px 32px 0 rgba(9, 194, 178, 0.12)',
        'glass-lg': '0 12px 48px 0 rgba(9, 194, 178, 0.18)',
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-out',
        'slide-up': 'slideUp 0.5s ease-out',
        'slide-down': 'slideDown 0.3s ease-out',
        'scale-in': 'scaleIn 0.3s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        slideDown: {
          '0%': { transform: 'translateY(-10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        scaleIn: {
          '0%': { transform: 'scale(0.95)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
      },
    },
  },
  plugins: [],
}
export default config
