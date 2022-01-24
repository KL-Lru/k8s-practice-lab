import {openProjectConfirm} from 'actions/projects';
import Presenter from 'components/ProjectPanel/presenter';
import {TaskArea} from 'components/TaskArea';
import {Immutable} from 'immer';
import React, {useContext} from 'react';
import {ProjectDispatchContext} from 'reducers/projectReducer';
import {Project} from 'types/projects';

type Props = {
  project: Immutable<Project>
}

const Container: React.FC<Props> = ({project}) => {
  const dispatch = useContext(ProjectDispatchContext);
  const handleRemove = () => {
    dispatch(openProjectConfirm(project as Project));
  };

  return (
    <Presenter
      project={project}
      onRemove={handleRemove}
      contents = {
        <>
          <TaskArea project={project}/>
        </>
      }
    />
  );
};

export default Container;
