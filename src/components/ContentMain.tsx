import type { NextPage } from "next";
import Link from "next/link";
const ContentMain: NextPage = (props) => {
  return (
    <div className="px-4 py-4">
      <h1 className="text-4xl text-center">Decentralized Bureau de Change</h1>
      <h2 className="text-2xl text-center">
        Ecosystem-wide. Minimum Slippage. Unlimited opportunities.
      </h2>
      <div className="flex justify-center">
        <Link href="/swap">
          <a>
            <button className="px-4 py-4 mx-4 my-4 text-2xl transition duration-200 rounded-full bg-gradient-to-r from-lagrangedark to-lagrangelight hover:from-lagrangelight hover:to-lagrangedark">
              Direct to Swap
            </button>
          </a>
        </Link>
      </div>
    </div>
  );
};
export default ContentMain;
