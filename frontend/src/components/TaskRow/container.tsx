import {deleteTask as deleteTaskAction, updateTask as updateTaskAction} from 'actions/tasks';

import Presenter from 'components/TaskRow/presenter';
import React, {useContext} from 'react';
import {TaskDispatchContext} from 'reducers/taskReducer';
import {Task} from 'types/tasks';
import {DateTime} from 'luxon';
import {deleteTask, updateTask} from 'requests/tasks';
import {toJson} from 'requests/api';

type Props = {
  task: Task;
}

const Container: React.FC<Props> = ({task}) => {
  const dispatch = useContext(TaskDispatchContext);
  const handleRemove = async () => {
    try {
      const data = await toJson<Task>(
          deleteTask(task),
      );
      dispatch(deleteTaskAction(data));
    } catch {}
  };
  const handleCheckComplete = async () => {
    try {
      const data = await toJson<Task>(updateTask(
          {...task, finished_at: DateTime.now().toFormat('yyyy-MM-dd', {locale: 'ja'})},
      ));
      dispatch(updateTaskAction(data));
    } catch {}
  };
  const handleRevoke = async () => {
    try {
      const data = await toJson<Task>(updateTask(
          {...task, finished_at: ''},
      ));
      dispatch(updateTaskAction(data));
    } catch {}
  };


  return (
    <Presenter
      task={task}
      onRemove={handleRemove}
      onComplete={handleCheckComplete}
      onRevoke={handleRevoke}
    />
  );
};

export default Container;
