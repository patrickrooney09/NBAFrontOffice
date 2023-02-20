const PORT = 8000;
const express = require("express");
const cors = require("cors");
const axios = require("axios");

require("dotenv").config();

const app = express();

app.use(cors());
app.get("/teamStats", (req, res) => {
  const options = {
    method: "GET",
    url: "https://api.mysportsfeeds.com/v2.1/pull/nba/current/team_stats_totals.json",
    auth: {
      //http basic auth
      username: process.env.MY_SPORTS_FEEDS_API,
      password: "MYSPORTSFEEDS",
    },
  };
  axios
    .request(options)
    .then((response) => {
      res.json(response.data);
    })
    .catch((error) => {
      console.error(error);
    });
});

app.listen(8000, () => {
  console.log(`server is running on port ${PORT}`);
});
