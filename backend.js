const PORT = process.env.PORT || 8000;
const express = require("express");
const cors = require("cors");
const axios = require("axios");

require("dotenv").config();

const app = express();

app.use(cors());
app.get("/teamStats/:id", (req, res) => {
  const id = req.params.id;
  console.log(id, "team");
  const options = {
    method: "GET",
    url: `https://api.mysportsfeeds.com/v2.1/pull/nba/${id}/team_stats_totals.json`,
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

app.get("/playerStats/:id", (req, res) => {
  const id = req.params.id;
  const options = {
    method: "GET",
    url: `https://api.mysportsfeeds.com/v2.1/pull/nba/${id}/player_stats_totals.json`,
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
