// tailwind.config.js
module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  content: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  darkMode: 'class', // or 'media'
  theme: {
    extend: {
      transitionProperty: {
        'colors': 'background-color, border-color, color, fill, stroke',
      },
    },
  },
  variants: {
    extend: {
      backgroundColor: ['dark', 'hover', 'focus', 'active'],
      borderColor: ['dark', 'hover', 'focus', 'active'],
      textColor: ['dark', 'hover', 'focus', 'active'],
    },
  },
  plugins: [],
}
