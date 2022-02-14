import React, { PropsWithChildren, useEffect, useState } from "react";
import type { NextPage } from "next";
import Head from "next/head";
import SidebarNavigation from "../components/SidebarNavigation";
import ContentHeader from "../components/ContentHeader";
import SwapContent from "../components/SwapContent";
import ChartContent from "../components/ChartContent";
import SidebarLogo from "../components/SidebarLogo";
import MobileLogo from "../components/MobileLogo";
import Nomics from "nomics";

interface Props {
  sentence: any;
  data: any;
  historicaldata: any;
  exchangedata: any;
  coinList: any;
  datacurrencies: any;
  historicprice: any;
  hi: any;
  usdt: any;
  usdc: any;
}
let currencieslocal = [
  {
    fiatSymbol: "USD",
    cryptoSymbol: "USDC",
    image: "https://s2.coinmarketcap.com/static/img/coins/64x64/3408.png",
  },
  {
    fiatSymbol: "AUD",
    cryptoSymbol: "AUDT",
    image: "https://s2.coinmarketcap.com/static/img/coins/64x64/8123.png",
  },
  {
    fiatSymbol: "EUR",
    cryptoSymbol: "EURS",
    image: "https://s2.coinmarketcap.com/static/img/coins/64x64/2989.png",
  },
  {
    fiatSymbol: "CHF",
    cryptoSymbol: "XCHF",
    image: "https://s2.coinmarketcap.com/static/img/coins/64x64/4075.png",
  },
  {
    fiatSymbol: "NZD",
    cryptoSymbol: "NZDs",
    image: "https://s2.coinmarketcap.com/static/img/coins/64x64/5494.png",
  },
  {
    fiatSymbol: "JPY",
    cryptoSymbol: "JPYC",
    image: "https://s2.coinmarketcap.com/static/img/coins/64x64/9045.png",
  },
  {
    fiatSymbol: "TRY",
    cryptoSymbol: "TRYB",
    image: "https://s2.coinmarketcap.com/static/img/coins/64x64/5181.png",
  },
  {
    fiatSymbol: "BRL",
    cryptoSymbol: "BRZ",
    image: "https://s2.coinmarketcap.com/static/img/coins/64x64/4139.png",
  },
];

const Swap: NextPage<Props> = (props) => {
  const [parentName, setParentName] = useState<string>("John Obi");

  const [isExpanded, toggleExpansion] = useState(true);

  return (
    <div className="relative min-h-screen md:flex">
      <Head>
        <title>Lagrange.fi - Swap</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <div className="flex justify-between px-4 py-2 text-gray-100 bg-gray-800 md:hidden">
        <MobileLogo />
        <button
          onClick={() => toggleExpansion(!isExpanded)}
          className="p-4 mobile-menu-button focus:outline-none focus:bg-gray-700"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-6 h-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>
      </div>
      <div
        className={`${
          isExpanded ? `-translate-x-full` : `translate-x-0`
        } sidebar bg-white text-gray-700 w-80 space-y-6 px-6 py-4 z-50 absolute inset-y-0 left-0 transform -translate-x-full md:relative md:translate-x-0 transition duration-200 ease-in-out shadow-xl`}
      >
        <SidebarLogo />

        <SidebarNavigation />
      </div>

      <div className="flex-1 text-xl font-bold bg-gradient-to-r from-lagrangelight to-lagrangedark">
        <ContentHeader />
        <div className="flex pt-5 xxl:pl-5 xl:pl-5 lg:pl-5 md:pl-5 xs:pl-0 xs:flex-wrap md:justify-start sm:justify-center xs:justify-center">
          <div>
            <SwapContent />
          </div>
          <div className="xxl:pl-5 xl:pl-5 lg:pl-5 md:pl-0">
            <ChartContent
              sentence={props.historicaldata}
              usdt={props.usdt}
              usdc={props.usdc}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Swap;

export async function getServerSideProps() {
  const nomics = new Nomics({
    apiKey: "f5b3378230993f0291d6455887fae08ad928666d",
  });
  let nomiccurrencies: any = await nomics
    .currenciesTicker({
      interval: ["1h", "1d", "7d"], // '1d', '7d', '30d', '365d', 'ytd'

      ids: ["USDT", "USDC", "EURS", "TRYB", "BRZ"],

      convert: "USD", // defaults to "USD"
    })
    .then((nomiccurrencies) => nomiccurrencies);

  if (!nomiccurrencies) {
    return {
      notFound: true,
    };
  }
  function delay(time: number | undefined) {
    return new Promise((resolve) => setTimeout(resolve, time));
  }
  let responseusdt = await fetch(`https://lagrange.fi/api/usdt`);
  await delay(2000);
  let usdt = await responseusdt.json();

  if (!usdt) {
    return {
      notFound: true,
    };
  }

  let responseusdc = await fetch(`https://lagrange.fi/api/usdc`);
  await delay(2000);
  let usdc = await responseusdc.json();

  if (!usdc) {
    return {
      notFound: true,
    };
  }
  return {
    props: {
      /* data: pairs, */
      historicaldata: nomiccurrencies,
      usdt: usdt,
      usdc: usdc,
    },
    // will be passed to the page component as props
  };
}
