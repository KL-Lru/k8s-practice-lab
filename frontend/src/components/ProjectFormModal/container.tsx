import React, {useEffect, useState} from 'react';
import {closeProjectForm} from 'actions/projects';
import Presenter from 'components/ProjectFormModal/presenter';
import {useContext} from 'react';
import {ProjectContext, ProjectDispatchContext} from 'reducers/projectReducer';
import {useForm} from 'react-hook-form';
import {createProject} from 'requests/projects';
import {createProject as createProjectAction} from 'actions/projects';
import {toJson} from 'requests/api';
import {Project} from 'types/projects';
import {Alert, Snackbar} from '@mui/material';

export type FormValue = {
  name: string;
}

const Container = () => {
  const {manipulateProject, openForm} = useContext(ProjectContext);
  const dispatch = useContext(ProjectDispatchContext);
  const [alert, setAlert] = useState<boolean>(false);
  const {
    register,
    reset,
    handleSubmit: wrapSubmit,
    formState: {isSubmitting}} = useForm<FormValue>({
      defaultValues: {name: manipulateProject.name},
    });

  const alertOpen = () => setAlert(true);
  const alertClose = () => setAlert(false);
  const handleClose = () => dispatch(closeProjectForm());

  const handleSubmit = wrapSubmit(async (data) => {
    try {
      const project = await toJson<Project>(createProject(data));
      dispatch(createProjectAction(project));
      dispatch(closeProjectForm());
    } catch {
      alertOpen();
    }
  });

  useEffect(() => {
    reset({name: manipulateProject.name});
  }, [manipulateProject]);

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
