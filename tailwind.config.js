// default settings can be found here
// https://unpkg.com/browse/tailwindcss@2.2.17/stubs/defaultConfig.stub.js

module.exports = {
  mode: "jit",
  purge: ["./src/**/*.{js,jsx,ts,tsx}"],
  darkMode: "media", // or 'false' or 'class'
  theme: {
    screens: {
      'xs': '320px',
      'sm': '640px',
      'md': '1024px',
      'lg': '1280px',
      'xl': '1920px',


    },

    fontFamily: {

      'body': ['Roboto', 'sans-serif']
      // serif: ['Merriweather', 'thin'],
    },
    extend: {
      colors: {
        'lagrangelight': '#29E1AA26',
        'lagrangedark': '#1A8BFD26',
        'lagrangeborder': '#343A40',
        'lagrangegraybackground': '#373737',
        'lagrangepurple': '#4D54F9',
        'lagrangepurpledark': '#2B30B9',
        'lagrangesidebarmobile': '#E1F0FF',
        'lagrangered': '#D70000',
        'lagrangechartcolor': '#7459D91A',
        'lagrangesidebarlightopacity': '#1A8BFD26',
        'lagrangesidebardarkopacity': '#30D6B126',
        'lagrangegraybackground': '#373737',
        'lagrangebuttondarkblue': '#0F1262',
        'lagrangebuttongray': '#373737',
        'lagrangeswapbutton' : '#2B30B9'


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
