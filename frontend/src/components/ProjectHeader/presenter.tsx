import React from 'react';
import {Card, CardContent, Typography, CardActions, Button} from '@mui/material';

type Props = {
  onCreate: () => void;
}

const Presenter: React.FC<Props> = ({onCreate}) => {
  return (
    <Card sx={{p: 3}}>
      <CardContent>
        <Typography variant="h4" sx={{mb: 6}}>Project</Typography>
        <Typography>進捗を管理しましょう!</Typography>
      </CardContent>
      <CardActions>
        <Button size="small" onClick={onCreate}>作成</Button>
      </CardActions>
    </Card>
  );
};

export default Presenter;
