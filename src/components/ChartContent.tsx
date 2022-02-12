import Link from "next/link";
import { GetStaticProps, GetStaticPaths, GetServerSideProps } from 'next'
import Image from "next/image";
/* import { useRouter } from "next/router"; */
import { useEffect, useState } from "react";
import cheerio from 'cheerio'
import axios from 'axios'

/* import ChartLine from "../../public/Chartstabil.png"; */
import SelectDownIcon from "../../public/select-down.png";

import type { NextPage } from "next";
import Coins from "./Coins";

interface Props {

 title: string;
 lastScraped: string;

  }
const ChartContent: NextPage<Props> = (props: {

  title: string;
  lastScraped: string;

}) => {

console.log(props.title)

  return (
    <div className="pb-5 ml-6 bg-white rounded shadow-lg xs:ml-0 border-lagrangeborder xxl:w-112 lg:w-112 md:w-112 sm:w-112 xs:w-90">
      <div className="">
        <div className="">
          <p className="pt-4 ml-5 text-lg font-normal">USDT / USDC</p>

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
      {console.log(props)}
        <div className=""><Coins data={props.title} /></div>
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
/* 
export async function getServerSideProps(context: any) {

  const coinList = await fetch('https://sandbox-api.coinmarketcap.com/v1/cryptocurrency/listings/latest', { 
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'X-CMC_PRO_API_KEY': '134ef0ef-be0e-44a4-8b21-ed45afc54cdb'
    }
  
  }).then((res) => res.json());
  console.log(coinList);
    return {
      props: {
        coinLists : coinList
      }
    }
  
    
  }
   */

/*   export const getStaticProps: GetStaticProps = async (context) => {
    const { data } = await axios.get('https://xkcd.com/')
    const $ = cheerio.load(data)
    
    const title = $('#ctitle').text()
    const lastScraped = new Date().toISOString()
    return {
      props: { title, lastScraped },
      revalidate: 10,
    }
  }
 */