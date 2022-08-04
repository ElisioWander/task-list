import { ActionTypes } from './actions'

export type TaskData = {
  id: number
  name: string
  isChecked: boolean
}

export function TasksReducer(state: TaskData[], action: any) {
  switch (action.type) {
    case ActionTypes.CREATE_NEW_TASK:
      return [...state, action.payload.createdTask]

    case ActionTypes.UPDATE_TASK:
      return state.map((task) => {
        if (task.id === action.payload.selectedTaskId) {
          return { ...task, name: action.payload.updatedTask }
        } else {
          return task
        }
      })

    case ActionTypes.MARK_TASK_AS_CHECKED:
      return state.map((task) => {
        if (
          task.id === action.payload.selectedTaskId &&
          task.isChecked === false
        ) {
          return { ...task, isChecked: true }
        } else if (
          task.id === action.payload.selectedTaskId &&
          task.isChecked === true
        ) {
          return { ...task, isChecked: false }
        } else {
          return task
        }
      })

    case ActionTypes.DELETE_TASK:
      return state.filter((task) => task.id !== action.payload.selectedTaskId)

    default:
      return state
  }
}
