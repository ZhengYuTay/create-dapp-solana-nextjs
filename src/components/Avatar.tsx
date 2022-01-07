import type { NextPage } from "next";
import { useWallet } from "@solana/wallet-adapter-react";
import Image from 'next/image'
import { ENV } from "../constants";
const Avatar: NextPage = (props) => {
    const { publicKey } = useWallet();

    return (



        <div>
            {!publicKey ? <></> : <Image
                className="rounded-full bg-black cursor-pointer hover:opacity-75"
                src={`https://avatars.dicebear.com/api/adventurer/${publicKey.toBase58()}.svg`}
                layout="fill" alt="Logo" />}
        </div>


    )
}
export default Avatar;