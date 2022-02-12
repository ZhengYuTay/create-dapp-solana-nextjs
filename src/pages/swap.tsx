import React, { useEffect, useState } from "react";
import type { NextPage } from "next";
import Head from "next/head";
import SidebarNavigation from "../components/SidebarNavigation";
import ContentHeader from "../components/ContentHeader";
import SwapContent from "../components/SwapContent";
import ChartContent from "../components/ChartContent";
import SidebarLogo from "../components/SidebarLogo";
import MobileLogo from "../components/MobileLogo";
const Swap: NextPage = (props) => {
  const [isExpanded, toggleExpansion] = useState(true);

  return (
    <div className="relative min-h-screen md:flex">
      <Head>
        <title>Lagrange.fi - Swap</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <div className="flex justify-between px-4 py-2 text-gray-100 bg-gray-800 md:hidden">
        <MobileLogo />
        <button
          onClick={() => toggleExpansion(!isExpanded)}
          className="p-4 mobile-menu-button focus:outline-none focus:bg-gray-700"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-6 h-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>
      </div>
      <div
        className={`${
          isExpanded ? `-translate-x-full` : `translate-x-0`
        } sidebar bg-white text-gray-700 w-80 space-y-6 px-6 py-4 z-50 absolute inset-y-0 left-0 transform -translate-x-full md:relative md:translate-x-0 transition duration-200 ease-in-out shadow-xl`}
      >
        <SidebarLogo />

        <SidebarNavigation />
      </div>

      <div className="flex-1 text-xl font-bold bg-gradient-to-r from-lagrangelight to-lagrangedark">
        <ContentHeader />
        <div className="flex p-6 xs:flex-wrap md:justify-start sm:justify-center xs:justify-center">
          <div>
            <SwapContent />
          </div>
          <div>
            <ChartContent/>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Swap;
