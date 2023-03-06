import React from 'react';
import { createTheme, ThemeProvider  } from '@mui/material';
import { BrowserRouter } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import Toaster from './components/Toaster';
import { setGlobalError } from './redux/slices/local-slice';
import AppRouter from './router';
import themeConfs from './theme';
import { AuthProvider } from './hooks/auth';

const App = () => {
  const dispatch = useDispatch();
  const globalError = useSelector(state => state.local.globalError)
  const theme = createTheme(themeConfs);

  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <AuthProvider>
          <AppRouter />
          <Toaster message={globalError} setClose={() => dispatch(setGlobalError(""))} />
        </AuthProvider>
      </BrowserRouter>
    </ThemeProvider>
  );
};

export default App;
