import {Box, Card, CardContent, IconButton, Typography} from '@mui/material';
import {Close} from '@mui/icons-material';
import React, {ReactNode} from 'react';
import {Project} from 'types/projects';
import {Immutable} from 'immer';

type Props = {
  project: Immutable<Project>;
  contents: ReactNode;
  onRemove: () => void;
}

const Presenter:React.FC<Props> = ({project, contents, onRemove}) => (
  <Card sx ={{minWidth: '720px', mt: 3, mb: 3, ml: 5, borderLeft: '5px solid lime'}} >
    <CardContent>
      <Box sx={{mb: 3}}>
        <Typography variant={'h5'}>
          {project.name}
          <Typography variant={'caption'} sx={{ml: 1}}>
          (id: {project.id})
          </Typography>
          <IconButton
            size="small"
            aria-label="close"
            color="inherit"
            onClick={onRemove}
          >
            <Close fontSize="small" />
          </IconButton>

        </Typography>
      </Box>
      {contents}
    </CardContent>
  </Card>
);

export default Presenter;
