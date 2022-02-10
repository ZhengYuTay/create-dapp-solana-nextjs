import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

/* import ChartLine from "../../public/Chartstabil.png"; */
import SelectDownIcon from "../../public/select-down.png";

import type { NextPage } from "next";
import coinGecko from "../pages/api/coinGecko";

const currencies = [
  {
    fiatSymbol: "USD",
    cryptoSymbol: "USDC",
    image: "https://s2.coinmarketcap.com/static/img/coins/64x64/3408.png",
  },
  {
    fiatSymbol: "USDT",
    cryptoSymbol: "USDT",
    image: "https://s2.coinmarketcap.com/static/img/coins/64x64/825.png",
  },
];

interface Props {
  coinList: any;
  data: any;
}
const ChartContent: NextPage<Props> = (props) => {
  const [coinData, setCoinData] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      const response = coinGecko.get(`/coins/markets`, {
        params: {
          vs_currency: "usd",
          ids: "bilira",
        },
      });
    };

    fetchData();
  }, []);

  const { coinList } = props;
  const { data } = props;

  return (
    <div className="pb-5 ml-6 bg-white rounded shadow-lg border-lagrangeborder xxl:w-112 lg:w-112 md:w-112 sm:w-112 xs:w-96">
      <div className="">
        <div className="">
          <p className="pt-4 ml-5 text-lg font-normal">USDT / USDC</p>
          {/*  {console.log(data)} */}
          {/*           <p className="font-normal">1.00 - 0.00 %</p> */}
          <p className="mt-4 ml-5 text-base font-normal">
            {" "}
            {new Date().getDate()}
            {"/"}
            {new Date().getMonth()}
            {"/"}
            {new Date().getFullYear()}, {new Date().getHours()}:
            {new Date().getMinutes()}
          </p>
        </div>
        <div className="h-20"></div>
        <div className="">
          <hr className="bg-gray-900 " />
        </div>
        <div className="h-20"></div>
        <div className="flex items-center justify-between p-2 ml-4 mr-4 rounded bg-lagrangegraybackground">
          {" "}
          <div className="flex flex-wrap items-center self-center justify-center font-normal sm:text-2xl xs:text-xs">
            <Image
              src="https://s2.coinmarketcap.com/static/img/coins/64x64/3408.png"
              alt="USDC"
              width={32}
              height={32}
              layout="fixed"
            />
            <p className="px-2 py-2 text-white">USDT</p>
          </div>
          <div className="flex items-center space-x-2 font-normal">
            <p className="pr-2 font-normal text-white">1.00$</p>{" "}
            <p className="pr-2 font-normal text-lagrangered">0.00</p>
            <Image
              src={SelectDownIcon}
              alt="Select Down"
              className="w-8 h-82"
            />
          </div>
        </div>
        <div className="h-6"></div>
        <div className="flex items-center justify-between p-2 ml-4 mr-4 rounded bg-lagrangegraybackground">
          {" "}
          <div className="flex flex-wrap items-center self-center justify-center font-normal sm:text-2xl xs:text-xs">
            <Image
              src="https://s2.coinmarketcap.com/static/img/coins/64x64/3408.png"
              alt="USDC"
              width={32}
              height={32}
              layout="fixed"
            />
            <p className="px-2 py-2 font-normal text-white">USDC</p>
          </div>
          <div className="flex items-center space-x-2">
            <p className="pr-2 font-normal text-white">1.00$</p>{" "}
            <p className="pr-2 font-normal text-green-700">0.00</p>
            <Image
              src={SelectDownIcon}
              alt="Select Down"
              className="w-8 h-82"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
export default ChartContent;

export async function getServerSideProps() {
  const CoinGecko = require("coingecko-api");
  const CoinGeckoClient = new CoinGecko();
  const coinList = await CoinGeckoClient.coins.fetch("solana", {});
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
      coinList: coinList,
    },
    // will be passed to the page component as props
  };
}
