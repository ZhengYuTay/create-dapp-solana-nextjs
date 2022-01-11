import React, { useEffect, useState } from "react";
import ContentHeader from "../components/ContentHeader";
import SidebarLogo from "../components/SidebarLogo";
import SidebarNavigation from "../components/SidebarNavigation";
import MobileLogo from "../components/MobileLogo";
import type { NextPage } from "next";
import Image from "next/image";
import { type } from "os";
const currencies = [
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
interface Props {
  data: any;
}
const Overview: NextPage<Props> = (props) => {
  const [isExpanded, toggleExpansion] = useState(true);
  /*   console.log(props.data[1].quotes.USDAUD); */
  const { data } = props;

  return (
    <div className="relative min-h-screen md:flex">
      <div className="flex justify-between px-2 py-2 text-gray-100 bg-gray-800 md:hidden">
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
        } sidebar bg-gray-100 text-gray-700 w-64 space-y-6 z-50 px-2 absolute inset-y-0 left-0 transform -translate-x-full md:relative md:translate-x-0 transition duration-200 ease-in-out`}
      >
        <SidebarLogo />

        <SidebarNavigation />
      </div>
      <div className="flex-1 text-xs font-bold bg-gradient-to-r from-lagrangelight to-lagrangedark">
        <ContentHeader />
        <div className="text-center ">
          <h1 className="text-2xl">Overview</h1>
        </div>
        <div>
          <div className="px-2 py-2">
            <table className="w-full shadow-lg bg-white">
              <thead>
                <tr>
                  <th className="bg-lagrangesidebardarkopacity border text-left">
                    --
                  </th>
                  <th className="bg-lagrangesidebardarkopacity border text-left">
                    <Image
                      src="https://s2.coinmarketcap.com/static/img/coins/64x64/3408.png"
                      alt="USDC"
                      width={24}
                      height={24}
                    />
                    USDC
                  </th>
                  <th className="bg-lagrangesidebardarkopacity border text-left">
                    <Image
                      src="https://s2.coinmarketcap.com/static/img/coins/64x64/8123.png"
                      alt="USDC"
                      width={24}
                      height={24}
                    />
                    AUDT
                  </th>
                  <th className="bg-lagrangesidebardarkopacity border text-left">
                    <Image
                      src="https://s2.coinmarketcap.com/static/img/coins/64x64/2989.png"
                      alt="EURS"
                      width={24}
                      height={24}
                    />
                    EURS
                  </th>
                  <th className="bg-lagrangesidebardarkopacity border text-left">
                    <Image
                      src="https://s2.coinmarketcap.com/static/img/coins/64x64/4075.png"
                      alt="XCHF"
                      width={24}
                      height={24}
                    />
                    XCHF
                  </th>
                  <th className="bg-lagrangesidebardarkopacity border text-left">
                    <Image
                      src="https://s2.coinmarketcap.com/static/img/coins/64x64/5494.png"
                      alt="NZDs"
                      width={24}
                      height={24}
                    />
                    NZDs
                  </th>
                  <th className="bg-lagrangesidebardarkopacity border text-left">
                    <Image
                      src="https://s2.coinmarketcap.com/static/img/coins/64x64/9045.png"
                      alt="JPYC"
                      width={24}
                      height={24}
                    />
                    JPYC
                  </th>
                  <th className="bg-lagrangesidebardarkopacity border text-left">
                    <Image
                      src="https://s2.coinmarketcap.com/static/img/coins/64x64/5181.png"
                      alt="TRYB"
                      width={24}
                      height={24}
                    />
                    TRYB
                  </th>
                  <th className="bg-lagrangesidebardarkopacity border text-left">
                    <Image
                      src="https://s2.coinmarketcap.com/static/img/coins/64x64/4139.png"
                      alt="BRZ"
                      width={24}
                      height={24}
                    />
                    BRZ
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="bg-lagrangesidebardarkopacity border text-left">
                    <Image
                      src="https://s2.coinmarketcap.com/static/img/coins/64x64/3408.png"
                      alt="USDC"
                      width={24}
                      height={24}
                    />
                    USDC
                  </td>
                  <td>-</td>
                  <td>
                    <p className="text-2xs">
                      {data[0].quotes.USDAUD.toFixed(5)}
                    </p>
                  </td>
                  <td>
                    <p className="text-2xs">
                      {data[0].quotes.USDEUR.toFixed(5)}
                    </p>
                  </td>
                  <td>
                    <p className="text-2xs">
                      {data[0].quotes.USDCHF.toFixed(5)}
                    </p>
                  </td>
                  <td>
                    <p className="text-2xs">
                    {data[0].quotes.USDNZD.toFixed(5)}
                    </p>
                  </td>
                  <td>
                    <p className="text-2xs">
                    {data[0].quotes.USDJPY.toFixed(4)}
                    </p>
                  </td>
                  <td>
                    <p className="text-2xs">{data[0].quotes.USDTRY}</p>
                  </td>
                  <td>
                    <p className="text-2xs">{data[0].quotes.USDBRL}</p>
                  </td>
                </tr>
                <tr>
                  <td className="bg-lagrangesidebardarkopacity border text-left">
                    <Image
                      src="https://s2.coinmarketcap.com/static/img/coins/64x64/8123.png"
                      alt="USDC"
                      width={24}
                      height={24}
                    />
                    AUDT
                  </td>
                  <td>
                    <p className="text-2xs">{data[1].quotes.AUDUSD}</p>
                  </td>
                  <td>-</td>
                  <td>
                    <p className="text-2xs">{data[1].quotes.AUDEUR}</p>
                  </td>
                  <td>
                    <p className="text-2xs">{data[1].quotes.AUDCHF}</p>
                  </td>
                  <td>
                    <p className="text-2xs">{data[1].quotes.AUDNZD}</p>
                  </td>
                  <td>
                    <p className="text-2xs">
                    {data[1].quotes.AUDJPY.toFixed(4)}
                    </p>
                  </td>
                  <td>
                    <p className="text-2xs">{data[1].quotes.AUDTRY}</p>
                  </td>
                  <td>
                    <p className="text-2xs">{data[1].quotes.AUDBRL}</p>
                  </td>
                </tr>
                <tr>
                  <td className="bg-lagrangesidebardarkopacity border text-left">
                    <Image
                      src="https://s2.coinmarketcap.com/static/img/coins/64x64/2989.png"
                      alt="EURS"
                      width={24}
                      height={24}
                    />
                    EURS
                  </td>
                  <td>{data[2].quotes.EURUSD}</td>
                  <td>{data[2].quotes.EURAUD}</td>
                  <td>-</td>
                  <td>{data[2].quotes.EURCHF}</td>
                  <td>{data[2].quotes.EURNZD}</td>
                  <td>
                  {data[2].quotes.EURJPY.toFixed(4)}
                  </td>
                  <td>{data[2].quotes.EURTRY}</td>
                  <td>{data[2].quotes.EURBRL}</td>
                </tr>
                <tr>
                  <td className="bg-lagrangesidebardarkopacity border text-left">
                    <Image
                      src="https://s2.coinmarketcap.com/static/img/coins/64x64/4075.png"
                      alt="XCHF"
                      width={24}
                      height={24}
                    />
                    XCHF
                  </td>
                  <td>{data[3].quotes.CHFUSD}</td>
                  <td>{data[3].quotes.CHFAUD}</td>
                  <td>{data[3].quotes.CHFEUR}</td>
                  <td>-</td>
                  <td>{data[3].quotes.CHFEUR}</td>
                  <td>{data[3].quotes.CHFJPY.toFixed(4)}
                  </td>
                  <td>{data[3].quotes.CHFTRY}</td>
                  <td>{data[3].quotes.CHFBRL}</td>
                </tr>
                <tr>
                  <td className="bg-lagrangesidebardarkopacity border text-left">
                    <Image
                      src="https://s2.coinmarketcap.com/static/img/coins/64x64/5494.png"
                      alt="NZDs"
                      width={24}
                      height={24}
                    />
                    NZDs
                  </td>
                  <td>{data[4].quotes.NZDUSD}</td>
                  <td>{data[4].quotes.NZDAUD}</td>
                  <td>{data[4].quotes.NZDEUR}</td>
                  <td>{data[4].quotes.NZDCHF}</td>
                  <td>-</td>
                  <td>
                  {data[4].quotes.NZDJPY.toFixed(4)}
                    </td>
                  <td>{data[4].quotes.NZDTRY}</td>
                  <td>{data[4].quotes.NZDBRL}</td>
                </tr>
                <tr>
                  <td className="bg-lagrangesidebardarkopacity border text-left">
                    <Image
                      src="https://s2.coinmarketcap.com/static/img/coins/64x64/9045.png"
                      alt="JPYC"
                      width={24}
                      height={24}
                    />
                    JPYC
                  </td>
                  <td>
                  {data[5].quotes.JPYUSD.toFixed(4)}
                    </td>
                  <td>
                  {data[5].quotes.JPYAUD.toFixed(4)}
                    </td>
                  <td>
                  {data[5].quotes.JPYEUR.toFixed(4)}
                    </td>
                  <td>
                  {data[5].quotes.JPYCHF.toFixed(4)}
                  </td>
                  <td>
                  {data[5].quotes.JPYNZD.toFixed(4)}
                  
                  </td>
                  <td>-</td>
                  <td>
                  {data[5].quotes.JPYTRY.toFixed(4)}

                    </td>
                  <td>
                  {data[5].quotes.JPYBRL.toFixed(4)}
                  </td>
                </tr>
                <tr>
                  <td className="bg-lagrangesidebardarkopacity border text-left">
                    <Image
                      src="https://s2.coinmarketcap.com/static/img/coins/64x64/5181.png"
                      alt="TRYB"
                      width={24}
                      height={24}
                    />
                    TRYB
                  </td>
                  <td>{data[6].quotes.TRYUSD}</td>
                  <td>{data[6].quotes.TRYAUD}</td>
                  <td>{data[6].quotes.TRYEUR}</td>
                  <td>{data[6].quotes.TRYCHF}</td>
                  <td>{data[6].quotes.TRYNZD}</td>
                  <td>{data[6].quotes.TRYJPY}</td>
                  <td>-</td>
                  <td>{data[6].quotes.TRYBRL}</td>
                </tr>
                <tr>
                  <td className="bg-lagrangesidebardarkopacity border text-left">
                    <Image
                      src="https://s2.coinmarketcap.com/static/img/coins/64x64/4139.png"
                      alt="BRZ"
                      width={24}
                      height={24}
                    />
                    BRZ
                  </td>
                  <td>{data[7].quotes.BRLUSD}</td>
                  <td>{data[7].quotes.BRLAUD}</td>
                  <td>{data[7].quotes.BRLEUR}</td>
                  <td>{data[7].quotes.BRLCHF}</td>
                  <td>{data[7].quotes.BRLNZD}</td>
                  <td>{data[7].quotes.BRLJPY}</td>
                  <td>{data[7].quotes.BRLTRY}</td>
                  <td>-</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Overview;

export async function getServerSideProps() {
  const accessKey = "74676f0feb3ce4f81eda70c39b1eeaf9";
  const endpoint = "https://api.currencylayer.com/live";
  const sourceCurrencyPairs = currencies.map((source) => ({
    ...source,
    currencies: currencies
      .map(({ fiatSymbol }) => fiatSymbol)
      .filter((currency) => currency !== source.fiatSymbol),
  }));

  const pairs = await Promise.all(
    sourceCurrencyPairs.map(async (pair) => {
      const url = `${endpoint}?access_key=${accessKey}&source=${
        pair.fiatSymbol
      }&currencies=${pair.currencies.join(",")}&format=1`;
      return {
        ...pair,
        quotes: (await (await fetch(url)).json()).quotes,
      };
    })
  );

  if (!pairs) {
    return {
      notFound: true,
    };
  }
  return {
    props: {
      data: pairs,
    },
    // will be passed to the page component as props
  };
}
