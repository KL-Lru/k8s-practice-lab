import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';

export const Header: React.FC = () => (
  <>
    <AppBar position="relative"></AppBar>
    <AppBar position="fixed" sx={{left: 0, top: 0, right: 0}}>
      <Toolbar disableGutters sx={{pl: 5}}>
        <Typography
          variant="h6"
          sx={{mr: 2, display: 'flex'}}
        >
        PRACTICE LAB
        </Typography>
      </Toolbar>
    </AppBar>
    <Toolbar />
  </>
);
