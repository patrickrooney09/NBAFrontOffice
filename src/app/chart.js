"use client";
import {
  Chart as ChartJS,
  LinearScale,
  PointElement,
  Tooltip,
  Legend,
} from "chart.js";
import { Bubble } from "react-chartjs-2";

ChartJS.register(LinearScale, PointElement, Tooltip, Legend);

export const options = {
  scales: {
    y: {
      beginAtZero: true,
    },
  },
};

export const data = {
  datasets: [
    {
      label: "Red dataset",
      data: Array.from({ length: 50 }, () => ({
        x: Math.floor(Math.random() * 100) + -100,
        y: Math.floor(Math.random() * 100) + -100,
        r: Math.floor(Math.random() * 20) + 5,
      })),
      backgroundColor: "rgba(255, 99, 132, 0.5)",
    },
    {
      label: "Blue dataset",
      data: Array.from({ length: 50 }, () => ({
        x: Math.floor(Math.random() * 100) + -100,
        y: Math.floor(Math.random() * 100) + -100,
        r: Math.floor(Math.random() * 20) + 5,
      })),
      backgroundColor: "rgba(53, 162, 235, 0.5)",
    },
  ],
};

export function Chart() {
  return <Bubble options={options} data={data} />;
}
