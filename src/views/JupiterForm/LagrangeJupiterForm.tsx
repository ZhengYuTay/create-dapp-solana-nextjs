import React, { FunctionComponent, useEffect, useMemo, useState } from "react";
import { PublicKey } from "@solana/web3.js";
import { TokenListProvider, TokenInfo } from "@solana/spl-token-registry";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { useJupiter } from "@jup-ag/react-hook";
import Image from "next/image";
import {
  CHAIN_ID,
  INPUT_MINT_ADDRESS,
  OUTPUT_MINT_ADDRESS,
} from "../../constants";

import styles from "./JupiterForm.module.css";
import FeeInfo from "./FeeInfo";
import PoolProviders from "../../components/PoolProviders";
const TrustedTokenAddresses = [
  "EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v", // USDC
  "Es9vMFrzaCERmJfrF4H2FYD4KCoNkY11McCe8BenwNYB", // USDT
  "A94X2fRy3wydNShU4dRaDyap2UuoeWJGWyATtyp61WZf", // BILIRA
  "5trVBqv1LvHxiSPMsHtEZuf8iN82wbpDcR5Zaw7sWC3s", // soJPYC
  "6CssfnBjF4Vo56EithaLHLWDF95fLrt48QHsUfZwNnhv", // JPYC
  "FtgGSFADXBtroxq8VCausXRr2of47QBf5AS1NtZCu4GD", // BRZ
  "3uXMgtaMRBcyEtEChgiLMdHDjb5Azr17SQWwQo3ppEH8", // Wrapped BRZ
  "CbNYA9n3927uXUukee2Hf4tm3xxkffJPPZvGazc2EAH1", // agEUR
  "7g166TuBmnoHKvS2PEkZx6kREZtbfjUxCHGWjCqoDXZv", // acEUR
];

