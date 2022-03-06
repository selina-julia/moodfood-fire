module.exports = {
  prefix: "",

  theme: {
    colors: {
      transparent: "transparent",
      current: "currentColor",
      lightyellow: "#FFFBF7",
    },
  },

  plugins: [
    require('@tailwindcss/line-clamp'),
  ],

  content: ["./src/**/*.{html,ts}"],

  darkMode: "class", // or 'media' or 'class'
  theme: {
    extend: {},
  },
  variants: {
    extend: {},
  },
};
