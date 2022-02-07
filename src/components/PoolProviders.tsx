import Image from "next/image";
import Serum from "../../public/def/serum.svg";
import Raydium from "../../public/def/raydium.svg";
import Saber from "../../public/def/saber.svg";
import Orca from "../../public/def/orca.svg";
import Mercurial from "../../public/def/mercurial.svg";
import Aldrin from "../../public/def/aldrin.svg";

function PoolProviders() {
  return (
    <div className="flex flex-wrap mx-3 overflow-hidden">
      <div className="my-3 px-3 w-12">  
        <Image
          className="rounded-full bg-gray-200 cursor-pointer hover:opacity-75"
          src={Serum}
          layout="responsive"
          alt="Serum"
        />
      </div>
      <div className="my-3 px-3 w-12">
        <Image
          className="rounded-full bg-gray-200 cursor-pointer hover:opacity-75"
          src={Raydium}
          layout="responsive"
          alt="Raydium"
        />
      </div>
      <div className="my-3 px-3 w-12">
        <Image
          className="rounded-full bg-gray-200 cursor-pointer hover:opacity-75"
          src={Saber}
          layout="responsive"
          alt="Saber"
        />
      </div>
      <div className="my-3 px-3 w-12">
        <Image
          className="rounded-full bg-gray-200 cursor-pointer hover:opacity-75"
          src={Orca}
          layout="responsive"
          alt="Orca"
        />
      </div>
      <div className="my-3 px-3 w-12">
        <Image
          className="rounded-full bg-gray-200 cursor-pointer hover:opacity-75"
          src={Mercurial}
          layout="responsive" objectFit="cover"
          alt="Mercurial"
        />
      </div>
      <div className="my-3 px-3 w-12">
        <Image
          className="rounded-full bg-gray-200 cursor-pointer hover:opacity-75"
          src={Aldrin}
          layout="responsive" objectFit="cover"
          alt="Aldrin"
        />
      </div>
    </div>
  );
}

export default PoolProviders;
