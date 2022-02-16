import type { NextPage } from "next";
import { useWallet } from "@solana/wallet-adapter-react";
/* import Avatar from "./Avatar"; */
import LagrangeJupiterForm from "../views/JupiterForm/LagrangeJupiterForm";


const SwapContent: NextPage = (props) => {
  const changeChartData = props;
  const { publicKey } = useWallet();
  return (
    <div className="">

      <LagrangeJupiterForm />
    </div>
  );
};
export default SwapContent;
