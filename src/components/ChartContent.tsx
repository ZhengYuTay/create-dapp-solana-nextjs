import Link from "next/link";
import Image from "next/image";
import { GetStaticProps, GetStaticPaths, GetServerSideProps } from "next";
import { ReactNode, useEffect, useState } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
import SelectDownIcon from "../../public/select-down.png";
import type { NextPage } from "next";

var Chance = require("chance");
var chance = new Chance();
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);
interface Props {
  sentence?: Array<undefined>;
  usdt?: Array<undefined>;
  usdc?: Array<undefined>;
}

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

/* var datesFrom48Hours = getDateItems(48); */
/* const rakamlarx: any = [];
const rakamlary: any = [];

const usdtnumber: Array<any> = []; */

/* https://docs.google.com/spreadsheets/d/e/2PACX-1vTFdDx6GqM9bFDv_GsJEX90DUOYImOKx7h5M4rVw7TD9sB59g5rRLfK0TlokXdtgJMuD50foANzxBCy/pub?gid=573999951&single=true&output=csv */

const ChartContent: NextPage<Props> = (props: {
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
          <Line options={options} data={datachart} />
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
export default ChartContent;
