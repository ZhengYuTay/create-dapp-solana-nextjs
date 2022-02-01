import React, { useEffect, useState, useCallback, useRef } from "react";
import ContentHeader from "../components/ContentHeader";
import SidebarLogo from "../components/SidebarLogo";
import SidebarNavigation from "../components/SidebarNavigation";
import MobileLogo from "../components/MobileLogo";
import { getData } from "./api/jupiter-api-example";
import type { NextPage } from "next";
import Image from "next/image";
import { type } from "os";
import EURS from "../../public/coin/2989.png";
import JPYC from "../../public/coin/9045.png";
import TRYB from "../../public/coin/5181.png";
import BRZ from "../../public/coin/4139.png";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import {
  WalletError,
  WalletNotConnectedError,
} from "@solana/wallet-adapter-base";
import {
  Keypair,
  SystemProgram,
  Transaction,
  LAMPORTS_PER_SOL,
  clusterApiUrl,
  Connection,
} from "@solana/web3.js";
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
interface Props {
  swappableOutputForSol: any;
}
const Pools: NextPage<Props> = (props) => {
  const [isExpanded, toggleExpansion] = useState(true);
  const { data } = props;
  const [mybalance, setMybalance] = useState(String);

  const { swappableOutputForSol } = props;
  const { connection } = useConnection();
  const { wallet } = useWallet();
  const { publicKey } = useWallet();
  const _publicKey = publicKey?.toBase58();
  const gelsolbalance = async () => {};
  useEffect(() => {
    gelsolbalance();
    checkBalance();
  }, []);

  const checkBalance = useCallback(async () => {
    if (!publicKey) {
      throw (
        new WalletNotConnectedError() && console.log("Wallet not connected")
      );
    }

    const walletBalance = await connection.getBalance(publicKey, "confirmed");

    const walletBalanceSOL = (walletBalance / LAMPORTS_PER_SOL).toFixed(2);
    setMybalance(walletBalanceSOL);
  }, [connection, publicKey]);
  checkBalance();
  let fromKeypair = Keypair.generate();
  console.log("-----------------");

  const connectiontestnet = useRef(new Connection(clusterApiUrl("devnet")));

  console.log(connectiontestnet);
  const testnetbalance = async () => {
    const testnetBalance = await connectiontestnet.current.getBalanceAndContext(
      fromKeypair.publicKey,
      "confirmed"
    );
    console.log(testnetBalance);
  };
  console.log("-----------------");
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
          <div className="flex flex-wrap justify-between p-2 mx-1 overflow-hidden">
            <div className="w-1/4 py-2 mx-1 my-1 overflow-hidden bg-white border shadow-lg border-lagrangegraybackground rounded-xl">
              <div className="py-4 text-lg">Total Value Locked</div>
              <div>$7.487.195,25</div>
            </div>

            <div className="w-1/4 px-1 py-2 mx-1 my-1 overflow-hidden bg-white border shadow-lg border-lagrangegraybackground rounded-xl">
              <div className="py-4 text-lg">LAG Price Value</div>
              <div>$--</div>
            </div>

            <div className="w-1/4 px-1 py-2 mx-1 my-1 overflow-hidden bg-white border shadow-lg border-lagrangegraybackground rounded-xl">
              <div className="py-4 text-lg">My Total Value</div>
              <div>
                $ {console.log(_publicKey)} {mybalance}
              </div>
            </div>
          </div>
        </div>
        <h1 className="text-lg text-center">Account Balance</h1>
        <div className="flex justify-center p-2">
          <div className="flex justify-center w-11/12 px-2 py-2 mx-1 my-1 overflow-hidden bg-white border shadow-lg border-lagrangegraybackground rounded-xl">
            <table className="text-lg table-auto">
              <thead>
                <tr>
                  <th></th>
                  <th>Price</th>
                  <th>Balances</th>
                  <th>Value</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>
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
                  </td>
                  <td>$ 1.00</td>
                  <td className="text-center">0</td>
                  <td className="text-center">$ 0.00</td>
                </tr>
                <tr>
                  <td>
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
                  </td>
                  <td>{data[2].quotes.EURUSD.toFixed(3)}</td>
                  <td className="text-center">0</td>
                  <td className="text-center">$ 0.00</td>
                </tr>
                <tr>
                  <td>
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
                  </td>
                  <td>$ {data[5].quotes.JPYUSD.toFixed(3)}</td>
                  <td className="text-center">0</td>
                  <td className="text-center">$ 0.00</td>
                </tr>
                <tr>
                  <td>
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
                  </td>
                  <td>$ {data[6].quotes.TRYUSD.toFixed(3)}</td>
                  <td className="text-center">0</td>
                  <td className="text-center">$ 0.00</td>
                </tr>
                <tr>
                  <td>
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
                  </td>
                  <td>$ {data[7].quotes.BRLUSD.toFixed(3)}</td>
                  <td className="text-center">0</td>
                  <td className="text-center">$ 0.00</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div className="flex justify-center p-2">
          <div className="w-11/12 px-2 py-2 mx-1 my-1 overflow-hidden bg-white border shadow-lg border-lagrangegraybackground rounded-xl">
            <div className="text-xl"> Pools</div>
            <div className="text-lg">
              Pools are in testing. Please do not deposit
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Pools;

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
