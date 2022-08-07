import React from 'react';

import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import constants from '../../constants';
import DashboardIcon from '@mui/icons-material/Dashboard';

const Navlinks = (Sidebar) => () => {
  const navlinks = [
    {
      name: 'Dashboard',
      icon: <DashboardIcon />,
      path: constants.urls.INDEX,
    },
    {
      name: 'Firm',
      icon: <InboxIcon />,
      children: [
        {
          name: 'List',
          icon: <MailIcon />,
          path: constants.urls.FIRMS,
        },
        {
          name: 'Detail',
          icon: <MailIcon />,
          path: constants.urls.FIRM_DETAIL,
        },
      ],
    },
    {
      name: 'Clients',
      icon: <MailIcon />,
      children: [
        {
          name: 'List',
          icon: <InboxIcon />,
          path: constants.urls.CLIENTS,
        },
        {
          name: 'Detail',
          icon: <InboxIcon />,
          path: constants.urls.CLIENT_DETAIL,
        },
      ],
    },
    {
      name: 'Employees',
      icon: <MailIcon />,
      children: [
        {
          name: 'List',
          icon: <InboxIcon />,
          path: constants.urls.EMPLOYEES,
        },
        {
          name: 'Detail',
          icon: <InboxIcon />,
          path: constants.urls.EMPLOYEE_DETAIL,
        },
      ],
    },
    {
      name: 'Roles',
      icon: <MailIcon />,
      children: [
        {
          name: 'List',
          icon: <InboxIcon />,
          path: constants.urls.ROLES,
        },
        {
          name: 'Detail',
          icon: <InboxIcon />,
          path: constants.urls.ROLE_PERMISSIONS,
        },
      ],
    },
    {
      name: 'Permissions',
      icon: <MailIcon />,
      path: constants.urls.PERMISSIONS,
    },
  ];

  return <Sidebar navlinks={navlinks} />;
};

export default Navlinks;
