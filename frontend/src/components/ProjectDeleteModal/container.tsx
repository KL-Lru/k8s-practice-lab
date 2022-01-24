import {closeProjectConfirm} from 'actions/projects';
import React, {useContext, useState} from 'react';
import {ProjectContext, ProjectDispatchContext} from 'reducers/projectReducer';
import {toJson} from 'requests/api';
import {deleteProject} from 'requests/projects';
import {deleteProject as deleteProjectAction} from 'actions/projects';
import {Project} from 'types/projects';
import Presenter from 'components/ProjectDeleteModal/presenter';
import {Snackbar, Alert} from '@mui/material';

const Container = () => {
  const {manipulateProject, openConfirm} = useContext(ProjectContext);
  const dispatch = useContext(ProjectDispatchContext);
  const [alert, setAlert] = useState<boolean>(false);
  const [submitting, setSubmitting] = useState<boolean>(false);

  const alertOpen = () => setAlert(true);
  const alertClose = () => setAlert(false);
  const handleClose = () => dispatch(closeProjectConfirm());

  const handleSubmit = async () => {
    setSubmitting(true);
    try {
      const project = await toJson<Project>(deleteProject(manipulateProject));
      dispatch(deleteProjectAction(project));
      dispatch(closeProjectConfirm());
    } catch {
      alertOpen();
    }
    return setSubmitting(false);
  };

  return (
    <>
      <Presenter
        project={manipulateProject}
        isOpen={openConfirm}
        disabled={submitting}
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
