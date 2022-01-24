import {CircularProgress} from '@mui/material';
import Container from 'components/TaskList/container';
import {Immutable} from 'immer';
import React, {Suspense} from 'react';
import {Project} from 'types/projects';

type Props = {
  project: Immutable<Project>
}

export const TaskList: React.FC<Props> = ({project}) => {
  return (
    <Suspense fallback={<CircularProgress />}>
      <Container project={project}/>
    </Suspense>

  );
};
