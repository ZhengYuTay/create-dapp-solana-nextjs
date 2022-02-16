import React, { useEffect, useState } from "react";
import ContentHeader from "../components/ContentHeader";
import SidebarLogo from "../components/SidebarLogo";
import SidebarNavigation from "../components/SidebarNavigation";
import MobileLogo from "../components/MobileLogo";
import type { NextPage } from "next";
import Image from "next/image";

import EURS from "../../public/coin/2989.png";
import JPYC from "../../public/coin/9045.png";
import TRYB from "../../public/coin/5181.png";
import BRZ from "../../public/coin/4139.png";
import Head from "next/head";
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

  const { data } = props;

  return (
    <div className="relative min-h-screen md:flex">
      <Head>
        <title>Lagrange.fi</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
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
        } sidebar bg-white xs:bg-gray-100 text-gray-700 w-80 space-y-6 px-6 py-4 z-50 absolute inset-y-0 left-0 transform -translate-x-full md:relative md:translate-x-0 transition duration-200 ease-in-out shadow-xl`}
      >
        <SidebarLogo />

        <SidebarNavigation />
      </div>
      <div className="flex-1 text-xs font-bold bg-gradient-to-r from-lagrangelight to-lagrangedark">
        <ContentHeader />

        <div className="p-6 ">
          <div className="">
            <div className="bg-white ">
              <h1 className="p-2 text-2xl font-normal">Market Overview</h1>
            </div>
            <table className="w-full bg-white shadow-lg">
              <thead>
                <tr>
                  <th className="text-left border place-self-center"></th>
                  <th className="py-2 text-left border place-self-center">
                    <div className="flex flex-wrap items-center self-center justify-center sm:text-2xl xs:text-xs">
                      <Image
                        src="https://s2.coinmarketcap.com/static/img/coins/64x64/3408.png"
                        alt="USDC"
                        width={32}
                        height={32}
                        layout="fixed"
                      />
                      <p className="px-2 py-2">USDC</p>
                    </div>
                  </th>

                  <th className="text-left border place-self-center">
                    <div className="flex flex-wrap items-center self-center justify-center sm:text-2xl xs:text-xs">
                      <Image
                        src={EURS}
                        alt="agEUR"
                        width={32}
                        height={32}
                        layout="fixed"
                      />
                      <p className="px-2 py-2">agEUR</p>
                    </div>
                  </th>

                  <th className="text-left border ">
                    <div className="flex flex-wrap items-center self-center justify-center sm:text-2xl xs:text-xs">
                      <Image
                        src={JPYC}
                        alt="JPYC"
                        width={32}
                        height={32}
                        layout="fixed"
                      />
                      <p className="px-2 py-2">JPYC</p>
                    </div>
                  </th>
                  <th className="text-left border">
                    <div className="flex flex-wrap items-center self-center justify-center sm:text-2xl xs:text-xs">
                      <Image
                        src={TRYB}
                        alt="TRYB"
                        width={32}
                        height={32}
                        layout="fixed"
                      />
                      <p className="px-2 py-2">TRYB</p>
                    </div>
                  </th>
                  <th className="text-left border">
                    <div className="flex flex-wrap items-center self-center justify-center sm:text-2xl xs:text-xs">
                      <Image
                        src={BRZ}
                        alt="BRZ"
                        width={32}
                        height={32}
                        layout="fixed"
                      />
                      <p className="px-2 py-2">BRZ</p>
                    </div>
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="grid px-2 py-2 text-left border justify-items-center">
                    <div className="flex flex-wrap items-center self-center justify-center sm:text-2xl xs:text-xs">
                      <Image
                        src="https://s2.coinmarketcap.com/static/img/coins/64x64/3408.png"
                        alt="USDC"
                        width={32}
                        height={32}
                      />
                      <p className="px-2 py-2">USDC</p>
                    </div>
                  </td>
                  <td className="border">
                    <p className="text-center sm:text-xl xs:text-xs">-</p>
                  </td>

                  <td className="border">
                    <p className="text-center sm:text-xl xs:text-xs">
                      {data[0].quotes.USDEUR.toFixed(3)}
                    </p>
                  </td>

                  <td className="border">
                    <p className="text-center sm:text-xl xs:text-xs">
                      {data[0].quotes.USDJPY.toFixed(3)}
                    </p>
                  </td>
                  <td className="border">
                    <p className="text-center sm:text-xl xs:text-xs">
                      {data[0].quotes.USDTRY.toFixed(3)}
                    </p>
                  </td>
                  <td className="border">
                    <p className="text-center sm:text-xl xs:text-xs">
                      {data[0].quotes.USDBRL.toFixed(3)}
                    </p>
                  </td>
                </tr>

                <tr>
                  <td className="grid py-2 text-left border justify-items-center">
                    <div className="flex flex-wrap items-center self-center justify-center sm:text-2xl xs:text-xs">
                      <Image src={EURS} alt="agEUR" width={32} height={32} />
                      <p className="px-2 py-2">agEUR</p>
                    </div>
                  </td>
                  <td className="border">
                    <p className="text-center sm:text-xl xs:text-xs">
                      {data[2].quotes.EURUSD.toFixed(3)}
                    </p>
                  </td>

                  <td className="border">
                    <p className="text-center sm:text-xl xs:text-xs">-</p>
                  </td>

                  <td className="border">
                    <p className="text-center sm:text-xl xs:text-xs">
                      {data[2].quotes.EURJPY.toFixed(3)}
                    </p>
                  </td>
                  <td className="border">
                    <p className="text-center sm:text-xl xs:text-xs">
                      {data[2].quotes.EURTRY.toFixed(3)}
                    </p>
                  </td>
                  <td className="border">
                    <p className="text-center sm:text-xl xs:text-xs">
                      {data[2].quotes.EURBRL.toFixed(3)}
                    </p>
                  </td>
                </tr>

                <tr>
                  <td className="grid py-2 text-left border justify-items-center">
                    <div className="flex flex-wrap items-center self-center justify-center sm:text-2xl xs:text-xs">
                      <Image src={JPYC} alt="JPYC" width={32} height={32} />
                      <p className="px-2 py-2">JPYC</p>
                    </div>
                  </td>
                  <td className="border">
                    <p className="text-center sm:text-xl xs:text-xs">
                      {data[5].quotes.JPYUSD.toFixed(3)}
                    </p>
                  </td>

                  <td className="border">
                    <p className="text-center sm:text-xl xs:text-xs">
                      {data[5].quotes.JPYEUR.toFixed(3)}
                    </p>
                  </td>

                  <td className="border">
                    <p className="text-center sm:text-xl xs:text-xs">-</p>
                  </td>
                  <td className="border">
                    <p className="text-center sm:text-xl xs:text-xs">
                      {data[5].quotes.JPYTRY.toFixed(3)}
                    </p>
                  </td>
                  <td className="border">
                    <p className="text-center sm:text-xl xs:text-xs">
                      {data[5].quotes.JPYBRL.toFixed(3)}
                    </p>
                  </td>
                </tr>
                <tr>
                  <td className="grid py-2 text-left border justify-items-center">
                    <div className="flex flex-wrap items-center self-center justify-center sm:text-2xl xs:text-xs">
                      <Image src={TRYB} alt="TRYB" width={32} height={32} />
                      <p className="px-2 py-2">TRYB</p>
                    </div>
                  </td>
                  <td className="border">
                    <p className="text-center sm:text-xl xs:text-xs">
                      {data[6].quotes.TRYUSD.toFixed(3)}
                    </p>
                  </td>

                  <td className="border">
                    <p className="text-center sm:text-xl xs:text-xs">
                      {data[6].quotes.TRYEUR.toFixed(3)}
                    </p>
                  </td>

                  <td className="border">
                    <p className="text-center sm:text-xl xs:text-xs">
                      {data[6].quotes.TRYJPY.toFixed(3)}
                    </p>
                  </td>
                  <td className="border">
                    <p className="text-center sm:text-xl xs:text-xs">-</p>
                  </td>
                  <td className="border">
                    <p className="text-center sm:text-xl xs:text-xs">
                      {data[6].quotes.TRYBRL.toFixed(3)}
                    </p>
                  </td>
                </tr>
                <tr>
                  <td className="grid py-2 text-left border justify-items-center">
                    <div className="flex flex-wrap items-center self-center justify-center sm:text-2xl xs:text-xs">
                      <Image src={BRZ} alt="BRZ" width={32} height={32} />
                      <p className="px-2 py-2">BRZ</p>
                    </div>
                  </td>
                  <td className="border">
                    <p className="text-center sm:text-xl xs:text-xs">
                      {data[7].quotes.BRLUSD.toFixed(3)}
                    </p>
                  </td>

                  <td className="border">
                    <p className="text-center sm:text-xl xs:text-xs">
                      {data[7].quotes.BRLEUR.toFixed(3)}
                    </p>
                  </td>

                  <td className="border">
                    <p className="text-center sm:text-xl xs:text-xs">
                      {data[7].quotes.BRLJPY.toFixed(3)}
                    </p>
                  </td>
                  <td className="border">
                    <p className="text-center sm:text-xl xs:text-xs">
                      {data[7].quotes.BRLTRY.toFixed(3)}
                    </p>
                  </td>
                  <td className="border">
                    <p className="text-center sm:text-xl xs:text-xs">-</p>
                  </td>
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
