import React from 'react';
import { createTheme, ThemeProvider  } from '@mui/material';
import { BrowserRouter } from 'react-router-dom';
import AppRouter from './router';

const App = () => {
  const theme = createTheme({
    palette: {
      primary: {
        light: '#1976d2',
        main: '#3f50b5',
        dark: '#002884',
        contrastText: '#fff',
      },
      secondary: {
        light: '#ff7961',
        main: '#f44336',
        dark: '#ba000d',
        contrastText: '#000',
      },
      white: {
        light: '#ffffff',
        main: '#ffffff'
      },
      danger: {
        main: '#b91d2d'
      } 
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <AppRouter />
      </BrowserRouter>
    </ThemeProvider>
  );
};

export default App;
