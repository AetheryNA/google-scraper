/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./views/**/*.{hbs,njk,html}', './src/views/**/*.{hbs,njk,html}'],
  theme: {
    extend: {},
    colors: {
      black: {
        default: '#353b48',
      },
      white: {
        default: '#fff',
        500: '#f5f6fa',
        600: '#dcdde1',
      },
      blue: {
        default: '#0097e6',
      },
      purple: '#a855f7',
      pink: '#ec4899',
      indigo: '#6366f1',
    },
  },
  plugins: [],
};
