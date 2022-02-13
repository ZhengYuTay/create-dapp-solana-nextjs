import axios from 'axios'
import type { NextApiRequest, NextApiResponse } from 'next'

require('axios')


type Data = {
  data: any
}

export default (req: NextApiRequest, res: NextApiResponse<Data>) => {
  const bugun = new Date();
  bugun.setDate(bugun.getDate());
  const weekago = new Date();
  weekago.setDate(weekago.getDate()-7);


console.log(encodeURIComponent(bugun.toISOString()))
console.log("-------")

console.log(encodeURIComponent(weekago.toISOString()))


  axios.get(`https://api.nomics.com/v1/exchange-rates/history?key=f5b3378230993f0291d6455887fae08ad928666d&currency=USDT&start=${encodeURIComponent(weekago.toISOString())}&end=${encodeURIComponent(bugun.toISOString())}`)
  .then(response => response)
  .then(response => {
    res.status(200).json({ data: response.data })
  })


}






/* const routeMap = await (await fetch('https://quote-api.jup.ag/v1/route-map')).json() */

