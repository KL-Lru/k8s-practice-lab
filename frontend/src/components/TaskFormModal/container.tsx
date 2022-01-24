import React, {useEffect, useState} from 'react';
import Presenter from 'components/TaskFormModal/presenter';
import {useContext} from 'react';
import {useForm} from 'react-hook-form';
import {toJson} from 'requests/api';
import {Task} from 'types/tasks';
import {Alert, Snackbar} from '@mui/material';
import {TaskContext, TaskDispatchContext} from 'reducers/taskReducer';
import {closeTaskForm, registTask as createTaskAction} from 'actions/tasks';
import {createTask} from 'requests/tasks';
import {Project} from 'types/projects';
import {Immutable} from 'immer';

export type FormValue = {
  title: string;
  description: string;
  deadline: string;
}
type Props = {
  project: Immutable<Project>;
}

const Container: React.FC<Props> = ({project}) => {
  const {manipulateTask, openForm} = useContext(TaskContext);
  const dispatch = useContext(TaskDispatchContext);
  const [alert, setAlert] = useState<boolean>(false);
  const {
    register,
    reset,
    handleSubmit: wrapSubmit,
    formState: {isSubmitting}} = useForm<FormValue>({
      defaultValues: {...manipulateTask},
    });

  const alertOpen = () => setAlert(true);
  const alertClose = () => setAlert(false);
  const handleClose = () => dispatch(closeTaskForm());

  const handleSubmit = wrapSubmit(async (data) => {
    try {
      const task = await toJson<Task>(createTask({...data, project_id: project.id}));
      dispatch(createTaskAction(task));
      dispatch(closeTaskForm());
    } catch {
      alertOpen();
    }
  });

  useEffect(() => {
    reset({...manipulateTask});
  }, [manipulateTask]);

  return (
    <>
      <Presenter
        register={register}
        isOpen={openForm}
        disabled={isSubmitting}
        onClose={handleClose}
        onSubmit={handleSubmit}
      />
      <Snackbar
        open={alert}
        autoHideDuration={5000}
        onClose={alertClose}
        message={'Something wrong'}
      >
        <Alert severity='error'> Something Wrong </Alert>
      </Snackbar>
    </>
  );
};

export default Container;
