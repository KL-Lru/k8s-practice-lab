import React, {useContext, useEffect} from 'react';
import Presenter from 'components/TaskList/presenter';
import {initTasks} from 'actions/tasks';
import {useQuery} from 'react-query';
import {TaskContext, TaskDispatchContext} from 'reducers/taskReducer';
import {toJson} from 'requests/api';
import {readTasks} from 'requests/tasks';
import {Project} from 'types/projects';
import {Task} from 'types/tasks';
import {Immutable} from 'immer';

type Props = {
  project: Immutable< Project>;
}

const Container: React.FC<Props> = ({project}) => {
  const {status, data = []} = useQuery(
      ['tasks', project.id],
      () => toJson<Array<Task>>(readTasks(project as Project)),
  );
  const {tasks} = useContext(TaskContext);
  const dispatch = useContext(TaskDispatchContext);

  useEffect(() => {
    if (status === 'success') {
      dispatch(initTasks(data));
    }
  }, [status]);

  if (tasks == null) return (<></>);
  return (
    <Presenter tasks = {tasks}/>
  );
};

export default Container;

