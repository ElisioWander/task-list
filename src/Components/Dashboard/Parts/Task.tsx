import { Trash } from 'phosphor-react'
import { useState } from 'react'
import { useModal } from '../../../Context/ModalContext'
import { useTasks } from '../../../Context/TasksContext'
import { ChackBox } from '../../CheckBox'

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
  const [isTaskCompleted, setIsTaskCompleted] = useState(task.isChecked)

  const { handleOpenModal, handleGetTaskId } = useModal()
  const { setTasks } = useTasks()

  function handleDeleteTask() {
    const currentTaskId = task.id

    setTasks((state) => state.filter((task) => task.id !== currentTaskId))
  }

  function handleActiveCheckbox() {
    const toggleCheckTask = !isTaskCompleted

    const currentTaskId = task.id
    setTasks((state) =>
      state.map((task) => {
        if (task.id === currentTaskId) {
          return { ...task, isChecked: toggleCheckTask }
        } else {
          return task
        }
      }),
    )

    setIsTaskCompleted(toggleCheckTask)
  }

  return (
    <div className={styles.task} onClick={() => handleGetTaskId(task.id)}>
      <ChackBox
        onActiveCheckbox={handleActiveCheckbox}
        isTaskCompleted={isTaskCompleted}
      />

      {isTaskCompleted ? (
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
