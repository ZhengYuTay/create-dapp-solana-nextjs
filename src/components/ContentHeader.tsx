import type { NextPage } from "next";
import { useWallet } from "@solana/wallet-adapter-react";
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui'

import { ENV } from "../constants";
const ContentHeader: NextPage = (props) => {
    const { publicKey } = useWallet();
    return(
        <div className="bg-gray-100 px-4 py-4 flex justify-between">
            <div>Search Data</div>


            <div>
    
	</div>
      
            <div className="flex-none">
                <WalletMultiButton className="btn btn-ghost" />
            </div>
        </div>
    )
}
export default ContentHeader;