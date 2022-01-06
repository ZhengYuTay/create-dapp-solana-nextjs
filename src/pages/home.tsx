import React, { useEffect,useState } from 'react';
import Link from 'next/link'
import type { NextPage } from "next";
import SidebarNavigation from "../components/SidebarNavigation";
import ContentHeader from "../components/ContentHeader";
import ContentMain from '../components/ContentMain';
import SidebarLogo from '../components/SidebarLogo';

const Home: NextPage = (props) => {

const [isExpanded, toggleExpansion] = useState(true);

  return (
    <div className="relative min-h-screen md:flex">
      <div className="bg-gray-800 text-gray-100 flex justify-between md:hidden">
        <a href="#" className="block h-5 p-5 text-white font-bold">
          Lagrange .fi Mobile
        </a>
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
          } sidebar bg-gray-100 text-gray-700 w-64 space-y-6 px-2 py-2 absolute inset-y-0 left-0 transform -translate-x-full md:relative md:translate-x-0 transition duration-200 ease-in-out`}>
       <SidebarLogo/>

        <SidebarNavigation />
      </div>

      <div className="bg-gradient-to-r from-lagrangelight to-lagrangedark flex-1 p-10 text-xl font-bold ">
        <ContentHeader/>
        <ContentMain/>
      </div>
    </div>
  );
};





export default Home;
