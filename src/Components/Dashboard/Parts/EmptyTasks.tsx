import clipBoard from '../../../assets/Clipboard.svg'
import styles from './EmptyTasks.module.scss'

export function EmptyTasks() {
  return (
    <div className={styles.container}>
      <img src={clipBoard} alt="Clipboard image" />
      <p>
        <strong>Você ainda não tem tarefas cadastradas</strong>
        <br />
        Crie tarefas e organize seus itens a fazer
      </p>
    </div>
  )
}
