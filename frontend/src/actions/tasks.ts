import {Task} from 'types/tasks';

export const initTasks = (tasks: Array<Task>) => ({
  type: 'INIT_TASKS' as const,
  payloads: {tasks},
});

export const registTask = (task: Task) => ({
  type: 'REGIST_TASK' as const,
  payloads: {task},
});

export const updateTask = (task: Task) => ({
  type: 'UPDATE_TASK' as const,
  payloads: {task},
});

export const deleteTask = (task: Task) => ({
  type: 'DELETE_TASK' as const,
  payloads: {task},
});

export const openTaskForm = (task: Task) => ({
  type: 'OPEN_TASK_FORM' as const,
  payloads: {task},
});

export const closeTaskForm = () => ({
  type: 'CLOSE_TASK_FORM' as const,
});

export const openTaskConfirm = (task: Task) => ({
  type: 'OPEN_TASK_CONFIRM' as const,
  payloads: {task},
});

export const closeTaskConfirm = () => ({
  type: 'CLOSE_TASK_CONFIRM' as const,
});

export type TaskAction =
  ReturnType<typeof initTasks>
  | ReturnType<typeof updateTask>
  | ReturnType<typeof deleteTask>
  | ReturnType<typeof registTask>
  | ReturnType<typeof openTaskForm>
  | ReturnType<typeof closeTaskForm>
  | ReturnType<typeof openTaskConfirm>
  | ReturnType<typeof closeTaskConfirm>
