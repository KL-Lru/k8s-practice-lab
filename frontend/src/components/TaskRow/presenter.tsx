import React from 'react';
import {IconButton, TableCell, TableRow} from '@mui/material';
import {Task} from 'types/tasks';
import {Cancel, Check, Close} from '@mui/icons-material';

type Props = {
  onRemove: () => void;
  onComplete: () => void;
  onRevoke: () => void;
  task: Task;
}

const Presenter: React.FC<Props> = ({onRemove, onComplete, onRevoke, task}) => (
  <>
    <TableRow>
      <TableCell>{task.title}</TableCell>
      <TableCell>{task.description}</TableCell>
      <TableCell>{task.deadline}</TableCell>
      <TableCell>{task.finished_at}</TableCell>
      <TableCell>
        {task.finished_at ?
          <IconButton onClick={onRevoke}><Cancel /></IconButton>:
          <IconButton onClick={onComplete}><Check /></IconButton>

        }
      </TableCell>
      <TableCell><IconButton onClick={onRemove}><Close /></IconButton></TableCell>
    </TableRow>
  </>
);

export default Presenter;
