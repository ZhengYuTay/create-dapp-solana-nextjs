import { JupiterProvider } from '@jup-ag/react-hook'
import { useEffect } from 'react'
import useMangoStore from '../stores/useMangoStore'
import PageBodyContainer from '../components/PageBodyContainer'
import TopBar from '../components/TopBar'
import {
  actionsSelector,
  connectionSelector,
  walletConnectedSelector,
  walletSelector,
} from '../stores/selectors'
import JupiterForm from '../components/JupiterForm'
import { zeroKey } from '@blockworks-foundation/mango-client'


// export async function getStaticProps({ locale }) {
//   return {
//     props: {
//       ...(await serverSideTranslations(locale, ['common', 'swap'])),
//       // Will be passed to the page component as props
//     },
//   }
// }

export default function Swap() {

  const connection = useMangoStore(connectionSelector)
  const connected = useMangoStore(walletConnectedSelector)
  const wallet = useMangoStore(walletSelector)
  const actions = useMangoStore(actionsSelector)

  useEffect(() => {
    if (connected) {
      actions.fetchWalletTokens()
    }
  }, [connected])

  if (!connection) return null

  const userPublicKey =
    wallet?.publicKey && !zeroKey.equals(wallet.publicKey)
      ? wallet.publicKey
      : null

  return (
    <JupiterProvider
      connection={connection}
      cluster="mainnet-beta"
      userPublicKey={connected ? userPublicKey : null}
    >
      <div className={`bg-th-bkg-1 text-th-fgd-1 transition-all`}>
        {/*<TopBar />*/}
        <PageBodyContainer>
          <div className="grid grid-cols-12">
            <div className="col-span-12 xl:col-span-10 xl:col-start-2 pt-8 pb-3 sm:pb-4 md:pt-10">
              <div className="flex flex-col items-start md:flex-row md:items-end md:justify-between mb-1">
                <h1
                  className={`mb-1.5 md:mb-0 text-th-fgd-1 text-2xl font-semibold`}
                >
                 swap
                </h1>
                <div className="flex flex-col md:items-end">
                  <p className="mb-0 text-xs">
                   swap-between-hundreds
                  </p>
               
                </div>
              </div>
            </div>
          </div>
         {/* {wallet ? <JupiterForm /> : null}*/}
         <JupiterForm /> 
        </PageBodyContainer>
      </div>
    </JupiterProvider>
  )
}
