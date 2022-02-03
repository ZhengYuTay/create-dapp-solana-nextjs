import type { NextPage } from "next";
import { useWallet } from "@solana/wallet-adapter-react";
import Avatar from "./Avatar";
import LagrangeJupiterForm from "../views/JupiterForm/LagrangeJupiterForm";
const SwapContent: NextPage = (props) => {
  const { publicKey } = useWallet();
  return (
    <div className="px-2 py-4 xs:px-2 xs:py-4">
 
      <div className="flex flex-wrap justify-center w-full">

      
      {!publicKey ? <></> : <>
      <div className="relative py-2 h-14 w-14 lg:mx-auto border-purple-500 rounded-full">
          <Avatar/>
          
      </div>
     <div className="flex flex-wrap">
     <span className="text-sm px-2 py-2">Wallet Address</span>
     <span className="text-2xs px-2 py-2">{publicKey.toBase58()}</span>
     </div>
    
    </>
      } 
          
          
          </div>
          <LagrangeJupiterForm/>
    </div>
  );
};
export default SwapContent;
