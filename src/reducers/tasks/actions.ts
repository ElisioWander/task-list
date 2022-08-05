import { TaskData } from './reducer'

export enum ActionTypes {
  GET_TASK_ID = 'GET_TASK_ID',
  CREATE_NEW_TASK = 'CREATE_NEW_TASK',
  UPDATE_TASK = 'UPDATE_TASK',
  MARK_TASK_AS_CHECKED = 'MARK_TASK_AS_CHECKED',
  DELETE_TASK = 'DELETE_TASK',
}

export function getTaskIdAction(selectedTaskId: number) {
  return {
    type: ActionTypes.GET_TASK_ID,
    payload: {
      selectedTaskId,
    },
  }
}

export function createNewTaskAction(createdTask: TaskData) {
  return {
    type: ActionTypes.CREATE_NEW_TASK,
    payload: {
      createdTask,
    },
  }
}

export function updateTaskAction(updatedTask: string) {
  return {
    type: ActionTypes.UPDATE_TASK,
    payload: {
      updatedTask,
    },
  }
}

export function markTaskAsCheckedAction() {
  return { type: ActionTypes.MARK_TASK_AS_CHECKED }
}

export function deleteTaskAction() {
  return { type: ActionTypes.DELETE_TASK }
}
