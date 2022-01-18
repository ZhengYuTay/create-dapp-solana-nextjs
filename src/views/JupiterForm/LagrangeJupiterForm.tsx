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

      <div className="px-2 mb-4 bg-white border-2 shadow-lg rounded-xl border-lagrangeborder">
        <div>
          <h1 className="py-4 text-3xl">Swap</h1>
        </div>
        <div className="grid grid-cols-2 grid-rows-1 gap-2 py-4 overflow-hidden">
          <div className="box">
            <p className="text-sm">Max Slippage</p>
          </div>
          <div className="flex justify-center col-span-2 col-start-2 box">
            <input
              type="text"
              className="w-10/12 py-2 text-center border-2 shadow-lg rounded-xl text-grey-darkest border-lagrangeborder"
              value="0.5%"
            />
          </div>
        </div>
        <div className="grid grid-cols-2 grid-rows-1 gap-2 py-4 overflow-hidden">
          <div className="box">
            <p className="text-sm">Transaction deadline (minutes)</p>
          </div>
          <div className="flex justify-center col-span-2 col-start-2 box">
            <input
              type="text"
              className="w-10/12 py-2 text-center border-2 shadow-lg rounded-xl text-grey-darkest border-lagrangeborder"
              value="10"
            />
          </div>
        </div>

        {/* from */}
        <div className="grid grid-cols-2 grid-rows-1 gap-2 overflow-hidden">
          <div className="box">
            <p className="text-sm text-center">
              From ({inputTokenInfo?.symbol})
            </p>
            <input
              name="amount"
              id="amount"
              className="w-11/12 h-20 px-2 py-2 mx-2 text-sm font-bold leading-tight text-center text-gray-700 bg-gray-100 border-2 appearance-none rounded-xl border-lagrangeborder focus:outline-none focus:bg-white focus:border-gray-500"
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
            <div className="flex justify-center box">
              <p className="text-sm">Balance</p>
            </div>
            <div className="flex justify-center box">
              <div className="absolute z-40 w-full h-20 border xs:w-36 sm:w-56 bg-lagrangegraybackground rounded-xl">
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
                  <div className="relative mt-1">
                    <Listbox.Button className="relative w-full py-2 pl-2 pr-10 text-xs text-left cursor-default h-18 focus:outline-none focus-visible:ring-2 focus-visible:ring-opacity-75 focus-visible:ring-white focus-visible:ring-offset-orange-300 focus-visible:ring-offset-2 focus-visible:border-indigo-500">
                      {inputTokenInfo ? (
                        <Image
                          src={`${inputTokenInfo?.logoURI}`}
                          alt=""
                          width={36}
                          height={36}
                          className="px-1"
                        />
                      ) : (
                        <>
                          <Image
                            src="https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v/logo.png"
                            alt=""
                            width={36}
                            height={36}
                            className="px-1 py-2"
                          />
                          <span className="mb-1 ml-1 text-xs text-white sm:ml-6 sm:text-xl">
                            USD Coin{" "}
                          </span>
                        </>
                      )}

                      <span className="ml-2 text-xs text-white">
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
                                <>
                                  <Image
                                    src={`${tokenMap.get(tokenMint)?.logoURI}`}
                                    alt=""
                                    width={36}
                                    height={36}
                                  />
                                  <span
                                    className={`${
                                      selected ? "font-medium" : "font-normal"
                                    } block truncate text-white text-base `}
                                  >
                                    {tokenMap.get(tokenMint)?.name || "unknown"}
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
                                </>
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
              <p className="py-2 text-sm text-center">To-</p>
            </div>
            <div className="w-11/12 h-20 px-2 py-2 text-sm leading-tight text-center text-gray-700 bg-gray-100 border-2 appearance-none border-xl border-lagrangeborder focus:outline-none focus:bg-white focus:border-gray-500 s rounded-xl">
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
            <div className="flex justify-center box">
              {" "}
              <p className="py-2 text-sm text-center">Balance</p>
            </div>

            <div className="flex justify-center box">
              <div className="absolute w-full h-20 border xs:w-36 sm:w-56 bg-lagrangegraybackground rounded-xl">
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
                  <div className="relative mt-1 place-items-center">
                    <Listbox.Button className="relative w-full py-2 pl-3 pr-10 text-xs text-left text-white cursor-default rounded-xl h-18 focus:outline-none focus-visible:ring-2 focus-visible:ring-opacity-75 focus-visible:ring-white focus-visible:ring-offset-orange-300 focus-visible:ring-offset-2 focus-visible:border-indigo-500">
                      {/* <span className="block truncate animate-bounce">{formValue.inputMint?.toBase58()}</span> */}
                      {outputTokenInfo ? (
                        <Image
                          src={`${outputTokenInfo?.logoURI}`}
                          alt=""
                          width={36}
                          height={36}
                        />
                      ) : (
                        <>
                          <span className="text-sm font-semibold text-white">
                            Select a Token
                          </span>
                        </>
                      )}

                      <span className="text-xs">{outputTokenInfo?.name}</span>
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
                                <>
                                  <span
                                    className={`${
                                      selected ? "font-medium" : "font-normal"
                                    } block truncate text-white text-xs`}
                                  >
                                    {" "}
                                    <Image
                                      src={`${
                                        tokenMap.get(tokenMint)?.logoURI
                                      }`}
                                      alt=""
                                      width={36}
                                      height={36}
                                    />
                                    {tokenMap.get(tokenMint)?.name || "unknown"}
                                  </span>
                                  {selected ? (
                                    <span
                                      className={`${
                                        active
                                          ? "text-amber-600"
                                          : "text-amber-600"
                                      }
                                absolute inset-y-0 left-0 flex items-center pl-1`}
                                    >
                                      {" "}
                                      <CheckIcon
                                        className="w-5 h-5 text-white"
                                        aria-hidden="true"
                                      />
                                    </span>
                                  ) : null}
                                </>
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

        <div className="grid grid-cols-2 grid-rows-1 gap-2 py-4 overflow-hidden">
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
              className="inline-flex justify-center w-full h-20 px-2 py-2 text-base font-medium text-white uppercase border-2 shadow-sm place-items-center border-lagrangegraybackground rounded-xl bg-lagrangepurple hover:bg-lagrangepurpledark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 animate-pulse"
            >
              <p className="text-xl text-center">Swap</p>
            </button>
          </div>
          <div className="col-span-2 col-start-2 box">
            <button
              className={`${
                loading ? "opacity-50 cursor-not-allowed" : ""
              } w-full uppercase inline-flex justify-center place-items-center h-20 px-4 py-2 border-2 border-lagrangebuttongray text-xl font-medium rounded-xl shadow-sm text-lagrangebuttongray bg-gray-200 hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-offset-2`}
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
      </div>
      <div className="px-2 py-2 bg-white border-2 shadow-lg rounded-xl border-lagrangeborder">
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
    </div>
  );
};
export default LagrangeJupiterForm;
