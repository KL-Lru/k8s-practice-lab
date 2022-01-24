import {ResponsePromise} from 'ky';
import {Project} from 'types/projects';
import {Task} from 'types/tasks';
import {api} from './api';

const SCOPE = 'tasks';

type FormCol = 'title' | 'description' | 'deadline' | 'project_id';
export const createTask = (data: Pick<Task, FormCol>): ResponsePromise => {
  return api.post(SCOPE, {json: data});
};

export const readTasks = (project: Project): ResponsePromise => {
  const qs = new URLSearchParams();
  qs.set('project_id', project.id);
  return api.get(`${SCOPE}?${qs.toString()}`);
};

export const updateTask = (data: Task): ResponsePromise => {
  return api.put(SCOPE, {json: data});
};

export const deleteTask = (data: Pick<Task, 'id'>): ResponsePromise => {
  return api.delete(SCOPE, {json: data});
};
