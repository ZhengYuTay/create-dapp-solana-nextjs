import React, { useEffect,useState } from 'react';
import Link from 'next/link'
import type { NextPage } from "next";
import Image from "next/image";

import LagrangeMobileLogo from "../../public/Lagrange_new_logo-05.png";

const Index: NextPage = (props) => {

const [isExpanded, toggleExpansion] = useState(true);

  return (
    <div className="h-screen -mx-2 w-full p-10 bg-fixed bg-cover bg-earth">
     
     <div className='flex items-center justify-between'>
       <div>
       <Image
          className="cursor-pointer hover:opacity-75"
          src={LagrangeMobileLogo}
          width={202}
          height={83}
          alt="Logo"
        />
       </div>

       <div className='flex  items-center text-white'>
         <p className=' mr-9 '>Demo Video</p>
         <p className='ml-9'>Pitchdeck</p>

       </div>
       </div>



       <div className='flex item center h-full ml-12'>
         <div className='text-white text-5xl'>
           <p>Lagrange offers a fully decentralized</p>
           <p>24/7 FX market that does not require</p>
           <p>any broker or settlement periods.</p></div>
         <div>
           <button>
             PRO
           </button>
           <button>LITE</button>
         </div>
       </div>


       <div>
         <div>

         </div>
       </div>

    </div>
  );
};





export default Index;
