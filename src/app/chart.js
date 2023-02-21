"use client";
import {
  Chart as ChartJS,
  LinearScale,
  PointElement,
  Tooltip,
  Legend,
} from "chart.js";
import { Bubble } from "react-chartjs-2";
import teamSalaryCap2020 from "src/app/salaryData/teamSalaries/TeamSalaryCap2020.json";
import teamSalaryCap2021 from "src/app/salaryData/teamSalaries/TeamSalaryCap2021.json";
import teamSalaryCap2022 from "src/app/salaryData/teamSalaries/TeamSalaryCap2022.json";

export async function getData(year) {
  let response = await fetch(
    `https://api.mysportsfeeds.com/v2.1/pull/nba/${year}/team_stats_totals.json`,
    {
      method: "GET",
      headers: {
        Authorization:
          "Basic " + btoa(`4a6c73c1-8cf1-4f49-b901-1ed5ae:MYSPORTSFEEDS`),
      },
    }
  );

  let data = await response.json();
  return data;
}

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
  console.log(getData(props.year));

  getData(props.year).then((response) => {
    response.teamStatsTotals.map((currentTeam, index) => {
      let name = `${currentTeam.team.city} ${currentTeam.team.name}`;

      teams.filter((current) => {
        if (current.name === name) {
          current.totalPointsScored = currentTeam.stats.offense.pts;
          current.rebounds = currentTeam.stats.rebounds.reb;
          current.fouls = currentTeam.stats.miscellaneous.fouls;
          current.assists = currentTeam.stats.offense.ast;
          current.officialImg = currentTeam.team.officialLogoImageSrc;
        }
      });
    });
  });

  const teamData = teams.map((currentTeam, index) => {
    let logo = "circle";
    if (currentTeam.officialImg) {
      logo = new Image(50, 50);
      logo.src = currentTeam.officialImg;
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
        ticks: {
          color: "#FF4F79",
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
          text: "Salary Cap",
        },
        ticks: {
          color: "#FF4F79",
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
          display: false,
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
