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
      ],
    },
    {
      name: 'Clients',
      icon: <MailIcon />,
      children: [
        {
          name: 'Clients List',
          icon: <InboxIcon />,
          path: constants.urls.CLIENTS,
        },
      ],
    },
  ];

  return <Sidebar navlinks={navlinks} />;
};

export default Navlinks;
