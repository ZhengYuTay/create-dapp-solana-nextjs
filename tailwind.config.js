// default settings can be found here
// https://unpkg.com/browse/tailwindcss@2.2.17/stubs/defaultConfig.stub.js

module.exports = {
  mode: "jit",
  purge: ["./src/**/*.{js,jsx,ts,tsx}"],
  darkMode: "media", // or 'false' or 'class'
  theme: {

    fontFamily: {

      'body': ['Roboto',]
      // serif: ['Merriweather', 'serif'],
    },
    extend: {
      colors: {
        'lagrangelight': '#29E1AA40',
        'lagrangedark': '#9078F040',
        'lagrangeborder': '#343A40',
        'lagrangegraybackground': '#373737',
        'lagrangepurple': '#4D54F9',
        'lagrangepurpledark': '#2B30B9',

      },
      // spacing: {
      //   '128': '32rem',
      //   '144': '36rem',
      // },
      // borderRadius: {
      //   '4xl': '2rem',
      // }
    },

  },
  variants: {
    extend: {},
  },
  plugins: [require("@tailwindcss/typography"), require("daisyui")],
  daisyui: {
    styled: true,
    themes: [
      // first one will be the default theme

      // uncomment to enable
      // "light (default)",
      // "dark",
      // "cupcake",
      // "bumblebee",
      // "emerald",
      // "corporate",
      // "synthwave",
      // "retro",
      // "cyberpunk",
      // "valentine",
      // "halloween",
      // "garden",
      // "forest",
      // "aqua",
      // "lofi",
      // "pastel",
      // "fantasy",
      // "wireframe",
      // "black",
      // "luxury",
      // "dracula",
    ],

    base: true,
    utils: true,
    logs: true,
    rtl: false,
  },
};
