// default settings can be found here
// https://unpkg.com/browse/tailwindcss@2.2.17/stubs/defaultConfig.stub.js

module.exports = {
  mode: "jit",
  purge: ["./src/**/*.{js,jsx,ts,tsx}"],
  darkMode: "media", // or 'false' or 'class'
  theme: {
    fontWeight: {
      hairline: 100,
      'extra-light': 100,
      thin: 200,
      light: 300,
      normal: 400,
      medium: 510,
      semibold: 600,
      bold: 700,
      extrabold: 800,
      'extra-bold': 800,
      black: 900,
    },
    screens: {
      'xs': '320px',
      'sm': '768px',
      'md': '1024px',
      'lg': '1440px',
      'xl': '1920px',
      'xxl': '2560px',

    },
    fontSize: {

      'xs': '.75rem',
      'sm': '.875rem',
      'lg': '1.125rem',
      'xl': '1.25rem',
      '2xl': '1.5rem',
      '3xl': '1.875rem',
      '4xl': '2.25rem',
      '5xl': '3rem',
      '6xl': '4rem',
      'lagrange': '2.6875rem',
      'lagrangesmallscreen': '2.2675rem',
    },

    fontFamily: {

      'body': ['Roboto', 'sans-serif'],
      'display': ['Montserrat', 'sans-serif'],
      // serif: ['Merriweather', 'thin'],
    },
    extend: {
      width: {
        '128': '33.4rem',
        '112': '31.8rem',
        '270': '16.87rem',
        '292': '18.25rem',
      },
      backgroundImage: {
        'earth':
          "url('https://relaxed-newton-b77a1a.netlify.app/earth.svg')",
        'earthvideo':
          "url('https://relaxed-newton-b77a1a.netlify.app/Earth.mp4')",
        'earthanimated':
          "url('https://firebasestorage.googleapis.com/v0/b/bodrum-7e4c9.appspot.com/o/earthanimated.gif?alt=media&token=c38283d1-f4d7-4d9a-8448-414bfd8c4ff0')",
      },
      /* background: linear-gradient(180deg, #7BFCC5 0%, #9844FE 100%); */

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
        'lagrangeswapbutton': '#2B30B9',
        'lagrangesidebarpoolmenucolor': '#343A400D',
        'lagrangesidebarbuttonbackgroundcolor': '#1C1C1C',
        'lagrange-buttonpro-blue': '#7BFCC5',
        'lagrange-buttonpro-purple': '#9844FE',
        'lagrangeswapbuttoncolor': '#0F1262',
        'lagrangesidebarmenufontcolor': '#3D3D3D'

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
