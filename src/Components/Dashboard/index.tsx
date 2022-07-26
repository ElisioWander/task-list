import { useTasks } from '../../Context/TasksContext'
import { Task } from './Parts/Task'
import { UpdateTaskModal } from './Parts/UpdateTaskModal'
import { TaskForm } from './Parts/TaskForm'
import { EmptyTasks } from './Parts/EmptyTasks'

import styles from './Dashboard.module.scss'

export function Dashboard() {
  const { tasks } = useTasks()

  const completedTasks = tasks.filter((task) => task.isChecked === true)
  const parsedTasks = tasks.map((task) => <Task key={task.id} task={task} />)
  const isTasksEmpty = tasks.length === 0

  return (
    <>
      <div className={styles.container}>
        <TaskForm />

        <main className={styles.tasksContainer}>
          <div className={styles.headerTasks}>
            <div>
              <p>Tarefas criadas</p>
              <span>{tasks.length}</span>
            </div>
            <div>
              <p>Concluidas</p>
              <span>
                {completedTasks.length} de {tasks.length}
              </span>
            </div>
          </div>

          <div className={styles.tasks}>
            {isTasksEmpty ? <EmptyTasks /> : parsedTasks}
          </div>
        </main>
      </div>

      <UpdateTaskModal />
    </>
  )
}
