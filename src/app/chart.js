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
import teamSalaryCap2022 from "/Users/patrickrooney/NBAFrontOffice/salaryData/teamSalaries/teamSalaryCap2020.json";

import { Dropdown } from "@nextui-org/react";

ChartJS.register(LinearScale, PointElement, Tooltip, Legend);

const years = [
  { key: "2020", name: "2020" },
  { key: "2021", name: "2021" },
  { key: "2022", name: "2022" },
];

const teams = Object.values(teamSalaryCap2022);
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

export const options = {
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
        text: "Win Percentage",
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

export const data = {
  datasets: teamData,
};

export function Chart(props) {
  console.log(props.year);
  return (
    <>
      <Bubble options={options} data={data} />
    </>
  );
}
