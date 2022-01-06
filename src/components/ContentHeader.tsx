import type { NextPage } from "next";
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui'
const ContentHeader: NextPage = (props) => {
    return(
        <div className="bg-gray-100 px-4 py-4 flex justify-between">
            <div>Search Data</div>
      
            <div className="flex-none">
                <WalletMultiButton className="btn btn-ghost" />
            </div>
        </div>
    )
}
export default ContentHeader;