const axios = require("axios");
const cheerio = require("cheerio");
const fs = require("fs");

let allPlayers = {};
let teamNames = [
  "boston-celtics",
  "brooklyn-nets",
  "new-york-knicks",
  "philadelphia-76ers",
  "toronto-raptors",
  "chicago-bulls",
  "cleveland-cavaliers",
  "detroit-pistons",
  "indiana-pacers",
  "milwaukee-bucks",
  "atlanta-hawks",
  "charlotte-hornets",
  "miami-heat",
  "orlando-magic",
  "washington-wizards",
  "denver-nuggets",
  "minnesota-timberwolves",
  "oklahoma-city-thunder",
  "portland-trail-blazers",
  "utah-jazz",
  "golden-state-warriors",
  "los-angeles-clippers",
  "los-angeles-lakers",
  "phoenix-suns",
  "sacramento-kings",
  "dallas-mavericks",
  "houston-rockets",
  "memphis-grizzlies",
  "new-orleans-pelicans",
  "san-antonio-spurs",
];

for (let i = 0; i < teamNames.length; i++) {
  let currentTeam = teamNames[i];
  const url = `https://www.spotrac.com/nba/rankings/2022-23/cap-hit/${currentTeam}`;

  axios(url).then((response) => {
    const html = response.data;

    //arrays to store data we will insert into final oject later
    let playerSalary = [];
    let playerHeadshots = [];

    const $ = cheerio.load(html);

    //accessing salary info and inserting into array
    $("span.info").each(function (i, ele) {
      const salary = $(ele).text();
      playerSalary.push(salary);
    });

    //accessing headshot info and inserting into array
    $(".table-headshot.xs-hide").each(function (i, ele) {
      // const headshot = $(ele).text();
      // console.log(ele.attribs.src);
      playerHeadshots.push(ele.attribs.src);
    });

    //finally- putting all data in to an object
    $(".team-name").each(function (i, ele) {
      const playerName = $(ele).text();
      allPlayers[playerName] = {
        team: currentTeam
          .split("-")
          .map((element) => {
            return element[0].toUpperCase() + element.slice(1);
          })
          .join(" "),
        salary: playerSalary[i],
        headshot: playerHeadshots[i],
        playerName: playerName,
      };
      // console.log(allPlayers);
    });
  });
}

setTimeout(() => {
  fs.writeFile(
    "salaryData/playerSalaries/playerCapHits2022.json",
    JSON.stringify(allPlayers),
    (err) => {
      if (err) throw err;
      console.log("file successfully saved");
    }
  );
}, 40000);
