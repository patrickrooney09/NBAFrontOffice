import Image from "next/image";
import { Inter } from "@next/font/google";
import styles from "./page.module.css";
import teamSalaryCap from "teamSalaryCap.json";

const inter = Inter({ subsets: ["latin"] });
export default async function Home() {
  console.log(
    Object.values(teamSalaryCap).map((currentTeam) => {
      return currentTeam.name;
    })
  );

  const teams = Object.values(teamSalaryCap);
  console.log(teams);
  return (
    <main className={styles.main}>
      <h1>NBA Front Office</h1>
      {}
    </main>
  );
}
