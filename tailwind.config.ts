import type { Config } from 'tailwindcss';

// Palette: dark blue + charcoal on white, amber call-to-action, green only on buttons.
// NOTE: the `sage` scale below is the dark-blue brand scale (name kept for compatibility).
const sage = {
  DEFAULT: '#1E3F73',
  50: '#F1F5FA',
  100: '#E1E9F4',
  200: '#C4D3E8',
  300: '#9BB3D4',
  400: '#6A8BBB',
  500: '#3F629B',
  600: '#1E3F73',
  700: '#19355F',
  800: '#152C4F',
  900: '#0F2140',
};

// ink (text) and plaster (surfaces) resolve through CSS variables so a scope can flip
// between the light and dark theme (see globals.css). Values are RGB triplets.
const v = (name: string) => `rgb(var(${name}) / <alpha-value>)`;

const ink = {
  DEFAULT: v('--ink-800'),
  50: v('--ink-50'),
  100: v('--ink-100'),
  200: v('--ink-200'),
  300: v('--ink-300'),
  400: v('--ink-400'),
  500: v('--ink-500'),
  600: v('--ink-600'),
  700: v('--ink-700'),
  800: v('--ink-800'),
  900: v('--ink-900'),
};

const plaster = {
  DEFAULT: v('--plaster-100'),
  50: v('--plaster-50'),
  100: v('--plaster-100'),
  200: v('--plaster-200'),
  300: v('--plaster-300'),
  400: v('--plaster-400'),
  500: v('--plaster-500'),
  600: v('--plaster-600'),
  700: v('--plaster-700'),
  800: v('--plaster-800'),
  900: v('--plaster-900'),
};

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        sage,
        ink,
        plaster,
        line: v('--line'),
        tint: v('--tint'),
        night: '#101211',
        // Bold call-to-action colour (buttons only).
        cta: { DEFAULT: '#F5A30A', dark: '#DC8F00', ink: '#16130A' },
        // Green is reserved for buttons (WhatsApp actions).
        go: { DEFAULT: '#1FAF54', dark: '#17994A' },
        // Legacy names, kept so older markup resolves to the same palette.
        primary: sage,
        accent: { ...sage, DEFAULT: sage[600] },
        dark: ink,
        neutral: plaster,
        text: {
          DEFAULT: v('--ink-800'),
          light: v('--ink-600'),
          muted: v('--ink-400'),
        },
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
        heading: ['var(--font-inter)', 'system-ui', 'sans-serif'],
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
        '112': '28rem',
        '128': '32rem',
      },
      maxWidth: {
        site: '84rem',
      },
      boxShadow: {
        soft: 'none',
        medium: 'none',
        strong: '0 24px 60px -24px rgba(20, 22, 21, 0.35)',
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.5s ease-out',
        'slide-down': 'slideDown 0.3s ease-out',
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideDown: {
          '0%': { opacity: '0', transform: 'translateY(-10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
};

export default config;
