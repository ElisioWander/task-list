import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useReducer,
  useState,
} from 'react'
import {
  createNewTaskAction,
  deleteTaskAction,
  markTaskAsCheckedAction,
  updateTaskAction,
} from '../reducers/tasks/actions'
import { TaskData, TasksReducer } from '../reducers/tasks/reducer'

type TasksContextData = {
  tasksState: TaskData[]
  createNewTask: (newTask: string) => void
  updateTask: (updatedTask: string) => void
  deleteTask: () => void
  markTaskAsChecked: () => void
  getTaskId: (taskId: number) => void
}

interface TasksProviderProps {
  children: ReactNode
}

const TasksContext = createContext({} as TasksContextData)

export function TasksProvider({ children }: TasksProviderProps) {
  const [tasksState, dispatch] = useReducer(TasksReducer, [], () => {
    const storedStateAsJSON = localStorage.getItem(
      '@todo-task:tasks-state-1.0.0',
    )

    if (storedStateAsJSON) {
      return JSON.parse(storedStateAsJSON)
    } else {
      return []
    }
  })

  const [selectedTaskId, setSelectedTaskId] = useState(0)

  useEffect(() => {
    const stateJSON = JSON.stringify(tasksState)

    localStorage.setItem('@todo-task:tasks-state-1.0.0', stateJSON)
  }, [tasksState])

  function getTaskId(taskId: number) {
    setSelectedTaskId(taskId)
  }

  function createNewTask(newTask: string) {
    const createdTask = {
      id: new Date().getTime(),
      name: newTask,
      isChecked: false,
    }

    dispatch(createNewTaskAction(createdTask))
  }

  function updateTask(updatedTask: string) {
    dispatch(updateTaskAction(selectedTaskId, updatedTask))
  }

  function markTaskAsChecked() {
    dispatch(markTaskAsCheckedAction(selectedTaskId))
  }

  function deleteTask() {
    dispatch(deleteTaskAction(selectedTaskId))
  }

  return (
    <TasksContext.Provider
      value={{
        tasksState,
        createNewTask,
        deleteTask,
        updateTask,
        markTaskAsChecked,
        getTaskId,
      }}
    >
      {children}
    </TasksContext.Provider>
  )
}

export const useTasks = () => useContext(TasksContext)
