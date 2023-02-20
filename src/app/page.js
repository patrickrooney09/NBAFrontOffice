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

  axios.get("http://localhost:8000/teamStats").then((response) => {
    console.log(response.data);
  });
  const [selected, setSelected] = useState(2020);

  const handleChange = async (event) => {
    event.preventDefault();
    setSelected(Number(event.target.value));
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
    </main>
  );
}
