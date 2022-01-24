import {ResponsePromise} from 'ky';
import {Project} from 'types/projects';
import {api} from './api';


const SCOPE = 'projects';

export const createProject = (data: Pick<Project, 'name'>): ResponsePromise => {
  return api.post(SCOPE, {json: data});
};

export const readProjects = (): ResponsePromise => {
  return api.get(SCOPE);
};

export const updateProject = (data: Project): ResponsePromise => {
  return api.put(SCOPE, {json: data});
};

export const deleteProject = (data: Pick<Project, 'id'>): ResponsePromise => {
  return api.delete(SCOPE, {json: data});
};
