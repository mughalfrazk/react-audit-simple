import React from 'react';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';

import Sidebar from '../components/Navigation/Sidebar';
import Header from '../components/Navigation/Header';
import { Outlet } from 'react-router-dom';
import { DrawerHeader } from '../components/Navigation/MuiNavFunctions';
import { lightBlue } from '@mui/material/colors';

const Main = () => {
  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <Header />
      <Sidebar />
      <Box component="main" bgcolor={'#f6f8fb'} sx={{ flexGrow: 1, p: 3, height: '100%' }}>
        <DrawerHeader />
        <Outlet />
      </Box>
    </Box>
  );
}

export default Main;