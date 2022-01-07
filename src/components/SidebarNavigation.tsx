import Link from "next/link";
import type { NextPage } from "next";
const SidebarNavigation: NextPage = (props) => {
  return (
    <nav>
      <Link href="/swap">
        <a className="block py-3 px-4 rounded-lg transition duration-200 hover:bg-gray-600 hover:text-white">
          Swap
        </a>
      </Link>
      <Link href="/market">
        <a className="block py-2.5 px-4 rounded-lg transition duration-200 hover:bg-gray-600 hover:text-white">
          Market Overview
        </a>
      </Link>
      <Link href="/account">
        <a className="block py-2.5 px-4 rounded-lg transition duration-200 hover:bg-gray-600 hover:text-white">
          Account
        </a>
      </Link>
      <Link href="/roadmap">
        <a className="block py-2.5 px-4 rounded-lg transition duration-200 hover:bg-gray-600 hover:text-white">
          Roadmap
        </a>
      </Link>
      <Link href="/whitepaper">
        <a className="block py-2.5 px-4 rounded-lg transition duration-200 hover:bg-gray-600 hover:text-white">
          Whitepaper
        </a>
      </Link>

      <Link href="/settings">
        <a className="block py-2.5 px-4 rounded-lg transition duration-200 hover:bg-gray-600 hover:text-white">
          Settings
        </a>
      </Link>
    </nav>
  );
};
export default SidebarNavigation;
