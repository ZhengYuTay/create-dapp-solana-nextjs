import { Connection, Keypair, Transaction } from '@solana/web3.js'
import fetch from 'cross-fetch'
import { Wallet } from '@project-serum/anchor'
import bs58 from 'bs58'

const connection = new Connection('https://mercurial.rpcpool.com')



const wallet = new Wallet(Keypair.fromSecretKey(bs58.decode('2TGHzMpVGq1qicxs2zEkzUWhQ3cNKn4Q8kHh97Nnqk8fmtXxoNpyRQpbuK3BFo1TaFweMPLZYyoriiksiKci8fxH' || '')))



/* const routeMap = await (await fetch('https://quote-api.jup.ag/v1/route-map')).json() */
export async function getData() {
    const response = await fetch('https://quote-api.jup.ag/v1/route-map')
    const jsonData = await response.json()
    const allInputMints = Object.keys(jsonData)

    return allInputMints
}
export default async function handler(req, res) {
    const allInputMints = await getData()
    
    res.status(200).json(jsonallInputMintsData)

  }