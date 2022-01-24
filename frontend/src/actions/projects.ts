import {Project} from 'types/projects';

export const initProjects = (projects: Array<Project>) => ({
  type: 'INIT_PROJECTS' as const,
  payloads: {projects},
});

export const createProject = (project: Project) => ({
  type: 'CREATE_PROJECT' as const,
  payloads: {project},
});

export const updateProject = (project: Project) => ({
  type: 'UPDATE_PROJECT' as const,
  payloads: {project},
});

export const deleteProject = (project: Project) => ({
  type: 'DELETE_PROJECT' as const,
  payloads: {project},
});

export const openProjectForm = (project: Project) => ({
  type: 'OPEN_PROJECT_FORM' as const,
  payloads: {project},
});

export const closeProjectForm = () => ({
  type: 'CLOSE_PROJECT_FORM' as const,
});

export const openProjectConfirm = (project: Project) => ({
  type: 'OPEN_PROJECT_CONFIRM' as const,
  payloads: {project},
});

export const closeProjectConfirm = () => ({
  type: 'CLOSE_PROJECT_CONFIRM' as const,
});


export type ProjectAction =
  ReturnType<typeof initProjects>
  | ReturnType<typeof createProject>
  | ReturnType<typeof updateProject>
  | ReturnType<typeof deleteProject>
  | ReturnType<typeof openProjectForm>
  | ReturnType<typeof openProjectConfirm>
  | ReturnType<typeof closeProjectForm>
  | ReturnType<typeof closeProjectConfirm>
