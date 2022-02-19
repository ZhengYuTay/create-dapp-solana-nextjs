import Link from "next/link";
import Image from "next/image";
import LagrangeMobileLogo from "../../public/Lagrange_new_logo-05.png";
import type { NextPage } from "next";
const MobileLogo: NextPage = (props) => {
  return (
    <Link href="/">
      <a>
        <Image
          className="cursor-pointer hover:opacity-75"
          src={LagrangeMobileLogo}
          width={202}
          height={83}
          alt="Logo"
        />
      </a>
    </Link>
  );
};
export default MobileLogo;
