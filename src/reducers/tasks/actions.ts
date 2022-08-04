import { TaskData } from './reducer'

export enum ActionTypes {
  CREATE_NEW_TASK = 'CREATE_NEW_TASK',
  UPDATE_TASK = 'UPDATE_TASK',
  MARK_TASK_AS_CHECKED = 'MARK_TASK_AS_CHECKED',
  DELETE_TASK = 'DELETE_TASK',
}

export function createNewTaskAction(createdTask: TaskData) {
  return {
    type: ActionTypes.CREATE_NEW_TASK,
    payload: {
      createdTask,
    },
  }
}

export function updateTaskAction(selectedTaskId: number, updatedTask: string) {
  return {
    type: ActionTypes.UPDATE_TASK,
    payload: {
      selectedTaskId,
      updatedTask,
    },
  }
}

export function markTaskAsCheckedAction(selectedTaskId: number) {
  return {
    type: ActionTypes.MARK_TASK_AS_CHECKED,
    payload: {
      selectedTaskId,
    },
  }
}

export function deleteTaskAction(selectedTaskId: number) {
  return {
    type: ActionTypes.DELETE_TASK,
    payload: {
      selectedTaskId,
    },
  }
}
