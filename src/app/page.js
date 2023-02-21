"use client";
import { Inter } from "@next/font/google";
import styles from "./page.module.css";
import React, { useState } from "react";
import { Chart } from "./chart";
import { PlayerChart } from "./playerChart";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const [selected, setSelected] = useState("2022-2023-regular");
  const [stat, setStat] = useState("assists");
  const [category, setCategory] = useState("team");

  const handleYearChange = (event) => {
    event.preventDefault();
    setSelected(event.target.value);
  };
  const handleStatChange = (event) => {
    event.preventDefault();
    setStat(event.target.value);
  };

  const handleChange = (event) => {
    event.preventDefault();
    setCategory(event.target.value);
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
      <h1 id="header">NBA Front Office</h1>
      {category === "players" ? (
        <PlayerChart className="chart" year={selected} stat={stat} />
      ) : (
        <Chart className="chart" year={selected} stat={stat} />
      )}
      <div className="dropdowns">
        {" "}
        <form id="year">
          <label htmlFor="year-dropdown">Sort Year: </label>
          <select name="year-dropdown" onChange={handleYearChange}>
            <option value="2021-regular">-</option>
            <option value="2021-regular">2020-2021</option>
            <option value="2021-2022-regular">2021-2022</option>
            <option value="2022-2023-regular">2022-2023</option>
          </select>
        </form>
        {category === "team" ? (
          <form id="stat">
            <label htmlFor="stat-dropdown">Sort Stat: </label>
            <select name="stat-dropdown" onChange={handleStatChange}>
              <option value="totalPointsScored">-</option>
              <option value="winPercentage">Win Percentage</option>
              <option value="totalPointsScored">Total Points</option>
              <option value="rebounds">Rebounds</option>
              <option value="fouls">Fouls</option>
              <option value="assists">assists</option>
            </select>
          </form>
        ) : (
          <form id="stat">
            <label htmlFor="stat-dropdown">Sort Stat: </label>
            <select name="stat-dropdown" onChange={handleStatChange}>
              <option value="totalPointsScored">-</option>
              <option value="totalPointsScored">Total Points</option>
              <option value="rebounds">Rebounds</option>
              <option value="fouls">Fouls</option>
              <option value="assists">assists</option>
            </select>
          </form>
        )}
        <form id="player-or-team">
          <label htmlFor="stat-dropdown">Sort Category: </label>
          <select name="stat-dropdown" onChange={handleChange}>
            <option value="team">Team</option>
            <option value="players">Players</option>
          </select>
        </form>
      </div>
    </main>
  );
}
