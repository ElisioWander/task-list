import todoLogo from '../../assets/Logo.svg'
import styles from './Header.module.scss'

export function Header() {
  return (
    <header className={styles.header}>
      <img src={todoLogo} alt="Logotipo Todo" />
    </header>
  )
}
