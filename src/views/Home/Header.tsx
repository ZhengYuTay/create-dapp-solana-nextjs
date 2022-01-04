import Image from 'next/image'
import LagrangeLogo from '../../../public/lagrangelogo.svg'
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui'
import React from 'react'

const Header = () => {
    return (
        <div className="navbar w-full mb-2 shadow-lg bg-neutral text-neutral-content rounded-box">
            <div className="flex-none">
                <button className="btn btn-square btn-ghost relative h-12 w-32">
                    
                    <Image src={LagrangeLogo} alt="Lagrange Logo" width="127" height="35"/>
                </button>
            </div>
            <div className="flex-1 px-2 mx-2">
                
            </div>
            <div className="flex-none">
                <WalletMultiButton className="btn btn-ghost" />
            </div>
        </div>
    )
}

export default Header
