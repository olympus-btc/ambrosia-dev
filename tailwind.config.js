/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx,md,mdx}",
    "./docs/**/*.{md,mdx}",
    "./blog/**/*.{md,mdx}",
    "./docusaurus.config.js",
  ],
  theme: {
    extend: {
      colors: {
        'ambrosia-green': {
          50: 'var(--ambrosia-green-50)',
          100: 'var(--ambrosia-green-100)',
          200: 'var(--ambrosia-green-200)',
          300: 'var(--ambrosia-green-300)',
          400: 'var(--ambrosia-green-400)',
          500: 'var(--ambrosia-green-500)',
          600: 'var(--ambrosia-green-600)',
          700: 'var(--ambrosia-green-700)',
          800: 'var(--ambrosia-green-800)',
          900: 'var(--ambrosia-green-900)',
          950: 'var(--ambrosia-green-950)',
        },
      },
    },
  },
  plugins: [],
  darkMode: ['class', '[data-theme="dark"]'],
  corePlugins: {
    preflight: false,
  },
  blocklist: ['container'],
};