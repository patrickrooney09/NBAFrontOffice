import Image from "next/image";
import { Inter } from "@next/font/google";
import styles from "./page.module.css";
import teamSalaryCap2022 from "/Users/patrickrooney/NBAFrontOffice/salaryData/teamSalaries/teamSalaryCap2022.json";
import axios from "axios";
import React from "react";
import { Chart } from "./chart";

const inter = Inter({ subsets: ["latin"] });

export default async function Home() {
  const teams = Object.values(teamSalaryCap2022);

  axios.get("http://localhost:8000/teamStats").then((response) => {
    console.log(response.data);
  });

  return (
    <main className={styles.main}>
      <h1>NBA Front Office</h1>
      <Chart />
      <ol>
        {teams.map((currentTeam) => {
          return (
            <li key={Number(currentTeam.rank)}>
              {currentTeam.name} || Active Cap: {currentTeam.activeCap} || Cap
              Space: {currentTeam.capSpace}
            </li>
          );
        })}
      </ol>
    </main>
  );
}
