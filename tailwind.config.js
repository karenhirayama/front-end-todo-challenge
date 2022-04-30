const colors = require('tailwindcss/colors');

module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      color: {
        primary: '#00ABFB',
        gray: colors.blue,
      }
    },
  },
  plugins: [],
}
