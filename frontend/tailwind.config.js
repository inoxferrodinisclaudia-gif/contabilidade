/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{js,ts,jsx,tsx}',
    './pages/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#E60000',
        background: '#0D0D0D',
        surface: '#111111',
        border: '#303030',
        text: '#F5F5F5',
      },
      borderRadius: {
        none: '0px',
      },
    },
  },
  plugins: [],
};
