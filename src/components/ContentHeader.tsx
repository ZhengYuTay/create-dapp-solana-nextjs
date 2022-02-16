import type { NextPage } from "next";
import { useWallet } from "@solana/wallet-adapter-react";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import { FaSearch } from "react-icons/fa";
import { ENV } from "../constants";
const ContentHeader: NextPage = (props) => {
  const { publicKey } = useWallet();
  return (
    <div className="flex justify-between px-0 py-2 bg-white shadow">
      <div className="flex justify-center">
        <FaSearch size="1em" className="mt-4 mr-4" />
        <input
          type="text"
          placeholder="Search Data"
          className="w-2/3 px-2 py-2 text-sm"
        ></input>
      </div>

      <div className="flex-none">
        <WalletMultiButton className="btn btn-ghost" />
      </div>
    </div>
  );
};
export default ContentHeader;
