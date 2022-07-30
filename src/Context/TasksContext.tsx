import React, { createContext, ReactNode, useContext, useState } from 'react'

interface TasksProviderProps {
  children: ReactNode
}

type TaskData = {
  id: number
  name: string
  isChecked: boolean
}

type TasksContextData = {
  tasks: TaskData[]
  setTasks: React.Dispatch<React.SetStateAction<TaskData[]>>
}

const TasksContext = createContext({} as TasksContextData)
const tasksInLocalstorage = JSON.parse(localStorage.getItem('tasks') as any)

export function TasksProvider({ children }: TasksProviderProps) {
  const [tasks, setTasks] = useState<TaskData[]>(tasksInLocalstorage || [])

  localStorage.setItem('tasks', JSON.stringify([...tasks]))

  return (
    <TasksContext.Provider value={{ tasks, setTasks }}>
      {children}
    </TasksContext.Provider>
  )
}

export const useTasks = () => useContext(TasksContext)
