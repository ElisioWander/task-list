import { ActionTypes } from './actions'

export type TaskData = {
  id: number
  name: string
  isChecked: boolean
}

type TasksState = {
  tasks: TaskData[]
  selectedTaskId: number | null
}

export function TasksReducer(state: TasksState, action: any) {
  switch (action.type) {
    case ActionTypes.GET_TASK_ID:
      return {
        ...state,
        selectedTaskId: action.payload.selectedTaskId,
      }

    case ActionTypes.CREATE_NEW_TASK:
      return {
        ...state,
        tasks: [...state.tasks, action.payload.createdTask],
      }

    case ActionTypes.UPDATE_TASK:
      return {
        ...state,
        tasks: state.tasks.map((task) => {
          if (task.id === state.selectedTaskId) {
            return { ...task, name: action.payload.updatedTask }
          } else {
            return task
          }
        }),
      }

    case ActionTypes.MARK_TASK_AS_CHECKED:
      return {
        ...state,
        tasks: state.tasks.map((task) => {
          if (task.id === state.selectedTaskId && task.isChecked === false) {
            return { ...task, isChecked: true }
          } else if (
            task.id === state.selectedTaskId &&
            task.isChecked === true
          ) {
            return { ...task, isChecked: false }
          } else {
            return task
          }
        }),
      }

    case ActionTypes.DELETE_TASK:
      return {
        ...state,
        tasks: state.tasks.filter((task) => task.id !== state.selectedTaskId),
      }

    default:
      return state
  }
}
