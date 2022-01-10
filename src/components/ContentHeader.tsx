import type { NextPage } from "next";
import { useWallet } from "@solana/wallet-adapter-react";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import { FaSearch } from "react-icons/fa";
import { ENV } from "../constants";
const ContentHeader: NextPage = (props) => {
  const { publicKey } = useWallet();
  return (
    <div className="bg-white px-2 py-2 flex justify-between shadow-xl">
      <div className="flex justify-center">
        <FaSearch size="1em" className="mt-4 mr-4"/>
        <input type="text" placeholder="Search Data" className="px-2 py-2 w-2/3 text-xs"></input>
      </div>

          <div className="flex-none">
        <WalletMultiButton className="btn btn-ghost" />
      </div>
    </div>
  );
};
export default ContentHeader;
