import React, {
  FunctionComponent,
  Fragment,
  useEffect,
  useMemo,
  useState,
} from "react";
import { Listbox, Transition } from "@headlessui/react";
import { CheckIcon, SelectorIcon } from "@heroicons/react/solid";
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

      <div className="mb-4 bg-white rounded shadow-lg sm:px-4 xs:px-2 border-lagrangeborder w-128">
        <div>
          <h1 className="py-4 text-4xl font-normal">Swap</h1>
        </div>
        <div className="grid grid-cols-2 grid-rows-1 gap-2 py-2 overflow-hidden">
          <div className="flex items-center px-2">
            <p className="sm:text-lg xs:text-sm font-normal">Max Slippage</p>
          </div>
          <div className="flex justify-end col-span-2 col-start-2 mr-4 box">
            <input
              type="text"
              className=" w-40 py-2 font-normal text-center rounded shadow-lg text-grey-darkest border-lagrangeborder border"
              value="0.5%"
            />
          </div>
        </div>
        <div className="grid grid-cols-2 grid-rows-1 gap-2 py-2 overflow-hidden">
          <div className="flex items-center px-2">
            <p className="sm:text-lg xs:text-sm font-normal">
              Transaction deadline (minutes)
            </p>
          </div>
          <div className="flex justify-end col-span-2 col-start-2 mr-4 box">
            <input
              type="text"
              className="w-40 py-2 font-normal text-center border rounded shadow-lg text-grey-darkest border-lagrangeborder border"
              value="10"
            />
          </div>
        </div>

        {/* from */}
        <div className="py-4 rounded sm:px-2 xs:px-1 border-lagrangegraybackground">
          <div className="grid grid-cols-2 grid-rows-1 gap-2 px-2 overflow-hidden">
            <div className="box">
              <p className="px-2 py-2 text-left sm:text-lg xs:text-sm">
                From ({inputTokenInfo?.symbol})
              </p>
              <input
                name="amount"
                id="amount"
                className="w-10/12 h-12 py-2 text-sm font-normal leading-tight text-center text-gray-700 bg-gray-100 rounded appearance-none border-lagrangeborder focus:outline-none focus:bg-white focus:border-gray-500"
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
            <div className="col-span-2 col-start-2">
              <div className="flex justify-end box">
                <p className="py-2 mr-2 sm:text-lg xs:text-sm">Balance</p>
              </div>
              <div className="flex justify-end">
                <div className="absolute z-40 w-full h-12 border rounded xs:w-40 sm:w-64 bg-lagrangegraybackground">
                  <Listbox
                    value={formValue.inputMint?.toBase58()}
                    onChange={(e?: any) => {
                      const pbKey = new PublicKey(e);
                      if (pbKey) {
                        setFormValue((val) => ({
                          ...val,
                          inputMint: pbKey,
                        }));
                      }
                    }}
                  >
                    <div className="relative">
                      <Listbox.Button className="relative w-full py-2 cursor-default sm:text-lg xs:text-sm h-12 focus:outline-none focus-visible:ring-2 focus-visible:ring-opacity-75 focus-visible:ring-white focus-visible:ring-offset-orange-300 focus-visible:ring-offset-2 focus-visible:border-indigo-500">
                        {inputTokenInfo ? (
                          <Image
                            src={`${inputTokenInfo?.logoURI}`}
                            alt=""
                            width={32}
                            height={32}
                            className="px-1"
                          />
                        ) : (
                          <div className="flex items-center pl-2">
                            <Image
                              src="https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v/logo.png"
                              alt=""
                              width={32}
                              height={32}
                            />
                            <span className="ml-4 text-white sm:text-lg xs:text-sm">
                              USD Coin
                            </span>
                          </div>
                        )}

                        <span className="ml-2 text-white sm:text-lg xs:text-sm">
                          {inputTokenInfo?.name}
                        </span>
                        <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                          <SelectorIcon
                            className="w-10 h-10 text-white"
                            aria-hidden="true"
                          />
                        </span>
                      </Listbox.Button>
                      <Transition
                        as={Fragment}
                        leave="transition ease-in duration-100"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                      >
                        <Listbox.Options className="absolute w-full py-1 mt-1 overflow-auto text-base rounded-md shadow-lg bg-lagrangegraybackground max-h-60 ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                          {allTokenMints
                            .filter((item) =>
                              TrustedTokenAddresses.includes(item)
                            )
                            .map((tokenMint) => (
                              <Listbox.Option
                                key={tokenMint}
                                className={({ active }) =>
                                  `${
                                    active
                                      ? "text-amber-900 bg-amber-100"
                                      : "text-gray-900"
                                  }
                          cursor-default select-none relative py-2 pl-10 pr-4`
                                }
                                value={tokenMint}
                              >
                                {({ selected, active }) => (
                                  <div className="flex justify-self-center">
                                    <Image
                                      src={`${
                                        tokenMap.get(tokenMint)?.logoURI
                                      }`}
                                      alt=""
                                      width={36}
                                      height={36}
                                      className=""
                                    />
                                    <span
                                      className={`${
                                        selected ? "font-medium" : "font-normal"
                                      } block truncate text-white text-base ml-4`}
                                    >
                                      {tokenMap.get(tokenMint)?.name ||
                                        "unknown"}
                                    </span>
                                    {selected ? (
                                      <span
                                        className={`${
                                          active
                                            ? "text-amber-600"
                                            : "text-amber-600"
                                        }
                                absolute inset-y-0 left-0 flex items-center pl-3`}
                                      >
                                        <CheckIcon
                                          className="w-5 h-5 text-white"
                                          aria-hidden="true"
                                        />
                                      </span>
                                    ) : null}
                                  </div>
                                )}
                              </Listbox.Option>
                            ))}
                        </Listbox.Options>
                      </Transition>
                    </div>
                  </Listbox>
                </div>
              </div>
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

          <div className="grid grid-cols-2 grid-rows-1 gap-2 px-2 py-4 overflow-hidden">
            <div className="box">
              <div>
                <p className="px-2 py-2 text-left sm:text-lg xs:text-sm">To-</p>
              </div>
              <div className="w-10/12 h-12 pt-2 leading-tight text-center text-gray-700 bg-gray-100  rounded appearance-none sm:px-2 xs:px-1 sm:text-lg xs:text-sm border-xl border-lagrangeborder focus:outline-none focus:bg-white focus:border-gray-500 s">
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
                        {/* <FeeInfo route={route} /> */}
                      </div>
                    );
                  })()}
              </div>
            </div>
            <div className="col-span-2 col-start-2 box">
              <div className="flex justify-end box">
                {" "}
                <p className="py-2 mr-2 text-center sm:text-lg xs:text-sm">
                  Balance
                </p>
              </div>

              <div className="flex justify-end">
                <div className="absolute w-full h-12 border rounded xs:w-40 sm:w-64 bg-lagrangegraybackground">
                  <Listbox
                    value={formValue.outputMint?.toBase58()}
                    onChange={(e?: any) => {
                      const pbKey = new PublicKey(e);
                      if (pbKey) {
                        setFormValue((val) => ({
                          ...val,
                          outputMint: pbKey,
                        }));
                      }
                    }}
                  >
                    <div className="relative mt-1 place-items-start">
                      <Listbox.Button className="relative w-full text-white rounded cursor-default h-18 focus:outline-none focus-visible:ring-2 focus-visible:ring-opacity-75 focus-visible:ring-white focus-visible:ring-offset-orange-300 focus-visible:ring-offset-2 focus-visible:border-indigo-500">
                        {outputTokenInfo ? (
                          <Image
                            src={`${outputTokenInfo?.logoURI}`}
                            alt=""
                            width={36}
                            height={36}
                            className="px-2"
                          />
                        ) : (
                          <>
                            <span className="ml-2 text-white sm:text-lg xs:text-sm">
                              Select a Token
                            </span>
                          </>
                        )}

                        <span className="px-2 sm:text-lg xs:text-sm">
                          {outputTokenInfo?.name}
                        </span>
                        <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                          <SelectorIcon
                            className="w-10 h-10 text-white"
                            aria-hidden="true"
                          />
                        </span>
                      </Listbox.Button>
                      <Transition
                        as={Fragment}
                        leave="transition ease-in duration-100"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                      >
                        <Listbox.Options className="absolute w-full py-1 mt-1 overflow-auto rounded-md shadow-lg bg-lagrangeborder max-h-60 ring-1 ring-black ring-opacity-5 focus:outline-none">
                          {validOutputMints
                            .filter((item) =>
                              TrustedTokenAddresses.includes(item)
                            )
                            .map((tokenMint) => (
                              <Listbox.Option
                                key={tokenMint}
                                className={({ active }) =>
                                  `${
                                    active
                                      ? "text-amber-900 bg-amber-100"
                                      : "text-gray-900"
                                  }
                          cursor-default select-none relative py-2 pl-8 pr-4`
                                }
                                value={tokenMint}
                              >
                                {({ selected, active }) => (
                                  <div className="flex items-center">
                                    <Image
                                      src={`${
                                        tokenMap.get(tokenMint)?.logoURI
                                      }`}
                                      alt=""
                                      width={36}
                                      height={36}
                                    />
                                    <span
                                      className={`${
                                        selected ? "font-medium" : "font-normal"
                                      } block truncate text-white text-base ml-4`}
                                    >
                                      {" "}
                                      {tokenMap.get(tokenMint)?.name ||
                                        "unknown"}
                                    </span>
                                    {selected ? (
                                      <span
                                        className={`${
                                          active
                                            ? "text-amber-600"
                                            : "text-amber-600"
                                        }
                                absolute inset-y-0 left-0 flex items-center ml-2`}
                                      >
                                        {" "}
                                        <CheckIcon
                                          className="w-5 h-5 text-white"
                                          aria-hidden="true"
                                        />
                                      </span>
                                    ) : null}
                                  </div>
                                )}
                              </Listbox.Option>
                            ))}
                        </Listbox.Options>
                      </Transition>
                    </div>
                  </Listbox>
                </div>
              </div>
            </div>
          </div>
          {/* end */}
          <div className="grid grid-cols-2 grid-rows-1 gap-2 px-2 py-4 overflow-hidden place-content-around">
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
              className="inline-flex justify-center h-11 px-2 py-2 text-base font-normal text-white uppercase rounded shadow-sm xs:w-full sm:w-10/12 place-items-center border-lagrangegraybackground bg-lagrangeswapbutton hover:bg-lagrangepurpledark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 animate-pulse"
            >
              <p className="text-xl text-center">Swap</p>
            </button>

            <button
              className={`${
                loading ? "opacity-50 cursor-not-allowed" : ""
              } xs:w-full sm:w-10/12 uppercase inline-flex justify-center place-self-end h-11 px-2 pt-2 border-lagrangebuttongray text-xl font-normal rounded shadow-sm text-lagrangebuttongray bg-gray-200 hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-offset-2`}
              type="button"
              onClick={refresh}
              disabled={loading}
            >
              {loading && (
                <div
                  className={`${styles.loader} ease-linear rounded-full border-8 border-t-8 border-gray-200`}
                ></div>
              )}
              Refresh rate
            </button>
          </div>
        </div>
        <div className="h-4"></div>
        <div className="px-2 py-2 bg-white rounded shadow-lg border-lagrangeborder">
          <p className="py-2">Total routes: {routes?.length}</p>
          {routes?.[0] &&
            (() => {
              const route = routes[0];
              return (
                <div>
                  <div className="py-2">
                    Best route info :{" "}
                    {route.marketInfos.map((info) => info.marketMeta.amm.label)}
                  </div>
                  <div className="py-2 text-sm">
                    Output:{" "}
                    {route.outAmount / 10 ** (outputTokenInfo?.decimals || 1)}{" "}
                    {outputTokenInfo?.symbol}
                  </div>
                  <FeeInfo route={route} />
                </div>
              );
            })()}
          <div></div>

          {error && <div>Error in Jupiter, try changing your intpu</div>}
        </div>
        <div className="h-4"></div>
      </div>
    </div>
  );
};
export default LagrangeJupiterForm;
