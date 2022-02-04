import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

/* import ChartLine from "../../public/Chartstabil.png"; */
import SelectDownIcon from "../../public/select-down.png";

import type { NextPage } from "next";
import coinGecko from "../pages/api/coinGecko";
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

  return (
    <div className="p-2 mx-2 mt-4 bg-white shadow-lg border-lagrangeborder w-112">
      <div>
        <div>
          <p>USDC / USDT</p>
          <p>1.00 - 0.00 %</p>
          <p className="text-base">
            {" "}
            {new Date().getDate()}
            {"/"}
            {new Date().getMonth()}
            {"/"}
            {new Date().getFullYear()}, {new Date().getHours()}:
            {new Date().getMinutes()}
          </p>
        </div>
        <div className="h-20">

</div>
        <div className="">
          <hr className=" bg-gray-900"/>
        </div>
        <div className="h-20">

        </div>
        <div className="flex items-center justify-between p-2 rounded bg-lagrangegraybackground">
          {" "}
          <div className="flex flex-wrap items-center self-center justify-center sm:text-2xl xs:text-xs">
            <Image
              src="https://s2.coinmarketcap.com/static/img/coins/64x64/3408.png"
              alt="USDC"
              width={32}
              height={32}
              layout="fixed"
            />
            <p className="px-2 py-2 text-white">USDT</p>
          </div>
          <div className="flex items-center space-x-2">
            <p className="pr-2 text-white">1.00$</p>{" "}
            <p className="pr-2 text-lagrangered">0.00</p>
            <Image
              src={SelectDownIcon}
              alt="Select Down"
              className="w-8 h-82"
            />
          </div>
        </div>
        <div className="h-4"></div>
        <div className="flex items-center justify-between p-2 rounded bg-lagrangegraybackground">
          {" "}
          <div className="flex flex-wrap items-center self-center justify-center sm:text-2xl xs:text-xs">
            <Image
              src="https://s2.coinmarketcap.com/static/img/coins/64x64/3408.png"
              alt="USDC"
              width={32}
              height={32}
              layout="fixed"
            />
            <p className="px-2 py-2 text-white">USDC</p>
          </div>
          <div className="flex items-center space-x-2">
            <p className="pr-2 text-white">1.00$</p>{" "}
            <p className="pr-2 text-green-700">0.00</p>
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
  const coinList = await CoinGeckoClient.coins.fetch("bitcoin", {});

  return {
    props: {
      coinList: coinList,
    },
  };

  /* const accessKey = "74676f0feb3ce4f81eda70c39b1eeaf9";
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
    }; */
}
