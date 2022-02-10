import React, { useEffect, useState, useCallback, useRef } from "react";
import ContentHeader from "../components/ContentHeader";
import SidebarLogo from "../components/SidebarLogo";
import SidebarNavigation from "../components/SidebarNavigation";
import MobileLogo from "../components/MobileLogo";
import { getData } from "./api/jupiter-api-example";
import Image from "next/image";
import { type } from "os";
import EURS from "../../public/coin/2989.png";
import USDC from "../../public/coin/3408.png";
import USDT from "../../public/coin/825.png";
import JPYC from "../../public/coin/9045.png";
import TRYB from "../../public/coin/5181.png";
import BRZ from "../../public/coin/4139.png";
import Head from "next/head";
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
import axios from "axios";

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

const Pools = (props) => {
  const [usd, setUsd] = useState();
  const [ageur, setAgeur] = useState();
  const [brz, setBrz] = useState();
  const [jpyc, setJpyc] = useState();
  const [bilira, setBilira] = useState();

  //// FOR solana ////
  const [changeUsdBalance, setChangeUsdBalance] = useState();

  //////-----  token balance ------/////////
  const [usdbalance, setUsdbalance] = useState();
  const [ageurbalance, setAgeurbalance] = useState();
  const [brzbalance, setBrzbalance] = useState();
  const [usdtbalance, setUsdtbalance] = useState();
  const [bilirabalance, setBilirabalance] = useState();
  ////////////-----finish-----//////////////////////

  //////-----  token balance USD ------/////////
  const [usdcbalance$, setUsdcbalance$] = useState();
  const [ageurbalance$, setAgeurbalance$] = useState();
  const [brzbalance$, setBrzbalance$] = useState();
  const [usdtbalance$, setUsdtbalance$] = useState();
  const [bilirabalance$, setBilirabalance$] = useState();
  ////////////-----finish-----//////////////////////

  //////----- current token balance USD ------/////////
  const [usdcbalance$c, setUsdcbalance$c] = useState();
  const [ageurbalance$c, setAgeurbalance$c] = useState();
  const [brzbalance$c, setBrzbalance$c] = useState();
  const [usdtbalance$c, setUsdtbalance$c] = useState();
  const [bilirabalance$c, setBilirabalance$c] = useState();
  ////////////-----finish-----//////////////////////

  const [mytotalvalue, setMytotalvalue] = useState();
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
    setUsdcbalance$c(Number(usdbalance * usdcbalance$).toFixed(2));
  }, [usd, usdbalance, usdcbalance$]);

  useEffect(() => {
    setAgeurbalance$c(Number(ageurbalance * ageurbalance$).toFixed(2));
  }, [ageur, ageurbalance, ageurbalance$]);

  useEffect(() => {
    setBrzbalance$c(Number(brzbalance * brzbalance$).toFixed(2));
  }, [brz, brzbalance, brzbalance$]);

  useEffect(() => {
    setUsdtbalance$c(Number(usdtbalance * usdtbalance$).toFixed(2));
  }, [jpyc, usdtbalance, usdcbalance$]);

  useEffect(() => {
    setBilirabalance$c(Number(bilirabalance * bilirabalance$).toFixed(2));
  }, [bilirabalance, bilirabalance$]);

  useEffect(() => {
    setMytotalvalue(
      Number(
        usdcbalance$ +
          ageurbalance$ +
          brzbalance$ +
          usdtbalance$ +
          bilirabalance$
      ).toFixed(2)
    );
  });

  useEffect(() => {
    //-----------------usd-----------------//
    async function fetchUsd() {
      const response = await fetch(
        "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=usd-coin&order=market_cap_desc&per_page=100&page=1&sparkline=false"
      );
      const data = await response.json();
      console.log(data.map((d) => d.total_volume));
      setUsd(data.map((d) => d.total_volume));
    }
    fetchUsd();

    //-----------------ageur-----------------//
    async function fetchAgeur() {
      const response = await fetch(
        "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=ageur&order=market_cap_desc&per_page=100&page=1&sparkline=false"
      );
      const data = await response.json();
      console.log(data.map((d) => d.total_volume));
      setAgeur(data.map((d) => d.total_volume));
    }
    fetchAgeur();

    //-----------------JPYC-----------------//
    async function fetchJpyc() {
      const response = await fetch(
        "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=jpyc&order=market_cap_desc&per_page=100&page=1&sparkline=false"
      );
      const data = await response.json();
      console.log(data.map((d) => d.total_volume));
      setJpyc(data.map((d) => d.total_volume));
    }
    fetchJpyc();

    //-----------------brz-----------------//
    async function fetchBrz() {
      const response = await fetch(
        "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=brz&order=market_cap_desc&per_page=100&page=1&sparkline=false"
      );
      const data = await response.json();
      console.log(data.map((d) => d.total_volume));
      setBrz(data.map((d) => d.total_volume));
    }
    fetchBrz();

    //-----------------brz-----------------//
    async function fetchBilira() {
      const response = await fetch(
        "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=bilira&order=market_cap_desc&per_page=100&page=1&sparkline=false"
      );
      const data = await response.json();
      console.log(data.map((d) => d.total_volume));
      setBilira(data.map((d) => d.total_volume));
    }
    fetchBilira();

    //------------sol change usd------------///
    async function changeUsd() {
      const response = await fetch(
        "https://api.coingecko.com/api/v3/simple/price?ids=solana&vs_currencies=usd"
      );
      const data = await response.json();
      console.log("sol usd " + data.solana.usd);
      setChangeUsdBalance(data.solana.usd);
    }
    changeUsd();

    //------------USDC change usd------------///
    async function changeUsdc() {
      const response = await fetch(
        "https://api.coingecko.com/api/v3/simple/price?ids=usd-coin&vs_currencies=usd"
      );
      const data = await response.json();
      console.log("usdc usd  " + data["usd-coin"].usd);
      setUsdcbalance$(data["usd-coin"].usd.toFixed(2));
    }
    changeUsdc();

    //------------USDT change usd------------///
    async function changeUsdt() {
      const response = await fetch(
        "https://api.coingecko.com/api/v3/simple/price?ids=tether&vs_currencies=usd"
      );
      const data = await response.json();
      console.log("usdt usd  " + data.tether.usd);
      setUsdtbalance$(data.tether.usd.toFixed(2));
    }
    changeUsdt();

    //------------Ageur change usd------------///
    async function changeAgeur() {
      const response = await fetch(
        "https://api.coingecko.com/api/v3/simple/price?ids=ageur&vs_currencies=usd"
      );
      const data = await response.json();
      console.log("ageur usd  " + data.ageur.usd);
      setAgeurbalance$(data.ageur.usd.toFixed(2));
    }
    changeAgeur();

    //------------Brz change usd------------///
    async function changeBrz() {
      const response = await fetch(
        "https://api.coingecko.com/api/v3/simple/price?ids=brz&vs_currencies=usd"
      );
      const data = await response.json();
      console.log("brz usd  " + data.brz.usd);
      setBrzbalance$(data.brz.usd.toFixed(2));
    }
    changeBrz();

    //------------Brz change usd------------///
    async function changeBilira() {
      const response = await fetch(
        "https://api.coingecko.com/api/v3/simple/price?ids=bilira&vs_currencies=usd"
      );
      const data = await response.json();
      console.log("bilira usd  " + data.bilira.usd);
      setBilirabalance$(data.bilira.usd.toFixed(2));
    }
    changeBilira();

    //----USDC balance -----///

    const getUSDCBalance = async () => {
      const walletAddress = publicKey;
      const tokenMintAddress = "EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v";
      const response = await axios({
        url: `https://api.mainnet-beta.solana.com`,
        method: "post",
        headers: { "Content-Type": "application/json" },
        data: {
          jsonrpc: "2.0",
          id: 1,
          method: "getTokenAccountsByOwner",
          params: [
            walletAddress,
            {
              mint: tokenMintAddress,
            },
            {
              encoding: "jsonParsed",
            },
          ],
        },
      });

      if (
        Array.isArray(response?.data?.result?.value) &&
        response?.data?.result?.value?.length > 0 &&
        response?.data?.result?.value[0]?.account?.data?.parsed?.info
          ?.tokenAmount?.amount > 0
      ) {
        Number(
          response?.data?.result?.value[0]?.account?.data?.parsed?.info?.tokenAmount?.uiAmount.toFixed(
            5
          )
        );
        setUsdbalance(
          response?.data?.result?.value[0]?.account?.data?.parsed?.info?.tokenAmount?.uiAmount.toFixed(
            5
          )
        );
        console.log(
          "USDC Balance:   " +
            response?.data?.result?.value[0]?.account?.data?.parsed?.info?.tokenAmount?.uiAmount.toFixed(
              5
            )
        );
      } else {
        setUsdbalance(0);
        console.log(
          "USDC Balance:   " +
            response?.data?.result?.value[0]?.account?.data?.parsed?.info?.tokenAmount?.uiAmount.toFixed(
              5
            )
        );
      }
    };
    getUSDCBalance();

    ///--- USDC Balance FINISH ---- /////

    //----USDT balance -----///

    const getUSDTBalance = async () => {
      const walletAddress = publicKey;
      const tokenMintAddress = "Es9vMFrzaCERmJfrF4H2FYD4KCoNkY11McCe8BenwNYB";
      const response = await axios({
        url: `https://api.mainnet-beta.solana.com`,
        method: "post",
        headers: { "Content-Type": "application/json" },
        data: {
          jsonrpc: "2.0",
          id: 1,
          method: "getTokenAccountsByOwner",
          params: [
            walletAddress,
            {
              mint: tokenMintAddress,
            },
            {
              encoding: "jsonParsed",
            },
          ],
        },
      });

      // console.log(response.data.result.value[0].account.data.parsed.info.tokenAmount)

      if (
        Array.isArray(response?.data?.result?.value) &&
        response?.data?.result?.value?.length > 0 &&
        response?.data?.result?.value[0]?.account?.data?.parsed?.info
          ?.tokenAmount?.amount > 0
      ) {
        Number(
          response?.data?.result?.value[0]?.account?.data?.parsed?.info?.tokenAmount?.uiAmount.toFixed(
            5
          )
        );
        setUsdtbalance(
          response?.data?.result?.value[0]?.account?.data?.parsed?.info?.tokenAmount?.uiAmount.toFixed(
            5
          )
        );
        console.log(
          "USDT Balance:   " +
            response?.data?.result?.value[0]?.account?.data?.parsed?.info?.tokenAmount?.uiAmount.toFixed(
              5
            )
        );
      } else {
        setUsdtbalance(0);
        console.log(
          "USDT Balance:   " +
            response?.data?.result?.value[0]?.account?.data?.parsed?.info?.tokenAmount?.uiAmount.toFixed(
              5
            )
        );
      }
    };
    getUSDTBalance();

    ///--- USDT Balance FINISH ---- /////

    //----Ageur balance -----///

    const getAgeurBalance = async () => {
      const walletAddress = publicKey;
      const tokenMintAddress = "CbNYA9n3927uXUukee2Hf4tm3xxkffJPPZvGazc2EAH1";
      const response = await axios({
        url: `https://api.mainnet-beta.solana.com`,
        method: "post",
        headers: { "Content-Type": "application/json" },
        data: {
          jsonrpc: "2.0",
          id: 1,
          method: "getTokenAccountsByOwner",
          params: [
            walletAddress,
            {
              mint: tokenMintAddress,
            },
            {
              encoding: "jsonParsed",
            },
          ],
        },
      });

      if (
        Array.isArray(response?.data?.result?.value) &&
        response?.data?.result?.value?.length > 0 &&
        response?.data?.result?.value[0]?.account?.data?.parsed?.info
          ?.tokenAmount?.amount > 0
      ) {
        Number(
          response?.data?.result?.value[0]?.account?.data?.parsed?.info?.tokenAmount?.uiAmount.toFixed(
            5
          )
        );
        setAgeurbalance(
          response?.data?.result?.value[0]?.account?.data?.parsed?.info?.tokenAmount?.uiAmount.toFixed(
            5
          )
        );
        console.log(
          "Ageur Balance:   " +
            response?.data?.result?.value[0]?.account?.data?.parsed?.info?.tokenAmount?.uiAmount.toFixed(
              5
            )
        );
      } else {
        setAgeurbalance(0);
        console.log(
          "Ageur Balance:   " +
            response?.data?.result?.value[0]?.account?.data?.parsed?.info?.tokenAmount?.uiAmount.toFixed(
              5
            )
        );
      }
    };
    getAgeurBalance();

    ///--- Ageur Balance FINISH ---- /////

    //----Brz balance -----///

    const getBrzBalance = async () => {
      const walletAddress = publicKey;
      const tokenMintAddress = "FtgGSFADXBtroxq8VCausXRr2of47QBf5AS1NtZCu4GD";
      const response = await axios({
        url: `https://api.mainnet-beta.solana.com`,
        method: "post",
        headers: { "Content-Type": "application/json" },
        data: {
          jsonrpc: "2.0",
          id: 1,
          method: "getTokenAccountsByOwner",
          params: [
            walletAddress,
            {
              mint: tokenMintAddress,
            },
            {
              encoding: "jsonParsed",
            },
          ],
        },
      });

      // console.log(response.data.result.value[0].account.data.parsed.info.tokenAmount)

      if (
        Array.isArray(response?.data?.result?.value) &&
        response?.data?.result?.value?.length > 0 &&
        response?.data?.result?.value[0]?.account?.data?.parsed?.info
          ?.tokenAmount?.amount > 0
      ) {
        Number(
          response?.data?.result?.value[0]?.account?.data?.parsed?.info?.tokenAmount?.uiAmount.toFixed(
            5
          )
        );
        setBrzbalance(
          response?.data?.result?.value[0]?.account?.data?.parsed?.info?.tokenAmount?.uiAmount.toFixed(
            5
          )
        );
        console.log(
          "BRZ Balance:   " +
            response?.data?.result?.value[0]?.account?.data?.parsed?.info?.tokenAmount?.uiAmount.toFixed(
              5
            )
        );
      } else {
        setBrzbalance(0);
        console.log("BRZ Balance:   " + 0);
      }
    };
    getBrzBalance();

    ///--- Brz Balance FINISH ---- /////

    //----BiLira balance -----///

    const getBiliraBalance = async () => {
      const walletAddress = publicKey;
      const tokenMintAddress = "A94X2fRy3wydNShU4dRaDyap2UuoeWJGWyATtyp61WZf";
      const response = await axios({
        url: `https://api.mainnet-beta.solana.com`,
        method: "post",
        headers: { "Content-Type": "application/json" },
        data: {
          jsonrpc: "2.0",
          id: 1,
          method: "getTokenAccountsByOwner",
          params: [
            walletAddress,
            {
              mint: tokenMintAddress,
            },
            {
              encoding: "jsonParsed",
            },
          ],
        },
      });

      if (
        Array.isArray(response?.data?.result?.value) &&
        response?.data?.result?.value?.length > 0 &&
        response?.data?.result?.value[0]?.account?.data?.parsed?.info
          ?.tokenAmount?.amount > 0
      ) {
        Number(
          response?.data?.result?.value[0]?.account?.data?.parsed?.info?.tokenAmount?.uiAmount.toFixed(
            5
          )
        );
        setBilirabalance(
          response?.data?.result?.value[0]?.account?.data?.parsed?.info?.tokenAmount?.uiAmount.toFixed(
            5
          )
        );
        console.log(
          "BiLira Balance:   " +
            response?.data?.result?.value[0]?.account?.data?.parsed?.info?.tokenAmount?.uiAmount.toFixed(
              5
            )
        );
      } else {
        setBilirabalance(0);
        console.log(
          "BiLira Balance:   " +
            response?.data?.result?.value[0]?.account?.data?.parsed?.info?.tokenAmount?.uiAmount.toFixed(
              5
            )
        );
      }
    };
    getBiliraBalance();

    /* BiLira Balance FINISH */

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

    const walletBalanceSOL = (
      walletBalance / LAMPORTS_PER_SOL
    ).toLocaleString();
    setMybalance(walletBalanceSOL);
  }, [connection, publicKey]);
  checkBalance();
  let fromKeypair = Keypair.generate();

  const connectiontestnet = useRef(
    new Connection(clusterApiUrl("mainnet-beta"))
  );

  const testnetbalance = async () => {
    const testnetBalance = await connectiontestnet.current.getBalanceAndContext(
      fromKeypair.publicKey,
      "confirmed"
    );
  };

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
        } sidebar bg-white xs:bg-white text-gray-700 w-80 xs:w-80 space-y-6 px-6 py-4 z-50 absolute inset-y-0 left-0 transform -translate-x-full md:relative md:translate-x-0 transition duration-200 ease-in-out shadow-xl`}
      >
        <SidebarLogo />

        <SidebarNavigation />
      </div>
      <div className="flex-1 text-xs font-bold bg-gradient-to-r from-lagrangelight to-lagrangedark">
        <ContentHeader />
        <div className="py-2 text-center ">
          {/*    <h1 className="text-2xl">Pools</h1> */}
          {/* <h2 className="text-xl">Pools are in test mode please do not deposit</h2> */}
          <div className="flex flex-wrap justify-between p-2 mx-1 overflow-hidden">
            <div className="w-1/4 py-2 mx-1 my-1 overflow-hidden bg-white border rounded shadow-lg border-lagrangegraybackground">
              <div className="py-4 text-lg font-normal xs:text-base">
                Total Value Locked
              </div>
              {/* {usd}<br />
              {brz}*/}
              <div className="text-3xl xs:text-xl">
                {" "}
                $ 0.00
                {/* {Number(Number(usd) + Number(brz) + Number(bilira) + Number(jpyc) + Number(ageur)).toLocaleString()} */}
              </div>
            </div>

            <div className="w-1/4 px-1 py-2 mx-1 my-1 overflow-hidden bg-white border rounded shadow-lg border-lagrangegraybackground">
              <div className="py-4 text-lg font-normal xs:text-base">
                LAG Price Value
              </div>
              <div className="text-3xl xs:text-xl">$ 0.00</div>
            </div>

            <div className="w-1/4 px-1 py-2 mx-1 my-1 overflow-hidden bg-white border rounded shadow-lg border-lagrangegraybackground">
              <div className="py-4 text-lg font-normal xs:text-base">
                My Total Value
              </div>
              <div className="text-3xl xs:text-xl">
                {/*  $ {Number(Number(mybalance) * Number(changeUsdBalance))}*/}
                $ 0.00
                {/* {Number(usdcbalance$c) +
                  Number(ageurbalance$c) +
                  Number(brzbalance$c) +
                  Number(usdtbalance$c) +
                  Number(bilirabalance$c) +
                  Number(Number(mybalance) * Number(changeUsdBalance))} */}
              </div>
            </div>
          </div>
        </div>

        <div>
          <div className="flex justify-center px-2">
            <div className="w-11/12 px-2 py-2 mx-1 my-1 overflow-hidden bg-white border rounded shadow-lg border-lagrangegraybackground">
              <div className="text-2xl font-normal"> Account Balance</div>
            </div>
          </div>
          <div>
            <div className="flex justify-center px-2">
              <div className="flex justify-center w-11/12 px-2 py-2 mx-1 my-1 overflow-hidden bg-white border rounded shadow-lg border-lagrangegraybackground">
                <table className="w-11/12 text-lg table-auto">
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
                            src={USDC}
                            alt="USDC"
                            width={32}
                            height={32}
                            layout="fixed"
                          />
                          <p className="px-2 py-2">USDC</p>
                        </div>
                      </td>
                      <td className="text-center">$ {usdcbalance$}</td>
                      <td className="text-center">{usdbalance}</td>
                      <td className="text-center">$ {usdcbalance$c}</td>
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
                      <td className="text-center">$ {ageurbalance$}</td>
                      <td className="text-center">
                        {ageurbalance == undefined ? 0 : ageurbalance}
                      </td>
                      <td className="text-center">$ {ageurbalance$c}</td>
                    </tr>
                    <tr>
                      <td>
                        <div className="flex flex-wrap items-center self-center justify-center sm:text-2xl xs:text-xs">
                          <Image
                            src={USDT}
                            alt="USDT"
                            width={32}
                            height={32}
                            layout="fixed"
                          />
                          <p className="px-2 py-2">USDT</p>
                        </div>
                      </td>
                      <td className="text-center">$ {usdcbalance$}</td>
                      <td className="text-center">{usdtbalance}</td>
                      <td className="text-center">$ {usdtbalance$c}</td>
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
                      <td className="text-center">$ {bilirabalance$}</td>
                      <td className="text-center">
                        {bilirabalance == undefined ? 0 : bilirabalance}
                      </td>
                      <td className="text-center">$ {bilirabalance$c}</td>
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
                      <td className="text-center">$ {brzbalance$}</td>
                      <td className="text-center">
                        {brzbalance == undefined ? 0 : brzbalance}
                      </td>
                      <td className="text-center">$ {brzbalance$c}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-center p-2">
          <div className="w-11/12 px-2 py-2 mx-1 my-1 overflow-hidden bg-white border rounded shadow-lg border-lagrangegraybackground">
            <div className="text-xl font-normal"> Pools</div>
            <div className="text-lg font-normal">
              Pools are in testing. Please do not deposit
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Pools;
