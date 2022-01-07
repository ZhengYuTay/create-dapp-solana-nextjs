import type { NextPage } from "next";
import { useWallet } from "@solana/wallet-adapter-react";
import Image from 'next/image'
import { ENV } from "../constants";
const Avatar: NextPage = (props) => {
    const { publicKey } = useWallet();

    return (



        <div>
            {!publicKey ? <></> : <div>
               <Image
                className="rounded-full bg-gray-200 cursor-pointer hover:opacity-75"
                src={`https://avatars.dicebear.com/api/pixel-art/${publicKey.toBase58()}.svg`}
                layout="fill" alt="Logo" />
              
                
            </div>}
        </div>


    )
}
export default Avatar;