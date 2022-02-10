import type { NextPage } from "next";
import { useWallet } from "@solana/wallet-adapter-react";
/* import Avatar from "./Avatar"; */
import LagrangeJupiterForm from "../views/JupiterForm/LagrangeJupiterForm";
const SwapContent: NextPage = (props) => {
  const { publicKey } = useWallet();
  return (
    <div className="">
      <div className="flex flex-wrap justify-center w-full">
        {!publicKey ? (
          <></>
        ) : (
          <>
            <div className="relative py-2 border-purple-500 rounded-full h-14 w-14 lg:mx-auto">
              {/*  <Avatar /> */}
            </div>
            <div className="flex flex-wrap">
              {/*  <span className="px-2 py-2 text-sm">Wallet Address</span>
              <span className="px-2 py-2 text-2xs">{publicKey.toBase58()}</span> */}
            </div>
          </>
        )}
      </div>
      <LagrangeJupiterForm />
    </div>
  );
};
export default SwapContent;
