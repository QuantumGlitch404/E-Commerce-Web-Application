/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: {
          primary: '#000000',
          secondary: '#0A0A0A',
          card: '#111111',
        },
        accent: {
          primary: '#00D9FF',
          secondary: '#B84FFF',
          tertiary: '#FF1CF7',
        },
        text: {
          primary: '#FFFFFF',
          secondary: '#B3B3B3',
          muted: '#666666',
        },
        status: {
          success: '#00FF88',
          warning: '#FFE600',
          error: '#FF3366',
        },
        border: {
          subtle: '#1A1A1A',
        },
        glow: {
          hover: 'rgba(0, 217, 255, 0.4)',
        }
      },
      fontFamily: {
        heading: ['Orbitron', 'sans-serif'],
        body: ['Inter', 'sans-serif'],
        accent: ['Rajdhani', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      fontSize: {
        hero: 'clamp(3rem, 8vw, 6rem)',
        h1: 'clamp(2.5rem, 5vw, 4rem)',
        h2: 'clamp(2rem, 4vw, 3rem)',
        h3: 'clamp(1.5rem, 3vw, 2rem)',
        h4: 'clamp(1.25rem, 2.5vw, 1.5rem)',
        'body-lg': '1.125rem',
        body: '1rem',
        'body-sm': '0.875rem',
        caption: '0.75rem',
      },
      spacing: {
        xs: '0.25rem',
        sm: '0.5rem',
        md: '1rem',
        lg: '1.5rem',
        xl: '2rem',
        '2xl': '3rem',
        '3xl': '4rem',
        '4xl': '6rem',
      },
      transitionDuration: {
        fast: '150ms',
        normal: '300ms',
        slow: '500ms',
        'extra-slow': '800ms',
      },
      transitionTimingFunction: {
        smooth: 'cubic-bezier(0.4, 0.0, 0.2, 1)',
      },
      borderRadius: {
        sm: '0.375rem',
        md: '0.75rem',
        lg: '1rem',
        xl: '1.5rem',
        full: '9999px',
      },
      boxShadow: {
        'glow-sm': '0 0 10px rgba(0, 217, 255, 0.3)',
        'glow-md': '0 0 20px rgba(0, 217, 255, 0.4)',
        'glow-lg': '0 0 40px rgba(0, 217, 255, 0.5)',
        'card': '0 8px 32px rgba(0, 0, 0, 0.8)',
      },
      animation: {
        fadeIn: 'fadeIn 0.3s cubic-bezier(0.4, 0.0, 0.2, 1) forwards',
        fadeInUp: 'fadeInUp 0.5s cubic-bezier(0.4, 0.0, 0.2, 1) forwards',
        slideInLeft: 'slideInLeft 0.5s cubic-bezier(0.4, 0.0, 0.2, 1) forwards',
        slideInRight: 'slideInRight 0.5s cubic-bezier(0.4, 0.0, 0.2, 1) forwards',
        scaleIn: 'scaleIn 0.3s cubic-bezier(0.4, 0.0, 0.2, 1) forwards',
        glowPulse: 'glowPulse 2s infinite',
        floatAnimation: 'floatAnimation 6s ease-in-out infinite',
        shimmer: 'shimmer 2s linear infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideInLeft: {
          '0%': { opacity: '0', transform: 'translateX(-50px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        slideInRight: {
          '0%': { opacity: '0', transform: 'translateX(50px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        scaleIn: {
          '0%': { opacity: '0', transform: 'scale(0.95)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        glowPulse: {
          '0%, 100%': { boxShadow: '0 0 10px rgba(0, 217, 255, 0.3)' },
          '50%': { boxShadow: '0 0 25px rgba(0, 217, 255, 0.6)' },
        },
        floatAnimation: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-1000px 0' },
          '100%': { backgroundPosition: '1000px 0' },
        },
      },
    },
  },
  plugins: [],
}
