"use client";
import react, { useState } from "react";
import {
  Chart as ChartJS,
  LinearScale,
  PointElement,
  Tooltip,
  Legend,
} from "chart.js";
import { withRouter } from "next/router";
import { Bubble } from "react-chartjs-2";
import axios from "axios";
import playerCapHits2020 from "/Users/patrickrooney/NBAFrontOffice/salaryData/playerSalaries/playerCapHits2020.json";
import playerCapHits2021 from "/Users/patrickrooney/NBAFrontOffice/salaryData/playerSalaries/playerCapHits2021.json";
import playerCapHits2022 from "/Users/patrickrooney/NBAFrontOffice/salaryData/playerSalaries/playerCapHits2022.json";

import { Dropdown } from "@nextui-org/react";
import { Elsie_Swash_Caps } from "@next/font/google";

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

  axios
    .get(`http://localhost:8000/playerStats/${props.year}`)
    .then((response) => {
      response.data.playerStatsTotals.map((currentPlayer, index) => {
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
    color: "white",
    borderColor: "white",

    scales: {
      y: {
        grid: {
          color: "white",
        },
        title: {
          color: "white",
          display: true,
          text: `${props.year} ${props.stat}`,
        },
        // beginAtZero: true,
        ticks: {
          color: "white",
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
          color: "white",
        },
        title: {
          color: "white",
          display: true,
          text: "Salary",
        },
        ticks: {
          color: "white",
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
