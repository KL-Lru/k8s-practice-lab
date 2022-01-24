import {Task} from 'types/tasks';

export type Project = {
  id: string;
  name: string;
  tasks: Array<Task>;
}

export const initProject = () => ({
  id: '',
  name: '',
  tasks: [],
});
