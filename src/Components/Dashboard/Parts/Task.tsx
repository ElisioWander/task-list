import { Trash } from 'phosphor-react'
import { useModal } from '../../../Context/ModalContext'
import { useTasks } from '../../../Context/TasksContext'
import { Checkbox } from '../../CheckBox'

import styles from './Task.module.scss'

type TaskData = {
  id: number
  name: string
  isChecked: boolean
}

interface TaskProps {
  task: TaskData
}

export function Task({ task }: TaskProps) {
  const { handleOpenModal } = useModal()
  const { deleteTask, markTaskAsChecked, getTaskId } = useTasks()

  function handleGetTaskId() {
    getTaskId(task.id)
  }

  function handleDeleteTask() {
    deleteTask()
  }

  function handleMarkTaskAsChecked() {
    markTaskAsChecked()
  }

  return (
    <div className={styles.task} onMouseEnter={handleGetTaskId}>
      <Checkbox
        onMarkTaskAsChecked={handleMarkTaskAsChecked}
        isTaskChecked={task.isChecked}
      />

      {task.isChecked ? (
        <p className={styles.isChecked}>{task.name}</p>
      ) : (
        <p onClick={handleOpenModal}>{task.name}</p>
      )}

      <button onClick={handleDeleteTask}>
        <Trash size={14} />
      </button>
    </div>
  )
}
