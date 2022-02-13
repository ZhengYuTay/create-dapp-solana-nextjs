
require('axios')
  .get("https://api.nomics.com/v1/exchange-rates/history?key=your-key-here&currency=BTC&start=2018-04-14T00%3A00%3A00Z&end=2018-05-14T00%3A00%3A00Z")
  .then(response => console.log(response))