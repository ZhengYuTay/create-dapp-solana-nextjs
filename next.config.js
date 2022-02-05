/** @type {import('next').NextConfig} */

const withPlugins = require("next-compose-plugins");

/** eslint-disable @typescript-eslint/no-var-requires */
const withTM = require("next-transpile-modules")([
  "@solana/wallet-adapter-base",
  // Uncomment wallets you want to use
  // "@solana/wallet-adapter-bitpie",
  // "@solana/wallet-adapter-coin98",
  // "@solana/wallet-adapter-ledger",
  // "@solana/wallet-adapter-mathwallet",
  "@solana/wallet-adapter-phantom",
  "@solana/wallet-adapter-react",
  "@solana/wallet-adapter-solflare",
  "@solana/wallet-adapter-sollet",
  // "@solana/wallet-adapter-solong",
  // "@solana/wallet-adapter-torus",
  "@solana/wallet-adapter-wallets",
  // "@project-serum/sol-wallet-adapter",
  // "@solana/wallet-adapter-ant-design",
]);

// add this if you need LESS
// also install less and less-loader
// const withLess = require("next-with-less");

const plugins = [
  // add this if you need LESS
  // [withLess, {
  //   lessLoaderOptions: {
  //     /* ... */
  //   },
  // }],
  [
    withTM,
    {
      webpack5: true,
      reactStrictMode: true,
      images: {
        domains: ['avatars.dicebear.com', 'raw.githubusercontent.com', 's2.coinmarketcap.com', 'images.unsplash.com', 'avatars.githubusercontent.com','relaxed-newton-b77a1a.netlify.app'],
      },
    },
  ],
];

const nextConfig = {
  swcMinify: false,
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve.fallback.fs = false;
     
    }
    
    return config;
  },
};

module.exports = withPlugins(plugins, nextConfig);
