import {openTaskForm} from 'actions/tasks';
import Presenter from 'components/TaskArea/presenter';
import {Immutable} from 'immer';
import React, {useContext, useState} from 'react';
import {TaskDispatchContext} from 'reducers/taskReducer';
import {Project} from 'types/projects';
import {initTask} from 'types/tasks';

type Props = {
  project: Immutable<Project>;
}

const Container: React.FC<Props> = ({project}) => {
  const [open, setOpen] = useState<boolean>(false);
  const dispatch = useContext(TaskDispatchContext);
  const handleToggle = () => {
    setOpen(!open);
  };
  const handleCreate = () => {
    dispatch(openTaskForm(initTask()));
  };

  return (
    <Presenter
      isOpen={open}
      onToggle={handleToggle}
      onCreate={handleCreate}
      project={project}
    />
  );
};

export default Container;
