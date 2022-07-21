import { Header } from "./Components/Header";
import { Dashboard } from "./Components/Dashborad";

import styles from "./App.module.scss"

export function App() {
  return (
    <div className={styles.container} >
      <Header />
      <Dashboard />
    </div>
  )
}
