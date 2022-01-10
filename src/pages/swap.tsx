import React, { useEffect,useState } from 'react';
import type { NextPage } from "next"
import SidebarNavigation from "../components/SidebarNavigation";
import ContentHeader from "../components/ContentHeader";
import SwapContent from "../components/SwapContent";
import SidebarLogo from '../components/SidebarLogo';
import MobileLogo from '../components/MobileLogo';
const Swap: NextPage = (props) => {
    const [isExpanded, toggleExpansion] = useState(true);


    return(
        <div className="relative min-h-screen md:flex">
        <div className="bg-gray-800 text-gray-100 flex justify-between md:hidden px-2 py-2">
          <MobileLogo/>
          <button onClick={() => toggleExpansion(!isExpanded)} className="mobile-menu-button p-4 focus:outline-none focus:bg-gray-700">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
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
        <div className={`${
              isExpanded ? `-translate-x-full` : `translate-x-0`
            } sidebar bg-gradient-to-r from-lagrangesidebarlightopacity to-lagrangesidebardarkopacity xs:bg-lagrangesidebarmobile text-gray-700 w-80 xs:w-52 space-y-6 px-1 z-50 absolute inset-y-0 left-0 transform -translate-x-full md:relative md:translate-x-0 transition duration-200 ease-in-out shadow-xl`}>
         
          <SidebarLogo/>
  
          <SidebarNavigation />
        </div>
  
        <div className="bg-gradient-to-r from-lagrangelight to-lagrangedark flex-1 px-1 text-xl font-bold">
          <ContentHeader/>
          <SwapContent/>

        </div>
      </div>
    )
}

export default Swap