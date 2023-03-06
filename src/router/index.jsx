import React from 'react';
import { Navigate, useRoutes } from 'react-router-dom';

import Main from '../layouts/Main';
import Minimal from '../layouts/Minimal';
import Dashboard from '../pages/Dashboard';
import constants from '../constants';
import Login from '../pages/Auth/Login';
import Register from '../pages/Auth/Register';
import ForgotPassword from '../pages/Auth/ForgotPassword';
import NotFound from '../pages/Error/NotFound';
import FirmList from '../pages/Firm';
import FirmDetail from '../pages/Firm/Detail';
import ClientList from '../pages/Client';
import ClientDetail from '../pages/Client/Detail';
import EmployeeList from '../pages/Employee';
import EmployeeDetail from '../pages/Employee/Detail';
import RoleList from '../pages/Role';
import PermissionList from '../pages/Permission/PermissionList';
import ProtectedRoute from './protected-route';

const AppRouter = () => {
  return useRoutes([
    {
      path: constants.urls.INDEX,
      element: (
        <ProtectedRoute>
          <Main />
        </ProtectedRoute>
      ),
      children: [
        {
          index: true,
          element: <Dashboard />,
        },
        {
          path: constants.urls.FIRMS,
          children: [
            {
              index: true,
              element: <FirmList />,
            },
            {
              path: constants.urls.FIRM_DETAIL(':id'),
              element: <FirmDetail />,
            },
          ],
        },
        {
          path: constants.urls.CLIENTS,
          children: [
            {
              index: true,
              element: <ClientList />,
            },
            {
              path: constants.urls.CLIENT_DETAIL,
              element: <ClientDetail />,
            },
          ],
        },
        {
          path: constants.urls.EMPLOYEES,
          children: [
            {
              index: true,
              element: <EmployeeList />,
            },
            {
              path: constants.urls.EMPLOYEE_DETAIL,
              element: <EmployeeDetail />,
            },
          ],
        },
        {
          path: constants.urls.ROLES,
          children: [
            {
              index: true,
              element: <RoleList />,
            },
            {
              path: constants.urls.ROLE_PERMISSIONS,
              element: <PermissionList />,
            },
          ],
        },
        {
          path: constants.urls.PERMISSIONS,
          element: <PermissionList />,
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
