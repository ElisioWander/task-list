import { PlusCircle } from 'phosphor-react'
import { FormEvent, InvalidEvent, useState } from 'react'
import { useTasks } from '../../../Context/TasksContext'

import styles from './CreateTask.module.scss'

export function CreateTask() {
  const [newTask, setNewTask] = useState('')

  const { setTasks } = useTasks()

  function handleCreateNewTask(event: FormEvent) {
    event.preventDefault()

    const createdTask = {
      id: new Date().getTime(),
      name: newTask,
      isChecked: false,
    }

    setTasks((state) => [...state, createdTask])
    setNewTask('')
  }

  function handleNewCommentInvalid(event: InvalidEvent<HTMLInputElement>) {
    event.currentTarget.setCustomValidity('Este campo é obrigatório')
  }

  const isNewTaskEmpty = newTask.length === 0

  return (
    <form onSubmit={handleCreateNewTask} className={styles.form}>
      <input
        type="text"
        placeholder="Adicionar uma nova tarefa"
        value={newTask}
        required
        onInvalid={handleNewCommentInvalid}
        onChange={(event) => setNewTask(event.target.value)}
      />

      <button type="submit" disabled={isNewTaskEmpty}>
        Criar
        <PlusCircle size={16} weight={'bold'} />
      </button>
    </form>
  )
}
