import React, { PropsWithChildren, useEffect, useState } from "react";
import type { NextPage } from "next";
import Link from "next/link";
import Image from "next/image";
import Head from "next/head";
import SidebarNavigation from "../components/SidebarNavigation";
import ContentHeader from "../components/ContentHeader";
import SwapContent from "../components/SwapContent";
/* import ChartContent from "../components/ChartContent"; */
import SidebarLogo from "../components/SidebarLogo";
import MobileLogo from "../components/MobileLogo";
import Nomics from "nomics";

/* import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js"; */
/* import { Line } from "react-chartjs-2"; */
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';
import SelectDownIcon from "../../public/select-down.png";

var Chance = require("chance");
var chance = new Chance();
/* ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
); */
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

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "top" as const,
    },
    title: {
      display: true,
      text: "Daily Price Chart",
    },
  },
};
const bugun = new Date();
bugun.setDate(bugun.getDate());

var weekday: any = [];

for (let i = 0; i < 7; i++) {
  weekday.push(
    "0" +
      (bugun.getMonth() + 1) +
      "-" +
      ("00" + (bugun.getDate() - i)).slice(-2) +
      " "
  );
}

var labels: any = weekday.reverse();

const RenderLineChart: NextPage<Props> = (props: {
  sentence?: Array<undefined>;
  usdt?: Array<undefined>;
  usdc?: Array<undefined>;
}) => (
  <LineChart width={320} height={240} data={props.usdc?.slice(0,7)}>
    
    <Line type="monotone" dataKey="rate" stroke="#8884d8" />
    <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
    <XAxis dataKey="timestamp" tick={{ fontFamily: 'sans-serif', fontSize: '10px' }}  />
    <YAxis tick={{ fontFamily: 'sans-serif', fontSize: '10px' }}  />
    <Tooltip />
  </LineChart>
);

const ChartContentInside: NextPage<Props> = (props: {
  sentence?: Array<undefined>;
  usdt?: Array<undefined>;
  usdc?: Array<undefined>;
}) => {
  const [usdtnumber, setUsdtnumber] = useState(props.usdt);
  console.log(usdtnumber);
  const [usdcnumber, setUsdcnumber] = useState(props.usdc);
  console.log(usdcnumber);

  const datachart = {
    labels,
    datasets: [
      {
        label: "USDT",
        data: labels.map(() => chance.floating({ min: 0.9999, max: 1.0001 })),
        borderColor: "rgba(43, 48, 185, 1)",
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
      {
        label: "USDC",
        data: labels.map(() => chance.floating({ min: 0.9999, max: 1.0001 })),
        borderColor: "rgba(46, 218, 175, 1)",
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
    ],
  };

  return (
    <div className="pb-5 ml-6 bg-white rounded shadow-lg xs:ml-0 border-lagrangeborder xxl:w-128 lg:w-128 md:w-128 sm:w-128 xs:w-90">
      <div>
        <div>
          <p className="pt-4 ml-5 text-lg font-normal">USDT / USDC</p>
          <div className="flex items-center">
            {props.sentence?.slice(0, 1)?.map((item: any, index: any) => {
              return (
                <>
                  {" "}
                  <p className="pl-5 text-xs font-normal">{item.price} $</p>
                </>
              );
            })}{" "}
            {props.sentence?.slice(1, 2)?.map((item: any, index: any) => {
              return (
                <>
                  {" "}
                  <p className="pl-1 text-xs font-normal">{item.price} $</p>
                </>
              );
            })}
          </div>

          {/*           <p className="font-normal">1.00 - 0.00 %</p> */}
          <p className="mt-4 ml-5 text-xs font-normal">
            {" "}
            {new Date().getDate()}
            {"/"}
            {new Date().getMonth()}
            {"/"}
            {new Date().getFullYear()}, {new Date().getHours()}:
            {new Date().getMinutes()}
          </p>
        </div>

        <div className="h-auto ">
          {/* <Line options={options} data={datachart} /> */}
          <RenderLineChart sentence={props.sentence} data={undefined} historicaldata={undefined} exchangedata={undefined} coinList={undefined} datacurrencies={undefined} historicprice={undefined} hi={undefined} usdt={props.usdt} usdc={props.usdc} />
          
        </div>
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
            {props.sentence?.slice(0, 1)?.map((item: any, index: any) => {
              return item.price > 0 ? (
                <>
                  <p className="pr-2 font-normal text-white sm:text-xl xs:text-sm">
                    {item.price} $
                  </p>
                </>
              ) : (
                <p className="pr-2 font-normal text-white sm:text-xl xs:text-sm">
                  {item.price} $
                </p>
              );
            })}

            {props.sentence?.slice(0, 1)?.map((item: any, index: any) => {
              return item["1d"].price_change > 0 ? (
                <>
                  <p className="pr-2 font-normal text-lagrange-buttonpro-blue sm:text-lg xs:text-xs">
                    % {item["1d"].price_change}
                  </p>
                </>
              ) : (
                <p className="pr-2 font-normal text-lagrangered sm:text-lg xs:text-xs">
                  %{item["1d"].price_change}
                </p>
              );
            })}
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
              src="https://s2.coinmarketcap.com/static/img/coins/64x64/825.png"
              alt="USDC"
              width={32}
              height={32}
              layout="fixed"
            />
            <p className="px-2 py-2 font-normal text-white">USDC</p>
          </div>
          <div className="flex items-center space-x-2">
            {props.sentence?.slice(1, 2)?.map((item: any, index: any) => {
              return item.price > 0 ? (
                <>
                  <p className="pr-2 font-normal text-white sm:text-xl xs:text-sm">
                    {item.price}$
                  </p>
                </>
              ) : (
                <p className="pr-2 font-normal text-white sm:text-xl xs:text-sm">
                  {item.price} $
                </p>
              );
            })}

            {props.sentence?.slice(1, 2)?.map((item: any, index: any) => {
              return item["1d"].price_change > 0 ? (
                <>
                  <p className="pr-2 font-normal text-lagrange-buttonpro-blue sm:text-lg xs:text-xs">
                    % {item["1d"].price_change}
                  </p>
                </>
              ) : (
                <p className="pr-2 font-normal text-lagrangered sm:text-lg xs:text-xs">
                  % {item["1d"].price_change}
                </p>
              );
            })}
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

/**
 *
 * @param props
 * @returns
 */

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
            {/*     <ChartContent
              sentence={props.historicaldata}
              usdt={props.usdt}
              usdc={props.usdc}
            /> */}
            {console.log(props)}
            <ChartContentInside
              historicaldata={props.historicaldata}
              usdt={props.usdt}
              usdc={props.usdc} sentence={props.historicaldata} data={undefined} exchangedata={undefined} coinList={undefined} datacurrencies={undefined} historicprice={undefined} hi={undefined}            />
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
      interval: ["1d"], // '1d', '7d', '30d', '365d', 'ytd'

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
