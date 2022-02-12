import type { NextApiRequest, NextApiResponse } from 'next'
import https from "https";
import cheerio from "cheerio";

type User = {
  id: number;
  firstName: string;
  lastName: string;
  username: string;
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
    "html body div.wrapper div.container table.table.table-bordered"
  );
  return tableElements;
};

const takeFirstTwoTables = (tables: cheerio.Cheerio): cheerio.Cheerio =>
  tables.slice(0, 2);








 

export default (req: NextApiRequest, res: NextApiResponse) => {
    const getUsers = (table: cheerio.Element): User[] => {
        const coins: User[] = [];
      
        const $ = cheerio.load(table);
        $("tbody tr").each((_, row) => {
            coins.push({
            id: Number($($(row).children()[0]).text()),
            firstName: $($(row).children()[1]).text(),
            lastName: $($(row).children()[2]).text(),
            username: $($(row).children()[3]).text(),
          });
        });
      
        return coins;
      };
    getHtml("webscraper.io", "/test-sites/tables")
  .then(getTables)
  .then(takeFirstTwoTables)
  .then((tables) => {
    let coins: User[] = [];
    tables.each((_, table) => (coins = coins.concat(getUsers(table))));
    return coins;
  })
  .then((coins) => res.status(200).json({ coins }))
  .catch((error) => console.log(error));
  
}