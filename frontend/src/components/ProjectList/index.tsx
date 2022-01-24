import React, {Suspense} from 'react';
import ListContainer from 'components/ProjectList/container';
import {CircularProgress} from '@mui/material';


export const ProjectList: React.FC = () => (
  <Suspense fallback={<CircularProgress />}>
    <ListContainer />
  </Suspense>

);
