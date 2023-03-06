import React from 'react';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';

import Sidebar from '../components/Navigation/Sidebar';
import Header from '../components/Navigation/Header';
import { Outlet } from 'react-router-dom';
import { DrawerHeader } from '../components/Navigation/MuiNavFunctions';
import { grey } from '@mui/material/colors';

const Main = () => {
  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <Header />
      <Sidebar />
      <Box component="main" bgcolor={grey[50]} sx={{ flexGrow: 1, p: 3 }}>
        <DrawerHeader />
        <Outlet />
      </Box>
    </Box>
  );
}

export default Main;