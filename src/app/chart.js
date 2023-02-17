"use client";
import {
  Chart as ChartJS,
  LinearScale,
  PointElement,
  Tooltip,
  Legend,
} from "chart.js";
import { Bubble } from "react-chartjs-2";
import teamSalaryCap2022 from "/Users/patrickrooney/NBAFrontOffice/salaryData/teamSalaries/teamSalaryCap2022.json";
import logo from "/Users/patrickrooney/NBAFrontOffice/salaryData/logos/nba-san-antonio-spurs-logo.png";

let spurs = new Image(50, 50);
spurs.src =
  "https://loodibee.com/wp-content/uploads/nba-san-antonio-spurs-logo.png";

ChartJS.register(LinearScale, PointElement, Tooltip, Legend);

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
  //   },
  // },
};

export const data = {
  datasets: [
    {
      label: "San Antonio Spurs",

      data: [{ x: 0.241, y: 98691331, r: 50 }],
      pointStyle: spurs,

      // backgroundImage: "url(salaryData/logos/nba-san-antonio-spurs-logo.png)",
    },
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
  ],
};

export function Chart() {
  return <Bubble options={options} data={data} />;
}
