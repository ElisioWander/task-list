import { ChangeEvent, FormEvent, InvalidEvent, useState } from 'react'
import { useModal } from '../../../Context/ModalContext'
import { useTasks } from '../../../Context/TasksContext'

import styles from './UpdateTaskModal.module.scss'

export function UpdateTaskModal() {
  const [editTask, setEditTask] = useState('')

  const { isOpenMdal, handleCloseModal } = useModal()
  const { updateTask } = useTasks()

  function handleGetEditInputValue(event: ChangeEvent<HTMLInputElement>) {
    const inputValue = event.target.value

    setEditTask(inputValue)
  }

  function handleEditTaskInputValueInvalid(
    event: InvalidEvent<HTMLInputElement>,
  ) {
    event.currentTarget.setCustomValidity('Este campo é obrigatório')
  }

  function handleUpdateTask(event: FormEvent) {
    event.preventDefault()

    updateTask(editTask)

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
            onInvalid={handleEditTaskInputValueInvalid}
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
