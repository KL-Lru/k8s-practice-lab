import {openProjectForm} from 'actions/projects';
import Presenter from 'components/ProjectHeader/presenter';
import React, {useContext} from 'react';
import {ProjectDispatchContext} from 'reducers/projectReducer';
import {initProject} from 'types/projects';

const Container: React.FC = () => {
  const dispatch = useContext(ProjectDispatchContext);
  const handleCreate = () => {
    dispatch(openProjectForm(initProject()));
  };

  return (
    <Presenter onCreate={handleCreate}/>
  );
};
export default Container;
