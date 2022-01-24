import React from 'react';
import {Card, CardContent, Typography, Divider, Box} from '@mui/material';

const ErrorWelcome: React.FC = () => (
  <Card sx={{p: 5}}>
    <CardContent>
      <Typography variant="h4" >Welcome to Lab!!</Typography>
      <Divider/>
      <Box sx={{pt: 5}}>
        <Typography>
        サーバは起動していますが, ネットワークの接続性に問題がある可能性があります.
        </Typography>
        <Typography>
        次のステップに進み, APIサーバを公開状態にしてください.
        </Typography>
      </Box>
    </CardContent>
  </Card>
);
export default ErrorWelcome;
