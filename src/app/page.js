import Image from 'next/image'
import { Inter } from '@next/font/google'
import styles from './page.module.css'
import { getSalaryCapData } from './webscraper'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  getSalaryCapData()
  return (
    <main className={styles.main}>
      <h1>NBA Front Office</h1>
    </main>
  )
}
