import type { NextApiRequest, NextApiResponse } from 'next'
import https from "https";
import cheerio from "cheerio";

type User = {
  date: string;
/*   close: string;
  marketcap: string;
  volume: string; */

};

const getHtml = async (hostname: string, path: string): Promise<string> =>
  new Promise((resolve, reject) => {
    https
      .get(
        {
          hostname,
          path,
          method: "GET",
        },
        (res) => {
          let html = "";
          res.on("data", function (chunk) {
            html += chunk;
          });
          res.on("end", function () {
            resolve(html);
          });
        }
      )
      .on("error", (error) => {
        console.error(error);
        reject(error);
      });
  });

const getTables = (html: string): cheerio.Cheerio => {
  const $ = cheerio.load(html);
  const tableElements = $(
    /* "html body div.wrapper div.container table.table.table-bordered" */
    /* "html body div div[1] div[1] div[2] div div[3] div div div[2] table" */
   "html body.DAY div#__next div.bywovg-1.fUzJes div.main-content div.sc-57oli2-0.comDeo.cmc-body-wrapper div.grid.full-width-layout div.sc-16r8icm-0.jKrmxw.container div.b4d71h-0.iTFIva div.b4d71h-2.hgYnhQ table.h7vnx2-2.hLKazY.cmc-table"
  );

 
  return tableElements;
};

const takeFirstTwoTables = (tables: cheerio.Cheerio): cheerio.Cheerio =>
  tables.slice(0, 2);
 

export default (req: NextApiRequest, res: NextApiResponse) => {
    const getUsers = (table: cheerio.Element): User[] => {
        const coins: User[] = [];
   
        const $ = cheerio.load(table);
        
        $("thead tr").each((_, row) => {
            
            coins.push({
                date: $($(row).children()[1]).text(),
               /*  close: $($(row).children()[2]).text(),
                marketcap: $($(row).children()[3]).text(),
                volume: $($(row).children()[4]).text(), */

            });
        });

        
        console.log($);
     /*    
       */
        return coins;
      };
    getHtml("coinmarketcap.com", "/currencies/tether/historical-data")
  .then(getTables)
  .then(takeFirstTwoTables)
/*   .then((tables) => {
    let coins: User[] = [];
    tables.each((_, table) => (coins = coins.concat(getUsers(table))));
    return coins;
  }) */
  .then((getHtml) => console.log(getHtml))
  .catch((error) => console.log(error));
  
}