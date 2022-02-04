import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";
import type { NextPage } from "next";
import graphicReports from "../../public/graphic-reports.png";
import graphicReportsLight from "../../public/graphic-reports_light.png";

import swapIcon from "../../public/swap-icon.png";
import swapIconLight from "../../public/swap-icon_white.png";

import poolIcon from "../../public/poolicon_black.png";
import poolIconLight from "../../public/poolicon_white.png";
const SidebarNavigation: NextPage = (props) => {
  const router = useRouter();
  return (
    <nav className="p-6">
      <Link href="/swap">
        <a
          className={
            router.pathname == "/swap"
              ? " block px-2 transition duration-200 rounded bg-lagrangesidebarbuttonbackgroundcolor text-white focus:outline-none focus:ring focus:ring-violet-300"
              : "block px-2 transition duration-200 rounded hover:bg-lagrangesidebarbuttonbackgroundcolor hover:text-white"
          }
        >
          <div className="flex border border-black p-2">
            <div className="w-8 item">
              <Image
                src={router.pathname == "/swap" ? swapIconLight : swapIcon}
                alt="Swap Nutton"
                width={27}
                height={27}
              />
            </div>
            <div className="w-32 item">
              <p className="text-lg font-normal">Swap</p>
            </div>
          </div>
        </a>
      </Link>
      <div className="h-2"></div>
      <Link href="/overview">
        <a
          className={
            router.pathname == "/overview"
              ? "block px-2 transition duration-200 rounded bg-lagrangesidebarbuttonbackgroundcolor text-white focus:outline-none focus:ring focus:ring-violet-300"
              : "block px-2 transition duration-200 rounded hover:bg-lagrangesidebarbuttonbackgroundcolor hover:text-white"
          }
        >
          {/* <a className="block px-2 py-3 transition duration-200 rounded-lg hover:bg-gray-600 hover:text-white"> */}
          <div className="flex border border-black p-2">
            <div className="w-8 item">
              <Image
                src={
                  router.pathname == "/overview"
                    ? graphicReportsLight
                    : graphicReports
                }
                alt="Picture of the author"
                width={27}
                height={27}
              />
            </div>
            <div className="w-36 item">
              <p className="text-lg font-normal">Market Overview</p>
            </div>
          </div>
        </a>
      </Link>
      <div className=" h-2"></div>
      <Link href="/pools">
        <a
          className={
            router.pathname == "/pools"
              ? "block px-2 transition duration-200 rounded bg-lagrangesidebarbuttonbackgroundcolor text-white focus:outline-none focus:ring focus:ring-violet-300"
              : "block px-2 transition duration-200 rounded hover:bg-lagrangesidebarbuttonbackgroundcolor hover:text-white"
          }
        >
          <div className="flex border border-black p-2">
            <div className="w-8 item">
              <Image
                src={router.pathname == "/pools" ? poolIconLight : poolIcon}
                alt="Picture of the author"
                width={27}
                height={27}
              />
            </div>
            <div className="w-36 item">
              <p className="text-lg font-normal">Pools</p>
            </div>
          </div>
        </a>
      </Link>
    </nav>
  );
};
export default SidebarNavigation;
