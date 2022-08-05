import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useReducer,
} from 'react'
import {
  createNewTaskAction,
  deleteTaskAction,
  getTaskIdAction,
  markTaskAsCheckedAction,
  updateTaskAction,
} from '../reducers/tasks/actions'
import { TaskData, TasksReducer } from '../reducers/tasks/reducer'

type TasksContextData = {
  tasks: TaskData[]
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
  const [tasksState, dispatch] = useReducer(
    TasksReducer,
    {
      tasks: [],
      selectedTaskId: 0,
    },
    () => {
      const storedStateAsJSON = localStorage.getItem(
        '@todo-task:tasks-state-1.0.0',
      )

      if (storedStateAsJSON) {
        return JSON.parse(storedStateAsJSON)
      } else {
        return {
          TasksReducer,
          tasks: [],
          selectedTaskId: 0,
        }
      }
    },
  )

  const { tasks } = tasksState

  useEffect(() => {
    const stateJSON = JSON.stringify(tasksState)

    localStorage.setItem('@todo-task:tasks-state-1.0.0', stateJSON)
  }, [tasksState])

  function getTaskId(taskId: number) {
    dispatch(getTaskIdAction(taskId))
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
    dispatch(updateTaskAction(updatedTask))
  }

  function markTaskAsChecked() {
    dispatch(markTaskAsCheckedAction())
  }

  function deleteTask() {
    dispatch(deleteTaskAction())
  }

  return (
    <TasksContext.Provider
      value={{
        tasks,
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
