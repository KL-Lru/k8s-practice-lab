import {ProjectAction} from 'actions/projects';
import {createContext, Dispatch, Reducer} from 'react';
import {initProject, Project} from 'types/projects';
import {Immutable, produce} from 'immer';


type State = Immutable<{
  projects: Array<Project>;
  manipulateProject: Project;
  openForm: boolean;
  openConfirm: boolean;
}>

export const initialState: State = {
  projects: [],
  manipulateProject: initProject(),
  openForm: false,
  openConfirm: false,
};

export const reducer: Reducer<State, ProjectAction> = (state, action) => {
  switch (action.type) {
    case 'INIT_PROJECTS':
      return produce(state, (draft) => {
        draft.projects = action.payloads.projects;
      });
    case 'CREATE_PROJECT':
      const newState= produce(state, (draft) => {
        draft.projects.push(action.payloads.project);
      });
      console.log(newState);
      return newState;
    case 'UPDATE_PROJECT':
      return produce(state, (draft) => {
        const index = draft.projects.findIndex((prj) => prj.id == action.payloads.project.id);
        if (index < 0) return;
        draft.projects.splice(index, 1, action.payloads.project);
      });
    case 'DELETE_PROJECT':
      return produce(state, (draft) => {
        const index = draft.projects.findIndex((prj) => prj.id == action.payloads.project.id);
        if (index < 0) return;
        draft.projects.splice(index, 1);
      });
    case 'OPEN_PROJECT_FORM':
      return produce(state, (draft) => {
        draft.manipulateProject = action.payloads.project;
        draft.openForm = true;
      });
    case 'OPEN_PROJECT_CONFIRM':
      return produce(state, (draft) => {
        draft.manipulateProject = action.payloads.project;
        draft.openConfirm = true;
      });
    case 'CLOSE_PROJECT_FORM':
      return produce(state, (draft) => {
        draft.openForm = false;
      });
    case 'CLOSE_PROJECT_CONFIRM':
      return produce(state, (draft) => {
        draft.openConfirm = false;
      });
  }
};

export const ProjectContext = createContext<State>(initialState);
export const ProjectDispatchContext = createContext<Dispatch<ProjectAction>>(() => {});
