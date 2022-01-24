import React, {ReactNode, useReducer} from 'react';
import {
  reducer, initialState, ProjectContext, ProjectDispatchContext,
} from 'reducers/projectReducer';

type Props = {
  children: ReactNode;
}

export const ProjectProvider: React.FC<Props> = ({children}) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <ProjectContext.Provider value={state}>
      <ProjectDispatchContext.Provider value={dispatch}>
        {children}
      </ProjectDispatchContext.Provider>
    </ProjectContext.Provider>
  );
};
