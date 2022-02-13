import React, { PropsWithChildren, useEffect, useState } from "react";
import type { NextPage } from "next";
import Head from "next/head";
import SidebarNavigation from "../components/SidebarNavigation";
import ContentHeader from "../components/ContentHeader";
import SwapContent from "../components/SwapContent";
import ChartContent from "../components/ChartContent";
import SidebarLogo from "../components/SidebarLogo";
import MobileLogo from "../components/MobileLogo";
import Nomics, { IRawCurrencyTicker } from "nomics";
import { useRouter } from "next/router";


interface Props {
  sentence: string;
  data: any;
  historicaldata: any;  
 
}let currencies = [
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
  
  const [isExpanded, toggleExpansion] = useState(true);
  const { data } = props.data;





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
        <div className="flex p-6 xs:flex-wrap md:justify-start sm:justify-center xs:justify-center">
          <div>
            <SwapContent />
          </div>
          <div className="p-0 pt-2">
          
            <ChartContent datacurrencies={props.data} sentence={props.historicaldata}/>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Swap;



export async function getServerSideProps() {
  const accessKey = "74676f0feb3ce4f81eda70c39b1eeaf9";
  const endpoint = "https://api.currencylayer.com/historical";
  const sourceCurrencyPairs = currencies.map((source) => ({
    ...source,
    currencies: currencies
      .map(({ fiatSymbol }) => fiatSymbol)
      .filter((currency) => currency !== source.fiatSymbol),
  }));

  const pairs = await Promise.all(
    sourceCurrencyPairs.map(async (pair) => {
      const url = `${endpoint}?access_key=${accessKey}&date=2021-08-01&currencies=${pair.currencies.join(",")}`;
  
      return {
        ...pair,
        quotes: (await (await fetch(url)).json()).quotes,
      };
    })
  );
  const nomics = new Nomics({
    apiKey: "f5b3378230993f0291d6455887fae08ad928666d"
  });let nomiccurrencies : any = await nomics.currenciesTicker({
    /*
      Specify the interval for interval data in return
      One or more strings can be provided. If not provided, **all** are used.
      The intervals specified will affect what is returned in the response (see below)
    */
    interval: ['1h','1d','7d'], // '1d', '7d', '30d', '365d', 'ytd'
    /*
      Limit the returned currencies to the ones in the following array. If not
      specified, **all** will be returned
    */
    ids: ['USDT','USDC','AUDT','EURS','XCHF','NZDs','JPYC','TRYB','BRZ'],
    /*
      Specify the currency to quote all returned prices in
    */
    quoteCurrency: "USD", // [DEPRECATED] use "convert" below instead
    convert: "USD", // defaults to "USD"
  }).then(nomiccurrencies => (nomiccurrencies));;

 /*  const client = await Promise.all( 

    const nomiccurrencies: IRawCurrencyTicker[];
  nomics.currenciesTicker({
  
    interval: ['1d'], // '1d', '7d', '30d', '365d', 'ytd'
    ids: ['BTC', 'ETH'],
    quoteCurrency: "EUR", // [DEPRECATED] use "convert" below instead
    convert: "EUR", // defaults to "USD"
  }).then(ticker => (nomiccurrencies = ticker));
  );
 */
  

  if (!nomiccurrencies) {
    return {
      notFound: true,
    };
  }

  if (!pairs) {
    return {
      notFound: true,
    };
  }
  return {
    props: {
      data: pairs,
      historicaldata: nomiccurrencies,
     

    },
    // will be passed to the page component as props
  };
}





function nomiccurrencies(nomiccurrencies: any) {
  throw new Error("Function not implemented.");
}

