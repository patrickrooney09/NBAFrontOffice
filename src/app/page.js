"use client";

import Image from "next/image";

import { Inter } from "@next/font/google";
import { useTheme, Text, Dropdown } from "@nextui-org/react";
import styles from "./page.module.css";
import teamSalaryCap2022 from "/Users/patrickrooney/NBAFrontOffice/salaryData/teamSalaries/teamSalaryCap2022.json";
import axios from "axios";
import React, { useState } from "react";
import { Chart } from "./chart";
import logo from "/Users/patrickrooney/NBAFrontOffice/salaryData/logos/nba-san-antonio-spurs-logo.png";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const { theme } = useTheme();

  // const teams = Object.values(teamSalaryCap2022);

  // axios.get("http://localhost:8000/teamStats").then((response) => {
  //   console.log(response.data);
  // });
  const [selected, setSelected] = useState(2020);

  const handleChange = async (event) => {
    event.preventDefault();

    setSelected(Number(event.target.value));
    console.log(selected);
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
      <Chart class="chart" year={selected} />
      <form id="sort-campus-form">
        <label htmlFor="sorting-campuses">Sort By: </label>
        <select name="sorting-campuses" onChange={handleChange}>
          <option value="">-</option>
          <option value="2020">2020</option>
          <option value="2021">2021</option>
          <option value="2022">2022</option>
        </select>
      </form>
      {/* <Image src={logo} alt="spurs" width="50" height="50" /> */}
      {/* <ol>
        {teams.map((currentTeam) => {
          return (
            <li key={Number(currentTeam.rank)}>
              {currentTeam.name} || Active Cap: {currentTeam.activeCap} || Cap
              Space: {currentTeam.capSpace}
            </li>
          );
        })}
      </ol> */}
    </main>
  );
}
