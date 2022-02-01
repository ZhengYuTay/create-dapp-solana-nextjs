import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";
import type { NextPage } from "next";
import graphicReports from "../../public/graphic-reports.png";
import swapIcon from "../../public/swap-icon.png";
import poolIcon from "../../public/poolicon_black.png";
const SidebarNavigation: NextPage = (props) => {
  const router = useRouter();
  return (
    <nav>
      <Link href="/swap">
        <a className="block px-2 py-3 transition duration-200 rounded-lg hover:bg-gray-600 hover:text-white focus:outline-none focus:ring focus:ring-violet-300">
          <div className="flex">
            <div className="w-8 item">
              <Image
                src={swapIcon}
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
                src={graphicReports}
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
      <Link href="/pools">
        <a className="block px-2 py-3 transition duration-200 rounded-lg hover:bg-gray-600 hover:text-white">
          <div className="flex">
            <div className="w-8 item">
              <Image
                src={poolIcon}
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
