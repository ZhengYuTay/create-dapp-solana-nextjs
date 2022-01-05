import type { NextPage } from "next";
const ContentMain: NextPage = (props) => {
  return (
    <div className="px-4 py-4">
      <h1 className="text-4xl text-center">Decentralized Bureau de Change</h1>
      <h2 className="text-2xl text-center">Ecosystem-wide. Minimum Slippage. Unlimited opportunities.</h2>
      <div className="flex justify-center">

          <button className="text-2xl mx-4 my-4 px-4 py-4 border-2 rounded-full bg-gradient-to-r from-lagrangedark to-lagrangelight hover:from-lagrangelight hover:to-lagrangedark transition duration-200">Direct to Swap</button></div>
    </div>
  );
};
export default ContentMain;
