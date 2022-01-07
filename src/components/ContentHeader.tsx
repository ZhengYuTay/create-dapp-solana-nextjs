import type { NextPage } from "next";
import { useWallet } from "@solana/wallet-adapter-react";
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui'
import Avatar from "./Avatar";
import { ENV } from "../constants";
const ContentHeader: NextPage = (props) => {
    const { publicKey } = useWallet();
    return(
        <div className="bg-gray-100 px-4 py-4 flex justify-between">
            <div>Search Data</div>


            <div>
      {!publicKey ? <></> : <div className="relative h-12 w-12 lg:mx-auto border-pink-500 border-4 rounded-full"><Avatar/></div>}  
	</div>

            
      
            <div className="flex-none">
                <WalletMultiButton className="btn btn-ghost" />
            </div>
        </div>
    )
}
export default ContentHeader;