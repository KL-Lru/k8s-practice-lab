import {KeyboardArrowDown, KeyboardArrowUp} from '@mui/icons-material';
import {Box, Button, Collapse, Typography} from '@mui/material';
import {TaskFormModal} from 'components/TaskFormModal';
import {TaskList} from 'components/TaskList';
import {Immutable} from 'immer';
import React from 'react';
import {Project} from 'types/projects';

type Props = {
  isOpen: boolean;
  onToggle: () => void;
  onCreate: () => void;
  project: Immutable<Project>;
}

const Presenter: React.FC<Props> = ({isOpen, onToggle, onCreate, project}) => (
  <>
    <Button onClick={onToggle}>
      {isOpen ? <KeyboardArrowUp /> : <KeyboardArrowDown />}
      <Typography variant={'h6'}>Tasks</Typography>
    </Button>
    <Collapse in={isOpen} timeout={'auto'}>
      <Button onClick={onCreate}>
        作成
      </Button>
      <Box sx={{m: 1}}>
        <TaskList project={project}/>
      </Box>
      <TaskFormModal project={project}/>
    </Collapse>
  </>
);

export default Presenter;
