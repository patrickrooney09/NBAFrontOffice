import Image from "next/image";
import { Inter } from "@next/font/google";
import styles from "./page.module.css";
import teamSalaryCap from "teamSalaryCap.json";

const inter = Inter({ subsets: ["latin"] });
export default async function Home() {
  const teams = Object.values(teamSalaryCap);

  return (
    <main className={styles.main}>
      <h1>NBA Front Office</h1>
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
