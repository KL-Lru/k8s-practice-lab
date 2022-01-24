import React, {useContext, useEffect} from 'react';
import {useQuery} from 'react-query';
import {toJson} from 'requests/api';
import {readProjects} from 'requests/projects';
import {Project} from 'types/projects';
import ProjectPresenter from 'components/ProjectList/presenter';
import {ProjectContext, ProjectDispatchContext} from 'reducers/projectReducer';
import {initProjects} from 'actions/projects';

const Container: React.FC = () => {
  const {status, data = []} = useQuery(
      ['projects'],
      () => toJson<Array<Project>>(readProjects()),
  );
  const {projects} = useContext(ProjectContext);
  const dispatch = useContext(ProjectDispatchContext);

  useEffect(() => {
    if (status === 'success') {
      dispatch(initProjects(data));
    }
  }, [status]);


  return (
    <ProjectPresenter projects={projects}/>
  );
};

export default Container;
