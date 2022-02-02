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
    <nav>
      <Link href="/swap">
        <a
          className={
            router.pathname == "/swap"
              ? "block px-2 py-3 transition duration-200 rounded-lg bg-gray-600 text-white focus:outline-none focus:ring focus:ring-violet-300"
              : "block px-2 py-3 transition duration-200 rounded-lg hover:bg-gray-600 hover:text-white"
          }
        >
          <div className="flex">
            <div className="w-8 item">
              <Image
                src={router.pathname == "/swap" ? swapIconLight : swapIcon}
                alt="Picture of the author"
                width={27}
                height={27}
              />
            </div>
            <div className="w-32 item">
              <p>Swap</p>
            </div>
          </div>
        </a>
      </Link>
      <div className=" h-4"></div>
      <Link href="/overview">
        <a
          className={
            router.pathname == "/overview"
              ? "block px-2 py-3 transition duration-200 rounded-lg bg-gray-600 text-white focus:outline-none focus:ring focus:ring-violet-300"
              : "block px-2 py-3 transition duration-200 rounded-lg hover:bg-gray-600 hover:text-white"
          }
        >
          {/* <a className="block px-2 py-3 transition duration-200 rounded-lg hover:bg-gray-600 hover:text-white"> */}
          <div className="flex">
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
              <p>Market Overview</p>
            </div>
          </div>
        </a>
      </Link>
      <div className=" h-4"></div>
      <Link href="/pools">
        <a
          className={
            router.pathname == "/pools"
              ? "block px-2 py-3 transition duration-200 rounded-lg bg-gray-600 text-white focus:outline-none focus:ring focus:ring-violet-300"
              : "block px-2 py-3 transition duration-200 rounded-lg hover:bg-gray-600 hover:text-white"
          }
        >
          <div className="flex">
            <div className="w-8 item">
              <Image
                src={router.pathname == "/pools" ? poolIconLight : poolIcon}
                alt="Picture of the author"
                width={27}
                height={27}
              />
            </div>
            <div className="w-36 item">
              <p>Pools</p>
            </div>
          </div>
        </a>
      </Link>
    </nav>
  );
};
export default SidebarNavigation;
