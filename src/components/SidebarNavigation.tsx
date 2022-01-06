import Link from 'next/link'
import type { NextPage } from "next";
const SidebarNavigation: NextPage = (props) => {
    return(
        <nav>

       <Link href="/swap">
         <a className="block py-3 px-4 rounded-lg transition duration-200 hover:bg-gray-600 hover:text-white">Swap</a>
       </Link>
        <a href="/market" className="block py-2.5 px-4 rounded-lg transition duration-200 hover:bg-gray-600 hover:text-white">Market Overview</a>
        <a href="/account" className="block py-2.5 px-4 rounded-lg transition duration-200 hover:bg-gray-600 hover:text-white">Account</a>
        <a href="/roadmap" className="block py-2.5 px-4 rounded-lg transition duration-200 hover:bg-gray-600 hover:text-white">Roadmap</a>
        <a href="/whitepaper" className="block py-2.5 px-4 rounded-lg transition duration-200 hover:bg-gray-600 hover:text-white">Whitepaper</a>
        <a href="/settings" className="block py-2.5 px-4 rounded-lg transition duration-200 hover:bg-gray-600 hover:text-white">Settings</a>
     
      </nav>
    )
}
export default SidebarNavigation