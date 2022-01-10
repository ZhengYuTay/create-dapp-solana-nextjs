import React, { useEffect,useState } from 'react';
import ContentHeader from "../components/ContentHeader";
import SidebarLogo from '../components/SidebarLogo';
import SidebarNavigation from "../components/SidebarNavigation";
import MobileLogo from '../components/MobileLogo';
import type { NextPage } from "next"

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
const Overview: NextPage = ({pairs}) => {
    const [isExpanded, toggleExpansion] = useState(true);
    return (
        <div className="relative min-h-screen md:flex">
            <div className="bg-gray-800 text-gray-100 flex justify-between md:hidden px-2 py-2">
          <MobileLogo/>
          <button onClick={() => toggleExpansion(!isExpanded)} className="mobile-menu-button p-4 focus:outline-none focus:bg-gray-700">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
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

        <div className={`${
              isExpanded ? `-translate-x-full` : `translate-x-0`
            } sidebar bg-gray-100 text-gray-700 w-64 space-y-6 px-2 absolute inset-y-0 left-0 transform -translate-x-full md:relative md:translate-x-0 transition duration-200 ease-in-out`}>
         
          <SidebarLogo/>
  
          <SidebarNavigation />
        </div>
            <div className="bg-gradient-to-r from-lagrangelight to-lagrangedark flex-1 px-1 text-xl font-bold">
            <ContentHeader/>
            <div>Market Overview</div>
            

            <table  className="table-fixed text-2xs">
  <thead>
    <tr>
      <th>Boş</th>
       {pairs.map((pair) =>(<th key={pair.cryptoSymbol}>{pair.cryptoSymbol}</th>))}
    
    </tr>
  </thead>
  <tbody>
   
    <td>USDC</td>
    <td>---</td>
    <td>{pairs[0].quotes.USDAUD}</td>
    <td>{pairs[0].quotes.USDEUR}</td>
    <td>{pairs[0].quotes.USDCHF}</td>
    <td>{pairs[0].quotes.USDNZD}</td>
    <td>{pairs[0].quotes.USDJPY}</td>
    <td>{pairs[0].quotes.USDTRY}</td>
    <td>{pairs[0].quotes.USDBRL}</td>
    
    {console.log(pairs[0].quotes)}
    
  </tbody>
</table>

            </div>
            </div>
        
    )
}
export default Overview

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
    
  
 
  
    return {
      props: {
        pairs:pairs
        
      },
      // will be passed to the page component as props
    };
  }