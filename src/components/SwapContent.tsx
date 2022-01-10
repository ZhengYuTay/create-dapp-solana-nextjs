import type { NextPage } from "next";
import { useWallet } from "@solana/wallet-adapter-react";
import Avatar from "./Avatar";
import LagrangeJupiterForm from "../views/JupiterForm/LagrangeJupiterForm";
const SwapContent: NextPage = (props) => {
  const { publicKey } = useWallet();
  return (
    <div className="px-4 py-4 xs:px-2 xs:py-4">
 
      <div className="flex justify-center w-full">

      
      {!publicKey ? <></> : <>
      <div className="relative h-12 w-12 lg:mx-auto border-purple-500 border-2 rounded-full">
          <Avatar/>
          
      </div><span className="text-2xs px-2">{publicKey.toBase58()}</span></>
      } 
          
          
          </div>
          <LagrangeJupiterForm/>
    </div>
  );
};
export default SwapContent;
