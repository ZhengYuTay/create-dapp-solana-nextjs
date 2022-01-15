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
const Pools: NextPage<Props> = (props) => {
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
        } sidebar bg-gradient-to-r from-lagrangesidebarlightopacity to-lagrangesidebardarkopacity xs:bg-lagrangesidebarmobile text-gray-700 w-80 xs:w-52 space-y-6 px-1 z-50 absolute inset-y-0 left-0 transform -translate-x-full md:relative md:translate-x-0 transition duration-200 ease-in-out shadow-xl`}
      >
        <SidebarLogo />

        <SidebarNavigation />
      </div>
      <div className="flex-1 text-xs font-bold bg-gradient-to-r from-lagrangelight to-lagrangedark">
        <ContentHeader />
        <div className="py-2 text-center ">
          <h1 className="text-2xl">Pools</h1>
          {/* <h2 className="text-xl">Pools are in test mode please do not deposit</h2> */}
          <div className="flex flex-wrap mx-1 overflow-hidden">

  <div className="mx-1 my-1 w-1/4 overflow-hidden py-2 shadow-lg bg-white border border-lagrangegraybackground rounded-xl"> 
  <div className="py-4">Total Value Locked</div>
  <div>$7.487.195,25</div>
  </div>

  <div className="mx-1 my-1 px-1 w-1/4 overflow-hidden py-2 shadow-lg bg-white border border-lagrangegraybackground rounded-xl">
  <div className="py-4">DFX Price Value</div>
  <div>$1,03</div>
  </div>

  <div className="mx-1 my-1 px-1 w-1/4 overflow-hidden py-2 shadow-lg bg-white border border-lagrangegraybackground rounded-xl">
  <div className="py-4">My Total Value</div>
  <div>$-</div>
  </div>

</div>
          
        </div>
        <div>
          <div className="px-2 py-2"></div>
        </div>
      </div>
    </div>
  );
};
export default Pools;
