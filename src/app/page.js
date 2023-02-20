"use client";
import { Inter } from "@next/font/google";
// import { useTheme, Text, Dropdown } from "@nextui-org/react";
import styles from "./page.module.css";
import axios from "axios";
import React, { useState } from "react";
import { Chart } from "./chart";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  // const { theme } = useTheme();

  const [selected, setSelected] = useState(2020);
  const [stat, setStat] = useState("winPercentage");

  const handleYearChange = async (event) => {
    event.preventDefault();
    setSelected(Number(event.target.value));
  };
  const handleStatChange = async (event) => {
    event.preventDefault();
    setStat(event.target.value);
  };

  return (
    <main
      className={styles.main}
      css={{
        color: "$blue800",
        fontSize: "$sm",
        padding: "$2 $4",
      }}
    >
      <h1>NBA Front Office</h1>
      <Chart class="chart" year={selected} stat={stat} />
      <form id="year">
        <label htmlFor="year-dropdown">Sort Year: </label>
        <select name="year-dropdown" onChange={handleYearChange}>
          <option value="">-</option>
          <option value="2020">2020</option>
          <option value="2021">2021</option>
          <option value="2022">2022</option>
        </select>
      </form>
      <form id="stat">
        <label htmlFor="stat-dropdown">Sort Stat: </label>
        <select name="stat-dropdown" onChange={handleStatChange}>
          <option value="">-</option>
          <option value="winPercentage">Win Percentage</option>
          <option value="totalPointsScored">Total Points</option>
          <option value="rebounds">Rebounds</option>
          <option value="fouls">Fouls</option>
        </select>
      </form>
    </main>
  );
}
