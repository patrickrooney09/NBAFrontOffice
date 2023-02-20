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
import teamSalaryCap2020 from "/Users/patrickrooney/NBAFrontOffice/salaryData/teamSalaries/teamSalaryCap2020.json";
import teamSalaryCap2021 from "/Users/patrickrooney/NBAFrontOffice/salaryData/teamSalaries/teamSalaryCap2021.json";
import teamSalaryCap2022 from "/Users/patrickrooney/NBAFrontOffice/salaryData/teamSalaries/teamSalaryCap2022.json";

import { Dropdown } from "@nextui-org/react";

export function Chart(props) {
  ChartJS.register(LinearScale, PointElement, Tooltip, Legend);

  let teams;
  const getTeams = (year) => {
    if (year === 2020) {
      teams = Object.values(teamSalaryCap2020);
    }
    if (year === 2021) {
      teams = Object.values(teamSalaryCap2021);
    }
    if (year === 2022) {
      teams = Object.values(teamSalaryCap2022);
    }
  };
  getTeams(props.year);

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
          y: Number(currentTeam.winPercentage),
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
          text: `${props.year} Win Percentage`,
        },
        beginAtZero: true,
        ticks: {
          color: "white",
          // Include a dollar sign in the ticks
          callback: function (value, index, ticks) {
            return "%" + value;
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
