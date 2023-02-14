import Image from "next/image";
import { Inter } from "@next/font/google";
import styles from "./page.module.css";
import { getSalaryCapData } from "./webscraper";
// import react, { useState, useEffect } from "react";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const team = getSalaryCapData();
  console.log(typeof team);
  return (
    <main className={styles.main}>
      <h1>NBA Front Office</h1>
      <h1>{}</h1>
    </main>
  );
}
