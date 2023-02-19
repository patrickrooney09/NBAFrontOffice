"use client";
import {
  Chart as ChartJS,
  LinearScale,
  PointElement,
  Tooltip,
  Legend,
} from "chart.js";
import { Bubble } from "react-chartjs-2";
import teamSalaryCap2022 from "/Users/patrickrooney/NBAFrontOffice/salaryData/teamSalaries/teamSalaryCap2020.json";
// import logo from "/Users/patrickrooney/NBAFrontOffice/salaryData/logos/nba-san-antonio-spurs-logo.png";

// let spurs = new Image(50, 50);
// spurs.src =
//   "https://loodibee.com/wp-content/uploads/nba-san-antonio-spurs-logo.png";

ChartJS.register(LinearScale, PointElement, Tooltip, Legend);

// console.log(Object.values(teamSalaryCap2022));

const teams = Object.values(teamSalaryCap2022);
const teamData = teams.map((currentTeam, index) => {
  let logo = "circle";
  if (currentTeam.logo) {
    logo = new Image(50, 50);
    logo.src = currentTeam.logo;
  }

  // let logo = new Image(25, 25);
  // // spurs.src =
  // //   "./NBAFrontOffice/salaryData/logos/nba-san-antonio-spurs-logo.png";
  // logo.src =
  //   "https://loodibee.com/wp-content/uploads/nba-atlanta-hawks-logo.png";
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

console.log(typeof teamData);

// console.log(spurs);
// console.log(teamSalaryCap2022);
// let spurs = (
//   <Image
//     src="/Users/patrickrooney/NBAFrontOffice/salaryData/logos/nba-san-antonio-spurs-logo.png"
//     alt="spurs"
//     width="50"
//     height="50"
//   />
// );

// var Image =  n

export const options = {
  scales: {
    y: {
      beginAtZero: true,
    },
  },
  // elements: {
  //   point: {
  //     pointStyle: spurs,
  //     // pointStyle: "circle",
  //   },
  // },
};

// map through array of teams
// for each team set label to "team name"
// set data to x being win percentage
// set y to calary cap
// set r to 50
// try building new image within this map function
// let teamLogo = new Image(50,50)
// team.src = link to png image
// set point style to teamLogo

export const data = {
  datasets: teamData,
  // datasets: teams.map((currentTeam) => {
  //   console.log(currentTeam);
  //   console.log(typeof parseInt(currentTeam.totalCap));
  //   return {
  //     label: currentTeam.name,
  //     data: [{ x: currentTeam.winPercentage, y: currentTeam.totalCap }],
  //   };
  // }),
  // datasets: [
  // {
  //   label: "San Antonio Spurs",
  //   data: [{ x: 0.241, y: 98691331, r: 50 }],
  //   pointStyle: spurs,
  // backgroundImage: "url(salaryData/logos/nba-san-antonio-spurs-logo.png)",
  // },
  // {
  //   label: "Red dataset",
  //   data: Array.from({ length: 50 }, () => ({
  //     x: Math.floor(Math.random() * 100) + 0,
  //     y: Math.floor(Math.random() * 100) + 0,
  //     r: Math.floor(Math.random() * 20) + 5,
  //   })),
  //   backgroundColor: "rgba(255, 99, 132, 0.5)",
  // },
  // {
  //   label: "Blue dataset",
  //   data: Array.from({ length: 50 }, () => ({
  //     x: Math.floor(Math.random() * 100) + -100,
  //     y: Math.floor(Math.random() * 100) + -120,
  //     r: Math.floor(Math.random() * 20) + 5,
  //   })),
  //   backgroundColor: "rgba(53, 162, 235, 0.5)",
  // },
  // ],
};

export function Chart() {
  return <Bubble options={options} data={data} />;
}
