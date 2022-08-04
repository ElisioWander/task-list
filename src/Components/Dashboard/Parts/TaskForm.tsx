import { PlusCircle } from 'phosphor-react'
import { ChangeEvent, FormEvent, InvalidEvent, useState } from 'react'
import { useTasks } from '../../../Context/TasksContext'

import styles from './TaskForm.module.scss'

export function TaskForm() {
  const [newTask, setNewTask] = useState('')

  const { createNewTask } = useTasks()

  function handleGetInputValue(event: ChangeEvent<HTMLInputElement>) {
    setNewTask(event.target.value)
  }

  function handleNewTaskInputValueInvalid(
    event: InvalidEvent<HTMLInputElement>,
  ) {
    event.currentTarget.setCustomValidity('Este campo é obrigatório')
  }

  function handleCreateNewTask(event: FormEvent) {
    event.preventDefault()

    createNewTask(newTask)
    setNewTask('')
  }

  const isNewTaskEmpty = !newTask

  return (
    <form onSubmit={handleCreateNewTask} className={styles.form}>
      <input
        type="text"
        placeholder="Adicionar uma nova tarefa"
        value={newTask}
        required
        onInvalid={handleNewTaskInputValueInvalid}
        onChange={handleGetInputValue}
      />

      <button type="submit" disabled={isNewTaskEmpty}>
        Criar
        <PlusCircle size={16} weight={'bold'} />
      </button>
    </form>
  )
}
