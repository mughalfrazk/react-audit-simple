import React from 'react';
import { Navigate, useRoutes } from 'react-router-dom';

import Main from '../layouts/Main';
import Firms from '../pages/Firms';
import Clients from '../pages/Clients';
import Dashboard from '../pages/Dashboard';
import constants from '../constants';
import Login from '../pages/Auth/Login';
import Register from '../pages/Auth/Register';
import ForgotPassword from '../pages/Auth/ForgotPassword';
import NotFound from '../pages/Errors/NotFound';
import Minimal from '../layouts/Minimal';

const AppRouter = () => {
  return useRoutes([
    {
      path: constants.urls.INDEX,
      element: <Main />,
      children: [
        {
          index: true,
          element: <Dashboard />,
        },
        {
          path: constants.urls.FIRMS,
          element: <Firms />,
        },
        {
          path: constants.urls.CLIENTS,
          element: <Clients />,
        },
      ],
    },
    {
      path: constants.urls.INDEX,
      element: <Minimal />,
      children: [
        {
          path: constants.urls.LOGIN,
          element: <Login />,
        },
        {
          path: constants.urls.REGISTER,
          element: <Register />,
        },
        {
          path: constants.urls.FORGOT_PASSWORD,
          element: <ForgotPassword />,
        },
        {
          path: '404',
          element: <NotFound />,
        },
      ],
    },
    {
      path: '*',
      element: <Navigate to={constants.urls.NOT_FOUND} replace />,
    },
  ]);
};

export default AppRouter;
