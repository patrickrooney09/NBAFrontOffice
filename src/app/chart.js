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
import teamSalaryCap2020 from "src/app/salaryData/teamSalaries/TeamSalaryCap2020.json";
import teamSalaryCap2021 from "src/app/salaryData/teamSalaries/TeamSalaryCap2021.json";
import teamSalaryCap2022 from "src/app/salaryData/teamSalaries/TeamSalaryCap2022.json";

import { Dropdown } from "@nextui-org/react";

export function Chart(props) {
  ChartJS.register(LinearScale, PointElement, Tooltip, Legend);

  let teams;

  const getTeams = (year) => {
    if (year === "2021-regular") {
      teams = Object.values(teamSalaryCap2020);
    }
    if (year === "2021-2022-regular") {
      teams = Object.values(teamSalaryCap2021);
    }
    if (year === "2022-2023-regular") {
      teams = Object.values(teamSalaryCap2022);
    }
  };
  getTeams(props.year);

  axios
    .get(`http://localhost:8000/teamStats/${props.year}`)
    .then((response) => {
      console.log(response.data.teamStatsTotals);
      response.data.teamStatsTotals.map((currentTeam, index) => {
        let name = `${currentTeam.team.city} ${currentTeam.team.name}`;

        teams.filter((current) => {
          if (current.name === name) {
            current.totalPointsScored = currentTeam.stats.offense.pts;
            current.rebounds = currentTeam.stats.rebounds.reb;
            current.fouls = currentTeam.stats.miscellaneous.fouls;
            current.assists = currentTeam.stats.offense.ast;
          }
        });
      });
    });
  console.log("teams:", teams);

  const teamData = teams.map((currentTeam, index) => {
    let logo = "circle";
    if (currentTeam.logo) {
      logo = new Image(50, 50);
      logo.src = currentTeam.logo;
    }

    return {
      label: currentTeam.name,
      data: [
        {
          x: Number(
            currentTeam.totalCap
              .split("")
              .filter((currentElement) => {
                if (!isNaN(currentElement)) {
                  return currentElement;
                }
              })
              .join("")
          ),
          y: Number(currentTeam[`${props.stat}`]),
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
          text: "Salary Cap",
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
        position: "left",
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
    datasets: teamData,
  };
  return (
    <>
      <Bubble options={options} data={data} />
    </>
  );
}
