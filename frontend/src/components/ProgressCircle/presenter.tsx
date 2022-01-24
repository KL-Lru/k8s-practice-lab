import {Box} from '@mui/material';
import React from 'react';
import {ChartProps, Doughnut} from 'react-chartjs-2';

type Props = {
  data: ChartProps<'doughnut'>['data'];
}

const Presenter: React.FC<Props> = ({data}) => (
  <Box sx={{maxWidth: 400}}>
    <Doughnut data={data} fallbackContent={<div>DEAD!!!</div>}/>
  </Box>
);

export default Presenter;
