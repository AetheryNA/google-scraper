/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./views/**/*.{hbs,njk,html}', './src/views/**/*.{hbs,njk,html}'],
  theme: {
    extend: {},
    colors: {
      blue: '#1fb6ff',
      purple: '#a855f7',
      pink: '#ec4899',
      orange: '#ff7849',
      green: '#13ce66',
      yellow: '#ffc82c',
      gray: '#8492a6',
      white: '#fff',
      indigo: '#6366f1',
    },
  },
  plugins: [],
};
