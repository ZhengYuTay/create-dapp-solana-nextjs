import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";
import type { NextPage } from "next";
import graphicReports from "../../public/graphic-reports.png";
import graphicReportsLight from "../../public/graphic-reports_light.png";
import React, { useState } from "react";
import swapIcon from "../../public/swap-icon.png";
import swapIconLight from "../../public/swap-icon_white.png";

import poolIcon from "../../public/poolicon_black.png";
import poolIconLight from "../../public/poolicon_white.png";
const SidebarNavigation: NextPage = (props) => {
  const router = useRouter();
  /*   const [isHovering, setIsHovered] = useState(false); */
  const [isHoveringSwap, setIsHoveredSwap] = useState(false);
  const [isHoveringOverview, setIsHoveredOverview] = useState(false);
  const [isHoveringPool, setIsHoveredPool] = useState(false);

  return (
    <nav className="p-1">
      <div
        onMouseOver={() => setIsHoveredSwap(true)}
        onMouseOut={() => setIsHoveredSwap(false)}
      >
        <Link href="/swap">
          <a
            className={
              router.pathname == "/swap"
                ? " block transition duration-200 rounded bg-lagrangesidebarbuttonbackgroundcolor text-white focus:outline-none focus:ring focus:ring-violet-300"
                : "block transition duration-200 rounded hover:bg-lagrangesidebarbuttonbackgroundcolor hover:text-white"
            }
          >
            <div className="flex items-center border border-black ">
              <div className="w-8 my-3 ml-5">
                <Image
                  src={
                    router.pathname == "/swap"
                      ? swapIconLight
                      : swapIcon && isHoveringSwap == false
                      ? swapIcon
                      : swapIconLight
                  }
                  alt="Swap Nutton"
                  width={27}
                  height={27}
                />
              </div>
              <div className="w-32 item">
                <p className="text-base font-bold">Swap</p>
              </div>
            </div>
          </a>
        </Link>
      </div>

      <div className="h-6"></div>
      <div
        onMouseOver={() => setIsHoveredOverview(true)}
        onMouseOut={() => setIsHoveredOverview(false)}
      >
        <Link href="/overview">
          <a
            className={
              router.pathname == "/overview"
                ? "block transition duration-200 rounded bg-lagrangesidebarbuttonbackgroundcolor text-white focus:outline-none focus:ring focus:ring-violet-300"
                : "block transition duration-200 rounded hover:bg-lagrangesidebarbuttonbackgroundcolor hover:text-white"
            }
          >
            {/* <a className="block px-2 py-3 transition duration-200 rounded-lg hover:bg-gray-600 hover:text-white"> */}
            <div className="flex items-center border border-black">
              <div className="w-8 my-3 ml-5">
                <Image
                  src={
                    router.pathname == "/overview"
                      ? graphicReportsLight
                      : graphicReports && isHoveringOverview == false
                      ? graphicReports
                      : graphicReportsLight
                  }
                  alt="Picture of the author"
                  width={27}
                  height={27}
                />
              </div>
              <div className="w-36 item">
                <p className="text-base font-bold">Market Overview</p>
              </div>
            </div>
          </a>
        </Link>
      </div>
      <div className="h-6 "></div>
      <div
        onMouseOver={() => setIsHoveredPool(true)}
        onMouseOut={() => setIsHoveredPool(false)}
      >
        <Link href="/pools">
          <a
            className={
              router.pathname == "/pools"
                ? "block transition duration-200 rounded bg-lagrangesidebarbuttonbackgroundcolor text-white focus:outline-none focus:ring focus:ring-violet-300"
                : "block transition duration-200 rounded hover:bg-lagrangesidebarbuttonbackgroundcolor hover:text-white"
            }
          >
            <div className="flex items-center border border-black">
              <div className="w-8 my-3 ml-5">
                <Image
                  src={
                    router.pathname == "/pools"
                      ? poolIconLight
                      : poolIcon && isHoveringPool == false
                      ? poolIcon
                      : poolIconLight
                  }
                  alt="Picture of the author"
                  width={27}
                  height={27}
                />
              </div>
              <div className="w-36 item">
                <p className="text-base font-bold ">Pools</p>
              </div>
            </div>
          </a>
        </Link>
      </div>
    </nav>
  );
};
export default SidebarNavigation;
