import React, { useEffect,useState } from 'react';
import Link from 'next/link'
import type { NextPage } from "next";
import SidebarNavigation from "../components/SidebarNavigation";
import ContentHeader from "../components/ContentHeader";
import ContentMain from '../components/ContentMain';

const Home: NextPage = (props) => {

const [isExpanded, toggleExpansion] = useState(true);



  

 
 /* 
  btn.addEventListener('click', () =>{

    sidebar.classList.toggle('-tramslate-x-full');

  }); */
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
          } sidebar bg-gray-100 text-gray-700 w-64 space-y-6 px-2 absolute inset-y-0 left-0 transform -translate-x-full md:relative md:translate-x-0 transition duration-200 ease-in-out`}>
        <Link href="/home"><a className="text-gray-600 flex items-center space-x-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M3 4a1 1 0 011-1h4a1 1 0 010 2H6.414l2.293 2.293a1 1 0 01-1.414 1.414L5 6.414V8a1 1 0 01-2 0V4zm9 1a1 1 0 110-2h4a1 1 0 011 1v4a1 1 0 11-2 0V6.414l-2.293 2.293a1 1 0 11-1.414-1.414L13.586 5H12zm-9 7a1 1 0 112 0v1.586l2.293-2.293a1 1 0 011.414 1.414L6.414 15H8a1 1 0 110 2H4a1 1 0 01-1-1v-4zm13-1a1 1 0 011 1v4a1 1 0 01-1 1h-4a1 1 0 110-2h1.586l-2.293-2.293a1 1 0 011.414-1.414L15 13.586V12a1 1 0 011-1z"
              clipRule="evenodd"
            />
          </svg>

          <span className="text-2xl font-semibold">Lagrange.fi</span>
        </a></Link>

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
