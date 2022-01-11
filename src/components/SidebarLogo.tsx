import Link from "next/link";
import Image from "next/image";
import LagrangeLogoImage from "../../public/Lagrange_new_logo-04.png";
import type { NextPage } from "next";
const SidebarLogo: NextPage = () => {
  return (
    <Link href="/">
      <a className="flex items-center space-x-2 space-y-2 text-gray-600">
        <Image
          src={LagrangeLogoImage}
          width={384}
          height={158}
          alt="Lagrange logo"
        />
      </a>
    </Link>
  );
};
export default SidebarLogo;