interface IJupiterFormProps {}
type UseJupiterProps = Parameters<typeof useJupiter>[0];
const LagrangeJupiterForm: FunctionComponent<IJupiterFormProps> = (props) => {
  const { publicKey } = useWallet();
  const wallet = useWallet();
  const { connection } = useConnection();
  const [tokenMap, setTokenMap] = useState<Map<string, TokenInfo>>(new Map());

  const [formValue, setFormValue] = useState<UseJupiterProps>({
    amount: 1 * 10 ** 6, // unit in lamports (Decimals)
    inputMint: new PublicKey(INPUT_MINT_ADDRESS),
    outputMint: new PublicKey(OUTPUT_MINT_ADDRESS),
    slippage: 1, // 0.1%
  });

  const [inputTokenInfo, outputTokenInfo] = useMemo(() => {
    return [
      tokenMap.get(formValue.inputMint?.toBase58() || ""),
      tokenMap.get(formValue.outputMint?.toBase58() || ""),
    ];
  }, [formValue.inputMint?.toBase58(), formValue.outputMint?.toBase58()]);

  useEffect(() => {
    new TokenListProvider().resolve().then((tokens) => {
      const tokenList = tokens.filterByChainId(CHAIN_ID).getList();
      /* const tokenList = tokens.filterByChainId(CHAIN_ID).filterByTag('stablecoin').getList(); */

      setTokenMap(
        tokenList.reduce((map, item) => {
          map.set(item.address, item);
          return map;
        }, new Map())
      );
    });
  }, [setTokenMap]);
  const amountInDecimal = useMemo(() => {
    return formValue.amount * 10 ** (inputTokenInfo?.decimals || 1);
  }, [inputTokenInfo, formValue.amount]);

  const { routeMap, allTokenMints, routes, loading, exchange, error, refresh } =
    useJupiter({
      ...formValue,
      amount: amountInDecimal,
    });

  const validOutputMints = useMemo(
    () => routeMap.get(formValue.inputMint?.toBase58() || "") || allTokenMints,
    [routeMap, formValue.inputMint?.toBase58()]
  );

  // ensure outputMint can be swapable to inputMint
  useEffect(() => {
    if (formValue.inputMint) {
      const possibleOutputs = routeMap.get(formValue.inputMint.toBase58());

      if (
        possibleOutputs &&
        !possibleOutputs?.includes(formValue.outputMint?.toBase58() || "")
      ) {
        setFormValue((val) => ({
          ...val,
          outputMint: new PublicKey(possibleOutputs[0]),
        }));
      }
    }
  }, [formValue.inputMint?.toBase58(), formValue.outputMint?.toBase58()]);

  return (
    <div>
     {/*  <PoolProviders /> */}

      <div className="px-2 mb-2 bg-white border-2 rounded-lg shadow-lg border-lagrangeborder">
        <div>
          <h1 className="text-3xl">Swap</h1>
        </div>
        <div className="grid grid-cols-2 grid-rows-2 gap-2 overflow-hidden">
          <div className="box"><p className="text-sm">Max Slippage</p></div>
          <div className="col-span-2 col-start-2 box flex justify-end">
            <input
              type="text"
              className="w-2/3 text-center border-2 rounded-lg shadow-lg text-grey-darkest border-lagrangeborder"
              value="0.5%"
            />
          </div>
        </div>
        <div className="grid grid-cols-2 grid-rows-2 gap-2 overflow-hidden">
          <div className="box"><p className="text-sm">Transaction deadline (minutes)</p></div>
          <div className="col-span-2 col-start-2 box flex justify-end">
            <input
              type="text"
              className="w-2/3 text-center border-2 rounded-lg shadow-lg text-grey-darkest border-lagrangeborder"
              value="10"
            />
          </div>
        </div>

        {/* from */}
        <div className="grid grid-cols-2 grid-rows-2 gap-2 overflow-hidden">
          <div className="box">
            From ({inputTokenInfo?.symbol})
            <input
              name="amount"
              id="amount"
              className="w-full px-4 py-3 pr-8 leading-tight text-gray-700 bg-gray-100 border-2 rounded-lg appearance-none border-lagrangeborder focus:outline-none focus:bg-white focus:border-gray-500"
              value={formValue.amount}
              type="text"
              pattern="[0-9]*"
              onInput={(e: any) => {
                let newValue = Number(e.target?.value || 0);
                newValue = Number.isNaN(newValue) ? 0 : newValue;
                setFormValue((val) => ({
                  ...val,
                  amount: Math.max(newValue, 0),
                }));
              }}
            />
          </div>
          <div className="col-span-2 col-start-2 box">
            Balance -
            <select
              id="inputMint"
              name="inputMint"
              className="w-10/12 px-4 py-3 pr-8 leading-tight text-white border-2 border-gray-200 rounded-lg appearance-none bg-lagrangegraybackground focus:outline-none focus:bg-lagrangegraybackground focus:border-gray-500"
              value={formValue.inputMint?.toBase58()}
              onChange={(e) => {
                const pbKey = new PublicKey(e.currentTarget.value);
                if (pbKey) {
                  setFormValue((val) => ({
                    ...val,
                    inputMint: pbKey,
                  }));
                }
              }}
            >
              {allTokenMints
                .filter((item) => TrustedTokenAddresses.includes(item))
                .map((tokenMint) => {
                  return (
                    <>
                      <option key={tokenMint} value={tokenMint}>
                        {tokenMap.get(tokenMint)?.name || "unknown"}
                      </option>
                    </>
                  );
                })}
            </select>
            {/* yedek select menu  */}
          </div>
        </div>

        {/* refresh */}

        {loading && (
          <div
            className={`${styles.loader} mr-4 ease-linear rounded-full border-8 border-t-8 border-gray-200 h-36 w-36`}
          ></div>
        )}

        {/* to */}

        {/* Button Side */}

        <div className="grid grid-cols-2 grid-rows-2 gap-2 overflow-hidden">
          <div className="box">
            <div>To</div>
            <div className="w-full px-4 py-3 pr-8 leading-tight text-gray-700 bg-gray-100 border-2 rounded-lg appearance-none border-lagrangeborder focus:outline-none focus:bg-white focus:border-gray-500">
              {routes?.[0] &&
                (() => {
                  const route = routes[0];
                  return (
                    <div>
                      <div>
                        {route.outAmount /
                          10 ** (outputTokenInfo?.decimals || 1)}{" "}
                        {outputTokenInfo?.symbol}
                      </div>
                      <FeeInfo route={route} />
                    </div>
                  );
                })()}
            </div>
          </div>
          <div className="col-span-2 col-start-2 box">
            Balance
            <select
              id="outputMint"
              name="outputMint"
              className="w-10/12 px-4 py-3 pr-8 leading-tight text-white border-2 border-gray-200 rounded-lg appearance-none bg-lagrangegraybackground focus:outline-none focus:bg-lagrangegraybackground focus:border-gray-500"
              value={formValue.outputMint?.toBase58()}
              onChange={(e) => {
                const pbKey = new PublicKey(e.currentTarget.value);
                if (pbKey) {
                  setFormValue((val) => ({
                    ...val,
                    outputMint: pbKey,
                  }));
                }
              }}
            >
              {validOutputMints
                .filter((item) => TrustedTokenAddresses.includes(item))
                .map((tokenMint) => {
                  return (
                    <option key={tokenMint} value={tokenMint}>
                      {tokenMap.get(tokenMint)?.name || "unknown"}
                    </option>
                  );
                })}
            </select>
          </div>
        </div>

        {/* end */}

        <div className="grid grid-cols-2 grid-rows-2 gap-2 overflow-hidden">
          <div className="box">
            <button
              type="button"
              disabled={loading}
              onClick={async () => {
                if (
                  !loading &&
                  routes?.[0] &&
                  wallet.signAllTransactions &&
                  wallet.signTransaction &&
                  wallet.sendTransaction &&
                  wallet.publicKey
                ) {
                  const swapResult = await exchange({
                    wallet: {
                      sendTransaction: wallet.sendTransaction,
                      publicKey: wallet.publicKey,
                      signAllTransactions: wallet.signAllTransactions,
                      signTransaction: wallet.signTransaction,
                    },
                    route: routes[0],
                    confirmationWaiterFactory: async (txid) => {
                      console.log("sending transaction");
                      await connection.confirmTransaction(txid);
                      console.log("confirmed transaction");

                      return await connection.getTransaction(txid, {
                        commitment: "confirmed",
                      });
                    },
                  });

                  if ("error" in swapResult) {
                    console.log("Error:", swapResult.error);
                  } else if ("txid" in swapResult) {
                    console.log("Sucess:", swapResult.txid);
                    console.log("Input:", swapResult.inputAmount);
                    console.log("Output:", swapResult.outputAmount);
                  }
                }
              }}
              className="inline-flex items-center w-11/12 px-4 py-2 text-base font-medium text-white uppercase border-2 border-transparent rounded-md shadow-sm bg-lagrangepurple hover:bg-lagrangepurpledark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Swap
            </button>
          </div>
          <div className="col-span-2 col-start-2 box">
            <button
              className={`${
                loading ? "opacity-50 cursor-not-allowed" : ""
              } w-11/12 uppercase inline-flex items-center px-4 py-2 border-2 border-transparent text-base font-medium rounded-md shadow-sm text-white bg-lagrangepurple hover:bg-lagrangepurpledark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500`}
              type="button"
              onClick={refresh}
              disabled={loading}
            >
              {loading && (
                <div
                  className={`${styles.loader} mr-4 ease-linear rounded-full border-8 border-t-8 border-gray-200 h-24 w-24`}
                ></div>
              )}
              Refresh rate
            </button>
          </div>
        </div>
      </div>

      <div>Total routes: {routes?.length}</div>
      {routes?.[0] &&
        (() => {
          const route = routes[0];
          return (
            <div>
              <div>
                Best route info :{" "}
                {route.marketInfos.map((info) => info.marketMeta.amm.label)}
              </div>
              <div>
                Output:{" "}
                {route.outAmount / 10 ** (outputTokenInfo?.decimals || 1)}{" "}
                {outputTokenInfo?.symbol}
              </div>
              <FeeInfo route={route} />
            </div>
          );
        })()}

      {error && <div>Error in Jupiter, try changing your intpu</div>}
    </div>
  );
};
export default LagrangeJupiterForm;
