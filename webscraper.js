// import axios from "axios";
// import cheerio, { load } from "cheerio";

const axios = require("axios");
const cheerio = require("cheerio");
const fs = require("fs");

const url = "https://www.spotrac.com/nba/cap/";

let allTeams = {};

axios(url).then((response) => {
  const html = response.data;
  const $ = cheerio.load(html);

  $(".xs-hide").each(function (i, ele) {
    const title = $(ele).text();

    // console.log("TITLE:", title);
    // console.log("INDEX:", i);
    allTeams[i] = { name: title };
  });

  let count = 0;
  let currentTeam = 0;
  $("td.center").each(function (i, ele) {
    const title = $(ele).text();
    if (count === 0) allTeams[currentTeam]["rank"] = title;
    if (count === 1) allTeams[currentTeam]["winPercentage"] = title;
    if (count === 2) allTeams[currentTeam]["signedPlayers"] = title;
    if (count === 3) allTeams[currentTeam]["avgAge"] = title;
    if (count === 4) allTeams[currentTeam]["activeCap"] = title;
    if (count === 5) allTeams[currentTeam]["activeCapTop3"] = title;
    if (count === 6) allTeams[currentTeam]["deadCap"] = title;
    if (count === 7) allTeams[currentTeam]["totalCap"] = title;
    if (count === 8) allTeams[currentTeam]["capSpace"] = title;
    if (count === 9)
      allTeams[currentTeam]["projectedPracticalCapSpace"] = title;
    if (count === 10) allTeams[currentTeam]["hardCap"] = title;
    if (count === 10) {
      count = 0;
      currentTeam++;
    } else {
      count++;
    }
  });
  fs.writeFile("teamSalaryCap.json", JSON.stringify(allTeams), (err) => {
    if (err) throw err;
    console.log("file successfully saved");
  });
});

// setTimeout(() => {
//   console.log("hi");
// }, 1000);
