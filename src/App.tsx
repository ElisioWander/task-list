import { Header } from './Components/Header'

import styles from './App.module.scss'
import { Dashboard } from './Components/Dashboard'

export function App() {
  return (
    <div className={styles.container}>
      <Header />
      <Dashboard />
    </div>
  )
}
