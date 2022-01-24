import React from 'react';
import {Paper,
  Table, TableBody, TableCell,
  TableContainer, TableHead, TableRow} from '@mui/material';
import {Task} from 'types/tasks';
import {TaskRow} from 'components/TaskRow';
import {Immutable} from 'immer';

type Props = {
  tasks: Immutable<Array<Task>>;
}

const Presenter: React.FC<Props> = ({tasks}) => (
  <TableContainer component={Paper}>
    <Table>
      <TableHead>
        <TableRow>
          <TableCell>Title</TableCell>
          <TableCell>Desc.</TableCell>
          <TableCell>DEADLINE</TableCell>
          <TableCell>Finished</TableCell>
          <TableCell ></TableCell>
          <TableCell ></TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {tasks.length == 0 && <TableRow>
          <TableCell
            colSpan={6}
            align='center'
            sx={{backgroundColor: '#cccccc'}}
          >
            データがありません
          </TableCell>
        </TableRow>}
        {tasks.map((row) => (
          <TaskRow task={row} key={row.id}/>
        ))}
      </TableBody>
    </Table>
  </TableContainer>
);

export default Presenter;
