import Link from 'next/link'
import Image from 'next/image'
import LagrangeLogoImage from '../../public/Lagrange_new_logo-04.png'
import type { NextPage } from "next";
const SidebarLogo: NextPage = (props) => {
    return (
        <Link href="/">
        <a className="text-gray-600 flex items-center space-x-2 space-y-2">
        <Image src={LagrangeLogoImage} width={384} height={158} alt="Lagrange logo"/>
      </a></Link>
    )
}
export default SidebarLogo