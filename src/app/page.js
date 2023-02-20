"use client";

import Image from "next/image";

import { Inter } from "@next/font/google";
import { useTheme, Text, Dropdown } from "@nextui-org/react";
import styles from "./page.module.css";
import teamSalaryCap2022 from "/Users/patrickrooney/NBAFrontOffice/salaryData/teamSalaries/teamSalaryCap2022.json";
import axios from "axios";
import React from "react";
import { Chart } from "./chart";
import logo from "/Users/patrickrooney/NBAFrontOffice/salaryData/logos/nba-san-antonio-spurs-logo.png";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const { theme } = useTheme();

  // const teams = Object.values(teamSalaryCap2022);

  // axios.get("http://localhost:8000/teamStats").then((response) => {
  //   console.log(response.data);
  // });

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
      <Chart class="chart" year={2020} />

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
