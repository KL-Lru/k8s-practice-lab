import {KeyboardArrowDown, KeyboardArrowUp} from '@mui/icons-material';
import {Box, Button, Collapse, Typography} from '@mui/material';
import {ProgressCircle} from 'components/ProgressCircle';
import React from 'react';

type Props = {
  isOpen: boolean;
  onToggle: () => void;
}

const Presenter: React.FC<Props> = ({isOpen, onToggle}) => (
  <>
    <Button onClick={onToggle}>
      {isOpen ? <KeyboardArrowUp /> : <KeyboardArrowDown />}
      <Typography variant={'h6'}>PROGRESS</Typography>
    </Button>
    <Collapse in={isOpen} timeout={'auto'}>
      <Box sx={{m: 1}}>
        <ProgressCircle />
      </Box>
    </Collapse>
  </>
);

export default Presenter;
