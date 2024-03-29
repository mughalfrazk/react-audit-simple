import React from 'react';

import constants from '../../constants';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import PeopleIcon from '@mui/icons-material/People';
import DashboardIcon from '@mui/icons-material/Dashboard';
import BusinessCenterIcon from '@mui/icons-material/BusinessCenter';

const Navlinks = (Sidebar) => () => {
  const navlinks = [
    {
      name: 'Dashboard',
      icon: <DashboardIcon />,
      path: constants.urls.INDEX,
    },
    {
      name: 'Firm',
      icon: <BusinessCenterIcon />,
      path: constants.urls.FIRMS,
      role: [constants.roles.SUPER_ADMIN]
    },
    {
      name: 'Clients',
      icon: <BusinessCenterIcon />,
      path: constants.urls.CLIENTS,
      role: [constants.roles.ADMIN, constants.roles.EMPLOYEE]
    },
    {
      name: 'Employees',
      icon: <PeopleIcon />,
      path: constants.urls.EMPLOYEES,
      role: [constants.roles.ADMIN]
    },
    // {
    //   name: 'Roles',
    //   icon: <MailIcon />,
    //   children: [
    //     {
    //       name: 'List',
    //       icon: <InboxIcon />,
    //       path: constants.urls.ROLES,
    //     },
    //     {
    //       name: 'Detail',
    //       icon: <InboxIcon />,
    //       path: constants.urls.ROLE_PERMISSIONS,
    //     },
    //   ],
    // },
  ];

  return <Sidebar navlinks={navlinks} />;
};

export default Navlinks;
