/* eslint-disable import/no-anonymous-default-export */
import axios from "axios";
import type { NextApiRequest, NextApiResponse } from "next";

require("axios");

type Data = {
  data: any;
};

export default (_req: NextApiRequest, res: NextApiResponse<Data>) => {
  const bugun = new Date();
  bugun.setDate(bugun.getDate());
  const weekago = new Date();
  weekago.setDate(weekago.getDate() - 7);

  console.log(encodeURIComponent(bugun.toISOString()));
  console.log("-------");

  console.log(encodeURIComponent(weekago.toISOString()));

  axios
    .get(
      `https://api.coingecko.com/api/v3/coins/bilira/market_chart/range?vs_currency=usd&from=1644822194&to=1644908594`
    )
    .then((response) => response)
    .then((response) => {
      res.status(200).json(response.data);
    });
};

/* const routeMap = await (await fetch('https://quote-api.jup.ag/v1/route-map')).json() */
