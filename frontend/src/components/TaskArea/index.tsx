import React from 'react';
import {Immutable} from 'immer';
import {TaskProvider} from 'providers/taskProvider';
import {Project} from 'types/projects';
import Container from './container';
import {ProgressArea} from 'components/ProgressArea';

type Props = {
  project: Immutable<Project>;
}

export const TaskArea: React.FC<Props> = ({project}) => (
  <TaskProvider>
    <Container project={project}/>
    <ProgressArea />
  </TaskProvider>
);
