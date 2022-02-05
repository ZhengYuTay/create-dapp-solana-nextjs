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

const TrustedTokenAddresses = [
  "EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v", // USDC
  "Es9vMFrzaCERmJfrF4H2FYD4KCoNkY11McCe8BenwNYB", // USDT
  "A94X2fRy3wydNShU4dRaDyap2UuoeWJGWyATtyp61WZf", // BILIRA
  "5trVBqv1LvHxiSPMsHtEZuf8iN82wbpDcR5Zaw7sWC3s", // soJPYC
  "6CssfnBjF4Vo56EithaLHLWDF95fLrt48QHsUfZwNnhv", // JPYC
  "FtgGSFADXBtroxq8VCausXRr2of47QBf5AS1NtZCu4GD", // BRZ
  "3uXMgtaMRBcyEtEChgiLMdHDjb5Azr17SQWwQo3ppEH8", // Wrapped BRZ
  "CbNYA9n3927uXUukee2Hf4tm3xxkffJPPZvGazc2EAH1", // agEUR
];

interface IJupiterFormProps {}
type UseJupiterProps = Parameters<typeof useJupiter>[0];

const LagrangeJupiterForm: FunctionComponent<IJupiterFormProps> = (props) => {
 /*  const { publicKey } = useWallet(); */
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
              Transaction deadline (min)
            </p>
          </div>
          <div className="flex justify-end col-span-2 col-start-2 mr-4 box">
            <input
              type="text"
              className="w-40 py-2 font-normal text-center rounded shadow-lg text-grey-darkest border-lagrangeborder border"
              value="10"
            />
          </div>
        </div>

        {/* from */}
        <div className="py-4 rounded sm:px-2 xs:px-1 border-lagrangegraybackground">
          <div className="grid grid-cols-2 grid-rows-1 gap-2 px-2 overflow-hidden">
            <div className="box">
              <p className="px-2 py-2 text-left sm:text-lg xs:text-sm font-normal">
                From ({inputTokenInfo?.symbol})
              </p>
              <input
                name="amount"
                id="amount"
                className="w-292 h-12 border py-2 text-sm font-normal leading-tight text-center text-gray-700 bg-gray-100 rounded appearance-none border-lagrangeborder focus:outline-none focus:bg-white focus:border-gray-500"
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
                <p className="py-2 mr-2 sm:text-lg xs:text-sm font-normal">Balance</p>
              </div>
              <div className="flex justify-end">
                <div className="absolute z-40 h-12 border rounded xs:w-40 sm:w-40 bg-lagrangegraybackground">
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
                            className=""
                          />
                        ) : (
                          <div className="flex items-center">
                            <Image
                              src="https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v/logo.png"
                              alt=""
                              width={32}
                              height={32}
                            />
                            <span className="text-white text-sm">
                              USDT
                            </span>
                          </div>
                        )}

                        <span className="ml-2 text-white sm:text-lg xs:text-sm">
                          {inputTokenInfo?.name}
                        </span>
                      <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                          <SelectorIcon
                            className="w-5 h-5 text-white"
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
          <div className="grid justify-items-center ml-2 mt-4 w-72 ">
            <div>
            {loading && (
            <>
            <div
              className={`${styles.loader} mr-4 ease-linear rounded-full border-8 border-t-8 border-gray-200 h-36 w-36`}
            ></div></>
          )}
            </div>
            <div className="">
            <svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink">
            <rect width="36" height="36" fill="url(#pattern0)"/>
            <defs>
            <pattern id="pattern0" patternContentUnits="objectBoundingBox" width="1" height="1">
            <use xlinkHref="#image0_105_445" transform="scale(0.00195312)"/>
            </pattern>
            <image id="image0_105_445" width="512" height="512" xlinkHref="data:image/png;base64,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"/>
            </defs>
            </svg>
            </div>
          </div>
          
          {/* to */}
          {/* Button Side */}

          <div className="grid grid-cols-2 grid-rows-1 gap-2 px-2 py-4 overflow-hidden">
            <div className="box">
              <div>
                <p className="px-2 py-2 text-left sm:text-lg xs:text-sm font-normal">To-</p>
              </div>
              <div className="w-292 h-12 border leading-tight text-center text-gray-700 bg-gray-100  rounded appearance-none sm:text-lg xs:text-sm border-xl border-lagrangeborder focus:outline-none focus:bg-white focus:border-gray-500">
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
                        
                      </div>
                    );
                  })()}
              </div>
            </div>
            <div className="col-span-2 col-start-2 box">
              <div className="flex justify-end box">
                {" "}
                <p className="py-2 mr-2 text-center sm:text-lg xs:text-sm font-normal">
                  Balance
                </p>
              </div>

              <div className="flex justify-end">
                <div className="absolute h-12 border rounded xs:w-40 sm:w-40 bg-lagrangegraybackground ml-2">
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
                    <div className="relative place-items-center">
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
                            <span className="text-white text-sm">
                              Select a Token
                            </span>
                          </>
                        )}

                        <span className="px-2 sm:text-lg xs:text-sm">
                          {outputTokenInfo?.name}
                        </span>
                        <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                          <SelectorIcon
                            className="w-5 h-5 text-white"
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
              } xs:w-full sm:w-10/12 uppercase inline-flex justify-center place-self-end h-11 px-2 pt-2 border-lagrangebuttongray text-xl font-normal rounded shadow-sm text-lagrangebuttongray bg-gray-200 hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-offset-2 border`}
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
