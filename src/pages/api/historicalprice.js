import { Console } from 'console'

const cheerio = require('cheerio') // 1

export default async (req, res) => { // 2
  if (req.method === 'GET') { // 3
    const username = req.body.TWuser

    try { // 4
      /* const response = await fetch(`https://mobile.twitter.com/${username}`) */
      const response = await fetch(`https://coinmarketcap.com`) // 5
      const htmlString = await response.text()
      const $ = cheerio.load(htmlString)
      const searchContext = `div[class='priceValue']` 
      const historicdata = $(searchContext).json()
  
     /*  const searchContext = `a[href='/${username}/followers']` */
     /*  const followerCountString = $(searchContext)
        .text()
        .match(/[0-9]/gi)
        .join('') */

      res.statusCode = 200
      console.log(historicdata)
      return res.json({
        historicdata
        
      })
    } catch (e) { // 5
      res.statusCode = 404
      return res.json({
       
        error: `${username} not found. Tip: Double check the spelling.`,
       
      })
    }
  }
}