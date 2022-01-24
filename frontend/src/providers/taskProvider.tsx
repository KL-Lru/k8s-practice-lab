import React, {ReactNode, useReducer} from 'react';
import {initialState, reducer, TaskContext, TaskDispatchContext} from 'reducers/taskReducer';

type Props = {
  children: ReactNode;
}

export const TaskProvider: React.FC<Props> = ({children}) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <TaskContext.Provider value = {state}>
      <TaskDispatchContext.Provider value={dispatch}>
        {children}
      </TaskDispatchContext.Provider>
    </TaskContext.Provider>
  );
};
