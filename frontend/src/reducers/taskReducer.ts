import {TaskAction} from 'actions/tasks';
import {createContext, Dispatch, Reducer} from 'react';
import {Immutable, produce} from 'immer';
import {initTask, Task} from 'types/tasks';


export type State = Immutable<{
  tasks: Array<Task>;
  manipulateTask: Task;
  openForm: boolean;
  openConfirm: boolean;
}>

export const initialState: State = {
  tasks: [],
  manipulateTask: initTask(),
  openForm: false,
  openConfirm: false,
};

export const reducer: Reducer<State, TaskAction> = (state, action) => {
  switch (action.type) {
    case 'INIT_TASKS':
      return produce(state, (draft) => {
        draft.tasks = action.payloads.tasks;
      });
    case 'REGIST_TASK':
      return produce(state, (draft) => {
        draft.tasks.push(action.payloads.task);
      });
    case 'UPDATE_TASK':
      return produce(state, (draft) => {
        const index = draft.tasks.findIndex((tsk) => tsk.id == action.payloads.task.id);
        if (index < 0) return;
        draft.tasks.splice(index, 1, action.payloads.task);
      });
    case 'DELETE_TASK':
      return produce(state, (draft) => {
        const index = draft.tasks.findIndex((tsk) => tsk.id == action.payloads.task.id);
        if (index < 0) return;
        draft.tasks.splice(index, 1);
      });
    case 'OPEN_TASK_FORM':
      return produce(state, (draft) => {
        draft.manipulateTask = action.payloads.task;
        draft.openForm = true;
      });
    case 'OPEN_TASK_CONFIRM':
      return produce(state, (draft) => {
        draft.manipulateTask = action.payloads.task;
        draft.openConfirm = true;
      });
    case 'CLOSE_TASK_FORM':
      return produce(state, (draft) => {
        draft.openForm = false;
      });
    case 'CLOSE_TASK_CONFIRM':
      return produce(state, (draft) => {
        draft.openConfirm = false;
      });
  }
};

export const TaskContext = createContext<State>(initialState);
export const TaskDispatchContext = createContext<Dispatch<TaskAction>>(() => {});
