"use client";
import react from "react";
import {
  Chart as ChartJS,
  LinearScale,
  PointElement,
  Tooltip,
  Legend,
} from "chart.js";
import { withRouter } from "next/router";
import { Bubble } from "react-chartjs-2";
import playerCapHits2020 from "src/app/salaryData/playerSalaries/PlayerCapHits2020.json";
import playerCapHits2021 from "src/app/salaryData/playerSalaries/PlayerCapHits2021.json";
import playerCapHits2022 from "src/app/salaryData/playerSalaries/PlayerCapHits2022.json";

export async function getData(year) {
  let response = await fetch(
    `https://api.mysportsfeeds.com/v2.1/pull/nba/${year}/player_stats_totals.json`,
    {
      method: "GET",
      headers: {
        Authorization:
          "Basic " + btoa(`4a6c73c1-8cf1-4f49-b901-1ed5ae:MYSPORTSFEEDS`),
      },
    }
  );

  let data = await response.json();
  // Fetch data from external API

  // Pass data to the page via props
  return data;
}

export function PlayerChart(props) {
  ChartJS.register(LinearScale, PointElement, Tooltip, Legend);
  // if ((props.stat = "winPercentage")) {
  //   props.stat = "points";
  // }
  let players;

  const getPlayers = (year) => {
    if (year === "2021-regular") {
      players = Object.values(playerCapHits2020);
    }
    if (year === "2021-2022-regular") {
      players = Object.values(playerCapHits2021);
    }
    if (year === "2022-2023-regular") {
      players = Object.values(playerCapHits2022);
    }
  };
  getPlayers(props.year);

  getData(props.year).then((response) => {
    response.playerStatsTotals.map((currentPlayer, index) => {
      let name = `${currentPlayer.player.firstName} ${currentPlayer.player.lastName}`;

      players.filter((current) => {
        if (
          current.playerName === name &&
          currentPlayer.player.officialImageSrc
        ) {
          current.totalPointsScored = currentPlayer.stats.offense.pts;
          current.rebounds = currentPlayer.stats.rebounds.reb;
          current.fouls = currentPlayer.stats.miscellaneous.fouls;
          current.assists = currentPlayer.stats.offense.ast;
          current.officialImg = currentPlayer.player.officialImageSrc;
        }
      });
    });
  });
  const playerData = players.map((currentPlayer, index) => {
    let logo = "circle";
    if (currentPlayer.officialImg) {
      logo = new Image(30, 30);
      logo.src = currentPlayer.officialImg;
    }

    return {
      label: currentPlayer.playerName,
      data: [
        {
          x: Number(
            currentPlayer.salary
              .split("")
              .filter((currentElement) => {
                if (!isNaN(currentElement)) {
                  return currentElement;
                }
              })
              .join("")
          ),
          y: Number(currentPlayer[`${props.stat}`]),
          r: 10,
        },
      ],
      pointStyle: logo,
    };
  });

  const options = {
    scales: {
      y: {
        grid: {
          color: "#FF4F79",
        },
        title: {
          color: "#FF4F79",
          display: true,
          text: `${props.year} ${props.stat}`,
        },
        // beginAtZero: true,
        ticks: {
          color: "#FF4F79",
          // Include a dollar sign in the ticks
          callback: function (value, index, ticks) {
            if (props.stat === "winPercentage") {
              return "%" + value;
            } else {
              return value;
            }
          },
        },
      },
      x: {
        grid: {
          color: "#FF4F79",
        },
        title: {
          color: "#FF4F79",
          display: true,
          text: "Salary",
        },
        ticks: {
          color: "#FF4F79",
          // Include a dollar sign in the ticks
          callback: function (value, index, ticks) {
            return "$" + value;
          },
        },
      },
    },
    plugins: {
      legend: {
        display: false,
        position: "bottom",
        labels: {
          // usePointStyle: true, // logos

          usePointStyle: false,
          pointStyleWidth: 10,
          padding: 5,
        },
      },
    },
  };

  const data = {
    datasets: playerData,
  };
  return (
    <>
      <Bubble options={options} data={data} />
    </>
  );
}
