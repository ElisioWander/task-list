import { ChangeEvent, FormEvent, useState } from 'react'
import { useModal } from '../../../Context/ModalContext'
import { useTasks } from '../../../Context/TasksContext'

import styles from './UpdateTaskModal.module.scss'

export function UpdateTaskModal() {
  const [editTask, setEditTask] = useState('')

  const { isOpenMdal, taskId, handleCloseModal } = useModal()
  const { setTasks } = useTasks()

  function handleGetEditInputValue(event: ChangeEvent<HTMLInputElement>) {
    const inputValue = event.target.value

    setEditTask(inputValue)
  }

  function handleUpdateTask(event: FormEvent) {
    event.preventDefault()

    setTasks((state) =>
      state.map((task) => {
        if (task.id === taskId) {
          return { ...task, name: editTask }
        } else {
          return task
        }
      }),
    )

    handleCloseModal()
    setEditTask('')
  }

  const editTaskValueIsEmpty = !editTask

  return isOpenMdal ? (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContainer}>
        <form onSubmit={handleUpdateTask} className={styles.modalContent}>
          <input
            type="text"
            name="edit"
            value={editTask}
            placeholder="Editar tarefa"
            onChange={handleGetEditInputValue}
          />
          <div className={styles.buttons}>
            <button type="submit" disabled={editTaskValueIsEmpty}>
              Editar
            </button>
            <button type="button" onClick={handleCloseModal}>
              Cancelar
            </button>
          </div>
        </form>
      </div>
    </div>
  ) : (
    <></>
  )
}
